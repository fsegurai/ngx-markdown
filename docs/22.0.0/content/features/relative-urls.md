---
label: Relative URLs
description: Resolve relative links and images against the src file or a base URL with srcRelativeLink and baseUrl.
order: 15
tags: [ "features", "content", "links" ]
keywords: [ "baseUrl", "srcRelativeLink", "images", "resolve" ]
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
