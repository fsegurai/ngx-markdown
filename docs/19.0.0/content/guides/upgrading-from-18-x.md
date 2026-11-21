---
label: Upgrading from 18.x
description: Move an application from @fsegurai/ngx-markdown 18.1.0 to 19.0.0 with Angular 19, marked 15 and the new Mermaid config types.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "19.0.0", "Angular 19", "marked 15", "MERMAID_OPTIONS", "MermaidConfig" ]
---

# Upgrading from 18.x

19.0.0 needs Angular 19 and marked 15. Templates keep working. Code that types Mermaid options must move from
`MermaidAPI.Config` to `MermaidAPI.MermaidConfig`.

## Checklist

- [ ] Update the application to Angular 19 (`ng update @angular/core@19 @angular/cli@19`).
- [ ] Update `zone.js` to `~0.15.0`.
- [ ] Install `@fsegurai/ngx-markdown@19.0.0` and `marked@^15.0.2`.
- [ ] Update `mermaid` to `^11.4.1` if you use diagrams.
- [ ] Replace `MermaidAPI.Config` with `MermaidAPI.MermaidConfig`, and enum values with string literals.
- [ ] Optional: move shared Mermaid settings into `provideMarkdown({ mermaidOptions })`.
- [ ] Re-test custom renderers and marked extensions with marked 15.

## What changed

| Area | 18.1.0 | 19.0.0 |
|------|--------|--------|
| Angular peers | `^18.0.0` | `^19.0.0` |
| `zone.js` peer | `~0.14.7` | `~0.15.0` |
| `marked` peer | `>= 13.0.0 < 15.0.0` | `>= 15.0.0 < 16.0.0` |
| `mermaid` (optional) | `^11.4.0` | `^11.4.1` |
| Mermaid types | `MermaidAPI.Config` with `SecurityLevel`, `Theme` and `LogLevel` enums | `MermaidAPI.MermaidConfig` and per-diagram config interfaces, string literal unions |
| App-wide Mermaid config | none | `MERMAID_OPTIONS` token, set with `mermaidOptions` |
| `MarkdownModuleConfig` providers | `clipboardOptions` and `markedOptions` are any `Provider` | typed: `{ provide: <token>, useValue }` or `{ provide: <token>, useFactory, deps? }` |
| Component and pipe metadata | `standalone: true` on `MarkdownComponent` and `ClipboardButtonComponent` | standalone by Angular 19 default (the pipes still declare `standalone: true`) |
| `MarkedOptions`, `MarkedToken` exports | value re-exports | type-only re-exports (`export type`) |

## Mermaid types

```typescript
// 18.x
const options: MermaidAPI.Config = { theme: MermaidAPI.Theme.Dark, securityLevel: MermaidAPI.SecurityLevel.Loose };

// 19.0.0
const options: MermaidAPI.MermaidConfig = { theme: 'dark', securityLevel: 'loose' };
```

The enums are gone. Keys typed as `any` in 18.x (`class`, `state`, `pie`, …) now have their own config interfaces.

## Typed providers

`clipboardOptions`, `markedOptions` and `mermaidOptions` must provide their own token. A provider for another token,
or a value of the wrong type, is now a compile error:

```typescript
provideMarkdown({
  markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory, deps: [AnchorService] },
  mermaidOptions: { provide: MERMAID_OPTIONS, useValue: { look: 'handDrawn' } },
});
```

`useClass` and `useExisting` providers are no longer accepted for these keys. `loader` is still any `Provider`.

## Next step

Configure the library: [Marked Options and Extensions](marked-options-and-extensions.md).
