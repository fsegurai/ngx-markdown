---
label: MarkdownService
description: Methods and properties of MarkdownService, and the ParseOptions and RenderOptions types.
order: 4
tags: [ "api", "service" ]
keywords: [ "parse", "render", "rerenderMermaid", "ParseOptions", "RenderOptions" ]
---

# MarkdownService

`@Injectable({ providedIn: 'root' })`.

## Methods

| Member | Signature | Description |
|--------|-----------|-------------|
| `parse` | `(markdown: string, parseOptions?: ParseOptions): string \| Promise<string>` | Parses (and sanitizes) Markdown to HTML. |
| `parseInline` | `(markdown: string, options?: MarkedOptions \| null): string \| Promise<string>` | Parses inline Markdown. |
| `render` | `(element: HTMLElement, options?: RenderOptions, viewContainerRef?: ViewContainerRef): Promise<void>` | Runs the `render` hooks of the enabled plugins. Never throws; rejects with the first error in plugin order. |
| `cleanup` | `(element: HTMLElement): void` | Undoes the last `render` of the element. |
| `rerenderMermaid` | `(element: HTMLElement, options?: Pick<RenderOptions, 'mermaidOptions' \| 'disableSanitizer' \| 'mermaidExport' \| 'mermaidExportOptions' \| 'plugins'>, viewContainerRef?: ViewContainerRef): Promise<void>` | Redraws the diagrams only. Throws `ERROR_MERMAID_NOT_PROVIDED` without `withMermaid()`. |
| `reload` | `(): void` | Drops cached `src` texts and re-renders every `<markdown>` of the service. |
| `getSource` | `(src: string): Observable<string>` | Fetches `src` as text; non-`.md`/`.markdown` files are fenced as code. |
| `highlight` | `(element?: Element \| Document): void` | Highlights with the global `Prism` at once (browser only). |
| `reload$` | `Observable<void>` | Emits on `reload()`. |
| `options` | `MarkedOptions` (get/set) | The Marked options; setting merges over a default renderer. |
| `renderer` | `MarkedRenderer` (get/set) | The configured renderer. |

## ParseOptions

| Option | Type | Description |
|--------|------|-------------|
| `decodeHtml` | `boolean` | Decode HTML entities first (used for projected content). |
| `inline` | `boolean` | Inline parsing. |
| `emoji` | `boolean` | Enable/disable `withEmoji()`. |
| `mermaid` | `boolean` | Turn `mermaid` blocks into `<div class="mermaid">`. |
| `katex` | `boolean` | Enable/disable `withKatex()`. |
| `katexOptions` | `KatexOptions` | Merged over `withKatex()` options. |
| `markedOptions` | `MarkedOptions` | Marked options for this parse. |
| `disableSanitizer` | `boolean` | Skip sanitizing. |
| `baseUrl` | `string` | Resolve relative URLs against it. |
| `frontMatter` | `boolean` | Strip front-matter. |
| `onFrontMatter` | `(frontMatter: MarkdownFrontMatter) => void` | Receives it, before Marked runs. |
| `headingIds` | `boolean` | Slug ids for headings without one. |
| `onHeadings` | `(headings: MarkdownHeading[]) => void` | Receives the headings (no `element`). |
| `plugins` | `MarkdownPluginToggles` | Per-parse plugin toggles; the specific options win. |

## RenderOptions

| Option | Type | Description |
|--------|------|-------------|
| `clipboard` | `boolean` | Enable/disable `withClipboard()`. |
| `clipboardOptions` | `ClipboardRenderOptions` | Merged over `withClipboard()` options; adds `buttonTemplate`, `onCopied`, `onCopyError`. |
| `mermaid` | `boolean` | Draw the `.mermaid` elements. |
| `mermaidOptions` | `MermaidAPI.MermaidConfig` | Merged key by key over `withMermaid()` `config`. |
| `mermaidExport` | `boolean` | Enable/disable `withMermaidExport()`. |
| `mermaidExportOptions` | `MermaidExportRenderOptions` | Adds `buttonTemplate`, `onExported`, `onExportError`. |
| `lightbox` | `boolean` | Enable/disable `withLightbox()`. |
| `lightboxOptions` | `LightboxRenderOptions` | Adds `onImageClick`. |
| `prismOptions` | `PrismOptions` | Merged over `withPrism()` options. |
| `markedExtendedOptions` | `MarkedExtendedRenderOptions` | Adds `onEvent`. |
| `disableSanitizer` | `boolean` | Lets the render warn about Mermaid `securityLevel: 'loose'`. |
| `signal` | `AbortSignal` | Stops the asynchronous work of the render. |
| `plugins` | `MarkdownPluginToggles` | Per-render plugin toggles. |

`ExtendedRenderer` is exported but **deprecated** and unused (removed in v23).
