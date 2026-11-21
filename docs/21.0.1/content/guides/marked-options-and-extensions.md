---
label: Marked Options and Extensions
description: Provide marked options with MARKED_OPTIONS and marked extensions with MARKED_EXTENSIONS, including factories with dependencies.
order: 3
tags: [ "guides", "configuration" ]
keywords: [ "MARKED_OPTIONS", "MARKED_EXTENSIONS", "marked-gfm-heading-id", "useFactory" ]
---

# Marked Options and Extensions

## Options

```typescript
import { MARKED_OPTIONS, provideMarkdown } from '@fsegurai/ngx-markdown';

provideMarkdown({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useValue: { gfm: true, breaks: false, pedantic: false },
  },
});
```

The value is a marked `MarkedOptions` (re-exported by the library). It is merged over the library default, which is a
fresh `MarkedRenderer`. A single call can add more with `parse(text, { markedOptions })` or
`text | markdown : { markedOptions } | async`.

Use a factory when the options need services:

```typescript
markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory, deps: [AnchorService] },
```

## Extensions

```typescript
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { MARKED_EXTENSIONS, provideMarkdown } from '@fsegurai/ngx-markdown';

provideMarkdown({
  markedExtensions: [
    { provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true },
    { provide: MARKED_EXTENSIONS, useFactory: myExtensionFactory, deps: [SomeService], multi: true },
  ],
});
```

Each provider must use `multi: true`. On the first parse with a given renderer, the service calls
`marked.use(...extensions)` and chains each extension's `renderer` methods in front of the renderer's own: when an
extension method returns `false`, the previous method renders.

## Things to know

- The library uses the global `marked` instance, so `marked.use()` calls elsewhere in your app affect it too.
- Since 21.0.0, extension `renderer` overrides are applied (before that they were dropped).
- marked 18 changed some token shapes; check custom extensions after an upgrade.

Next: [Custom Renderer](custom-renderer.md).
