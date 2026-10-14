---
label: Plugin Features
description: The withX() plugin feature functions, their option types, and the exported plugin objects and names.
order: 5
tags: [ "api", "plugins" ]
keywords: [ "withPrism", "withClipboard", "withKatex", "withMermaid", "withLightbox", "withMarkedExtended" ]
---

# Plugin Features

Each function returns a `MarkdownPluginFeature` for `provideMarkdown({ plugins })`.

| Function | Plugin object | Name | Default on |
|----------|---------------|------|------------|
| `withPrism(options?: PrismOptions)` | `prismPlugin` | `prism` | Yes |
| `withClipboard(options?: ClipboardOptions)` | `clipboardPlugin` | `clipboard` | No |
| `withEmoji()` | `emojiPlugin` | `emoji` | No |
| `withKatex(options?: KatexOptions)` | `katexPlugin` | `katex` | No |
| `withMermaid(options?: MermaidPluginOptions)` | `mermaidPlugin` | `mermaid` (`MERMAID_PLUGIN_NAME`) | No |
| `withMermaidExport(options?: MermaidExportOptions)` | `mermaidExportPlugin` | `mermaidExport` (`MERMAID_EXPORT_PLUGIN_NAME`) | No |
| `withLightbox(options?: LightboxOptions)` | `lightboxPlugin` | `lightbox` | No |
| `withMarkedExtended(features, options?: MarkedExtendedOptions)` | `createMarkedExtendedPlugin(features)` | `markedExtended` (`MARKED_EXTENDED_PLUGIN_NAME`) | Yes |

## PrismOptions

`lineNumbers?: boolean`, `start?: number`, `lineHighlight?: boolean`, `line?: string | string[]`,
`lineOffset?: number`, `commandLine?: boolean`, `filterOutput?: string`, `host?: string`, `prompt?: string`,
`output?: string`, `user?: string`.

## ClipboardOptions

| Field | Type | Default |
|-------|------|---------|
| `buttonComponent` | `Type<unknown>` | `ClipboardButtonComponent` |
| `buttonTextCopy` | `string` | `Copy` |
| `buttonTextCopied` | `string` | `Copied!` |
| `languageButton` | `boolean` | `false` |
| `skipRemovedLines` | `boolean` | `true` |
| `statusTextCopied` | `string` | `Copied to clipboard` |
| `statusTextCopyFailed` | `string` | `Copy failed` |

`ClipboardButtonComponent` (`markdown-clipboard`) is the default button, with `buttonTextCopy` and `buttonTextCopied`
model inputs.

## KatexOptions

The [KaTeX options](https://katex.org/docs/options) (`displayMode`, `output`, `throwOnError`, `errorColor`, `macros`,
`colorIsTextColor`, `maxSize`, `maxExpand`, `allowedProtocols`, `strict`, `trust`) plus `nonStandard?: boolean`.
`KatexSpecificOptions` holds the KaTeX part; `KatexTrustContext` types a `trust` function argument.

## MermaidPluginOptions

| Field | Type | Default |
|-------|------|---------|
| `config` | `MermaidAPI.MermaidConfig` | `{ startOnLoad: false, securityLevel: 'strict' }` under yours |
| `loader` | `MermaidLoader` | none (global `mermaid`) |
| `renderTimeout` | `number` (ms) | `30000`; `0` or `Infinity` disables |
| `lazy` | `boolean` | `false`; `true` draws each diagram when it comes near the viewport |
| `lazyMargin` | `string` | `'100% 0px'`: the observer's `rootMargin` and `scrollMargin` |

## MermaidExportOptions

`buttonComponent?: Type<unknown>` (default `MermaidExportButtonComponent`, selector `markdown-mermaid-export`, input
`filename`, `label`), `filenamePrefix?: string` (default `diagram`), `buttonLabel?: (index: number, filename: string) =>
string` (default `Download <filename> (SVG)`).

## LightboxOptions

`wrap?: boolean`, `dialogLabel?`, `closeLabel?`, `previousLabel?`, `nextLabel?` (strings), `openLabel?: string |
((index: number, total: number) => string)` (the `aria-label` of a trigger without a name of its own). Defaults are exported as
`DEFAULT_LIGHTBOX_OPTIONS`. The viewer is `MarkdownLightboxComponent` (`markdown-lightbox`).

## Marked Extended types

| Type | Shape |
|------|-------|
| `MarkedExtendedFeature` | `{ name?, extension?, attach?, options?, afterHighlight? }` |
| `MarkedExtendedAttach` | `(root: HTMLElement, options?) => MarkedExtendedHandle \| (() => void)`, with optional `refresh` and `runtimeName` |
| `MarkedExtendedHandle` | `{ dispose(): void; refresh?(): void }` |
| `MarkedExtendedOptions` | `{ runtimes?: Record<string, unknown>; events?: readonly string[] }` |
| `MarkedExtendedRenderOptions` | `MarkedExtendedOptions` + `onEvent?` |
| `MARKED_EXTENDED_EVENTS` | `readonly string[]` of the forwarded `marked-extended:*` event names |
