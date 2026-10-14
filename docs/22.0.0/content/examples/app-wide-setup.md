---
label: App-wide Setup
description: An app.config.ts that provides every ngx-markdown plugin, Marked options and a Marked extension.
order: 1
tags: [ "examples", "configuration" ]
keywords: [ "app.config.ts", "ApplicationConfig", "all plugins" ]
---

# App-wide Setup

Adapted from the demo application. Load the plugin scripts in `angular.json` first
(see [Installation](../getting-started/installation.md)); Mermaid is loaded on demand here.

```typescript
// app.config.ts
import { provideHttpClient } from '@angular/common/http';
import { type ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import {
  MARKED_EXTENSIONS,
  MARKED_OPTIONS,
  provideMarkdown,
  withClipboard,
  withEmoji,
  withKatex,
  withLightbox,
  withMermaid,
  withMermaidExport,
  withPrism,
} from '@fsegurai/ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { CopyButtonComponent } from './copy-button.component';
import { markedOptionsFactory } from './marked-options-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideMarkdown({
      plugins: [
        withKatex(),
        withMermaid({
          loader: () => import('mermaid').then((m) => m.default),
          config: { layout: 'dagre', look: 'handDrawn' },
        }),
        withMermaidExport(),
        withPrism(),
        withClipboard({ buttonComponent: CopyButtonComponent }),
        withEmoji(),
        withLightbox(),
      ],
      markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory },
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
    }),
  ],
};
```

Then enable plugins where you render:

```html
<markdown [src]="'docs/intro.md'" clipboard katex mermaid mermaidExport emoji lightbox />
```

Prism needs no flag: it is on by default once provided.
