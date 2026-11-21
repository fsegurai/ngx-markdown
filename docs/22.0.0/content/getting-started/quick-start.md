---
label: Quick Start
description: Render Markdown from a variable, a remote file or projected content with the standalone MarkdownComponent.
order: 2
tags: [ "getting-started", "tutorial" ]
keywords: [ "MarkdownComponent", "MarkdownPipe", "first render" ]
---

# Quick Start

## 1. Provide the configuration

`provideMarkdown()` is optional for the defaults, but it is where every plugin is turned on, so add it once:

```typescript
// app.config.ts
import type { ApplicationConfig } from '@angular/core';
import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [provideMarkdown()],
};
```

## 2. Import the component

```typescript
import { Component } from '@angular/core';
import { MarkdownComponent } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-home',
  imports: [MarkdownComponent],
  template: `
    <!-- from a variable -->
    <markdown [data]="markdown" (ready)="onReady()" />

    <!-- from a file: fetched with HttpClient -->
    <markdown [src]="'assets/guide.md'" (load)="onLoad($event)" (error)="onError($event)" />
  `,
})
export class HomeComponent {
  readonly markdown = '# Hello\n\nI am using **markdown**.';

  onReady(): void {}
  onLoad(markdown: string): void {}
  onError(error: unknown): void {}
}
```

The same component also renders projected (static) content. Keep the whitespace with `ngPreserveWhitespaces`:

```html
<markdown ngPreserveWhitespaces>
  # Static Markdown
</markdown>
```

## 3. Or use the pipe

```typescript
import { AsyncPipe } from '@angular/common';
import { MarkdownPipe } from '@fsegurai/ngx-markdown';

@Component({
  imports: [AsyncPipe, MarkdownPipe],
  template: `<div [innerHTML]="markdown | markdown | async"></div>`,
})
export class NoteComponent {
  readonly markdown = 'I am using __markdown__.';
}
```

The pipe resolves asynchronously, so it needs `async`. Prefer the component when the plugins (highlighting, clipboard,
Mermaid) must be scoped to the content: see [Markdown Pipe](../features/markdown-pipe.md).

## Next step

[Configuration](configuration.md).
