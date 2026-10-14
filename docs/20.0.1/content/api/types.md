---
label: Types
description: Option interfaces, re-exported marked types, the MermaidAPI namespace and the PrismPlugin enum.
order: 5
tags: [ "api", "types" ]
keywords: [ "MarkdownRouterLinkOptions", "ClipboardOptions", "KatexOptions", "MermaidAPI", "PrismPlugin" ]
---

# Types

## MarkdownRouterLinkOptions

```typescript
interface MarkdownRouterLinkOptions {
  global?: NavigationExtras;
  paths?: Record<string, NavigationExtras | undefined>;
  internalBrowserHandler?: boolean; // Angular Router navigation
  internalDesktopHandler?: boolean; // scroll to the element id
  externalBrowserHandler?: boolean; // external links in a new tab
}
```

`global` and `paths` are declared but not applied in 20.x; see [Link Handling](../features/link-handling.md).

## ClipboardOptions

```typescript
interface ClipboardOptions {
  buttonComponent?: Type<unknown>;
  buttonTextCopy?: string;
  buttonTextCopied?: string;
  languageButton?: boolean;
}

interface ClipboardRenderOptions extends ClipboardOptions {
  buttonTemplate?: TemplateRef<unknown>;
}
```

## KatexOptions

`type KatexOptions = KatexSpecificOptions & RenderMathInElementSpecificOptions`.

| Part | Keys |
|------|------|
| `KatexSpecificOptions` (class) | `displayMode`, `throwOnError`, `errorColor`, `macros`, `colorIsTextColor`, `maxSize`, `maxExpand`, `allowedProtocols`, `strict` |
| `RenderMathInElementSpecificOptions` | `delimiters: RenderMathInElementSpecificOptionsDelimiters[]`, `ignoredTags`, `ignoredClasses` |
| `RenderMathInElementSpecificOptionsDelimiters` | `left`, `right`, `display` |

## MermaidAPI

A namespace of Mermaid 11 config types: `MermaidConfig`, one `…DiagramConfig` per diagram type (flowchart, sequence,
gantt, journey, timeline, class, state, ER, pie, quadrant, XY chart, requirement, architecture, mindmap, kanban, git
graph, C4, sankey, packet, block, ZenUML), `FontConfig` and `RunOptions`. The flowchart, class and state configs
still declare `defaultRenderer` (`'dagre-d3' | 'dagre-wrapper' | 'elk'`).

## Re-exported from marked

| Export | Is |
|--------|----|
| `MarkedOptions` | marked's `MarkedOptions` |
| `MarkedRenderer` | marked's `Renderer` class |
| `MarkedToken` | marked's `Tokens` namespace (`MarkedToken.Heading`, `MarkedToken.Code`, …) |

## PrismPlugin

```typescript
enum PrismPlugin {
  CommandLine = 'command-line',
  LineHighlight = 'line-highlight',
  LineNumbers = 'line-numbers',
}
```
