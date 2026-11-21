---
label: Configuration
description: Configure sanitizing, Marked options, Marked extensions, source caching and plugins with provideMarkdown().
order: 3
tags: [ "getting-started", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownConfig", "withPrism", "plugins" ]
---

# Configuration

Everything app-wide goes through `provideMarkdown(config?: MarkdownConfig)`:

```typescript
import { SecurityContext } from '@angular/core';
import {
  MARKED_EXTENSIONS,
  MARKED_OPTIONS,
  provideMarkdown,
  withClipboard,
  withPrism,
} from '@fsegurai/ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';

provideMarkdown({
  plugins: [withPrism({ lineNumbers: true }), withClipboard()],
  markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true, breaks: false } },
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
  sanitize: SecurityContext.HTML,
  cacheSrc: true,
});
```

| Option | Default | What it does |
|--------|---------|--------------|
| `plugins` | `[]` | The `withX()` plugin features. A plugin does nothing without its feature. |
| `sanitize` | `SecurityContext.HTML` | A `SecurityContext`, or a function `(html) => string` such as DOMPurify. |
| `markedOptions` | none | A value or factory provider of `MARKED_OPTIONS`. |
| `markedExtensions` | none | Multi providers of `MARKED_EXTENSIONS` (plain Marked extensions). |
| `cacheSrc` | `false` | Fetch each `src` once per `MarkdownService` and share the text. |
| `contentVisibility` | `false` | Default of the `contentVisibility` input: off-screen blocks skip their layout ([Long Documents](../guides/long-documents.md)). |
| `timeSlicing` | `true` | Parse and sanitize content of 16 KiB or more in slices of about 8 ms in the browser ([Long Documents](../guides/long-documents.md)). |
| `incrementalUpdates` | `true` | On a `data`/`src` change, replace only the changed top-level blocks ([Long Documents](../guides/long-documents.md)). |
| `loader` | none | Extra provider for loading `src`; not needed since `HttpClient` is provided in root. |

## Plugins are two-step

1. **Provide** the feature once: `provideMarkdown({ plugins: [withKatex()] })`.
2. **Enable** it where you render: `<markdown katex>` or `[plugins]="{ katex: true }"`.

`withPrism()` and `withMarkedExtended()` are the exceptions: they are enabled by default once provided.

| Feature | Plugin name | Needs |
|---------|-------------|-------|
| `withPrism(options?)` | `prism` | global `Prism` |
| `withClipboard(options?)` | `clipboard` | global `ClipboardJS` |
| `withEmoji()` | `emoji` | global `joypixels` |
| `withKatex(options?)` | `katex` | global `katex` |
| `withMermaid(options?)` | `mermaid` | `loader` or global `mermaid` |
| `withMermaidExport(options?)` | `mermaidExport` | `withMermaid()` |
| `withLightbox(options?)` | `lightbox` | nothing |
| `withMarkedExtended(features, options?)` | `markedExtended` | `@fsegurai/marked-extended-*` packages |

`frontMatter` and `baseUrl` are core plugins: always registered, nothing to provide.

## Without provideMarkdown()

`<markdown>` and the `markdown` pipe also work without it: `MarkdownService` is provided in root and HTML is still
sanitized with `SecurityContext.HTML`. You only lose the plugins and custom options.

## Next step

Browse the [Features](../features/README.md), or see every option in [provideMarkdown](../api/provide-markdown.md).
