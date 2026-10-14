---
label: Custom Renderer
description: Change the HTML of Markdown tokens with a MarkedRenderer in MARKED_OPTIONS or through MarkdownService.renderer.
order: 3
tags: [ "guides", "rendering" ]
keywords: [ "MarkedRenderer", "MarkedToken", "renderer override", "blockquote" ]
---

# Custom Renderer

Two places take a renderer:

1. App-wide, in the `renderer` of `MARKED_OPTIONS`.
2. At runtime, on `MarkdownService.renderer`.

## App-wide with a factory

```typescript
import { MARKED_OPTIONS, type MarkedOptions, MarkedRenderer, type MarkedToken } from '@fsegurai/ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = ({ text }: MarkedToken.Blockquote) =>
    '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';

  return { renderer, gfm: true };
}

provideMarkdown({
  markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory },
});
```

To wrap the default output, call the prototype method, as the demo does for links:

```typescript
renderer.link = (token: MarkedToken.Link) =>
  MarkedRenderer.prototype.link.call(renderer, { ...token, href: normalize(token.href) });
```

## At runtime on the service

```typescript
const markdownService = inject(MarkdownService);

markdownService.renderer.heading = ({ text, depth }: MarkedToken.Heading): string => {
  const slug = text.toLowerCase().split(/\W+/).filter(Boolean).join('-');
  return `<h${depth}><a name="${slug}" class="anchor" href="#${slug}"></a>${markdownService.parseInline(text)}</h${depth}>`;
};
```

Every parse uses a per-call renderer derived from the configured one, so the configured renderer is never mutated by
the library. `ExtendedRenderer` is deprecated and unused.

`MarkedRenderer` is Marked's `Renderer`, and `MarkedToken` is Marked's `Tokens` namespace. See the
[Marked renderer docs](https://marked.js.org/using_pro#renderer) for every overridable token.
