---
label: Mermaid Diagrams
description: Draw mermaid code blocks as diagrams with withMermaid(), loaded on demand or as a global script.
order: 9
tags: [ "features", "plugins", "diagrams" ]
keywords: [ "withMermaid", "Mermaid", "MermaidRenderError", "mermaidOptions", "lazy", "lazyMargin" ]
---

# Mermaid Diagrams

Install `mermaid@^12.1.0` and provide the feature. Loading on demand is recommended: only pages with a diagram download
Mermaid.

```typescript
provideMarkdown({
  plugins: [
    withMermaid({
      loader: () => import('mermaid').then((m) => m.default), // `() => import('mermaid')` works too
      config: { layout: 'dagre', look: 'classic', theme: 'default' }, // optional
      renderTimeout: 30000, // default; 0 or Infinity disables it
    }),
  ],
});
```

Without `loader`, the global `mermaid` from `node_modules/mermaid/dist/mermaid.min.js` is used.

```html
<markdown [src]="'flow.md'" mermaid [mermaidOptions]="{ theme: 'dark' }" />
```

## Options

| Option | Default | What it does |
|--------|---------|--------------|
| `config` | `{ startOnLoad: false, securityLevel: 'strict' }` merged under yours | `mermaid.initialize()` configuration. |
| `loader` | none | `MermaidLoader`: resolves to Mermaid (or its module). Called in the browser on the first render with a diagram. |
| `renderTimeout` | `30000` | Max ms per `mermaid.render()` (and the load). |
| `lazy` | `false` | Draw each diagram only when it comes near the viewport (see below). |
| `lazyMargin` | `'100% 0px'` | How far from the viewport `lazy` starts drawing (`rootMargin` and `scrollMargin`). |

`config` merges key by key across layers: `withMermaid()`, then the `[plugins]` record, then `[mermaidOptions]`.

## Rendering and errors

- Each ` ```mermaid ` block becomes a `<div class="mermaid">`, drawn one by one through a queue shared by every service.
- A failing diagram shows a `.mermaid-error` box (no inline styles) and the others still draw. The render then
  rejects with a `MermaidRenderError` whose `failures` list each `element` and `error`; `<markdown>` emits it on `error`.
- No `loader` and no global `mermaid` fails with `ERROR_MERMAID_NOT_LOADED`. Nothing is drawn on the server.

## Lazy diagrams (opt-in)

Each diagram is one long task for Mermaid, even far below the fold. With `lazy`, a diagram is drawn when it comes near
the viewport:

```typescript
provideMarkdown({ plugins: [withMermaid({ loader: () => import('mermaid'), lazy: true })] });
```

```html
<markdown [src]="'flow.md'" mermaid [plugins]="{ mermaid: { lazy: true } }" />
```

- `ready` emits once the diagrams near the viewport are drawn; the others draw as the reader scrolls and emit nothing
  (a later failure shows its error box and is logged). `whenStable()` does not wait for them.
- A waiting diagram keeps its source text, with the `mermaid-pending` class and `aria-busy="true"`; reserve space with
  `.mermaid.mermaid-pending { min-height: 240px; }` if you want to.
- A diagram already in the service's cache is drawn at once. With `loader`, Mermaid loads only when a diagram needs it.
- `beforeprint` draws every waiting diagram, but asynchronously: keep `lazy` off for content printed right away.
- Without `IntersectionObserver`, or on the server, nothing changes.

## Re-rendering with new options

A changed `[mermaidOptions]` value (compared by content) redraws only the diagrams: code, clipboard buttons, KaTeX and
scroll position are kept, and `ready` emits again. Outside the component, call
`MarkdownService.rerenderMermaid(element, { mermaidOptions })`. See
[Follow a Light/Dark Theme](../guides/mermaid-theme-switching.md).

## Mermaid 12 defaults

Mermaid 12 defaults to the ELK layout and, for most diagrams, the `neo` look. Pin
`{ layout: 'dagre', look: 'classic', theme: 'default' }` to keep the Mermaid 11 appearance.

## Security

The Angular sanitizer only sees the escaped diagram source, never Mermaid's SVG. With `securityLevel: 'loose'`, labels
may carry unsanitized HTML: use it with trusted content only. Combined with `disableSanitizer`, a warning is logged once.

## Build warnings

Mermaid pulls in CommonJS packages. Silence the Angular CLI warnings in `angular.json`:

```json
"allowedCommonJsDependencies": ["@braintree/sanitize-url", "cytoscape-cose-bilkent", "cytoscape-fcose", "dayjs", "elkjs"]
```
