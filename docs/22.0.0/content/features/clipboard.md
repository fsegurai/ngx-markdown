---
label: Copy to Clipboard
description: Add a copy button to every code block with withClipboard(), and customize the button or react to copy events.
order: 6
tags: [ "features", "plugins", "clipboard" ]
keywords: [ "withClipboard", "ClipboardJS", "copy button", "ClipboardButtonComponent" ]
---

# Copy to Clipboard

Needs the `clipboard` package script (global `ClipboardJS`) and the feature:

```typescript
provideMarkdown({ plugins: [withClipboard({ languageButton: true })] });
```

```html
<markdown [src]="'guide.md'" clipboard (copied)="onCopied($event)" (copyError)="onCopyError($event)" />
<markdown [data]="markdown" [plugins]="{ clipboard: { buttonTextCopy: 'Copy code' } }" />
```

## Options

| Option (`withClipboard`) | Input | Default | What it does |
|--------------------------|-------|---------|--------------|
| `buttonComponent` | `clipboardButtonComponent` | `ClipboardButtonComponent` | Your own button component. |
| - | `clipboardButtonTemplate` | none | An `ng-template` as the button. |
| `buttonTextCopy` | `clipboardButtonTextCopy` | `Copy` | Default button text. |
| `buttonTextCopied` | `clipboardButtonTextCopied` | `Copied!` | Text for 3 s after a successful copy. |
| `languageButton` | `clipboardLanguageButton` | off | Label the button with the block language. |
| `statusTextCopied` | - | `Copied to clipboard` | Announced to screen readers after a copy (`''` announces nothing). |
| `statusTextCopyFailed` | - | `Copy failed` | Announced to screen readers when a copy fails. |
| `skipRemovedLines` | - | `true` | Leave removed diff lines of marked-extended code blocks out of the copy. |

A button set by a higher layer (a per-component template or component) replaces a global button component.

## Styling

| Selector | Element |
|----------|---------|
| `.markdown-clipboard-toolbar` | Wrapper around the button; gets `.hover` while the pointer is over the code block. |
| `.markdown-clipboard-button` | The default button; `.copied` while showing the copied state. |
| `.markdown-clipboard-title` | Title of a marked-extended code block, when it has one. |
| `.markdown-clipboard-status` | One visually hidden polite `role="status"` region at the end of `<body>`, shared by every button. |

Screen readers hear the result of every copy through that region, whatever the button (default, custom component or
template): a custom button does not need a live region of its own.

## Custom button inputs

A custom component receives only the inputs it declares (`ClipboardButtonInputs`): `language`, `code`, `title`,
`buttonTextCopy`, `buttonTextCopied`. ClipboardJS handles the click; use `copied` to react.

```typescript
@Component({
  selector: 'app-copy-button',
  template: `<button type="button">{{ buttonTextCopy() }} {{ language() }}</button>`,
})
export class CopyButtonComponent {
  readonly language = input<string>();
  readonly buttonTextCopy = input('Copy');
}
```

## Events

- `copied`: `MarkdownCopyEvent` `{ text, language?, title?, element }`.
- `copyError`: `MarkdownCopyErrorEvent` `{ error, language?, title?, element }`; `error.message` is
  `ERROR_CLIPBOARD_COPY_FAILED`.

With the pipe, pass `clipboardOptions: { onCopied, onCopyError }` instead. Missing ClipboardJS rejects the render with
`ERROR_CLIPBOARD_NOT_LOADED`; a render without a `ViewContainerRef` with `ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED`.
Nothing runs on the server.
