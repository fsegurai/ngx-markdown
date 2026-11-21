---
label: Follow a Light/Dark Theme
description: Redraw Mermaid diagrams when the app theme changes, without parsing the Markdown again.
order: 5
tags: [ "guides", "diagrams", "theming" ]
keywords: [ "mermaidOptions", "rerenderMermaid", "dark mode", "computed" ]
---

# Follow a Light/Dark Theme

`mermaidOptions` is the one rendering input that is tracked. Bind it to a `computed` of your theme:

```typescript
import { computed, inject } from '@angular/core';
import type { MermaidAPI } from '@fsegurai/ngx-markdown';

private readonly theme = inject(ThemeService); // your service, with an `isDark` signal

readonly mermaidOptions = computed<MermaidAPI.MermaidConfig>(() =>
  this.theme.isDark() ? { theme: 'dark', darkMode: true } : { theme: 'default', darkMode: false },
);
```

```html
<markdown [src]="'docs/flow.md'" mermaid [mermaidOptions]="mermaidOptions()" />
```

## What happens on a change

1. The new value is compared by content; an equal value does nothing.
2. Only the `.mermaid` diagrams are drawn again from their kept sources: code highlighting, clipboard buttons, KaTeX and
   the scroll position stay.
3. `ready` emits again, or `error` with a `MermaidRenderError`.

Changes in a row are coalesced (the latest wins). A change before the first render, or while Mermaid is disabled, does
nothing; a change while new content loads applies to that render.

## Without the component

With the pipe, `render()`, or a global theme switch, redraw the element yourself:

```typescript
await markdownService.rerenderMermaid(element, { mermaidOptions: { theme: 'dark', darkMode: true } });
```

It needs `withMermaid()` (otherwise it throws `ERROR_MERMAID_NOT_PROVIDED`). Pass `mermaidExport: true` and a
`ViewContainerRef` to recreate the export buttons. A re-render never reads the SVG cache, so it also fixes a diagram
drawn before the web fonts loaded.
