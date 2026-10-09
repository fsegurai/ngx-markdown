# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

---

## [22.0.0] - 2026-10-09

### ⚠️ BREAKING CHANGES ⚠️

See "Migrating from 21 to 22" in the README for a step-by-step guide.

- **Angular 22** — the library peer dependencies (`@angular/common`, `@angular/core`, `@angular/platform-browser`,
  `@angular/router`) now require `^22.0.0`; TypeScript 6.0 (`>=6.0 <6.1`) and Node.js `^22.22.3 || ^24.15.0 || >=26`
  are required. **(Note**: This change is not backward compatible.)
- **MarkdownModule removed** — `MarkdownModule` (deprecated in 21.0.0) is removed. Use `provideMarkdown(config)` in
  your application providers instead of `MarkdownModule.forRoot(config)`, drop `MarkdownModule.forChild()`, and import
  the standalone `MarkdownComponent` / `MarkdownPipe` instead of `MarkdownModule`. The configuration interface is now
  `MarkdownConfig`, exported from `provide-markdown`; `MarkdownModuleConfig` stays as a deprecated type alias and will
  be removed in v23. See "Migrating from MarkdownModule" in the README.
- **Optional peer dependencies** — `prismjs`, `emoji-toolkit`, `katex`, `mermaid` and `clipboard` moved from
  `optionalDependencies` to optional `peerDependencies` (`peerDependenciesMeta`). Package managers no longer install
  them automatically: install each plugin package explicitly when you use it.
- **Plugins require their `withX()` feature; the per-plugin configuration is removed** — every optional feature is a
  plugin, configured only with its feature in `provideMarkdown({ plugins: [...] })`, with no compatibility bridge.
    - Removed `MarkdownConfig` fields: `katexOptions`, `mermaidOptions`, `mermaidLoader`, `mermaidRenderTimeout`,
      `mermaidExportOptions`, `clipboardOptions`, `lightboxOptions`.
    - Removed tokens: `KATEX_OPTIONS`, `MERMAID_OPTIONS`, `MERMAID_LOADER`, `MERMAID_RENDER_TIMEOUT`,
      `MERMAID_EXPORT_OPTIONS`, `CLIPBOARD_OPTIONS`, `LIGHTBOX_OPTIONS`.
    - Replacements: `withKatex(options)`, `withMermaid({ config, loader, renderTimeout })`,
      `withMermaidExport(options)`, `withClipboard(options)`, `withLightbox(options)`.
    - **Prism needs `withPrism(options)`**: highlighting at render time (and the `pre` attributes of `[lineNumbers]`,
      `[lineHighlight]`, `[commandLine]`) no longer happens without it. `MarkdownService.highlight()` still works
      without the plugin.
    - **Emoji needs `withEmoji()`**: `[emoji]` converts nothing without it.
    - A component (or pipe, or service call) enabling a plugin that is not provided (`[katex]`, `[mermaid]`,
      `[clipboard]`…, or the `[plugins]` record) gets nothing, and one dev-mode `[ngx-markdown]` warning per plugin
      names the `withX()` to add. `MarkdownService.rerenderMermaid()` without `withMermaid()` throws
      `ERROR_MERMAID_NOT_PROVIDED`.
    - Unchanged: `MARKED_OPTIONS` / `markedOptions`, `MARKED_EXTENSIONS` / `markedExtensions`, the per-component inputs
      and the option types. See "Migrating to 22: plugins" in the README.
- **Removed deprecated APIs**
    - `ERROR_SRC_WITHOUT_HTTP_CLIENT` (unused since `HttpClient` is provided in root).
    - `PrismPlugin.LineHighlight` (the line-highlight plugin is driven by the `data-line` attribute, not a class).
    - `defaultRenderer` from the Mermaid `flowchart`, `class` and `state` diagram config types (removed by Mermaid 12;
      use the top-level `layout` option).
- **Mermaid config types follow Mermaid 12.1** — `MermaidAPI.MermaidConfig` no longer has `zenUml` (removed from
  Mermaid's config), and the `ZenUmlDiagramConfig` type is removed. Every config interface now matches Mermaid 12.1
  exactly, so a value that Mermaid 12 no longer accepts is now a type error.
- **`error` output type** — `MarkdownComponent.error` now emits `MarkdownError` (`Error | HttpErrorResponse | string`,
  exported) instead of `string | Error`: a failed `src` request emits the `HttpErrorResponse`, which is not an `Error`.
  Handlers typed `(error: string | Error)` must accept `MarkdownError` (or `unknown`).
- **`MarkdownService.render()` is asynchronous** — `render()` now returns `Promise<void>`, which settles once every
  plugin step is done (Mermaid diagrams drawn, code highlighted, clipboard buttons created).
    - Prism highlighting runs after a yield, block by block: code that read the highlighted markup right after calling
      `render()` must `await render()` (or use the `ready` output of `<markdown>`, still emitted only once everything is
      rendered). The clipboard buttons beyond the first chunk are created after `render()` returns too.
    - A new `render()` or `cleanup()` of the element stops the previous highlighting, as does the new
      `RenderOptions.signal` (`AbortSignal`).
    - Errors reject the Promise instead of throwing synchronously: a `MermaidRenderError` when diagrams fail, an error
      thrown by Prism (including a Prism build without `highlightElement`, highlighted with `highlightAllUnder`), an
      error creating a clipboard button, or a missing plugin file (or `ViewContainerRef`).
    - The public `highlight(element)` is unchanged (synchronous, `Prism.highlightAllUnder`).
- **Render rejection semantics: plugin render hooks are isolated** — `MarkdownService.render()` and
  `rerenderMermaid()` no longer throw when a plugin cannot run (missing ClipboardJS, Mermaid or `ViewContainerRef`):
  every enabled plugin still runs (Mermaid diagrams are drawn and code highlighted when the clipboard fails), and the
  returned Promise rejects with the first error in plugin order once the others have settled. Only the plugins that
  `require` the failed one are skipped (the Mermaid export after a Mermaid failure, so a failed `rerenderMermaid()`
  keeps the existing export buttons). `<markdown>` and the pipe report the error as before (`error` output,
  `ErrorHandler`).
- **Mermaid diagrams are rendered one by one** — `mermaid.render()` is called per `.mermaid` element instead of
  `mermaid.run()`, so the loaded `mermaid` global must provide `render` (any Mermaid 10+). Visible differences:
    - a failed diagram shows a `<div class="mermaid-error" role="alert">` box with the error message instead of
      Mermaid's error SVG, and the other diagrams still render;
    - `render()` rejects (and `<markdown>` emits `error`) with a `MermaidRenderError` listing every failure, instead
      of Mermaid's first error; `mermaid.parseError` is no longer called;
    - elements no longer get the `data-processed` attribute, and the diagrams are drawn after the clipboard and
      highlight steps (asynchronously, through a shared queue).
- **KaTeX is rendered while parsing** — `[katex]` (and `ParseOptions.katex`) now renders `$…$` and `$$…$$` with
  `katex.renderToString()` through a built-in Marked extension, instead of running KaTeX's Auto-Render over the
  rendered HTML. Visible differences:
    - the Auto-Render extension (`katex/dist/contrib/auto-render.min.js`) is no longer used: remove it from your
      `scripts`. Only the global `katex` (`katex.min.js`) and the CSS are needed;
    - only `$…$` and `$$…$$` are supported: Auto-Render's `delimiters` option (and `\(…\)`, `\[…\]`,
      `\begin{…}` as delimiters) is gone, as are `ignoredTags`, `ignoredClasses` and `errorCallback`. Inline `$…$`
      follows marked-katex-extension's spacing rule (`$5 and $10` stays text; `nonStandard: true` relaxes it);
    - math inside raw HTML blocks (e.g. `<p align="center">$x$</p>`) is no longer rendered;
    - `displayMode` in the options is ignored: the delimiters set it;
    - an invalid expression with `throwOnError: true` is left as its source text and logged with `console.error`,
      as before.
- **KaTeX API** — `MarkdownService.render()` no longer renders KaTeX: `RenderOptions.katex` and
  `RenderOptions.katexOptions` are removed (they moved to `ParseOptions`; `MarkdownPipeOptions` still accepts both).
  `KatexOptions` is now the KaTeX options plus `nonStandard`; the Auto-Render types
  `RenderMathInElementSpecificOptions` and `RenderMathInElementSpecificOptionsDelimiters` are removed without an alias,
  since their options are no longer applied.
- **Emoji are no longer replaced inside code** — `[emoji]` (and `ParseOptions.emoji`) now converts the shortcodes
  (`:heart:`) of the text only, after Marked has tokenized the content, instead of running `joypixels.shortnameToUnicode`
  over the whole raw Markdown. Shortcodes in code blocks, code spans, raw HTML tags and HTML blocks, and link URLs are
  now left as written (the text between inline HTML tags is still converted). The text of autolinks (`<https://…>`)
  and bare URLs is left as written too, like their `href`; the label of an explicit link (`[label](url)`,
  `[label][ref]`) is still converted. The conversion runs in a per-parse `walkTokens`, before the `walkTokens` of
  `MARKED_EXTENSIONS`.
- **`markdown` pipe and non-string values** — the pipe now resolves to `''` (and logs an `[ngx-markdown]` error) for a
  non-string value, instead of returning the value unchanged.
- **Rendering options do not re-render** — changing only a rendering option input (`inline`, `emoji`, `clipboard`,
  `katex`, `mermaid`, Prism plugin inputs...) no longer re-renders; it applies to the next `data`/`src` change or
  `MarkdownService.reload()`. `mermaidOptions` is the one exception (see "Reactive `mermaidOptions`" below).
- **Unset plugin inputs are `undefined`** — `[emoji]`, `[katex]`, `[lightbox]`, `[clipboard]`, `[mermaid]`,
  `[mermaidExport]`, `[frontMatter]`, `[lineNumbers]`, `[lineHighlight]` and `[commandLine]` are now `undefined` when
  unset (instead of `false`), so the `[plugins]` record can enable them; set, they win over it.
- **Unsafe links are blocked** — clicking a `javascript:`, `data:` or `vbscript:` link in rendered content is now always
  prevented (with an `[ngx-markdown]` warning), whatever the `routerLinkOptions` (unless `disableRouterLinkHandler`
  is set); `data:` links are no longer opened as external links.
- **Modifier clicks are left to the browser** — Ctrl/Meta/Shift/Alt clicks and non-main-button clicks on links are no
  longer intercepted by `routerLinkOptions` handlers, so "open in a new tab/window" works as in a plain page.

### 🚀 Features

- **Plugin system** — the Markdown pipeline runs `MarkdownPlugin`s: plain objects with optional hooks run in a fixed
  order (`preprocess`, `markedExtensions` before the `MARKED_EXTENSIONS` of the application, the core sanitizer,
  `postSanitize`, `render` with abort checks, then per-element cleanup on re-render, `cleanup()` and destroy). Custom
  plugins are registered with `provideMarkdown({ plugins: [withMarkdownPlugin(plugin, options)] })` (the
  `MARKDOWN_PLUGINS` multi token, `MarkdownPluginFeature`), and enabled per component with the new `[plugins]` input
  (`true`, `false`, or an options object), or per parse/render with the `plugins` option of the pipe and the service;
  the specific inputs win over the record. Options merge the plugin defaults, the `withX()` options, then the
  per-component options (`undefined` never overrides). Front-matter and `baseUrl` are core built-in plugins (always
  registered, no provider). See "Plugins" in the README.
- **Plugin API** — beyond the core hooks, `MarkdownPlugin` provides:
    - `rerender(element, ctx)`: a partial re-render (no parse, no cleanup of the other plugins; its plugins' cleanup
      joins the last render of the element), run by `MarkdownService.rerenderMermaid()`;
    - `ctx.isEnabled(name)`: tells a `render` hook whether another plugin is enabled in the same render;
    - `requires`: the plugins a plugin works with; it runs after them (within its `enforce` group, whatever the
      registration order), is skipped when one of their hooks threw in the same render, and a dev-mode warning (once
      per service) says when one is missing;
    - `nestedOptions`: merges object options key by key across the option layers;
    - `validate(ctx)`: runs for every enabled plugin before any `preprocess` hook (KaTeX uses it:
      `ERROR_KATEX_NOT_LOADED` is thrown before front-matter calls `onFrontMatter`);
    - `exclusiveOptions`: groups of options that replace each other across option layers;
    - `ctx.onCleanup(fn)`: a render cleanup that still runs when an asynchronous `render` hook rejects;
    - `tokenizerExtensions`: Marked tokenizer extensions registered once per service, working only in the parses the
      plugin is enabled in (each function gets the parse context);
    - `renderer` overrides returned by `markedExtensions` (per parse, before the configured renderer, falling back on
      `false`);
    - `enforce: 'pre' | 'post'` (plugin order; KaTeX and Prism are `'pre'`, so the `postSanitize` hooks of other
      plugins see the rendered math);
    - `ctx.serviceState` (per plugin and service).

  A render-only plugin enabled by default (Prism) adds nothing to a parse. A render no longer keeps its abort listener
  on the caller's `RenderOptions.signal` once it has settled.
- **Feature plugins** — every optional feature is a plugin provided with its `withX()` feature in
  `provideMarkdown({ plugins: [...] })` and enabled per component with its input or the `[plugins]` record, so its code
  is only bundled when used. Public exports are unchanged, plus each `withX()` and its plugin object (`emojiPlugin`,
  `katexPlugin`, `lightboxPlugin`, `clipboardPlugin`, `prismPlugin`, `mermaidPlugin`, `mermaidExportPlugin`).
    - `withEmoji()` (code in `plugins/emoji`).
    - `withKatex(options)`: the global KaTeX options, merged under `[katexOptions]` (and `{ katex: { ... } }` in the
      `[plugins]` record); an `undefined` value no longer overrides the global value (code in `plugins/katex`).
    - `withLightbox(options)`: the global lightbox options; `imageClick` is emitted however the lightbox is enabled
      (code in `plugins/lightbox`).
    - `withClipboard(options)`: the global clipboard options; a per-component button (component or template) replaces
      the global one (code in `plugins/clipboard`, with the default `ClipboardButtonComponent`).
    - `withPrism(options)`: enabled by default once provided (`[plugins]="{ prism: false }"` disables it); takes the
      new `PrismOptions` (`lineNumbers`, `start`, `lineHighlight`, `line`, `lineOffset`, `commandLine`,
      `filterOutput`, `host`, `prompt`, `output`, `user`). The `<markdown>` Prism inputs map onto them
      (`RenderOptions.prismOptions`), so the `pre` classes and `data-*` attributes are set by the plugin, also for the
      `markdown` pipe and `MarkdownService.render()`, and global defaults are possible
      (`withPrism({ lineNumbers: true })`). The plugin is `enforce: 'pre'`, so these attributes are set before the
      other `render` hooks run, and a hook of another plugin that throws no longer stops the highlighting. Invalid
      `line`/`start`/`lineOffset` values are reported once per service (code in `plugins/prism`).
    - `withMermaid({ config, loader, renderTimeout })`: Mermaid's `config` is merged key by key across `withMermaid()`,
      the `[plugins]` record (`{ mermaid: { config } }`) and `[mermaidOptions]`; an `undefined` key of
      `[mermaidOptions]` no longer overrides the global value. The `[mermaidOptions]` re-render and
      `MarkdownService.rerenderMermaid()` (which now also accepts `plugins`) work however Mermaid is enabled. An
      invalid render timeout is reported at the first render with Mermaid (once per value and service) instead of when
      the service is created. New exports:
      `MermaidPluginOptions` (code in `plugins/mermaid`).
    - `withMermaidExport({ buttonComponent, filenamePrefix })`: the export only adds buttons where Mermaid is enabled
      too (it warns in dev mode without `withMermaid()`), and always runs after Mermaid, whatever the registration
      order (code in `plugins/mermaid-export`, with `MermaidExportButtonComponent`).
- **KaTeX at parse time** — math is rendered by a built-in Marked extension (delimiter rules ported from
  marked-katex-extension, MIT, without depending on it, so KaTeX 0.19 stays supported). It is opt-in per parse and
  never leaks into parses without `katex`. Math is also rendered on the server when the global `katex` is available
  there (otherwise the server leaves the source text). The KaTeX output is inserted after the HTML sanitizer, so
  `SecurityContext.HTML` no longer strips its inline styles, MathML and SVG. It replaces placeholders
  (`<span class="ngx-katex-…"></span>`, with a random nonce per parse) that a custom `sanitize` function must keep:
  when it removes or changes them, the math is dropped and one `[ngx-markdown]` warning per parse tells how many
  expressions were lost. In the browser, `[katex]` without the global `katex` emits `ERROR_KATEX_NOT_LOADED` through
  the `error` output (no `ready`). `KatexOptions` gains the `trust` option, typed as in KaTeX 0.19
  (`boolean | ((context: KatexTrustContext) => boolean)`), with the exported `KatexTrustContext` type.
- **`SANITIZE` token** — `provideMarkdown({ sanitize })` accepts a `SecurityContext` or a sanitize function
  (`SanitizeFunction`, e.g. `(html) => DOMPurify.sanitize(html)`), provided as the new `SANITIZE` injection token. The
  function receives the parsed HTML (after asynchronous marked extensions have resolved) and must return a string,
  which is used as is; any other result (e.g. DOMPurify with `RETURN_DOM`) renders nothing and logs an error;
  `disableSanitizer` still bypasses it, and the `markdown` pipe uses the same path. `SANITIZE` defaults to
  `SECURITY_CONTEXT`, so `SecurityContext.HTML` still applies without `provideMarkdown()`. As in 21.x, a
  `provideMarkdown()` without `sanitize` pins `SecurityContext.HTML` in its own injector, so a nested one (lazy route,
  component providers) never inherits an ancestor's weaker setting.
- **Mermaid 12.1 config types** — `MermaidAPI.MermaidConfig` and the diagram config interfaces are generated from
  Mermaid 12.1's `config.type.d.ts`: the v12 `theme` values (`neo`, `neo-dark`, `redux`, `redux-dark`, `redux-color`,
  `redux-dark-color`), per-diagram `theme`, `look` and `layout`, the new `flowchart.curve` values, the ELK options,
  `dompurifyConfig` (typed as `object`, so `dompurify` is never imported), new diagram configs (`swimlane`,
  `agentflow`, `ishikawa`, `eventmodeling`, `treeView`, `radar`, `usecase`, `venn`, `wardley-beta`, `cynefin`,
  `railroad`) and new per-diagram fields (pie `donutHole`/`legendPosition`, xyChart legend options, sankey node options,
  packet `bitOrder`...). The library still never imports `mermaid`.
- **Mermaid loader** — `withMermaid({ loader: () => import('mermaid').then((m) => m.default) })` (typed
  `MermaidLoader`) loads Mermaid on demand instead of reading the global `mermaid` script, so only pages with diagrams
  download it, as a lazy chunk. The loader is called in the browser only (never on the server), on the first render
  that has a diagram, and its instance is cached for the service; it may also resolve to the module namespace (its
  `default` export is used). A failed load shows a `.mermaid-error` box on every diagram of the render and rejects
  with a `MermaidRenderError`; it is not cached, so the next render calls the loader again. The load is bounded once
  by the `renderTimeout` of `withMermaid()` (renders joining a pending load share its remaining time), so a load that
  never settles (e.g. a stalled chunk) fails instead of blocking every later render. Without a loader the global
  `mermaid` is used as before. The exported structural `MermaidLike` interface types the loaded instance.
- **Mermaid-only re-render** — `MarkdownService.rerenderMermaid(element, { mermaidOptions?, disableSanitizer? })`
  renders the `.mermaid` diagrams of an element again from their kept sources (including diagrams that show an error
  box), with the merged options (defaults, the `config` of `withMermaid()`, then `mermaidOptions`), without parsing the
  Markdown again: highlighted code, clipboard buttons, KaTeX, and the scroll position are kept. It goes through the
  shared Mermaid queue and supersedes the element's pending Mermaid render, so the latest call wins; it resolves, or
  rejects with a `MermaidRenderError`.
- **Reactive `mermaidOptions`** — when `mermaidOptions` changes after the content has been rendered with `mermaid`
  enabled, `<markdown>` re-renders the Mermaid diagrams alone (`rerenderMermaid()`), then emits `ready` again (or
  `error` with a `MermaidRenderError`). Changes in a row are coalesced: only the latest re-render draws and emits, and
  a render it supersedes emits neither `ready` nor `error`, even when its diagrams failed. Nothing is emitted after the
  component is destroyed. A value equal to the last one (compared by content) does nothing; a change while new content
  is still loading is applied to that render instead. Bind it to a theme signal or `computed` to make diagrams follow a
  light/dark theme.
- **Mermaid SVG export (`mermaidExport`, fork issue #111)** — the opt-in `mermaidExport` input adds an `SVG` button to
  every rendered Mermaid diagram (not to the error boxes) that downloads it as `diagram-<n>.svg` (the SVG markup Mermaid
  rendered, as an `image/svg+xml` Blob). The new `mermaidExported` (`{ element, svg, filename }`) and
  `mermaidExportError` (`{ error, element, filename }`, `ERROR_MERMAID_EXPORT_FAILED`) outputs report each download.
  The button can be replaced with `mermaidExportButtonComponent` (it gets the `svg` and `filename` inputs it declares)
  or `mermaidExportButtonTemplate`, and `mermaidExportFilenamePrefix` renames the files; `withMermaidExport(options)`
  sets a global button and prefix, which the inputs override. The default button is the exported
  `MermaidExportButtonComponent`. The buttons are destroyed by `cleanup()` and every render, and recreated for the new
  SVGs by a Mermaid-only re-render (`mermaidOptions`, `rerenderMermaid()`, which gained the export options and a
  `viewContainerRef` parameter). `RenderOptions.mermaidExport`/`mermaidExportOptions` bring it to the pipe and the
  service. A button that fails to be created is reported through `mermaidExportError` for its diagram only; the other
  diagrams and the render still succeed. Without `mermaidExport`, rendering is unchanged.
- **Image lightbox (`lightbox`, fork issue #112)** — the opt-in `lightbox` input opens the content images in a
  built-in, dependency-free viewer: a native `<dialog>` (`showModal()`, top layer) created on the first opening, with
  the full image, its `alt` (or `title`) as caption, previous/next buttons and a `n / total` counter (`aria-live`),
  Esc, arrow keys, a backdrop click to close, and the focus given back to the image. Images inside a link, a Mermaid
  diagram or KaTeX output are skipped; the others get `tabindex="0"`, `role="button"` and the
  `markdown-lightbox-trigger` class, so Enter and Space open them too. The new `imageClick` output
  (`MarkdownImageClickEvent`: `{ image, index, images, preventDefault(), defaultPrevented }`) is emitted only with
  the lightbox on; `preventDefault()` keeps the built-in viewer closed, so another viewer (e.g. LightGallery) can be
  used. `lightboxOptions` (`wrap`, `dialogLabel`, `closeLabel`, `previousLabel`, `nextLabel`) is merged over the
  options of `withLightbox()`. The viewer is the exported `MarkdownLightboxComponent`, themed with
  `--markdown-lightbox-*` CSS custom properties. Listeners, added attributes and the viewer are removed by `cleanup()`
  and every render; nothing happens on the server. Without `lightbox`, rendering is unchanged.
- **Clipboard copy events** — the `markdown` component has two new outputs, `copied` (`MarkdownCopyEvent`:
  `{ text, language?, element }`) and `copyError` (`MarkdownCopyErrorEvent`: `{ error, language?, element }`, `error`
  carrying the new `ERROR_CLIPBOARD_COPY_FAILED` message), wired to the Clipboard.js `success` and `error` events of
  every button (default, component, or template). Only the buttons of the latest render emit: the event handlers are
  dropped with their Clipboard.js instances on re-render and destroy. The pipe, which has no outputs, and
  `MarkdownService.render()` take the same results as `clipboardOptions.onCopied` / `onCopyError` callbacks.
- **Inputs for a custom clipboard button component** — a `clipboardButtonComponent` (or the `buttonComponent` of
  `withClipboard()`) now gets the `language`, `code`, `buttonTextCopy` and `buttonTextCopied` inputs
  (`ClipboardButtonInputs`) it declares; inputs it does not declare are never set, so they raise no unknown-input
  error.
- **Relative URLs (`baseUrl`, `srcRelativeLink`)** — new `<markdown>` inputs: `srcRelativeLink` (opt-in) resolves the
  relative links and images of a `src` file against the file itself (`src="docs/guide/intro.md"` makes `![](img.png)`
  load `docs/guide/img.png`), and `baseUrl` sets the base URL of any content, winning over `srcRelativeLink`.
  `ParseOptions.baseUrl` (so the `markdown` pipe and `MarkdownService.parse()`) takes it too. Markdown links and
  images and raw HTML `<a href>`/`<img src>` are resolved before rendering, so custom `link`/`image` renderers get the
  resolved URL. Absolute, protocol-relative, fragment-only, `mailto:`/`data:` (any scheme), `/routerLink:` and
  `/localFile:` URLs are left untouched; root-relative URLs resolve against the origin of an absolute base. Without
  either input, nothing changes.
- **Front-matter (`frontMatter`, `metadata`)** — opt-in: the new `frontMatter` input strips a leading `---` (YAML) or
  `+++` (TOML) block before parsing, and the new `metadata` output emits a `MarkdownFrontMatter` (`{ data, raw }`) on
  each render (`{ data: {}, raw: '' }` without a block). `ParseOptions.frontMatter` and the `onFrontMatter` callback
  bring it to the `markdown` pipe and `MarkdownService.parse()`, and `extractFrontMatter()` reads a block without
  rendering. `data` holds a documented, library-free subset (strings, numbers, booleans, `null`, one-line arrays,
  multi-line strings, and blocklists; anything else stays a raw string; `__proto__`/`constructor`/`prototype` keys, and
  any other key that exists on `Object.prototype` such as `hasOwnProperty` or `toString`, ignored). Without
  `frontMatter`, the block renders as in 21.x.
- **Headings and table of contents (`headings`, `headingIds`)** — the new `headings` output emits a `MarkdownHeading[]`
  (`{ level, text, id, element }`: the plain text as shown, without markup and with character references decoded, the
  heading element and its `id` in the page) on each render, before `ready`, to build a table of contents; superseded
  renders and Mermaid-only re-renders emit nothing. The opt-in `headingIds` input gives headings rendered without an
  `id` a GitHub-style slug, unique within the render (`intro`, `intro-1`…); an `id` written by `marked-gfm-heading-id`,
  a `MARKED_EXTENSIONS` heading renderer or a custom `renderer.heading` is kept. `ParseOptions.headingIds` and the
  `onHeadings` callback bring them to the `markdown` pipe and `MarkdownService.parse()` (no elements). Angular's default
  sanitizer removes `id` attributes (documented in the README). Without these, rendering is unchanged.
- **`cacheSrc`** (opt-in) — with `provideMarkdown({ cacheSrc: true })` (the `MARKDOWN_CACHE_SRC` token), the text
  fetched for a `src` is cached per `MarkdownService` (the last 50 sources, no expiry): the same `src` is fetched once
  and shared by every `<markdown>` that loads it, including while the request is pending and when a component is
  mounted again. A failed request is not cached, and `MarkdownService.reload()` drops the cache so every `src` is
  fetched again. Off by default: every load fetches, as before (the browser HTTP cache still applies).

### 🔧 Changes

- **Mermaid `initialize` and queue** — `mermaid.initialize()` is called only when the merged Mermaid options change.
  Every render goes through one queue shared by all `MarkdownService` instances, so the diagrams of a render are
  drawn with its own options before the next render initializes Mermaid again. Each `mermaid.render()` call times out
  (`[ngx-markdown] Mermaid diagram did not render within <n> ms`), reported like any other diagram failure, so a hung
  diagram no longer blocks the page's later diagrams. When `mermaid.initialize()` throws, every diagram of the render
  shows the error box, and the render rejects with a `MermaidRenderError` listing them all (it used to reject with the
  raw error and show nothing).
- **Mermaid render timeout** — `withMermaid({ renderTimeout })`, in milliseconds: `30000` by default, `0` or
  `Infinity` disables it, and an invalid value falls back to the default with an `[ngx-markdown]` warning. The timeout
  does not stop Mermaid's own render: a timed-out diagram may finish under a later render's configuration (its result
  is ignored), and a very slow valid diagram (large ELK layouts) can be failed by the limit, so raise or disable it if
  needed.
- **Superseded Mermaid renders** — a new `render()` or a `cleanup()` of the same element, or the element leaving the
  document, supersedes its diagrams not drawn yet: they are not drawn, their failures are not reported, and the older
  render resolves.
- **`MermaidRenderError`** — exported, with `failures: MermaidRenderFailure[]` (`element`, `error`).
- **`RenderOptions.disableSanitizer`** — `<markdown>` (and the pipe, from its options) pass it to `render()` for the
  `'loose'` warning.
- **`MermaidRunOptions`** — the `mermaid.run()` options type is now the top-level `MermaidRunOptions`, outside the
  `MermaidAPI` config namespace. `MermaidAPI.RunOptions` stays as a deprecated alias.
- **`SECURITY_CONTEXT` deprecated** — use `SANITIZE` / `provideMarkdown({ sanitize })` instead; a `SECURITY_CONTEXT`
  provider is still honoured when `sanitize` is not set. It will be removed in v23.
- **Asynchronous plugin failures** — when several asynchronous plugin steps fail, the first one in plugin order is
  reported: a `MermaidRenderError` wins over a later plugin's rejection (clipboard), and Prism's (`enforce: 'pre'`)
  over Mermaid's.

### ⚡ Performance

- **Chunked Prism highlighting** — `render()` highlights each block with `Prism.highlightElement` in chunks of about
  8 ms, yielding to the main thread between chunks (`scheduler.yield()`, else a `MessageChannel`, else `setTimeout`), so
  a long document no longer highlights in one long task. Prism's highlight-all hooks and the per-element plugin hooks
  (line numbers, line highlight, command line) still run.
- **Yields between the render phases** — `<markdown>` yields after writing the content and emitting `headings` /
  `metadata`, before the plugins run, and the service yields again before highlighting. A newer render of the
  component (or its destruction) aborts the highlighting of the previous one.
- **One `pre` pass for the Prism plugins** — the line-numbers, line-highlight and command-line classes and `data-*`
  attributes are set in a single `querySelectorAll('pre')` pass (up to four before), and none when no plugin is on.
- **Clipboard buttons** — a rendered element gets delegated click and hover listeners for all its code blocks (one
  ClipboardJS instance and two listeners per block before), and the buttons are created in chunks that yield to the
  main thread and stop when the render is superseded. A button click copies its block with the static
  `ClipboardJS.copy()`; no ClipboardJS instance listens to the rendered element, so a click on its text, links or code
  never runs a copy (which would clear the user's selection). With a ClipboardJS that has no static `copy`, a button
  gets its own instance on its first click. The markup, classes, `copied` / `copyError` outputs and custom buttons are
  unchanged; `render()` resolves once every button is created. A custom button that stops the click from bubbling to
  the rendered element no longer copies.
- **Headings** — heading texts and ids are decoded without a `<textarea>` when the pure decoder gives the browser's
  result (the DOM is still used for the other named references), and the heading elements of the `headings` output are
  found in linear time (each element's text is read once), not in time proportional to headings × elements.
- **Progressive insertion of long documents** — `<markdown>` no longer sets a large rendered document (16 KB of HTML or
  more, with more than 16 top-level elements) with one `innerHTML`: it parses it into a detached element and moves its
  top-level nodes into the component in three batches, one frame apart (the first 16 elements, then the rest in two
  equal batches), so the browser lays out and paints it over three frames instead of one long task. The number of
  frames is fixed because Firefox's frame cost grows with the whole document: more, smaller batches made its `ready`
  slower (5000 lines: 12 time-sized batches 2.7 s, three batches 1.5 s, one `innerHTML` 1.7 s). The final DOM
  is the one `innerHTML` gives; `headings`, `metadata`, the plugins and `ready` still run once the whole document is in
  place, and a newer render stops the insertion. Small documents are still set at once. The `markdown` pipe is
  unchanged (Angular sets its `[innerHTML]`). The README ("Long documents") also documents an opt-in
  `content-visibility` recipe.
- **Emoji without Emoji-Toolkit's regex** — `[emoji]` looks the shortcodes up in `joypixels.emojiList` (an index built
  once, on the first conversion) instead of calling `joypixels.shortnameToUnicode`, whose first call compiles a regex of
  every shortname (about 6,500 alternatives, ≈110 ms in the browser). The result is the same as `shortnameToUnicode`
  (checked on every shortname and alternate); `shortnameToUnicode` is still used when `emojiList` is missing or
  `joypixels.ascii` is on. An `emojiList` entry without a valid `uc_full` is left out of the index, so its shortcode
  stays as written instead of failing the parse.
- **KaTeX output cache** — each `MarkdownService` keeps the HTML of the last 50 expressions it rendered, by
  `displayMode`, merged options and TeX, so identical math (in one document or a re-render) calls
  `katex.renderToString()` once. An expression KaTeX throws on is never cached, nor math whose options hold a class
  instance or a symbol (they have no stable key); with a `macros` option, a parse stops using the cache once an
  expression may define a global macro (`\gdef`, `\newcommand`…).
- **Mermaid SVG cache** — each `MarkdownService` keeps the SVG of the last 50 diagrams it rendered, by merged options
  (theme included) and source: an identical diagram is drawn without `mermaid.render()`, with every id of its SVG (and
  the references and `<style>` selectors derived from it) rewritten to a new unique id. Diagrams with interaction
  statements (`click`, `call`, `href`, `callback`, `link`), failed diagrams and `securityLevel: 'sandbox'` output are
  always rendered. An explicit `rerenderMermaid()` never reads the cache (it refreshes it), so it still redraws after
  the web fonts load or after a global `mermaid.initialize()`. A second render of a 5000-line document took 300 ms
  instead of 845 ms in Chromium.
- **Batched Mermaid writes** — the diagrams of a render are rendered first, then all their SVGs are written, then the
  export buttons are created and checked in one pass, the diagrams' computed `position` is read in one pass, and the
  toolbars are written: no style read between two diagram writes (one forced layout per diagram before). Errors stay
  per diagram; a render superseded while its diagrams render writes none of them.

### 🐞 Fixes

- **Global `marked` mutation** — each `MarkdownService` parses with its own `Marked` instance: `MARKED_EXTENSIONS` are
  registered once on it, and every parse uses a per-call renderer, so the global `marked` is never modified and the
  Mermaid code renderer no longer sticks after a `mermaid: true` parse. Extension renderer overrides (e.g.
  `marked-gfm-heading-id` ids) still apply with a custom renderer. A method set directly on
  `markdownService.renderer` (e.g. `renderer.heading = ...`) takes precedence over an extension's override and falls
  back to it when it returns `false`.
- **Load pipeline** — `data`, `src`, transcluded content and `reload()` go through one cancellable pipeline: the latest
  request wins, a stale `src` response or render is discarded, and `load` is only emitted for the current `src`.
  Clearing `data` and `src` after a load cancels any in-flight request and empties the output.
  A non-empty `data` wins over `src` (with a one-time warning). `data = ''` alone clears the output; together with a
  `src`, the `src` is loaded, as in 21.x. `reload()` re-renders transcluded content.
- **SECURITY_CONTEXT** — the token now defaults to `SecurityContext.HTML` (`providedIn: 'root'`), so `<markdown>` and
  the `markdown` pipe work, and sanitize their output, without `provideMarkdown()` instead of throwing `NG0201`.
  `provideMarkdown({ sanitize })` still overrides it.
- **`markdown` pipe** — it always resolves to `SafeHtml` or `''`, tracks its asynchronous post-render step as a pending
  task, and documents that this step runs on the host element of the template using it.
- **Consistent errors** — every library message is prefixed with `[ngx-markdown]` (including the Prism, `LanguagePipe`
  and `MarkdownLinkService` messages), and internal links are processed even when a post-render plugin throws.
- **`routerLinkOptions`** — the `global` and `paths` `NavigationExtras` are now passed to `router.navigate` for
  `/routerLink:` links and plain internal paths (they were ignored).
- **Links** — `www.` links are opened as `https://` external links instead of app-relative URLs; the `/localFile:`
  pattern is checked before the generic `/` one; the desktop handler scrolls to the link fragment id instead of
  looking up the whole path.
- **`src` file extensions** — the extension is read from the file name only (the query, hash, and host are ignored, so
  `doc?v=1.2`, `https://domain.com` and `//domain.com` are Markdown, and `file.ts?x=a.b` is `ts`), case-insensitively,
  and both `.md` and `.markdown` are rendered as Markdown. Other extensions are lower-cased for the code block language.
- **Code fences** — the code block generated for a non-Markdown `src` file and by the `language` pipe uses a fence
  longer than the longest backtick run of the content, so content containing ```` ``` ```` is no longer cut short.
- **Prism plugin options** — `start = 0` and `lineOffset = 0` are no longer dropped. A malformed `line` (not
  comma-separated line numbers or ranges) and a non-integer `start` / `lineOffset` are ignored, with a one-time
  `[ngx-markdown]` warning, instead of being written to the `data-*` attributes.
- **Math with `_` and `*`** — `$a_1 * b_2$` and other math holding `_`, `*` or `\` renders correctly: Markdown no
  longer turns them into emphasis or escapes before KaTeX runs.
- **Mermaid completion** — Mermaid rendering is awaited, so `ready` is emitted once the diagrams exist and a failure is
  emitted through `error` (the pipe reports it to the `ErrorHandler`).
- **Mermaid race** — two components with different `mermaidOptions` rendering at the same time no longer draw with
  each other's configuration. Options are compared with `RegExp`, `Date`, `Map` and `Set` values included (e.g. a
  `dompurifyConfig.ALLOWED_URI_REGEXP`), so changing only such a value applies the new configuration.
- **Mermaid errors** — every failed diagram is reported and shown, not only the first, and Mermaid's temporary error
  diagram is no longer left in the document body.
- **Mermaid source** — the diagram source is HTML-escaped and kept for each element, so it can be rendered again after
  its SVG (or error box) has replaced it; the escaped source reaches Mermaid unchanged (`<`, `>`, `&`, quotes), with or
  without the sanitizer. The kept source is only used while the element still holds what the library drew: a reused
  element whose content was replaced renders its new text.
- **Clipboard cleanup** — the clipboard button views (and every ClipboardJS instance) of the previous render are
  destroyed before re-rendering and when the component is destroyed, in the component and the pipe; ClipboardJS is
  only attached to element nodes.
- **Clipboard options** — `undefined` render options (e.g. the unset clipboard inputs of `<markdown>`) no longer
  override the global clipboard options (`withClipboard()`): a globally configured button component, texts, or
  language button now apply. A button set on the instance (`clipboardButtonComponent` or `clipboardButtonTemplate`)
  still replaces the global button.
- **Clipboard button language** — the language of every code block is read before the clipboard buttons are created in
  chunks, so a block without a language no longer reports `none` (the `language-none` class added by the concurrent
  Prism highlighting) in `copied` / `copyError` and the `languageButton` label, depending on timing.
- **Clipboard language label** — the language button shows the `language-xxx` token alone (`ts` for
  `class="language-ts line-numbers"`, instead of `ts line-numbers`), read from the `<code>` element or else the
  `<pre>` element; a code block without a language is labelled `Copy` (another class is no longer shown).
- **Clipboard "copied" state** — the default button shows "copied" when Clipboard.js reports a successful copy, not on
  every click, so a failed copy no longer looks successful. Its `<button>` is now `type="button"`; the protected
  `onCopyToClipboardClick()` is replaced by a public `showCopied()`.

### 🔐 Security

- **Reverse tabnabbing** — external and `/localFile:` links opened by the link handlers use
  `window.open(url, '_blank', 'noopener,noreferrer')` (and get `rel="noopener noreferrer"`), so the opened page cannot
  reach `window.opener`.
- **Script URLs** — `javascript:`, `data:` and `vbscript:` links are never navigated to by the link handler, including
  obfuscated forms (leading whitespace, tabs, or newlines inside the scheme, mixed case).
- **Custom sanitizer** — the `SANITIZE` token lets you plug a stricter sanitizer such as DOMPurify (see the README).
- **Mermaid `securityLevel`** — `'strict'` is now an explicit default (merged before the `config` of
  `withMermaid()` and `mermaidOptions`), and an `[ngx-markdown]` warning is logged once when `'loose'` is combined with
  `disableSanitizer`. The README notes that the Angular sanitizer never sees the SVG Mermaid draws.
- **KaTeX `trust`** — documented that `trust` enables `\href`, `\url`, `\includegraphics` and the `\html*` commands,
  whose output is not sanitized, and must stay `false` for untrusted content.
- **Update dependencies** — address potential vulnerabilities and/or improvements in dependencies.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `@angular/common`, `@angular/core`, `@angular/platform-browser`, `@angular/router` from `^21.0.0` to
          `^22.0.0`
    - Dependencies
        - `@angular/cdk` from `21.2.14` to `22.2.2`
        - `@angular/common` from `21.2.25` to `22.2.1`
        - `@angular/compiler` from `21.2.25` to `22.2.1`
        - `@angular/core` from `21.2.25` to `22.2.1`
        - `@angular/forms` from `21.2.25` to `22.2.1`
        - `@angular/material` from `21.2.14` to `22.2.2`
        - `@angular/platform-browser` from `21.2.25` to `22.2.1`
        - `@angular/router` from `21.2.25` to `22.2.1`
        - `marked` from `18.0.14` to `18.1.0`
    - Dev Dependencies
        - `@angular/build` from `21.2.24` to `22.2.2`
        - `@angular/cli` from `21.2.24` to `22.2.2`
        - `@angular/compiler-cli` from `21.2.25` to `22.2.1`
        - `@angular/language-service` from `21.2.25` to `22.2.1`
        - `ng-packagr` from `21.2.7` to `22.2.4`
        - `typescript` from `5.9.3` to `6.0.3`
        - `vitest`, `@vitest/coverage-v8` from `4.1.11` to `5.0.3`

### 📝 Documentation

- **Migration guide** — the README gains "Migrating from 21 to 22", which links to "Migrating from MarkdownModule" and
  "Migrating to 22: plugins" (every removed field and token with its `withX()` replacement).
- **Mermaid 12 appearance** — the README explains the v12 appearance changes (ELK layout by default, the `redux-color`
  theme and `neo` look by default for most diagrams), how to restore the classic look
  (`{ layout: 'dagre', look: 'classic', theme: 'default' }`), and how to follow an app theme.
- **Loading Mermaid** — the README documents both setups: `withMermaid({ loader })` (lazy chunk, smaller pages, the
  CommonJS dependencies to allow) and the global script (simpler, but every page downloads about 5.5 MB), with the SSR
  and load-failure behaviour.
- **Demo pages updated for 22.0.0** — the plugins page documents parse-time KaTeX (supported syntax, `nonStandard`,
  global options, SSR and `trust`), the Mermaid loader, error box, outputs, render timeout and v12 look, the clipboard
  copy events, custom button inputs and precedence, and `start`/`line` validation; the bindings page demonstrates the
  `load`/`ready`/`error` outputs (`MarkdownError`) and the `data`/`src` rules; the cheat sheet, syntax highlight and
  re-render pages cover link handling, `src` extensions, code fences and the untracked rendering options.
- **Demo theme and plugins** — the Mermaid diagrams of the plugins and playground pages follow the demo's light/dark
  theme (`default` / `dark` theme and `darkMode`, from a shared `ThemeService`); toggling the theme re-renders them
  without reloading the page. The demo pins `layout: 'dagre'` and keeps its `look: 'handDrawn'` in the `config` of
  `withMermaid()`; its `app.config.ts` provides every plugin with its `withX()` feature.

### 🔧 Infrastructure

- **Library compile target** — `lib/tsconfig.lib.json` compiles with `target`/`lib` ES2022 (was es2015), matching the
  Angular 22 browser baseline, so ES2022 built-ins such as `Object.hasOwn` type-check in the library sources.
- **Mermaid type checks** — `bun run check:mermaid-types` (part of `build:lib`) fails when the generated Mermaid
  config types drift from the installed Mermaid's config types (a Mermaid bump with identical types passes);
  `bun run generate:mermaid-types` regenerates them. The scripts run Biome through Node, so they also work on Windows.
- **Spec type-check** — `type-check:lib` also type-checks the library specs (`lib/tsconfig.spec.json`), so type-level
  assertions in specs fail the check.
- **Tests** — the Vitest runner configs are ES modules (`lib/vitest.config.mts`, `demo/vitest.config.mts`), so Vite 8
  no longer warns about loading ESM syntax as CommonJS.
- **Demo browser list** — remove `demo/.browserslistrc`, which targeted browsers below Angular 22's minimum; the build
  now uses Angular's default browser list.
- **Demo fragment links** — the demo's `AnchorService` treated every relative link as external, so in-page links such
  as `#relative-links` navigated to the app root. Links with a scheme stay external, links to files (`.md`, `.svg`...)
  are left to the browser, and the other internal links (including `#fragment`) navigate with the Router on the
  current page.
- **Demo: Mermaid loaded on demand** — the demo uses the Mermaid loader (`withMermaid({ loader })`) instead of the
  static `mermaid.min.js` asset and its `index.html` script, so pages without diagrams no longer download Mermaid's
  5.5 MB file; pages with diagrams load Mermaid's core and the diagram chunks they use. The initial bundle is unchanged
  (1.67 MB, 275.88 kB estimated transfer, was 274.99 kB). The asset, the script tag and the `check:demo-mermaid`
  script (and its call in `build:demo`) are removed; Mermaid's CommonJS dependencies are listed in
  `allowedCommonJsDependencies`.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v22.0.0

---

## [21.0.1] - 2026-10-07

### 🐞 Fixes

- **MarkdownComponent** — a render failure of `[data]` or transcluded content is now emitted through the `error` output,
  matching `[src]`, instead of surfacing as an unhandled promise rejection. `ready` is not emitted for a failed render.
- **Demo** — the Get Started page prepares the README text before rendering instead of editing the rendered DOM, so a
  highlighting failure no longer leaves the intro and table of contents visible or the side navigation empty.
- **Demo** — when `README.md` cannot be loaded (the error is logged) or is empty, the Get Started page shows a fallback
  message with a link to the README on GitHub, instead of an empty page.
- **Demo** — restore the TypeScript grammar extension in `demo/src/prism.ts`. With the version shipped in 21.0.0, Prism
  threw `can't access property "inside"` on `typescript` code blocks, so those blocks and every block after them stayed
  unhighlighted (Syntax Highlight and Get Started pages).

### 🔧 Infrastructure

- **Release pipeline** — the GitLab Pages demo is built with the root base href (`/`), because GitLab Pages serves it
  from its unique domain root; only GitHub Pages keeps `/ngx-markdown/`. Assets no longer 404 on GitLab Pages.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v21.0.1

---

## [21.0.0] - 2026-10-07

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 21** — the library peer dependencies (`@angular/common`, `@angular/core`, `@angular/platform-browser`)
  now require `^21.0.0`. **(Note**: This change is not backward compatible.)
- **Zoneless** — the `zone.js` peer dependency has been removed. The library is zoneless-compatible and works with
  `provideZonelessChangeDetection()`; the demo application now runs fully zoneless.
- **Marked 18** — the `marked` peer dependency now requires `^18.0.0` (was `>= 15.0.0 < 16.0.0`). Marked 17/18 trim
  trailing blank lines from block tokens and changed list tokens; custom renderers or extensions that relied on the
  previous token shape may need updates. The optional plugins move to `katex ^0.19`, `mermaid ^12` (ELK layout by
  default, Node.js ≥ 22.12 for tooling) and `emoji-toolkit ^11`.

### 🐞 Fixes

- **Marked extensions** — `renderer` overrides from `MARKED_EXTENSIONS` (e.g. heading ids from
  `marked-gfm-heading-id`) are now applied to the renderer used for parsing. They were previously dropped because
  the service always passes its own renderer to Marked, replacing the default renderer the extensions were merged into.
- **MarkdownPipe** — post-render processing (syntax highlight, clipboard, KaTeX, Mermaid) now runs via
  `afterNextRender` instead of `NgZone.onStable`, which never fires in zoneless applications.
- **MarkdownComponent** — a render failure after a successful `[src]` load is now emitted through the `error` output
  (like HTTP errors) instead of surfacing as an unhandled promise rejection, and `load` is emitted only after the
  render completes.
- **SSR stability** — `MarkdownComponent` (data, transclusion, and `[src]` renders) and `MarkdownPipe` (async parse)
  register `PendingTasks`, so SSR, prerendering and `ApplicationRef.whenStable()` wait for the markdown output.
- **SSR** — `MarkdownComponent` iterates `querySelectorAll` results with `Array.from`; server-side DOMs whose
  `NodeList` lacks `forEach` crashed the render (`querySelectorAll(...).forEach is not a function`).
- **Peer dependencies** — add the missing `@angular/router` peer dependency (`^21.0.0`). The published package already
  imported `@angular/router` without declaring it, so strict consumers failed with `TS2307`.
- **Demo** — the scrollspy navigation built an invalid selector (`APP-SCROLLSPY-NAV. a`) that threw on pages with a
  table of contents; it now scopes the navigation with a unique `data-scrollspy-id` attribute.
- **Demo** — page content animates when the markdown is rendered; the route transition alone animated an empty
  container because `[src]` content arrives after the transition has started.
- **Demo accessibility** — icon-only buttons (clipboard, re-render, plugins) now declare `aria-label` and
  `type="button"`, decorative SVGs are marked `aria-hidden="true"`, and heading/icon semantics were corrected
  across the demo pages.

### 🔧 Changes

- **Deprecated: MarkdownModule** — `MarkdownModule`, `MarkdownModule.forRoot()` and `MarkdownModule.forChild()` are
  deprecated and
  will be removed in v22. Use `provideMarkdown()` and import the standalone `MarkdownComponent` / `MarkdownPipe`.
- **Deprecated: ERROR_SRC_WITHOUT_HTTP_CLIENT** — `HttpClient` is injectable by default since Angular 21, so the guard
  that threw this error has been removed and the constant is no longer used.
- **Deprecated: Mermaid `defaultRenderer`** — the `defaultRenderer` option of the flowchart, class, and state diagram
  configs is deprecated because Mermaid 12 removed it; use the top-level `layout` option instead. Mermaid 12 defaults
  to the ELK layout; `{ layout: 'dagre', look: 'classic' }` in `MERMAID_OPTIONS` restores the previous appearance.
- **KaTeX options** — the `strict` callback documentation reflects KaTeX 0.19: callbacks must return `false`,
  `'ignore'`, `true`, `'error'` or `'warn'`; any other value (including `undefined`) falls back to `'warn'`.
- **Build scripts** — `build_post:lib` and `build_post:demo` pass directory destinations with a trailing `/`, as
  required by `cpy-cli` 7.
- **TypeScript** — upgraded to TypeScript `5.9`.
- **Tests** — replace Karma and Jasmine with Vitest through the `@angular/build:unit-test` builder (jsdom); remove
  `fakeAsync`/`tick` in favor of `fixture.whenStable()` and Vitest fake timers. JUnit results are written to
  `junit.xml` and LCOV coverage to `coverage/lcov.info`.
- **Dependencies** — remove `@angular/platform-browser-dynamic` (unused).
- **Demo** — the playground uses signals instead of plain fields with manual `detectChanges()`.
- **MarkdownComponent** — uses `ChangeDetectionStrategy.OnPush` (content is written imperatively and all inputs are
  signals) and the `host` metadata instead of `@HostListener('click')`.
- **Workspace** — the demo consumes the **built** library: the root `tsconfig.json` maps `ngx-markdown` to `dist/lib`
  (replacing `linklocal` and the `file:lib` dependency), so it exercises the published `exports` and FESM bundles.
  `start` runs the library watch build and the demo dev server together, and `build:demo` builds the library first.
- **Library imports guard** — `check:lib-imports` (run by `build:lib`) fails when `lib/` uses aliased or self imports,
  which ng-packagr does not rewrite.
- **Demo** — remove `@angular/flex-layout` (replaced with plain CSS flex and breakpoint mixins) and `hammerjs`.
- **Demo** — remove `provideAnimations()`; enter/leave effects use the native `animate.enter` / `animate.leave` and the
  route transition is plain CSS.
- **Demo** — replace `gumshoejs` with [`@fsegurai/scrollspy`](https://github.com/fsegurai/scrollspy) for the table of
  contents navigation (same offset and `active` class).
- **Demo** — the get-started page renders the local `README.md` (copied as a build asset) instead of fetching it from
  GitHub.
- **Demo tests** — add an essential Vitest smoke suite for the demo (`test-ci_cd:demo`, `test-local:demo`) that
  checks the built library through the demo's providers: routes, `<markdown [data]>` rendering, the `markdown` pipe
  post-render, and the scrollspy selector. JUnit results are written to `junit-demo.xml`.

### 📝 Documentation

- **Contributing guide** — add `CONTRIBUTING.md` covering setup, the `lib/` and `demo/` layout, tests, linting,
  commit conventions and the pull request flow.
- **README** — add an SSR / prerendering section and recommend `provideMarkdown()` with standalone imports over the
  deprecated `MarkdownModule`.

### 🔧 Infrastructure

- **Linting** — replace ESLint with Biome: add `lint:check`, `lint:fix`, `lint:lib`, `lint:demo`, `format` and
  `format:audit` scripts; remove the ESLint configs, the `@angular-eslint` lint targets and schematics from
  `angular.json`, and the ESLint-only dev dependencies.
- **CI** — the PR pipeline now runs the read-only `lint:check` script instead of `lint-ci:lib` and `lint-ci:demo`.
- **CI** — the PR pipeline runs the demo smoke tests and publishes both `junit.xml` (lib) and `junit-demo.xml` (demo).
- **CI** — the GitHub build workflow calls the existing `build:lib`, `build_post:lib`, `build:demo` and
  `build_post:demo` scripts instead of the removed `gh-pages:*` and `postBuild:lib` scripts.
- **Demo build** — `build_post:demo` copies `index.html` to `404.html` (SPA fallback for static hosts) inside
  `dist/demo/browser` instead of the repository root.
- **Appwrite Terraform** — attach a custom domain to the demo site with `appwrite_proxy_rule`
  (`fsi-ngx-markdown[-<env>].appwrite.network`), and add the `site_hostname`, `site_url` and `site_domain_status`
  outputs. The Appwrite API key now also needs the `rules.read` and `rules.write` scopes.
- **Git hooks** — add Husky `pre-commit` and `pre-push` hooks to enforce linting and formatting before changes leave
  the workstation.
- **Engines** — the workspace `package.json` declares `engines` (`node >=24`, `bun >=1.4.0`, `npm >=11`), matching the
  sibling libraries and covering Mermaid 12's Node `>=22.12` tooling requirement. The published library does not
  declare engines.
- **Demo: Mermaid as a static asset** — Mermaid 12's prebuilt `mermaid.min.js` (about 5.5 MB) is copied to the
  versioned path `mermaid/<version>/` and loaded from `index.html`, instead of being re-bundled as a global `scripts`
  entry. This removes esbuild's `Comparison with -0` warning (from Mermaid's own code), speeds up builds, and drops the
  initial bundle from 7.13 MB to 1.63 MB, so the initial budget is tightened to 2 MB (warning) / 2.5 MB (error).
  `check:demo-mermaid`, run by `build:demo`, fails when the versioned path drifts from the installed Mermaid version.
  The README documents this as an alternative to the `scripts` setup.
- **Bun** — `bunfig.toml` keeps only the `[install]` settings; the unused `bun test` configuration (tests run through
  the Angular CLI) and its second `junit.xml` output were removed.

### 🔐 Security

- Added `Trivy Security Scanner` (`Makefile`, Docker image `aquasec/trivy:0.71.1`) to scan dependencies for
  vulnerabilities, secrets, misconfigurations, and licenses, generate SARIF reports and a CycloneDX SBOM, and gate CI on
  fixable `CRITICAL`/`HIGH` vulnerabilities (`make trivy-ci`).
- **Supply chain** — `bunfig.toml` only installs package versions published at least 3 days ago (`minimumReleaseAge`),
  limiting exposure to compromised or yanked releases.
- **Added dependencies**.
    - Dependencies
        - `@fsegurai/scrollspy` - `2.1.0` - needed for the demo table of contents navigation. Replaces `gumshoejs`.
    - Dev Dependencies
        - `@biomejs/biome` - `2.5.15` - needed for linting and formatting - replaces ESLint toolchain.
        - `@vitest/coverage-v8` - `4.1.11` - needed for test coverage reports (LCOV).
        - `concurrently` - `10.0.5` - needed for local development. Runs the library watch build and the demo dev
          server together.
        - `husky` - `9.1.7` - needed for Git hooks to enforce code quality and pre-commit checks.
        - `jsdom` - `30.1.2` - needed for testing purposes only. DOM environment for Vitest.
        - `vitest` - `4.1.11` - needed for unit and smoke tests. Replaces Karma and Jasmine.
- **Update dependencies** — address potential vulnerabilities and/or improvements in dependencies.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `@angular/common`, `@angular/core`, `@angular/platform-browser` from `^20.0.3` to `^21.0.0`
        - `@angular/router` added as `^21.0.0`
        - `marked` from `>= 15.0.0 < 16.0.0` to `^18.0.0`
    - Optional Dependencies (`@fsegurai/ngx-markdown`)
        - `emoji-toolkit` from `^9.0.1` to `^11.0.0`
        - `katex` from `^0.16.22` to `^0.19.0`
        - `mermaid` from `^11.6.0` to `^12.1.0`
    - Dependencies
        - `@angular/cdk` from `20.0.3` to `21.2.14`
        - `@angular/common` from `20.0.4` to `21.2.25`
        - `@angular/compiler` from `20.0.4` to `21.2.25`
        - `@angular/core` from `20.0.4` to `21.2.25`
        - `@angular/forms` from `20.0.4` to `21.2.25`
        - `@angular/material` from `20.0.3` to `21.2.14`
        - `@angular/platform-browser` from `20.0.4` to `21.2.25`
        - `@angular/router` from `20.0.4` to `21.2.25`
        - `emoji-toolkit` from `9.0.1` to `11.0.0`
        - `katex` from `0.16.22` to `0.19.0`
        - `marked` from `15.0.12` to `18.0.14`
        - `marked-gfm-heading-id` from `4.1.1` to `4.1.4`
        - `mermaid` from `11.6.0` to `12.1.0`
    - Dev Dependencies
        - `@angular/build` from `20.0.3` to `21.2.24`
        - `@angular/cli` from `20.0.3` to `21.2.24`
        - `@angular/compiler-cli` from `20.0.4` to `21.2.25`
        - `@angular/language-service` from `20.0.4` to `21.2.25`
        - `cpy-cli` from `5.0.0` to `7.0.0`
        - `ng-packagr` from `20.0.1` to `21.2.7`
        - `typescript` from `5.8.3` to `5.9.3`
- **Removed dependencies** — reduce the dependency surface.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `zone.js` - the library is zoneless-compatible.
    - Dependencies
        - `@angular/animations` - replaced by native `animate.enter` / `animate.leave` and CSS.
        - `@angular/flex-layout` - deprecated and unmaintained; replaced by plain CSS.
        - `@angular/platform-browser-dynamic` - deprecated and unused.
        - `gumshoejs` - replaced by `@fsegurai/scrollspy`.
        - `hammerjs` - unused.
        - `zone.js` - the demo runs zoneless.
        - `ngx-markdown` (`file:lib`) - the demo consumes the built library through a `tsconfig` path.
    - Dev Dependencies
        - ESLint toolchain: `@eslint/js`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`,
          `@typescript-eslint/types`, `@typescript-eslint/utils`, `angular-eslint`, `eslint`,
          `eslint-formatter-checkstyle`, `eslint-import-resolver-typescript`, `eslint-plugin-import`,
          `typescript-eslint` - replaced by Biome.
        - Karma/Jasmine toolchain: `@chiragrupani/karma-chromium-edge-launcher`, `@types/jasmine`, `jasmine-core`,
          `karma`, `karma-chrome-launcher`, `karma-coverage`, `karma-jasmine`, `karma-jasmine-html-reporter`,
          `karma-junit-reporter` - replaced by Vitest.
        - `linklocal`, `rimraf` - no longer needed for linking the library into the demo.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v21.0.0

---

## [20.0.1] - 2026-10-07

### 🐞 Fixes

- **Tests** — correct type casting in markdown service tests and remove a redundant `ViewRef` cast.

### 🔧 Infrastructure

- **Azure DevOps pipelines** — adapt the ADO build, PR, and release pipelines and the Appwrite Terraform infrastructure
  to `ngx-markdown`; update the release pipeline and Doppler command aliases.
- **CI** — add a coverage command (`test-ci_cd:coverage:lib`) and lint CI scripts; remove unused test results and
  coverage configurations from the PR pipeline; update the JUnit reporter output path in the Karma config.

### 🔐 Security

- **Dependencies** — update the lockfile and dependencies to their latest versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v20.0.1

---

## [20.0.0] - 2025-06-17

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 20** — upgraded the library to Angular `v20`. **(Note**: This change is not backward compatible.)

### 🚀 Features

- **Signals** — migrated the library to Angular signals.
- **Zoneless** — partial `zone.js` deprecation.

### 🐞 Fixes

- **Unit tests** — fixed unit tests after the refactoring and signals implementation.

### 🔧 Changes

- **Link service** — improved logic to better handle external and internal links.
- **Refactoring** — refactored pipes, services, and components for better declaration, error handling, and edge cases;
  overall logic implementation refactored.
- **CI/CD** — removed old CI/CD workflows.

### 🔐 Security

- **Dependencies** — upgraded library versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v20.0.0

---

## [19.2.0] - 2025-03-03

### 🚀 Features

- **Marked extensions** — dependency injection support for marked extensions.
- **Scrollspy** — new TOC validation for the scrollspy component.
- **Browser support** — added browser support configuration.
- **Azure DevOps** — added an ADO workflow.

### 🐞 Fixes

- **Tests** — changed the test browser to Edge and fixed the unit test config file.
- **Demo** — improved the get-started rendering and the project logo.

### 🔧 Changes

- **Project** — refactored the project structure, README, and license; improved the project demo.

### 🔐 Security

- **Dependencies** — upgraded library versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.2.0

---

## [19.1.0] - 2024-12-06

### 🐞 Fixes

- **Release workflows** — multiple fixes to the release library, release demo, and test workflows.
- **README** — fixed README content.

### 🔧 Changes

- **Project** — improved project structure, workflows, validations, and lint.
- **Documentation** — improved the README.
- **Demo** — improved the demo.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.1.0

---

## [19.0.0] - 2024-11-28

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 19** — upgraded the library to Angular `v19` (shipped first as `v19.0.0-beta.1`). **(Note**: This change is
  not backward compatible.)
- **Marked 15** — implemented `marked` version `15`.

### 🚀 Features

- **Mermaid** — global configuration for Mermaid and update options.

### 🔧 Changes

- **Project** — improved workflow validations, ESLint configuration, README, and demo structure.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.0.0

---

## [18.1.0] - 2024-11-13

### 🚀 Features

- **Marked 14** — `marked` v14 implementation and updated project libraries.
- **Mermaid** — new chart interfaces based on the current Mermaid release, including the new kanban chart.

### 🐞 Fixes

- **Anchors** — solution for Angular anchors rendered from markdown content.
- **Links** — fixed relative links to local repository files.
- **Mermaid** — improved Mermaid interfaces.
- **Pipelines** — multiple fixes across beta releases to the PR triage, release, and release demo pipelines and
  release workflow dependencies.
- **Labeler** — fixed labeler setup and documentation.

### 🔧 Changes

- **Pipelines** — improved the current pipeline workflow, validations, and schemas.
- **Scripts** — removed unused package scripts.

### 🔐 Security

- **Dependencies** — upgraded Mermaid and ESLint package versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v18.1.0

---

## [18.0.0] - 2024-10-25

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 18** — upgraded the library from Angular `v17` to `v18`. **(Note**: This change is not backward
  compatible.)

### 🐞 Fixes

- **npm publish** — fixed the npm publish pipeline tag setup and publish setup file on `determine_tag`.
- **Pipelines** — fixed pipelines setup and deprecated `save-state`/`set-output` commands.
- **Demo** — fixed the favicon reference.
- **README** — fixed the build badge and README content.

### 🔧 Changes

- **ESLint** — migrated ESLint from `8.57.0` to `v9.13.0` and improved the ESLint implementation.
- **npm publish** — optimized the npm publish pipeline.

### 🔐 Security

- **Dependencies** — upgraded library versions across beta releases; bumped `micromatch`, `express`, `dompurify`,
  `axios`, and `body-parser` (Dependabot).

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v18.0.0

---

## [17.0.0] - 2024-08-05

### 🚀 Features

- **RouterLink handler** — handle router links rendered from markdown content.
- **npm scripts** — added `package.json` npm scripts.

### 🐞 Fixes

- **Hyperlinks** — fixed hyperlink handling.
- **Markdown service** — fixed markdown service parsing.
- **Markdown component** — improved the markdown rendering component and fixed its HTML.
- **Demo** — fixed the demo structure.
- **Scripts** — fixed `package.json` commands and deployment scripts.

### 🔧 Changes

- **CI/CD** — updated the Angular CI/CD workflow across beta releases.
- **Cleanup** — removed unused commands.

### 🔐 Security

- **Dependencies** — upgraded library and demo library versions across beta releases; bumped `socket.io` and `braces`
  (Dependabot).

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v17.0.0

---

## ✅ Compatibility

| Angular | ngx-markdown |
|---------|--------------|
| 22      | 22.x         |
| 21      | 21.x         |
| 20      | 20.x         |
| 19      | 19.x         |
| 18      | 18.x         |
| 17      | 17.x         |

---

[unreleased]: https://github.com/fsegurai/ngx-markdown/compare/v22.0.0...HEAD

[22.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v21.0.1...v22.0.0

[21.0.1]: https://github.com/fsegurai/ngx-markdown/compare/v21.0.0...v21.0.1

[21.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v20.0.1...v21.0.0

[20.0.1]: https://github.com/fsegurai/ngx-markdown/compare/v20.0.0...v20.0.1

[20.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.2.0...v20.0.0

[19.2.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.1.0...v19.2.0

[19.1.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.0.0...v19.1.0

[19.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v18.1.0...v19.0.0

[18.1.0]: https://github.com/fsegurai/ngx-markdown/compare/v18.0.0...v18.1.0

[18.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v17.0.0...v18.0.0

[17.0.0]: https://github.com/fsegurai/ngx-markdown/commits/v17.0.0
