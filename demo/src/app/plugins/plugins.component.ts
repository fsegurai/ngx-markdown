import { ChangeDetectionStrategy, Component, ElementRef, inject, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { CLIPBOARD_OPTIONS, MarkdownComponent, type MermaidAPI } from 'ngx-markdown';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrl: './plugins.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MarkdownComponent, MatFormFieldModule, MatInputModule, ScrollspyNavLayoutComponent],
  providers: [{ provide: CLIPBOARD_OPTIONS, useValue: {} }],
})
export default class PluginsComponent implements OnInit {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private snackbar = inject(MatSnackBar);

  // * == PROPERTIES ==
  protected readonly clipboardButton = ClipboardButtonComponent;
  protected emojiMarkdown = '# I :heart: @fsegurai/ngx-markdown';
  protected katexMarkdown = `#### \`katex\` directive example

\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;

  protected mermaidMarkdown = `\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;

  protected mermaidOptions: MermaidAPI.MermaidConfig = {
    fontFamily: 'inherit',
    theme: 'dark',
  };

  protected readonly headings = signal<Element[] | undefined>(undefined);

  ngOnInit(): void {
    this.setHeadings();
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
