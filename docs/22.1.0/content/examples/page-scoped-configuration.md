---
label: Page-scoped Configuration
description: Give one page its own MarkdownService and plugins, here with marked-extended packages, without affecting other pages.
order: 3
tags: [ "examples", "configuration", "extensions" ]
keywords: [ "component providers", "withMarkedExtended", "nested provideMarkdown" ]
---

# Page-scoped Configuration

A `provideMarkdown()` in a component's `providers` creates a `MarkdownService` for that subtree. The demo uses it so
only its Marked Extended page parses the extended syntax. Root `MARKED_OPTIONS` and `MARKED_EXTENSIONS` still apply.

```typescript
import { Component } from '@angular/core';
import { MarkdownComponent, provideMarkdown, withMarkedExtended, withPrism } from '@fsegurai/ngx-markdown';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedCode, { attachCode, wrapLines } from '@fsegurai/marked-extended-code';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';

@Component({
  selector: 'app-extended-page',
  imports: [MarkdownComponent],
  providers: [
    provideMarkdown({
      plugins: [
        withPrism(),
        withMarkedExtended([
          { name: 'alert', extension: markedExtendedAlert() },
          { name: 'tabs', extension: markedExtendedTabs(), attach: attachTabs },
          {
            name: 'code',
            extension: markedExtendedCode(),
            attach: attachCode,
            options: { lineClasses: false, syncByLabel: true },
            afterHighlight: wrapLines,
          },
        ]),
      ],
    }),
  ],
  template: `<markdown [src]="'extended.md'" (extendedEvent)="onEvent($event)" />`,
})
export class ExtendedPageComponent {
  onEvent({ type, detail }: { type: string; detail: unknown }): void {
    console.log(type, detail);
  }
}
```

Plugins are not inherited: list every plugin the page needs in its own `plugins` array.
