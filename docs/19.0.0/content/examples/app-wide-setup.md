---
label: App-wide Setup
description: A standalone application that configures every ngx-markdown token, modeled on the 19.0.0 demo.
order: 1
tags: [ "examples", "configuration" ]
keywords: [ "ApplicationConfig", "MERMAID_OPTIONS", "markedOptionsFactory", "provideHttpClient" ]
---

# App-wide Setup

The demo application's configuration, trimmed to the Markdown parts. The demo runs with `zone.js` (it is in the
`polyfills` of `angular.json`).

```typescript
// app.config.ts
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, SecurityContext } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import {
  CLIPBOARD_OPTIONS, MARKED_OPTIONS, MERMAID_OPTIONS, provideMarkdown,
} from '@fsegurai/ngx-markdown';
import { routes } from './app.routes';
import { markedOptionsFactory } from './marked-options-factory';
import { AnchorService } from './shared/anchor.service';
import { ClipboardButtonComponent } from './shared/clipboard-button.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideMarkdown({
      loader: HttpClient,
      clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: ClipboardButtonComponent } },
      markedOptions: { provide: MARKED_OPTIONS, useFactory: markedOptionsFactory, deps: [AnchorService] },
      markedExtensions: [gfmHeadingId()],
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
- `provideHttpClient()` is required for `[src]` in Angular 19.
- Each plugin's script must be in `angular.json`; see [Installation](../getting-started/installation.md).
- `CLIPBOARD_OPTIONS` does not reach `<markdown>` in 19.x; see [Copy to Clipboard](../features/clipboard.md).
- The 19.0.0 demo passes `gfmHeadingId()` in `markedExtensions`. Its heading-id renderer is not applied in 19.x;
  see [Marked Options and Extensions](../guides/marked-options-and-extensions.md).
- The demo imports from `ngx-markdown`, a path alias to the library source; applications import from
  `@fsegurai/ngx-markdown`.
