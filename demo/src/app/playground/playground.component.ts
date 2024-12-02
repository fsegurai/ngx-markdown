import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KatexOptions, MarkdownComponent, MarkdownService, MarkedToken, MermaidAPI } from 'ngx-markdown';
import { playgroundDemo } from '@app/playground/remote/demo';
import { debounce } from '@shared/debounce/debounce';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-playground',
  imports: [
    FlexModule,
    FormsModule,
    MarkdownComponent,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PlaygroundComponent implements OnInit, OnDestroy {
  private markdownService = inject(MarkdownService);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private changeDetector = inject(ChangeDetectorRef);

  // property to handle override as per marked documentation, if a renderer
  // function returns `false` it will fall back to previous implementation
  protected headings: Element[] | undefined;
  protected markdownRendering: string | undefined;

  private debounceRendering = debounce(() => this.updateMarkdownRendering(), 1000);
  private _markdownContent = playgroundDemo;

  get markdownContent() {
    return this._markdownContent;
  }

  set markdownContent(value: string) {
    this._markdownContent = value;
    this.debounceRendering();
  }

  protected katexOptions: KatexOptions = {
    displayMode: true,
    throwOnError: false,
    errorColor: '#cc0000',
    macros: {
      '\\RR': '\\mathbb{R}',
      '\\NN': '\\mathbb{N}',
      '\\ZZ': '\\mathbb{Z}',
      '\\QQ': '\\mathbb{Q}',
      '\\f': '#1f(#2)',
      '\\g': '#1g(#2)',
      '\\h': '#1h(#2)',
    },
  };
  protected mermaidOptions: MermaidAPI.MermaidConfig = {
    theme: 'dark',
  };

  ngOnInit(): void {
    this.updateMarkdownRendering();
  }

  ngOnDestroy(): void {
    this.headings = undefined;
  }

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
   * Strip the content of the Markdown component to only show the content of the Markdown file
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

  /**
   * Update the Markdown rendering with the current Markdown content and apply custom rendering
   * @private - This method is private and should not be accessed outside of this class
   */
  private updateMarkdownRendering(): void {
    this.markdownRendering = this.markdownContent;

    this.markdownService.renderer.heading = ({text, depth}: MarkedToken.Heading) => {
      const parsedText = this.markdownService.parseInline(text); // Parse inline Markdown text to HTML
      const escapedText = text
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean)
        .join('-'); // Remove special characters and join words with hyphens. e.g. "Hello, World!" -> "hello-world"
      return `<h${depth} id="${escapedText}">${parsedText}</h${depth}>`;
    }

    this.changeDetector.detectChanges(); // Manually trigger change detection
  }
}
