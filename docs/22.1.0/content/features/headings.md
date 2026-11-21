---
label: Headings and TOC
description: Read the rendered headings to build a table of contents, and give headings GitHub-style ids with headingIds.
order: 14
tags: [ "features", "content" ]
keywords: [ "headings", "table of contents", "headingIds", "MarkdownHeading" ]
---

# Headings and TOC

`(headings)` emits the headings of the content in document order on every render, before `ready`:

```html
<nav>
  @for (heading of headings(); track $index) {
    <a [href]="'#' + heading.id" (click)="$event.preventDefault(); heading.element?.scrollIntoView()">
      {{ heading.text }}
    </a>
  }
</nav>

<markdown src="docs/guide.md" headingIds (headings)="headings.set($event)" />
```

```typescript
readonly headings = signal<MarkdownHeading[]>([]);
```

## MarkdownHeading

| Field | Value |
|-------|-------|
| `level` | `1` to `6`. |
| `text` | Plain text, markup removed (`## Hello *world*` gives `Hello world`), references decoded. |
| `id` | The `id` in the page, or `''`. |
| `element` | The heading element; only set by `<markdown>`, and unset when not found. |

## Ids

- An `id` written by a renderer (`marked-gfm-heading-id`, a custom `renderer.heading`) is kept.
- Otherwise `headingIds` adds a GitHub-style slug: `Hello, World!` gives `hello-world`; repeats become `intro-1`,
  `intro-2`.
- **The default sanitizer removes `id` attributes.** `id` is then `''` but `element` is still set, so scroll with
  `element.scrollIntoView()`, or use a sanitizer that keeps ids.

With the pipe or service, pass `headingIds: true` and `onHeadings(headings)`; those headings have no `element`.

## Replacing `marked-gfm-heading-id`

`headingIds` gives the same ids as `marked-gfm-heading-id` (GitHub's slugs through `github-slugger`, `-1`, `-2`…
suffixes included), so it can replace that extension. Two known differences, pinned by tests since 22.1.0:

| Heading | `headingIds` | `marked-gfm-heading-id` |
|---------|--------------|-------------------------|
| `## a  b` (consecutive spaces) | `a-b` | `a--b` |
| `## &copy; 2026` (leading named character reference) | `-2026` | `2026` |

With [`withDomPurify()`](sanitization.md), the slug ids are kept (`keepHeadingIds`, default `true`).
