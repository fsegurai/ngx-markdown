import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit } from '@angular/core';
import { FlexModule } from '@angular/flex-layout/flex';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguagePipe, MarkdownComponent, MarkdownPipe } from 'ngx-markdown';
import { HttpRawLoaderService } from '@shared/http-raw-loader';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';

@Component({
  selector: 'app-bindings',
  templateUrl: './bindings.component.html',
  styleUrls: ['./bindings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    FlexModule,
    FormsModule,
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
    MatFormFieldModule,
    MatInputModule,
    ScrollspyNavLayoutComponent,
  ]
})
export default class BindingsComponent implements OnInit {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private rawLoaderService = inject(HttpRawLoaderService);

  // remote url
  protected demoPython$ = this.rawLoaderService.get('app/bindings/remote/demo.py');

  // variable-binding
  protected markdown =
    `### Markdown example
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
  typescriptMarkdown =
    `import { Component } from '@angular/core';

@Component({
  selector: 'markdown-demo',
  templateUrl: './markdown-demo.component.html',
  styleUrls: ['./markdown-demo.component.scss'],
})
export class MarkdownDemoComponent {
  public pipeMarkdown = '# Markdown';
}`;

  headings: Element[] | undefined;

  ngOnInit(): void {
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
      .forEach(x => headings.push(x));
    this.headings = headings;
  }
}
