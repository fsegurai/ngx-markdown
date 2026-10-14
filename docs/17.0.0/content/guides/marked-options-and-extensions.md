---
label: Marked Options and Extensions
description: Provide marked options with MARKED_OPTIONS, including factories with dependencies, and marked extensions as a plain array.
order: 2
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
import { provideMarkdown } from '@fsegurai/ngx-markdown';

provideMarkdown({
  markedExtensions: [gfmHeadingId(), myExtension()],
});
```

`markedExtensions` is a plain `MarkedExtension[]`. `provideMarkdown()` always registers it as one provider,
`{ provide: MARKED_EXTENSIONS, useValue: markedExtensions ?? [] }`, so an extension cannot get services through
`deps` in 17.0.0 (19.2.0 adds provider entries). On the first parse with a given renderer, the service calls
`marked.use(...extensions)`. Then, on every parse, it registers your renderer with `marked.use({ renderer })`; see
[Custom Renderer](custom-renderer.md#how-the-renderer-reaches-marked).

## Things to know

- The library uses the global `marked` instance, so `marked.use()` calls elsewhere in your app affect it too.
- Extension `renderer` overrides **are** applied in 17.0.0: the service removes `renderer` from the options it
  passes to marked, so heading ids from `marked-gfm-heading-id` work. A renderer method you set with the same name
  wins. 18.1.0 changes this (overrides stop applying until 21.0.0).
- `parse()` does not await async marked output (`async: true` or async extensions) before sanitizing; 20.0.0 fixes
  this. Keep extensions synchronous in 17.0.0.
- Extensions must support marked 9 to 12 (the `marked` peer range of this release).
- 20.0.0 accepts only providers in `markedExtensions`; plan the change when you upgrade.

Next: [Custom Renderer](custom-renderer.md).
