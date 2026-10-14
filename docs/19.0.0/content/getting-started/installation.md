---
label: Installation
description: Install @fsegurai/ngx-markdown 19.0.0 with marked 15, then add only the optional plugin libraries you need as global scripts.
order: 1
tags: [ "getting-started", "installation" ]
keywords: [ "npm", "peer dependencies", "angular.json", "scripts" ]
---

# Installation

```bash
npm install @fsegurai/ngx-markdown marked@^15.0.2
```

That is all you need to render Markdown. Every plugin below is optional.

## Requirements

| Package | Version | Kind |
|---------|---------|------|
| `@angular/common`, `@angular/core`, `@angular/platform-browser` | `^19.0.0` | peer |
| `marked` | `>= 15.0.0 < 16.0.0` | peer |
| `rxjs` | `^6.5.3 \|\| ^7.4.0 \|\| ^7.8.1` | peer |
| `zone.js` | `~0.15.0` | peer |
| `prismjs` | `^1.29.0` | optional |
| `clipboard` | `^2.0.11` | optional |
| `emoji-toolkit` | `^9.0.1` | optional |
| `katex` | `^0.16.11` | optional |
| `mermaid` | `^11.4.1` | optional |

The library also imports `@angular/router` (for link handling) without declaring it as a peer, so keep it installed.

## Optional plugins

The library does not import the plugin packages. It calls the globals they define (`Prism`, `ClipboardJS`,
`joypixels`, `katex` + `renderMathInElement`, `mermaid`), so load each one through `angular.json`.

| Plugin | Install | Add to `angular.json` |
|--------|---------|-----------------------|
| Syntax highlighting | `npm install prismjs@^1.29.0` | script `node_modules/prismjs/prism.js`, one `node_modules/prismjs/components/prism-<lang>.min.js` per language, and a theme from `node_modules/prismjs/themes/` in `styles` |
| Copy to clipboard | `npm install clipboard@^2.0.11` | script `node_modules/clipboard/dist/clipboard.min.js` |
| Emoji | `npm install emoji-toolkit@^9.0.1` | script `node_modules/emoji-toolkit/lib/js/joypixels.min.js` |
| Math | `npm install katex@^0.16.11` | scripts `node_modules/katex/dist/katex.min.js` and `node_modules/katex/dist/contrib/auto-render.min.js`; style `node_modules/katex/dist/katex.min.css` |
| Diagrams | `npm install mermaid@^11.4.1` | script `node_modules/mermaid/dist/mermaid.min.js` |

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
  "node_modules/katex/dist/katex.min.js",
  "node_modules/katex/dist/contrib/auto-render.min.js",
  "node_modules/mermaid/dist/mermaid.min.js"
]
```

The Prism plugins for line numbers, line highlight and command line need their own files too. See
[Syntax Highlighting](../features/syntax-highlighting.md).

## Next step

Render your first document: [Quick Start](quick-start.md).
