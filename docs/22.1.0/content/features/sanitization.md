---
label: Sanitization
description: How rendered HTML is sanitized by default and how to switch to a custom sanitizer or turn it off.
order: 4
tags: [ "features", "security" ]
keywords: [ "SANITIZE", "SecurityContext", "DOMPurify", "disableSanitizer" ]
---

# Sanitization

Rendered HTML is sanitized by default with Angular's `DomSanitizer` and `SecurityContext.HTML`, even without
`provideMarkdown()`.

```typescript
import { SecurityContext } from '@angular/core';
import DOMPurify from 'dompurify';

provideMarkdown();                                          // default: SecurityContext.HTML
provideMarkdown({ sanitize: SecurityContext.NONE });        // off: trusted content only
provideMarkdown({ sanitize: (html) => DOMPurify.sanitize(html) }); // your own sanitizer
```

> A sanitize function replaces Angular's sanitizer. Whatever it returns is inserted in the page, so it **must** return
> safe HTML.

## DOMPurify on demand (`withDomPurify()`, 22.1.0)

`withDomPurify()` sanitizes with a private DOMPurify instance loaded on demand (Mermaid's shared one is left
untouched), and keeps the heading slug `id`s DOMPurify's clobbering check would drop (`## Links`, `## Plugins`):

```typescript
import { provideMarkdown, withDomPurify } from '@fsegurai/ngx-markdown';

provideMarkdown({
  plugins: [
    withDomPurify({
      purify: () => import('dompurify'), // optional peer dependency
      forbidTags: ['iframe', 'frame', 'object', 'embed', 'form', 'base', 'meta', 'link'],
      forbidAttr: ['formaction', 'srcdoc'],
    }),
  ],
});
```

| Option | Default | Description |
|--------|---------|-------------|
| `purify` | — | Loads DOMPurify, in the browser, before the first parse; kept for the page, retried after a failed load. |
| `keepHeadingIds` | `true` | Keeps the slug `id`s of `h1`…`h6` that match a `document` property. |
| `forbidTags` / `forbidAttr` | — | DOMPurify's `FORBID_TAGS` / `FORBID_ATTR`. |
| `config` | — | Other DOMPurify settings (`ALLOWED_URI_REGEXP`, `ADD_TAGS`…); the output is always a string. |

- The first parse in the browser waits for DOMPurify (`MarkdownService.parse()` returns a Promise; `<markdown>` and
  the pipe wait for it). Until it is loaded, and on the server, the HTML goes through Angular's sanitizer.
- An explicit `sanitize` option wins over `withDomPurify()` (DOMPurify is then not loaded).

## Per component

Per component or pipe, `disableSanitizer` skips it for that content:

```html
<markdown [data]="trustedMarkdown" [disableSanitizer]="true" />
<div [innerHTML]="trustedMarkdown | markdown: { disableSanitizer: true } | async"></div>
```

## Things the sanitizer changes

| Content | Effect with `SecurityContext.HTML` | Fix |
|---------|-----------------------------------|-----|
| Heading `id` attributes | Removed | A sanitize function that keeps `id`, or `SecurityContext.NONE` for trusted content. |
| `data-*` attributes | Removed | The Prism attributes are set after sanitizing, at render time. |
| KaTeX output | Would be stripped | Inserted **after** sanitizing, in place of `<span class="ngx-katex-…">` placeholders. |

With a custom sanitizer and KaTeX, keep empty `<span>` elements and their `class`. Dropped placeholders are logged once
per parse with an `[ngx-markdown]` warning.

## Related tokens

- `SANITIZE` holds the setting (`SecurityContext | SanitizeFunction`).
- `SECURITY_CONTEXT` is **deprecated** (removed in v23). A provider of it is still honoured when `sanitize` is unset.

See also [Mermaid security](mermaid.md#security) and KaTeX's `trust` option in [Math with KaTeX](katex.md).
