---
label: Custom Copy Button
description: Replace the default clipboard button with your own component or an ng-template.
order: 4
tags: [ "examples", "plugins" ]
keywords: [ "clipboardButtonComponent", "clipboardButtonTemplate", "clipboard.js" ]
---

# Custom Copy Button

## From a component

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  template: `<button type="button" aria-label="Copy code" (click)="copied = true">{{ copied ? 'Done' : 'Copy' }}</button>`,
})
export class CopyButtonComponent {
  copied = false;
}
```

```typescript
@Component({
  imports: [MarkdownComponent],
  template: `<markdown clipboard [clipboardButtonComponent]="copyButton" [src]="'guide.md'" />`,
})
export class GuideComponent {
  readonly copyButton = CopyButtonComponent;
}
```

## From a template

```html
<ng-template #copyTemplate>
  <button type="button" class="my-copy">Copy</button>
</ng-template>

<markdown clipboard [clipboardButtonTemplate]="copyTemplate" [src]="'guide.md'" />
```

## How copying works

You do not write copy logic: clipboard.js is attached to your button's root nodes and copies the `<pre>`'s text on
click. Your own `(click)` handler only updates the UI. Style placement with `.markdown-clipboard-toolbar` and its
`.hover` class.
