---
label: FAQ
description: Frequently asked questions about @fsegurai/ngx-markdown 18.0.0.
order: 2
tags: [ "help", "faq" ]
keywords: [ "questions", "NgModule", "zone.js", "directive" ]
---

# FAQ

**Do I need `provideMarkdown()`?**
Yes. It provides both `MarkdownService` and the `SECURITY_CONTEXT` token it injects (`MarkdownModule.forRoot()` does
the same). Call it once, with no arguments for the defaults.

**`provideMarkdown()` or `MarkdownModule`?**
Both are supported in 18.x and take the same config. Standalone apps use `provideMarkdown()`.

**Is there a separate directive?**
No. `MarkdownComponent` also matches the `[markdown]` attribute, so `<div markdown [data]="…">` is the same component.

**Does it work zoneless?**
No. `zone.js ~0.14.7` is a peer dependency, and the `markdown` pipe runs its plugins on `NgZone.onStable`. 20.0.0
moves the component to signals; 21.0.0 is the first fully zoneless release.

**Do I need `provideHttpClient()` for `[src]`?**
Yes. Angular 18 does not provide `HttpClient` by default, and `getSource()` throws `errorSrcWithoutHttpClient`
without it.

**`data` and `src` are both set. Which wins?**
A non-empty `data`.

**Can marked extensions use dependency injection?**
Not through `markedExtensions` in 18.0.0, which takes plain extension objects; 19.2.0 adds providers. See [Marked Options and Extensions](../guides/marked-options-and-extensions.md).

**How do I import the plugin libraries with `import`?**
You don't in 18.x: the library calls the globals (`Prism`, `katex`, `mermaid`, `ClipboardJS`, `joypixels`), so load
the scripts through `angular.json` or `index.html`.

**Is there a global KaTeX config?**
No. Pass `katexOptions` per component or pipe call.

**Component or pipe?**
The component. The pipe has no outputs and no Prism plugin inputs, and runs plugins on its host component's whole
template.
