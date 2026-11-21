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
| `internalBrowserHandler` | Internal links | Navigates with the Angular `Router`: `#frag` → `router.navigate([], { fragment: 'frag' })`; other paths → `router.navigate([path], extras)` (no `relativeTo`). |
| `internalDesktopHandler` | Internal links | Runs `document.querySelectorAll(href)` and scrolls to the first match, without the Router (for desktop shells). |
| `externalBrowserHandler` | External links | Opens the URL in a new tab with `window.open`. |

Bind `[disableRouterLinkHandler]="true"` to turn the click handler off completely (the bare attribute does not work
in 18.x).

## Which links are which

Internal links are checked first.

| Kind | Patterns |
|------|----------|
| Internal | `#…`, `/routerLink…`, `../…`, or an `<a>` with an Angular attribute (`_ngcontent…`, `data-routerlink`, `routerlink`) |
| External | `/…` (absolute paths), `/localFile:…`, `http:`, `https:`, `www.`, `ftp:`, `ftps:`, `mailto:`, `tel:`, `sms:`, `geo:`, `file:`, `data:` |

Only clicks whose target is the `<a>` element itself are intercepted. A click on an element inside a link (for
example `<a><code>…</code></a>`) keeps the browser's default behavior.

Two prefixes are special:

- `/routerLink:/docs#intro` navigates to `/docs` with fragment `intro` (`internalBrowserHandler`). After rendering,
  such links also get `routerLink`, `data-routerLink` and `fragment` attributes.
- `/localFile:assets/file.pdf` opens `assets/file.pdf` in a new tab (`externalBrowserHandler`).

## NavigationExtras per path

`global` and `paths` are applied when `internalBrowserHandler` navigates to a path: the entry in `paths` for that
path wins, then `global`. A link fragment is written into that extras object.

```html
<markdown
  [src]="'docs/guide.md'"
  [routerLinkOptions]="{
    internalBrowserHandler: true,
    global: { queryParamsHandling: 'preserve' },
    paths: { '/docs': { replaceUrl: true } }
  }" />
```

20.0.0 rewrites this service: it treats absolute paths as internal and stops applying `global` and `paths`.

Type: [MarkdownRouterLinkOptions](../api/types.md).
