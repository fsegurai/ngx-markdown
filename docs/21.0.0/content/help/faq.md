---
label: FAQ
description: Frequently asked questions about @fsegurai/ngx-markdown 21.0.0.
order: 2
tags: [ "help", "faq" ]
keywords: [ "questions", "NgModule", "zoneless", "directive" ]
---

# FAQ

**Do I need `provideMarkdown()`?**
Yes. `MarkdownService` injects `SECURITY_CONTEXT`, which only `provideMarkdown()` or `MarkdownModule.forRoot()`
provides. Call it once, with no arguments for the defaults.

**Should I still use `MarkdownModule`?**
It works in 21.x but is deprecated and removed in 22. See [Moving off MarkdownModule](../guides/moving-off-markdown-module.md).

**Is there a separate directive?**
No. `MarkdownComponent` also matches the `[markdown]` attribute, so `<div markdown [data]="…">` is the same component.

**Does it work zoneless?**
Yes, since 21.0.0. The component is `OnPush` with signal inputs, the pipe uses `afterNextRender`, and the demo runs
with `provideZonelessChangeDetection()`.

**Do I need `provideHttpClient()` for `[src]`?**
No. Angular 21 provides `HttpClient` in root. Add `provideHttpClient(withFetch())` for SSR or to add interceptors.

**`data` and `src` are both set. Which wins?**
A non-empty `data`.

**How do I import the plugin libraries with `import`?**
You don't in 21.x: the library calls the globals (`Prism`, `katex`, `mermaid`, `ClipboardJS`, `joypixels`), so load
the scripts through `angular.json` or `index.html`.

**Is there a global KaTeX config?**
No. Pass `katexOptions` per component or pipe call.

**Component or pipe?**
The component. The pipe has no outputs and no Prism plugin inputs, and runs plugins on its host component's whole
template.
