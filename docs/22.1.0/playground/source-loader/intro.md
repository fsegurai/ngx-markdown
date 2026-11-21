# Welcome

This page was loaded by `<markdown [src]="'docs/intro.md'">`: a custom `MARKDOWN_SOURCE_LOADER` served it from the
files of this sample instead of `fetch`, so it works offline.

## Links

- [Installation](install.md): a relative page, rewritten to open in this preview
- [A missing page](missing.md): the loader answers with a 404 `MarkdownSourceError`
- [marked](https://marked.js.org): an external link, opened in a new tab (`target`, `rel`)

## Images

The relative `images/logo.svg` becomes a `data:` URL built from `logo.svg`:

![ngx-markdown logo](images/logo.svg)

Raw HTML goes through the same hook: <img src="images/logo.svg" width="32" alt="small logo" />
