---
label: Installation
description: Install @fsegurai/ngx-markdown, marked and the optional plugin libraries, and load their scripts and styles.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "bun", "peer dependencies", "angular.json" ]
---

# Installation

Install the library and `marked`:

```bash
npm install @fsegurai/ngx-markdown marked@^18.0.0
# or
bun add @fsegurai/ngx-markdown marked@^18.0.0
```

## Requirements

| Peer | Version | Required |
|------|---------|----------|
| `@angular/common`, `@angular/core`, `@angular/platform-browser`, `@angular/router` | `^22.0.0` | Yes |
| `marked` | `^18.0.0` | Yes |
| `rxjs` | `^6.5.3 \|\| ^7.4.0 \|\| ^7.8.2` | Yes |
| `prismjs` | `^1.30.0` | Optional (syntax highlighting) |
| `clipboard` | `^2.0.11` | Optional (copy buttons) |
| `emoji-toolkit` | `^11.0.0` | Optional (emoji shortcodes) |
| `katex` | `^0.19.0` | Optional (math) |
| `mermaid` | `^12.1.0` | Optional (diagrams) |

The optional peers are **not** installed with the library. Install each one only when you use its plugin.

## Browser support

The library supports the browsers of Angular 22's default browserslist, "Baseline widely available" (on
2026-05-07): Chrome and Edge 119+, Firefox 119+, Safari and iOS Safari 17+, and the current Chrome and Firefox for
Android. Mermaid 12 itself needs Safari 17.4+. Newer browser features are used when present, with these fallbacks:

| Feature | Where it is missing |
|---------|---------------------|
| `scheduler.yield()` (yields of the time-sliced parse and the chunked plugins) | A `MessageChannel` message, else `setTimeout(0)` |
| `requestAnimationFrame` (progressive insertion) | The same yields, without frame alignment (also in a hidden tab) |
| `content-visibility: auto` (`contentVisibility`) | Ignored: every block is rendered, as without the option |
| `IntersectionObserver` (Mermaid `lazy`) | Every diagram is drawn at once |
| `scrollMargin` of `IntersectionObserver` (Mermaid `lazy` in a scrolling element) | A diagram inside a scrolling element is drawn once it is visible there |
| `HTMLDialogElement.showModal()` (lightbox) | The dialog opens with its `open` attribute (not modal) |
| Static `ClipboardJS.copy` (older ClipboardJS releases) | One ClipboardJS instance per button, created on its first click |

## Optional libraries

Each optional library is read as a browser global, so add its script (and theme) to the `angular.json` build options.
Mermaid can also be loaded on demand instead (see [Mermaid Diagrams](../features/mermaid.md)).

| Feature | Install | `scripts` | `styles` |
|---------|---------|-----------|----------|
| Prism | `prismjs@^1.30.0` | `node_modules/prismjs/prism.js` + `node_modules/prismjs/components/prism-<lang>.min.js` | a theme from `node_modules/prismjs/themes/` |
| Clipboard | `clipboard@^2.0.11` | `node_modules/clipboard/dist/clipboard.min.js` | - |
| Emoji | `emoji-toolkit@^11.0.0` | `node_modules/emoji-toolkit/lib/js/joypixels.min.js` | - |
| KaTeX | `katex@^0.19.0` | `node_modules/katex/dist/katex.min.js` | `node_modules/katex/dist/katex.min.css` |
| Mermaid (global) | `mermaid@^12.1.0` | `node_modules/mermaid/dist/mermaid.min.js` | - |

```json
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
  "node_modules/katex/dist/katex.min.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-typescript.min.js",
  "node_modules/clipboard/dist/clipboard.min.js",
  "node_modules/emoji-toolkit/lib/js/joypixels.min.js",
  "node_modules/katex/dist/katex.min.js"
]
```

> Installing a script is not enough: every plugin also needs its `withX()` feature in `provideMarkdown()`. See
> [Configuration](configuration.md).

## Next step

[Quick Start](quick-start.md).
