---
label: Configuration
description: Configure marked options, extensions, plugin defaults and sanitizing once with provideMarkdown() and its token providers.
order: 3
tags: [ "getting-started", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownModuleConfig", "MARKED_OPTIONS", "SecurityContext" ]
---

# Configuration

`provideMarkdown(config?)` takes a `MarkdownModuleConfig`. Every property except `sanitize` is an Angular provider for
one injection token, so values can come from `useValue` or from a `useFactory` with `deps`.

```typescript
import { SecurityContext } from '@angular/core';
import {
  CLIPBOARD_OPTIONS, MARKED_EXTENSIONS, MARKED_OPTIONS, MERMAID_OPTIONS, provideMarkdown,
} from '@fsegurai/ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';

provideMarkdown({
  markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true, breaks: false } },
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
  clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: MyCopyButtonComponent } },
  mermaidOptions: { provide: MERMAID_OPTIONS, useValue: { look: 'handDrawn' } },
  sanitize: SecurityContext.HTML,
});
```

## Options

| Property | Provider for | Effect |
|----------|--------------|--------|
| `markedOptions` | `MARKED_OPTIONS` | Default [marked options](https://marked.js.org/using_advanced#options), including a custom `renderer`. |
| `markedExtensions` | `MARKED_EXTENSIONS` (`multi: true`) | [marked extensions](https://marked.js.org/using_advanced#extensions), applied on the first parse. |
| `clipboardOptions` | `CLIPBOARD_OPTIONS` | Default copy button component and texts. |
| `mermaidOptions` | `MERMAID_OPTIONS` | Default Mermaid config, merged under each component's `mermaidOptions`. |
| `loader` | any `Provider` | Added as is. Optional: `HttpClient` is injectable by default in Angular 21. |
| `sanitize` | `SECURITY_CONTEXT` | `SecurityContext` used to sanitize output. Default `SecurityContext.HTML`. |

There is no global KaTeX token: pass `katexOptions` per component or per pipe call.

## Precedence

| Setting | Order (last wins) |
|---------|-------------------|
| Marked options | library default renderer → `MARKED_OPTIONS` → `markedOptions` in a pipe/service call |
| Clipboard | defaults → `CLIPBOARD_OPTIONS` → `clipboardOptions` of the pipe or service call (the component always overrides the global values, see [Copy to Clipboard](../features/clipboard.md)) |
| Mermaid | `{ startOnLoad: false }` → `MERMAID_OPTIONS` → component `mermaidOptions` |
| KaTeX | built-in delimiters → component `katexOptions` |

## HttpClient

You only call `provideHttpClient()` to configure it, for example with interceptors or `withFetch()`. For `[src]`
under SSR or prerendering use `withFetch()`; see [SSR and Prerendering](../guides/ssr-and-prerendering.md).

## NgModule apps

`MarkdownModule.forRoot(config)` takes the same object and is deprecated. See
[Moving off MarkdownModule](../guides/moving-off-markdown-module.md).

## Next step

See every option in context: [Features](../features/README.md).
