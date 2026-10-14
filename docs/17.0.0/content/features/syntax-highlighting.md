---
label: Syntax Highlighting
description: Highlight fenced code blocks with Prism.js, plus the line numbers, line highlight and command line Prism plugins.
order: 10
tags: [ "features", "plugins" ]
keywords: [ "Prism.js", "lineNumbers", "lineHighlight", "commandLine", "PrismPlugin" ]
---

# Syntax Highlighting

Highlighting has no toggle. Every render calls `Prism.highlightAllUnder()` on the rendered element when the global
`Prism` exists; without it, the code silently stays plain (no warning in 17.0.0). Code blocks without a
language get `language-none`.

## Setup

```json
"styles": ["node_modules/prismjs/themes/prism-okaidia.css"],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-typescript.min.js",
  "node_modules/prismjs/components/prism-css.min.js"
]
```

Load one `components/prism-<lang>.min.js` per language you show. Some grammars extend others (for example
`typescript` needs `javascript`, which `prism.js` already includes).

## Choosing the language

| Source | Language comes from |
|--------|---------------------|
| Fenced block | The info string: ```` ```typescript ```` |
| `[src]` | The file extension: `file.ts` → `ts`, `file.php` → `php` (`.md` is parsed as Markdown) |
| `[data]` | The `language` pipe: `[data]="code \| language : 'typescript'"` |

## Prism plugins

These component inputs add Prism plugin classes and `data-*` attributes to every `<pre>` in the output. Load each
plugin's CSS and JS from `node_modules/prismjs/plugins/<plugin>/`.

| Plugin | Files | Inputs |
|--------|-------|--------|
| [Line Numbers](https://prismjs.com/plugins/line-numbers/) | `prism-line-numbers.css` / `.js` | `lineNumbers`, `start` (first line number) |
| [Line Highlight](https://prismjs.com/plugins/line-highlight/) | `prism-line-highlight.css` / `.js` | `lineHighlight`, `line` (e.g. `'6, 10-16'`), `lineOffset` |
| [Command Line](https://prismjs.com/plugins/command-line/) | `prism-command-line.css` / `.js` | `commandLine`, `user`, `host`, `prompt`, `output` (e.g. `'2, 4-8'`), `filterOutput` (prefix) |

```html
<markdown [src]="'example.js'" lineNumbers [start]="5" />
<markdown [src]="'example.js'" lineHighlight [line]="'6, 10-16'" [lineOffset]="5" />
<markdown [src]="'deploy.bash'" commandLine [user]="'chris'" [host]="'remotehost'" [output]="'2, 4-8'" />
```

For a server prompt set `user` and `host` (`#` for `root`, `$` otherwise); for any other prompt set `prompt`. With
`filterOutput="(out)"`, lines starting with `(out)` are shown as output and the prefix is removed.

The Prism plugin inputs exist on the component only, not on the pipe. The `PrismPlugin` enum holds the class names
(`command-line`, `line-highlight`, `line-numbers`).
