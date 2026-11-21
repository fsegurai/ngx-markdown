---
label: Marked Extended
description: Plug @fsegurai/marked-extended packages (tabs, alerts, code groups, footnotes) into ngx-markdown with withMarkedExtended().
order: 12
tags: [ "features", "plugins", "extensions" ]
keywords: [ "withMarkedExtended", "marked-extended", "extendedEvent", "attach runtime" ]
---

# Marked Extended

`withMarkedExtended(features, options?)` integrates the
[`@fsegurai/marked-extended-*`](https://github.com/fsegurai/marked-extensions) 19.0.0-beta.0+ packages.
ngx-markdown has **no dependency** on them: install the ones you use and pass their objects in.

```typescript
import { provideMarkdown, withMarkedExtended, withPrism } from '@fsegurai/ngx-markdown';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedCode, { attachCode, wrapLines } from '@fsegurai/marked-extended-code';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';

provideMarkdown({
  plugins: [
    withPrism(),
    withMarkedExtended([
      { name: 'alert', extension: markedExtendedAlert() },
      { name: 'tabs', extension: markedExtendedTabs(), attach: attachTabs, options: { persistSelection: true } },
      { name: 'code', extension: markedExtendedCode(), attach: attachCode, options: { lineClasses: false }, afterHighlight: wrapLines },
    ]),
  ],
});
```

## A feature

`MarkedExtendedFeature` is `{ name?, extension?, attach?, options?, afterHighlight? }`. A bare runtime, such as a
bundle's `attachAll`, is a feature too.

| Field | Used for |
|-------|----------|
| `extension` | Marked extension(s), applied in every parse the plugin is enabled in. |
| `attach` | The browser runtime (`attachX(root, options)`), attached after the HTML is inserted. |
| `options` | What `attach` receives (replaced by `runtimes[name]`). |
| `afterHighlight` | Runs on each code block after Prism, e.g. `wrapLines`. |
| `name` | Key in `runtimes`; defaults to the runtime name. |

## Behavior

- **Parse:** `extensions`, `walkTokens`, `renderer`/`tokenizer` overrides, `async`, `hooks.preprocess` and
  `hooks.postprocess` (before the sanitizer) apply to that parse only. Other fields are ignored with a dev-mode warning.
- **Sanitizer-safe:** the 19.x markup uses only classes, `aria-*`, `role`, `hidden` and `open`, so the default
  sanitizer keeps it.
- **Runtimes (browser only):** refreshed on re-render, disposed on cleanup and destroy.
- **Prism:** per-block class tokens (`mx-code-ln`, `mx-code-start-N`, `mx-code-highlight-…`) override the Prism
  options for that block.
- **Clipboard:** titled blocks show the title in the toolbar; removed diff lines are skipped (`skipRemovedLines`).

## Per component

Enabled by default once provided.

```html
<markdown [data]="markdown" (extendedEvent)="onEvent($event)" />
<markdown [data]="markdown" [plugins]="{ markedExtended: false }" />
<markdown [data]="markdown" [plugins]="{ markedExtended: { runtimes: { tabs: false } } }" />
```

`extendedEvent` emits `{ type, detail, event }` for the names in `MARKED_EXTENDED_EVENTS` plus the `events` option.
It is emitted during dispatch, so `event.preventDefault()` cancels a cancelable event such as
`marked-extended:tabs:before-switch`.
