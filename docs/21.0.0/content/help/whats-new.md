---
label: What's New in 21.0.0
description: Release notes for @fsegurai/ngx-markdown 21.0.0, the Angular 21, marked 18 and zoneless release.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "21.0.0", "Angular 21", "marked 18", "zoneless", "Mermaid 12" ]
---

# What's New in 21.0.0

Released 2026-10-07. The stable release for Angular 21. Its library source is identical to `21.0.0-beta.1` and
`21.0.0-beta.0`; only the version and the release notes changed since the betas.

## Breaking changes

- **Angular 21** - the peer dependencies `@angular/common`, `@angular/core` and `@angular/platform-browser` now
  require `^21.0.0`.
- **Zoneless** - the `zone.js` peer dependency is removed. The library works with `provideZonelessChangeDetection()`,
  and the demo runs fully zoneless.
- **Marked 18** - `marked` now requires `^18.0.0` (was `>= 15.0.0 < 16.0.0`). Marked 17/18 trim trailing blank lines
  from block tokens and changed list tokens. The optional plugins move to `katex ^0.19`, `mermaid ^12` (ELK layout by
  default, Node.js >= 22.12 for tooling) and `emoji-toolkit ^11`.

## Fixes

- **Marked extensions** - `renderer` overrides from `MARKED_EXTENSIONS` (for example heading ids from
  `marked-gfm-heading-id`) are now applied to the renderer used for parsing.
- **MarkdownPipe** - post-render processing runs via `afterNextRender` instead of `NgZone.onStable`, which never fires
  in zoneless apps.
- **MarkdownComponent** - a render failure after a successful `[src]` load is emitted through `error`, and `load` is
  emitted only after the render completes.
- **SSR stability** - the component (data, projected content and `[src]`) and the pipe (async parse) register
  `PendingTasks`, so SSR, prerendering and `whenStable()` wait for the Markdown.
- **SSR** - the component iterates `querySelectorAll` results with `Array.from`; server DOMs without `NodeList.forEach`
  crashed the render.
- **Peer dependencies** - `@angular/router ^21.0.0` is now declared; the package already imported it.
- **Demo** - scrollspy selector fix, content animation on render, and accessibility fixes for icon-only buttons.

## Changes

- **Deprecated: `MarkdownModule`** - `MarkdownModule`, `forRoot()` and `forChild()` are deprecated and removed in 22.
  Use `provideMarkdown()` and the standalone imports.
- **Deprecated: `ERROR_SRC_WITHOUT_HTTP_CLIENT`** - `HttpClient` is injectable by default since Angular 21, so the
  guard is gone and the constant is unused.
- **Deprecated: Mermaid `defaultRenderer`** - removed by Mermaid 12; use `layout`. `{ layout: 'dagre', look:
  'classic' }` restores the previous appearance.
- **KaTeX options** - the `strict` callback docs reflect KaTeX 0.19.
- **MarkdownComponent** - `ChangeDetectionStrategy.OnPush` and `host` metadata instead of `@HostListener('click')`.
- **Tooling** - TypeScript 5.9, Vitest instead of Karma/Jasmine, Biome instead of ESLint, the demo consumes the built
  library, and a demo smoke test suite.

## Documentation and infrastructure

- **Docs** - `CONTRIBUTING.md`, an SSR / prerendering section in the README, and `provideMarkdown()` recommended over
  `MarkdownModule`.
- **Infrastructure** - CI on Biome and Vitest, Husky hooks, workspace `engines` (`node >=24`, `bun >=1.4.0`,
  `npm >=11`), Mermaid served to the demo as a static asset, Appwrite custom domain.
- **Security** - Trivy scanning in CI and a 3-day `minimumReleaseAge` for installs.

## Upgrade checklist

- [ ] Follow [Upgrading from 20.x](../guides/upgrading-from-20.md).
- [ ] Plan the move off `MarkdownModule`: [Moving off MarkdownModule](../guides/moving-off-markdown-module.md).
- [ ] Coming from a 21.0.0 beta? Only bump the version; nothing in the library changed.

Full entry, including every dependency bump: [CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).
