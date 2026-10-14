---
label: What's New in 19.2.0
description: Release notes for @fsegurai/ngx-markdown 19.2.0, which adds dependency injection for marked extensions.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "19.2.0", "MARKED_EXTENSIONS", "dependency injection", "browser support" ]
---

# What's New in 19.2.0

Released 2025-03-03. A minor release for Angular 19 with one library feature and a reorganized source tree.

## Features

- **Marked extensions** - `markedExtensions` accepts `MARKED_EXTENSIONS` providers next to plain extension objects,
  so an extension factory can use `deps`. New exported helpers: `isTypedProvider()` and
  `getMarkedExtensionProvider()`. See [Marked Options and Extensions](../guides/marked-options-and-extensions.md).
- **Scrollspy** (demo) - new TOC validation for the scrollspy component.
- **Browser support** - a browser support configuration for the workspace.
- **Azure DevOps** - an ADO workflow.

## Fixes

- **Tests** - the test browser changed to Edge; the unit test config file fixed.
- **Demo** - get-started rendering and the project logo improved.

## Changes

- **Project** - library sources moved into `clipboard-button/`, `configuration/`, `markdown/`, `pipes/` and
  `services/` folders (public exports unchanged); README, license and demo refactored.
- **MARKED_EXTENSIONS** - typed `InjectionToken<MarkedExtension>` with one `multi` provider per extension (was
  `InjectionToken<MarkedExtension[]>` holding one array).

## Security

- **Dependencies** - library versions upgraded; optional `katex` now `^0.16.21`, `rxjs` peer lists `^7.8.2`.

## Upgrade checklist

- [ ] Follow [Upgrading from 19.1](../guides/upgrading-from-19-1.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v19.2.0` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 19.2.0 and on a diff of the
library source between the `v19.1.0` and `v19.2.0` tags.
