import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpRawLoaderService } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'app-bindings',
  templateUrl: './bindings.component.html',
  styleUrl: './bindings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FormsModule,
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ],
})
export default class BindingsComponent implements OnInit {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private rawLoaderService = inject(HttpRawLoaderService);

  // * == PROPERTIES ==
  // remote url
  protected demoPython$ = this.rawLoaderService.get('app/bindings/remote/demo.py');

  // variable-binding
  protected markdown = `### Markdown example
---
This is an **example** where we bind a variable to the \`markdown\` component that is also bound to a textarea.

#### example.component.ts
\`\`\`typescript
public markdown = "# Markdown";
\`\`\`

#### example.component.html
\`\`\`html
<textarea [(ngModel)]="markdown"></textarea>
<markdown [data]="markdown"></markdown>
\`\`\``;

  // pipe
  typescriptMarkdown = `import { Component } from '@angular/core';

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrl: './markdown-demo.component.scss',
})
export class MarkdownDemoComponent {
  public pipeMarkdown = '# Markdown';
}`;

  readonly headings = signal<Element[] | undefined>(undefined);

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
