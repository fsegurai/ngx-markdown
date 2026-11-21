---
label: Marked Options and Extensions
description: Provide marked options with MARKED_OPTIONS and marked extensions with MARKED_EXTENSIONS, including factories with dependencies.
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
import { MARKED_EXTENSIONS, provideMarkdown } from '@fsegurai/ngx-markdown';

provideMarkdown({
  markedExtensions: [
    { provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true },
    { provide: MARKED_EXTENSIONS, useFactory: myExtensionFactory, deps: [SomeService], multi: true },
  ],
});
```

Each provider must use `multi: true`; 20.x no longer accepts plain `MarkedExtension` objects in `markedExtensions`.
On the first parse with a given renderer, the service calls `marked.use(...extensions)`.

## Things to know

- The library uses the global `marked` instance, so `marked.use()` calls elsewhere in your app affect it too.
- Extension `renderer` overrides are **not** applied in 20.x: every parse passes the library's own renderer in the
  marked options, which replaces the renderer that `marked.use()` extended. The 21.0.0 release notes name the
  heading ids from `marked-gfm-heading-id` as an affected example; 21.0.0 fixes this.

Next: [Custom Renderer](custom-renderer.md).
