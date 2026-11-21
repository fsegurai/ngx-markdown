---
label: provideMarkdown and Tokens
description: provideMarkdown(), MarkdownModule, MarkdownModuleConfig and every injection token.
order: 4
tags: [ "api", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownModule", "MarkdownModuleConfig", "InjectionToken" ]
---

# provideMarkdown and Tokens

## provideMarkdown

```typescript
function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig): Provider[];
```

Returns `MarkdownService`, each provider from the config (`loader`, `clipboardOptions`, `markedOptions`,
`mermaidOptions`, `markedExtensions`), and `{ provide: SECURITY_CONTEXT, useValue: sanitize ?? SecurityContext.HTML }`.

## MarkdownModuleConfig

```typescript
interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: TypedProvider<typeof CLIPBOARD_OPTIONS>;
  markedOptions?: TypedProvider<typeof MARKED_OPTIONS>;
  markedExtensions?: MultiTypedProvider<typeof MARKED_EXTENSIONS>[];
  mermaidOptions?: TypedProvider<typeof MERMAID_OPTIONS>;
  sanitize?: SecurityContext;
}
```

A `TypedProvider<T>` is `{ provide: T, useValue }` or `{ provide: T, useFactory, deps? }` with the token's value type.
`MultiTypedProvider` adds `multi: true`.

## MarkdownModule

| Member | What it does |
|--------|--------------|
| `MarkdownModule` | Imports and exports `ClipboardButtonComponent`, `LanguagePipe`, `MarkdownComponent` and `MarkdownPipe`. |
| `MarkdownModule.forRoot(config?)` | The module plus `provideMarkdown(config)`. |
| `MarkdownModule.forChild()` | The module without providers. |

`MarkdownModule` is fully supported in 20.x. 21.0.0 deprecates it and 22.0.0 removes it.

## Injection tokens

| Token | Value type | Set by |
|-------|------------|--------|
| `MARKED_OPTIONS` | `MarkedOptions` | `markedOptions` |
| `MARKED_EXTENSIONS` | `MarkedExtension` (multi) | `markedExtensions` |
| `CLIPBOARD_OPTIONS` | `ClipboardOptions` | `clipboardOptions` |
| `MERMAID_OPTIONS` | `MermaidAPI.MermaidConfig` | `mermaidOptions` |
| `SECURITY_CONTEXT` | `SecurityContext` | `sanitize` (always provided) |
