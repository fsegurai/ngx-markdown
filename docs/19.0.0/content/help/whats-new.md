---
label: What's New in 19.0.0
description: Release notes for @fsegurai/ngx-markdown 19.0.0, the Angular 19 and marked 15 release with app-wide Mermaid configuration.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "19.0.0", "Angular 19", "marked 15", "MERMAID_OPTIONS" ]
---

# What's New in 19.0.0

Released 2024-11-28. The first stable release for Angular 19, shipped first as `19.0.0-beta.1`.

## Breaking changes

- **Angular 19** - the Angular peers are `^19.0.0` and `zone.js` is `~0.15.0`. Not backward compatible.
- **Marked 15** - the `marked` peer is `>= 15.0.0 < 16.0.0` (was `>= 13.0.0 < 15.0.0`).
- **Mermaid types** - `MermaidAPI.Config` and its enums are replaced by `MermaidAPI.MermaidConfig` and per-diagram
  config interfaces generated from Mermaid 11.

## Features

- **Mermaid** - global Mermaid configuration: the new `MERMAID_OPTIONS` token, set with
  `provideMarkdown({ mermaidOptions })`, is merged under each component's `mermaidOptions`.
- **Typed providers** - `clipboardOptions`, `markedOptions` and `mermaidOptions` in `MarkdownModuleConfig` only accept
  a value or factory provider for their own token.

## Changes

- **Project** - improved workflow validations, ESLint configuration, README and demo structure.
- **Dependencies** - `mermaid` optional dependency `^11.4.1`.

## Upgrade checklist

- [ ] Follow [Upgrading from 18.x](../guides/upgrading-from-18-x.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v19.0.0` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 19.0.0 and on a diff of the
library source between the `v18.1.0` and `v19.0.0` tags. The tag points at a 2024-11-27 merge (`f2655ec`); the
CHANGELOG date is 2024-11-28. The "Typed providers" item comes from the source diff only.
