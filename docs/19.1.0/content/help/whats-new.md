---
label: What's New in 19.1.0
description: Release notes for @fsegurai/ngx-markdown 19.1.0, a maintenance release that modernizes injection and adds the ngx-markdown selector.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "19.1.0", "inject()", "ngx-markdown selector", "workflows" ]
---

# What's New in 19.1.0

Released 2024-12-06. A maintenance release for Angular 19. The CHANGELOG lists only project, workflow, README and
demo work; the library source diff adds the items under "Library changes".

## Library changes

- **Selector** - `MarkdownComponent` also matches `<ngx-markdown>`.
- **Signals API** - `routerLinkOptions` and `disableRouterLinkHandler` are signal `input()`s; `error` and `load` are
  `output()`s.
- **Injection** - the component, the service, the pipes and the link service use `inject()` instead of constructor
  parameters; the component's former public fields are private.
- **Clipboard** - the default button's copied text is `Copied!` (was `Copied`).

## Fixes

- **Release workflows** - multiple fixes to the release library, release demo and test workflows.
- **README** - content fixes.

## Changes

- **Project** - improved structure, workflows, validations and lint.
- **Documentation** - improved README.
- **Demo** - improved demo.

## Upgrade checklist

- [ ] Follow [Upgrading from 19.0](../guides/upgrading-from-19-0.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v19.1.0` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 19.1.0 and on a diff of the
library source between the `v19.0.0` and `v19.1.0` tags. The tag points at a 2024-12-03 merge; the CHANGELOG
date is 2024-12-06.
