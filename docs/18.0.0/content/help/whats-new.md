---
label: What's New in 18.0.0
description: Release notes for @fsegurai/ngx-markdown 18.0.0, the first stable release for Angular 18.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "18.0.0", "Angular 18", "stable", "Mermaid 11" ]
---

# What's New in 18.0.0

Published 2024-10-25. The first stable release of the 18 line: the 17.0.0 library, moved to Angular 18.

## Breaking changes

- **Angular 18** - the Angular peers are `^18.0.0` (were `^17.0.0`). Not backward compatible with Angular 17.

## Library changes

- **Mermaid 11** - the optional `mermaid` dependency is `^11.3.0` (was `^10.9.1`).
- **tslib** - `^2.8.0` (was `^2.6.3`).
- **Source** - lint-only edits (ESLint 9 migration, `Record<…>` index types). The public API, inputs, outputs and
  defaults are the same as in 17.0.0.

## Changes

- **Pipelines** - new npm publish and demo workflows; publish tag setup and `determine_tag` fixes; deprecated
  `save-state` / `set-output` commands removed.
- **Tooling** - ESLint migrated from `8.57.0` to `9.13.0` (flat `eslint.config.js`).
- **Demo** - assets and favicon moved to `demo/public/`.
- **Security** - Dependabot bumps of `micromatch`, `express`, `dompurify`, `axios` and `body-parser`.

## Upgrade checklist

- [ ] Follow [Upgrading from 17.x](../guides/upgrading-from-17.md).

## Source of these notes

The `## [18.0.0] - 2024-10-25` entry of the current CHANGELOG, checked against a diff of the library source between
the `17.0.0` library commit (`f32cb86`) and the `v18.0.0` tag (`bb71de7`). The repository had no `CHANGELOG.md` at
the `v18.0.0` tag.
