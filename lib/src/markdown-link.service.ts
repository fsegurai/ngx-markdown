import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MarkdownRouterLinkOptions } from './markdown.component';

@Injectable({
  providedIn: 'root',
})
export class MarkdownLinkService {
  constructor(
    private _router: Router,
  ) {
  }

  /**
   * Check if the URL is an external URL
   * @param href - string - URL to check
   * @private - This method is private and should not be accessed outside of this class
   */
  private isExternalUrl(href: string): boolean {
    return !href
      || href.startsWith('/')
      || href.startsWith('http:')
      || href.startsWith('https:')
      || href.startsWith('mailto:')
      || href.startsWith('tel:')
      || href.startsWith('sms:')
      || href.startsWith('geo:')
      || href.startsWith('ftp:')
      || href.startsWith('file:')
      || href.startsWith('data:');
  }

  /**
   * Handle the external URL clicked by the user and open it in a new tab
   * @param target - HTMLElement - Target element that contains the URL
   * @private - This method is private and should not be accessed outside of this class
   */
  private externalUrlHandler(target: HTMLElement): void {
    const hyperlink = target.getAttribute('href')!;

    target.setAttribute('target', '_blank');
    window.open(hyperlink, '_blank');
  }

  /**
   * Check if the URL is an internal URL
   * @param href - string - URL to check
   * @param element - HTMLAnchorElement - Element that contains the URL
   * @private - This method is private and should not be accessed outside of this class
   */
  private isInternalUrl(href: string, element: HTMLAnchorElement): boolean {
    return !href || (
      /^#|\/routerLink|\.\.\//.test(href) ||
      element.getAttributeNames().some(n => n.includes('_ngcontent') || n.toLowerCase().includes('data-routerlink'))
    );
  }

  /**
   * Handle the internal URL clicked by the user and navigate to the path using the router service
   * @param target - HTMLAnchorElement - Target element that contains the internal URL
   * @param routerLinkOptions - MarkdownRouterLinkOptions - Options to handle the internal URL
   * @private - This method is private and should not be accessed outside of this class
   */
  private internalUrlHandler(target: HTMLAnchorElement, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const anchor = target.nodeName.toLowerCase() === 'a' ? target : target.closest('a');
    const path = anchor!.getAttribute('href')!;

    if (routerLinkOptions?.internalBrowserHandler) {
      if (path.startsWith('#')) {
        this._router.navigate([], { fragment: path.slice(1) });
        return;
      }

      // Get the routerLink commands to navigate to
      let commands = [anchor!.getAttribute('data-routerLink')!];

      let extras: NavigationExtras | undefined;
      // Find the path in the routerLinkOptions
      if (routerLinkOptions?.paths) {
        extras = routerLinkOptions.paths[path];
      }
      // Get the global options if no path was found
      if (!extras && routerLinkOptions?.global) {
        extras = routerLinkOptions.global;
      }
      // If the route has a fragment, add it to the extras and remove it from the commands to leave the path
      if (path.includes('#')) {
        extras = extras || {};
        extras.fragment = path.split('#')[1];
        commands[0] = commands[0].split('#')[0];
      }

      // Remove the first slash from the path
      commands = commands.map(c => c.startsWith('/') ? c.slice(1) : c);

      // Navigate to the path using the router service
      this._router.navigate(commands, extras);
    } else {
      try {
        // Validate if there are more than one element with the same id
        const elements = document.querySelectorAll(path);

        // Scroll to the first element with the id
        elements[0].scrollIntoView({ behavior: 'smooth' });
        return;
      } catch (error) {
        console.error(error);
      }
    }

    return;
  }

  /**
   * Intercept the click event on an anchor element and handle the URL based on the options provided
   * @param event - Event - Click event
   * @param routerLinkOptions - MarkdownRouterLinkOptions - Options to handle the URL
   */
  interceptClick(event: Event, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const element = event.target;
    if (!(element instanceof HTMLAnchorElement)) return;

    const href = element.getAttribute('href');

    if (!href) return;

    // If an internal URL is clicked
    if ((routerLinkOptions?.internalBrowserHandler || routerLinkOptions?.internalDesktopHandler)
      && this.isInternalUrl(href, element)) {
      event.preventDefault();
      event.stopPropagation();
      this.internalUrlHandler(element, routerLinkOptions);
      return;
    }

    // If an external URL is clicked
    if (routerLinkOptions?.externalBrowserHandler && this.isExternalUrl(href)) {
      event.preventDefault();
      event.stopPropagation();
      this.externalUrlHandler(element);
      return;
    }
  }
}
