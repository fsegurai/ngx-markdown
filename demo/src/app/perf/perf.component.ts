import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  SecurityContext,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '@shared/theme';
import {
  MARKDOWN_INCREMENTAL_UPDATES,
  MarkdownComponent,
  MarkdownService,
  type MermaidAPI,
  SANITIZE,
} from 'ngx-markdown';
import { editLongMarkdown, generateLongMarkdown } from '../../../../lib/src/testing/generate-long-markdown';

/** What the `/perf` page exposes on `window.__ngxMarkdownPerf`, read by scripts/perf/measure-long-doc.mjs. */
export interface NgxMarkdownPerf {
  lines: number;
  katex: boolean;
  mermaid: boolean;
  clipboard: boolean;
  emoji: boolean;
  prism: boolean;
  /** The `cv` query param (off by default): renders with `[contentVisibility]` on. */
  contentVisibility: boolean;
  /** The `lazy` query param (off by default): draws the Mermaid diagrams near the viewport only (`{ lazy: true }`). */
  lazy: boolean;
  /** The `lightbox` query param (off by default): renders with `[lightbox]` on (the images open in the viewer). */
  lightbox: boolean;
  /** The `export` query param (off by default): renders with `[mermaidExport]` on (an export button per diagram). */
  mermaidExport: boolean;
  /** The `sanitize` query param: `html` renders with Angular's HTML sanitizer, `none` with the app's (no sanitizer). */
  sanitize: SanitizeMode;
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
  /**
   * The `incremental` query param (on by default): `0` renders every edit whole
   * (`MARKDOWN_INCREMENTAL_UPDATES` = `false` for this page).
   */
  incremental: boolean;
  /**
   * Every edit of the `edits` query param, in order (`editLongMarkdown`: a paragraph typed near the middle, one word per
   * edit): the first starts `EDIT_PAUSE_MS` after the `ready` of the last render, each next one that long after the
   * `ready` of the previous edit.
   */
  edits: { start: number; readyAt: number | null }[];
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

/** A count query param (`diagrams`, `formulas`): a number is floored and clamped to at least 0; anything else is `undefined`. */
function blockCount(value: string | null): number | undefined {
  const count = value === null || value.trim() === '' ? Number.NaN : Number(value);
  return Number.isFinite(count) ? Math.max(0, Math.floor(count)) : undefined;
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

/** The `edits` query param: a number is floored and clamped to 0–50; anything else is 0. */
function editCount(value: string | null): number {
  const edits = value === null || value.trim() === '' ? Number.NaN : Number(value);
  return Number.isFinite(edits) ? Math.min(MAX_EDITS, Math.max(0, Math.floor(edits))) : 0;
}

const MAX_EDITS = 50;

/** Pause between a `ready` and the next edit (like the 300 ms debounce of the playground). */
export const EDIT_PAUSE_MS = 300;

/** How the `/perf` page sanitizes the rendered HTML. */
export type SanitizeMode = 'none' | 'html';

/** The `sanitize` query param: `html` (any case) selects Angular's HTML sanitizer; anything else keeps the app's `none`. */
function sanitizeMode(value: string | null): SanitizeMode {
  return value?.toLowerCase() === 'html' ? 'html' : 'none';
}

/** Reads the `sanitize` query param of the current route (in an injection context). */
const routeSanitizeMode = (): SanitizeMode =>
  sanitizeMode(inject(ActivatedRoute).snapshot.queryParamMap.get('sanitize'));

/** Reads the `incremental` query param of the current route (in an injection context): on unless turned off. */
const routeIncremental = (): boolean => flag(inject(ActivatedRoute).snapshot.queryParamMap.get('incremental'), true);

/** Pause between a `ready` and the next render (longer than the 1 s idle window of measure-long-doc.mjs). */
export const REPEAT_PAUSE_MS = 1500;

/**
 * Performance harness page (P6.0): renders a long generated document, e.g. `/perf?lines=5000&mermaid=0&prism=1`.
 * With `diagrams=N` / `formulas=N` the document holds N Mermaid / display math blocks (default: one per 1000 / 200
 * lines), and with `unique=1` each of them has its own source (no cache hit). With `lazy=1` the diagrams are drawn
 * when they come near the viewport (`[plugins]="{ mermaid: { lazy: true } }"`).
 * With `cv=1` the `<markdown>` renders with `[contentVisibility]` on (off-screen blocks skip their rendering).
 * With `lightbox=1` and `export=1` it renders with `[lightbox]` and `[mermaidExport]` on, as the playground does.
 * With `repeat=2` the `<markdown>` is removed and created again after the first `ready`, to measure a second render of
 * the same document by the same `MarkdownService` (its caches).
 * With `edits=N` the document is then edited N times, as typing would (see `NgxMarkdownPerf.edits`), and with
 * `incremental=0` each edit is rendered whole (no incremental update), to compare the two.
 * With `sanitize=html` this page alone gets its own `MarkdownService` with `SANITIZE` = `SecurityContext.HTML` (the app
 * provides `SecurityContext.NONE`); every other provider (plugins, Marked options and extensions) is the app's.
 * Not listed in the navigation (its route has no `label`).
 */
@Component({
  selector: 'app-perf',
  templateUrl: './perf.component.html',
  styleUrl: './perf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
  providers: [
    {
      provide: SANITIZE,
      useFactory: () => (routeSanitizeMode() === 'html' ? SecurityContext.HTML : inject(SANITIZE, { skipSelf: true })),
    },
    { provide: MARKDOWN_INCREMENTAL_UPDATES, useFactory: routeIncremental },
    {
      provide: MarkdownService,
      useFactory: () =>
        routeSanitizeMode() === 'html' ? new MarkdownService() : inject(MarkdownService, { skipSelf: true }),
    },
  ],
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
  protected readonly contentVisibility = flag(this.params.get('cv'), false);
  protected readonly lazy = flag(this.params.get('lazy'), false);
  protected readonly lightbox = flag(this.params.get('lightbox'), false);
  protected readonly mermaidExport = flag(this.params.get('export'), false);
  /** The `[plugins]` record: the Mermaid options of `lazy=1` (enablement stays with `[mermaid]`). */
  protected readonly plugins = this.lazy ? { mermaid: { lazy: true } } : {};
  protected readonly repeat = repeatCount(this.params.get('repeat'));
  protected readonly edits = editCount(this.params.get('edits'));
  protected readonly incremental = routeIncremental();
  protected readonly sanitize = sanitizeMode(this.params.get('sanitize'));
  protected readonly markdown = generateLongMarkdown({
    lines: this.lines,
    mermaid: blockCount(this.params.get('diagrams')),
    math: blockCount(this.params.get('formulas')),
    unique: flag(this.params.get('unique'), false),
    seed: 1,
  });
  /** The document `<markdown>` renders: the generated one, then its edits. */
  protected readonly content = signal(this.markdown);
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
    contentVisibility: this.contentVisibility,
    lazy: this.lazy,
    lightbox: this.lightbox,
    mermaidExport: this.mermaidExport,
    sanitize: this.sanitize,
    chars: this.markdown.length,
    parseStart: performance.now(),
    readyAt: null,
    repeat: this.repeat,
    renders: [],
    incremental: this.incremental,
    edits: [],
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
    const edit = this.perf.edits[this.perf.edits.length - 1];
    if (edit && edit.readyAt === null) {
      edit.readyAt = performance.now();
      this.scheduleEdit();
      return;
    }
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
    else this.scheduleEdit();
  }

  /** Applies the next edit after `EDIT_PAUSE_MS`, until `edits` are done. */
  private scheduleEdit(): void {
    if (this.perf.edits.length >= this.edits) return;
    this.repeatTimer = setTimeout(() => {
      this.repeatTimer = undefined;
      this.perf.edits.push({ start: performance.now(), readyAt: null });
      this.content.set(editLongMarkdown(this.markdown, this.perf.edits.length));
    }, EDIT_PAUSE_MS);
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
