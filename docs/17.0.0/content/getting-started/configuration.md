---
label: Configuration
description: Configure marked options, extensions, plugin defaults and sanitizing once with provideMarkdown() and its token providers.
order: 3
tags: [ "getting-started", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownModuleConfig", "MARKED_OPTIONS", "SecurityContext" ]
---

# Configuration

`provideMarkdown(config?)` takes a `MarkdownModuleConfig`. Every property except `sanitize` and `markedExtensions` is an
Angular provider for one injection token, so values can come from `useValue` or from a `useFactory` with `deps`.
`markedExtensions` is a plain array of marked extensions.

```typescript
import { HttpClient } from '@angular/common/http';
import { SecurityContext } from '@angular/core';
import {
  CLIPBOARD_OPTIONS, MARKED_OPTIONS, provideMarkdown,
} from '@fsegurai/ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';

provideMarkdown({
  loader: HttpClient,
  markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true, breaks: false } },
  markedExtensions: [gfmHeadingId()],
  clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: MyCopyButtonComponent } },
  sanitize: SecurityContext.HTML,
});
```

## Options

| Property | Provider for | Effect |
|----------|--------------|--------|
| `markedOptions` | `MARKED_OPTIONS` | Default [marked options](https://marked.js.org/using_advanced#options), including a custom `renderer`. |
| `markedExtensions` | `MARKED_EXTENSIONS` (one `useValue` array) | `MarkedExtension[]`: [marked extensions](https://marked.js.org/using_advanced#extensions), applied on the first parse. Providers are not accepted (added in 19.2.0). |
| `clipboardOptions` | `CLIPBOARD_OPTIONS` | Default copy button component and texts. |
| `loader` | any `Provider` | Added as is. The README passes `HttpClient` here, next to `provideHttpClient()`. |
| `sanitize` | `SECURITY_CONTEXT` | `SecurityContext` used to sanitize output. Default `SecurityContext.HTML`. |

There is no global KaTeX or Mermaid token: pass `katexOptions` and `mermaidOptions` per component or per pipe call
(19.0.0 adds `MERMAID_OPTIONS`).

## Precedence

| Setting | Order (last wins) |
|---------|-------------------|
| Marked options | library default renderer → `MARKED_OPTIONS` → `markedOptions` in a pipe/service call |
| Clipboard | defaults → `CLIPBOARD_OPTIONS` → `clipboardOptions` of the pipe or service call (the component always overrides the global values, see [Copy to Clipboard](../features/clipboard.md)) |
| Mermaid | `{ startOnLoad: false }` → component `mermaidOptions` |
| KaTeX | built-in delimiters → component `katexOptions` |

## HttpClient

`MarkdownService` injects `HttpClient` optionally. Angular 17 does not provide it by default, so call
`provideHttpClient()` (or import `HttpClientModule`) whenever you use `[src]` or `getSource()`.

## NgModule apps

`MarkdownModule.forRoot(config)` takes the same object and returns the same providers. See
[NgModule Setup](../examples/ngmodule-setup.md).

## Next step

See every option in context: [Features](../features/README.md).
