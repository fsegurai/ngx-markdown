---
label: Markdown Service
description: Parse, render, re-render, reload and highlight Markdown from code with the root-provided MarkdownService.
order: 3
tags: [ "features", "service" ]
keywords: [ "MarkdownService", "parse", "render", "reload", "cleanup" ]
---

# Markdown Service

`MarkdownService` is `providedIn: 'root'`. Each instance parses with its own `Marked` instance, so
`MARKED_EXTENSIONS` and the configured renderer never change the global `marked` object.

```typescript
import { inject } from '@angular/core';
import { MarkdownService } from '@fsegurai/ngx-markdown';

const markdownService = inject(MarkdownService);

const html = await markdownService.parse('I am using __markdown__.');
// <p>I am using <strong>markdown</strong>.</p>
```

## Parse then render

`parse()` returns HTML (`string`, or a `Promise` with async extensions). `render()` runs the plugins on an element
that already holds that HTML:

```typescript
element.innerHTML = await markdownService.parse(markdown, { katex: true });
await markdownService.render(element, { clipboard: true, mermaid: true }, viewContainerRef);
```

- `render()` returns a `Promise<void>` and never throws: every enabled plugin runs, and the Promise rejects with the
  first error in plugin order (for example a `MermaidRenderError`).
- Highlighting is asynchronous and chunked. Await `render()` before reading the highlighted markup.
- The clipboard, Mermaid export and lightbox plugins need the `viewContainerRef` argument.
- `render()` undoes the previous render of the same element first. Call `cleanup(element)` when you discard it.

## Other methods

| Method | Use |
|--------|-----|
| `parseInline(markdown, options?)` | Parse inline Markdown (no wrapping `<p>`). |
| `rerenderMermaid(element, options?, viewContainerRef?)` | Redraw only the diagrams, e.g. after a theme change. |
| `reload()` | Re-render every `<markdown>` that uses this service, dropping cached `src` texts. |
| `getSource(src)` | Fetch a `src` as an `Observable<string>` (non-Markdown extensions are fenced). |
| `highlight(element?)` | Highlight with the global `Prism` at once; works without `withPrism()`. |
| `renderer` | The configured `MarkedRenderer`; override its methods to customize output. |

## Caches

Each service keeps small LRU caches (50 entries each):

| Cache | Default | Notes |
|-------|---------|-------|
| `src` text | off | Turn on with `provideMarkdown({ cacheSrc: true })`. No expiry; failures are not cached; `reload()` clears it. |
| KaTeX output | on | Identical math with the same options renders once. |
| Mermaid SVG | on | Identical diagrams and options are reused; interactive diagrams are always redrawn. |

See the full signatures in the [API reference](../api/markdown-service.md).
