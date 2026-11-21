---
label: Link Handling
description: Route internal links with the Angular Router and open external links in a new tab with routerLinkOptions.
order: 16
tags: [ "features", "content", "links" ]
keywords: [ "routerLinkOptions", "Router", "external links", "disableRouterLinkHandler" ]
---

# Link Handling

`<markdown>` handles clicks on the links of its content. `routerLinkOptions` (`MarkdownRouterLinkOptions`) turns the
handlers on:

```html
<markdown
  [src]="'docs/guide.md'"
  [routerLinkOptions]="{
    internalBrowserHandler: true,
    externalBrowserHandler: true,
    global: { queryParamsHandling: 'preserve' },
    paths: { '/docs': { queryParams: { tab: 'api' } } },
  }" />
```

| Option | Effect |
|--------|--------|
| `internalBrowserHandler` | Navigates with the Angular `Router` for `#fragment`, `/routerLink:/path#fragment`, relative and absolute paths. `/localFile:path` opens `path` in a new tab. |
| `internalDesktopHandler` | Scrolls to the element whose id is the link fragment. |
| `externalBrowserHandler` | Opens external links (`http(s)://`, `www.`, `mailto:`) in a new tab. |
| `global` | `NavigationExtras` for every routed link. |
| `paths` | `NavigationExtras` per path, e.g. `{ '/docs': {…} }`. |

- New tabs get `noopener,noreferrer`.
- Clicks with a modifier key or a non-main button are left to the browser.
- `javascript:`, `data:` and `vbscript:` links are always blocked with an `[ngx-markdown]` warning.
- `disableRouterLinkHandler` turns all handling off.
