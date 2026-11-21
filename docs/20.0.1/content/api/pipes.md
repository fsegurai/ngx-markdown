---
label: Pipes
description: Signatures of the markdown and language pipes and the MarkdownPipeOptions type.
order: 2
tags: [ "api", "pipe" ]
keywords: [ "MarkdownPipe", "LanguagePipe", "MarkdownPipeOptions", "transform" ]
---

# Pipes

Both pipes are standalone.

## MarkdownPipe (`markdown`)

```typescript
type MarkdownPipeOptions = ParseOptions & RenderOptions;

transform(value: string | null | undefined, options?: MarkdownPipeOptions): Promise<SafeHtml>;
```

| Input | Result |
|-------|--------|
| `null` / `undefined` | `''` |
| non-string | logged with `console.error`, value returned as is |
| string | parsed, sanitized per [Sanitization](../features/sanitization.md), then marked trusted |

After parsing, it calls `MarkdownService.render(hostElement, options, viewContainerRef)` on the first
`NgZone.onStable` emission. Zoneless apps never get that emission, so the render step does not run there.

See [ParseOptions and RenderOptions](markdown-service.md#parseoptions) for the option keys.

## LanguagePipe (`language`)

```typescript
transform(value: string | null | undefined, language: string | null | undefined): string;
```

Returns ```` ```<language>\n<value>\n``` ````. `null` / `undefined` arguments become `''`. A non-string `value`
returns `''`; a non-string `language` returns the value unwrapped (both log an error).
