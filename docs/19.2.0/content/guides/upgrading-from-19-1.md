---
label: Upgrading from 19.1
description: Move an application from @fsegurai/ngx-markdown 19.1.0 to 19.2.0; the update is additive, with one typing change for MARKED_EXTENSIONS.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "19.2.0", "MARKED_EXTENSIONS", "dependency injection", "markedExtensions" ]
---

# Upgrading from 19.1

19.2.0 is a minor release. Existing `markedExtensions: [extension()]` configurations keep working.

## Checklist

- [ ] Bump `@fsegurai/ngx-markdown` to `19.2.0`. Angular (`^19.0.0`), `marked` and `zone.js` ranges are unchanged.
- [ ] Optional plugins: `katex ^0.16.21` (was `^0.16.11`). `rxjs` now lists `^7.8.2` (was `^7.8.1`).
- [ ] If you inject `MARKED_EXTENSIONS` yourself, update its type (see below).
- [ ] Optional: move extensions that need services to providers.

## What changed

| Area | 19.1.0 | 19.2.0 |
|------|--------|--------|
| `markedExtensions` | `MarkedExtension[]` | `(MarkedExtension \| MultiTypedProvider<typeof MARKED_EXTENSIONS>)[]` |
| `MARKED_EXTENSIONS` | `InjectionToken<MarkedExtension[]>`, one array value | `InjectionToken<MarkedExtension>`, one `multi: true` provider per extension |
| New exports | - | `isTypedProvider()`, `getMarkedExtensionProvider()` |
| Source layout | flat `lib/src/` | `clipboard-button/`, `configuration/`, `markdown/`, `pipes/`, `services/` (public exports unchanged) |

Injecting the token still yields an array, because Angular collects `multi` providers into one:

```typescript
const extensions = inject(MARKED_EXTENSIONS, { optional: true }) as MarkedExtension[] | null;
```

## Extensions with dependencies

```typescript
provideMarkdown({
  markedExtensions: [
    gfmHeadingId(),
    { provide: MARKED_EXTENSIONS, useFactory: (anchors: AnchorService) => anchorExtension(anchors), deps: [AnchorService], multi: true },
  ],
});
```

See [Marked Options and Extensions](marked-options-and-extensions.md). Planning the 20.x move? 20.0.0 accepts
providers only.
