---
label: Math with KaTeX
description: Render math expressions with KaTeX and its Auto-Render extension, using per-component KatexOptions.
order: 13
tags: [ "features", "plugins" ]
keywords: [ "KaTeX", "math", "KatexOptions", "renderMathInElement", "delimiters" ]
---

# Math with KaTeX

```html
<markdown katex [src]="'formulas.md'" />
<markdown katex [katexOptions]="options" [data]="text" />
```

Needs three files: `katex.min.js` and `contrib/auto-render.min.js` as scripts and `katex.min.css` as a style, all
from `node_modules/katex/dist/`. Without the scripts, rendering throws `ERROR_KATEX_NOT_LOADED`.

## How it works

After the HTML is in the DOM, the library calls Auto-Render's `renderMathInElement(element, options)`. It runs only in
the browser.

## Delimiters

The defaults are `$$…$$` and `\[…\]` (display), `$…$` and `\(…\)` (inline), plus display environments such as
`\begin{align}`, `\begin{equation}`, `\begin{matrix}`, `\begin{cases}` and `\begin{CD}`. Passing `delimiters`
replaces the whole list.

## KatexOptions

`KatexOptions` combines the [KaTeX options](https://katex.org/docs/options.html) and the
[Auto-Render options](https://katex.org/docs/autorender.html#api):

```typescript
import { KatexOptions } from '@fsegurai/ngx-markdown';

readonly options: KatexOptions = {
  throwOnError: false,
  errorColor: '#cc0000',
  ignoredClasses: ['no-math'],
};
```

| Group | Keys |
|-------|------|
| KaTeX | `displayMode`, `throwOnError`, `errorColor`, `macros`, `colorIsTextColor`, `maxSize`, `maxExpand`, `allowedProtocols`, `strict` |
| Auto-Render | `delimiters`, `ignoredTags`, `ignoredClasses` |

With KaTeX 0.19, a `strict` callback must return `false`, `'ignore'`, `true`, `'error'` or `'warn'`; anything else
falls back to `'warn'`.

There is no app-wide KaTeX token in 21.x. With the pipe: `{ katex: true, katexOptions }`.
