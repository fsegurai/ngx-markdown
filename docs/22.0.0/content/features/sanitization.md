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
