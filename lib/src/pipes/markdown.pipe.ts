import { ElementRef, inject, NgZone, Pipe, PipeTransform, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { MarkdownService, ParseOptions, RenderOptions } from '../services/markdown.service';

export type MarkdownPipeOptions = ParseOptions & RenderOptions;

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  // * == SERVICE INJECTIONS ==
  private _markdownService = inject(MarkdownService);
  private _domSanitizer = inject(DomSanitizer);
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _viewContainerRef = inject(ViewContainerRef);
  private _ngZone = inject(NgZone);

  /**
   * Transforms a Markdown string into SafeHtml and triggers a post-rendering process
   * on the host element when the DOM is stable.
   *
   * @param value The Markdown string to transform. Can be null or undefined.
   * @param options Optional configuration for parsing and rendering Markdown.
   * @returns A Promise that resolves to SafeHtml ready for binding to [innerHTML].
   * Returns an empty string if the input value is null, undefined, or not a string.
   */
  async transform(value: string | null | undefined, options?: MarkdownPipeOptions): Promise<SafeHtml> {
    if (value == null) return '';

    if (typeof value !== 'string') {
      console.error(`MarkdownPipe has been invoked with an invalid value type [${ typeof value }]`);
      return value;
    }

    const parsedMarkdown = await this._markdownService.parse(value, options);

    if (this._ngZone) {
      this._ngZone.onStable
        .pipe(first())
        .subscribe(() => this._markdownService.render(this._elementRef.nativeElement, options, this._viewContainerRef));
    } else {
      this._markdownService.render(this._elementRef.nativeElement, options, this._viewContainerRef);
    }

    return this._domSanitizer.bypassSecurityTrustHtml(parsedMarkdown);
  }
}
