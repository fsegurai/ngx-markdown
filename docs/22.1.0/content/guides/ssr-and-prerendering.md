---
label: SSR and Prerendering
description: Use @fsegurai/ngx-markdown with server-side rendering, static prerendering and client hydration.
order: 7
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
| `withKatex({ loader })`, `withEmoji({ loader })`, `withPrism({ loader })`, `withDomPurify()` loads | No (nothing is loaded) | Yes |

- `<markdown>` and the `markdown` pipe register `PendingTasks`, so the server waits for the rendered Markdown before
  serializing the page.
- With `[src]` on the server (22.1.0), the default loader uses `fetch`: a relative `src` resolves against the request
  URL and the base href, and the text is handed to the browser through `TransferState`, so hydration does not fetch it
  again. Without a request URL (e.g. prerendering without one), use an absolute URL or
  `provideMarkdown({ loader: HttpClient })`; with `HttpClient`, keep it on its default Fetch backend (the build serves
  the app's own assets to the prerenderer through `fetch`, so the XHR backend, `withXhr()`, cannot load them).
- HTTP interceptors do not run for `src` with the default loader; opt in with `loader: HttpClient` (see
  [Migrating from 22.0 to 22.1](migrating-from-22-0.md)).
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
