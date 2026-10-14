import { ApplicationRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatTabNav } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from './app.constant';

/** A page with no content, so a navigation loads nothing. */
@Component({ template: '' })
class StubPageComponent {}

/** Replaces the demo pages with empty ones (same paths and labels) and returns the router. */
const useStubPages = (): Router => {
  const router = TestBed.inject(Router);
  router.resetConfig(
    router.config
      .filter((route) => route.data?.['label'])
      .map(({ path, data }) => ({ path, data, component: StubPageComponent })),
  );
  return router;
};

describe('AppComponent', () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    document.body.className = '';
    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  it('creates the shell with one tab per labelled route and applies the default theme', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(ApplicationRef).whenStable();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('nav a[mat-tab-link]').length).toBe(8);
    expect(document.body.classList).toContain(`${DEFAULT_THEME}-theme`);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(DEFAULT_THEME);
  });

  it('disables the tab pagination, which the styles hide, so the nav never measures the page for it', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await TestBed.inject(ApplicationRef).whenStable();

    const nav = fixture.debugElement.query(By.directive(MatTabNav)).injector.get(MatTabNav);
    expect(nav.disablePagination).toBe(true);
  });

  it('scrolls the tab list so the active tab is visible after a navigation', async () => {
    const router = useStubPages();
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/get-started');
    await TestBed.inject(ApplicationRef).whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const container = element.querySelector<HTMLElement>('.mat-mdc-tab-link-container');
    expect(container).not.toBeNull();
    if (container == null) return;

    // jsdom has no layout: a 390 px wide list whose 8 tabs are 100 px wide with 30 px between them
    let scrollLeft = 0;
    Object.defineProperty(container, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
      set: (value: number) => (scrollLeft = value),
    });
    container.getBoundingClientRect = () => new DOMRect(0, 0, 390, 48);
    element.querySelectorAll<HTMLElement>('a[mat-tab-link]').forEach((link, index) => {
      link.getBoundingClientRect = () => new DOMRect(16 + index * 130 - scrollLeft, 0, 100, 48);
    });

    await router.navigateByUrl('/playground');
    await TestBed.inject(ApplicationRef).whenStable();

    const active = element.querySelector<HTMLElement>('a.mdc-tab--active');
    expect(active?.textContent).toContain('Playground');
    const rect = active?.getBoundingClientRect();
    expect(rect?.left).toBeGreaterThanOrEqual(0);
    expect(rect?.right).toBeLessThanOrEqual(390);

    // Back to the first tab: the list scrolls back so it is visible again
    await router.navigateByUrl('/get-started');
    await TestBed.inject(ApplicationRef).whenStable();
    expect(
      element.querySelector<HTMLElement>('a.mdc-tab--active')?.getBoundingClientRect().left,
    ).toBeGreaterThanOrEqual(0);
  });

  it('reveals the active tab again when the tabs resize (web font and icons loading)', async () => {
    // Material observes other elements too: keep the observers of the tab links only
    const callbacks: ResizeObserverCallback[] = [];
    const disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(private readonly callback: ResizeObserverCallback) {}
        observe(target: Element): void {
          if (target.classList.contains('mat-mdc-tab-links')) {
            callbacks.push(this.callback);
            this.disconnect = disconnect;
          }
        }
        disconnect(): void {}
      },
    );
    try {
      const router = useStubPages();
      const fixture = TestBed.createComponent(AppComponent);
      await router.navigateByUrl('/playground');
      await TestBed.inject(ApplicationRef).whenStable();
      expect(callbacks.length).toBeGreaterThan(0);

      const element: HTMLElement = fixture.nativeElement;
      const container = element.querySelector<HTMLElement>('.mat-mdc-tab-link-container');
      if (container == null) throw new Error('no tab list');
      let scrollLeft = 0;
      Object.defineProperty(container, 'scrollLeft', {
        configurable: true,
        get: () => scrollLeft,
        set: (value: number) => (scrollLeft = value),
      });
      container.getBoundingClientRect = () => new DOMRect(0, 0, 390, 48);
      // The tabs got wider: the active (last) tab is out of view again
      element.querySelectorAll<HTMLElement>('a[mat-tab-link]').forEach((link, index) => {
        link.getBoundingClientRect = () => new DOMRect(16 + index * 150 - scrollLeft, 0, 120, 48);
      });

      for (const callback of callbacks) callback([], {} as ResizeObserver);

      const rect = element.querySelector<HTMLElement>('a.mdc-tab--active')?.getBoundingClientRect();
      expect(rect?.left).toBeGreaterThanOrEqual(0);
      expect(rect?.right).toBeLessThanOrEqual(390);

      fixture.destroy();
      expect(disconnect).toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('leaves the tab list alone when the active tab is already visible', async () => {
    const router = useStubPages();
    const fixture = TestBed.createComponent(AppComponent);
    await router.navigateByUrl('/get-started');
    await TestBed.inject(ApplicationRef).whenStable();

    const element: HTMLElement = fixture.nativeElement;
    const container = element.querySelector<HTMLElement>('.mat-mdc-tab-link-container');
    if (container == null) throw new Error('no tab list');
    let writes = 0;
    Object.defineProperty(container, 'scrollLeft', { configurable: true, get: () => 0, set: () => writes++ });
    container.getBoundingClientRect = () => new DOMRect(0, 0, 1280, 48);
    element.querySelectorAll<HTMLElement>('a[mat-tab-link]').forEach((link, index) => {
      link.getBoundingClientRect = () => new DOMRect(16 + index * 130, 0, 100, 48);
    });

    await router.navigateByUrl('/cheat-sheet');
    await TestBed.inject(ApplicationRef).whenStable();

    expect(writes).toBe(0);
  });
});
