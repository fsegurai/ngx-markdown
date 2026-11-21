---
label: Custom Renderer
description: Override how marked renders tokens, app-wide with MARKED_OPTIONS or at runtime through MarkdownService.renderer.
order: 3
tags: [ "guides", "customization" ]
keywords: [ "MarkedRenderer", "renderer", "headings", "blockquote", "positional arguments" ]
---

# Custom Renderer

Two places accept a renderer. Both use `MarkedRenderer`, marked's `Renderer` class re-exported by the library. With
marked 9 to 12, renderer methods take **positional arguments**, for example `heading(text, level, raw)`.

## App-wide with MARKED_OPTIONS

```typescript
import { MARKED_OPTIONS, MarkedOptions, MarkedRenderer, provideMarkdown } from '@fsegurai/ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.blockquote = (quote: string) => `<blockquote class="blockquote">${quote}</blockquote>`;
  return { renderer, gfm: true };
}

provideMarkdown({
  markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory },
});
```

## At runtime with MarkdownService

```typescript
import { Component, inject } from '@angular/core';
import { MarkdownComponent, MarkdownService } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MarkdownComponent],
  template: '<markdown># Heading</markdown>',
})
export class ExampleComponent {
  private readonly markdown = inject(MarkdownService);

  constructor() {
    this.markdown.renderer.heading = (text: string, level: number): string => {
      const slug = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `<h${level}><a name="${slug}" class="anchor" href="#${slug}"></a>${text}</h${level}>`;
    };
  }
}
```

The service is shared, so this changes every Markdown render in the app. Call `reload()` afterwards to re-render
components that already rendered.

## How the renderer reaches marked

On every parse, the service copies the renderer's own properties (the methods you assigned), removes `renderer`
from the options it passes to marked, and calls `marked.use({ renderer })` on the global `marked` instance. This
runs after `marked.use(...extensions)`, so:

- Renderer methods from `markedExtensions` (for example heading ids from `marked-gfm-heading-id`) are applied.
- A method you assign with the same name replaces the extension's method.
- A method that returns `false` falls back to the previous renderer, as with any `marked.use()` renderer. The demo's
  re-render page uses this to switch an override off.

18.1.0 stops removing `renderer` from the options, which changes this behavior; see the 18.1.0 docs.

## Things to know

- When `mermaid` is on, the service wraps `renderer.code` once so ```` ```mermaid ```` blocks become
  `<div class="mermaid">`. Other languages fall through to your `code(code, language, isEscaped)` method.
- Renderer output is sanitized afterwards unless sanitizing is off, so attributes such as `style` are removed.
- 18.1.0 moves to marked 13/14, where renderer methods take one token object instead of positional arguments.
