---
label: Image Lightbox
description: Open the images of rendered Markdown in a built-in dialog viewer with the dependency-free withLightbox() plugin.
order: 11
tags: [ "features", "plugins", "images" ]
keywords: [ "withLightbox", "MarkdownLightboxComponent", "imageClick", "dialog" ]
---

# Image Lightbox

No dependency: the viewer is a native `<dialog>` opened with `showModal()`.

```typescript
provideMarkdown({ plugins: [withLightbox({ wrap: false })] });
```

```html
<markdown [data]="markdown" lightbox (imageClick)="onImageClick($event)" />
```

- **Eligible images:** every `<img>` of the content except those in a link, a Mermaid diagram or KaTeX output. They get
  `tabindex="0"`, `role="button"` and the `markdown-lightbox-trigger` class, so Enter and Space open them too.
- **Viewer:** the image, its `alt` (else `title`) as caption, previous/next buttons and an `n / total` counter. Arrow
  keys browse, Esc or a backdrop click closes, focus returns to the image.

## Options (`LightboxOptions`)

| Option | Default |
|--------|---------|
| `wrap` | `true` |
| `dialogLabel` | `Image viewer` |
| `closeLabel` | `Close` |
| `previousLabel` | `Previous image` |
| `nextLabel` | `Next image` |
| `openLabel` | `Open image 2 of 5` (`Open image` for a single image) |

The image triggers get `role="button"`, `tabindex="0"` and `aria-haspopup="dialog"` (attributes the content already
set are kept). A trigger with no name of its own (no alt text, `title`, `aria-label` or `aria-labelledby`) gets
`openLabel` as its `aria-label`: a string, or `(index, total) => string` with the position of the image among the
triggers (from 0). In the viewer, a caption equal to the alt text of its image is shown but hidden from assistive
technology, so it is not read twice.

Set them in `withLightbox()`; the `lightboxOptions` input is merged over them.

## Use another viewer

`imageClick` emits a `MarkdownImageClickEvent` `{ image, index, images, preventDefault(), defaultPrevented }` before the
viewer opens. Call `preventDefault()` to keep it closed and open your own:

```typescript
onImageClick(event: MarkdownImageClickEvent): void {
  event.preventDefault();
  this.viewer.open(event.images.map((image) => image.currentSrc || image.src), event.index);
}
```

## Theming

| CSS custom property | Default |
|---------------------|---------|
| `--markdown-lightbox-backdrop` | `rgb(0 0 0 / 85%)` |
| `--markdown-lightbox-text-color` | `#fff` |
| `--markdown-lightbox-font` | `inherit` |
| `--markdown-lightbox-max-width` | `90vw` |
| `--markdown-lightbox-max-height` | `80vh` |
| `--markdown-lightbox-button-background` | `rgb(255 255 255 / 15%)` |
| `--markdown-lightbox-button-color` | `#fff` |

Not supported by the pipe. A render without a `ViewContainerRef` rejects with `ERROR_LIGHTBOX_VIEW_CONTAINER_REQUIRED`.
