---
label: Docs Page with TOC
description: A documentation page that loads a Markdown file, reads its front-matter and builds a table of contents.
order: 2
tags: [ "examples", "content" ]
keywords: [ "table of contents", "metadata", "srcRelativeLink", "headings output" ]
---

# Docs Page with TOC

```typescript
import { Component, input, signal } from '@angular/core';
import {
  type MarkdownError,
  MarkdownComponent,
  type MarkdownFrontMatter,
  type MarkdownHeading,
} from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-doc-page',
  imports: [MarkdownComponent],
  template: `
    <h1>{{ title() }}</h1>

    <nav aria-label="On this page">
      @for (heading of headings(); track $index) {
        @if (heading.level <= 3) {
          <a [href]="'#' + heading.id" (click)="$event.preventDefault(); heading.element?.scrollIntoView()">
            {{ heading.text }}
          </a>
        }
      }
    </nav>

    <markdown
      [src]="src()"
      srcRelativeLink
      frontMatter
      headingIds
      [routerLinkOptions]="{ internalBrowserHandler: true, externalBrowserHandler: true }"
      (metadata)="onMetadata($event)"
      (headings)="headings.set($event)"
      (error)="onError($event)" />
  `,
})
export class DocPageComponent {
  readonly src = input.required<string>();
  readonly title = signal('');
  readonly headings = signal<MarkdownHeading[]>([]);

  onMetadata({ data }: MarkdownFrontMatter): void {
    this.title.set(String(data['title'] ?? ''));
  }

  onError(error: MarkdownError): void {
    console.error(error);
  }
}
```

With the default sanitizer, heading `id`s are removed, so the links rely on `element.scrollIntoView()`. Use a sanitizer
that keeps ids if you need real anchors (see [Headings and TOC](../features/headings.md)).
