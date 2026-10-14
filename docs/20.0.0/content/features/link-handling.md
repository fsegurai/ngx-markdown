---
label: Link Handling
description: Route internal Markdown links through the Angular Router and open external links in a new tab with routerLinkOptions.
order: 5
tags: [ "features", "links" ]
keywords: [ "routerLinkOptions", "MarkdownRouterLinkOptions", "Angular Router", "external links" ]
---

# Link Handling

By default, links in rendered Markdown behave like plain HTML links. Set `routerLinkOptions` to intercept clicks.

```html
<markdown
  [src]="'docs/guide.md'"
  [routerLinkOptions]="{ internalBrowserHandler: true, externalBrowserHandler: true }" />
```

## Handlers

| Option | Clicks it takes over | What happens |
|--------|----------------------|--------------|
| `internalBrowserHandler` | Internal links | Navigates with the Angular `Router`: `#frag` → `router.navigate([], { fragment: 'frag' })`; `/path#frag` → `router.navigate(['/path'], { fragment: 'frag' })` (no `relativeTo`). |
| `internalDesktopHandler` | Internal links | Scrolls to the element whose `id` matches the link, without the Router (for desktop shells). |
| `externalBrowserHandler` | External links | Opens the URL in a new tab with `window.open`. |

`disableRouterLinkHandler` turns the click handler off completely.

## Which links are which

| Kind | Patterns |
|------|----------|
| External | `http(s)://`, `www.`, `ftp(s)://`, `mailto:`, `tel:`, `sms:`, `geo:`, `file://`, `data:` |
| Internal | `#…`, `/…`, `./…`, `../…`, `/routerLink:…`, `/localFile:…` |

Two prefixes are special with `internalBrowserHandler`:

- `/routerLink:/docs#intro` navigates to `/docs` with fragment `intro`. After rendering, such links also get
  `routerLink`, `data-routerLink` and `fragment` attributes.
- `/localFile:assets/file.pdf` opens `assets/file.pdf` in a new tab.

## Known limitation in 20.x

`MarkdownRouterLinkOptions` declares `global` and `paths` (per-path `NavigationExtras`), and the demo passes them, but
the 20.x link service never forwards them to its navigation helper. Navigation uses only the fragment. Do not rely on
`global` or `paths` in this release. They were applied in 19.x, before the 20.0.0 link service rewrite.

Type: [MarkdownRouterLinkOptions](../api/types.md).
