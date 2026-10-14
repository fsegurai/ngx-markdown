---
label: Upgrading from 17.x
description: Move an application from @fsegurai/ngx-markdown 17.0.0 to 18.0.0 by upgrading Angular to 18; the library API is unchanged.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "Angular 18", "17.0.0", "peer dependencies", "Mermaid 11" ]
---

# Upgrading from 17.x

18.0.0 needs Angular 18. The public API of the library is the same as in 17.0.0, so no code changes are required.

## Checklist

- [ ] Upgrade the application to Angular 18 (`ng update @angular/core@18 @angular/cli@18`).
- [ ] Install `@fsegurai/ngx-markdown@18.0.0`. Keep `marked` in the `>= 9.0.0 < 13.0.0` range (for example `^12.0.2`).
- [ ] If you use diagrams, move to `mermaid@^11.3.0` and re-check your diagrams.

## What changed

| Area | 17.0.0 | 18.0.0 |
|------|--------|--------|
| `@angular/common`, `@angular/core`, `@angular/platform-browser` peers | `^17.0.0` | `^18.0.0` |
| `mermaid` (optional) | `^10.9.1` | `^11.3.0` |
| `tslib` dependency | `^2.6.3` | `^2.8.0` |
| `marked` peer | `>= 9.0.0 < 13.0.0` | unchanged |
| `zone.js` peer | `~0.14.7` | unchanged |
| `prismjs`, `clipboard`, `emoji-toolkit`, `katex` (optional) | `^1.29.0`, `^2.0.11`, `^9.0.1`, `^0.16.11` | unchanged |
| Library source | | Lint-only edits; no exported symbol, input, output or default changed. |

## Next step

Check what else this release changed: [What's New in 18.0.0](../help/whats-new.md).
