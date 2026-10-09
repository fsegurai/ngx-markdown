import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '@shared/theme';
import { MarkdownComponent, type MermaidAPI } from 'ngx-markdown';
import { generateLongMarkdown } from '../../../../lib/src/testing/generate-long-markdown';

/** What the `/perf` page exposes on `window.__ngxMarkdownPerf`, read by scripts/perf/measure-long-doc.mjs. */
export interface NgxMarkdownPerf {
  lines: number;
  katex: boolean;
  mermaid: boolean;
  clipboard: boolean;
  emoji: boolean;
  prism: boolean;
  /** Length of the generated Markdown, in characters. */
  chars: number;
  /** `performance.now()` when the page started rendering the document. */
  parseStart: number;
  /** `performance.now()` at the first `ready` of `<markdown>`, `null` until then. */
  readyAt: number | null;
  /** How many times the document is rendered (the `repeat` query param, 1 to 10). */
  repeat: number;
  /**
   * Every render of the document, in order: the first starts at `parseStart`; each later one starts when the previous
   * `<markdown>` is removed (as a navigation away and back would), `REPEAT_PAUSE_MS` after the previous `ready`.
   */
  renders: { start: number; readyAt: number | null }[];
}

declare global {
  interface Window {
    __ngxMarkdownPerf?: NgxMarkdownPerf;
  }
}

/** A query param flag: on unless `0`, `false` or `off` (or `fallback` when absent). */
function flag(value: string | null, fallback: boolean): boolean {
  return value === null ? fallback : !['0', 'false', 'off'].includes(value.toLowerCase());
}

/** Default `lines` when the query param is absent or not a number. */
const DEFAULT_LINES = 5000;

/** The `lines` query param: a number is floored and clamped to at least 1 (so `0` means 1); anything else is the default. */
function lineCount(value: string | null): number {
  const lines = value === null || value.trim() === '' ? Number.NaN : Number(value);
  return Number.isFinite(lines) ? Math.max(1, Math.floor(lines)) : DEFAULT_LINES;
}

/** The `repeat` query param: a number is floored and clamped to 1–10; anything else is 1. */
function repeatCount(value: string | null): number {
  const repeat = value === null || value.trim() === '' ? Number.NaN : Number(value);
  return Number.isFinite(repeat) ? Math.min(MAX_REPEAT, Math.max(1, Math.floor(repeat))) : 1;
}

const MAX_REPEAT = 10;

/** Pause between a `ready` and the next render (longer than the 1 s idle window of measure-long-doc.mjs). */
export const REPEAT_PAUSE_MS = 1500;

/**
 * Performance harness page (P6.0): renders a long generated document, e.g. `/perf?lines=5000&mermaid=0&prism=1`.
 * With `repeat=2` the `<markdown>` is removed and created again after the first `ready`, to measure a second render of
 * the same document by the same `MarkdownService` (its caches).
 * Not listed in the navigation (its route has no `label`).
 */
@Component({
  selector: 'app-perf',
  templateUrl: './perf.component.html',
  styleUrl: './perf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
})
export default class PerfComponent {
  private readonly themeService = inject(ThemeService);
  private readonly params = inject(ActivatedRoute).snapshot.queryParamMap;

  protected readonly lines = lineCount(this.params.get('lines'));
  protected readonly katex = flag(this.params.get('katex'), true);
  protected readonly mermaid = flag(this.params.get('mermaid'), true);
  protected readonly clipboard = flag(this.params.get('clipboard'), true);
  protected readonly emoji = flag(this.params.get('emoji'), true);
  protected readonly prism = flag(this.params.get('prism'), false);
  protected readonly repeat = repeatCount(this.params.get('repeat'));
  protected readonly markdown = generateLongMarkdown({ lines: this.lines, seed: 1 });
  protected readonly mermaidOptions = computed<MermaidAPI.MermaidConfig>(() => ({
    fontFamily: 'inherit',
    ...this.themeService.mermaidOptions(),
  }));
  protected readonly readyIn = signal<number | null>(null);
  protected readonly shown = signal(true);

  private readonly perf: NgxMarkdownPerf = {
    lines: this.lines,
    katex: this.katex,
    mermaid: this.mermaid,
    clipboard: this.clipboard,
    emoji: this.emoji,
    prism: this.prism,
    chars: this.markdown.length,
    parseStart: performance.now(),
    readyAt: null,
    repeat: this.repeat,
    renders: [],
  };

  /** The pending repeat timer (the pause, then the re-creation of `<markdown>`), cleared on destroy. */
  private repeatTimer: ReturnType<typeof setTimeout> | undefined;
  private destroyed = false;

  constructor() {
    this.perf.renders.push({ start: this.perf.parseStart, readyAt: null });
    window.__ngxMarkdownPerf = this.perf;
    inject(DestroyRef).onDestroy(() => {
      // ? A navigation away: no repeat runs, and the measurement (window.__ngxMarkdownPerf) is no longer updated
      this.destroyed = true;
      clearTimeout(this.repeatTimer);
      this.repeatTimer = undefined;
    });
  }

  protected onReady(): void {
    if (this.destroyed) return;
    // ? Only the first `ready` of each render is measured: a theme change re-renders the diagrams and emits it again
    const current = this.perf.renders[this.perf.renders.length - 1];
    if (current.readyAt !== null) return;
    current.readyAt = performance.now();
    if (this.perf.readyAt === null) {
      this.perf.readyAt = current.readyAt;
      this.readyIn.set(Math.round(this.perf.readyAt - this.perf.parseStart));
    }
    if (this.perf.renders.length < this.repeat)
      this.repeatTimer = setTimeout(() => this.renderAgain(), REPEAT_PAUSE_MS);
  }

  /** Removes the `<markdown>`, then creates it again with the same document. */
  private renderAgain(): void {
    this.perf.renders.push({ start: performance.now(), readyAt: null });
    this.shown.set(false);
    this.repeatTimer = setTimeout(() => {
      this.repeatTimer = undefined;
      this.shown.set(true);
    });
  }
}
