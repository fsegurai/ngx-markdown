---
label: provideMarkdown and Tokens
description: provideMarkdown(), the deprecated MarkdownModule, MarkdownModuleConfig and every injection token.
order: 4
tags: [ "api", "configuration" ]
keywords: [ "provideMarkdown", "MarkdownModule", "MarkdownModuleConfig", "InjectionToken" ]
---

# provideMarkdown and Tokens

## provideMarkdown

```typescript
function provideMarkdown(markdownModuleConfig?: MarkdownModuleConfig): Provider[];
```

Returns `MarkdownService`, each provider from the config, and `{ provide: SECURITY_CONTEXT, useValue: sanitize ??
SecurityContext.HTML }`.

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

## MarkdownModule (deprecated)

| Member | Replacement |
|--------|-------------|
| `MarkdownModule` (imports and exports `ClipboardButtonComponent`, `LanguagePipe`, `MarkdownComponent`, `MarkdownPipe`) | import the standalone pieces |
| `MarkdownModule.forRoot(config?)` | `provideMarkdown(config)` |
| `MarkdownModule.forChild()` | nothing |

All three are marked `@deprecated` and are removed in 22.0.0.

## Injection tokens

| Token | Value type | Set by |
|-------|------------|--------|
| `MARKED_OPTIONS` | `MarkedOptions` | `markedOptions` |
| `MARKED_EXTENSIONS` | `MarkedExtension` (multi) | `markedExtensions` |
| `CLIPBOARD_OPTIONS` | `ClipboardOptions` | `clipboardOptions` |
| `MERMAID_OPTIONS` | `MermaidAPI.MermaidConfig` | `mermaidOptions` |
| `SECURITY_CONTEXT` | `SecurityContext` | `sanitize` (always provided) |
