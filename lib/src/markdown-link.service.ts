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

  private isExternalUrl(href: string | null): boolean {
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

  private externalUrlHandler(target: HTMLElement): void {
    const hyperlink = target.getAttribute('href')!;

    target.setAttribute('target', '_blank');
    window.open(hyperlink, '_blank');
  }

  private isInternalUrl(href: string, element: HTMLAnchorElement): boolean {
    return !href || (
      /^#|\/routerLink|\.\.\//.test(href) ||
      element.getAttributeNames().some(n => n.includes('_ngcontent') || n.toLowerCase().includes('data-routerlink'))
    );
  }

  private internalUrlHandler(target: HTMLAnchorElement, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const anchor = target.nodeName.toLowerCase() === 'a' ? target : target.closest('a');
    const path = anchor!.getAttribute('href')!;

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

    return;
  }

  interceptClick(event: Event, routerLinkOptions?: MarkdownRouterLinkOptions): void {
    const element = event.target;
    if (!(element instanceof HTMLAnchorElement)) return;

    const href = element.getAttribute('href');

    if (!href) return;

    event.preventDefault();
    event.stopPropagation();

    // If an internal URL is clicked
    if (this.isInternalUrl(href, element)) {
      this.internalUrlHandler(element, routerLinkOptions);
      return;
    }

    // If an external URL is clicked
    if (this.isExternalUrl(href)) {
      this.externalUrlHandler(element);
      return;
    }
  }
}
