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
| `internalBrowserHandler` | Internal links | Navigates with the Angular `Router`: `#frag` → `router.navigate([], { fragment: 'frag' })`; `/routerLink:` links → `router.navigate([path], extras)` (no `relativeTo`). |
| `internalDesktopHandler` | Internal links | Runs `document.querySelectorAll(href)` and scrolls to the first match, without the Router (for desktop shells). |
| `externalBrowserHandler` | External links | Opens the URL in a new tab with `window.open`. |

Bind `[disableRouterLinkHandler]="true"` to turn the click handler off completely (the bare attribute does not work
in 17.0.0).

## Which links are which

When an internal handler is on, internal links are checked first.

| Kind | Patterns |
|------|----------|
| Internal | `#…`, `/routerLink…`, `../…`, or an `<a>` with a `_ngcontent…` or `data-routerlink` attribute |
| External | `/…` (absolute paths), `http:`, `https:`, `mailto:`, `tel:`, `sms:`, `geo:`, `ftp:`, `file:`, `data:` |

Only clicks whose target is the `<a>` element itself are intercepted. A click on an element inside a link (for
example `<a><code>…</code></a>`) keeps the browser's default behavior.

## `/routerLink:` links

After rendering, the component removes the prefix: `/routerLink:/docs#intro` becomes `href="/docs#intro"` with
`data-routerLink="/docs#intro"`. The attribute makes the link internal. With `internalBrowserHandler`, a click
navigates with `router.navigate(['docs'], extras)` (leading slash removed) and fragment `intro`.

Other internal links (`../…`) have no `data-routerLink`, so `internalBrowserHandler` throws a `TypeError` on click.
With only `externalBrowserHandler` on, a rewritten `/docs#intro` link counts as external and opens in a new tab.
18.1.0 keeps the prefix in `href` and fixes both cases.

## NavigationExtras per path

`global` and `paths` are applied when `internalBrowserHandler` navigates: the entry in `paths` keyed by the link's
full `href` (fragment included) wins, then `global`. A link fragment is written into that extras object.

```html
<markdown
  [src]="'docs/guide.md'"
  [routerLinkOptions]="{
    internalBrowserHandler: true,
    global: { queryParamsHandling: 'preserve' },
    paths: { '/docs#intro': { replaceUrl: true } }
  }" />
```

20.0.0 rewrites this service: it treats absolute paths as internal and stops applying `global` and `paths`.

Type: [MarkdownRouterLinkOptions](../api/types.md).
