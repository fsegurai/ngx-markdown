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
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected headings: Element[] | undefined;

  onLoad(): void {
    this.stripContent();
    this.setHeadings();
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

  /**
   * Strip the content of the markdown to remove the first two paragraphs and the table of contents
   * @private - This method is private and should not be accessed outside of this class
   */
  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll(
        'markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents',
      )
      .forEach((x) => x.remove());
  }
}
