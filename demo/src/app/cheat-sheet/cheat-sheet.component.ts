import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, type OnInit, signal } from '@angular/core';
import { HttpRawLoaderService } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-cheat-sheet',
  templateUrl: './cheat-sheet.component.html',
  styleUrl: './cheat-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, MarkdownComponent, ScrollspyNavLayoutComponent],
})
export default class CheatSheetComponent implements OnInit {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private rawLoaderService = inject(HttpRawLoaderService);

  // * == PROPERTIES ==
  protected blockquotes$ = this.rawLoaderService.get('app/cheat-sheet/remote/blockquotes.md');
  protected codeAndSyntaxHighlighting$ = this.rawLoaderService.get(
    'app/cheat-sheet/remote/code-and-synthax-highlighting.md',
  );
  protected emphasis$ = this.rawLoaderService.get('app/cheat-sheet/remote/emphasis.md');
  protected headers$ = this.rawLoaderService.get('app/cheat-sheet/remote/headers.md');
  protected horizontalRule$ = this.rawLoaderService.get('app/cheat-sheet/remote/horizontal-rule.md');
  protected images$ = this.rawLoaderService.get('app/cheat-sheet/remote/images.md');
  protected links$ = this.rawLoaderService.get('app/cheat-sheet/remote/links.md');
  protected lists$ = this.rawLoaderService.get('app/cheat-sheet/remote/lists.md');
  protected listsDot$ = this.rawLoaderService.get('app/cheat-sheet/remote/lists-dot.md');
  protected tables$ = this.rawLoaderService.get('app/cheat-sheet/remote/tables.md');

  protected readonly headings = signal<Element[] | undefined>(undefined);

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
