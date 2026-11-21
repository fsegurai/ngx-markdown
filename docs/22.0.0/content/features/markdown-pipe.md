---
label: Markdown Pipe
description: Use the markdown pipe to bind parsed Markdown to innerHTML and the language pipe to wrap code in a fence.
order: 2
tags: [ "features", "pipe" ]
keywords: [ "MarkdownPipe", "LanguagePipe", "innerHTML", "async" ]
---

# Markdown Pipe

## markdown

`MarkdownPipe` turns a string into `SafeHtml` asynchronously, so it is always followed by `async`:

```html
<div [innerHTML]="markdown | markdown | async"></div>
<div [innerHTML]="markdown | markdown: { emoji: true, inline: true } | async"></div>
```

Its options are `MarkdownPipeOptions`, which is `ParseOptions & RenderOptions` (the same options as
`MarkdownService.parse()` and `render()`).

| Behavior | Detail |
|----------|--------|
| `null` / `undefined` | Resolves to `''`. |
| Non-string | Resolves to `''` and logs an `[ngx-markdown]` error. |
| Post-render step | Runs after the next render on the **host element of the component that uses the pipe**, so it covers that whole template. |
| Errors | An async post-render rejection is reported to Angular's `ErrorHandler`. |
| SSR | The parse and post-render are tracked as pending tasks. |
| Long values | In the browser, a value of 16 KiB or more is parsed in time slices (`timeSlicing`); a new value stops the parse of the previous one, whose Promise resolves to `''`. |

Limits of the pipe:

- No outputs. Pass callbacks instead: `clipboardOptions.onCopied` / `onCopyError`,
  `mermaidExportOptions.onExported` / `onExportError`, `onFrontMatter`, `onHeadings`.
- Several pipes in one template share the host, so each render replaces the clipboard buttons of the previous one.
- The image lightbox is not supported. Use `<markdown>` when the plugins must be scoped to the content.
- `[innerHTML]` sets the whole HTML at once, so its layout is one long task, and every change replaces everything. For
  long or edited documents use `<markdown [data]>`: it inserts long documents in batches and updates only the changed
  blocks (see [Long Documents](../guides/long-documents.md)).

## language

`LanguagePipe` wraps a string in a fenced code block. The fence is longer than any backtick run in the value, so the
content cannot close it early.

```html
<markdown [data]="code | language: 'typescript'" />
<div [innerHTML]="code | language: 'typescript' | markdown | async"></div>
```

`null` or `undefined` values and languages become `''`.
