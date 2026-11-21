---
label: Relative URLs
description: Resolve relative links and images against the src file or a base URL with srcRelativeLink and baseUrl.
order: 15
tags: [ "features", "content", "links" ]
keywords: [ "baseUrl", "srcRelativeLink", "images", "resolveUrl", "BaseUrlResolver" ]
---

# Relative URLs

By default relative URLs resolve against the page. Two inputs change that:

```html
<!-- ![](img.png) in docs/guide/intro.md loads docs/guide/img.png -->
<markdown src="docs/guide/intro.md" srcRelativeLink />

<!-- any content: data, src or projected -->
<markdown [data]="markdown" baseUrl="https://cdn.example.com/docs/" />

<div [innerHTML]="markdown | markdown: { baseUrl: 'docs/' } | async"></div>
```

`baseUrl` wins over `srcRelativeLink`. End a folder with `/`, as with `<base href>`: `docs/guide` is a file, so URLs
resolve against `docs/`.

| URL in the content | `baseUrl="https://example.com/docs/guide/"` | `baseUrl="docs/guide/"` |
|--------------------|---------------------------------------------|-------------------------|
| `img.png`, `./img.png` | `https://example.com/docs/guide/img.png` | `docs/guide/img.png` |
| `../img.png` | `https://example.com/docs/img.png` | `docs/img.png` |
| `/assets/img.png` | `https://example.com/assets/img.png` | unchanged |
| `https://…`, `mailto:…`, `#section`, `//cdn…` | unchanged | unchanged |

- Covers Markdown links and images, raw HTML `<a href>` and `<img src>`. Other raw HTML (`srcset`, `<video>`) is left
  as is.
- A `baseUrl` with a scheme other than `http:`/`https:` is ignored.
- URLs resolve before rendering, so custom `link`/`image` renderers receive the resolved `href`.
- There is no global default; set it where the content comes from.

## Per-URL decisions (`resolveUrl`, 22.1.0)

To decide each URL yourself (a Markdown target to an app route, a sample folder to a playground URL), pass a
`resolveUrl` function in the `baseUrl` options of `[plugins]` (or of the `plugins` option of the pipe and
`MarkdownService.parse()`). It runs during the parse, also on the server, with no DOM walk after `ready`:

```typescript
import type { BaseUrlResolver } from '@fsegurai/ngx-markdown';

readonly resolveDocsUrl: BaseUrlResolver = (url, { kind, standalone }) => {
  if (kind === 'link' && url.endsWith('.md')) return `/docs/${url.slice(0, -3)}`;
  if (kind === 'link' && url.startsWith('playground/')) {
    return { href: `/playground/${url.slice(11)}`, attrs: standalone ? { class: 'playground-card' } : {} };
  }
  return undefined; // falls back to `url` / `[baseUrl]`
};
```

```html
<markdown [src]="page" baseUrl="https://cdn.example.com/docs/" [plugins]="{ baseUrl: { resolveUrl: resolveDocsUrl } }" />
```

- Called with the URL as written and `{ kind, token, baseUrl, standalone }` for every link `href` and image `src`
  (Markdown and raw `<a>` / `<img>`), absolute URLs and fragments included.
- Returns the new URL, `{ href, attrs }` to also add attributes to the tag, or `undefined` to fall back to `baseUrl`.
  Attribute values are escaped; invalid names and the tag's own URL attribute are ignored, but names such as
  `onclick` are not filtered, so return only attributes you trust.
- Angular's default sanitizer removes attributes it does not know (e.g. `data-*`): keep them with
  [`withDomPurify()`](sanitization.md) or `SecurityContext.NONE` for trusted content.
