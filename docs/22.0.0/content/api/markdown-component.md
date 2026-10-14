---
label: MarkdownComponent
description: Selectors, inputs and outputs of the standalone MarkdownComponent.
order: 2
tags: [ "api", "component" ]
keywords: [ "inputs", "outputs", "MarkdownError", "MarkdownRouterLinkOptions" ]
---

# MarkdownComponent

Selectors: `ngx-markdown`, `markdown`, `[markdown]`. Standalone, `ChangeDetectionStrategy.OnPush`.

## Content inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `model<string \| null>` | unset | Markdown to render. |
| `src` | `model<string \| null>` | unset | URL of a file to fetch and render. |
| `inline` | `boolean` | `false` | Inline parsing (no wrapping `<p>`). |
| `disableSanitizer` | `boolean` | `false` | Skip sanitizing for this content. |
| `plugins` | `MarkdownPluginToggles` | unset | Enable, disable or configure plugins by name. |
| `frontMatter` | `boolean` | unset | Strip front-matter and emit `metadata`. |
| `headingIds` | `boolean` | `false` | Give headings without an `id` a slug. |
| `contentVisibility` | `boolean` | unset (`provideMarkdown({ contentVisibility })`, else `false`) | Off-screen top-level blocks (headings excepted) skip their style, layout and paint (`content-visibility: auto`). Applies at once, without re-rendering. |
| `baseUrl` | `string` | unset | Base URL for relative links and images. |
| `srcRelativeLink` | `boolean` | `false` | Resolve relative URLs against `src`. |
| `routerLinkOptions` | `MarkdownRouterLinkOptions` | unset | Link click handlers. |
| `disableRouterLinkHandler` | `boolean` | `false` | Turn link handling off. |

## Plugin inputs

Plugin toggles are unset by default, so the `plugins` record decides; `false` disables even when the record enables.

| Plugin | Inputs |
|--------|--------|
| Prism | `lineNumbers`, `start: number`, `lineHighlight`, `line: string \| string[]`, `lineOffset: number`, `commandLine`, `filterOutput`, `host`, `prompt`, `output`, `user` (strings) |
| Clipboard | `clipboard`, `clipboardButtonComponent: Type<unknown>`, `clipboardButtonTemplate: TemplateRef<unknown>`, `clipboardButtonTextCopy`, `clipboardButtonTextCopied`, `clipboardLanguageButton: boolean` |
| Emoji | `emoji` |
| KaTeX | `katex`, `katexOptions: KatexOptions` |
| Mermaid | `mermaid`, `mermaidOptions: MermaidAPI.MermaidConfig` (tracked: a change redraws the diagrams) |
| Mermaid export | `mermaidExport`, `mermaidExportButtonComponent`, `mermaidExportButtonTemplate`, `mermaidExportFilenamePrefix` |
| Lightbox | `lightbox`, `lightboxOptions: LightboxOptions` |

Boolean inputs accept attribute syntax (`<markdown katex>`).

## Outputs

| Output | Payload |
|--------|---------|
| `load` | `string` (the fetched `src` text) |
| `ready` | `void` |
| `error` | `MarkdownError` = `Error \| HttpErrorResponse \| string` |
| `metadata` | `MarkdownFrontMatter` |
| `headings` | `MarkdownHeading[]` |
| `copied` | `MarkdownCopyEvent` |
| `copyError` | `MarkdownCopyErrorEvent` |
| `mermaidExported` | `MarkdownMermaidExportEvent` |
| `mermaidExportError` | `MarkdownMermaidExportErrorEvent` |
| `imageClick` | `MarkdownImageClickEvent` |
| `extendedEvent` | `MarkdownExtendedEvent` |

## MarkdownRouterLinkOptions

```typescript
interface MarkdownRouterLinkOptions {
  global?: NavigationExtras;
  paths?: Record<string, NavigationExtras | undefined>;
  internalBrowserHandler?: boolean; // Angular Router navigation
  internalDesktopHandler?: boolean; // scroll to the fragment
  externalBrowserHandler?: boolean; // external links in a new tab
}
```
