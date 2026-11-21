---
label: FAQ
description: Frequently asked questions about @fsegurai/ngx-markdown.
order: 1
tags: [ "help", "faq" ]
keywords: [ "questions", "NgModule", "zoneless", "directive" ]
---

# FAQ

**Do I need `provideMarkdown()`?**
Not for the defaults: `MarkdownService` is provided in root and sanitizing is on. You need it for plugins and options.

**Is there an NgModule?**
No. `MarkdownModule` was removed in 22. Import `MarkdownComponent` and `MarkdownPipe` directly.

**Is there a separate directive?**
No. `MarkdownComponent` also matches the `[markdown]` attribute, so `<div markdown [data]="…">` is the same component.

**Does it work zoneless?**
Yes. The component is `OnPush`, uses signals, and the demo runs with `provideZonelessChangeDetection()`.

**Why does changing `[katex]` (or another option) not re-render?**
Only `data`, `src` and `MarkdownService.reload()` render again; the other inputs are read at render time. Call
`reload()` after changing them. `mermaidOptions` is the only tracked option.

**`data` and `src` are both set. Which wins?**
A non-empty `data`. A one-time warning is logged.

**Can I use DOMPurify?**
Yes: `provideMarkdown({ sanitize: (html) => DOMPurify.sanitize(html) })`. With KaTeX, keep `span` and `class`.

**Component or pipe?**
The component. The pipe runs plugins on its host component's whole template, has no outputs and no lightbox.

**When should I write a plugin instead of a Marked extension?**
When you need a per-component toggle, merged options, DOM work after render, or a cleanup. See
[Writing a Plugin](../guides/writing-a-plugin.md).
