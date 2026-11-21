---
label: Upgrading from 19.x
description: Checklist to move an application from @fsegurai/ngx-markdown 19.x to 20.x, Angular 20 and the signal-based component.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "Angular 20", "signals", "breaking changes", "ERROR_ constants", "MARKED_EXTENSIONS" ]
---

# Upgrading from 19.x

## Checklist

- [ ] Angular `^20.0.3` (`@angular/common`, `core`, `platform-browser`) and `zone.js ~0.15.1`.
- [ ] Optional plugins: `katex ^0.16.22`, `mermaid ^11.6.0`, `prismjs ^1.30.0` (`marked`, `clipboard` and
      `emoji-toolkit` ranges are unchanged).
- [ ] Rename imported error constants (`errorKatexNotLoaded` → `ERROR_KATEX_NOT_LOADED`, …).
- [ ] Turn plain `markedExtensions` entries into `MARKED_EXTENSIONS` providers.
- [ ] Stop calling `MarkdownComponent.render()` from your code.
- [ ] Re-test link handling if you pass `routerLinkOptions`.

## Breaking changes

| Area | 19.x | 20.x |
|------|------|------|
| Angular peers | `^19.0.0` | `^20.0.3` |
| `zone.js` peer | `~0.15.0` | `~0.15.1` |
| Error constants | `errorJoyPixelsNotLoaded`, `errorKatexNotLoaded`, `errorMermaidNotLoaded`, `errorClipboardNotLoaded`, `errorClipboardViewContainerRequired`, `errorSrcWithoutHttpClient` | `ERROR_JOYPIXELS_NOT_LOADED`, `ERROR_KATEX_NOT_LOADED`, `ERROR_MERMAID_NOT_LOADED`, `ERROR_CLIPBOARD_NOT_LOADED`, `ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED`, `ERROR_SRC_WITHOUT_HTTP_CLIENT` (same messages) |
| `markedExtensions` | `MarkedExtension` objects **or** providers (19.2.0) | providers only: `{ provide: MARKED_EXTENSIONS, useValue \| useFactory, multi: true }` |
| `isTypedProvider()`, `getMarkedExtensionProvider()` | exported (19.2.0) | removed |
| `MarkdownComponent.render()` | public method | private |
| Component inputs | decorator `@Input()`s | signal `input()`s; `data` and `src` are `model()` |
| `ClipboardButtonComponent` | `@Input() buttonTextCopy/buttonTextCopied` | `model()` signals |

Moving extensions to providers:

```typescript
// 19.x
provideMarkdown({ markedExtensions: [gfmHeadingId()] });

// 20.x
provideMarkdown({
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
});
```

## Behavior changes

| Change | What to do |
|--------|------------|
| The component re-renders from an `effect`: a `data` render tracks the plugin inputs; a `src` render only re-runs when `src` changes. In 19.x any input change re-ran `ngOnChanges` and re-fetched `src`. | Call `MarkdownService.reload()` after changing plugin inputs on `[src]` content. |
| Absolute links (`/docs`) are internal now; in 19.x they counted as external. `./…` is internal too. | Check `internalBrowserHandler` / `externalBrowserHandler` behavior. |
| `/localFile:` links open in a new tab through `internalBrowserHandler` (19.x: `externalBrowserHandler`). | Turn on `internalBrowserHandler` for them. |
| Clicks on elements nested inside a link are intercepted (19.x: only clicks whose target was the `<a>`). | Nothing. |
| `routerLinkOptions.global` and `paths` are no longer applied to navigation. | See [Link Handling](../features/link-handling.md). |
| `disableRouterLinkHandler` uses `booleanAttribute`, so the bare attribute now disables link handling. | Nothing. |
| `MarkdownService.parse()` awaits async marked output before sanitizing. | Nothing. |
| A missing Prism logs `Prism.js not loaded…` (19.x was silent). | Ignore it or load Prism. |
| `LanguagePipe` returns `''` for a non-string value (19.x returned the value). | Nothing for string input. |
| `MarkdownService` is `providedIn: 'root'` (19.x: provided only by `provideMarkdown()`). | Nothing: `provideMarkdown()` is still required for `SECURITY_CONTEXT`. |

## Not changed

Selectors, input and output names, `provideMarkdown()` / `MarkdownModule`, `MarkdownModuleConfig` and the injection
tokens keep their 19.x names. Details are in the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).
