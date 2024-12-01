import {ChangeDetectionStrategy, Component, ElementRef, OnInit, inject} from '@angular/core';
import {FlexModule} from '@angular/flex-layout/flex';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CLIPBOARD_OPTIONS, MarkdownComponent, MermaidAPI} from 'ngx-markdown';
import {ClipboardButtonComponent} from '@shared/clipboard-button';
import {ScrollspyNavLayoutComponent} from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FlexModule,
    FormsModule,
    MarkdownComponent,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ],
  providers: [
    {provide: CLIPBOARD_OPTIONS, useValue: {}},
  ]
})
export default class PluginsComponent implements OnInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private snackbar = inject(MatSnackBar);

  protected readonly clipboardButton = ClipboardButtonComponent;
  protected emojiMarkdown = '# I :heart: @fsegurai/ngx-markdown';
  protected katexMarkdown =
    `#### \`katex\` directive example

\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$`;

  protected mermaidMarkdown =
    `\`\`\`mermaid
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

  protected headings: Element[] | undefined;

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
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
