---
label: Custom Renderer
description: Override how marked renders tokens, app-wide with MARKED_OPTIONS or at runtime through MarkdownService.renderer.
order: 4
tags: [ "guides", "customization" ]
keywords: [ "MarkedRenderer", "MarkedToken", "renderer", "headings", "blockquote" ]
---

# Custom Renderer

Two places accept a renderer. Both use `MarkedRenderer` (marked's `Renderer`) and the `MarkedToken` types (marked's
`Tokens`), re-exported by the library.

## App-wide with MARKED_OPTIONS

```typescript
import { MARKED_OPTIONS, MarkedOptions, MarkedRenderer, MarkedToken, provideMarkdown } from '@fsegurai/ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  renderer.blockquote = ({ text }: MarkedToken.Blockquote) =>
    `<blockquote class="blockquote"><p>${text}</p></blockquote>`;
  return { renderer, gfm: true };
}

provideMarkdown({
  markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory },
});
```

## At runtime with MarkdownService

```typescript
import { Component, inject } from '@angular/core';
import { MarkdownComponent, MarkdownService, MarkedToken } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-example',
  imports: [MarkdownComponent],
  template: '<markdown># Heading</markdown>',
})
export class ExampleComponent {
  private readonly markdown = inject(MarkdownService);

  constructor() {
    this.markdown.renderer.heading = ({ text, depth }: MarkedToken.Heading): string => {
      const slug = text.toLowerCase().split(/\W+/).filter(Boolean).join('-');
      return `<h${depth}><a name="${slug}" class="anchor" href="#${slug}"></a>${text}</h${depth}>`;
    };
  }
}
```

The service is shared, so this changes every Markdown render in the app. Call `reload()` afterwards to re-render
components that already rendered.

## Things to know

- When `mermaid` is on, the service wraps `renderer.code` once so ```` ```mermaid ```` blocks become
  `<div class="mermaid">`. Other languages fall through to your `code` method.
- Renderer output is sanitized afterwards unless sanitizing is off, so attributes such as `style` are removed.
- A heading id plugin is often simpler: see [Marked Options and Extensions](marked-options-and-extensions.md).
