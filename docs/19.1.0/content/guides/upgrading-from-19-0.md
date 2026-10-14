---
label: Upgrading from 19.0
description: Move an application from @fsegurai/ngx-markdown 19.0.0 to 19.1.0; templates keep working, code that touched component internals may not.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "19.1.0", "inject()", "ngx-markdown selector", "signal inputs" ]
---

# Upgrading from 19.0

19.1.0 keeps every peer and optional dependency range of 19.0.0. Templates and `provideMarkdown()` configs work
unchanged; the internals moved from constructor injection to `inject()`.

## Checklist

- [ ] Bump `@fsegurai/ngx-markdown` to `19.1.0`.
- [ ] Stop reading `markdownService`, `element`, `viewContainerRef` or `router` from a `MarkdownComponent` instance.
- [ ] Check custom code that subclasses `MarkdownComponent`, `MarkdownService` or the pipes.
- [ ] Expect `Copied!` instead of `Copied` on the default copy button.

## What changed

| Area | 19.0.0 | 19.1.0 |
|------|--------|--------|
| Selectors | `markdown`, `[markdown]` | `ngx-markdown`, `markdown`, `[markdown]` |
| `MarkdownComponent` fields | `markdownService`, `element`, `viewContainerRef`, `router` are public constructor parameters | private fields set with `inject()` |
| `routerLinkOptions`, `disableRouterLinkHandler` | `@Input()` | signal `input()` (template binding unchanged) |
| `error`, `load` | `@Output()` `EventEmitter` | `output()` (`ready` stays an `EventEmitter`) |
| `MarkdownService`, `MarkdownPipe`, `MarkdownLinkService` | constructor injection | `inject()`; subclasses no longer pass dependencies to `super()` |
| `MarkdownPipe`, `LanguagePipe` | `standalone: true` | standalone by Angular 19 default |
| Default copy button | `buttonTextCopied = 'Copied'` | `'Copied!'` |
| `MarkdownPipe` | always waits for `NgZone.onStable` | same, with a direct `render()` fallback when no `NgZone` is injected |

## Next step

Configure the library: [Marked Options and Extensions](marked-options-and-extensions.md).
