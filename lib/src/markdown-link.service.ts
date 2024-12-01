import {Injectable, inject} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {MarkdownRouterLinkOptions} from './markdown.component';

@Injectable({
  providedIn: 'root',
})
export class MarkdownLinkService {
  private _router = inject(Router);

  /**
   * Check if the URL is an external URL
   * @param href - string - URL to check
   * @private - This method is private and should not be accessed outside of this class
   */
  private isExternalUrl(href: string): boolean {
    return !href
      || (href.startsWith('/') && !href.startsWith('/routerLink:'))
      || href.startsWith('http:')
      || href.startsWith('https:')
      || href.startsWith('www.')
      || href.startsWith('ftp:')
      || href.startsWith('ftps:')
      || href.startsWith('mailto:')
      || href.startsWith('tel:')
      || href.startsWith('sms:')
      || href.startsWith('geo:')
      || href.startsWith('file:')
      || href.startsWith('data:')
      || href.startsWith('/localFile:'); // Custom Angular flag for local files. e.g. /localFile:/path/to/file ~ /localFile:favicon.ico
  }

  /**
   * Handle the external URL clicked by the user and open it in a new tab
   * @param target - HTMLElement - Target element that contains the URL
   * @private - This method is private and should not be accessed outside of this class
   */
  private externalUrlHandler(target: HTMLElement): void {
    let hyperlink = target.getAttribute('href')!;

    // * Remove custom Angular flags from the URL for local files. e.g. /localFile:/path/to/file ~ /localFile:favicon.ico
    hyperlink = hyperlink.replace('/localFile:', '');

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
    const angularAnchorAttributes = ['_ngcontent', 'data-routerlink', 'routerlink'];

    return !href || (
      /^#|\/routerLink|\.\.\//.test(href) ||
      element.getAttributeNames().some(n => angularAnchorAttributes.some(a => n.toLowerCase().includes(a)))
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
    /**
     * Handle the navigation based on the options provided
     * @param commands - string - Path to navigate to using the router service
     * @param fragment - string - Fragment to scroll to after navigation
     */
    const handleNavigation = (commands: string, fragment?: string) => {
      let extras: NavigationExtras | undefined;

      if (routerLinkOptions?.paths) {
        extras = routerLinkOptions.paths[commands];
      }
      if (!extras && routerLinkOptions?.global) {
        extras = routerLinkOptions.global;
      }
      if (fragment) {
        extras = extras || {};
        extras.fragment = fragment;
      }

      void this._router.navigate([commands], extras);
    };

    if (routerLinkOptions?.internalBrowserHandler) {
      if (path.startsWith('#')) {
        void this._router.navigate([], {fragment: path.slice(1)});
        return;
      }

      if (path.startsWith('/routerLink:')) {
        const routerLinkPath = path.replace('/routerLink:', '');
        const [commands, fragment] = routerLinkPath.split('#');
        handleNavigation(commands, fragment);
        return;
      }

      // Fallback for other internal URLs
      const [commands, fragment] = path.split('#');
      handleNavigation(commands, fragment);
      return;
    } else {
      try {
        // Validate if there are more than one element with the same id
        const elements = document.querySelectorAll(path);

        // Scroll to the first element with the id
        elements[0].scrollIntoView({behavior: 'smooth'});
        return;
      } catch (error) {
        console.error(error);
      }
    }
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
