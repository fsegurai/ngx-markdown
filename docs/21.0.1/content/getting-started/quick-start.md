---
label: Quick Start
description: Register provideMarkdown() and render Markdown with the markdown component or the markdown pipe.
order: 2
tags: [ "getting-started", "tutorial" ]
keywords: [ "provideMarkdown", "first render", "data", "src" ]
---

# Quick Start

## 1. Register the providers

`provideMarkdown()` is required: `MarkdownService` injects the `SECURITY_CONTEXT` token, and only `provideMarkdown()`
(or the deprecated `MarkdownModule.forRoot()`) provides it.

```typescript
// app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideMarkdown(),
  ],
};
```

## 2. Render Markdown

```typescript
import { Component, signal } from '@angular/core';
import { MarkdownComponent } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-readme',
  imports: [MarkdownComponent],
  template: `
    <markdown [data]="markdown()" (ready)="onReady()" />
    <markdown [src]="'assets/README.md'" (load)="onLoad($event)" (error)="onError($event)" />
  `,
})
export class ReadmeComponent {
  readonly markdown = signal('# Hello\n\nThis is **Markdown**.');

  onReady(): void {}
  onLoad(markdown: string): void {}
  onError(error: string | Error): void {}
}
```

`[src]` loads the file with Angular's `HttpClient`, which is injectable by default in Angular 21.

## 3. Or use the pipe

```typescript
import { AsyncPipe } from '@angular/common';
import { MarkdownPipe } from '@fsegurai/ngx-markdown';

@Component({
  imports: [AsyncPipe, MarkdownPipe],
  template: `<div [innerHTML]="text | markdown | async"></div>`,
})
export class NoteComponent {
  text = 'Inline **bold** text';
}
```

The pipe returns a `Promise`, so it always needs `async`.

## Next step

Configure marked, plugins and sanitizing: [Configuration](configuration.md).
