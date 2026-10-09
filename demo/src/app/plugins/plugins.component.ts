import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  type OnInit,
  SecurityContext,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { markdownPlugins } from '@app/markdown-plugins';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { ThemeService } from '@shared/theme';
import {
  type KatexOptions,
  MarkdownComponent,
  type MarkdownCopyErrorEvent,
  type MarkdownCopyEvent,
  type MarkdownError,
  type MarkdownImageClickEvent,
  type MarkdownMermaidExportErrorEvent,
  type MarkdownMermaidExportEvent,
  type MermaidAPI,
  MermaidRenderError,
  provideMarkdown,
} from 'ngx-markdown';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MarkdownComponent, MatFormFieldModule, MatInputModule, ScrollspyNavLayoutComponent],
  // ? A page-level MarkdownService with the same plugins but `withClipboard()` without a button component, so the
  // ? examples show the default button instead of the global one of app.config (MARKED_OPTIONS and MARKED_EXTENSIONS
  // ? still come from the root providers). Demo-only: this page keeps its own service state, so a root
  // ? MarkdownService.reload() (e.g. from the Re-render page) does not reach it
  providers: [provideMarkdown({ plugins: markdownPlugins(), sanitize: SecurityContext.NONE })],
})
export default class PluginsComponent implements OnInit {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private snackbar = inject(MatSnackBar);
  private themeService = inject(ThemeService);

  // * == PROPERTIES ==
  protected readonly clipboardButton = ClipboardButtonComponent;
  protected emojiMarkdown = '# I :heart: @fsegurai/ngx-markdown';
  protected katexMarkdown = `#### \`katex\` directive example

\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

Underscores and stars stay math: $a_1 * b_2 = c_{1,2}$, and \\$5 stays a price.

In brackets ($x^2$) and after a quote "$y$" too.
$z = x + y$ starts a wrapped line.

$$
\\sum_{i=1}^n x_i^2 = \\frac{n(n+1)(2n+1)}{6}
$$`;

  protected mermaidMarkdown = `\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;

  protected readonly katexNonStandardOptions: KatexOptions = { nonStandard: true };

  // ? The second diagram is invalid on purpose, to show the per-diagram error box
  protected mermaidErrorMarkdown = `\`\`\`mermaid
graph LR;
  Valid-->Diagram;
\`\`\`

\`\`\`mermaid
this is not a diagram
\`\`\``;

  protected readonly mermaidStatus = signal('');
  // ? Filled by the `(mermaidExported)` and `(mermaidExportError)` outputs of the export example
  protected readonly lastExport = signal('');

  // ? Follows the demo theme: a change re-renders the diagrams alone
  protected readonly mermaidOptions = computed<MermaidAPI.MermaidConfig>(() => ({
    fontFamily: 'inherit',
    ...this.themeService.mermaidOptions(),
  }));

  protected readonly lightboxMarkdown = `![Sunrise, a warm gradient](lightbox-sunrise.svg)

![Forest, a green gradient](lightbox-forest.svg)

![](lightbox-ocean.svg "Ocean, captioned from its title")

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)`;
  // ? Whether the `(imageClick)` handler calls `preventDefault()`, keeping the built-in viewer closed
  protected readonly customViewer = signal(false);
  // ? Filled by the `(imageClick)` output of the lightbox example
  protected readonly lastImageClick = signal('');

  protected readonly headings = signal<Element[] | undefined>(undefined);
  // ? Filled by the `(copied)` output of the language button example
  protected readonly lastCopy = signal('');

  ngOnInit(): void {
    this.setHeadings();
  }

  onCopied({ text, language }: MarkdownCopyEvent): void {
    this.lastCopy.set(`Copied ${text.length} characters of ${language ?? 'plain text'}.`);
  }

  onCopyError({ error }: MarkdownCopyErrorEvent): void {
    this.lastCopy.set(error.message);
  }

  onMermaidError(error: MarkdownError): void {
    this.mermaidStatus.set(
      error instanceof MermaidRenderError
        ? `error: ${error.failures.length} diagram(s) failed (MermaidRenderError)`
        : `error: ${String(error)}`,
    );
  }

  onMermaidExported({ filename, svg }: MarkdownMermaidExportEvent): void {
    this.lastExport.set(`Downloaded ${filename} (${svg.length} characters of SVG).`);
  }

  onMermaidExportError({ error, filename }: MarkdownMermaidExportErrorEvent): void {
    this.lastExport.set(`${filename}: ${error.message}`);
  }

  onImageClick(event: MarkdownImageClickEvent): void {
    const name = event.image.alt || event.image.title || event.image.src;
    if (this.customViewer()) event.preventDefault();
    this.lastImageClick.set(
      `imageClick: ${name} (${event.index + 1} of ${event.images.length})${event.defaultPrevented ? ', viewer prevented' : ''}.`,
    );
  }

  onCopyToClipboard(): void {
    this.snackbar.open('Copied to clipboard via ng-template!', undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
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
