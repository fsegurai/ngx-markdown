---
label: What's New in 21.0.1
description: Release notes for @fsegurai/ngx-markdown 21.0.1, a patch release that routes render failures to the error output.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "21.0.1", "patch release", "error output", "render failure" ]
---

# What's New in 21.0.1

Released 2026-10-07, the same day as `21.0.0`. One library fix; the rest is demo and pipeline work.

## Fixes

- **MarkdownComponent** - a render failure of `[data]` or projected content is now emitted through the `error`
  output, matching `[src]`, instead of surfacing as an unhandled promise rejection. `ready` is not emitted for a
  failed render.
- **Demo** - the Get Started page prepares the README text before rendering instead of editing the rendered DOM, so a
  highlighting failure no longer leaves the intro and table of contents visible or the side navigation empty.
- **Demo** - when `README.md` cannot be loaded (the error is logged) or is empty, the Get Started page shows a fallback
  message with a link to the README on GitHub.
- **Demo** - the TypeScript grammar extension in `demo/src/prism.ts` is restored. In 21.0.0, Prism threw
  `can't access property "inside"` on `typescript` code blocks, so those blocks and every block after them stayed
  unhighlighted.

## Infrastructure

- **Release pipeline** - the GitLab Pages demo is built with the root base href (`/`); only GitHub Pages keeps
  `/ngx-markdown/`.

The library fix is visible in the source as a new `renderTracked()` path in `MarkdownComponent`: `PendingTasks.run()`
forwarded rejections to the `ErrorHandler`, so the task is now tracked manually and the error re-emitted.

## Upgrade checklist

- [ ] Bump `@fsegurai/ngx-markdown` to `21.0.1`; no API changes.
- [ ] If an `ErrorHandler` caught `[data]` render failures, handle `(error)` on the component instead.
- [ ] Coming from 20.x? Follow [Upgrading from 20.x](../guides/upgrading-from-20.md).

Full entry: [CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).
