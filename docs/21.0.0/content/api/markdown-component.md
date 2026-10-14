---
label: MarkdownComponent
description: Selectors, inputs and outputs of the standalone MarkdownComponent and the default ClipboardButtonComponent.
order: 1
tags: [ "api", "component" ]
keywords: [ "inputs", "outputs", "selectors", "ClipboardButtonComponent" ]
---

# MarkdownComponent

Selectors: `ngx-markdown`, `markdown`, `[markdown]`. Standalone, `ChangeDetectionStrategy.OnPush`, all inputs are
signals. A host `(click)` listener drives [link handling](../features/link-handling.md).

## Content inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `model<string \| null>` | unset | Markdown to render. |
| `src` | `model<string \| null>` | unset | URL of a file to fetch and render. |
| `inline` | `boolean` | `false` | Inline parsing (no wrapping `<p>`). |
| `disableSanitizer` | `boolean` | `false` | Skip sanitizing for this content. |
| `routerLinkOptions` | `MarkdownRouterLinkOptions` | unset | Link click handlers. |
| `disableRouterLinkHandler` | `boolean` | `false` | Turn link handling off. |

## Plugin inputs

| Plugin | Inputs |
|--------|--------|
| Clipboard | `clipboard: boolean`, `clipboardButtonComponent: Type<unknown>`, `clipboardButtonTemplate: TemplateRef<unknown>`, `clipboardButtonTextCopy: string`, `clipboardButtonTextCopied: string`, `clipboardLanguageButton: boolean` |
| Emoji | `emoji: boolean` |
| KaTeX | `katex: boolean`, `katexOptions: KatexOptions` |
| Mermaid | `mermaid: boolean`, `mermaidOptions: MermaidAPI.MermaidConfig` |
| Prism line numbers | `lineNumbers: boolean`, `start: number` |
| Prism line highlight | `lineHighlight: boolean`, `line: string \| string[]`, `lineOffset: number` |
| Prism command line | `commandLine: boolean`, `filterOutput`, `host`, `prompt`, `output`, `user` (all `string`) |

`boolean` inputs default to `false` and use `booleanAttribute`, so `<markdown katex>` works.

## Outputs

| Output | Payload | Emitted when |
|--------|---------|--------------|
| `load` | `string` | `src` was fetched and rendered (payload: fetched text). |
| `ready` | `void` | A render finished successfully. |
| `error` | `string \| Error` | `src` failed to load or its render failed. `data` and projected-content render failures go to the `ErrorHandler` in 21.0.0. |

## ClipboardButtonComponent

Selector `markdown-clipboard`. The default copy button: `<button class="markdown-clipboard-button">`, with the
`copied` class for 3 seconds after a click.

| Model | Default |
|-------|---------|
| `buttonTextCopy` | `'Copy'` |
| `buttonTextCopied` | `'Copied!'` |
