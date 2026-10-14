---
label: Marked Options and Extensions
description: Configure Marked with MARKED_OPTIONS and register plain Marked extensions with MARKED_EXTENSIONS.
order: 2
tags: [ "guides", "configuration" ]
keywords: [ "MARKED_OPTIONS", "MARKED_EXTENSIONS", "marked-gfm-heading-id", "gfm" ]
---

# Marked Options and Extensions

## Marked options

Provide `MARKED_OPTIONS` with a value or a factory (factories can use `deps`):

```typescript
import { MARKED_OPTIONS, provideMarkdown } from '@fsegurai/ngx-markdown';

provideMarkdown({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useValue: { gfm: true, breaks: false, pedantic: false },
  },
});
```

A single parse can also pass `markedOptions` in its `ParseOptions`.

## Marked extensions

Plain Marked extensions go in `markedExtensions`, as multi providers of `MARKED_EXTENSIONS`:

```typescript
import { gfmHeadingId } from 'marked-gfm-heading-id';

provideMarkdown({
  markedExtensions: [
    { provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true },
    { provide: MARKED_EXTENSIONS, useFactory: myExtensionFactory, deps: [SomeService], multi: true },
  ],
});
```

They apply to every parse of the service, on its private `Marked` instance only.

## Extension or plugin?

| Use | When |
|-----|------|
| `MARKED_EXTENSIONS` | A plain Marked extension that applies to every parse. |
| A plugin | You also need a per-component toggle (`[plugins]`), merged options, DOM work after render, or a cleanup. |

They work together: plugin `walkTokens` run first, `MARKED_EXTENSIONS` tokenizers are tried before plugin tokenizers,
and `MARKED_EXTENSIONS` renderers stay in the renderer chain. See [Writing a Plugin](writing-a-plugin.md).
