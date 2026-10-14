---
label: Upgrading from 20.x
description: Checklist to move an application from @fsegurai/ngx-markdown 20.x to 21.x, Angular 21, marked 18 and Mermaid 12.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "Angular 21", "marked 18", "Mermaid 12", "zoneless", "breaking changes" ]
---

# Upgrading from 20.x

## Checklist

- [ ] Angular `^21` (`@angular/common`, `core`, `platform-browser`, and now `@angular/router` as a declared peer).
- [ ] `marked ^18` (was `>= 15.0.0 < 16.0.0`).
- [ ] Optional plugins: `katex ^0.19`, `mermaid ^12.1`, `emoji-toolkit ^11`.
- [ ] Re-test custom renderers and marked extensions against marked 18 tokens.
- [ ] Check Mermaid diagrams: the default layout changed to ELK.
- [ ] Stop relying on `ERROR_SRC_WITHOUT_HTTP_CLIENT`.
- [ ] Optional: start [moving off MarkdownModule](moving-off-markdown-module.md); it is deprecated.

## Breaking changes

| Area | 20.x | 21.x |
|------|------|------|
| Angular peers | `^20.0.3` | `^21.0.0`, plus `@angular/router ^21.0.0` |
| `zone.js` | peer dependency | removed; zoneless works |
| `marked` | `>= 15.0.0 < 16.0.0` | `^18.0.0` |
| `katex` / `mermaid` / `emoji-toolkit` | `^0.16.22` / `^11.6.0` / `^9.0.1` | `^0.19.0` / `^12.1.0` / `^11.0.0` |

**marked 18.** Marked 17 and 18 trim trailing blank lines from block tokens and changed list tokens. Renderer
overrides or extensions that read the old token shape may need updates.

**Mermaid 12.** ELK is the default layout. Add `{ layout: 'dagre', look: 'classic' }` to `MERMAID_OPTIONS` (or the
component `mermaidOptions`) to keep the Mermaid 11 look. `defaultRenderer` is deprecated in the config types and ignored
by Mermaid 12. Mermaid's tooling needs Node.js `>= 22.12`.

## Behavior changes

| Change | What to do |
|--------|------------|
| `HttpClient` is required, not optional; `ERROR_SRC_WITHOUT_HTTP_CLIENT` is no longer thrown (deprecated, removed in 22). | Nothing: Angular 21 provides `HttpClient` in root. |
| The `markdown` pipe runs plugins with `afterNextRender`, not `NgZone.onStable`. | Nothing; zoneless apps now get highlighting from the pipe. |
| `MARKED_EXTENSIONS` renderer overrides (e.g. `marked-gfm-heading-id`) now apply. | Remove workarounds that re-added heading ids. |
| A render failure after a `[src]` load goes to `error`; `load` fires after the render. | Handle `(error)` instead of a global error handler. |
| Component and pipe renders register `PendingTasks`. | SSR waits for Markdown; see [SSR and Prerendering](ssr-and-prerendering.md). |
| `MarkdownComponent` is `OnPush` with signal inputs. | Nothing for template use. |
| KaTeX 0.19 `strict` callbacks must return `false`, `'ignore'`, `true`, `'error'` or `'warn'`. | Fix callbacks that return `undefined`. |

## Not changed

The exports, `provideMarkdown()` / `MarkdownModuleConfig`, the injection tokens and every component input and output
keep their 20.x names. Details are in the
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md).
