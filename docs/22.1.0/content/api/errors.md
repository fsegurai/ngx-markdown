---
label: Errors
description: Error message constants exported by @fsegurai/ngx-markdown and the MermaidRenderError and MarkdownSourceError classes.
order: 8
tags: [ "api", "errors" ]
keywords: [ "ERROR_KATEX_NOT_LOADED", "ERROR_MERMAID_NOT_LOADED", "MermaidRenderError", "MarkdownSourceError", "error messages" ]
---

# Errors

Every message starts with `[ngx-markdown]`. Compare `error.message` with the constant.

| Constant | Raised when |
|----------|-------------|
| `ERROR_CLIPBOARD_NOT_LOADED` | `clipboard` is enabled in the browser without the global `ClipboardJS` and without `navigator.clipboard` (22.1.0 falls back to it). |
| `ERROR_DOMPURIFY_NOT_LOADED` | The `purify` loader of `withDomPurify()` did not return DOMPurify (22.1.0). |
| `ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED` | A clipboard render has no `ViewContainerRef`. |
| `ERROR_CLIPBOARD_COPY_FAILED` | A copy failed (the `error` of `copyError`). |
| `ERROR_JOYPIXELS_NOT_LOADED` | `emoji` is enabled in the browser without the global `joypixels`, or its `loader` did not return it. |
| `ERROR_KATEX_NOT_LOADED` | `katex` is enabled in the browser without the global `katex`, or its `loader` did not return it. |
| `ERROR_LIGHTBOX_VIEW_CONTAINER_REQUIRED` | A lightbox render has no `ViewContainerRef`. |
| `ERROR_MERMAID_NOT_LOADED` | Diagrams render without a `loader` and without the global `mermaid`. |
| `ERROR_MERMAID_NOT_PROVIDED` | `rerenderMermaid()` is called without `withMermaid()`. |
| `ERROR_MERMAID_EXPORT_VIEW_CONTAINER_REQUIRED` | An export render has no `ViewContainerRef`. |
| `ERROR_MERMAID_EXPORT_FAILED` | A download failed (the `error` of `mermaidExportError`, with `cause`). |
| `ERROR_PRISM_NOT_LOADED` | The `loader` of `withPrism()` did not return Prism (22.1.0). |

## MermaidRenderError

```typescript
class MermaidRenderError extends Error {
  readonly name: 'MermaidRenderError';
  readonly failures: MermaidRenderFailure[]; // every failed diagram, in document order
}
```

Rejected by `render()` and `rerenderMermaid()`, and emitted by the `error` output, when one or more diagrams fail. The
message reads `[ngx-markdown] N of M Mermaid diagram(s) failed to render: …`.

```typescript
onError(error: MarkdownError): void {
  if (error instanceof MermaidRenderError) {
    error.failures.forEach(({ element }) => element.classList.add('broken'));
  }
}
```

## MarkdownSourceError

Since 22.1.0, `src` loads with `fetch` by default, and a failed load emits a `MarkdownSourceError` through the `error`
output:

```typescript
class MarkdownSourceError extends Error {
  readonly status: number; // 0 for a network error (the failure is the `cause`)
  readonly statusText: string;
  readonly url: string;
}
```

On the server, a relative `src` without an HTTP request URL (e.g. prerendering without one) fails with a
`MarkdownSourceError` that says to use an absolute URL or `loader: HttpClient`. With
`provideMarkdown({ loader: HttpClient })`, a failed request is an `HttpErrorResponse` instead.

```typescript
onError(error: MarkdownError): void {
  if (error instanceof MarkdownSourceError && error.status === 404) this.notFound.set(true);
}
```
