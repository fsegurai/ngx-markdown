import { TestBed } from '@angular/core/testing';
import { appConfig } from '@app/app.config';
import {
  type MarkdownCopyEvent,
  type MarkdownImageClickEvent,
  type MarkdownMermaidExportErrorEvent,
  type MarkdownMermaidExportEvent,
  MarkdownService,
  MermaidRenderError,
  type MermaidRenderFailure,
} from 'ngx-markdown';
import PlaygroundComponent from './playground.component';

const MARKDOWN = [
  '---',
  'title: Playground spec',
  'tags: [a, b]',
  '---',
  '',
  '## First Section',
  '',
  'Text.',
  '',
  '## Second, Section!',
  '',
].join('\n');

const NESTED_MARKDOWN = [
  '---',
  'title: Nested',
  'author:',
  '  name: Ada',
  '  site: example.org',
  'links:',
  '  - label: Docs',
  '    url: /docs',
  '  - plain',
  '---',
  '',
  '## Body',
  '',
].join('\n');

function setup() {
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
  TestBed.configureTestingModule({ providers: appConfig.providers });
}

function create() {
  const fixture = TestBed.createComponent(PlaygroundComponent);
  // biome-ignore lint/suspicious/noExplicitAny: drives the protected handlers and signals the template binds to
  const component = fixture.componentInstance as any;
  const element: HTMLElement = fixture.nativeElement;
  return { fixture, component, element };
}

async function render(markdown: string) {
  const { fixture, component, element } = create();
  component.markdownContent.set(markdown);
  // ? Poll until the (debounced) rendering reached the DOM, without coupling to the debounce delay
  await vi.waitFor(
    async () => {
      await fixture.whenStable();
      expect(element.querySelector('markdown')?.childElementCount).toBeGreaterThan(0);
    },
    { timeout: 3000, interval: 20 },
  );
  return { fixture, component, element };
}

describe('PlaygroundComponent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('does not replace the heading renderer of the root MarkdownService', async () => {
    setup();
    const renderer = TestBed.inject(MarkdownService).renderer;
    const heading = renderer.heading;

    await render(MARKDOWN);

    expect(renderer.heading).toBe(heading);
  });

  it('gives the headings slug ids and builds the side navigation from the h2 headings', async () => {
    setup();
    const { component, element } = await render(MARKDOWN);

    expect(Array.from(element.querySelectorAll('markdown h2')).map((h) => h.id)).toEqual([
      'first-section',
      'second-section',
    ]);
    expect(component.headings()?.map((h: Element) => h.id)).toEqual(['first-section', 'second-section']);
  });

  it('strips the front-matter and shows its metadata', async () => {
    setup();
    const { component, element, fixture } = await render(MARKDOWN);

    expect(element.querySelector('markdown')?.textContent).not.toContain('title: Playground spec');
    expect(component.metadata()?.data).toEqual({ title: 'Playground spec', tags: ['a', 'b'] });

    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(element.querySelectorAll('.metadata dt')).toHaveLength(2);
    });
    const terms = Array.from(element.querySelectorAll('.metadata dt')).map((dt) => dt.textContent?.trim());
    const values = Array.from(element.querySelectorAll('.metadata dd')).map((dd) => dd.textContent?.trim());
    expect(terms).toEqual(['title', 'tags']);
    expect(values).toEqual(['Playground spec', 'a, b']);
  });

  it('formats nested front-matter values readably', async () => {
    setup();
    const { element, fixture } = await render(NESTED_MARKDOWN);

    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(element.querySelectorAll('.metadata dt')).toHaveLength(3);
    });
    const panel = element.querySelector('.metadata')?.textContent ?? '';
    expect(panel).not.toContain('[object Object]');
    // ? The parser keeps a nested mapping, or a list of mappings, as its dedented source text
    expect(panel).toContain('name: Ada');
    expect(panel).toContain('label: Docs');
  });

  it('shows the empty-events placeholder until an output fires', async () => {
    setup();
    const { component, element, fixture } = create();
    await fixture.whenStable();

    expect(element.querySelector('.events .events-empty')).not.toBeNull();

    component.onCopied({ text: 'abc', language: 'ts' } as MarkdownCopyEvent);
    await fixture.whenStable();

    expect(element.querySelector('.events .events-empty')).toBeNull();
    expect(element.querySelector('.events li')?.textContent).toContain('(copied)');
  });

  it('keeps the latest events first, capped, and flags the failed ones', () => {
    setup();
    const { component } = create();

    for (let i = 1; i <= 6; i++) {
      component.onCopied({ text: 'x'.repeat(i), language: undefined } as unknown as MarkdownCopyEvent);
    }
    component.onCopyError({ error: new Error('denied') });

    const events = component.events();
    expect(events).toHaveLength(5);
    expect(events[0]).toMatchObject({ name: 'copyError', detail: 'denied', failed: true });
    expect(events.slice(1).map((e: { detail: string }) => e.detail)).toEqual([
      '6 characters of plain text',
      '5 characters of plain text',
      '4 characters of plain text',
      '3 characters of plain text',
    ]);
    expect(events.slice(1).every((e: { failed: boolean }) => !e.failed)).toBe(true);
  });

  it('formats the output events', () => {
    setup();
    const { component } = create();
    const latest = () => component.events()[0];

    component.onCopied({ text: 'abcd', language: 'ts' } as MarkdownCopyEvent);
    expect(latest()).toMatchObject({ name: 'copied', detail: '4 characters of ts', failed: false });

    component.onMermaidExported({ filename: 'flow.svg', svg: '<svg/>' } as MarkdownMermaidExportEvent);
    expect(latest()).toMatchObject({ name: 'mermaidExported', detail: 'flow.svg (6 characters of SVG)' });

    component.onMermaidExportError({
      filename: 'flow.svg',
      error: new Error('boom'),
    } as MarkdownMermaidExportErrorEvent);
    expect(latest()).toMatchObject({ name: 'mermaidExportError', detail: 'flow.svg: boom', failed: true });

    const image = document.createElement('img');
    image.src = 'https://example.org/cat.png';
    image.alt = 'A cat';
    component.onImageClick({ image, index: 1, images: [image, image] } as unknown as MarkdownImageClickEvent);
    expect(latest()).toMatchObject({ name: 'imageClick', detail: 'A cat (2 of 2)', failed: false });

    component.onError('Not found');
    expect(latest()).toMatchObject({ name: 'error', detail: 'Not found', failed: true });

    component.onError(new Error('Failed'));
    expect(latest()).toMatchObject({ name: 'error', detail: 'Failed', failed: true });

    const failure = (): MermaidRenderFailure => ({ element: document.createElement('div'), error: new Error('bad') });
    const failures = [failure(), failure()];
    component.onError(new MermaidRenderError(failures, 3));
    expect(latest()).toMatchObject({ name: 'error', detail: '2 Mermaid diagram(s) failed', failed: true });
  });
});
