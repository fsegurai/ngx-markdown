---
label: Pipes
description: Signatures of the markdown and language pipes and the MarkdownPipeOptions type.
order: 3
tags: [ "api", "pipe" ]
keywords: [ "MarkdownPipe", "LanguagePipe", "MarkdownPipeOptions", "transform" ]
---

# Pipes

## MarkdownPipe (`markdown`)

```typescript
class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined, options?: MarkdownPipeOptions): Promise<SafeHtml>;
}

type MarkdownPipeOptions = ParseOptions & RenderOptions;
```

- Resolves to `''` for `null`, `undefined` and non-string values (the last logs an error).
- After the next render, runs `MarkdownService.render()` on the element the pipe is bound to (the element of its
  `[innerHTML]` binding), with its `ViewContainerRef`; several pipes bound to one element render it once per change
  detection pass for each distinct set of options. Async rejections go to the `ErrorHandler`.

See [`ParseOptions` and `RenderOptions`](markdown-service.md#parseoptions).

## LanguagePipe (`language`)

```typescript
class LanguagePipe implements PipeTransform {
  transform(value: string | null | undefined, language: string | null | undefined): string;
}
```

Returns the value as a fenced code block in `language`, with a fence longer than any backtick run in the value. A
non-string value returns `''`; a non-string language returns the value unchanged (both log an error).
