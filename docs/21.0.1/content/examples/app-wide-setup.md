---
label: App-wide Setup
description: A zoneless standalone application that configures every ngx-markdown token, modeled on the 21.0.1 demo.
order: 1
tags: [ "examples", "configuration" ]
keywords: [ "ApplicationConfig", "zoneless", "MERMAID_OPTIONS", "gfmHeadingId" ]
---

# App-wide Setup

The demo application's configuration, trimmed to the Markdown parts.

```typescript
// app.config.ts
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  CLIPBOARD_OPTIONS, MARKED_EXTENSIONS, MARKED_OPTIONS, MERMAID_OPTIONS, provideMarkdown,
} from '@fsegurai/ngx-markdown';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { routes } from './app.routes';
import { markedOptionsFactory } from './marked-options-factory';
import { AnchorService } from './shared/anchor.service';
import { ClipboardButtonComponent } from './shared/clipboard-button.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideMarkdown({
      loader: HttpClient,
      clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: ClipboardButtonComponent } },
      markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory, deps: [AnchorService] },
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
      mermaidOptions: { provide: MERMAID_OPTIONS, useValue: { darkMode: true, look: 'handDrawn' } },
      sanitize: SecurityContext.NONE,
    }),
  ],
};
```

```html
<!-- a page -->
<markdown
  [src]="'docs/guide.md'"
  clipboard
  katex
  mermaid
  emoji
  [routerLinkOptions]="{ internalBrowserHandler: true, externalBrowserHandler: true }"
  (error)="onError($event)" />
```

Notes:

- `sanitize: SecurityContext.NONE` is fine for the demo's own files. Keep the default for user content.
- `loader: HttpClient` is optional in Angular 21.
- Each plugin's script must be in `angular.json`; see [Installation](../getting-started/installation.md).
- `CLIPBOARD_OPTIONS` does not reach `<markdown>` in 21.x; see [Copy to Clipboard](../features/clipboard.md).
