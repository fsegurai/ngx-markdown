import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { appConfig } from '@app/app.config';
import MarkedExtendedComponent from './marked-extended.component';

// ? Small stand-ins for the remote files, keyed by file name; any other file gets the generic content
const REMOTE: Record<string, string> = {
  'tabs.md': [
    '````tabs',
    'label: First',
    '',
    'First panel.',
    '',
    '---',
    'label: Second',
    '',
    'Second panel.',
    '````',
  ].join('\n'),
  'lists.md': ['- [ ] Write the spec', '- [x] Ship the page', '', '1. Numeric', '    a. Alphabetic'].join('\n'),
};

// ? Script attributes are what the sanitizer must strip: the page keeps Angular's default sanitizer
const GENERIC = 'Remote content <img src="remote.png" alt="remote" onerror="alert(1)">';

function setup() {
  // ? withClipboard() needs the ClipboardJS global, a script of the app build that is not loaded in tests
  vi.stubGlobal(
    'ClipboardJS',
    class {
      on(): void {}
      destroy(): void {}
    },
  );
  TestBed.configureTestingModule({ providers: [...appConfig.providers, provideHttpClientTesting()] });
}

async function render() {
  const fixture = TestBed.createComponent(MarkedExtendedComponent);
  const element: HTMLElement = fixture.nativeElement;
  const http = TestBed.inject(HttpTestingController);
  await vi.waitFor(
    async () => {
      // ? The pending requests keep the fixture unstable: they are flushed before waiting for it
      fixture.detectChanges();
      for (const request of http.match(() => true)) {
        const file = request.request.url.split('/').pop() ?? '';
        request.flush(REMOTE[file] ?? GENERIC);
      }
      await fixture.whenStable();
      expect(element.querySelector('[role="tab"]')).not.toBeNull();
      expect(element.querySelector('[role="checkbox"]')).not.toBeNull();
    },
    { timeout: 3000, interval: 20 },
  );
  return { fixture, element };
}

function loggedEvents(element: HTMLElement): string[] {
  return Array.from(element.querySelectorAll('.events li code')).map((code) => code.textContent?.trim() ?? '');
}

describe('MarkedExtendedComponent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders the remote showcases with the sanitizer on', async () => {
    setup();
    const { element } = await render();

    const images = element.querySelectorAll('markdown img[alt="remote"]');
    expect(images.length).toBeGreaterThan(0);
    expect(element.querySelector('[onerror]')).toBeNull();
    expect(element.querySelectorAll('h2').length).toBeGreaterThan(10);
  });

  it('logs the tabs switch of the tabs runtime', async () => {
    setup();
    const { fixture, element } = await render();
    const tabs = Array.from(element.querySelectorAll<HTMLElement>('[role="tab"]'));

    tabs[1].click();

    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(loggedEvents(element)).toContain('marked-extended:tabs:switch');
    });
  });

  it('logs the task toggle of the lists runtime', async () => {
    setup();
    const { fixture, element } = await render();
    const task = element.querySelector<HTMLElement>('[role="checkbox"]');

    task?.click();

    await vi.waitFor(async () => {
      await fixture.whenStable();
      expect(task?.getAttribute('aria-checked')).toBe('true');
      expect(loggedEvents(element)).toContain('marked-extended:lists:toggle');
    });
  });

  it('applies the list tokenizer of the lists package', async () => {
    setup();
    const { fixture, element } = await render();

    // ? The tokenizer gives the alphabetic numbering, and the source position of the tasks the toggle reports
    expect(element.querySelector('ol[type="a"]')).not.toBeNull();
    element.querySelector<HTMLElement>('[role="checkbox"]')?.click();
    await vi.waitFor(async () => {
      await fixture.whenStable();
      // ? The toggle entry itself, whatever other events were logged after it
      const toggle = Array.from(element.querySelectorAll('.events li')).find(
        (entry) => entry.querySelector('code')?.textContent?.trim() === 'marked-extended:lists:toggle',
      );
      expect(toggle?.querySelector('span')?.textContent).toContain('"line":0');
    });
  });
});
