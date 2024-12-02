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
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach((x) => headings.push(x));
    this.headings = headings;
  }

  /**
   * Strip the content of the markdown
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
