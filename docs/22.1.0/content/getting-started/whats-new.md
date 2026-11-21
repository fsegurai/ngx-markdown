---
label: What's New in 22.1.0
description: Release notes for @fsegurai/ngx-markdown 22.1.0, with fetch-based src loading, on-demand plugin loaders, withDomPurify and a per-URL resolver.
order: 4
tags: [ "getting-started", "release-notes" ]
keywords: [ "22.1.0", "changelog", "fetch", "withDomPurify", "resolveUrl", "codeLineHighlight" ]
---

# What's New in 22.1.0

Released 2026-11-19. Angular `^22` and `marked ^18`, as 22.0.0. The full list is in the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).

> **Upgrade note:** `src` now loads with `fetch`, not `HttpClient`. If your app relies on HTTP interceptors, on
> `HttpErrorResponse` in `(error)`, or on `HttpClient` for relative `src` URLs during server-side rendering, add
> `provideMarkdown({ loader: HttpClient })`. See [Migrating from 22.0 to 22.1](../guides/migrating-from-22-0.md).

## Smaller startup bundle

`MarkdownService` no longer references `HttpClient`, so an app that does not use it no longer ships `HttpClient` and
its backend: a minimal app's initial bundle drops from 327.60 kB (22.0.0) to 319.99 kB (−7.6 kB), the new features
below included.

## New features

| Feature | In short | Read more |
|---------|----------|-----------|
| `fetch` source loader | `src` loads with `fetch`, aborted when `src` changes, awaited by SSR, transferred to the browser through `TransferState`. `MARKDOWN_SOURCE_LOADER` replaces it; `loader: HttpClient` opts into `HttpClient`. | [Migration guide](../guides/migrating-from-22-0.md) |
| `resolveUrl` | `[plugins]="{ baseUrl: { resolveUrl } }"` decides each link and image URL during the parse, with optional attributes. | [Relative URLs](../features/relative-urls.md) |
| On-demand Prism, KaTeX, emoji | `withPrism({ loader, languages, onLoad })`, `withKatex({ loader })`, `withEmoji({ loader })` import their library instead of reading a global. | [Syntax Highlighting](../features/syntax-highlighting.md), [KaTeX](../features/katex.md), [Emoji](../features/emoji.md) |
| `withDomPurify()` | Sanitizes with a private DOMPurify loaded on demand and keeps the heading slug ids. `dompurify` is a new optional peer. | [Sanitization](../features/sanitization.md) |
| Clipboard fallback | Without `ClipboardJS`, the copy buttons use `navigator.clipboard.writeText` (secure contexts). | [Copy to Clipboard](../features/clipboard.md) |
| `codeLineHighlight` | `withPrism({ codeLineHighlight: 'set' \| 'skip' \| 'remove' })` stops Prism from highlighting marked-extended code lines twice. | [Syntax Highlighting](../features/syntax-highlighting.md) |

New exports: `MARKDOWN_SOURCE_LOADER`, `MarkdownSourceError`, `MarkdownSourceLoader`, `MarkdownModuleLoader`,
`BaseUrlResolver`, `BaseUrlResolveContext`, `BaseUrlResolution`, `withDomPurify`, `DomPurifyOptions`,
`DOMPURIFY_PLUGIN_NAME`, `ERROR_DOMPURIFY_NOT_LOADED`, `ERROR_PRISM_NOT_LOADED`, `EmojiOptions`, and the plugin hook
`MarkdownPlugin.load`.

## Fixes

- **marked-extended 18.1.0 class names.** 22.1.0 targets `@fsegurai/marked-extended-*` 18.1.0: Prism reads
  `mx-code--line-numbers` (the 19.0.0-beta.0 `mx-code-ln` is still read for one release), and the clipboard leaves out
  removed lines wrapped as `span.mx-code-line.mx-code--remove`.

## Documentation

- **Heading ids.** `headingIds` is documented as a drop-in for `marked-gfm-heading-id`, with its two known differences.
  See [Headings and TOC](../features/headings.md).
