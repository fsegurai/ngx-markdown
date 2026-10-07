import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, type OnInit, signal } from '@angular/core';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'app-syntax-highlight',
  templateUrl: './syntax-highlight.component.html',
  styleUrl: './syntax-highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, LanguagePipe, MarkdownComponent, MarkdownPipe, ScrollspyNavLayoutComponent],
})
export default class SyntaxHighlightComponent implements OnInit {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  // * == PROPERTIES ==
  readonly headings = signal<Element[] | undefined>(undefined);
  myValue: string = "print('hello-world')";

  ngOnInit(): void {
    this.setHeadings();
  }

  /**
   * Set the headings for the scrollspy
   * @private - This method is private and should not be accessed outside of this class
   */
  private setHeadings(): void {
    // Array.from: NodeList.forEach is not available in every DOM implementation.
    const headings: Element[] = Array.from(this.elementRef.nativeElement.querySelectorAll('h2'));
    this.headings.set(headings);
  }
}
