---
label: API Reference
description: Exact inputs, outputs, methods, provider functions, injection tokens and types exported by @fsegurai/ngx-markdown 18.0.0.
order: 4
tags: [ "api", "overview" ]
breadcrumbTitle: API
---

# API Reference

Everything below is exported from `@fsegurai/ngx-markdown`.

| Page | Exports |
|------|---------|
| [MarkdownComponent](markdown-component.md) | `MarkdownComponent`, `ClipboardButtonComponent` |
| [Pipes](pipes.md) | `MarkdownPipe`, `MarkdownPipeOptions`, `LanguagePipe` |
| [MarkdownService](markdown-service.md) | `MarkdownService`, `ParseOptions`, `RenderOptions`, `ExtendedRenderer` |
| [provideMarkdown and Tokens](provide-markdown.md) | `provideMarkdown`, `MarkdownModule`, `MarkdownModuleConfig`, `MARKED_OPTIONS`, `MARKED_EXTENSIONS`, `CLIPBOARD_OPTIONS`, `SECURITY_CONTEXT` |
| [Types](types.md) | `MarkdownRouterLinkOptions`, `ClipboardOptions`, `ClipboardRenderOptions`, `KatexOptions`, `MermaidAPI`, `MarkedOptions`, `MarkedRenderer`, `PrismPlugin` |
| [Errors](errors.md) | The `error*` message constants (`errorKatexNotLoaded`, …) |

`MarkdownLinkService`, which handles link clicks, is internal: it is not exported.
