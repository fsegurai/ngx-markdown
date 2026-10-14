---
label: MarkdownComponent
description: Selectors, inputs, outputs and the public render() method of MarkdownComponent, plus the default ClipboardButtonComponent.
order: 1
tags: [ "api", "component" ]
keywords: [ "inputs", "outputs", "selectors", "ClipboardButtonComponent", "render" ]
---

# MarkdownComponent

Selectors: `ngx-markdown`, `markdown`, `[markdown]`. Standalone, default change detection. Most inputs are decorator
`@Input()`s; `routerLinkOptions` and `disableRouterLinkHandler` are signal `input()`s. A `@HostListener('click')`
drives [link handling](../features/link-handling.md). Implements `OnChanges`, `AfterViewInit` and `OnDestroy`.

## Content inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `data` | `string \| null \| undefined` | unset | Markdown to render. |
| `src` | `string \| null \| undefined` | unset | URL of a file to fetch and render. |
| `inline` | `boolean` | `false` | Inline parsing (no wrapping `<p>`). |
| `disableSanitizer` | `boolean` | `false` | Skip sanitizing for this content. |
| `routerLinkOptions` | `input<MarkdownRouterLinkOptions>()` | unset | Link click handlers. |
| `disableRouterLinkHandler` | `input<boolean \| undefined>(false)` | `false` | Turn link handling off. No boolean coercion. |

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

The toggles `inline`, `disableSanitizer`, `clipboard`, `emoji`, `katex`, `mermaid`, `lineHighlight`, `lineNumbers` and
`commandLine` are getter/setter inputs that coerce any value except `null`, `undefined` and `'false'` to `true`, so
`<markdown katex>` works. `clipboardLanguageButton` has no coercion: bind it as `[clipboardLanguageButton]="true"`.

## Outputs

| Output | Payload | Emitted when |
|--------|---------|--------------|
| `load` | `string` | `src` was fetched and rendered (payload: fetched text). `output()`. |
| `ready` | `void` | A render finished successfully. `@Output()` `EventEmitter`. |
| `error` | `string \| Error` | `src` failed to load. Render failures are not emitted. `output()`. |

## Methods

| Method | Description |
|--------|-------------|
| `render(markdown: string, decodeHtml = false): Promise<void>` | Parses `markdown`, writes it to the host element, applies the Prism plugin attributes, runs `MarkdownService.render()`, then emits `ready`. Public in 19.x; private since 20.0.0. |

## ClipboardButtonComponent

Selector `markdown-clipboard`. The default copy button: `<button class="markdown-clipboard-button">`, with the
`copied` class for 3 seconds after a click. `OnPush`, built on RxJS streams and `AsyncPipe`.

| Input | Default |
|-------|---------|
| `buttonTextCopy` | `'Copy'` |
| `buttonTextCopied` | `'Copied!'` |
