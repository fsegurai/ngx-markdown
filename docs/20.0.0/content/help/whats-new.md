---
label: What's New in 20.0.0
description: Release notes for @fsegurai/ngx-markdown 20.0.0, the Angular 20 and signals release.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "20.0.0", "Angular 20", "signals", "breaking changes" ]
---

# What's New in 20.0.0

Released 2025-06-17. The Angular 20 release: the component, the clipboard button and the services move to signals
and `inject()`, and the link service is rewritten.

## Breaking changes

- **Angular 20** - peers `@angular/common`, `@angular/core` and `@angular/platform-browser` now require `^20.0.3`;
  `zone.js` moves to `~0.15.1`.
- **Error constants** - renamed from camelCase (`errorKatexNotLoaded`, …) to `ERROR_*` (`ERROR_KATEX_NOT_LOADED`, …).
- **Marked extensions** - `markedExtensions` accepts `MARKED_EXTENSIONS` providers only; plain `MarkedExtension`
  objects and the `isTypedProvider()` / `getMarkedExtensionProvider()` helpers are gone.
- **MarkdownComponent** - signal inputs (`data` and `src` are `model()`), `render()` is private, rendering runs from
  an `effect` instead of `ngOnChanges`.

## Features

- **Signals** - `MarkdownComponent` and `ClipboardButtonComponent` use `input()`, `model()`, `output()` and signals;
  the clipboard button no longer needs `AsyncPipe`.
- **Zoneless (partial)** - the component no longer depends on `zone.js` to render. The `markdown` pipe still uses
  `NgZone.onStable`, and `zone.js` stays a peer dependency.

## Fixes and changes

- **Link service** - absolute (`/path`) and `./` links count as internal, clicks inside a link are handled,
  `/localFile:` links open in a new tab with `internalBrowserHandler`. `routerLinkOptions.global` and `paths` are no
  longer applied (see [Link Handling](../features/link-handling.md)).
- **MarkdownService** - `providedIn: 'root'`; async marked output is awaited before sanitizing; a missing Prism logs
  a warning; `trimIndentation` rewritten.
- **Pipes** - `MarkdownPipe` and `LanguagePipe` accept `null | undefined`; `LanguagePipe` returns `''` for a
  non-string value.
- **Unit tests** - fixed after the refactoring and the signals migration.
- **Dependencies** - optional `katex ^0.16.22`, `mermaid ^11.6.0`, `prismjs ^1.30.0`.
- **CI/CD** - old GitHub workflows removed.

## Upgrade checklist

- [ ] Follow [Upgrading from 19.x](../guides/upgrading-from-19.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v20.0.0` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 20.0.0 and on a diff of the
library source between the `v19.2.0` and `v20.0.0` tags. The `v20.0.0` tag points at a 2025-07-06 commit whose
library source equals the 2025-06-17 release commit.
