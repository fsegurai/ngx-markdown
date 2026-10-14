---
label: Code Snippets with Pipes
description: Show highlighted code from a TypeScript string with the language and markdown pipes, including plugin options.
order: 3
tags: [ "examples", "pipe" ]
keywords: [ "LanguagePipe", "MarkdownPipe", "async pipe", "code sample" ]
---

# Code Snippets with Pipes

```typescript
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LanguagePipe, MarkdownComponent, MarkdownPipe, MarkdownPipeOptions } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-snippet',
  standalone: true,
  imports: [AsyncPipe, LanguagePipe, MarkdownComponent, MarkdownPipe],
  template: `
    <!-- pipe: whole template is post-processed -->
    <div [innerHTML]="code | language : 'typescript' | markdown : options | async"></div>

    <!-- component: Prism plugin inputs are only here -->
    <markdown [data]="code | language : 'typescript'" lineNumbers clipboard />
  `,
})
export class SnippetComponent {
  readonly code = `const greeting: string = 'Hello';\nconsole.log(greeting);`;
  readonly options: MarkdownPipeOptions = { clipboard: true, emoji: false };
}
```

Requirements:

- Prism with `prism-typescript.min.js`, plus the line numbers plugin files for `lineNumbers`.
- `clipboard.min.js` for `clipboard`.
- `zone.js`: the pipe runs its plugins on `NgZone.onStable`, which never emits in zoneless apps.

The pipe runs the plugins on the element of `SnippetComponent`, so the `<markdown>` output is processed by both. Use
one approach per component when that matters.
