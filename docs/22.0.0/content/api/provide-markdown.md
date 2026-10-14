---
label: provideMarkdown
description: Signature of provideMarkdown(), every MarkdownConfig field, and the injection tokens it provides.
order: 1
tags: [ "api", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownConfig", "SANITIZE", "MARKED_OPTIONS", "MARKDOWN_CACHE_SRC", "MARKDOWN_CONTENT_VISIBILITY" ]
---

# provideMarkdown

```typescript
function provideMarkdown(markdownConfig?: MarkdownConfig): Provider[];
```

Provides `MarkdownService` and the configuration in the current injector. A nested `provideMarkdown()` (for example in
a route or component `providers`) creates its own `MarkdownService`.

## MarkdownConfig

| Field | Type | Description |
|-------|------|-------------|
| `loader` | `Provider` | Optional provider used to load `src` files. Not required: `HttpClient` is provided in root. |
| `cacheSrc` | `boolean` | Provides `MARKDOWN_CACHE_SRC`. Default `false`. |
| `contentVisibility` | `boolean` | Provides `MARKDOWN_CONTENT_VISIBILITY`, the default of the `contentVisibility` input. Default `false`. |
| `timeSlicing` | `boolean` | Provides `MARKDOWN_TIME_SLICING`: `<markdown>` and the `markdown` pipe parse long content in time slices. Default `true`. |
| `incrementalUpdates` | `boolean` | Provides `MARKDOWN_INCREMENTAL_UPDATES`: a `data`/`src` change replaces only the changed top-level blocks. Default `true`. |
| `markedOptions` | value or factory provider of `MARKED_OPTIONS` | Marked options, including a `renderer`. |
| `markedExtensions` | multi providers of `MARKED_EXTENSIONS` | Plain Marked extensions. |
| `plugins` | `MarkdownPluginFeature[]` | The `withX()` features, in hook order (after the core built-ins). |
| `sanitize` | `SecurityContext \| SanitizeFunction` | Provides `SANITIZE`. Default `SecurityContext.HTML`. |

`MarkdownModuleConfig` is a deprecated alias of `MarkdownConfig` (removed in v23).

## Injection tokens

| Token | Type | Default | Description |
|-------|------|---------|-------------|
| `MARKED_OPTIONS` | `MarkedOptions` | none | Marked options of the service. |
| `MARKED_EXTENSIONS` | `MarkedExtension` (multi) | none | Marked extensions of the service. |
| `SANITIZE` | `SecurityContext \| SanitizeFunction` | follows `SECURITY_CONTEXT` | How parsed HTML is sanitized. |
| `SECURITY_CONTEXT` | `SecurityContext` | `SecurityContext.HTML` | **Deprecated** (v23). Honoured when `sanitize` is unset. |
| `MARKDOWN_CACHE_SRC` | `boolean` | `false` | Cache fetched `src` text per service (last 50). |
| `MARKDOWN_CONTENT_VISIBILITY` | `boolean` | `false` | Default of `<markdown [contentVisibility]>`; see [Long Documents](../guides/long-documents.md). |
| `MARKDOWN_TIME_SLICING` | `boolean` | `true` | `<markdown>` and the `markdown` pipe parse and sanitize content of 16 KiB or more in slices of about 8 ms (browser only); see [Long Documents](../guides/long-documents.md). |
| `MARKDOWN_INCREMENTAL_UPDATES` | `boolean` | `true` | `<markdown>` updates changed content block by block (browser only, incremental plugins only); see [Long Documents](../guides/long-documents.md). |
| `MARKDOWN_PLUGINS` | `readonly MarkdownPluginRegistration[]` (multi) | none | Filled by `plugins`; see [Plugin API](plugin-api.md). |

```typescript
type SanitizeFunction = (html: string) => string;
```

When `sanitize` is not set, `provideMarkdown()` pins `SECURITY_CONTEXT` to `SecurityContext.HTML` in its injector, so a
nested configuration never inherits an ancestor's weaker setting.
