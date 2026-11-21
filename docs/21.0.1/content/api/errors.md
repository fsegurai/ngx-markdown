---
label: Errors
description: The ERROR_* message constants thrown by @fsegurai/ngx-markdown 21.0.1 and what causes each one.
order: 6
tags: [ "api", "errors" ]
keywords: [ "ERROR_KATEX_NOT_LOADED", "ERROR_MERMAID_NOT_LOADED", "ERROR_CLIPBOARD_NOT_LOADED", "exceptions" ]
---

# Errors

Errors are thrown as `new Error(<constant>)`. Inside `MarkdownComponent` they reach the `error` output.

| Constant | Thrown when |
|----------|-------------|
| `ERROR_JOYPIXELS_NOT_LOADED` | `emoji` is on and the `joypixels` global is missing. |
| `ERROR_KATEX_NOT_LOADED` | `katex` is on and `katex` or `renderMathInElement` is missing. |
| `ERROR_MERMAID_NOT_LOADED` | `mermaid` is on and the `mermaid` global is missing. |
| `ERROR_CLIPBOARD_NOT_LOADED` | `clipboard` is on and `ClipboardJS` is missing. |
| `ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED` | `render()` with `clipboard: true` got no `viewContainerRef`. |
| `ERROR_SRC_WITHOUT_HTTP_CLIENT` | Never. `@deprecated` since 21.0.0 and removed in 22. |

The checks run in the browser only, so the server never throws them.

A missing Prism does not throw: `highlight()` logs `Prism.js not loaded. Code highlighting will not be applied.`

HTTP failures from `[src]` reach `error` as the `HttpErrorResponse` emitted by `HttpClient` (typed `string | Error`
on the output).
