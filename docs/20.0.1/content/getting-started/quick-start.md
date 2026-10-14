---
label: Quick Start
description: Register provideMarkdown() and HttpClient, then render Markdown with the markdown component or the markdown pipe.
order: 2
tags: [ "getting-started", "tutorial" ]
keywords: [ "provideMarkdown", "provideHttpClient", "first render", "data", "src" ]
---

# Quick Start

## 1. Register the providers

`provideMarkdown()` is required: `MarkdownService` injects the `SECURITY_CONTEXT` token, and only `provideMarkdown()`
(or `MarkdownModule.forRoot()`) provides it. Add `provideHttpClient()` too if you load files with `[src]`.

```typescript
// app.config.ts
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideMarkdown({ loader: HttpClient }),
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

`[src]` loads the file with Angular's `HttpClient`. Without an `HttpClient` provider, `getSource()` throws
`ERROR_SRC_WITHOUT_HTTP_CLIENT`.

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
