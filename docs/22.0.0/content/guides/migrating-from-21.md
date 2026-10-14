---
label: Migrating from 21 to 22
description: Step-by-step checklist to upgrade @fsegurai/ngx-markdown from 21.x to 22 and its plugin features.
order: 1
tags: [ "guides", "migration" ]
keywords: [ "upgrade", "MarkdownModule", "breaking changes", "withX" ]
---

# Migrating from 21 to 22

## Checklist

- [ ] Angular `^22`, TypeScript `>=6.0 <6.1`, `marked ^18`.
- [ ] Replace `MarkdownModule` with `provideMarkdown()` and the standalone imports.
- [ ] Install each optional peer you use (`prismjs`, `clipboard`, `emoji-toolkit`, `katex`, `mermaid`).
- [ ] Move per-plugin config into `withX()` features; add `withPrism()` and `withEmoji()` if you used them.
- [ ] `await` `MarkdownService.render()` (it returns a `Promise<void>` now).
- [ ] Type `error` handlers as `MarkdownError`.
- [ ] Remove the KaTeX Auto-Render script.
- [ ] Make DOM edits in `(ready)` handlers idempotent (incremental updates keep unchanged nodes).
- [ ] Wait for `ready` / `whenStable()` before reading the DOM of content of 16 KiB or more (time slicing).

## MarkdownModule is removed

| Before (21) | After (22) |
|-------------|------------|
| `MarkdownModule.forRoot(config)` | `provideMarkdown(config)` in the providers |
| `MarkdownModule.forChild()` | nothing |
| `imports: [MarkdownModule]` | `imports: [MarkdownComponent, MarkdownPipe]` |
| `MarkdownModuleConfig` | `MarkdownConfig` (the old name is a deprecated alias) |

## Plugins need their feature

| Removed | Replacement |
|---------|-------------|
| `katexOptions`, `KATEX_OPTIONS` | `withKatex(katexOptions)` |
| `mermaidOptions`, `MERMAID_OPTIONS` | `withMermaid({ config })` |
| `mermaidLoader`, `MERMAID_LOADER` | `withMermaid({ loader })` |
| `mermaidRenderTimeout`, `MERMAID_RENDER_TIMEOUT` | `withMermaid({ renderTimeout })` |
| `mermaidExportOptions`, `MERMAID_EXPORT_OPTIONS` | `withMermaidExport(options)` |
| `clipboardOptions`, `CLIPBOARD_OPTIONS` | `withClipboard(options)` |
| `lightboxOptions`, `LIGHTBOX_OPTIONS` | `withLightbox(options)` |
| `[emoji]` without a feature | `withEmoji()` |
| Highlighting whenever `Prism` was loaded | `withPrism(options?)` |

```typescript
// After
provideMarkdown({
  plugins: [
    withKatex({ throwOnError: false }),
    withMermaid({ loader: () => import('mermaid').then((m) => m.default), config: { look: 'handDrawn' } }),
    withMermaidExport({ filenamePrefix: 'chart' }),
    withClipboard({ buttonComponent: ClipboardButtonComponent }),
    withLightbox({ wrap: false }),
    withEmoji(),
    withPrism(),
  ],
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }], // unchanged
});
```

Unchanged: `markedOptions`, `markedExtensions`, `loader`, `sanitize`, and every per-component input.

## Other behavior changes

- **Async render:** errors reject the `render()` Promise instead of throwing, and every enabled plugin still runs.
- **`SANITIZE`:** `sanitize` also accepts a function; `SECURITY_CONTEXT` is deprecated (removed in v23).
- **Emoji:** shortcodes in code, raw HTML and link URLs are no longer converted.
- **`cacheSrc`:** new, opt-in.
- **KaTeX:** rendered while parsing; the Auto-Render script is no longer used.

## Incremental updates and time slicing

Both are on by default and change when, and which, DOM nodes `<markdown>` writes:

- **Incremental updates:** when `data` or `src` changes, the top-level blocks whose HTML did not change keep their DOM
  nodes. Code in a `(ready)` handler that edits the rendered DOM must be idempotent (a kept node already has its
  edits), and must not assume that a node reference it holds is kept or replaced. Opt out with
  `provideMarkdown({ incrementalUpdates: false })`.
- **Time slicing:** in the browser, content of 16 KiB or more is parsed over several tasks, so its HTML is in place
  only after later tasks, not right after a change detection. Wait for the `ready` output, or for
  `ApplicationRef.whenStable()` (`fixture.whenStable()` in tests). Opt out with `provideMarkdown({ timeSlicing: false })`.
- **Superseded pipe values:** a `markdown` pipe value replaced while its parse is still running resolves to `''`.

```typescript
// The 21.x behavior: every change re-renders the whole content, parsed in one task
provideMarkdown({ incrementalUpdates: false, timeSlicing: false });
```

A token you provided per component (e.g. `MERMAID_OPTIONS`) has no replacement token: give that component its own
`provideMarkdown({ plugins: [...] })`. Full details are in the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).
