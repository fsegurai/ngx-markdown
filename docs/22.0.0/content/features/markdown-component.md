---
label: Markdown Component
description: Render Markdown from data, a remote src or projected content with the standalone MarkdownComponent.
order: 1
tags: [ "features", "component" ]
keywords: [ "MarkdownComponent", "data", "src", "transclusion", "ready" ]
---

# Markdown Component

`MarkdownComponent` is standalone, `OnPush` and matches three selectors: `ngx-markdown`, `markdown` and the
`[markdown]` attribute (so `<div markdown>` works like a directive).

```html
<markdown [data]="markdown" />
<markdown [src]="'docs/guide.md'" (load)="onLoad($event)" (error)="onError($event)" />
<div markdown [data]="markdown" [inline]="true"></div>
<markdown ngPreserveWhitespaces>
  # Projected content
</markdown>
```

## Where the content comes from

| Source | Input | Notes |
|--------|-------|-------|
| A string | `data` | Wins over `src` when not empty (a one-time warning is logged when both are set). `''` clears the output when no `src` is set. |
| A file | `src` | Fetched with `HttpClient`. A file that is not `.md`/`.markdown` renders as a code block of its extension's language. |
| Projected content | none | Read from the element when neither `data` nor `src` is set; HTML entities are decoded first. |

`data` and `src` are `model()` signals, so you can also two-way bind them.

## What triggers a render

- Only `data`, `src` and `MarkdownService.reload()` render again. The other inputs (`inline`, `katex`, `clipboard`,
  the Prism inputs, `[plugins]`…) are read at render time.
- `mermaidOptions` is the exception: a change re-renders the Mermaid diagrams alone
  (see [Mermaid Diagrams](mermaid.md)).
- The latest request wins: a newer `data`/`src` cancels a pending HTTP request and an unfinished render.

## Events

| Output | Payload | When |
|--------|---------|------|
| `load` | `string` | A `src` was fetched and rendered. |
| `ready` | `void` | The content and every plugin (highlighting, diagrams) finished. |
| `error` | `MarkdownError` | The `src` request failed (`HttpErrorResponse`), or parsing/rendering threw. |
| `metadata` | `MarkdownFrontMatter` | With `frontMatter`, before `ready`. |
| `headings` | `MarkdownHeading[]` | Every render, before `ready`. |

Plugin outputs (`copied`, `copyError`, `mermaidExported`, `mermaidExportError`, `imageClick`, `extendedEvent`) are
described on each plugin page. The full list is in the [API reference](../api/markdown-component.md).

## Long documents

Long content (16 KiB or more) is parsed and sanitized in slices of about 8 ms, large documents (16 KB of HTML or more)
are inserted in three batches, a frame apart, and the plugins work in chunks, so the main thread is not blocked. Nothing needs configuring; for very long pages, the opt-in `contentVisibility` input
lets the browser skip the off-screen blocks. See [Long Documents](../guides/long-documents.md).
