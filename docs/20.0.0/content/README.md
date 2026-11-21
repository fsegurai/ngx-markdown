---
label: Documentation Home
description: Documentation for @fsegurai/ngx-markdown 20.0.0, an Angular 20 library that renders Markdown with marked and highlights code with Prism.js.
order: 0
tags: [ "documentation", "overview", "angular" ]
keywords: [ "markdown", "marked", "prism", "standalone component", "MarkdownModule" ]
breadcrumbTitle: Home
publishedAt: "2025-06-17"
---

# @fsegurai/ngx-markdown Docs

`@fsegurai/ngx-markdown` renders Markdown in [Angular](https://angular.dev/) applications. It parses with
[marked](https://marked.js.org/) and adds optional plugins for syntax highlighting, math, diagrams, emoji and copy
buttons. Each plugin runs on a library you load yourself as a global script.

| Building block | What it is |
|----------------|------------|
| `MarkdownComponent` | `<markdown>` (also `ngx-markdown` and the `[markdown]` attribute): renders `data`, `src` or projected content. |
| `MarkdownPipe` | `markdown`: turns a string into a `Promise<SafeHtml>` for `[innerHTML]` with `async`. |
| `LanguagePipe` | `language`: wraps a string in a fenced code block. |
| `MarkdownService` | Parses, renders, reloads and highlights from code. |
| `provideMarkdown()` | App-wide configuration through injection-token providers. |
| `MarkdownModule` | NgModule wrapper with `forRoot()` / `forChild()`, for NgModule applications. |

## Quick path

1. Install the library and `marked`: [Installation](getting-started/installation.md).
2. Render your first Markdown: [Quick Start](getting-started/quick-start.md).
3. Add the plugins you need and configure them: [Configuration](getting-started/configuration.md).

## Sections

| Section | Read it when you want to |
|---------|--------------------------|
| [Getting Started](getting-started/README.md) | Install, render a first document, and configure the library. |
| [Features](features/README.md) | Understand what each building block and plugin does. |
| [Guides](guides/README.md) | Solve a task: upgrade from 19.x, customize rendering, run on the server. |
| [API Reference](api/README.md) | Look up exact inputs, outputs, methods, functions, tokens and types. |
| [Examples](examples/README.md) | Copy a complete, working snippet. |
| [Help](help/README.md) | Read the release notes, find answers and fix common problems. |

## Version

These docs describe `20.0.0`, released 2025-06-17. It targets Angular `^20.0.3`, `marked >= 15.0.0 < 16.0.0` and
`zone.js ~0.15.1`, and moves the library to Angular signals. See
[What's New in 20.0.0](help/whats-new.md), the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) for the full list of changes, and the
[live demo](https://fsegurai.github.io/ngx-markdown) for every feature in action.
