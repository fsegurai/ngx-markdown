---
label: Copy to Clipboard
description: Add a copy button to every code block with clipboard.js, and replace the default button with your own component or template.
order: 11
tags: [ "features", "plugins" ]
keywords: [ "clipboard.js", "ClipboardButtonComponent", "CLIPBOARD_OPTIONS", "copy button" ]
---

# Copy to Clipboard

```html
<markdown clipboard [src]="'guide.md'" />
```

Needs `clipboard` loaded as a global script (`node_modules/clipboard/dist/clipboard.min.js`); otherwise rendering
throws `errorClipboardNotLoaded`.

## What it adds

Each `<pre>` is wrapped in a `position: relative` `<div>` that also holds a `.markdown-clipboard-toolbar`. The toolbar
gets a `.hover` class while the pointer is over the block. The button copies the `<pre>`'s `innerText`.

| Selector | Style it to |
|----------|-------------|
| `.markdown-clipboard-toolbar` | Move the toolbar (default top right) or show it only with `.hover`. |
| `.markdown-clipboard-button` | Style the default, unstyled button. |
| `.markdown-clipboard-button.copied` | Style the "copied" state (3 seconds). |

## Default button options

| Input | `ClipboardOptions` key | Default |
|-------|------------------------|---------|
| `clipboardButtonTextCopy` | `buttonTextCopy` | `Copy` |
| `clipboardButtonTextCopied` | `buttonTextCopied` | `Copied!` |
| `clipboardLanguageButton` | `languageButton` | `false`: when `true`, the code's language is the button label |

## Your own button

Pick one; the first one set wins: a component, then a template, then the default button.

```typescript
// App-wide
provideMarkdown({
  clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: MyCopyButtonComponent } },
});
```

```html
<!-- Per component -->
<markdown clipboard [clipboardButtonComponent]="copyButton" [data]="text" />

<ng-template #buttonTemplate>
  <button type="button">Copy</button>
</ng-template>
<markdown clipboard [clipboardButtonTemplate]="buttonTemplate" [data]="text" />
```

clipboard.js listens on the root nodes of your button, so any click inside them copies. The text inputs only apply
to the default button.

> **Source note.** The README presents `CLIPBOARD_OPTIONS` as the app-wide button for every `<markdown>`. In the 19.x
> source, `MarkdownComponent` always passes all five clipboard keys, unset ones as `undefined`, and they are spread
> over `CLIPBOARD_OPTIONS`. So for the component the global values are overridden and the default button is used
> unless you set the inputs. `CLIPBOARD_OPTIONS` does apply to the pipe and to `MarkdownService.render()` calls that
> omit those keys. The demo's "default button" example shows this behavior.

## With the pipe

`text | markdown : { clipboard: true } | async` works too: the pipe passes its `ViewContainerRef` to the service.
