import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  type OnInit,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { type Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AnchorService } from '@shared/anchor';
import { ThemeService } from '@shared/theme';

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
