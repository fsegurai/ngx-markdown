---
label: Documentation Home
description: Documentation for @fsegurai/ngx-markdown 22.0.0, an Angular library that renders Markdown with marked and highlights code with Prism.js.
order: 0
tags: [ "documentation", "overview", "angular" ]
keywords: [ "markdown", "marked", "prism", "standalone component" ]
breadcrumbTitle: Home
---

# @fsegurai/ngx-markdown Docs

`@fsegurai/ngx-markdown` renders Markdown in [Angular](https://angular.dev/) applications. It parses with
[marked](https://marked.js.org/) and adds optional plugins for syntax highlighting, math, diagrams, emoji, copy buttons
and an image viewer.

| Building block | What it is |
|----------------|------------|
| `MarkdownComponent` | `<markdown>` (also `ngx-markdown` and the `[markdown]` attribute): renders `data`, `src` or projected content. |
| `MarkdownPipe` | `markdown`: turns a string into `SafeHtml` for `[innerHTML]`. |
| `LanguagePipe` | `language`: wraps a string in a fenced code block. |
| `MarkdownService` | Parses, renders, reloads and highlights from code. |
| `provideMarkdown()` | App-wide configuration, including the `withX()` plugin features. |

## Quick path

1. Install the library and `marked`: [Installation](getting-started/installation.md).
2. Render your first Markdown: [Quick Start](getting-started/quick-start.md).
3. Turn on the plugins you need with `provideMarkdown({ plugins: [...] })`: [Configuration](getting-started/configuration.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install, render a first document, and configure the library. |
| [Features](features/README.md) | Understand what each building block and plugin does. |
| [Guides](guides/README.md) | Solve a task: migrate from 21.x, write a plugin, follow a theme, SSR. |
| [API Reference](api/README.md) | Look up exact inputs, outputs, methods, functions, tokens and types. |
| [Examples](examples/README.md) | Copy a complete, working snippet. |
| [Help](help/README.md) | Find answers and fix common problems. |

## Version

These docs describe `22.0.0`, which targets Angular `^22` and `marked ^18`. See the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) for the full list of changes, and the
[live demo](https://fsegurai.github.io/ngx-markdown) for every feature in action.
