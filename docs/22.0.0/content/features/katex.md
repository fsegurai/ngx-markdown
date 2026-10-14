---
label: Math with KaTeX
description: Render $…$ and $$…$$ math while parsing with KaTeX and the withKatex() plugin.
order: 8
tags: [ "features", "plugins", "math" ]
keywords: [ "withKatex", "KaTeX", "LaTeX", "KatexOptions" ]
---

# Math with KaTeX

Needs the KaTeX script and CSS (global `katex`) and the feature:

```typescript
provideMarkdown({ plugins: [withKatex({ throwOnError: false })] });
```

```html
<markdown [src]="'math.md'" katex [katexOptions]="{ errorColor: '#cc0000' }" />
```

## Syntax

| Write | Renders |
|-------|---------|
| `$…$` | Inline math |
| `$$…$$` in a line | Display math |
| `$$` / expression / `$$` on three lines | A display math block |
| `\$` | A literal dollar |

- The opening `$` must start the text or follow whitespace, an opening bracket or quote; the closing `$` must be
  followed by whitespace, punctuation, a closing bracket or quote, or the end. So `costs $5 and $10` stays text.
  `nonStandard: true` also renders `a$x$b`.
- Math is rendered **while parsing**, so `_`, `*` and `\` inside math never become emphasis or escapes.
- Math in code, and inside raw HTML blocks, is left untouched. `\(…\)` and `\[…\]` are not supported.

## Options

`KatexOptions` are the [KaTeX options](https://katex.org/docs/options) plus `nonStandard`. `withKatex(options)` sets
defaults; the `katexOptions` input is merged over them. `displayMode` is always set by the delimiters.

## Errors, SSR and security

- With KaTeX's default `throwOnError: true`, an invalid expression stays as source text and the error is logged. With
  `false`, KaTeX renders it in `errorColor`.
- In the browser without the global `katex`, the parse fails with `ERROR_KATEX_NOT_LOADED`.
- On the server, math renders only when `katex` is a global there (for example `globalThis.katex = katex`); otherwise
  the browser renders it.
- KaTeX output is inserted **after** sanitizing. Keep `trust` off (the default) for untrusted content, or pass a
  function that trusts only what you allow.
