import {Injectable} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MarkdownLinkService {
  constructor(
    private _route: ActivatedRoute,
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

  private isInternalUrl(href: string | null): boolean {
    return !href
      || href.startsWith('#')
      || href.includes('#')
      || href.startsWith('/internal:')
      || href.startsWith('../');
  }

  private internalUrlHandler(target: HTMLAnchorElement): void {
    let hyperlink = target.getAttribute('href')!;

    if (hyperlink.startsWith('/internal:')) {
      hyperlink = hyperlink.replace('/internal:', '');
    }

    this.navigate(`/${hyperlink}`);

    return;
  }

  /**
   * Strips the query string from a URL
   * @param url - The URL to strip the query string from
   * @private - This method is private and should not be accessed outside of this class
   */
  private stripQuery(url: string): string {
    const result = /[^?]*/.exec(url);
    return result ? result[0] : url;
  }

  /**
   * Strips the fragment and query string from a URL
   * @param url - The URL to strip the fragment and query string from
   * @private - This method is private and should not be accessed outside of this class
   */
  private stripFragmentAndQuery(url: string): string {
    const result = /[^#]*/.exec(url);
    return this.stripQuery(result ? result[0] : url);
  }

  /**
   * Generates a URL tree from a URL
   * @param url - The URL to generate a URL tree from
   * @private - This method is private and should not be accessed outside of this class
   */
  private getUrlTree(url: string): UrlTree {
    const urlPath = this.stripFragmentAndQuery(url) || this.stripFragmentAndQuery(this._router.url);
    const parsedUrl = this._router.parseUrl(url);
    const fragment = parsedUrl.fragment || undefined;
    const queryParams = parsedUrl.queryParams;
    return this._router.createUrlTree([urlPath], {relativeTo: this._route, fragment, queryParams});
  }

  /**
   * Navigates to a URL
   * @param url - The URL to navigate to
   * @param replaceUrl - Whether to replace the current URL in the browser history
   * @private - This method is private and should not be accessed outside of this class
   */
  private navigate(url: string, replaceUrl = false) {
    const urlTree = this.getUrlTree(url);
    this._router.navigated = false;
    this._router.navigateByUrl(urlTree, {replaceUrl});
  }

  interceptClick(event: Event) {
    const element = event.target;
    if (!(element instanceof HTMLAnchorElement)) return;

    const href = element.getAttribute('href');

    if (!href) return;

    event.preventDefault();

    // If an internal URL is clicked
    if (this.isInternalUrl(href)) {
      this.internalUrlHandler(element);
      event.stopPropagation();
      return;
    }

    // If an external URL is clicked
    if (this.isExternalUrl(href)) {
      this.externalUrlHandler(element);
      event.stopPropagation();
      return;
    }
  }
}
