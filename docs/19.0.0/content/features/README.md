---
label: Features
description: What each building block and plugin of @fsegurai/ngx-markdown 19.0.0 does, with the inputs that control it.
order: 2
tags: [ "features", "overview" ]
breadcrumbTitle: Features
---

# Features

## Building blocks

| Page | What it covers |
|------|----------------|
| [Markdown Component](markdown-component.md) | `<markdown>`: `data`, `src`, projected content, outputs. |
| [Markdown and Language Pipes](markdown-pipe.md) | `markdown` and `language` pipes for template strings. |
| [Markdown Service](markdown-service.md) | Parse, render, highlight and reload from code. |
| [Sanitization](sanitization.md) | `SecurityContext` and `disableSanitizer`. |
| [Link Handling](link-handling.md) | `routerLinkOptions` click handlers for internal and external links. |

## Plugins

Each plugin is off until you turn it on per component (`[katex]="true"`) or per pipe call (`{ katex: true }`), and
each needs its library loaded as a global script. Syntax highlighting is the exception: it runs whenever Prism is
loaded.

| Page | Library | Toggle |
|------|---------|--------|
| [Syntax Highlighting](syntax-highlighting.md) | Prism.js | always on when `Prism` exists |
| [Copy to Clipboard](clipboard.md) | clipboard.js | `clipboard` |
| [Emoji](emoji.md) | emoji-toolkit | `emoji` |
| [Math with KaTeX](katex.md) | KaTeX + Auto-Render | `katex` |
| [Mermaid Diagrams](mermaid.md) | Mermaid | `mermaid` |
