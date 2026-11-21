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

Returns `MarkdownService`, each provider from the config (`loader`, `clipboardOptions`, `markedOptions`), `{ provide: MARKED_EXTENSIONS, useValue: markedExtensions ?? [] }`, and `{ provide: SECURITY_CONTEXT, useValue: sanitize ?? SecurityContext.HTML }`.

## MarkdownModuleConfig

```typescript
interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: Provider;
  markedOptions?: Provider;
  markedExtensions?: MarkedExtension[];
  sanitize?: SecurityContext;
}
```

`clipboardOptions` and `markedOptions` accept any Angular `Provider`; nothing checks that they provide
`CLIPBOARD_OPTIONS` or `MARKED_OPTIONS`. 19.0.0 types them per token. `markedExtensions` is not a provider in
17.0.0, and there is no `mermaidOptions` key.

## MarkdownModule

| Member | What it does |
|--------|--------------|
| `MarkdownModule` | Imports `CommonModule` and exports `ClipboardButtonComponent`, `LanguagePipe`, `MarkdownComponent` and `MarkdownPipe`. |
| `MarkdownModule.forRoot(config?)` | The module plus `provideMarkdown(config)`. |
| `MarkdownModule.forChild()` | The module without providers. |

`MarkdownModule` is fully supported in 17.0.0. 21.0.0 deprecates it and 22.0.0 removes it.

## Injection tokens

| Token | Value type | Set by |
|-------|------------|--------|
| `MARKED_OPTIONS` | `MarkedOptions` | `markedOptions` |
| `MARKED_EXTENSIONS` | `MarkedExtension[]` (single value, always provided) | `markedExtensions` |
| `CLIPBOARD_OPTIONS` | `ClipboardOptions` | `clipboardOptions` |
| `SECURITY_CONTEXT` | `SecurityContext` | `sanitize` (always provided) |
