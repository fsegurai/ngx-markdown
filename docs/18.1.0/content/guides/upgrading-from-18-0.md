---
label: Upgrading from 18.0
description: Move an application from @fsegurai/ngx-markdown 18.0.0 to 18.1.0 with marked 13 or 14, token-based renderers and reworked link handling.
order: 1
tags: [ "guides", "upgrade" ]
keywords: [ "18.1.0", "marked 14", "MarkedToken", "routerLink", "localFile" ]
---

# Upgrading from 18.0

18.1.0 keeps Angular 18 but needs marked 13 or 14. Custom renderer methods must take marked's token objects.

## Checklist

- [ ] Install `@fsegurai/ngx-markdown@18.1.0` and `marked@^14.1.3`.
- [ ] Rewrite custom renderer methods to take one token object (`MarkedToken.*`) instead of positional arguments.
- [ ] Rename Mermaid keys: `journey` → `journeyUser`, `git` → `gitGraph`.
- [ ] Re-test marked extensions that override renderer methods (see below).
- [ ] Re-test links if you use `routerLinkOptions`.

## What changed

| Area | 18.0.0 | 18.1.0 |
|------|--------|--------|
| `marked` peer | `>= 9.0.0 < 13.0.0` | `>= 13.0.0 < 15.0.0` |
| `mermaid` (optional) | `^11.3.0` | `^11.4.0` |
| Renderer methods | positional arguments, e.g. `heading(text, level)` | one token object, e.g. `heading({ text, depth }: MarkedToken.Heading)` |
| `MarkedToken` export | none | marked's `Tokens` namespace |
| `MarkdownService.parseInline()` | none | `parseInline(markdown, options?)`, not sanitized |
| Extension renderer overrides | applied: the service removed `renderer` from the options passed to marked | not applied: the library's renderer is passed to marked and replaces the extended one |
| `MermaidAPI.Config` | `journey`, `git`, `themeVariables: any` | `journeyUser`, `gitGraph`, typed `ThemeVariables`, plus `entityRelationship`, `quadrant`, `c4`, `mindmap`, `timeline`, `zenUML`, `sankey`, `xy`, `block`, `packet`, `kanban`, `architecture` |
| `/routerLink:` links | prefix removed from `href` after rendering | prefix kept in `href`; `routerLink`, `data-routerLink` and `fragment` attributes added |
| External link patterns | `/…`, `http:`, `https:`, `mailto:`, `tel:`, `sms:`, `geo:`, `ftp:`, `file:`, `data:` | adds `www.`, `ftps:` and `/localFile:`; `/routerLink:` is no longer external |
| Internal link attributes | `_ngcontent…`, `data-routerlink` | adds `routerlink` |
| `paths` lookup | by the full `href` (with fragment) | by the path without fragment |

## Renderer methods

```typescript
// 18.0.0
renderer.heading = (text: string, level: number) => `<h${level}>${text}</h${level}>`;

// 18.1.0
renderer.heading = ({ text, depth }: MarkedToken.Heading) => `<h${depth}>${text}</h${depth}>`;
```

## Extension renderers

In 18.0.0 the service deleted `renderer` from the marked options before calling marked, so renderer overrides from
`markedExtensions` (for example heading ids from `marked-gfm-heading-id`) were applied. 18.1.0 no longer does, so
those overrides are replaced by the library's renderer. Override the renderer method yourself; see
[Custom Renderer](custom-renderer.md). 21.0.0 fixes this.

## Next step

Configure the library: [Marked Options and Extensions](marked-options-and-extensions.md).
