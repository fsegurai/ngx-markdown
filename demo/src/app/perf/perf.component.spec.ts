import { SecurityContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { appConfig } from '@app/app.config';
import { MARKDOWN_INCREMENTAL_UPDATES, MarkdownComponent, MarkdownService, SANITIZE } from 'ngx-markdown';
import { editLongMarkdown } from '../../../../lib/src/testing/generate-long-markdown';
import PerfComponent, { EDIT_PAUSE_MS, type NgxMarkdownPerf, REPEAT_PAUSE_MS } from './perf.component';

/** Builds the page with the given `/perf` query params, without rendering it. */
function create(query: Record<string, string> = {}) {
  // The page renders with [emoji], [katex] and [clipboard]; their libraries are global scripts in the app build, not in tests
  vi.stubGlobal('joypixels', { shortnameToUnicode: (value: string) => value });
  vi.stubGlobal('katex', { renderToString: (tex: string) => `<span class="katex">${tex}</span>` });
  vi.stubGlobal(
    'ClipboardJS',
    class {
      on(): void {}
      destroy(): void {}
    },
  );
  TestBed.configureTestingModule({
    providers: [
      ...appConfig.providers,
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap(query) } } },
    ],
  });
  const fixture = TestBed.createComponent(PerfComponent);
  // biome-ignore lint/suspicious/noExplicitAny: reads the protected fields the template binds to and calls onReady()
  const component = fixture.componentInstance as any;
  return { fixture, component, perf: window.__ngxMarkdownPerf as NgxMarkdownPerf };
}

describe('PerfComponent', () => {
  afterEach(() => {
    delete window.__ngxMarkdownPerf;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('flags', () => {
    it('should default katex, mermaid, clipboard and emoji on and line numbers off', () => {
      const { perf } = create();
      expect(perf).toMatchObject({ katex: true, mermaid: true, clipboard: true, emoji: true, prism: false });
    });

    it.each(['0', 'false', 'off', 'OFF', 'False'])('should turn a flag off with "%s"', (value) => {
      const { perf } = create({ katex: value, mermaid: value, clipboard: value, emoji: value });
      expect(perf).toMatchObject({ katex: false, mermaid: false, clipboard: false, emoji: false });
    });

    it.each(['1', 'true', 'on', 'yes', ''])('should turn a flag on with "%s"', (value) => {
      const { perf } = create({ prism: value });
      expect(perf.prism).toBe(true);
    });
  });

  describe('cv (contentVisibility)', () => {
    it('should be off by default, and on with cv=1, on the rendered <markdown>', () => {
      const off = create();
      off.fixture.detectChanges();
      expect(off.perf.contentVisibility).toBe(false);
      expect(off.fixture.nativeElement.querySelector('markdown').classList).not.toContain(
        'markdown-content-visibility',
      );

      TestBed.resetTestingModule();
      const on = create({ cv: '1' });
      on.fixture.detectChanges();
      expect(on.perf.contentVisibility).toBe(true);
      expect(on.fixture.nativeElement.querySelector('markdown').classList).toContain('markdown-content-visibility');
    });
  });

  describe('lightbox and export', () => {
    it('should be off by default, and enable the lightbox and the Mermaid export with lightbox=1 and export=1', () => {
      const off = create();
      off.fixture.detectChanges();
      const offMarkdown = off.fixture.debugElement.query((node) => node.componentInstance instanceof MarkdownComponent)
        .componentInstance as MarkdownComponent;
      expect(off.perf).toMatchObject({ lightbox: false, mermaidExport: false });
      expect(offMarkdown.lightbox()).toBe(false);
      expect(offMarkdown.mermaidExport()).toBe(false);

      TestBed.resetTestingModule();
      const on = create({ lightbox: '1', export: '1' });
      on.fixture.detectChanges();
      const onMarkdown = on.fixture.debugElement.query((node) => node.componentInstance instanceof MarkdownComponent)
        .componentInstance as MarkdownComponent;
      expect(on.perf).toMatchObject({ lightbox: true, mermaidExport: true });
      expect(onMarkdown.lightbox()).toBe(true);
      expect(onMarkdown.mermaidExport()).toBe(true);
    });
  });

  describe('lazy, diagrams, formulas and unique', () => {
    it('should draw every diagram by default, and pass { lazy: true } to the Mermaid plugin with lazy=1', () => {
      const off = create();
      expect(off.perf.lazy).toBe(false);
      expect(off.component.plugins).toEqual({});

      TestBed.resetTestingModule();
      const on = create({ lazy: '1' });
      expect(on.perf.lazy).toBe(true);
      expect(on.component.plugins).toEqual({ mermaid: { lazy: true } });
    });

    it('should generate the requested Mermaid and display math blocks, each unique with unique=1', () => {
      const { component } = create({ lines: '400', diagrams: '7', formulas: '3', unique: '1' });
      const diagrams: string[] = component.markdown.match(/```mermaid\n[\s\S]*?```/g) ?? [];

      expect(new Set(diagrams).size).toBe(7);
      expect(component.markdown.match(/^\$\$$/gm)?.length).toBe(6);
    });
  });

  describe('lines', () => {
    it.each([
      [undefined, 5000],
      ['', 5000],
      ['abc', 5000],
      ['2000', 2000],
      ['12.9', 12],
      ['0', 1],
      ['-5', 1],
    ])('should map lines=%s to %i', (value, expected) => {
      const { component, perf } = create(value === undefined ? {} : { lines: value });
      expect(component.lines).toBe(expected);
      expect(perf.lines).toBe(expected);
    });
  });

  it('should expose the window.__ngxMarkdownPerf contract read by scripts/perf/measure-long-doc.mjs', () => {
    const before = performance.now();
    const { component, perf } = create({ lines: '40', mermaid: '0' });

    expect(Object.keys(perf).sort()).toEqual(
      [
        'chars',
        'clipboard',
        'contentVisibility',
        'edits',
        'emoji',
        'incremental',
        'katex',
        'lazy',
        'lightbox',
        'lines',
        'mermaidExport',
        'mermaid',
        'parseStart',
        'prism',
        'readyAt',
        'renders',
        'repeat',
        'sanitize',
      ].sort(),
    );
    expect(perf.lines).toBe(40);
    expect(perf.chars).toBe(component.markdown.length);
    expect(perf.chars).toBeGreaterThan(0);
    expect(perf.parseStart).toBeGreaterThanOrEqual(before);
    expect(perf.parseStart).toBeLessThanOrEqual(performance.now());
    expect(perf.readyAt).toBeNull();
    expect(perf.repeat).toBe(1);
    expect(perf.renders).toEqual([{ start: perf.parseStart, readyAt: null }]);
    expect(perf.edits).toEqual([]);
    expect(perf.incremental).toBe(true);
  });

  describe('edits and incremental', () => {
    it('should apply the edits one after the other after the first ready, recording each start and ready', () => {
      vi.useFakeTimers({ toFake: ['setTimeout'] });
      const now = vi.spyOn(performance, 'now');
      const { component, perf } = create({ lines: '40', edits: '2' });
      const base = component.markdown;

      now.mockReturnValue(1000);
      component.onReady();
      expect(perf.edits).toEqual([]);
      expect(component.content()).toBe(base);

      now.mockReturnValue(2000);
      vi.advanceTimersByTime(EDIT_PAUSE_MS);
      expect(perf.edits).toEqual([{ start: 2000, readyAt: null }]);
      expect(component.content()).toBe(editLongMarkdown(base, 1));

      now.mockReturnValue(2050);
      component.onReady();
      expect(perf.edits[0].readyAt).toBe(2050);
      // ? The first render keeps its ready time
      expect(perf.readyAt).toBe(1000);

      now.mockReturnValue(3000);
      vi.advanceTimersByTime(EDIT_PAUSE_MS);
      expect(component.content()).toBe(editLongMarkdown(base, 2));
      component.onReady();
      vi.advanceTimersByTime(EDIT_PAUSE_MS * 4);
      expect(perf.edits).toHaveLength(2);
    });

    it('should make no edit by default', () => {
      vi.useFakeTimers({ toFake: ['setTimeout'] });
      const { component, perf } = create({ lines: '40' });
      component.onReady();
      vi.advanceTimersByTime(EDIT_PAUSE_MS * 4);
      expect(perf.edits).toEqual([]);
    });

    it('should turn the incremental updates of <markdown> off with incremental=0', () => {
      const off = create({ lines: '10', incremental: '0' });
      off.fixture.detectChanges();
      const markdown = off.fixture.debugElement.query((debug) => debug.componentInstance instanceof MarkdownComponent);
      expect(markdown.injector.get(MARKDOWN_INCREMENTAL_UPDATES)).toBe(false);
      expect(off.perf.incremental).toBe(false);
    });
  });

  describe('sanitize', () => {
    const unsafe = '<script>alert(1)</script>\n\nsafe';

    it.each([undefined, '', 'none', 'off', 'abc'])(
      'should keep the app sanitizer (SecurityContext.NONE) with sanitize=%s',
      (value) => {
        const { fixture, perf } = create(value === undefined ? {} : { sanitize: value });
        const injector = fixture.debugElement.injector;

        expect(perf.sanitize).toBe('none');
        expect(injector.get(SANITIZE)).toBe(SecurityContext.NONE);
        // ? The page uses the app's MarkdownService (same caches as every other page)
        expect(injector.get(MarkdownService)).toBe(TestBed.inject(MarkdownService));
        expect(injector.get(MarkdownService).parse(unsafe)).toContain('<script>');
      },
    );

    it.each(['html', 'HTML'])(
      "should render with Angular's HTML sanitizer for this page only with sanitize=%s",
      (value) => {
        const { fixture, perf } = create({ sanitize: value });
        const injector = fixture.debugElement.injector;
        const service = injector.get(MarkdownService);

        expect(perf.sanitize).toBe('html');
        expect(injector.get(SANITIZE)).toBe(SecurityContext.HTML);
        expect(service).not.toBe(TestBed.inject(MarkdownService));
        expect(service.parse(unsafe)).not.toContain('<script>');
        expect(service.parse(unsafe)).toContain('safe');
        // ? The app-wide service is not affected
        expect(TestBed.inject(MarkdownService).parse(unsafe)).toContain('<script>');
      },
    );
  });

  it.each([
    [undefined, 1],
    ['abc', 1],
    ['2', 2],
    ['2.7', 2],
    ['0', 1],
    ['99', 10],
  ])('should map repeat=%s to %i', (value, expected) => {
    const { perf } = create(value === undefined ? {} : { repeat: value });
    expect(perf.repeat).toBe(expected);
  });

  it('should remove and render the document again after the first ready with repeat=2, then stop', () => {
    vi.useFakeTimers({ toFake: ['setTimeout'] });
    try {
      const { component, perf } = create({ lines: '10', repeat: '2' });

      component.onReady();
      expect(perf.renders).toHaveLength(1);
      expect(perf.renders[0].readyAt).not.toBeNull();

      vi.advanceTimersByTime(REPEAT_PAUSE_MS);
      expect(perf.renders).toHaveLength(2);
      expect(component.shown()).toBe(false);
      vi.advanceTimersByTime(1);
      expect(component.shown()).toBe(true);

      // ? The ready of the second render is recorded on it; readyAt keeps the first render, and a later ready is ignored
      const firstReady = perf.readyAt;
      component.onReady();
      const secondReady = perf.renders[1].readyAt;
      expect(secondReady).not.toBeNull();
      expect(perf.readyAt).toBe(firstReady);
      component.onReady();
      expect(perf.renders[1].readyAt).toBe(secondReady);

      vi.advanceTimersByTime(REPEAT_PAUSE_MS * 2);
      expect(perf.renders).toHaveLength(2);
    } finally {
      vi.useRealTimers();
    }
  });

  it('should set readyAt only on the first ready', () => {
    const now = vi.spyOn(performance, 'now');
    const { component, perf } = create({ lines: '10' });
    const parseStart = perf.parseStart;

    now.mockReturnValue(parseStart + 120.4);
    component.onReady();
    expect(perf.readyAt).toBe(parseStart + 120.4);
    expect(component.readyIn()).toBe(120);

    // ? A theme change re-renders the diagrams and emits `ready` again: it must not move the measurement
    now.mockReturnValue(parseStart + 900);
    component.onReady();
    expect(perf.readyAt).toBe(parseStart + 120.4);
    expect(component.readyIn()).toBe(120);
  });

  it.each([
    ['during the pause before a repeat', 0],
    ['between the removal and the new <markdown>', REPEAT_PAUSE_MS],
  ])('should cancel the pending repeat when destroyed %s, and stop updating window.__ngxMarkdownPerf', (_, elapsed) => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    const { fixture, component, perf } = create({ lines: '10', repeat: '3' });
    component.onReady();
    vi.advanceTimersByTime(elapsed);
    const snapshot = structuredClone(perf);
    const shown = component.shown();

    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(REPEAT_PAUSE_MS * 4);
    component.onReady();

    expect(perf).toEqual(snapshot);
    expect(component.shown()).toBe(shown);
  });

  it('should set readyAt when the rendered <markdown> emits ready', async () => {
    const { fixture, perf } = create({ lines: '30', mermaid: '0' });
    fixture.detectChanges();
    await vi.waitFor(
      async () => {
        await fixture.whenStable();
        expect(perf.readyAt).not.toBeNull();
      },
      { timeout: 3000, interval: 20 },
    );
    expect(perf.readyAt).toBeGreaterThanOrEqual(perf.parseStart);
    expect((fixture.nativeElement as HTMLElement).querySelector('.perf-summary')?.textContent).toContain('ready in');
  });
});
