import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KatexOptions, MarkdownComponent, MarkdownService, MermaidAPI } from 'ngx-markdown';
import { MERMAID_THEME } from '@app/app.constant';
import { playgroundDemo } from '@app/playground/remote/demo';
import { debounce } from '@shared/debounce/debounce';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-playground',
  standalone: true,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent implements OnInit, OnDestroy {
  // property to handle override as per marked documentation, if a renderer
  // function returns `false` it will fall back to previous implementation
  headings: Element[] | undefined;

  private debounceRendering = debounce(() => this.updateMarkdownRendering(), 1000);
  private _markdownContent = playgroundDemo;
  markdownRendering: string | undefined;

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
  protected mermaidOptions: MermaidAPI.Config = {
    theme: MERMAID_THEME,
  };

  constructor(
    private markdownService: MarkdownService,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetector: ChangeDetectorRef, // Inject ChangeDetectorRef
  ) {
  }

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

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach((x) => headings.push(x));
    this.headings = headings;
  }

  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll(
        'markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents',
      )
      .forEach((x) => x.remove());
  }

  private updateMarkdownRendering(): void {
    this.markdownRendering = this.markdownContent;

    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level} id="${escapedText}">${text}</h${level}>`;
    };

    this.changeDetector.detectChanges(); // Manually trigger change detection
  }
}
