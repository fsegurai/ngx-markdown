---
label: MarkdownService
description: Methods, properties and option types of MarkdownService in @fsegurai/ngx-markdown 20.0.1.
order: 3
tags: [ "api", "service" ]
keywords: [ "parse", "render", "highlight", "getSource", "reload", "ParseOptions", "RenderOptions" ]
---

# MarkdownService

`@Injectable({ providedIn: 'root' })`. Requires `SECURITY_CONTEXT` (from `provideMarkdown()`). `HttpClient` is
injected optionally and needed only for `getSource()`.

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `parse(markdown, parseOptions?)` | `string \| Promise<string>` | Trim common indentation, optionally decode HTML and convert emoji, run marked, sanitize. |
| `parseInline(markdown, options?: MarkedOptions \| null)` | `string \| Promise<string>` | `marked.parseInline`. Not sanitized. |
| `render(element, options?, viewContainerRef?)` | `void` | KaTeX, then Mermaid, then clipboard (each if enabled), then Prism highlight. Browser only. |
| `highlight(element?)` | `void` | `Prism.highlightAllUnder(element ?? document)`; adds `language-none` to code without a language. |
| `getSource(src)` | `Observable<string>` | `HttpClient.get(src, { responseType: 'text' })`; a non-`md` extension wraps the text in a fenced block. Throws `ERROR_SRC_WITHOUT_HTTP_CLIENT` without `HttpClient`. |
| `reload()` | `void` | Emits on `reload$`. |

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `options` | `MarkedOptions` (get / set) | Current marked options; the setter merges over `{ renderer: new MarkedRenderer() }`. |
| `renderer` | `MarkedRenderer` (get / set) | The renderer in `options`. |
| `reload$` | `Observable<void>` | Components with `data` or `src` render again on each emission. |

## ParseOptions

| Key | Type | Default |
|-----|------|---------|
| `decodeHtml` | `boolean` | `false` |
| `inline` | `boolean` | `false` |
| `emoji` | `boolean` | `false` |
| `mermaid` | `boolean` | `false` |
| `markedOptions` | `MarkedOptions` | unset |
| `disableSanitizer` | `boolean` | `false` |

## RenderOptions

| Key | Type | Default |
|-----|------|---------|
| `clipboard` | `boolean` | `false` |
| `clipboardOptions` | `ClipboardRenderOptions` | unset |
| `katex` | `boolean` | `false` |
| `katexOptions` | `KatexOptions` | unset (built-in delimiters) |
| `mermaid` | `boolean` | `false` |
| `mermaidOptions` | `MermaidAPI.MermaidConfig` | unset |

## ExtendedRenderer

`class ExtendedRenderer extends Renderer` with two internal flags (`ɵNgxMarkdownRendererExtendedForExtensions`,
`ɵNgxMarkdownRendererExtendedForMermaid`) that stop a renderer from being extended twice. Not meant for app code.
