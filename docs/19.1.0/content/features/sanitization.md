---
label: Sanitization
description: How @fsegurai/ngx-markdown 19.1.0 sanitizes rendered HTML with Angular's DomSanitizer, and how to change or skip it.
order: 4
tags: [ "features", "security" ]
keywords: [ "DomSanitizer", "SecurityContext", "disableSanitizer", "XSS" ]
---

# Sanitization

Sanitizing is on by default: the HTML produced by marked goes through Angular's
`DomSanitizer.sanitize(SecurityContext.HTML, html)` before it reaches the DOM.

## Change it app-wide

```typescript
import { SecurityContext } from '@angular/core';

provideMarkdown();                                    // SecurityContext.HTML (default)
provideMarkdown({ sanitize: SecurityContext.NONE });  // no sanitizing
```

`sanitize` takes a `SecurityContext` only and is stored in the `SECURITY_CONTEXT` token.

## Skip it for one render

```html
<markdown [data]="trustedMarkdown" disableSanitizer />
<div [innerHTML]="trustedMarkdown | markdown : { disableSanitizer: true } | async"></div>
```

Only skip sanitizing for content you trust. The pipe always marks its result as trusted HTML
(`bypassSecurityTrustHtml`), so the sanitizing above is the only one applied.

## What sanitizing removes

Angular's HTML sanitizer drops `<script>`, `<style>`, inline event handlers and `style` attributes, and unsafe URLs.
KaTeX and Mermaid run after sanitizing, on the DOM, so their output is not affected. The Prism plugin `data-*`
attributes and clipboard toolbars are added after sanitizing too.

## `parseInline()`

`MarkdownService.parseInline()` calls `marked.parseInline` directly and does **not** sanitize. Use `parse(text,
{ inline: true })` for sanitized inline output.
