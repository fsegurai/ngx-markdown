---
label: Pipe with Callbacks
description: Use the markdown pipe with clipboard, front-matter and heading callbacks instead of component outputs.
order: 4
tags: [ "examples", "pipe" ]
keywords: [ "onCopied", "onFrontMatter", "onHeadings", "MarkdownPipeOptions" ]
---

# Pipe with Callbacks

The pipe has no outputs, so pass callbacks in its options. Its post-render step runs on this component's host element.

```typescript
import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  type MarkdownCopyEvent,
  type MarkdownFrontMatter,
  type MarkdownHeading,
  MarkdownPipe,
  type MarkdownPipeOptions,
} from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-note',
  imports: [AsyncPipe, MarkdownPipe],
  template: `<article [innerHTML]="note | markdown: options | async"></article>`,
})
export class NoteComponent {
  readonly note = '---\ntitle: Note\n---\n\n# Hello\n\n```ts\nconst a = 1;\n```';
  readonly title = signal('');
  readonly headings = signal<MarkdownHeading[]>([]);

  readonly options: MarkdownPipeOptions = {
    frontMatter: true,
    onFrontMatter: ({ data }: MarkdownFrontMatter) => this.title.set(String(data['title'] ?? '')),
    headingIds: true,
    onHeadings: (headings: MarkdownHeading[]) => this.headings.set(headings),
    clipboard: true,
    clipboardOptions: { onCopied: ({ text }: MarkdownCopyEvent) => console.log(`Copied ${text.length} chars`) },
  };
}
```
