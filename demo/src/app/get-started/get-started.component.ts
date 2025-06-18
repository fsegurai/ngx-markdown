import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent, ScrollspyNavLayoutComponent]
})
export default class GetStartedComponent {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  // * == PROPERTIES ==
  protected headings: Element[] | undefined;

  onLoad(): void {
    this.stripContent();
    this.setHeadings();
  }

  /**
   * Strip the content of the Markdown to remove the first two paragraphs and the table of contents
   * @private - This method is private and should not be accessed outside of this class
   */
  private stripContent(): void {
    const markdown = this.elementRef.nativeElement.querySelector('ngx-markdown')!;
    // Remove the first two paragraphs
    markdown.querySelectorAll('p:nth-child(-n + 2)').forEach((x) => x.remove());
    // Remove the "Table of contents" heading and the next sibling (the list)
    const tocHeading = Array.from(markdown.querySelectorAll('h3')).find(
      (h) => h.textContent?.trim().toLowerCase() === 'table of contents'
    );
    if (tocHeading) {
      const tocList = tocHeading.nextElementSibling;
      tocHeading.remove();
      if (tocList && tocList.tagName.toLowerCase() === 'ul') tocList.remove();
    }
  }

  /**
   * Set the headings for the scrollspy
   * @private - This method is private and should not be accessed outside of this class
   */
  private setHeadings(): void {
    this.headings = Array.from(this.elementRef.nativeElement.querySelectorAll('h2')).map((heading) => {
      // ! We validate the id, because in some cases the content loaded from an external source does not render the id correctly
      if (!heading.id) heading.id = heading.textContent!.toLowerCase().replace(/\s/g, '-');
      return heading;
    });
  }
}
