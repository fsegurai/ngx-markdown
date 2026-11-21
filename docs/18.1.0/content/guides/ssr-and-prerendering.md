---
label: SSR and Prerendering
description: What @fsegurai/ngx-markdown 18.1.0 does on the server, and the limits to plan for with SSR and prerendering.
order: 4
tags: [ "guides", "ssr" ]
keywords: [ "server-side rendering", "prerendering", "isPlatformBrowser", "PendingTasks" ]
---

# SSR and Prerendering

18.x has no dedicated server-rendering support. The service guards browser-only work with `isPlatformBrowser`, but
nothing tells Angular to wait for a Markdown render. The demo application is a client-side app.

## What runs where

| Step | Server | Browser |
|------|--------|---------|
| Parse with marked, sanitize | yes | yes |
| Emoji conversion | skipped (shortcodes stay) | yes |
| Prism highlighting | skipped | yes |
| Clipboard, KaTeX, Mermaid | skipped | yes |
| HTML entity decoding of projected content | skipped | yes |

## Limits

| Limit | Effect |
|-------|--------|
| No `PendingTasks` registration | SSR and prerendering can serialize the page before `data`, `src` or projected Markdown is rendered. |
| `[src]` needs `HttpClient` | Provide it with `provideHttpClient()`; on the server it must be able to reach the file URL. |
| `querySelectorAll(...).forEach` on the rendered element | Server DOMs whose `NodeList` has no `forEach` can fail the render. |

21.0.0 registers component and pipe renders with `PendingTasks` and iterates with `Array.from`. Upgrade if server
output must contain the rendered Markdown.
