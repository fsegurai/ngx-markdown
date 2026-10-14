---
label: provideMarkdown and Tokens
description: provideMarkdown(), MarkdownModule, MarkdownModuleConfig, the marked extension helpers and every injection token.
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
`mermaidOptions`), the providers built by `getMarkedExtensionProvider(markedExtensions)`, and `{ provide: SECURITY_CONTEXT, useValue: sanitize ?? SecurityContext.HTML }`.

## MarkdownModuleConfig

```typescript
interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: TypedProvider<typeof CLIPBOARD_OPTIONS>;
  markedOptions?: TypedProvider<typeof MARKED_OPTIONS>;
  markedExtensions?: (MarkedExtension | MultiTypedProvider<typeof MARKED_EXTENSIONS>)[];
  mermaidOptions?: TypedProvider<typeof MERMAID_OPTIONS>;
  sanitize?: SecurityContext;
}
```

A `TypedProvider<T>` is `{ provide: T, useValue }` or `{ provide: T, useFactory, deps? }` with the token's value type.
`MultiTypedProvider` adds `multi: true`.

## Marked extension helpers

New in 19.2.0, exported from the module file:

```typescript
function isTypedProvider<T extends InjectionToken<any>>(provider: any): provider is TypedProvider<T>;
function getMarkedExtensionProvider(markedExtensions: MarkdownModuleConfig['markedExtensions']): Provider[] | undefined;
```

`isTypedProvider` checks for a non-null `provide` key. `getMarkedExtensionProvider` maps each entry to a
`multi: true` provider: providers are copied with `multi: true`, plain extensions become
`{ provide: MARKED_EXTENSIONS, useValue: extension, multi: true }`. Both helpers are removed in 20.0.0.

## MarkdownModule

| Member | What it does |
|--------|--------------|
| `MarkdownModule` | Imports `CommonModule` and exports `ClipboardButtonComponent`, `LanguagePipe`, `MarkdownComponent` and `MarkdownPipe`. |
| `MarkdownModule.forRoot(config?)` | The module plus `provideMarkdown(config)`. |
| `MarkdownModule.forChild()` | The module without providers. |

`MarkdownModule` is fully supported in 19.x. 21.0.0 deprecates it and 22.0.0 removes it.

## Injection tokens

| Token | Value type | Set by |
|-------|------------|--------|
| `MARKED_OPTIONS` | `MarkedOptions` | `markedOptions` |
| `MARKED_EXTENSIONS` | `MarkedExtension` (multi) | `markedExtensions` |
| `CLIPBOARD_OPTIONS` | `ClipboardOptions` | `clipboardOptions` |
| `MERMAID_OPTIONS` | `MermaidAPI.MermaidConfig` | `mermaidOptions` |
| `SECURITY_CONTEXT` | `SecurityContext` | `sanitize` (always provided) |
