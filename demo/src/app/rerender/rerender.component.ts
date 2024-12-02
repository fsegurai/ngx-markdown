import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MarkdownComponent, MarkdownService, MarkedToken } from 'ngx-markdown';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-rerender',
  templateUrl: './rerender.component.html',
  styleUrls: ['./rerender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexModule,
    FormsModule,
    MarkdownComponent,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ]
})
export default class RerenderComponent implements OnInit, OnDestroy {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private markdownService = inject(MarkdownService);

  // property to handle override as per marked documentation, if a renderer
  // function returns `false` it will fall back to previous implementation
  protected headings: Element[] | undefined;
  protected markdown = `## Markdown rules!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;
  // https://marked.js.org/using_pro#renderer
  private overrideEnabled = false;

  private _accentColor = '';

  get accentColor(): string {
    return this._accentColor;
  }

  set accentColor(value: string) {
    if (this._accentColor === value) {
      return;
    }
    this._accentColor = value;
    this.changeAccentColor();
  }

  ngOnInit(): void {
    this.setHeadings();
  }

  ngOnDestroy(): void {
    this.resetRenderer();
  }

  /**
   * Set the color of the headings in the markdown
   * @private - This method is private and should not be accessed outside of this class
   */
  private changeAccentColor(): void {
    const styleAttribute = this.accentColor
      ? ` style="color: ${this.accentColor}"`
      : '';

    this.overrideRenderer(styleAttribute);

    this.markdownService.reload();
  }

  /**
   * Override the renderer to add a style attribute to the headings
   * @param styleAttribute - The style attribute to add to the headings
   * @private - This method is private and should not be accessed outside of this class
   */
  private overrideRenderer(styleAttribute: string): void {
    this.overrideEnabled = true;

    this.markdownService.renderer.heading = ({text, depth}: MarkedToken.Heading): string => {
      if (this.overrideEnabled) {
        const parsedText = this.markdownService.parseInline(text); // Parse inline Markdown text to HTML
        return `<h${depth}${styleAttribute}>${parsedText}</h${depth}>`;
      }

      return false as unknown as string;
    }
  }

  /**
   * Reset the renderer to the default implementation
   * @private - This method is private and should not be accessed outside of this class
   */
  private resetRenderer(): void {
    this.overrideEnabled = false;
  }

  /**
   * Set the headings for the scrollspy
   * @private - This method is private and should not be accessed outside of this class
   */
  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
