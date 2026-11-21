---
label: Markdown and Language Pipes
description: Turn template strings into HTML with the markdown pipe, and wrap code in a fenced block with the language pipe.
order: 2
tags: [ "features", "pipe" ]
keywords: [ "MarkdownPipe", "LanguagePipe", "MarkdownPipeOptions", "async", "innerHTML" ]
---

# Markdown and Language Pipes

## markdown

```html
<div [innerHTML]="text | markdown | async"></div>
<div [innerHTML]="text | markdown : { emoji: true, inline: true } | async"></div>
```

`transform(value: string, options?)` is `async` and resolves to `SafeHtml`, so the `async` pipe is always needed.
`null` and `undefined` become an empty string.

After parsing, the pipe runs the post-render plugins (highlight, clipboard, KaTeX, Mermaid) on its **host element**,
which is the element of the component whose template uses the pipe. It waits for the first `NgZone.onStable`
emission to do so.

> **Zoneless apps.** Without `zone.js`, Angular uses a no-op zone whose `onStable` never emits, so the pipe's
> post-render plugins (including Prism highlighting) do not run. `zone.js` is a peer dependency of 18.x.

### MarkdownPipeOptions

`MarkdownPipeOptions = ParseOptions & RenderOptions`:

| Option | Effect |
|--------|--------|
| `inline` | Parse inline (no wrapping `<p>`). |
| `decodeHtml` | Decode HTML entities before parsing. |
| `emoji` | Convert `:shortcodes:`. |
| `mermaid` | Turn ```` ```mermaid ```` blocks into diagrams. |
| `markedOptions` | Marked options for this call only. |
| `disableSanitizer` | Skip sanitizing. |
| `clipboard`, `clipboardOptions` | Copy buttons. |
| `katex`, `katexOptions` | Math rendering. |
| `mermaidOptions` | Mermaid config for this call. |

The README's `MarkdownPipeOptions` listing omits `clipboard` and `clipboardOptions`; the source type includes them.

## language

```html
<markdown [data]="code | language : 'typescript'" />
<div [innerHTML]="code | language : 'typescript' | markdown | async"></div>
```

`language` wraps the value in a fenced code block: ```` ```typescript\n…\n``` ````. `null` / `undefined` become `''`.

## Component or pipe?

Prefer the component. The pipe has no outputs, no Prism plugin inputs (line numbers, line highlight, command line),
its plugins run over the whole host component, not only the pipe's output, and they depend on `zone.js`.
