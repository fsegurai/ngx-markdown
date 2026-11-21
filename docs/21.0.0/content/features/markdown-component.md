---
label: Markdown Component
description: Render Markdown from a string, a URL or projected content with the standalone MarkdownComponent.
order: 1
tags: [ "features", "component" ]
keywords: [ "data", "src", "transclusion", "ready", "load", "error" ]
---

# Markdown Component

`MarkdownComponent` matches `<markdown>`, `<ngx-markdown>` and the `[markdown]` attribute. There is no separate
directive: `<div markdown [data]="text">` is the same component.

## Three content sources

| Source | Usage | Notes |
|--------|-------|-------|
| `data` | `<markdown [data]="text" />` | Re-renders when the value changes. |
| `src` | `<markdown [src]="'docs/intro.md'" />` | Fetched with `HttpClient`. A non-`.md` extension wraps the file in a fenced block of that language. |
| Projected content | `<markdown ngPreserveWhitespaces>## Title</markdown>` | Rendered once after view init, HTML entities decoded. Only used when `data` and `src` are empty. |

When both `data` and `src` are set, a non-empty `data` wins. Common leading indentation is removed before parsing,
so indented template content renders correctly. Use `ngPreserveWhitespaces` with projected content, because the
Angular compiler strips whitespace by default.

## Outputs

| Output | When |
|--------|------|
| `load` | `src` was fetched **and** rendered; payload is the fetched text. |
| `ready` | A render finished (any source). |
| `error` | `src` failed to load, or the render after a `src` load failed. Payload `string \| Error`. |

In 21.0.0 a failed `data` or projected-content render is **not** emitted through `error`: the render runs in
`PendingTasks.run()`, which forwards the rejection to Angular's `ErrorHandler`. 21.0.1 routes those failures to
`error` as well.

## Rendering options

| Input | Default | Effect |
|-------|---------|--------|
| `inline` | `false` | Parse with `marked.parseInline` (no wrapping `<p>`). |
| `disableSanitizer` | `false` | Skip sanitizing for this content. See [Sanitization](sanitization.md). |
| `emoji`, `katex`, `mermaid`, `clipboard` | `false` | Turn a plugin on. See the plugin pages. |
| `lineNumbers`, `lineHighlight`, `commandLine` | `false` | Prism plugin attributes. See [Syntax Highlighting](syntax-highlighting.md). |
| `routerLinkOptions`, `disableRouterLinkHandler` | unset, `false` | Link clicks. See [Link Handling](link-handling.md). |

Boolean inputs accept attribute syntax: `<markdown katex [data]="text">`.

## When it renders again

The component renders from an `effect`. With `data`, the inputs read when the render starts (`inline`, `emoji`,
`mermaid`, `disableSanitizer`, `clipboard*`, `katex*`, `mermaidOptions`) are tracked too, so changing them re-renders.
With `src` only a new `src` is tracked. `MarkdownService.reload()` renders every component that has `data` or `src`
again (and fetches `src` again). Projected content is rendered once and is not re-rendered by `reload()`.

## SSR

Every render is registered with `PendingTasks`, so SSR, prerendering and `ApplicationRef.whenStable()` wait for it.
See [SSR and Prerendering](../guides/ssr-and-prerendering.md).

Full input list: [API: MarkdownComponent](../api/markdown-component.md).
