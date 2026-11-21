---
label: Mermaid SVG Export
description: Add a button that downloads each rendered Mermaid diagram as an SVG file with withMermaidExport().
order: 10
tags: [ "features", "plugins", "diagrams" ]
keywords: [ "withMermaidExport", "SVG download", "MermaidExportButtonComponent" ]
---

# Mermaid SVG Export

Requires the Mermaid plugin; the export runs after it.

```typescript
provideMarkdown({ plugins: [withMermaid(), withMermaidExport({ filenamePrefix: 'chart' })] });
```

```html
<markdown
  [data]="markdown"
  mermaid
  mermaidExport
  (mermaidExported)="onExported($event)"
  (mermaidExportError)="onExportError($event)" />
```

A click downloads the SVG Mermaid returned as `<prefix>-<n>.svg` (`diagram-1.svg` by default). Error boxes get no
button, and neither do `securityLevel: 'sandbox'` diagrams (rendered in an `<iframe>`).

| Option (`withMermaidExport`) | Input | Default |
|------------------------------|-------|---------|
| `buttonComponent` | `mermaidExportButtonComponent` | `MermaidExportButtonComponent` |
| - | `mermaidExportButtonTemplate` | none |
| `filenamePrefix` | `mermaidExportFilenamePrefix` | `diagram` |
| `buttonLabel` | - | `Download <filename> (SVG)` |

- The default button is `<button class="markdown-mermaid-export-button">SVG</button>` inside a
  `.markdown-mermaid-toolbar`. Neither has inline styles.
- `buttonLabel: (index, filename) => string` translates the accessible name (and tooltip) of the default button, from
  the position of the diagram (from 0) and its file name. ` (SVG)` is appended to a label without "SVG", so the
  visible text stays part of the name (WCAG 2.5.3).
- A custom component receives the `svg` and `filename` inputs it declares (`MermaidExportButtonInputs`).
- `mermaidExported` emits `{ element, svg, filename }`; `mermaidExportError` emits `{ error, element, filename }` with
  `ERROR_MERMAID_EXPORT_FAILED` and the original error as `cause`.
- With the pipe or service, pass `mermaidExportOptions: { onExported, onExportError }` and a `ViewContainerRef`
  (`ERROR_MERMAID_EXPORT_VIEW_CONTAINER_REQUIRED` otherwise).
