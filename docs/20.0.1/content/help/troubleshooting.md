---
label: Troubleshooting
description: Fixes for common problems with @fsegurai/ngx-markdown 20.0.1, from missing plugin scripts to unhighlighted code.
order: 3
tags: [ "help", "troubleshooting" ]
keywords: [ "NullInjectorError", "Prism", "not loaded", "highlight", "whitespace" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `NullInjectorError: No provider for InjectionToken SECURITY_CONTEXT` | `provideMarkdown()` was not called. | Add `provideMarkdown()` to the application providers. |
| `[ngx-markdown] HttpClient required for src attribute…` | `[src]` without an `HttpClient` provider. | Add `provideHttpClient()`. |
| Console: `Prism.js not loaded. Code highlighting will not be applied.` | No `Prism` global. | Add `prismjs/prism.js` to `scripts`, or ignore the warning if you don't want highlighting. |
| Code of one language stays plain | Its grammar is not loaded. | Add `prismjs/components/prism-<lang>.min.js`. |
| `[ngx-markdown] KaTeX files required…` | `katex` on without both KaTeX scripts. | Add `katex.min.js` **and** `contrib/auto-render.min.js`. |
| `[ngx-markdown] Mermaid files required…` | `mermaid` on without the Mermaid global. | Add `mermaid.min.js` to `scripts`. |
| `[ngx-markdown] Clipboard files required…` | `clipboard` on without clipboard.js. | Add `clipboard/dist/clipboard.min.js`. |
| `[ngx-markdown] Emoji-Toolkit files required…` | `emoji` on without joypixels. | Add `emoji-toolkit/lib/js/joypixels.min.js`. |
| A plugin error is not on `(error)` | In 20.x render failures are unhandled promise rejections; `error` only gets HTTP failures. | Check the console. |
| Pipe output is not highlighted in a zoneless app | The pipe waits for `NgZone.onStable`. | Use `<markdown>`, or keep `zone.js`. |
| Heading ids from `marked-gfm-heading-id` are missing | Extension renderer overrides are not applied in 20.x. | Override `renderer.heading`; see [Custom Renderer](../guides/custom-renderer.md). |
| Projected Markdown renders on one line | Angular strips template whitespace. | Add `ngPreserveWhitespaces` to the element. |
| `CLIPBOARD_OPTIONS` button not used by `<markdown>` | The component overrides the global keys in 20.x. | Set `[clipboardButtonComponent]` on the component. See [Copy to Clipboard](../features/clipboard.md). |
| Changing `[katex]` with `[src]` does nothing | Only `src` is tracked for `[src]` content. | Call `MarkdownService.reload()`. |
| `routerLinkOptions.paths` or `global` is ignored | Not forwarded to navigation in 20.x. | See [Link Handling](../features/link-handling.md). |
| Styled HTML loses `style` attributes | Angular's sanitizer removes them. | Use classes, or `disableSanitizer` for trusted content. |

Still stuck? Compare with the [live demo](https://fsegurai.github.io/ngx-markdown) or open an
[issue](https://github.com/fsegurai/ngx-markdown/issues).
