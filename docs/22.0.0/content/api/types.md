---
label: Types
description: Exported event payloads, front-matter, heading, Marked and Mermaid types of @fsegurai/ngx-markdown.
order: 7
tags: [ "api", "types" ]
keywords: [ "MarkdownCopyEvent", "MarkdownFrontMatter", "MarkdownHeading", "MermaidAPI", "MarkedToken" ]
---

# Types

## Event payloads

| Type | Fields |
|------|--------|
| `MarkdownError` | `Error \| HttpErrorResponse \| string` |
| `MarkdownCopyEvent` | `text`, `language?`, `title?`, `element: HTMLPreElement` |
| `MarkdownCopyErrorEvent` | `error: Error`, `language?`, `title?`, `element: HTMLPreElement` |
| `MarkdownMermaidExportEvent` | `element: HTMLElement`, `svg`, `filename` |
| `MarkdownMermaidExportErrorEvent` | `error: Error`, `element: HTMLElement`, `filename` |
| `MarkdownImageClickEvent` | `image`, `index`, `images`, `preventDefault()`, `defaultPrevented` |
| `MarkdownExtendedEvent` | `type`, `detail: unknown`, `event: CustomEvent` |

Button inputs: `ClipboardButtonInputs` (`language?`, `code`, `title?`, `buttonTextCopy?`, `buttonTextCopied?`) and
`MermaidExportButtonInputs` (`svg`, `filename`).

## Front-matter

```typescript
type MarkdownFrontMatterScalar = string | number | boolean | null;
type MarkdownFrontMatterValue = MarkdownFrontMatterScalar | MarkdownFrontMatterScalar[];
type MarkdownFrontMatterData = Record<string, MarkdownFrontMatterValue>;

interface MarkdownFrontMatter { data: MarkdownFrontMatterData; raw: string }
interface MarkdownFrontMatterExtraction { frontMatter: MarkdownFrontMatter | null; content: string }

function extractFrontMatter(markdown: string): MarkdownFrontMatterExtraction;
```

`FrontMatterPluginOptions` (`onFrontMatter?`) and `BaseUrlPluginOptions` (`url?`) type the core plugins.

## Headings

```typescript
interface MarkdownHeading {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  id: string;
  element?: HTMLElement;
}
```

## Marked

| Export | Is |
|--------|----|
| `MarkedOptions` | Marked's `MarkedOptions` |
| `MarkedRenderer` | Marked's `Renderer` class |
| `MarkedToken` | Marked's `Tokens` namespace |

## Mermaid

| Export | Is |
|--------|----|
| `MermaidAPI` | Namespace of Mermaid 12.1 config types (`MermaidAPI.MermaidConfig`…), copied so `mermaid` is never imported. |
| `MermaidLoader` | `() => Promise<MermaidLike \| { default: MermaidLike }>` |
| `MermaidLike` | The part of the Mermaid API used: `initialize`, `render`, optional `parse`, `run`. |
| `MermaidRunOptions` | Options of `mermaid.run()` (`MermaidAPI.RunOptions` is a deprecated alias). |
| `MermaidRenderResult`, `MermaidParseResult` | Results of `render()` and `parse()`. |
| `MermaidRenderFailure` | `{ element: HTMLElement; error: unknown }` |
