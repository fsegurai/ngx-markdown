---
label: What's New in 17.0.0
description: Release notes for @fsegurai/ngx-markdown 17.0.0, the first stable release of the library, for Angular 17.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "17.0.0", "Angular 17", "stable", "first release" ]
---

# What's New in 17.0.0

Published 2024-08-05. The first stable release of `@fsegurai/ngx-markdown`, for Angular 17. It follows a series of
`17.0.0-beta.*` prereleases; there is no earlier stable version to upgrade from.

## At a glance

| Area | 17.0.0 |
|------|--------|
| Angular peers | `^17.0.0` |
| `marked` peer | `>= 9.0.0 < 13.0.0` |
| `rxjs` / `zone.js` peers | `^6.5.3 \|\| ^7.4.0 \|\| ^7.8.1` / `~0.14.7` |
| Optional plugins | `prismjs ^1.29.0`, `clipboard ^2.0.11`, `emoji-toolkit ^9.0.1`, `katex ^0.16.11`, `mermaid ^10.9.1` |
| `tslib` | `^2.6.3` |

## Features

- **RouterLink handler** - links rendered from Markdown can navigate through the Angular Router. See
  [Link Handling](../features/link-handling.md).
- **npm scripts** - `package.json` scripts for building, testing and deploying the library and demo.

## Fixes

- **Hyperlinks** - fixed hyperlink handling.
- **Markdown service** - fixed parsing in `MarkdownService`.
- **Markdown component** - improved the rendering component and fixed its HTML.
- **Demo and scripts** - fixed the demo structure, `package.json` commands and deployment scripts.

## Changes

- **CI/CD** - Angular CI/CD workflow updated across the beta releases.
- **Cleanup** - unused commands removed.
- **Security** - library and demo dependencies upgraded; Dependabot bumps of `socket.io` and `braces`.

## Get started

- [ ] [Install](../getting-started/installation.md) the library and `marked`.
- [ ] Render a first document with the [Quick Start](../getting-started/quick-start.md).

## What comes next

18.0.0 moves the same library to Angular 18 (`^18.0.0` peers), Mermaid `^11.3.0` and `tslib ^2.8.0`, with
lint-only source edits.

## Source of these notes

The `## [17.0.0] - 2024-08-05` entry of today's CHANGELOG, checked against the library source at commit `f32cb86`,
the last commit where `lib/package.json` reads `17.0.0`. The repository had no `CHANGELOG.md` at that commit. The
`v17.0.0` git tag is misaligned: it points at `96f592f`, an 18.0.0 beta commit, so it was not used.
