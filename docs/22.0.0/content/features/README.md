---
label: Features
description: What each building block and plugin of @fsegurai/ngx-markdown does, with the inputs that control it.
order: 2
tags: [ "features", "overview" ]
breadcrumbTitle: Features
---

# Features

## Rendering

| Page | Covers |
|------|--------|
| [Markdown Component](markdown-component.md) | `<markdown>`: `data`, `src`, projected content, events. |
| [Markdown Pipe](markdown-pipe.md) | `markdown` and `language` pipes. |
| [Markdown Service](markdown-service.md) | Parsing and rendering from code, reloads, caches. |
| [Sanitization](sanitization.md) | `SecurityContext`, sanitize functions and `disableSanitizer`. |

## Plugins

| Page | Provided with | Enabled with |
|------|---------------|--------------|
| [Syntax Highlighting](syntax-highlighting.md) | `withPrism()` | on by default |
| [Copy to Clipboard](clipboard.md) | `withClipboard()` | `clipboard` |
| [Emoji](emoji.md) | `withEmoji()` | `emoji` |
| [Math with KaTeX](katex.md) | `withKatex()` | `katex` |
| [Mermaid Diagrams](mermaid.md) | `withMermaid()` | `mermaid` |
| [Mermaid SVG Export](mermaid-export.md) | `withMermaidExport()` | `mermaidExport` |
| [Image Lightbox](lightbox.md) | `withLightbox()` | `lightbox` |
| [Marked Extended](marked-extended.md) | `withMarkedExtended()` | on by default |

## Content helpers (core, nothing to provide)

| Page | Enabled with |
|------|--------------|
| [Front-matter](front-matter.md) | `frontMatter` |
| [Headings and TOC](headings.md) | `(headings)`, `headingIds` |
| [Relative URLs](relative-urls.md) | `baseUrl`, `srcRelativeLink` |
| [Link Handling](link-handling.md) | `routerLinkOptions` |
