---
label: Troubleshooting
description: Fixes for code not highlighting, plugins doing nothing, missing heading ids, Mermaid errors and SSR problems.
order: 2
tags: [ "help", "troubleshooting" ]
keywords: [ "not highlighting", "plugin warning", "Mermaid error", "id removed" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Code is not highlighted | `withPrism()` missing, or Prism / the language component not loaded | Add `withPrism()`; load `prism.js` and `prism-<lang>.min.js`. |
| `[katex]`, `[mermaid]`, `[clipboard]`… do nothing | The `withX()` feature is not provided | Add it to `provideMarkdown({ plugins })`. In dev mode a warning names it. |
| `ERROR_*_NOT_LOADED` | The plugin's library is not loaded as a global | Add its script to `angular.json` (or a `loader` for Mermaid). |
| `*_VIEW_CONTAINER_REQUIRED` | `MarkdownService.render()` called without a `ViewContainerRef` | Pass one, or use `<markdown>`. |
| Highlighted markup missing right after `render()` | Highlighting is asynchronous | `await render()`, or wait for `ready`. |
| Heading anchors have no `id` | The default sanitizer removes `id` | Use `element.scrollIntoView()`, or a sanitizer that keeps ids. |
| Prism line numbers missing | Prism plugin script/CSS not loaded | Load `prismjs/plugins/line-numbers/*`. |
| Changing an input does nothing | Inputs are read at render time | Change `data`/`src`, or call `MarkdownService.reload()`. |
| Mermaid shows `.mermaid-error` boxes | Invalid diagram, timeout, or failed load | Read the `MermaidRenderError` `failures`; raise `renderTimeout` for large diagrams. |
| Diagrams look different after upgrading | Mermaid 12 defaults (ELK, `neo` look) | Pin `{ layout: 'dagre', look: 'classic', theme: 'default' }`. |
| CommonJS warnings with Mermaid | Mermaid dependencies | Add them to `allowedCommonJsDependencies`. |
| `src` fails during prerender | XHR backend (`withXhr()`) | Keep `HttpClient` on the default Fetch backend. |
| Whitespace lost in projected Markdown | Angular strips template whitespace | Add `ngPreserveWhitespaces`. |
| KaTeX math disappears with a custom sanitizer | Placeholders were stripped | Allow `<span>` with `class`. |
