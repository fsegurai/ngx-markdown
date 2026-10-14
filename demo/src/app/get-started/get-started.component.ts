import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpRawLoaderService } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { MarkdownComponent, type MarkdownError, type MarkdownHeading } from 'ngx-markdown';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { prepareReadme } from './readme';

/** Shown instead of the README when it cannot be loaded or is empty, so the page never ends up empty */
const README_FALLBACK =
  'The README could not be loaded. Read it on [GitHub](https://github.com/fsegurai/ngx-markdown#readme).';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent, ScrollspyNavLayoutComponent],
})
export default class GetStartedComponent {
  // * == SERVICE INJECTIONS ==
  private rawLoaderService = inject(HttpRawLoaderService);

  // * == PROPERTIES ==
  protected readonly headings = signal<Element[] | undefined>(undefined);
  // ? The README is prepared as text, so the rendered output never depends on post-render DOM edits
  // ? A failed fetch is logged and replaced by a fallback message; toSignal would otherwise rethrow it on read
  protected readonly readme = toSignal(
    this.rawLoaderService.get('README.md').pipe(
      // ? An empty README would render nothing at all, so it gets the fallback message as well
      map((markdown) => prepareReadme(markdown).trim() || README_FALLBACK),
      catchError((error: unknown) => {
        console.error('Failed to load the README', error);
        return of(README_FALLBACK);
      }),
    ),
  );

  /**
   * Log a render failure. The side navigation is still built: the `headings` output is emitted once the content is in
   * the page, before the post-render plugins (e.g. syntax highlighting) run
   * @param error - The render error emitted by the markdown component
   */
  protected onRenderError(error: MarkdownError): void {
    console.error('Failed to render the README', error);
  }

  /**
   * Build the scrollspy navigation from the h2 headings of the README (their ids come from marked-gfm-heading-id;
   * `[headingIds]` gives a slug to any heading rendered without one)
   * @param headings - The headings emitted by the markdown component, with their elements
   */
  protected onHeadings(headings: MarkdownHeading[]): void {
    this.headings.set(
      headings
        .filter((heading) => heading.level === 2 && heading.id && heading.element)
        .map((heading) => heading.element as HTMLElement),
    );
  }
}
