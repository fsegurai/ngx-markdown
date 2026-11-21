---
label: Troubleshooting
description: Fixes for common problems with @fsegurai/ngx-markdown 21.0.0, from missing plugin scripts to unhighlighted code.
order: 3
tags: [ "help", "troubleshooting" ]
keywords: [ "NullInjectorError", "Prism", "not loaded", "highlight", "whitespace" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `NullInjectorError: No provider for InjectionToken SECURITY_CONTEXT` | `provideMarkdown()` was not called. | Add `provideMarkdown()` to the application providers. |
| Console: `Prism.js not loaded. Code highlighting will not be applied.` | No `Prism` global. | Add `prismjs/prism.js` to `scripts`, or ignore the warning if you don't want highlighting. |
| Code of one language stays plain | Its grammar is not loaded. | Add `prismjs/components/prism-<lang>.min.js`. |
| `[ngx-markdown] KaTeX files required…` | `katex` on without both KaTeX scripts. | Add `katex.min.js` **and** `contrib/auto-render.min.js`. |
| `[ngx-markdown] Mermaid files required…` | `mermaid` on without the Mermaid global. | Load `mermaid.min.js` as a script or static asset. |
| `[ngx-markdown] Clipboard files required…` | `clipboard` on without clipboard.js. | Add `clipboard/dist/clipboard.min.js`. |
| `[ngx-markdown] Emoji-Toolkit files required…` | `emoji` on without joypixels. | Add `emoji-toolkit/lib/js/joypixels.min.js`. |
| A plugin error with `[data]` is not on `(error)` | In 21.0.0 `data` / projected-content render failures go to the `ErrorHandler`. | Check the console, or upgrade to 21.0.1, which emits them on `error`. |
| Projected Markdown renders on one line | Angular strips template whitespace. | Add `ngPreserveWhitespaces` to the element. |
| Diagrams look different after upgrading | Mermaid 12 uses ELK by default. | Set `{ layout: 'dagre', look: 'classic' }` in the Mermaid config. |
| `CLIPBOARD_OPTIONS` button not used by `<markdown>` | The component overrides the global keys in 21.x. | Set `[clipboardButtonComponent]` on the component. See [Copy to Clipboard](../features/clipboard.md). |
| Changing `[katex]` with `[src]` does nothing | Only `src` is tracked for `[src]` content. | Call `MarkdownService.reload()`. |
| `[src]` fails during prerendering | The XHR backend cannot load app assets there. | `provideHttpClient(withFetch())`. |
| Styled HTML loses `style` attributes | Angular's sanitizer removes them. | Use classes, or `disableSanitizer` for trusted content. |

Still stuck? Compare with the [live demo](https://fsegurai.github.io/ngx-markdown) or open an
[issue](https://github.com/fsegurai/ngx-markdown/issues).
