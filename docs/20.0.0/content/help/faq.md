---
label: FAQ
description: Frequently asked questions about @fsegurai/ngx-markdown 20.0.0.
order: 2
tags: [ "help", "faq" ]
keywords: [ "questions", "NgModule", "zoneless", "directive" ]
---

# FAQ

**Do I need `provideMarkdown()`?**
Yes. `MarkdownService` injects `SECURITY_CONTEXT`, which only `provideMarkdown()` or `MarkdownModule.forRoot()`
provides. Call it once, with no arguments for the defaults.

**`provideMarkdown()` or `MarkdownModule`?**
Both are supported in 20.x and take the same config. Standalone apps use `provideMarkdown()`. Note that 21.0.0
deprecates `MarkdownModule`.

**Is there a separate directive?**
No. `MarkdownComponent` also matches the `[markdown]` attribute, so `<div markdown [data]="…">` is the same component.

**Does it work zoneless?**
Partly. `zone.js ~0.15.1` is still a peer dependency. The component uses signal inputs and an `effect`, but the
`markdown` pipe runs its plugins on `NgZone.onStable`, which never emits without `zone.js`. The demo runs with
`zone.js`. 21.0.0 is the first fully zoneless release.

**Do I need `provideHttpClient()` for `[src]`?**
Yes. Angular 20 does not provide `HttpClient` by default, and `getSource()` throws `ERROR_SRC_WITHOUT_HTTP_CLIENT`
without it.

**`data` and `src` are both set. Which wins?**
A non-empty `data`.

**How do I import the plugin libraries with `import`?**
You don't in 20.x: the library calls the globals (`Prism`, `katex`, `mermaid`, `ClipboardJS`, `joypixels`), so load
the scripts through `angular.json` or `index.html`.

**Is there a global KaTeX config?**
No. Pass `katexOptions` per component or pipe call.

**Component or pipe?**
The component. The pipe has no outputs and no Prism plugin inputs, and runs plugins on its host component's whole
template.
