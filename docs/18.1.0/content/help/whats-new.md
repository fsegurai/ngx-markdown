---
label: What's New in 18.1.0
description: Release notes for @fsegurai/ngx-markdown 18.1.0, with marked 13 and 14 support, new Mermaid chart keys and fixed Angular anchor links.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "18.1.0", "marked 14", "kanban", "routerLink", "localFile" ]
---

# What's New in 18.1.0

Released 2024-11-13. A minor release for Angular 18.

## Features

- **Marked 14** - the `marked` peer is `>= 13.0.0 < 15.0.0`. Renderer methods take marked's token objects, and the
  library re-exports marked's `Tokens` as `MarkedToken`.
- **Mermaid** - `MermaidAPI.Config` gains keys for the current Mermaid diagrams, including the new kanban chart.
- **`parseInline()`** - `MarkdownService.parseInline()` wraps `marked.parseInline`.

## Fixes

- **Anchors** - links written as `/routerLink:/path#fragment` keep their prefix and navigate with the fragment; links
  carrying Angular `routerlink` attributes count as internal.
- **Links** - `/localFile:` links open local repository files in a new tab; `www.` and `ftps:` links count as
  external.
- **Mermaid** - improved Mermaid interfaces (`journeyUser`, `gitGraph`, typed `ThemeVariables`).
- **Pipelines** - fixes to the PR triage, release and release demo pipelines and their dependencies.
- **Labeler** - fixed labeler setup and documentation.

## Changes

- **Pipelines** - improved workflows, validations and schemas.
- **Scripts** - removed unused package scripts.

## Security

- **Dependencies** - upgraded Mermaid (`^11.4.0`) and ESLint packages.

## Upgrade checklist

- [ ] Follow [Upgrading from 18.0](../guides/upgrading-from-18-0.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v18.1.0` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 18.1.0 and on a diff of the
library source between the `v18.0.0` and `v18.1.0` tags. The tag points at a 2024-11-12 merge (`515c94a`); the
CHANGELOG date is 2024-11-13. The CHANGELOG says "Marked 14"; the peer range also accepts marked 13. The
`parseInline()` item comes from the source diff only.
