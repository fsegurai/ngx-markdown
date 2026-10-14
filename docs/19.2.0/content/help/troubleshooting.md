---
label: Troubleshooting
description: Fixes for common problems with @fsegurai/ngx-markdown 19.2.0, from missing plugin scripts to unhighlighted code.
order: 3
tags: [ "help", "troubleshooting" ]
keywords: [ "NullInjectorError", "Prism", "not loaded", "highlight", "whitespace" ]
---

# Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `NullInjectorError: No provider for MarkdownService` | `provideMarkdown()` was not called. | Add `provideMarkdown()` (or `MarkdownModule.forRoot()`) to the application providers. |
| `[ngx-markdown] HttpClient required for src attribute…` | `[src]` without an `HttpClient` provider. | Add `provideHttpClient()`. |
| Code is not highlighted and nothing is logged | No `Prism` global; 19.x does not warn. | Add `prismjs/prism.js` to `scripts`. |
| Code of one language stays plain | Its grammar is not loaded. | Add `prismjs/components/prism-<lang>.min.js`. |
| `[ngx-markdown] KaTeX files required…` | `katex` on without both KaTeX scripts. | Add `katex.min.js` **and** `contrib/auto-render.min.js`. |
| `[ngx-markdown] Mermaid files required…` | `mermaid` on without the Mermaid global. | Add `mermaid.min.js` to `scripts`. |
| `[ngx-markdown] Clipboard files required…` | `clipboard` on without clipboard.js. | Add `clipboard/dist/clipboard.min.js`. |
| `[ngx-markdown] Emoji-Toolkit files required…` | `emoji` on without joypixels. | Add `emoji-toolkit/lib/js/joypixels.min.js`. |
| A plugin error is not on `(error)` | Render failures are unhandled promise rejections; `error` only gets HTTP failures. | Check the console. |
| `disableRouterLinkHandler` attribute has no effect | The input has no boolean coercion; the bare attribute is `''`. | Bind `[disableRouterLinkHandler]="true"`. |
| A click on `<code>` inside a link is not routed | Only clicks whose target is the `<a>` itself are intercepted. | Keep link text plain, or handle the click yourself. |
| Absolute links (`/docs`) open in a new tab | 19.x treats `/…` links as external. | Use `/routerLink:/docs`, or turn off `externalBrowserHandler`. |
| Heading ids from `marked-gfm-heading-id` are missing | Extension renderer overrides are not applied in 19.x. | Override `renderer.heading`; see [Custom Renderer](../guides/custom-renderer.md). |
| Projected Markdown renders on one line | Angular strips template whitespace. | Add `ngPreserveWhitespaces` to the element. |
| `CLIPBOARD_OPTIONS` button not used by `<markdown>` | The component overrides the global keys in 19.x. | Set `[clipboardButtonComponent]` on the component. See [Copy to Clipboard](../features/clipboard.md). |
| `[src]` file is fetched again on unrelated input changes | Every input change runs `ngOnChanges`, which reloads `src`. | Keep other inputs stable, or use `[data]` with your own fetch. |
| Styled HTML loses `style` attributes | Angular's sanitizer removes them. | Use classes, or `disableSanitizer` for trusted content. |

Still stuck? Compare with the [live demo](https://fsegurai.github.io/ngx-markdown) or open an
[issue](https://github.com/fsegurai/ngx-markdown/issues).
