---
label: Markdown Service
description: Parse, render, highlight and reload Markdown from TypeScript with MarkdownService.
order: 3
tags: [ "features", "service" ]
keywords: [ "MarkdownService", "parse", "reload", "renderer", "highlight" ]
---

# Markdown Service

`MarkdownService` is `providedIn: 'root'`, but it needs the `SECURITY_CONTEXT` token from `provideMarkdown()`.

```typescript
import { Component, inject } from '@angular/core';
import { MarkdownService } from '@fsegurai/ngx-markdown';

@Component({ /* … */ })
export class ExampleComponent {
  private readonly markdown = inject(MarkdownService);

  async preview(text: string): Promise<string> {
    // `parse` returns `string | Promise<string>`; awaiting covers both.
    return await this.markdown.parse(text, { emoji: true });
  }
}
```

## What it does

| Member | Use it to |
|--------|-----------|
| `parse(markdown, options?)` | Turn Markdown into sanitized HTML (`string \| Promise<string>`). |
| `parseInline(markdown, options?)` | Call `marked.parseInline` directly (no sanitizing). |
| `render(element, options?, viewContainerRef?)` | Run KaTeX, Mermaid, clipboard and highlighting on an element you filled yourself. Synchronous. |
| `highlight(element?)` | Run Prism on an element (or the whole `document`). |
| `getSource(src)` | Fetch a file as text; non-`.md` files come back wrapped in a fenced block. |
| `reload()` / `reload$` | Ask every component with `data` or `src` to render again. |
| `options` | Read or replace the marked options (merged over the default renderer). |
| `renderer` | Read or replace the `MarkedRenderer`. See [Custom Renderer](../guides/custom-renderer.md). |

## Re-render after a setting change

Call `reload()` after you change something the components cannot see, such as `renderer` methods or a global theme:

```typescript
this.markdown.reload();
```

## Clipboard needs a ViewContainerRef

`render()` with `clipboard: true` throws `ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED` without a `viewContainerRef`,
because the copy buttons are Angular views.

Full signatures: [API: MarkdownService](../api/markdown-service.md).
