---
label: Long Documents
description: How large documents are parsed and rendered without blocking the main thread (time-sliced parse, progressive insertion, incremental updates of edited content), the opt-in contentVisibility option for very long pages, lazy Mermaid diagrams and math-heavy documents.
order: 7
tags: [ "guides", "performance" ]
keywords: [ "content-visibility", "contentVisibility", "chunked rendering", "main thread", "time slicing", "timeSlicing", "incremental updates", "incrementalUpdates", "editor", "lazy", "Mermaid", "KaTeX", "line numbers" ]
---

# Long Documents

Nothing needs configuring:

- **Time-sliced parse.** In the browser, content of 16 KiB or more is parsed and sanitized in slices of about 8 ms,
  yielding to the browser in between. The HTML, headings and front matter are those of `MarkdownService.parse()`.
- **Progressive insertion.** A rendered document of 16 KB of HTML or more is inserted in three batches of top-level
  elements, one frame apart (the top first).
- **Chunked plugins.** Highlighting and clipboard buttons are created in chunks.
- **Incremental updates.** When `data` or `src` changes (an editor preview), only the top-level blocks whose HTML
  changed are replaced; unchanged HTML is not rendered again.

`headings`, `metadata` and `ready` are emitted once the whole document is in place.

## Time-sliced parse

Marked's steps run one by one: the block lexing, then the inline lexing of each block, `walkTokens` and the rendering of
each top-level block. Reference links and footnotes keep the whole document as context. Angular's HTML sanitizer then
runs on chunks of about 16 KB that end where every tag is closed. A newer content stops the parse of the previous one.

| Case | What happens |
|------|--------------|
| Server (SSR, prerendering) | Whole parse, no yield. |
| Content under 16 KiB | Whole parse. |
| `async` Marked extension, `silent`, custom `hooks.provideLexer`/`provideParser` | Whole parse. |
| Sanitize function (DOMPurify), `postprocess` hook, raw HTML left open, `<svg>`/`<math>` | The sanitizer runs whole. |
| Extensions with state reset in a hook (`marked-gfm-heading-id`, marked-extended footnotes) | When another parse runs between two slices, the parse starts again, whole. |
| `markdown` pipe | Sliced as well (it is asynchronous already); a new value stops the parse of the previous one. |
| `MarkdownService.parse()` | Unchanged: synchronous. |

Turn it off for the app:

```typescript
provideMarkdown({ timeSlicing: false });
```

On a 5,000-line document (median of 9 runs, total blocking time; `ready` unchanged or faster):

| Browser | HTML sanitizer | No sanitizer |
|---------|----------------|--------------|
| Chromium | 435 → 383 ms | 410 → 187 ms |
| Firefox | 816 → 685 ms | — |

The long tasks left are the layout and paint of the inserted content; `contentVisibility` reduces them.

## Incremental updates

When `data` or `src` changes, the new content is still parsed whole (so reference links, footnotes, heading ids and
front matter always see the whole document), then compared with the content on screen, top-level block by top-level
block:

- **Unchanged HTML** (and the same inputs): nothing is written, no plugin runs again; `headings`, `metadata` and `ready`
  are emitted as usual.
- **Changed blocks**: only the top-level nodes between the first and the last block that differ are replaced. The
  others keep their DOM nodes and what the plugins did on them (Prism highlighting, line numbers, copy buttons, drawn
  Mermaid diagrams and their export buttons, lightbox images, the state of marked-extended runtimes such as a selected
  tab), and the plugins run on the new nodes alone. The buttons, diagram observers and image bindings of the removed
  blocks are released. The DOM is the one a whole render gives.

A whole render is used instead:

| Case | Why |
|------|-----|
| A plugin with a `render` hook that is not `incremental` is enabled (a custom plugin without `incremental: true`) | Its output cannot be scoped to new blocks. Every built-in plugin is incremental. |
| A rendering input changed since the last render (e.g. `[lineNumbers]`) | The kept blocks were rendered with the old value. |
| The plugins of the content on screen have not finished (or failed) | The kept blocks would miss their output. |
| More than half of the blocks changed | A whole render inserts it progressively. |
| `MarkdownService.reload()`, server, `provideMarkdown({ incrementalUpdates: false })` | Explicit, or nothing to update. |

Editing a 5,000-line document (Prism, KaTeX and emoji on; a paragraph typed near the middle, 8 edits, median of 3 runs;
time from the change to `ready`, and the total blocking time of the 8 edits):

| Browser | Whole render | Incremental |
|---------|--------------|-------------|
| Chromium | 255 ms, TBT 1280 ms | 49 ms, no long task |
| Firefox | 496 ms, TBT 3385 ms | 225 ms, TBT 917 ms |
| Firefox with `contentVisibility` | 392 ms, TBT 2020 ms | 181 ms, TBT 468 ms |

With every plugin of the playground on (Prism with line numbers, KaTeX, emoji, clipboard, Mermaid, Mermaid export and
lightbox; `/perf?prism=1&lightbox=1&export=1`, 8 edits, median of 6 runs):

| Browser | Whole render | Incremental |
|---------|--------------|-------------|
| Chromium | 316 ms, TBT 1474 ms | 52 ms, no long task |
| Firefox | 1161 ms, TBT 7850 ms | 241 ms, TBT 993 ms |

Firefox lays out the whole document after any change to it (about 180 ms at 5,000 lines), which `contentVisibility`
reduces. Turn it off for the app:

```typescript
provideMarkdown({ incrementalUpdates: false });
```

## Opt-in: skip off-screen layout

For very long documents, turn on `contentVisibility`. The top-level blocks (headings excepted) get
`content-visibility: auto`, so the browser skips the style, layout and paint of the blocks that are off screen:

```html
<markdown contentVisibility [src]="'docs/handbook.md'" />
```

```typescript
// Every <markdown> of the app; [contentVisibility]="false" still turns it off for one
provideMarkdown({ contentVisibility: true });
```

The rule ships with the component (a `markdown-content-visibility` class on the host, exported as
`CONTENT_VISIBILITY_CLASS`), so nothing has to be added to your styles. A change of the input applies at once, without
re-rendering. Use the class to scope an override of the height estimate to the components that have it on:

```scss
markdown.markdown-content-visibility > * {
  contain-intrinsic-block-size: auto 120px;
}
```

On a 5,000-line document (median of 7 runs, Angular's HTML sanitizer on):

| Browser | Total blocking time | Longest task |
|---------|---------------------|--------------|
| Chromium | 425 → 170 ms | 275 → 157 ms |
| Firefox | 800 → 567 ms | 267 → 234 ms |

| Tradeoff | Effect |
|----------|--------|
| Clipped overflow | Paint containment clips what overflows a block (a box shadow, a list marker outside a list without padding). Headings are left out, so a heading anchor icon outside the heading still shows. |
| Margins | Margins of nested elements no longer collapse through a block (e.g. the first paragraph of a `<blockquote>`). |
| Estimated heights | Until a block is shown once, it counts as 80px, so the scrollbar can shift. Override it with any rule, e.g. `markdown > * { contain-intrinsic-block-size: auto 120px; }` (the built-in rule has no specificity). |
| Deep anchor jumps | A jump far down the page (`scrollIntoView()`, a `#section` link) can land up to a few hundred pixels off; a second `scrollIntoView()` after a frame lands exactly. |
| Find-in-page, selection, accessibility | Unaffected: the content stays in the DOM. |
| Printing | Unaffected: every block is rendered for print. |
| Mermaid, KaTeX, Prism, clipboard, lightbox | Unaffected. |

## Opt-in: lazy Mermaid diagrams

Each Mermaid diagram is a long task, even far below the fold. `withMermaid({ lazy: true })` (or
`[plugins]="{ mermaid: { lazy: true } }"`) draws a diagram only when it comes near the viewport; `ready` then emits once
the diagrams near the viewport are drawn. See [Mermaid Diagrams](../features/mermaid.md#lazy-diagrams-opt-in) for the
tradeoffs. On 5,000 lines with 40 distinct diagrams (median of 9 runs):

| Browser | `ready` | Total blocking time | Longest task |
|---------|---------|---------------------|--------------|
| Chromium | 3104 → 1069 ms | 939 → 161 ms | 267 → 104 ms |
| Firefox | 2358 → 1184 ms | 1133 → 618 ms | 250 → 250 ms |

## Math-heavy documents

KaTeX renders while the document is parsed, so its work is time-sliced with the parse and the `markdown` pipe and
`parse()` still return the math. What remains is the layout and paint of the math, which `contentVisibility` skips off
screen. On 5,000 lines with 400 distinct display formulas (median of 9 runs):

| Browser | `ready` | Total blocking time | Longest task |
|---------|---------|---------------------|--------------|
| Chromium | 678 → 462 ms | 566 → 62 ms | 379 → 73 ms |
| Firefox | 858 → 711 ms | 1467 → 750 ms | 866 → 299 ms |

## Line numbers

Prism's line-numbers plugin reads the style of every block it numbers. While `<markdown>` highlights, the library adds
the same rows itself and reads the styles once per chunk, so a long document with `lineNumbers` no longer recalculates
styles after every block (5,000 lines in Firefox: `ready` 5.4 → 1.5 s).

