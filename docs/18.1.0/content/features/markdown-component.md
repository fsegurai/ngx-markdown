---
label: Markdown Component
description: Render Markdown from a string, a URL or projected content with the standalone MarkdownComponent.
order: 1
tags: [ "features", "component" ]
keywords: [ "data", "src", "transclusion", "ready", "load", "error" ]
---

# Markdown Component

`MarkdownComponent` matches `<markdown>` and the `[markdown]` attribute. There is no separate
directive: `<div markdown [data]="text">` is the same component.

## Three content sources

| Source | Usage | Notes |
|--------|-------|-------|
| `data` | `<markdown [data]="text" />` | Re-renders on every input change. |
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
unhandled promise rejection for every source; `load` is then not emitted.

## Rendering options

| Input | Default | Effect |
|-------|---------|--------|
| `inline` | `false` | Parse with `marked.parseInline` (no wrapping `<p>`). |
| `disableSanitizer` | `false` | Skip sanitizing for this content. See [Sanitization](sanitization.md). |
| `emoji`, `katex`, `mermaid`, `clipboard` | `false` | Turn a plugin on. See the plugin pages. |
| `lineNumbers`, `lineHighlight`, `commandLine` | `false` | Prism plugin attributes. See [Syntax Highlighting](syntax-highlighting.md). |
| `routerLinkOptions`, `disableRouterLinkHandler` | unset, `false` | Link clicks. See [Link Handling](link-handling.md). |

Boolean inputs accept attribute syntax: `<markdown katex [data]="text">`. `disableRouterLinkHandler` is the
exception: it has no boolean coercion, so the bare attribute (an empty string) does **not** disable link handling.
Bind it as `[disableRouterLinkHandler]="true"`.

## When it renders again

The component uses decorator `@Input()`s and renders from `ngOnChanges`. Any input change renders again: with
`data` the string is parsed again, with `src` the file is fetched again. `MarkdownService.reload()` renders every
component that has `data` or `src` again (and fetches `src` again). Projected content is rendered once and is not
re-rendered by `reload()`.

`render(markdown, decodeHtml?)` is a public method in 18.x, so you can also render a string into a component
instance from code.

## SSR

Renders are not registered with `PendingTasks` in 18.x, so server rendering may not wait for them. See
[SSR and Prerendering](../guides/ssr-and-prerendering.md).

Full input list: [API: MarkdownComponent](../api/markdown-component.md).
