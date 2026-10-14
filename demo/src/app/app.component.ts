import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  Injector,
  inject,
  type OnInit,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, type Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnchorService } from '@shared/anchor';
import { ThemeService } from '@shared/theme';
import { filter } from 'rxjs';

/**
 * Scrolls a tab list horizontally so its active tab is fully visible (centred when it was not), and does nothing when
 * it already is. The tab list scrolls natively (its pagination is disabled), so Material does not do this.
 * @param container The scrolling tab list.
 * @param active The active tab link.
 */
export const revealActiveTab = (container: HTMLElement, active: HTMLElement): void => {
  const list = container.getBoundingClientRect();
  const tab = active.getBoundingClientRect();
  if (tab.left >= list.left && tab.right <= list.right) return;

  container.scrollLeft += tab.left - list.left - (list.width - tab.width) / 2;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(window:scroll)': 'onWindowScroll()',
  },
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  private document = inject<Document>(DOCUMENT);
  private anchorService = inject(AnchorService);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected routes: Route[];
  protected readonly theme = this.themeService.theme;

  private readonly tabHeader = viewChild('tabHeader', { read: ElementRef });
  private readonly stickyClassName = 'mat-mdc-tab-nav-bar--sticky';

  constructor() {
    this.routes = this.router.config.filter((route) => route.data && route.data['label']);

    // The tab list is wider than the viewport: after each navigation, once the active tab is rendered, scroll the list
    // so that tab is visible. A page without a tab (e.g. /perf) reads no layout.
    const injector = inject(Injector);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => afterNextRender({ read: () => this.revealActiveTab() }, { injector }));

    // The tabs grow when their web font and icons load (after the first reveal): reveal again when the tabs resize
    afterNextRender({
      read: () => {
        const links = this.tabHeader()?.nativeElement.querySelector('.mat-mdc-tab-links');
        if (links == null || typeof ResizeObserver === 'undefined') return;

        const observer = new ResizeObserver(() => this.revealActiveTab());
        observer.observe(links);
        injector.get(DestroyRef).onDestroy(() => observer.disconnect());
      },
    });
  }

  /** Scrolls the tab list so the active tab is visible (nothing to do on a page without a tab). */
  private revealActiveTab(): void {
    const header: HTMLElement | undefined = this.tabHeader()?.nativeElement;
    const container = header?.querySelector<HTMLElement>('.mat-mdc-tab-link-container');
    const active = header?.querySelector<HTMLElement>('a.mdc-tab--active');
    if (container != null && active != null) revealActiveTab(container, active);
  }

  onDocumentClick(event: Event): void {
    this.anchorService.interceptClick(event);
  }

  onWindowScroll(): void {
    const tabHeaderValue = this.tabHeader();
    if (tabHeaderValue == null) return;

    const tabHeader = tabHeaderValue.nativeElement;
    const tabHeaderOffset = Math.ceil(tabHeader.offsetTop);
    const windowOffset = Math.ceil(this.document.defaultView?.scrollY ?? 0);
    const hasStickyClass = tabHeader.classList.contains(this.stickyClassName);

    if (!hasStickyClass && windowOffset >= tabHeaderOffset) tabHeader.classList.add(this.stickyClassName);
    if (hasStickyClass && windowOffset < tabHeaderOffset) tabHeader.classList.remove(this.stickyClassName);
  }

  ngOnInit(): void {
    this.anchorService.setOffset([0, 64]);

    // The theme lives in localStorage and on <body>, both browser-only. The index.html markup has no theme class:
    // the inline script in index.html applies the stored theme before the app boots, so there is no flash.
    if (!this.isBrowser) return;

    this.themeService.init();
  }

  handleFragment(): void {
    this.anchorService.scrollToAnchor();
  }

  /**
   * Scroll to the URL fragment once the routed page has finished its enter animation.
   * Animation end events bubble from nested elements, so only the routed page itself is handled.
   * @param event The animation end event.
   */
  onRouteAnimationEnd(event: AnimationEvent): void {
    if (event.target instanceof Element && event.target.parentElement === event.currentTarget) {
      this.handleFragment();
    }
  }

  /**
   * Toggle the theme between light and dark (the Mermaid diagrams of the open page follow it).
   */
  toggleTheme(): void {
    this.themeService.toggle();
  }
}
