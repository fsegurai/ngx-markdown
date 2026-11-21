---
label: SSR and Prerendering
description: Render Markdown with server-side rendering, static prerendering and client hydration in @fsegurai/ngx-markdown 21.0.1.
order: 5
tags: [ "guides", "ssr" ]
keywords: [ "server-side rendering", "prerendering", "hydration", "PendingTasks", "withFetch" ]
---

# SSR and Prerendering

The library works with server-side rendering, static prerendering (`outputMode: "static"`) and
`provideClientHydration()`. The demo application is prerendered with hydration on.

## Setup

```typescript
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideMarkdown(),
  ],
};
```

Use `withFetch()` when you use `[src]`: the Angular build serves the app's own assets to the prerenderer through
`fetch`, so the XHR backend cannot load them.

## What runs where

| Step | Server | Browser |
|------|--------|---------|
| Parse with marked, sanitize | yes | yes |
| Emoji conversion | skipped (shortcodes stay) | yes |
| Prism highlighting | skipped | yes |
| Clipboard, KaTeX, Mermaid | skipped | yes |
| HTML entity decoding of projected content | skipped | yes |

## Stability

`MarkdownComponent` (`data`, `src` and projected-content renders) and `MarkdownPipe` (its async parse) register
`PendingTasks`. SSR, prerendering and `ApplicationRef.whenStable()` therefore wait until the Markdown is in the DOM.

Since 21.0.0 the component also iterates `querySelectorAll` results with `Array.from`, because server DOMs may return
a `NodeList` without `forEach`.
