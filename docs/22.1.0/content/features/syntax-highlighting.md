---
label: Syntax Highlighting
description: Highlight code blocks with Prism.js through withPrism(), including line numbers, line highlight and command line.
order: 5
tags: [ "features", "plugins", "highlighting" ]
keywords: [ "withPrism", "Prism.js", "line numbers", "command line", "codeLineHighlight" ]
---

# Syntax Highlighting

The Prism plugin highlights every code block with the global `Prism` (or a Prism it loads, see below). It is
**enabled by default once provided**.

```typescript
provideMarkdown({ plugins: [withPrism()] });
```

Without `withPrism()`, nothing is highlighted at render time and the Prism inputs do nothing. Load
`prismjs/prism.js`, the language components and a theme first (see [Installation](../getting-started/installation.md)).

## Loading Prism on demand (`loader`, 22.1.0)

```typescript
withPrism({
  loader: () => import('prismjs'),
  languages: [() => import('prismjs/components/prism-typescript'), () => import('prismjs/components/prism-bash')],
  onLoad: (prism) => extendMyGrammar(prism),
})
```

Prism loads on the first render that highlights. It becomes the `Prism` global when there is none (Prism's language
and plugin modules extend it), then `languages` load one after the other, then `onLoad` runs, once per loader. A failed
load rejects that render (its blocks stay plain) and the next render loads again; a loaded value that is not Prism
rejects with `ERROR_PRISM_NOT_LOADED`. Nothing is loaded on the server.

## Marked lines of marked-extended code blocks (`codeLineHighlight`, 22.1.0)

| Value | Prism's `data-line` / `data-line-offset` on `@fsegurai/marked-extended-code` blocks |
|-------|-------------------------------------------------------------------------------------|
| `'set'` (default) | Written from the block's marked lines. |
| `'skip'` | Never written, so the code extension alone marks the lines (no double highlight). |
| `'remove'` | Also removed when present, at every render. |

The values match `attachCode`'s `prismLineHighlight`; other `<pre>` keep `line` / `lineOffset`.

## How it highlights

- Highlighting starts after a yield, then runs block by block in chunks of about 8 ms, so long documents do not block
  the main thread. `ready` (or the `render()` Promise) waits for it.
- A newer render or `cleanup()` of the element stops it.
- Nothing is highlighted on the server. Without the global `Prism` in the browser, a warning is logged.
- Disable it per component with `[plugins]="{ prism: false }"`.

## Prism plugins (line numbers, highlight, command line)

The options set the classes and `data-*` attributes of Prism's own plugins on every `<pre>`. Load each Prism plugin's
script and CSS from `node_modules/prismjs/plugins/<name>/`.

| Prism plugin | Options / inputs |
|--------------|------------------|
| Line Numbers | `lineNumbers`, `start` |
| Line Highlight | `lineHighlight`, `line` (`'6, 10-16'` or `['6', '10-16']`), `lineOffset` |
| Command Line | `commandLine`, `user`, `host`, `prompt`, `output`, `filterOutput` |

Set them globally in `withPrism(options)` or per component with the inputs of the same name (unset inputs never
override):

```html
<markdown [src]="'app.ts'" lineNumbers [start]="5" />
<markdown [src]="'app.ts'" lineHighlight [line]="'6, 10-16'" [lineOffset]="5" />
<markdown [src]="'setup.bash'" commandLine [user]="'chris'" [host]="'remotehost'" [output]="'2, 4-8'" />
```

Invalid numbers or ranges are ignored with a one-time `[ngx-markdown]` warning.

## Choosing the language

| Source | Language |
|--------|----------|
| Fenced block in `data` or projected content | The fence info string (` ```typescript `). |
| `src` with a non-Markdown extension | The file extension (`file.php` renders as `php`). |
| A plain string in `data` | Wrap it with the `language` pipe: `code \| language: 'typescript'`. |

## Highlighting without the plugin

`MarkdownService.highlight(element?)` highlights at once with `Prism.highlightAllUnder`, with or without `withPrism()`.

Code blocks from `@fsegurai/marked-extended-code` can override these options per block; see
[Marked Extended](marked-extended.md).
