---
label: Front-matter
description: Strip a YAML or TOML front-matter block from Markdown and read its data with the core frontMatter plugin.
order: 13
tags: [ "features", "content" ]
keywords: [ "frontMatter", "metadata", "YAML", "TOML", "extractFrontMatter" ]
---

# Front-matter

By default a front-matter block is rendered as Markdown. Set `frontMatter` to strip it and read it from `metadata`:

```markdown
---
title: Release notes
tags: [angular, markdown]
---

# Release notes
```

```html
<markdown src="docs/release.md" frontMatter (metadata)="onMetadata($event)" />
```

```typescript
onMetadata({ data, raw }: MarkdownFrontMatter): void {
  this.title = data['title'];
}
```

## Rules

- The block opens with `---` (YAML) or `+++` (TOML) alone on the first line (only a BOM and blank lines before it) and
  closes with the same delimiter alone on a line. Without a closing delimiter, nothing is stripped.
- `metadata` emits `{ data, raw }` on every render, before `ready`. Content without a block emits
  `{ data: {}, raw: '' }`.
- `data` holds a safe subset; nothing is evaluated:

| Value | Example | `data` |
|-------|---------|--------|
| String (plain or quoted) | `title: "A: B"` | `'A: B'` |
| Number | `weight: 1.5` | `1.5` |
| Boolean | `draft: true` | `true` |
| Null | `x: null`, `x: ~`, `x:` | `null` |
| One-line array of scalars | `tags: [a, "b, c", 3]` | `['a', 'b, c', 3]` |
| YAML block list of scalars | `tags:` then `- a` | `['a']` |

Other values (nested maps, block scalars) stay as raw strings. TOML tables are left to `raw`. `__proto__`,
`constructor`, `prototype` and other `Object.prototype` keys are ignored.

## Pipe, service and helper

```html
<div [innerHTML]="markdown | markdown: { frontMatter: true, onFrontMatter: setMetadata } | async"></div>
```

`extractFrontMatter(markdown)` returns `{ frontMatter, content }` without rendering (`frontMatter` is `null` without a
block). The `[plugins]="{ frontMatter: true }"` record works too; `[frontMatter]="false"` wins over it.
