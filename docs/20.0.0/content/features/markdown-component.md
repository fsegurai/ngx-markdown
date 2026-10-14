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
| `error` | `src` failed to load. Payload `string \| Error`. |

Only an HTTP failure reaches `error`. A render failure (for example a plugin script that is not loaded) is an
unhandled promise rejection for every source, including a successful `[src]` load; `load` is then not emitted.
21.0.0 routes render failures after a `[src]` load to `error`.

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

Since 20.0.0 the component uses signal inputs and renders from an `effect` instead of `ngOnChanges`. With `data`, the
inputs read when the render starts (`inline`, `emoji`, `mermaid`, `disableSanitizer`, `clipboard*`, `katex*`,
`mermaidOptions`) are tracked too, so changing them re-renders. With `src` only a new `src` is tracked.
`MarkdownService.reload()` renders every component that has `data` or `src` again (and fetches `src` again).
Projected content is rendered once and is not re-rendered by `reload()`.

The component uses the default change detection strategy. `data` and `src` are `model()` signals.

## SSR

Renders are not registered with `PendingTasks` in 20.x, so server rendering may not wait for them. See
[SSR and Prerendering](../guides/ssr-and-prerendering.md).

Full input list: [API: MarkdownComponent](../api/markdown-component.md).
