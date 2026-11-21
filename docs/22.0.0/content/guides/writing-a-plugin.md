---
label: Writing a Plugin
description: Build your own hook-based Markdown plugin with MarkdownPlugin and withMarkdownPlugin(), then enable it per component.
order: 4
tags: [ "guides", "plugins" ]
keywords: [ "MarkdownPlugin", "withMarkdownPlugin", "hooks", "render hook" ]
---

# Writing a Plugin

A plugin is a plain `MarkdownPlugin<Options>` object. Every hook is optional.

## Example: external links in a new tab

```typescript
import { type MarkdownPlugin, type MarkdownPluginFeature, withMarkdownPlugin } from '@fsegurai/ngx-markdown';

interface ExternalLinksOptions {
  target?: string;
  rel?: string;
}

const externalLinksPlugin: MarkdownPlugin<ExternalLinksOptions> = {
  name: 'externalLinks',
  defaults: { target: '_blank', rel: 'noopener noreferrer' },
  render(element, { options }) {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="http://"], a[href^="https://"]'));
    for (const link of links) {
      link.setAttribute('target', options.target ?? '_blank');
      link.setAttribute('rel', options.rel ?? 'noopener noreferrer');
    }
    return () => {
      for (const link of links) {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    };
  },
};

export function withExternalLinks(options?: ExternalLinksOptions): MarkdownPluginFeature {
  return withMarkdownPlugin(externalLinksPlugin, options);
}
```

```typescript
provideMarkdown({ plugins: [withExternalLinks({ rel: 'noopener' })] });
```

```html
<markdown [data]="markdown" [plugins]="{ externalLinks: true }" />
```

## Hook order

| # | Hook | Receives |
|---|------|----------|
| 0 | `validate(ctx)` | Runs first for every enabled plugin; throw when the parse cannot run. |
| 1 | `preprocess(markdown, ctx)` | The Markdown text. |
| 2 | `markedExtensions(ctx)` | Returns per-parse Marked extensions (`walkTokens`, `renderer`, `tokenizer`, `async`). |
| 3 | `postprocess(html, ctx)` | Marked's HTML, **before** the sanitizer. |
| 4 | `postSanitize(html, ctx)` | Sanitized HTML. What you insert is **not** sanitized: escape it. |
| 5 | `render(element, ctx)` | The element with the inserted HTML; may return a cleanup (or a Promise of one). |
| - | `afterHighlight(code, ctx)` | Each code block once highlighted (browser). |
| 6 | `cleanup(element)` | Before the next render, on `cleanup()` and on destroy. |

`tokenizerExtensions` add new token types (registered once, active only where the plugin is enabled). `rerender` runs
on partial re-renders such as `rerenderMermaid()`.

A plugin with a `render` hook makes every `data`/`src` change of `<markdown>` a whole render, unless it declares
`incremental: true`: its `render` then also runs on the new top-level nodes alone (`ctx.nodes`) when only some blocks
changed, and must enhance only those. See [Incremental plugins](../api/plugin-api.md#incremental-plugins).

## Ordering and options

- Plugins run in order: core built-ins, `enforce: 'pre'`, no `enforce`, `enforce: 'post'`, each in registration order.
  A plugin runs after the plugins it `requires`.
- Options merge in this order, `undefined` never overriding: `defaults`, `withX(options)`, the `[plugins]` record
  object, then specific inputs. `nestedOptions` merge key by key; `exclusiveOptions` replace each other.
- `enabledByDefault: true` runs it without enabling it per component.

## Context

Every hook gets `options`, `platform` (`'browser' | 'server'`), `injector`, `state` (per parse or render) and
`serviceState` (per service). The `render` context adds `signal`, `viewContainerRef`, `nodes` (incremental updates),
`onCleanup(fn, node?)` (with `node`, the cleanup goes with that node in incremental updates), `isEnabled(name)`, `afterHighlight(code)` and `afterHighlightAll()`.

`withMarkdownPlugin(plugin, options?, providers?)` returns the feature; the third argument adds providers your plugin
reads through `ctx.injector`. Full types are in [Plugin API](../api/plugin-api.md).
