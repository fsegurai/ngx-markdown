---
label: Errors
description: The camelCase error message constants thrown by @fsegurai/ngx-markdown 17.0.0 and what causes each one.
order: 6
tags: [ "api", "errors" ]
keywords: [ "errorKatexNotLoaded", "errorMermaidNotLoaded", "errorSrcWithoutHttpClient", "exceptions" ]
---

# Errors

Errors are thrown as `new Error(<constant>)`. Inside `MarkdownComponent` a render error becomes an unhandled promise
rejection for every content source; only HTTP failures reach the `error` output.

| Constant | Message starts with | Thrown when |
|----------|---------------------|-------------|
| `errorJoyPixelsNotLoaded` | `[ngx-markdown] Emoji-Toolkit files required` | `emoji` is on and the `joypixels` global is missing. |
| `errorKatexNotLoaded` | `[ngx-markdown] KaTeX files required` | `katex` is on and `katex` or `renderMathInElement` is missing. |
| `errorMermaidNotLoaded` | `[ngx-markdown] Mermaid files required` | `mermaid` is on and the `mermaid` global is missing. |
| `errorClipboardNotLoaded` | `[ngx-markdown] Clipboard files required` | `clipboard` is on and `ClipboardJS` is missing. |
| `errorClipboardViewContainerRequired` | `[ngx-markdown] viewContainerRef parameter required` | `render()` with `clipboard: true` got no `viewContainerRef`. |
| `errorSrcWithoutHttpClient` | `[ngx-markdown] HttpClient required for src attribute` | `getSource()` (used by `[src]`) runs without an `HttpClient` provider. |

The plugin checks run in the browser only, so the server never throws them. `errorSrcWithoutHttpClient` is thrown on
both platforms. 20.0.0 renames the constants to `ERROR_*` (same messages).

A missing Prism neither throws nor logs in 17.0.0: code simply stays unhighlighted.

HTTP failures from `[src]` reach `error` as the `HttpErrorResponse` emitted by `HttpClient` (typed `string | Error`
on the output).
