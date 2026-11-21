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

`global` and `paths` are applied to Router navigation in 17.0.0; see [Link Handling](../features/link-handling.md).

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

A hand-written namespace of Mermaid config types.

| Export | Kind | Contents |
|--------|------|----------|
| `Config` | interface | `securityLevel`, `theme`, `themeVariables`, `themeCSS`, `maxTextSize`, `darkMode`, `fontFamily`, `logLevel`, `startOnLoad`, `arrowMarkerAbsolute`, `secure`, `deterministicIds`, `deterministicIDSeed`, `flowchart`, `sequence`, `gantt`, and `any`-typed keys for the other diagrams (`journey`, `class`, `git`, `state`, `pie`, `requirement`). `themeVariables` is typed `any`. |
| `SecurityLevel` | enum | `Strict = 'strict'`, `Loose = 'loose'`, `Antiscript = 'antiscript'`, `Sandbox = 'sandbox'` |
| `Theme` | enum | `Base`, `Forest`, `Dark`, `Default`, `Neutral` (lower-case string values) |
| `LogLevel` | enum | `Debug = 1`, `Info`, `Warn`, `Error`, `Fatal` |
| `FlowChartConfig`, `SequenceDiagramConfig`, `GanttConfig` | interfaces | Per-diagram settings for `flowchart`, `sequence` and `gantt`. |
| `RunOptions` | interface | `querySelector`, `nodes`, `postRenderCallback`, `suppressErrors` |

18.1.0 renames `journey` to `journeyUser` and `git` to `gitGraph` and adds a typed `ThemeVariables`; 19.0.0 replaces this namespace with `MermaidConfig` and generated per-diagram configs.

## Re-exported from marked

| Export | Is |
|--------|----|
| `MarkedOptions` | marked's `MarkedOptions` |
| `MarkedRenderer` | marked's `Renderer` class |

## PrismPlugin

```typescript
enum PrismPlugin {
  CommandLine = 'command-line',
  LineHighlight = 'line-highlight',
  LineNumbers = 'line-numbers',
}
```
