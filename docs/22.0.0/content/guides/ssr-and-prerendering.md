---
label: SSR and Prerendering
description: Use @fsegurai/ngx-markdown with server-side rendering, static prerendering and client hydration.
order: 6
tags: [ "guides", "ssr" ]
keywords: [ "server-side rendering", "prerender", "hydration", "PendingTasks" ]
---

# SSR and Prerendering

The library is SSR-safe: server rendering, static prerendering (`outputMode: "static"`) and `provideClientHydration()`
work without extra setup: `<markdown>` hydrates with `[data]`, `[src]` and transcluded content alike, with no
`ngSkipHydration`.

| Work | Server | Browser |
|------|--------|---------|
| Parse, sanitize, front-matter, base URLs, headings | Yes | Yes |
| Prism `pre` attributes | Yes | Yes |
| Prism highlighting, clipboard, Mermaid, lightbox, emoji, marked-extended runtimes | No | Yes |
| KaTeX | Only when `katex` is a global on the server | Yes |

- `<markdown>` and the `markdown` pipe register `PendingTasks`, so the server waits for the rendered Markdown before
  serializing the page.
- With `[src]` during SSR or prerendering, keep `HttpClient` on its default Fetch backend. The build serves the app's
  own assets to the prerenderer through `fetch`, so the XHR backend (`withXhr()`) cannot load them.
- Transcluded content (`<markdown># Title</markdown>`): the server replaces the projected text with the rendered HTML,
  so it keeps the Markdown source in a `data-markdown-transclusion` attribute of the host (the source is in the page
  twice). The hydrated client renders that source and removes the attribute, instead of parsing the rendered HTML
  again as Markdown. The HTML entities of the source are decoded on the server as in the browser.
- To render math on the server, expose KaTeX there:

```typescript
// server.ts
import katex from 'katex';

(globalThis as { katex?: unknown }).katex = katex;
```
