# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

No changes have been made yet.

---

## [22.0.0] - 2026-10-14

### ⚠️ BREAKING CHANGES ⚠️

Step-by-step instructions: "Migrating from 21 to 22" in the [README](README.md#migrating-from-21-to-22) and the
[22.0.0 migration guide](docs/22.0.0/content/guides/migrating-from-21.md).

- **Angular 22** — peer dependencies (`@angular/common`, `@angular/core`, `@angular/platform-browser`,
  `@angular/router`) require `^22.0.0`; TypeScript 6.0 (`>=6.0 <6.1`) and Node.js
  `^22.22.3 || ^24.15.0 || >=26` are required. **(Note**: This change is not backward compatible.)
- **`MarkdownModule` removed** — use `provideMarkdown(config)` instead of `MarkdownModule.forRoot(config)`, drop
  `MarkdownModule.forChild()` and import the standalone `MarkdownComponent` / `MarkdownPipe`. The config interface is
  now `MarkdownConfig`; `MarkdownModuleConfig` remains a deprecated alias until v23.
- **Optional peer dependencies** — `prismjs`, `emoji-toolkit`, `katex`, `mermaid` and `clipboard` moved from
  `optionalDependencies` to optional `peerDependencies` (`peerDependenciesMeta`): install each one you use explicitly.
- **Plugins require their `withX()` feature** — every optional feature is configured only in
  `provideMarkdown({ plugins: [...] })`, with no compatibility bridge:
    - removed `MarkdownConfig` fields `katexOptions`, `mermaidOptions`, `mermaidLoader`, `mermaidRenderTimeout`,
      `mermaidExportOptions`, `clipboardOptions`, `lightboxOptions`, and tokens `KATEX_OPTIONS`, `MERMAID_OPTIONS`,
      `MERMAID_LOADER`, `MERMAID_RENDER_TIMEOUT`, `MERMAID_EXPORT_OPTIONS`, `CLIPBOARD_OPTIONS`, `LIGHTBOX_OPTIONS`; use
      `withKatex(options)`, `withMermaid({ config, loader, renderTimeout })`, `withMermaidExport(options)`,
      `withClipboard(options)`, `withLightbox(options)`;
    - Prism highlighting (and the `[lineNumbers]`, `[lineHighlight]`, `[commandLine]` attributes) needs `withPrism()`;
      `[emoji]` needs `withEmoji()`. `MarkdownService.highlight()` still works without the plugin;
    - enabling a plugin that is not provided does nothing and logs one dev-mode `[ngx-markdown]` warning naming the
      `withX()` to add; `MarkdownService.rerenderMermaid()` without `withMermaid()` throws `ERROR_MERMAID_NOT_PROVIDED`;
    - unchanged: `MARKED_OPTIONS` / `markedOptions`, `MARKED_EXTENSIONS` / `markedExtensions`, per-component inputs and
      option types.
- **Removed deprecated APIs** — `ERROR_SRC_WITHOUT_HTTP_CLIENT`, `PrismPlugin.LineHighlight` (use `data-line`), and
  `defaultRenderer` in the Mermaid `flowchart`, `class` and `state` configs (use the top-level `layout`).
- **Mermaid config types follow Mermaid 12.1** — `zenUml` and `ZenUmlDiagramConfig` are removed; values Mermaid 12 no
  longer accepts are now type errors.
- **`error` output type** — `MarkdownComponent.error` emits `MarkdownError` (`Error | HttpErrorResponse | string`)
  instead of `string | Error`; type handlers as `MarkdownError` (or `unknown`).
- **`MarkdownService.render()` returns `Promise<void>`** — it settles once every plugin step is done. Highlighting and
  clipboard buttons beyond the first chunk complete after the call returns: `await render()` (or use `(ready)`) before
  reading the DOM. Errors reject the Promise instead of throwing; the new `RenderOptions.signal` (`AbortSignal`), a new
  `render()` or `cleanup()` stops the previous work. `highlight(element)` stays synchronous.
- **Plugin failures are isolated** — `render()` and `rerenderMermaid()` run every enabled plugin even when one fails
  (missing ClipboardJS, Mermaid or `ViewContainerRef`) and reject with the first error in plugin order; only plugins
  that `requires` the failed one are skipped.
- **Mermaid renders diagram by diagram** — `mermaid.render()` per `.mermaid` element replaces `mermaid.run()` (the
  global must provide `render`, Mermaid 10+). A failed diagram shows a `<div class="mermaid-error" role="status">` box
  while the others render; `render()` rejects with a `MermaidRenderError` listing every failure; `mermaid.parseError`
  and the `data-processed` attribute are no longer used.
- **KaTeX renders at parse time** — `$…$` and `$$…$$` are rendered with `katex.renderToString()` by a built-in Marked
  extension instead of Auto-Render: remove `katex/dist/contrib/auto-render.min.js` from `scripts`. The `delimiters`,
  `ignoredTags`, `ignoredClasses` and `errorCallback` options, `\(…\)` / `\[…\]` delimiters, math inside raw HTML blocks
  and `displayMode` are no longer supported; inline `$…$` follows marked-katex-extension spacing (`nonStandard: true`
  relaxes it). `RenderOptions.katex` / `RenderOptions.katexOptions` moved to `ParseOptions.katex` / `katexOptions`
  (`MarkdownPipeOptions` accepts both); invalid math with `throwOnError: true` stays as source text; `KatexOptions`
  gains `nonStandard`; `RenderMathInElementSpecificOptions` and `RenderMathInElementSpecificOptionsDelimiters` are
  removed.
- **Emoji not replaced inside code** — `[emoji]` / `ParseOptions.emoji` shortcodes are converted in text only, after
  tokenizing: code blocks and spans, raw HTML, link URLs and autolink/bare-URL text are left as written.
- **`markdown` pipe** — a non-string value resolves to `''` (with an `[ngx-markdown]` error) instead of passing through.
- **Incremental updates and time slicing are on by default** — on a `data`/`src` change, `<markdown>` keeps the DOM
  nodes of unchanged top-level blocks, so `(ready)` DOM edits must be idempotent; content of 16 KiB or more is parsed
  over several tasks, so wait for `ready` (or `ApplicationRef.whenStable()` / `fixture.whenStable()` in tests) before
  reading the DOM; a `markdown` pipe value replaced mid-parse resolves to `''`. Opt out with
  `provideMarkdown({ incrementalUpdates: false, timeSlicing: false })`.
- **Rendering options no longer re-render** — changing only `inline`, `emoji`, `clipboard`, `katex`, `mermaid` or Prism
  inputs applies on the next `data`/`src` change or `MarkdownService.reload()`; `mermaidOptions` is the exception.
- **Unset plugin inputs are `undefined`** — `[emoji]`, `[katex]`, `[lightbox]`, `[clipboard]`, `[mermaid]`,
  `[mermaidExport]`, `[frontMatter]`, `[lineNumbers]`, `[lineHighlight]`, `[commandLine]` default to `undefined` (not
  `false`), so the `[plugins]` record can enable them; when set, they win.
- **Unsafe links blocked** — clicks on `javascript:`, `data:` and `vbscript:` links are always prevented (with a
  warning) unless `disableRouterLinkHandler` is set; `data:` links are no longer opened as external links.
- **Modifier clicks left to the browser** — Ctrl/Meta/Shift/Alt and non-main-button clicks are no longer intercepted by
  `routerLinkOptions`, so "open in new tab" works.

### 🚀 Features

- **Plugin system** — the pipeline runs `MarkdownPlugin`s with ordered hooks (`preprocess`, `markedExtensions`,
  `postprocess`, `postSanitize`, `render`, `rerender`, `afterHighlight`, cleanup). Register custom plugins with
  `withMarkdownPlugin(plugin, options)` (`MARKDOWN_PLUGINS`, `MarkdownPluginFeature`) and enable them per component with
  the new `[plugins]` input (`true`, `false` or options) or the `plugins` option of the pipe and service; specific
  inputs win over the record. Plugin API: `requires`, `enforce: 'pre' | 'post'`, `validate`, `nestedOptions`,
  `exclusiveOptions`, `incremental`, `tokenizerExtensions`, per-parse `renderer`/`tokenizer` overrides, and
  `ctx.isEnabled(name)`, `ctx.onCleanup(fn)` / `ctx.onCleanup(cleanup, node)`, `ctx.serviceState`, `ctx.afterHighlight`.
  `MarkdownPlugin.incremental` lets a `render` hook run on the new nodes only (`MarkdownRenderContext.nodes`); every
  built-in plugin is incremental. See "Plugins" in the README.
- **Feature plugins** — `withEmoji()`, `withKatex()`, `withPrism()`, `withClipboard()`, `withLightbox()`,
  `withMermaid()`, `withMermaidExport()`, each with its plugin object (`emojiPlugin`, `katexPlugin`, `prismPlugin`,
  `clipboardPlugin`, `lightboxPlugin`, `mermaidPlugin`, `mermaidExportPlugin`), so code is only bundled when used.
  Options merge plugin defaults, then `withX()`, then per-component values (`undefined` never overrides). Front matter
  and `baseUrl` are built-in core plugins. `withPrism()` is enabled by default once provided (`{ prism: false }`
  disables it) and takes `PrismOptions` (`lineNumbers`, `start`, `lineHighlight`, `line`, `lineOffset`, `commandLine`,
  `filterOutput`, `host`, `prompt`, `output`, `user`), so global defaults such as `withPrism({ lineNumbers: true })`
  work for the component, pipe and `RenderOptions.prismOptions`. New export `MermaidPluginOptions`.
- **marked-extended integration** — `withMarkedExtended(features, options?)` integrates `@fsegurai/marked-extended-*`
  (19.0.0-beta.0+) without a hard dependency: pass each package as
  `{ name?, extension?, attach?, options?, afterHighlight? }` or a bare runtime (`attachAll`). Extensions apply per
  parse; runtimes attach in the browser only and are refreshed or disposed with the content. Enabled once provided
  (`[plugins]="{ markedExtended: false }"` disables it); `{ runtimes, events }` options merge per component. The new
  `(extendedEvent)` output emits `{ type, detail, event }` for `marked-extended:*` events (`MARKED_EXTENDED_EVENTS`).
  `withPrism()` honours per-block `mx-code-ln`, `mx-code-start-N`, `mx-code-highlight-…` and `mx-code-mark-…` tokens,
  and the clipboard shows the `figcaption` title (`.markdown-clipboard-title`, new `title` input on custom buttons) and
  skips removed diff lines (`skipRemovedLines`, default `true`).
- **`SANITIZE` token** — `provideMarkdown({ sanitize })` accepts a `SecurityContext` or a `SanitizeFunction` (e.g.
  `(html) => DOMPurify.sanitize(html)`, must return a string). Defaults to `SECURITY_CONTEXT` (`SecurityContext.HTML`);
  `disableSanitizer` still bypasses it.
- **KaTeX at parse time** — math is opt-in per parse, also rendered on the server when a global `katex` exists, and
  inserted after the sanitizer (so `SecurityContext.HTML` keeps its styles, MathML and SVG). A custom `sanitize` must
  keep the `<span class="ngx-katex-…">` placeholders. `[katex]` without the global emits `ERROR_KATEX_NOT_LOADED`.
  `KatexOptions` gains `trust` (`boolean | ((context: KatexTrustContext) => boolean)`, exported `KatexTrustContext`).
- **Mermaid** — 12.1 `MermaidAPI.MermaidConfig` types (v12 themes such as `neo`, `redux-color`, per-diagram
  `theme`/`look`/`layout`, ELK options, `dompurifyConfig`, new diagram configs), without importing `mermaid`:
    - **Loader** — `withMermaid({ loader: () => import('mermaid').then((m) => m.default) })` (`MermaidLoader`,
      `MermaidLike`) loads Mermaid as a lazy chunk in the browser only, cached per service, bounded by `renderTimeout`.
    - **Lazy diagrams (opt-in)** — `withMermaid({ lazy: true })` or `[plugins]="{ mermaid: { lazy: true } }"` draws
      diagrams near the viewport via `IntersectionObserver` (`lazyMargin`, default `'100% 0px'`); pending ones get
      `mermaid-pending` and `aria-busy="true"`, and `beforeprint` draws them all. `ready` and `whenStable()` no longer
      cover off-screen diagrams.
    - **Mermaid-only re-render** — `MarkdownService.rerenderMermaid(element, { mermaidOptions?, disableSanitizer? })`
      redraws diagrams from their kept sources without re-parsing (also accepts `plugins`, export options and a
      `viewContainerRef`); changing `[mermaidOptions]` triggers it reactively (coalesced, then `ready` or `error`), e.g.
      to follow a light/dark theme.
    - **SVG export** — the opt-in `[mermaidExport]` input adds an `SVG` download button per diagram (`diagram-<n>.svg`),
      with `mermaidExported` / `mermaidExportError` (`ERROR_MERMAID_EXPORT_FAILED`) outputs,
      `mermaidExportButtonComponent` / `mermaidExportButtonTemplate`, `mermaidExportFilenamePrefix`,
      `withMermaidExport({ buttonComponent, filenamePrefix })` and the default `MermaidExportButtonComponent`;
      `RenderOptions.mermaidExport` / `mermaidExportOptions` for the pipe and service.
- **Image lightbox** — the opt-in `[lightbox]` input opens content images in a built-in, dependency-free `<dialog>`
  viewer (caption, previous/next, counter, keyboard, focus return). `imageClick` (`MarkdownImageClickEvent`) can
  `preventDefault()` to use another viewer. `lightboxOptions` (`wrap`, `dialogLabel`, `closeLabel`, `previousLabel`,
  `nextLabel`, `openLabel`) merge over `withLightbox()`; the viewer is `MarkdownLightboxComponent`, themed with
  `--markdown-lightbox-*` custom properties.
- **Clipboard** — new `copied` (`MarkdownCopyEvent`: `{ text, language?, element }`) and `copyError`
  (`MarkdownCopyErrorEvent`, `ERROR_CLIPBOARD_COPY_FAILED`) outputs, and `clipboardOptions.onCopied` / `onCopyError` for
  the pipe and service. A custom `clipboardButtonComponent` (or `withClipboard({ buttonComponent })`; default
  `ClipboardButtonComponent`, per-component `clipboardButtonTemplate` replaces the global one) receives the `language`,
  `code`, `buttonTextCopy`, `buttonTextCopied` inputs it declares (`ClipboardButtonInputs`).
- **Relative URLs** — the opt-in `srcRelativeLink` input resolves links and images of a `src` file against the file;
  `baseUrl` (input and `ParseOptions.baseUrl`) sets a base for any content and wins over it.
- **Front matter** — the opt-in `frontMatter` input strips a leading YAML (`---`) or TOML (`+++`) block and the
  `metadata` output emits `MarkdownFrontMatter` (`{ data, raw }`). Also `ParseOptions.frontMatter`, `onFrontMatter` and
  `extractFrontMatter()` (for the pipe and `MarkdownService.parse()`).
- **Headings and ToC** — the `headings` output emits `MarkdownHeading[]` (`{ level, text, id, element }`) before
  `ready`; the opt-in `headingIds` input adds GitHub-style unique ids to headings without one (ids from
  `marked-gfm-heading-id` or a custom `renderer.heading` are kept; Angular's default sanitizer strips `id`). Also
  `ParseOptions.headingIds` and `onHeadings`.
- **`cacheSrc` (opt-in)** — `provideMarkdown({ cacheSrc: true })` (`MARKDOWN_CACHE_SRC`) fetches each `src` once per
  service (last 50, no expiry); failed requests are not cached and `MarkdownService.reload()` clears it.
- **Performance options** — `incrementalUpdates` (`MARKDOWN_INCREMENTAL_UPDATES`) and `timeSlicing`
  (`MARKDOWN_TIME_SLICING`), both on by default, and `contentVisibility` (`MARKDOWN_CONTENT_VISIBILITY`, opt-in); see ⚡
  Performance.

### 🔧 Changes

- **Mermaid queue and timeout** — one queue shared by all services; `mermaid.initialize()` runs only when options
  change. `withMermaid({ renderTimeout })` defaults to `30000` ms (`0` or `Infinity` disables; invalid values warn and
  fall back). Superseded renders are dropped. `MermaidRenderError` is exported with `failures: MermaidRenderFailure[]`.
- **`MermaidRunOptions`** — now top level; `MermaidAPI.RunOptions` remains a deprecated alias.
- **`RenderOptions.disableSanitizer`** — passed by `<markdown>` and the pipe for the `'loose'` warning.
- **`SECURITY_CONTEXT` deprecated** — use `SANITIZE` / `provideMarkdown({ sanitize })`; removal planned for v23.
- **Async plugin failures** — the first failure in plugin order is reported (Prism, then Mermaid, then others).

### ⚡ Performance

| Optimization (5000-line document)          | Before → After                                           |
|--------------------------------------------|----------------------------------------------------------|
| Time-sliced parse (`timeSlicing`, default) | Chromium TBT 410 → 187 ms (without sanitizer)            |
| Incremental updates (default)              | edit → `ready` 316 → 52 ms, TBT 1474 → 0 ms (Chromium)   |
| Line numbers (no per-block style recalc)   | Firefox longest task 4.3 s → 0.47 s, `ready` 5.4 → 1.5 s |
| Mermaid `lazy: true` (40 diagrams)         | Chromium `ready` 3104 → 1069 ms, TBT 939 → 161 ms        |
| `contentVisibility` (opt-in)               | Chromium TBT 425 → 170 ms, Firefox 800 → 567 ms          |
| Mermaid SVG cache (second render)          | Chromium 845 → 300 ms                                    |

- **Main-thread friendly rendering** — chunked Prism highlighting, progressive insertion of large documents, delegated
  clipboard listeners with chunked button creation, batched Mermaid writes and a linear `walkTokens`.
- **Caches** — per-service KaTeX output (last 50 expressions) and Mermaid SVG (last 50 diagrams) caches; emoji lookup
  via `joypixels.emojiList` instead of compiling Emoji-Toolkit's regex.
- **`contentVisibility`** — `<markdown contentVisibility>` or `provideMarkdown({ contentVisibility: true })` applies
  `content-visibility: auto` to off-screen top-level blocks. Opt-in because blocks become containers; see "Long
  documents" in the README.

### 🐞 Fixes

- **Hydration** — transcluded content is no longer re-parsed on the client with decoded entities
  (`data-markdown-transclusion`).
- **Accessibility** — clipboard copies are announced via a polite `role="status"` region (`statusTextCopied`, default
  `Copied to clipboard`; `statusTextCopyFailed`, default `Copy failed`); lightbox triggers get `aria-haspopup="dialog"`
  and an `openLabel` name (string or `(index, total) => string`); Mermaid error boxes use `role="status"`; Mermaid
  export gains `buttonLabel` (`(index, filename) => string`).
- **Global `marked` mutation** — each `MarkdownService` uses its own `Marked` instance; `markdownService.renderer`
  methods take precedence over extension overrides.
- **Load pipeline** — `data`, `src`, transclusion and `reload()` share one cancellable pipeline (latest wins); a
  non-empty `data` wins over `src` with a warning.
- **`SECURITY_CONTEXT` default** — defaults to `SecurityContext.HTML`, so `<markdown>` and the pipe work without
  `provideMarkdown()` instead of throwing `NG0201`.
- **`markdown` pipe** — always resolves to `SafeHtml` or `''` and tracks its post-render step as a pending task.
- **Messages** — every library message is prefixed with `[ngx-markdown]`.
- **Links** — `routerLinkOptions` `global`/`paths` `NavigationExtras` are passed to `router.navigate`; `www.` links open
  as `https://`; `/localFile:` is matched before `/`; fragments scroll to the id.
- **`src` handling** — the extension is read from the file name only (case-insensitive, `.md` and `.markdown`); fences
  for non-Markdown files and the `language` pipe no longer break on content containing ```` ``` ````.
- **Prism options** — `start = 0` / `lineOffset = 0` are kept; malformed `line`, `start`, `lineOffset` are ignored with
  a warning.
- **Math** — expressions with `_`, `*` or `\` are no longer mangled by Markdown.
- **Mermaid** — rendering is awaited before `ready`; concurrent components no longer swap configurations; every failed
  diagram is reported and no temporary error SVG is left in the body; sources are kept for re-rendering.
- **Clipboard** — buttons and ClipboardJS instances are destroyed on re-render; `undefined` inputs no longer override
  `withClipboard()`; the `languageButton` label shows the `language-xxx` token only (`Copy` without one); "copied"
  appears only on success; the button is `type="button"` and `onCopyToClipboardClick()` is replaced by public
  `showCopied()`.

### 🔐 Security

- **Reverse tabnabbing** — external and `/localFile:` links open with `noopener,noreferrer`.
- **Script URLs** — `javascript:`, `data:` and `vbscript:` links (including obfuscated forms) are never navigated to.
- **Custom sanitizer** — the `SANITIZE` token allows a stricter sanitizer such as DOMPurify.
- **Mermaid `securityLevel`** — `'strict'` is the explicit default; a warning is logged when `'loose'` is combined with
  `disableSanitizer`.
- **KaTeX `trust`** — enables `\href`, `\url`, `\includegraphics` and `\html*` without sanitizing; keep it `false` for
  untrusted content.
- **Update dependencies** — address potential vulnerabilities and/or improvements in dependencies.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `@angular/common`, `@angular/core`, `@angular/platform-browser`, `@angular/router` from `^21.0.0` to `^22.0.0`
    - Dependencies
        - `@angular/cdk`, `@angular/material` from `21.2.14` to `22.2.2`
        - `@angular/common`, `@angular/compiler`, `@angular/core`, `@angular/forms`, `@angular/platform-browser`,
          `@angular/router` from `21.2.25` to `22.2.1`
        - `marked` from `18.0.14` to `18.1.0`
    - Dev Dependencies
        - `@angular/build`, `@angular/cli` from `21.2.24` to `22.2.2`
        - `@angular/compiler-cli`, `@angular/language-service` from `21.2.25` to `22.2.1`
        - `ng-packagr` from `21.2.7` to `22.2.4`
        - `typescript` from `5.9.3` to `6.0.3`
        - `vitest`, `@vitest/coverage-v8` from `4.1.11` to `5.0.3`

### 📝 Documentation

- **Migration guide** — "Migrating from 21 to 22" in the README, linking "Migrating from MarkdownModule" and "Migrating
  to 22: plugins".
- **Mermaid 12** — appearance changes and how to restore the classic look
  (`{ layout: 'dagre', look: 'classic', theme: 'default' }`); loader vs. global script setup.
- **Demo** — pages updated for 22.0.0 (plugins, bindings, cheat sheet, re-render); Mermaid follows the light/dark theme.

### 🔧 Infrastructure

- **Compile target** — the library compiles with ES2022 (was ES2015), matching Angular 22's browser baseline.
- **Mermaid type checks** — `bun run check:mermaid-types` (in `build:lib`) and `bun run generate:mermaid-types`.
- **Checks and tests** — `type-check:lib` also checks specs; Vitest configs are ES modules.
- **Demo** — Angular's default browser list, Router-based fragment links, Mermaid loaded on demand (pages without
  diagrams no longer download 5.5 MB), an edit benchmark (`/perf?edits=n`), and Material tab pagination disabled.

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
