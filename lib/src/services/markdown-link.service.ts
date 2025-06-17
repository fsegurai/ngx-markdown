import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MarkdownRouterLinkOptions } from '../markdown/markdown.component';

@Injectable({
  providedIn: 'root',
})
export class MarkdownLinkService {
  // * == SERVICE INJECTIONS ==
  private _router = inject(Router);

  /**
   * Defines a set of known external URL patterns that should always be opened outside the Angular application.
   * This includes common web protocols, mailto, tel, SMS, geo, file, and data URIs.
   */
  private readonly EXTERNAL_URL_PATTERNS = [
    /^https?:\/\//, // http:// or https://
    /^www\./,      // common web prefix (e.g., www.example.com)
    /^ftp:\/\//,
    /^ftps:\/\//,
    /^mailto:/,
    /^tel:/,
    /^sms:/,
    /^geo:/,
    /^file:\/\//, // Explicitly file:/// to avoid `/localFile:` confusion
    /^data:/,
  ];

  /**
   * Defines a set of known internal URL patterns that should be handled by the Angular router
   * or specific internal application logic (like scrolling or local file access).
   * This includes fragment identifiers, custom routerLink flags, relative paths,
   * absolute paths within the app, and the custom '/localFile:' directive.
   */
  private readonly INTERNAL_URL_PATTERNS = [
    /^#/,              // Fragment identifiers (e.g., #section)
    /^\/routerLink:/,  // Custom Angular router link flag (e.g., /routerLink:/path/to/route)
    /^\.\.\//,         // Relative parent directory (e.g., ../some-page)
    /^\.\//,           // Relative current directory (e.g., ./some-page)
    /^\//,             // Absolute path within the application (e.g., /dashboard, /users/profile)
    /^\/localFile:/,   // Custom flag for local file access (e.g., /localFile:assets/doc.pdf)
  ];

  /**
   * Checks if a given URL is an external link.
   * External URLs typically start with a protocol (http, https, ftp, mailto, tel, sms, geo, file, data)
   * or a known external domain prefix (www.).
   * @param href The URL string to check.
   *
   * @private - This method is private and should not be accessed outside this class
   * @returns True if the URL is external, false otherwise.
   */
  private isExternalUrl(href: string): boolean {
    if (!href) return false;

    return this.EXTERNAL_URL_PATTERNS.some(pattern => pattern.test(href));
  }

  /**
   * Handles external URLs by opening them in a new tab.
   * Removes any custom internal flags like '/localFile': before opening.
   * @param target The HTMLAnchorElement that triggered the action.
   * @private - This method is private and should not be accessed outside of this class
   */
  private externalUrlHandler(target: HTMLElement): void {
    const hyperlink = target.getAttribute('href')!;

    if (!hyperlink) {
      console.warn('Attempted to handle external URL without href attribute.');
      return;
    }

    target.setAttribute('target', '_blank');
    window.open(hyperlink, '_blank');
  }

  /**
   * Checks if a given URL is an internal link.
   * Internal URLs are considered those starting with '#' (fragments),
   * '/routerLink:' (custom Angular routing flag), or '.. /' (relative paths).
   * It also includes paths that don't match external URL patterns.
   * @param href The URL string to check.
   *
   * @private - This method is private and should not be accessed outside this class
   * @returns True if the URL is internal, false otherwise.
   */
  private isInternalUrl(href: string): boolean {
    if (!href) return false;

    // If it's explicitly an external URL, it's not internal.
    if (this.isExternalUrl(href)) return false;

    // Otherwise, check if it matches any of the internal patterns.
    return this.INTERNAL_URL_PATTERNS.some(pattern => pattern.test(href));
  }

  /**
   * Navigates using the Angular Router with optional fragment and NavigationExtras.
   * This helper function centralizes the routing logic.
   * @param commands The path segments for Angular Router.
   * @param fragment The URL fragment to scroll to (optional).
   * @param routerLinkOptions Options containing global or path-specific NavigationExtras.
   * @private - This method is private and should not be accessed outside of this class
   */
  private handleRouterNavigation(
    commands: string,
    fragment: string | undefined,
    routerLinkOptions?: MarkdownRouterLinkOptions,
  ): void {
    let extras: NavigationExtras = {};

    if (routerLinkOptions?.paths?.[commands]) {
      extras = { ...routerLinkOptions.paths[commands] }; // Clone to avoid modifying the original
    } else if (routerLinkOptions?.global) {
      extras = { ...routerLinkOptions.global }; // Clone to avoid modifying the original
    }

    if (fragment) {
      extras.fragment = fragment;
    }

    void this._router.navigate([commands], extras);
  }

  /**
   * Handles navigation for internal URLs using the Angular Router.
   * Supports hash fragments, custom routerLink paths, and general internal paths.
   * Applies global or path-specific `NavigationExtras` if provided.
   * @param target The HTMLAnchorElement that triggered the action.
   * @param routerLinkOptions Optional options for router link behavior.
   * @private - This method is private and should not be accessed outside of this class
   */
  private internalUrlHandler(target: HTMLAnchorElement, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const path = target.getAttribute('href');

    if (!path) {
      console.warn('Attempted to handle internal URL without href attribute.');
      return;
    }

    if (routerLinkOptions?.internalBrowserHandler) {
      // --- Special handling for /localFile: URLs ---
      if (path.startsWith('/localFile:')) {
        const localFilePath = path.replace('/localFile:', '');
        target.setAttribute('target', '_blank'); // Ensure it opens in a new tab
        window.open(localFilePath, '_blank'); // Open local file paths externally
        return;
      }
      // --- End special handling ---

      if (path.startsWith('#')) {
        void this._router.navigate([], { fragment: path.slice(1) });
        return;
      }

      if (path.startsWith('/routerLink:')) {
        const routerLinkPath = path.replace('/routerLink:', '');
        const [commands, fragment] = routerLinkPath.split('#');
        this.handleRouterNavigation(commands, fragment);
        return;
      }

      // Default handling for other internal paths (e.g., relative paths, absolute paths)
      const [commands, fragment] = path.split('#');
      this.handleRouterNavigation(commands, fragment);
      return;
    } else {
      // Assuming internalDesktopHandler implies scrolling to ID without Angular Router
      try {
        const elementId = path.startsWith('#') ? path.slice(1) : path;
        const targetElement = document.getElementById(elementId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If not an ID, and it's a localFile: path, the desktop app would handle opening the file
          // This part would typically interface with Electron, Capacitor, etc., not directly with window.open
          console.warn(`MarkdownLinkService: Element with ID "${ elementId }" not found for scrolling. For desktop, consider implementing native file open for "${ path }".`);
        }
      } catch (error) {
        console.error('MarkdownLinkService: Error attempting to scroll to element or handle desktop link:', error);
      }
    }
  }

  /**
   * Intercepts click events on anchor elements within Markdown content to handle navigation.
   * Differentiates between internal and external links based on provided options and URL structure.
   * @param event The click event object.
   * @param routerLinkOptions Optional options to configure link handling behavior.
   */
  interceptClick(event: Event, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const element = event.target as HTMLAnchorElement; // Cast directly for better type inference

    // Ensure the clicked element is an anchor or within one
    const anchor = element.nodeName.toLowerCase() === 'a' ? element : element.closest('a');

    if (!anchor || !anchor.href) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const isExternalCandidate = this.isExternalUrl(href);
    const isInternalCandidate = this.isInternalUrl(href);

    const shouldHandleInternal = routerLinkOptions?.internalBrowserHandler || routerLinkOptions?.internalDesktopHandler;
    const shouldHandleExternal = routerLinkOptions?.externalBrowserHandler;

    // Prioritize handling if specific options are enabled and the link matches the type
    if (shouldHandleExternal && isExternalCandidate) {
      event.preventDefault();
      event.stopPropagation();
      this.externalUrlHandler(anchor);
    } else if (shouldHandleInternal && isInternalCandidate) {
      event.preventDefault();
      event.stopPropagation();
      this.internalUrlHandler(anchor, routerLinkOptions);
    }
    // If no specific handler applies, let the default browser behavior occur.
    // This allows for normal behavior for non-intercepted links (e.g., direct asset downloads).
  }
}
