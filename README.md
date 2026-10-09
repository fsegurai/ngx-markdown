<p align="center" class="intro">
  <img alt="Ngx Markdown Logo" src="https://raw.githubusercontent.com/fsegurai/ngx-markdown/main/demo/public/ngx-markdown.png">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/ngx-markdown">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/93779823-473d-4fb3-a5b1-27aaa1a88ea2/24/main?label=Build%20Status&"
          alt="Build Main Status">
  </a>
  <a href="https://github.com/fsegurai/ngx-markdown/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/ngx-markdown"
          alt="Latest Release">
  </a>
  <br>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/fsegurai/ngx-markdown">
  <img alt="Dependency status for repo" src="https://img.shields.io/librariesio/github/fsegurai/ngx-markdown">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="GitHub License" src="https://img.shields.io/github/license/fsegurai/ngx-markdown">
  </a>
  <br>
  <img alt="Stars" src="https://img.shields.io/github/stars/fsegurai/ngx-markdown?style=square&labelColor=343b41"/> 
  <img alt="Forks" src="https://img.shields.io/github/forks/fsegurai/ngx-markdown?style=square&labelColor=343b41"/>
  <a href="https://www.npmjs.com/package/@fsegurai/ngx-markdown">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@fsegurai/ngx-markdown">
  </a>
</p>

`@fsegurai/ngx-markdown` is an [Angular](https://angular.dev/) library that combines...

- [Marked](http://marked.js.org/) to parse Markdown to HTML
- [Prism.js](http://prismjs.com/) for language syntax highlight
- [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji support
- [KaTeX](https://katex.org/) for math expression rendering
- [Mermaid](https://mermaid-js.github.io/) for diagrams and charts visualization
- [Clipboard.js](https://clipboardjs.com/) to copy code blocks to the clipboard

### Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Plugins](#plugins)
- [Renderer](#renderer)
- [Re-renderer Markdown](#re-render-markdown)
- [Syntax highlight](#syntax-highlight)
- [SSR / prerendering](#ssr--prerendering)
- [Demo application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/ngx-markdown

To add `@fsegurai/ngx-markdown` along with the required marked library to your `package.json` use the following commands.

```bash
npm install @fsegurai/ngx-markdown marked@^18.0.0 --save
```

> :bell: **Requirements** — `@fsegurai/ngx-markdown` 22.x requires **Angular `^22`** (TypeScript `>=6.0 <6.1`,
> Node.js `^22.22.3 || ^24.15.0 || >=26`) and `marked ^18`. The plugin packages (`prismjs`, `emoji-toolkit`, `katex`,
> `mermaid`, `clipboard`) are **optional peer dependencies**: they are not installed with the library, so install each
> one explicitly (see the sections below) only when you use it. The optional plugins are tested with
> `katex ^0.19`, `mermaid ^12` and `emoji-toolkit ^11`. Mermaid 12 requires **Node.js ≥ 22.12** for build tooling and
> a modern browser (e.g. Safari 17.4+). The `dist` paths used below for KaTeX, Mermaid and Emoji-Toolkit are unchanged.

### Syntax highlighting

> :bell: Syntax highlight is **optional**, skip this step if you are not planning to use it

To add [Prism.js](http://prismjs.com/) library to your `package.json` use the following command.

```bash
npm install prismjs@^1.30.0 --save
```

To activate [Prism.js](http://prismjs.com/) syntax highlight, you will need to include...

- prism.js core library - `node_modules/prismjs/prism.js` file
- a highlight CSS theme - from `node_modules/prismjs/themes` directory
- desired code language syntax files - from `node_modules/prismjs/components` directory

_Additional themes can be found by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example._

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

Then provide the Prism plugin, which highlights the code blocks of every `<markdown>` (see
[Clipboard and Prism plugins](#clipboard-and-prism-plugins)). Without it, nothing is highlighted at render time.

```typescript
provideMarkdown({ plugins: [withPrism()] })
```

```diff
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-csharp.min.js", # c-sharp language syntax
+ "node_modules/prismjs/components/prism-css.min.js" # css language syntax
]
```

#### Line Numbers plugin

To use the [line numbers plugin](http://prismjs.com/plugins/line-numbers/) that shows line numbers in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-numbers` directory to your application:

- CSS styling for line numbers - `prism-line-numbers.css`
- line numbers plugin script - `prism-line-numbers.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineNumbers` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

Additionally, you can use `start` input property to specify the offset number for the first display line.

```html
<markdown
  [lineNumbers]="true"
  [start]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Line Highlight plugin

To use the [line highlight plugin](http://prismjs.com/plugins/line-highlight/) that highlights specific lines and/or line ranges in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-highlight` directory to your application:

- CSS styling for line highlight - `prism-line-highlight.css`
- line highlight plugin script - `prism-line-highlight.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineHighlight` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.

`line` takes comma-separated line numbers or ranges, as a string or a string array (`'6, 10-16'`, `['6', '10-16']`), and `lineOffset` (like the line numbers `start`) takes an integer, `0` included. Invalid values are ignored, with a one-time `[ngx-markdown]` warning.

```html
<markdown
  [lineHighlight]="true"
  [line]="'6, 10-16'"
  [lineOffset]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Command Line Plugin

To use the [command line plugin](https://prismjs.com/plugins/command-line/) that displays a command line with a prompt and, optionally, the output/response from the commands, you will need to include the following files from `prismjs/plugins/command-line` directory to your application:

- CSS styling for command line - `prism-command-line.css`
- command line plugin script - `prism-command-line.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `commandLine` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

For a server command line, specify the user and host names using the `user` and `host` input properties. The resulting prompt displays a `#` for the root user and `$` for all other users. For any other command line, such as a Windows prompt, you may specify the entire prompt using the `prompt` input property.

You may also specify the lines to be presented as output (no prompt and no highlighting) through the `output` property in the following simple format:

- A single number refers to the line with that number
- Ranges are denoted by two numbers, separated with a hyphen (-)
- Commas separate multiple line numbers or ranges
- Whitespace is allowed anywhere and will be stripped off

```html
<markdown
  [commandLine]="true"
  [user]="'chris'"
  [host]="'remotehost'"
  [output]="'2, 4-8'"
  [src]="'path/to/file.bash'">
</markdown>
```

Optionally, to automatically present some lines as output without providing the line numbers, you can prefix those lines with any string and specify the prefix using the `filterOutput` input property. For example, `[filterOutput]="'(out)'"` will treat lines beginning with `(out)` as output and remove the prefix.

```html
<markdown
  [commandLine]="true"
  [prompt]="'PS C:\Users\Chris>'"
  [filterOutput]="'(out)'">
  ```PowerShell
  Get-Date
  (out)
  (out)Sunday, November 7, 2021 8:19:21 PM
  (out)
  `​``
</markdown>
```

### Emoji support

> :bell: Emoji support is **optional**, skip this step if you are not planning to use it

To add [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) library to your `package.json` use the following command.

```bash
npm install emoji-toolkit@^11.0.0 --save
```

To activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji support, you will need to include...

- Emoji-Toolkit library - `node_modules/emoji-toolkit/lib/js/joypixels.min.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/emoji-toolkit/lib/js/joypixels.min.js",
]
```

#### Emoji plugin

Provide the plugin with `provideMarkdown({ plugins: [withEmoji()] })` (see [Plugins](#plugins)); without it, `[emoji]`
does nothing (a dev-mode warning names `withEmoji()`).

Using `markdown` component and/or directive, you will be able to use the `emoji` property to activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) plugin that converts emoji shortnames such as `:heart:` to native Unicode emojis.

```html
<markdown [emoji]="true">
  I :heart: @fsegurai/ngx-markdown
</markdown>
```

Only the text is converted: shortcodes inside code blocks, inline code, raw HTML tags and link URLs are left as written.
The label of a link written as `[label](url)` or `[label][ref]` is converted; an autolink (`<https://…>`) or a bare URL
shows its URL, so it is left as written, like its `href`.

The shortcodes are looked up in Emoji-Toolkit's `emojiList`, with the same result as `joypixels.shortnameToUnicode`
(alternate shortnames, skin tones, flags and ZWJ sequences included; unknown shortcodes stay as written). With
`joypixels.ascii = true` (ASCII smileys such as `:)`), `shortnameToUnicode` itself is used.

> :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_.

### Math rendering

> :bell: Math rendering is **optional**, skip this step if you are not planning to use it

To add [KaTeX](https://katex.org/) library to your `package.json` use the following command.

```bash
npm install katex@^0.19.0 --save
```

To activate [KaTeX](https://katex.org/) math rendering, you will need to include...

- KaTeX JavaScript library - `node_modules/katex/dist/katex.min.js` file (it provides the global `katex`)
- KaTeX CSS - `node_modules/katex/dist/katex.min.css` file

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/katex/dist/katex.min.css"
],
"scripts": [
+ "node_modules/katex/dist/katex.min.js",
]
```

> :bell: The KaTeX Auto-Render extension (`katex/dist/contrib/auto-render.min.js`) is no longer used: remove it from
> your `scripts`.

#### KaTeX plugin

Provide the plugin with `provideMarkdown({ plugins: [withKatex(options)] })` (see [Plugins](#plugins)); without it,
`[katex]` does nothing (a dev-mode warning names `withKatex()`).

Using `markdown` component and/or directive, you will be able to use the `katex` property to activate [KaTeX](https://katex.org/) plugin that renders mathematical expression to HTML.

```html
<markdown
  [katex]="true"
  [src]="path/to/file.md">
</markdown>
```

The math is rendered with `katex.renderToString()` **while the Markdown is parsed**, by a small built-in Marked
extension, so `_`, `*` and `\` inside math are never turned into emphasis or escapes (`$a_1 * b_2$` renders as math).

| Syntax                                | Renders                                                                     |
|---------------------------------------|-----------------------------------------------------------------------------|
| `$…$`                                 | inline math                                                                 |
| `$$…$$` in a line                     | display math                                                                |
| `$$`, the expression, `$$` on 3 lines | a display math block (a single `$` on each line gives an inline-mode block) |
| `\$`                                  | a literal dollar                                                            |

- The opening `$` must start the text or follow whitespace (a space, a tab or a line break) or an opening bracket or
  quote, and the closing `$` must be followed by whitespace, punctuation, a closing bracket or quote, or the end of the
  text, so `($x$)` renders and `costs $5 and $10` stays text. Set `nonStandard: true` to also render math without
  surrounding spaces (`a$x$b`).
- Math in code spans and code blocks is left untouched. Math inside raw HTML blocks (e.g. `<p align="center">$x$</p>`)
  is not rendered, as Marked does not parse Markdown there.
- Other delimiters (`\(…\)`, `\[…\]`, `\begin{equation}…`) are not supported: write them as `$…$` or `$$…$$` (an
  environment such as `\begin{aligned}…\end{aligned}` works inside `$$…$$`).
- The extension is opt-in per parse: without `katex`, `$x$` stays text, and the global `katex` is not needed.

Optionally, you can use the `katexOptions` property to specify [KaTeX options](https://katex.org/docs/options.html),
plus `nonStandard`. Application-wide defaults go in `withKatex(options)`; the `katexOptions` input is merged over them
and wins. `displayMode` is set by the delimiters.

```typescript
import {KatexOptions} from '@fsegurai/ngx-markdown';

public options: KatexOptions = {
  throwOnError: false,
  errorColor: '#cc0000',
  macros: { '\\RR': '\\mathbb{R}' },
};
```

```html
<markdown
  [katex]="true"
  [katexOptions]="options"
  [src]="path/to/file.md">
</markdown>
```

```typescript
// app.config.ts: defaults for every <markdown [katex]>
provideMarkdown({ katexOptions: { throwOnError: false } })
```

> :blue_book: Follow the official [KaTeX options](https://katex.org/docs/options.html) documentation for more details on the available options.

**Errors.** With `throwOnError: true` (KaTeX's default), an invalid expression does not fail the whole content: it is
left as its source text and the error is logged with `console.error`. With `throwOnError: false`, KaTeX renders it in
`errorColor` with the error as its tooltip. In the browser, `[katex]` without the global `katex` throws
`ERROR_KATEX_NOT_LOADED` (emitted through the `error` output).

**SSR.** `katex.renderToString()` needs no DOM, so math is rendered on the server too when `katex` is available there
as a global (e.g. `globalThis.katex = katex` in `server.ts`, with `import katex from 'katex'`). Without it, the
server leaves the math as its source text (with its `$` delimiters, `_` and `*` kept), and the browser renders it.

**Sanitizing.** KaTeX's HTML relies on inline `style` attributes (the vertical position of sub- and superscripts,
fractions, strut heights), MathML (for screen readers) and inline SVG (radicals, wide accents). Angular's sanitizer
(`SecurityContext.HTML`, the default) strips all three, so the KaTeX output is **inserted after the sanitizer has
run**, in place of a placeholder: the rest of the content is sanitized as usual, with any `sanitize` setting. This is
the same security model as the 21.x post-render step: KaTeX escapes the TeX it renders, so its output only carries
user-controlled links or attributes when `trust` allows them.

With a custom `sanitize` function, the placeholders must survive it: allow empty `<span>` elements with their `class`
attribute (`<span class="ngx-katex-…"></span>`). The placeholder may be re-serialised (single quotes, extra spaces),
but if the sanitizer removes it, removes its `class` or changes the class value, that math is dropped and one warning
prefixed with `[ngx-markdown]` is logged per parse, with the number of dropped expressions. A `SecurityContext` always
keeps them. DOMPurify's default configuration keeps them too; with an allow-list, include `span` and `class`:

```typescript
import DOMPurify from 'dompurify';

provideMarkdown({
  sanitize: (html: string) =>
    DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'a', 'em', 'strong', 'code', 'pre', 'ul', 'ol', 'li', 'span'], // keep `span`
      ALLOWED_ATTR: ['href', 'class'], // keep `class` (span[class^="ngx-katex-"])
    }),
})
```

> :warning: KaTeX's `trust` option enables commands such as `\href`, `\url`, `\includegraphics`, `\htmlClass`, `\htmlId`, `\htmlStyle` and `\htmlData`, which add links, images and HTML attributes to the output. The KaTeX output is inserted after the HTML sanitization, so this output is not sanitized: keep `trust` set to `false` (the default) for untrusted content, or pass a function that only trusts what you allow, e.g. `trust: ({ command, protocol }) => command === '\\href' && protocol === 'https'`.

### Diagrams tool

> :bell: Diagram support is **optional**, skip this step if you are not planning to use it

To add [Mermaid](https://mermaid-js.github.io/) library to your `package.json` use the following command.

```bash
npm install mermaid@^12.1.0 --save
```

Mermaid can be loaded in two ways: on demand, through a loader function (recommended), or as a global script.

Either way, provide the Mermaid plugin with `withMermaid()` (see
[Mermaid and Mermaid export plugins](#mermaid-and-mermaid-export-plugins)); without it, `[mermaid]` does nothing.

**Option 1: load Mermaid on demand (`loader`).** Give `withMermaid()` a function that imports Mermaid. The import
becomes a lazy chunk: only pages that render a diagram download Mermaid, and only the diagram types they use.

```typescript
provideMarkdown({
  plugins: [withMermaid({ loader: () => import('mermaid').then((m) => m.default) })],
}),
```

- The loader is called on the first render that has a diagram to draw, and its instance is reused by every later render
  (and every `<markdown>` using the same `MarkdownService`). `() => import('mermaid')` works too: when the loader
  resolves to the module namespace, its `default` export is used.
- It is never called on the server (SSR, prerendering): diagrams are only drawn in the browser, as before.
- When the loader fails (e.g. a network error while fetching the chunk), every diagram of that render shows a
  `.mermaid-error` box and the render rejects with a `MermaidRenderError` (the `error` output of `<markdown>`), as for
  any other Mermaid failure. The failed load is not kept: the next render calls the loader again. The load is bounded
  by the render timeout (`renderTimeout`), counted once from when the load starts (renders that join a pending
  load share its remaining time), so a load that never settles fails instead of blocking every later render; with the
  timeout disabled (`0`), a stalled load waits indefinitely.
- The loader takes precedence over a global `mermaid`. It is typed `MermaidLoader` (`() => Promise<MermaidLike>`); `MermaidLike` is the structural part of the Mermaid API the library uses, so the
  library itself never imports `mermaid`, which stays an optional peer.
- Mermaid pulls in a few CommonJS packages, so the Angular CLI warns about them. List them in the build options of
  `angular.json` to silence the warnings:

```json
"allowedCommonJsDependencies": ["@braintree/sanitize-url", "cytoscape-cose-bilkent", "cytoscape-fcose", "dayjs", "elkjs"]
```

The demo application uses this setup: its pages without diagrams no longer download the 5.5 MB Mermaid script.

**Option 2: load Mermaid as a global script.** Without a `loader`, the library uses the global `mermaid` of the
prebuilt file, `node_modules/mermaid/dist/mermaid.min.js`, which must be loaded before a diagram is rendered (otherwise
rendering throws `ERROR_MERMAID_NOT_LOADED`). It is simpler, needs no bundler support for dynamic imports, but every page
downloads all of Mermaid (about 5.5 MB) up front.

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/mermaid/dist/mermaid.min.js",
]
```

As a `scripts` entry the file is re-bundled on every build, counts toward the initial bundle budget, and makes esbuild
print a harmless `Comparison with -0` warning from Mermaid's own code. To avoid that, copy it as an asset under a
versioned path (so browsers fetch the new file after an upgrade) and load it from `index.html`:

```diff
"assets": [
+ {
+   "glob": "mermaid.min.js",
+   "input": "node_modules/mermaid/dist",
+   "output": "mermaid/12.1.0/"
+ }
]
```

```diff
<head>
+ <script src="mermaid/12.1.0/mermaid.min.js"></script>
</head>
```

> Keep the version in both paths in sync with the installed `mermaid` version.

#### Mermaid plugin

Using `markdown` component and/or directive, you will be able to use the `mermaid` property to activate [Mermaid](https://mermaid-js.github.io/) plugin that renders Markdown-inspired text definitions to create and modify diagrams dynamically.

```html
<markdown
  [mermaid]="true"
  [src]="path/to/file.md">
</markdown>
```

#### Global configuration
You can provide a global configuration for mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) to use across your application with the `withMermaid()` plugin feature (see [Mermaid and Mermaid export plugins](#mermaid-and-mermaid-export-plugins)):
```typescript
provideMarkdown({
  plugins: [withMermaid({ config: { darkMode: true, look: 'handDrawn' } })],
}),
```
#### Mermaid 12 appearance
Mermaid 12 changed how diagrams look when nothing is configured:

- the layout engine defaults to ELK (`layout: 'elk'`) instead of dagre;
- most diagrams default to the `redux-color` theme and the `neo` look.

To restore the classic (Mermaid 11) appearance, pin these options in the `config` of `withMermaid()` (or in the
component `mermaidOptions`):

```typescript
provideMarkdown({
  plugins: [withMermaid({ config: { layout: 'dagre', look: 'classic', theme: 'default' } })],
}),
```

#### Component configuration
Additionally, you can specify mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) on a component directly using `mermaidOptions` property.

```typescript
import {MermaidAPI} from '@fsegurai/ngx-markdown';

public options: MermaidAPI.MermaidConfig = {
  darkMode: true,
  look: 'handDrawn',
  ...
};
```

```html
<markdown
  [mermaid]="true"
  [mermaidOptions]="options"
  [src]="'path/to/file.md'">
</markdown>
```

#### Following a light/dark theme
`mermaidOptions` is the one rendering input of `<markdown>` that is tracked: when its value changes after the content
has been rendered with `mermaid` enabled, only the Mermaid diagrams are rendered again, from their kept sources. The
Markdown is not parsed again, so highlighted code, clipboard buttons, KaTeX and the scroll position are kept. Bind it to
a signal or a `computed` derived from your theme:

```typescript
import { computed, inject } from '@angular/core';
import { MermaidAPI } from '@fsegurai/ngx-markdown';

private readonly themeService = inject(ThemeService); // your app theme, e.g. with an `isDark` signal

readonly mermaidOptions = computed<MermaidAPI.MermaidConfig>(() =>
  this.themeService.isDark() ? { theme: 'dark', darkMode: true } : { theme: 'default', darkMode: false },
);
```

```html
<markdown [mermaid]="true" [mermaidOptions]="mermaidOptions()" [src]="'path/to/file.md'" />
```

- The component emits `ready` again once the diagrams are re-rendered, or `error` with a `MermaidRenderError` when one
  fails (diagrams that showed an error box are rendered again from their source too).
- Changes in a row are coalesced: only the latest re-render draws its diagrams and emits; a render it supersedes does
  not emit.
- A value equal to the last one (compared by content, not by reference) does nothing, and so does a change while the
  `mermaid` input is `false` or before the first render. A change while new content is still loading is applied to that
  render instead.

Without the component (e.g. with the `markdown` pipe and `render()`), or when only a global theme changes, call
`MarkdownService.rerenderMermaid()` on the element you rendered:

```typescript
// Re-renders the .mermaid diagrams of the element; resolves, or rejects with a MermaidRenderError
await markdownService.rerenderMermaid(element, { mermaidOptions: { theme: 'dark', darkMode: true } });
```

Its options are merged like a render's (defaults, then the `config` of `withMermaid()`, then `mermaidOptions`). It goes through the
shared Mermaid queue and supersedes the element's pending Mermaid render, so the latest call wins.

> :blue_book: Follow official [Mermaid](https://mermaid-js.github.io/) documentation for more details on diagrams and charts syntax.

#### Rendering and errors
Each `.mermaid` element is rendered on its own with `mermaid.render()`:

- The diagram source is read from the element's text (the HTML-escaped source decodes back to the original
  characters) and kept, so the element can be rendered again after its SVG (or error box) has replaced the source. If
  you reuse a `.mermaid` element and replace its content with a new diagram, its new text is rendered.
- Each diagram gets a page-unique id, its SVG replaces the element content, and its interactions (`click` callbacks,
  `securityLevel: 'loose'` only) are bound to the element.
- Each `mermaid.render()` call has 30 seconds to settle by default (see [Render timeout](#render-timeout)). A diagram
  that takes longer fails with an `[ngx-markdown] Mermaid diagram did not render within 30000 ms` error, like any other
  failure, so a hung diagram never blocks the diagrams of the page; a result that arrives later is ignored.
- A diagram that fails does not stop the others. Its content is replaced by an error box, logged with an
  `[ngx-markdown]` prefix, and the render rejects once every diagram is settled: `<markdown>` emits `error` (instead of
  `ready`), the pipe reports it to the `ErrorHandler`. The rejection is a `MermaidRenderError` whose `failures` list
  each failed `element` and Mermaid's `error`.
- When `mermaid.initialize()` throws (e.g. an invalid configuration), no diagram of the render is drawn: each one shows
  the error box with that error, and the render rejects with a `MermaidRenderError` listing every diagram.

```html
<div class="mermaid">
  <div class="mermaid-error" role="alert">Mermaid diagram error: Parse error on line 2: ...</div>
</div>
```

The box has no inline styles; style it with the `.mermaid-error` class, e.g.:

```css
.mermaid-error {
  padding: 0.75rem 1rem;
  border: 1px solid #d33;
  border-radius: 4px;
  color: #b00;
  white-space: pre-wrap;
}
```

Mermaid's configuration is global to the page, so every `MarkdownService` shares one rendering queue: a render calls
`mermaid.initialize()` only when its merged options (defaults, then `withMermaid()`'s `config`, then `mermaidOptions`) differ
from the ones last applied, then renders its diagrams before the next render starts. Components with different
`mermaidOptions` therefore no longer race. If your own code calls `mermaid.initialize()`, the next render with
unchanged options does not apply them again; render with different options (or load Mermaid only through this library).
Options that cannot be compared by value (class instances, symbols) make every render call `mermaid.initialize()` again.

A new `render()` or a `cleanup()` of the same element, or the element leaving the document, supersedes the diagrams it
has not drawn yet: they are no longer drawn, their failures are not reported, and the older render resolves.

#### SVG export
Set `mermaidExport` to add an export button to every rendered diagram (not to the `.mermaid-error` boxes). A click
downloads the diagram as an SVG file, named `diagram-1.svg`, `diagram-2.svg`… after the position of the diagram in the
content. It is opt-in, like `clipboard`, needs `mermaid`, and is provided with `withMermaidExport()`:

```html
<markdown
  [data]="markdown"
  [mermaid]="true"
  [mermaidExport]="true"
  (mermaidExported)="onExported($event)"
  (mermaidExportError)="onExportError($event)">
</markdown>
```

- **What is downloaded:** the SVG markup Mermaid returned for the diagram, as a `Blob` (`image/svg+xml;charset=utf-8`)
  saved through a temporary `<a download>`. It is a standalone file (Mermaid adds the `xmlns` and embeds its styles in
  the `<svg>`), it never contains the button, and it follows the theme: a re-render (e.g. a `mermaidOptions` change)
  recreates the buttons for the new SVGs. With `securityLevel: 'sandbox'`, Mermaid renders an `<iframe>`, so those
  diagrams get no button.
- **Button:** the default `MermaidExportButtonComponent` is a `<button type="button" class="markdown-mermaid-export-button">`
  labelled `SVG`, with an `aria-label` naming the file. It has no inline styles; it sits in a `.markdown-mermaid-toolbar`
  added to the `.mermaid` element after the `<svg>`, at its top right (the `.mermaid` element gets `position: relative`
  when it has no positioning of its own). Style both classes globally (or with `::ng-deep`).
- **Custom button:** `mermaidExportButtonComponent` (a component) or `mermaidExportButtonTemplate` (an `ng-template`);
  a click anywhere in it downloads the file. A component gets the `svg` and `filename` inputs it declares (the others
  are not set, so it may declare none), e.g. to copy the markup with `navigator.clipboard.writeText(svg())`.
- **File name:** `mermaidExportFilenamePrefix` replaces `diagram` (`flow` gives `flow-1.svg`).
- **Events:** `mermaidExported` (`MarkdownMermaidExportEvent`: `{ element, svg, filename }`) once the download has been
  triggered, `mermaidExportError` (`MarkdownMermaidExportErrorEvent`: `{ error, element, filename }`, the `error` has
  the `ERROR_MERMAID_EXPORT_FAILED` message and the thrown error as `cause`) when it could not be.
- **Global options:** `provideMarkdown({ plugins: [withMermaid(), withMermaidExport({ buttonComponent, filenamePrefix })] })`.
  The inputs win over them, unset inputs never override them, and a button set on the component (a component or a
  template) replaces the global one. Enabling the export stays per component.
- **Pipe and service:** pass `{ mermaid: true, mermaidExport: true, mermaidExportOptions: { onExported, onExportError } }`
  (`RenderOptions`); a `ViewContainerRef` is required (`ERROR_MERMAID_EXPORT_VIEW_CONTAINER_REQUIRED`), and
  `MarkdownService.rerenderMermaid(element, options, viewContainerRef)` takes the same options. Nothing is created on
  the server.

```typescript
@Component({
  selector: 'app-export-button',
  template: `<button type="button" (click)="copy()">Download {{ filename() }}</button>`,
})
export class ExportButtonComponent {
  readonly svg = input<string>();
  readonly filename = input<string>();

  copy(): void {
    // The click also downloads the file; this copies the markup as well
    void navigator.clipboard.writeText(this.svg() ?? '');
  }
}
```

#### Render timeout
Set the time one `mermaid.render()` call may take with `withMermaid({ renderTimeout })`, in milliseconds. It defaults to `30000`; `0` or `Infinity` disables it. An invalid
value (a negative number, `NaN`) falls back to `30000` with an `[ngx-markdown]` warning.

```typescript
provideMarkdown({ plugins: [withMermaid({ renderTimeout: 120000 })] }) // large diagrams: 2 minutes
```

The timeout is a tradeoff:

- It does not stop Mermaid: the timed-out `mermaid.render()` keeps running while the queue moves on. If a later render
  uses other options, the timed-out diagram may finish under that render's `mermaid.initialize()` configuration. Its
  result is ignored either way (the diagram keeps its error box).
- A very slow but valid diagram (e.g. a large ELK layout) can be failed by the limit. Raise the timeout, or disable it
  with `0`, if your diagrams need longer; without a timeout, a diagram that never settles holds every later diagram
  of the page.

#### Security
The default `securityLevel` is set explicitly to `'strict'` (also Mermaid's own default): Mermaid encodes HTML in
labels, disables `click` callbacks and sanitizes the SVG with DOMPurify. `antiscript` and `sandbox` also sanitize.

> :warning: The Angular sanitizer only sees the escaped diagram source, never the SVG Mermaid draws from it. With
> `securityLevel: 'loose'`, diagram labels may contain HTML that nothing sanitizes, **whether or not `disableSanitizer`
> is set**, so only use it with trusted content. When `'loose'` is combined with `disableSanitizer`, an
> `[ngx-markdown]` warning is logged once.

#### Configuration types
`MermaidAPI.MermaidConfig` and the per-diagram config interfaces track Mermaid **12.1**: they include the v12 themes
(`neo`, `neo-dark`, `redux`, `redux-dark`, `redux-color`, `redux-dark-color`), the per-diagram `theme`, `look` and
`layout`, the ELK options, `dompurifyConfig`, and the newer diagram configs (`radar`, `venn`, `treeView`, `railroad`...).
They are copied from Mermaid's own `config.type.d.ts`, so the library never imports `mermaid` and it stays an optional
peer dependency. `dompurifyConfig` is typed as `object`, so any DOMPurify `Config` is accepted without importing
`dompurify`. Options for `mermaid.run()` are typed as `MermaidRunOptions` (`MermaidAPI.RunOptions` is a deprecated
alias).

When contributing, after updating the `mermaid` dependency regenerate the types with `bun run generate:mermaid-types`
and review the diff. `bun run check:mermaid-types` (also run by `build:lib`) fails when
`lib/src/configuration/mermaid-options.ts` is out of date with the installed Mermaid.

### Copy-to-clipboard

> :bell: Copy-to-clipboard support is **optional**, skip this step if you are not planning to use it

To add [Clipboard](https://clipboardjs.com/) library to your `package.json` use the following command.

```bash
npm install clipboard@^2.0.11 --save
```

To activate [Clipboard](https://clipboardjs.com/) allowing copy-to-clipboard, you will need to include...

- Clipboard JavaScript library - `node_modules/clipboard/dist/clipboard.min.js` file

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/clipboard/dist/clipboard.min.js",
]
```

#### Clipboard plugin

Provide the plugin with `provideMarkdown({ plugins: [withClipboard(options)] })` (see
[Clipboard and Prism plugins](#clipboard-and-prism-plugins)); without it, `[clipboard]` does nothing (a dev-mode warning
names `withClipboard()`). Using `markdown` component and/or directive, you will be able to use the `clipboard` property to activate [Clipboard](https://clipboardjs.com/) plugin that enable copy-to-clipboard for code block from a single click.

```html
<markdown
  [clipboard]="true"
  [src]="path/to/file.md">
</markdown>
```

#### Default button

The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

The default button shows its "copied" state (the `.copied` class and the `clipboardButtonTextCopied` text) for 3 seconds
when Clipboard.js reports a successful copy. A copy that fails does not show it.

#### Language label

With `[clipboardLanguageButton]="true"`, the default button is labelled with the language of the code block: the
`language-xxx` class of its `<code>` element (else of its `<pre>` element), alone. A code block with
`class="language-ts line-numbers"` is labelled `ts`. A code block without a language is labelled `Copy`, and
`clipboardButtonTextCopy` wins over the language.

#### Customize the button toolbar

The clipboard button is placed inside a wrapper element that can be customized using the `.markdown-clipboard-toolbar` CSS selector in your global `styles.css/scss` file.

This allows overriding the default positioning of the clipboard button and play with the visibility of the button using the `.hover` CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code block element.

#### Customize default button

To customize the default button styling, use the `.markdown-clipboard-button` CSS selector in your global `styles.css/scss` file. You can also customize the "copied" state shown after a successful copy using the `.copied` CSS selector.

#### Using global configuration

You can provide a custom component to use globally across your application with `withClipboard({ buttonComponent })`:

```typescript
provideMarkdown({
  plugins: [withClipboard({ buttonComponent: ClipboardButtonComponent })],
})
```

#### Using a component

You can also provide your custom component using the `clipboardButtonComponent` input property when using the `clipboard` directive.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-clipboard-button',
  template: `<button (click)="onClick()">Copy</button>`,
})
export class ClipboardButtonComponent {
  onClick() {
    alert('Copied to clipboard!');
  }
}
```

```typescript
import {ClipboardButtonComponent} from './clipboard-button-component';

@Component({...})
export class ExampleComponent {
  readonly clipboardButton = ClipboardButtonComponent;
}
```

```html
<markdown
  [clipboard]="true"
  [clipboardButtonComponent]="clipboardButton">
</markdown>
```

#### Inputs of a custom component

A custom button component (from `clipboardButtonComponent` or `withClipboard({ buttonComponent })`) gets these inputs
(`ClipboardButtonInputs`), set with `ComponentRef.setInput()` when it creates the button:

| Input              | Value                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------|
| `language`         | The language of the code block (its `language-xxx` class); not set when it has none.    |
| `code`             | The text of the code block, when the button is created.                                 |
| `buttonTextCopy`   | The `clipboardButtonTextCopy` input (`buttonTextCopy` option), when set.                |
| `buttonTextCopied` | The `clipboardButtonTextCopied` input (`buttonTextCopied` option), when set.            |

Each input is set only when the component declares it (with `input()`, `model()` or `@Input()`, by its public name)
and the value is defined, so a component may declare any of them, or none: an undeclared input is never set, and never
raises Angular's unknown-input error. Declare defaults for the optional ones.

```typescript
import {Component, input} from '@angular/core';

@Component({
  selector: 'app-clipboard-button',
  template: `<button type="button" [attr.aria-label]="'Copy ' + (language() ?? 'code')">{{ buttonTextCopy() }}</button>`,
})
export class ClipboardButtonComponent {
  readonly language = input<string>();
  readonly code = input<string>('');
  readonly buttonTextCopy = input('Copy');
}
```

The click on the button is handled by Clipboard.js, which copies the code block; use the `copied` output (below) to
react to the result.

#### Using ng-template

Alternatively, the `clipboard` directive can be used in conjunction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.

```html
<ng-template #buttonTemplate>
  <button (click)="onCopyToClipboard()">...</button>
</ng-template>

<markdown
  [clipboard]="true"
  [clipboardButtonTemplate]="buttonTemplate">
</markdown>
```

#### Copy events

The `markdown` component emits the result of each copy reported by Clipboard.js, whatever the button (default,
component or template):

- `copied` (`MarkdownCopyEvent`): `{ text, language?, element }`, the copied text, the language of the code block and
  its `<pre>` element;
- `copyError` (`MarkdownCopyErrorEvent`): `{ error, language?, element }`, when the copy failed (e.g. the browser refused
  it). `error` is an `Error` with the `ERROR_CLIPBOARD_COPY_FAILED` message: Clipboard.js reports no error of its own.

```html
<markdown
  [clipboard]="true"
  [src]="'path/to/file.md'"
  (copied)="onCopied($event)"
  (copyError)="onCopyError($event)">
</markdown>
```

```typescript
import {type MarkdownCopyErrorEvent, type MarkdownCopyEvent} from '@fsegurai/ngx-markdown';

onCopied({ text, language }: MarkdownCopyEvent): void {
  this.snackbar.open(`Copied ${text.length} characters of ${language ?? 'code'}`);
}

onCopyError({ error }: MarkdownCopyErrorEvent): void {
  console.warn(error.message);
}
```

The events come from the buttons of the latest render only: the buttons of a previous render, and of a destroyed
component, are destroyed with their Clipboard.js instances and emit nothing.

A pipe has no outputs: pass the same results as callbacks in the `clipboardOptions` of the pipe options,
`{ clipboard: true, clipboardOptions: { onCopied, onCopyError } }` (also available on `MarkdownService.render()`).

> :blue_book: Refer to the `@fsegurai/ngx-markdown` [clipboard plugin demo](https://fsegurai.github.io/ngx-markdown/plugins#clipboard) for live examples.

### Image lightbox

Provide the plugin with `provideMarkdown({ plugins: [withLightbox(options)] })` (see [Plugins](#plugins)); without it,
`[lightbox]` does nothing (a dev-mode warning names `withLightbox()`).

Set `lightbox` to open the images of the content in a built-in viewer when they are clicked. It has no dependency: the
viewer is a native `<dialog>` opened with `showModal()`, so it sits in the top layer above the page.

```html
<markdown [data]="markdown" [lightbox]="true" (imageClick)="onImageClick($event)"></markdown>
```

- **Which images:** the `<img>` elements of the rendered content, in document order, except those inside a link (the
  link wins), a `.mermaid` diagram or KaTeX output. They get `tabindex="0"`, `role="button"` and the
  `markdown-lightbox-trigger` class (attributes the content already set are kept), so Enter and Space open them too.
  Everything added is removed by the next render and when the component is destroyed.
- **Viewer:** the full image (`currentSrc`, else `src`), the `alt` text as caption (else the `title`), previous/next
  buttons (not shown for a single image) and an `n / total` counter in an `aria-live` region. Arrow keys browse
  (wrapping around from the last image to the first; set `wrap: false` to stop at both ends, with disabled buttons),
  Esc, the close button or a click on the backdrop closes it, and the focus moves into the dialog on open and back to
  the image on close. The viewer is the exported `MarkdownLightboxComponent`, created on the first opening and destroyed
  with the content, which closes it.
- **Options:** `lightboxOptions` (`LightboxOptions`): `wrap` (`true`), and the `aria-label`s `dialogLabel`
  (`Image viewer`), `closeLabel` (`Close`), `previousLabel` (`Previous image`) and `nextLabel` (`Next image`).
- **Global options:** `provideMarkdown({ plugins: [withLightbox({ wrap: false })] })`.
  The `lightboxOptions` input is merged over them, and its unset (`undefined`) values never override them. Enabling the
  lightbox stays per component.
- **`imageClick`:** emitted only with `lightbox` on, before the viewer opens, with a `MarkdownImageClickEvent`:
  `{ image, index, images, preventDefault(), defaultPrevented }` (`images` are the eligible images, `index` the
  position of `image` in them). Calling `preventDefault()` keeps the built-in viewer closed, so you can open another
  one, e.g. LightGallery (GPLv3 or commercial, so it is not bundled) or PhotoSwipe:

```typescript
onImageClick(event: MarkdownImageClickEvent): void {
  event.preventDefault();
  this.myViewer.open(event.images.map((image) => image.currentSrc || image.src), event.index);
}
```

- **Theming:** set these CSS custom properties on the page (e.g. `:root`) or an ancestor of `<markdown>`:

| Property | Default | Use |
| --- | --- | --- |
| `--markdown-lightbox-backdrop` | `rgb(0 0 0 / 85%)` | background behind the image (the dialog covers the viewport) |
| `--markdown-lightbox-text-color` | `#fff` | caption and counter |
| `--markdown-lightbox-font` | `inherit` | caption and counter `font` |
| `--markdown-lightbox-max-width` | `90vw` | maximum image width |
| `--markdown-lightbox-max-height` | `80vh` | maximum image height |
| `--markdown-lightbox-button-background` | `rgb(255 255 255 / 15%)` | previous, next and close buttons |
| `--markdown-lightbox-button-color` | `#fff` | button text and focus outline |

  The viewer elements have the `markdown-lightbox`, `markdown-lightbox-image`, `markdown-lightbox-caption`,
  `markdown-lightbox-counter` and `markdown-lightbox-button` (`-previous`, `-next`, `-close`) classes; give the images a
  `zoom-in` cursor with `.markdown-lightbox-trigger { cursor: zoom-in; }`.
- **Service:** `RenderOptions.lightbox` and `lightboxOptions` (with an `onImageClick` callback) bind it in
  `MarkdownService.render()`; a `ViewContainerRef` is required (`ERROR_LIGHTBOX_VIEW_CONTAINER_REQUIRED`). Nothing
  happens on the server.
- **Pipe:** not supported. The pipe has no outputs, and its post-render step runs on the whole template of its host
  component, so use the `markdown` component for a lightbox.

## Configuration

Configure `@fsegurai/ngx-markdown` with the `provideMarkdown` provide-function, then import the standalone `MarkdownComponent` and/or `MarkdownPipe` where you use them.

### Standalone components

Use the `provideMarkdown` provide-function in your application configuration `ApplicationConfig` to configure the `MarkdownComponent` and `MarkdownPipe` and/or inject the `MarkdownService`. It accepts an optional `MarkdownConfig` object.

```diff
import { ApplicationConfig } from '@angular/core';
+ import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
+   provideMarkdown(),
  ],
};
```

```diff
import { Component } from '@angular/core';
+ import { MarkdownComponent, MarkdownPipe } from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-home',
+ imports: [MarkdownComponent, MarkdownPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent { }
```

> :bell: `<markdown>` and the `markdown` pipe also work without `provideMarkdown()`: the defaults apply, including
> HTML sanitization (`SecurityContext.HTML`). Use `provideMarkdown()` to change the configuration.

### Migrating from 21 to 22

22.0.0 contains breaking changes. Check each item below; the CHANGELOG lists them all.

1. **Minimum versions:** Angular `^22`, TypeScript `>=6.0 <6.1`, Node.js `^22.22.3 || ^24.15.0 || >=26` and
   `marked ^18` (see [Installation](#installation)).
2. **`MarkdownModule` is removed:** use `provideMarkdown(config)` and import the standalone `MarkdownComponent` /
   `MarkdownPipe` (see [Migrating from MarkdownModule](#migrating-from-markdownmodule)).
3. **Optional peer dependencies:** `prismjs`, `emoji-toolkit`, `katex`, `mermaid` and `clipboard` are no longer
   installed with the library. Install each one you use explicitly.
4. **Plugins need their `withX()` feature:** the per-plugin fields of `provideMarkdown()` (`katexOptions`,
   `mermaidOptions`, `mermaidLoader`, `mermaidRenderTimeout`, `mermaidExportOptions`, `clipboardOptions`,
   `lightboxOptions`) and their tokens are removed. Provide each feature in `provideMarkdown({ plugins: [...] })`;
   Prism highlighting needs `withPrism()` and `[emoji]` needs `withEmoji()`. See the replacement table in
   [Migrating to 22: plugins](#migrating-to-22-plugins).
5. **Asynchronous highlighting:** `MarkdownService.render()` returns a `Promise<void>` and highlights the code blocks
   after it returns. `await render()` (or use the `ready` output of `<markdown>`) before reading the highlighted
   markup or the clipboard buttons. Errors (Mermaid, Prism, a missing plugin file) reject the Promise instead of
   throwing, and every enabled plugin still runs when another one fails (see [Service](#service)).
6. **`error` output type:** `<markdown>` emits a `MarkdownError` (`Error | HttpErrorResponse | string`) instead of
   `string | Error`; update handlers typed `(error: string | Error)` (see
   [Loading and rendering behavior](#loading-and-rendering-behavior)).
7. **`SANITIZE` token:** `provideMarkdown({ sanitize })` now also accepts a sanitize function, provided as the new
   `SANITIZE` token. `SECURITY_CONTEXT` is deprecated and will be removed in v23 (see [Sanitization](#sanitization)).
8. **Emoji in code:** shortcodes inside code blocks, inline code, raw HTML and link URLs are no longer converted (see
   [Emoji support](#emoji-support)).
9. **`cacheSrc`:** `src` responses can now be cached per service with `provideMarkdown({ cacheSrc: true })`. It is
   opt-in, so every load still fetches unless you enable it (see [Caches](#caches)).

KaTeX is also rendered while parsing now (the Auto-Render script is no longer used): see
[Math rendering](#math-rendering).

### Migrating from MarkdownModule

`MarkdownModule` was removed in v22. Migrate an `NgModule`-based setup as follows:

| Before (v21)                                   | After (v22)                                                         |
|------------------------------------------------|---------------------------------------------------------------------|
| `MarkdownModule.forRoot(config)`               | `provideMarkdown(config)` in your application providers             |
| `MarkdownModule.forChild()`                    | nothing (the root configuration applies everywhere)                 |
| `imports: [MarkdownModule]`                    | `imports: [MarkdownComponent, MarkdownPipe]` (what you use)         |
| `MarkdownModuleConfig`                         | `MarkdownConfig` (`MarkdownModuleConfig` is a deprecated alias)     |

```diff
@NgModule({
  imports: [
-   MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
+   MarkdownComponent,
  ],
+ providers: [provideMarkdown({ sanitize: SecurityContext.NONE })],
})
export class AppModule { }
```

### Remote file configuration

The `[src]` attribute loads remote files with Angular's `HttpClient`, which is injectable by default since Angular 21, so no extra setup is required.

Only call `provideHttpClient(...)` when you need to configure it (interceptors, etc.). The `loader` option of `provideMarkdown()` is optional:

```diff
providers: [
+  provideHttpClient(withInterceptors([myInterceptor])), // optional
+  provideMarkdown(),
],
```

#### Sanitization

As of `@fsegurai/ngx-markdown@v19.0.0` **sanitization is enabled by default** and uses Angular `DomSanitizer` with `SecurityContext.HTML` to avoid XSS vulnerabilities. It also applies without `provideMarkdown()`. The `sanitize` property of `provideMarkdown()` (the `SANITIZE` injection token) accepts either a `SecurityContext` or a sanitize function.

```typescript
import {SecurityContext} from '@angular/core';

// enable default sanitization
provideMarkdown()

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE
})
```

To use another sanitizer, such as [DOMPurify](https://github.com/cure53/DOMPurify), pass a function. It receives the HTML parsed from the Markdown, after asynchronous marked extensions have resolved, and its result is rendered as is:

```typescript
import DOMPurify from 'dompurify';

provideMarkdown({
  sanitize: (html: string) => DOMPurify.sanitize(html),
})
```

> :warning: The function replaces Angular's sanitizer: it **must return safe HTML**. Whatever it returns is inserted in the page.

> :warning: The `SECURITY_CONTEXT` injection token is deprecated in favor of `SANITIZE` and will be removed in v23. A `SECURITY_CONTEXT` provider is still honoured when `sanitize` is not set.

> :blue_book: Follow [Angular DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#sanitize) documentation for more information on sanitization and security contexts.

You can bypass sanitization using the Markdown component, directive or pipe using the `disableSanitizer` option as follows:

```html
<!-- disable sanitizer using a Markdown component -->
<markdown
  [data]="markdown"
  [disableSanitizer]="true">
</markdown>

<!-- disable sanitizer using a Markdown directive -->
<div markdown
     [data]="markdown"
     [disableSanitizer]="true">
</div>

<!-- disable sanitizer using markdown pipe -->
<div [innerHTML]="markdown | markdown : { disableSanitizer: true } | async"></div>
```

#### MarkedOptions

Optionally, markdown parsing can be configured using [MarkedOptions](https://marked.js.org/#/USING_ADVANCED.md#options) that can be provided with the `MARKED_OPTIONS` injection token via the `markedOptions` property of `provideMarkdown()`.

```typescript
// imports
import {MARKED_OPTIONS, provideMarkdown} from '@fsegurai/ngx-markdown';

// using default options
provideMarkdown(),

// using specific options with ValueProvider
  provideMarkdown({
    markedOptions: {
      provide: MARKED_OPTIONS,
      useValue: {
        gfm: true,
        breaks: false,
        pedantic: false,
      },
    },
  }),
```

#### MarkedOptions.renderer

`MarkedOptions` also exposes the `renderer` property which allows you to override token rendering for your whole application.

The example uses a factory function and overrides the default blockquote token rendering by adding a CSS class for custom styling when using Bootstrap CSS:

```typescript
import {MARKED_OPTIONS, MarkedOptions, MarkedRenderer, MarkedToken} from '@fsegurai/ngx-markdown';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = ({ text }: MarkedToken.Blockquote) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}
```

```typescript
// using specific option with FactoryProvider
provideMarkdown({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
  },
}),
```

### Marked extensions

With `provideMarkdown()`, you can provide [marked extensions](https://marked.js.org/using_advanced#extensions) using the `MARKED_EXTENSION` injection token via the `markedExtensions` property, which accepts an array of providers and supports Angular dependency injection.

```typescript
import {gfmHeadingId} from 'marked-gfm-heading-id';

provideMarkdown({
    markedExtensions: [
        {
            provide: MARKED_EXTENSIONS,
            useFactory: gfmHeadingId,
            multi: true,
        },
        {
            provide: MARKED_EXTENSIONS,
            useFactory: myExtensionFactory,
            deps: [SomeService],
            multi: true,
        },
    ],
}),
```

## Usage

`@fsegurai/ngx-markdown` provides different approaches to help you parse Markdown to your application depending on your needs.

> :bulb: As of Angular 6, the template compiler strips whitespace by default. Use `ngPreserveWhitespaces` directive to preserve whitespaces such as newlines in order for the markdown-formatted content to render as intended.  
https://angular.io/api/core/Component#preserveWhitespaces

### Component

You can use `markdown` component to either parse static Markdown directly from your HTML markup, load the content from a remote URL using `src` property or bind a variable to your component using `data` property. You can get a hook on a load complete using `load` output event property, on loading error using `error` output event property or when parsing is completed using `ready` output event property.

```html
<!-- static markdown -->
<markdown ngPreserveWhitespaces>
  # Markdown
</markdown>

<!-- loaded from remote url -->
<markdown
  [src]="'path/to/file.md'"
  (load)="onLoad($event)"
  (error)="onError($event)">
</markdown>

<!-- variable binding -->
<markdown
  [data]="markdown"
  (ready)="onReady()">
</markdown>

<!-- inline parser, omitting rendering top-level paragraph -->
<markdown
  [data]="markdown"
  [inline]="true">
</markdown>
```

### Directive

The same way the component works, you can use `markdown` directive to achieve the same thing.

```html
<!-- static markdown -->
<div markdown ngPreserveWhitespaces>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown
     [src]="'path/to/file.md'"
     (load)="onLoad($event)"
     (error)="onError($event)">
</div>

<!-- variable binding -->
<div markdown
     [data]="markdown"
     (ready)="onReady()">
</div>

<!-- inline parser, omitting rendering top-level paragraph -->
<div markdown
     [data]="markdown"
     [inline]="true">
</div>
```

#### Loading and rendering behavior

- Only `data`, `src` and `MarkdownService.reload()` trigger a render. The rendering options (`inline`, `emoji`,
  `clipboard`, `katex`, `mermaid`, the Prism plugin inputs...) are read when rendering: changing one of them alone
  does not re-render, the new value applies to the next `data`/`src` change or `reload()`. `mermaidOptions` is the
  deliberate exception: a change re-renders the Mermaid diagrams alone (see
  [Following a light/dark theme](#following-a-lightdark-theme)).
- The latest request wins: when `data` or `src` changes while a previous `src` request or render is still in flight,
  the previous one is discarded (its HTTP request is cancelled and it never updates the DOM or emits).
- A non-empty `data` takes precedence over `src`: when both are set, `src` is ignored and a one-time `[ngx-markdown]`
  warning is logged. Setting `data` to `''` clears the rendered content when no `src` is set; with a `src` set, the
  `src` is loaded (as in 21.x), so wrappers that default `data` to `''` keep working.
- `reload()` also re-renders transcluded (static) content.
- A `src` file whose extension is not `.md` or `.markdown` (case-insensitive; the query and hash are ignored) is rendered
  as a code block of that language. The code fence is longer than any backtick run in the file, so the file content
  cannot close it early (the `language` pipe does the same).
- `load` is emitted for `src` only, after the content has been rendered. `ready` is emitted once the content, including
  Mermaid diagrams, is rendered. `error` emits a `MarkdownError`: an `HttpErrorResponse` when the `src` request fails,
  or the `Error` thrown while parsing or rendering (e.g. a missing plugin, or a `MermaidRenderError` when Mermaid
  diagrams fail; the other diagrams are still rendered).

```typescript
import { MarkdownError } from '@fsegurai/ngx-markdown';

onError(error: MarkdownError) {
  console.error(error);
}
```

#### Link handling

Clicks on links in the rendered content are handled by the component, unless `disableRouterLinkHandler` is set. The
`routerLinkOptions` input enables the handlers:

- `internalBrowserHandler` — navigates with the Angular `Router` for `#fragment`, `/routerLink:/path#fragment`, relative
  and absolute paths, applying the `paths['/path']` or `global` `NavigationExtras`. `/localFile:path` links open `path`
  in a new tab.
- `internalDesktopHandler` — scrolls to the element whose id is the link fragment (`#intro`, `/docs#intro`).
- `externalBrowserHandler` — opens external links (`http(s)://`, `www.` as `https://`, `mailto:`...) in a new tab.

Pages opened in a new tab get `noopener,noreferrer`. Clicks with a modifier key (Ctrl, Meta, Shift, Alt) or another
button than the main one are always left to the browser. `javascript:`, `data:` and `vbscript:` links are always
blocked (whatever the handlers), with an `[ngx-markdown]` warning.

```html
<markdown
  [src]="'path/to/file.md'"
  [routerLinkOptions]="{
    internalBrowserHandler: true,
    externalBrowserHandler: true,
    global: { queryParamsHandling: 'preserve' },
    paths: { '/docs': { queryParams: { tab: 'api' } } },
  }">
</markdown>
```

#### Relative URLs (baseUrl)

By default, relative URLs in the content resolve against the page, as in 21.x. Two inputs change that:

- `srcRelativeLink` — the relative links and images of a `src` file resolve against the file itself, as on GitHub:
  with `src="docs/guide/intro.md"`, `![](img.png)` loads `docs/guide/img.png`. It has no effect on `data` or
  transcluded content.
- `baseUrl` — the base URL of the content, for `data`, `src` and transcluded content alike. It wins over
  `srcRelativeLink`. The `markdown` pipe and `MarkdownService.parse()` take it as the `baseUrl` option.

```html
<markdown src="docs/guide/intro.md" srcRelativeLink></markdown>
<markdown [data]="markdown" baseUrl="https://cdn.example.com/docs/"></markdown>
<div [innerHTML]="markdown | markdown: { baseUrl: 'docs/' } | async"></div>
```

Like the other rendering options, `baseUrl` and `srcRelativeLink` apply when the content is rendered: changing them
afterwards takes effect on the next `data`/`src` change or `MarkdownService.reload()`.

The base is a URL, as with a `<base href>`: end a folder with `/`. `docs/guide` is a file, so URLs resolve against
`docs/`. Its query and hash are ignored.

| URL in the content | `baseUrl="https://example.com/docs/guide/"` | `baseUrl="docs/guide/"` |
| --- | --- | --- |
| `img.png`, `./img.png` | `https://example.com/docs/guide/img.png` | `docs/guide/img.png` |
| `../img.png` | `https://example.com/docs/img.png` | `docs/img.png` |
| `../../../img.png` | `https://example.com/img.png` | `../img.png` (stays relative) |
| `/assets/img.png` (root-relative) | `https://example.com/assets/img.png` (base origin) | unchanged |
| `https://…`, `mailto:…`, `data:…`, any scheme | unchanged | unchanged |
| `//cdn.example.com/x.js` (protocol-relative) | unchanged | unchanged |
| `#section` | unchanged | unchanged |
| `/routerLink:…`, `/localFile:…` | unchanged | unchanged |

- Covered: Markdown links and images (inline and reference), and the `href` of raw HTML `<a>` tags and the
  `src` of raw HTML `<img>` tags. Other raw HTML (`srcset`, `<source>`, `<video>`, `<link>`...) is left as is.
- A `baseUrl` with a scheme other than `http:` or `https:` is ignored. A protocol-relative `baseUrl` (`//host/docs/`)
  gives protocol-relative URLs.
- The URLs are resolved before rendering, so a custom renderer (`MarkedOptions.renderer`, `markdownService.renderer`,
  the `renderer` of a Marked extension) receives the resolved `href` in its `link` and `image` methods.
- There is no global default: a global `baseUrl` would also apply to every `data` and pipe content. Set the inputs where
  the content comes from.

#### Front-matter

A front-matter block sits at the very start of the content, between two `---` lines (YAML) or two `+++` lines (TOML):

```markdown
---
title: Release notes
tags: [angular, markdown]
---

# Release notes
```

By default it is rendered as Markdown, as in 21.x (a horizontal rule, then text or a setext heading). The
`frontMatter` input strips it before parsing, and the `metadata` output emits it on each render:

```html
<markdown src="docs/release.md" frontMatter (metadata)="onMetadata($event)"></markdown>
```

```typescript
import type { MarkdownFrontMatter } from '@fsegurai/ngx-markdown';

onMetadata({ data, raw }: MarkdownFrontMatter): void {
  this.title = data['title'];
}
```

- **Detection:** the opening `---` (or `+++`) must be alone on the first line; only a BOM and blank lines may come
  before it (so indented transcluded content works). The block ends at the next line holding the same delimiter alone.
  CRLF line endings are fine. A later `---` (a horizontal rule or a setext heading) is never front-matter, and a
  block without a closing delimiter is rendered as is.
- **Output:** `metadata` emits a `MarkdownFrontMatter`, `{ data, raw }`: `raw` is the block text without its
  delimiters (line endings normalized to `\n`). Content without a block emits `{ data: {}, raw: '' }`, so the previous
  value is replaced. It is emitted once the content is in the element, before `ready`. Without `frontMatter`, nothing
  is emitted.
- **Supported subset** (no YAML or TOML library, nothing is evaluated): top-level `key: value` entries (`key = value`
  in a `+++` block), with plain or quoted keys, whose value is:

  | Value | Example | `data` |
  | --- | --- | --- |
  | String: plain, `"double"` (JSON-like escapes) or `'single'` (`''` is a quote) | `title: "A: B"` | `'A: B'` |
  | Number (decimal) | `weight: 1.5` | `1.5` |
  | Boolean | `draft: true` / `False` | `true` / `false` |
  | Null | `x: null`, `x: ~`, `x:` | `null` |
  | One-line array of scalars | `tags: [a, "b, c", 3]` | `['a', 'b, c', 3]` |
  | Block list of scalars (YAML) | `tags:` then `  - a` lines | `['a']` |

  A trailing ` # comment` is dropped. Any other value stays its raw string: nested mappings and block scalars (`|`,
  `>`) give their indented lines without the common indentation, `{ a: 1 }` maps and nested arrays their text. TOML
  tables (`[table]`) and everything after them are left to `raw`. The `__proto__`, `constructor` and `prototype` keys
  are ignored, and so is any other key that exists on `Object.prototype` (`hasOwnProperty`, `toString`, `valueOf`…),
  so `data` never shadows its methods.
- **Pipe and service:** `frontMatter: true` strips the block; the `onFrontMatter(frontMatter)` callback receives it
  (synchronously, before Marked runs), as `metadata` does. `extractFrontMatter(markdown)` returns
  `{ frontMatter, content }` without rendering anything (`frontMatter` is `null` when there is no block).

```html
<div [innerHTML]="markdown | markdown: { frontMatter: true, onFrontMatter: setMetadata } | async"></div>
```

The block is stripped after the HTML entities of transcluded content are decoded, and before emoji, KaTeX and Marked
run, so none of them sees it.

#### Headings and table of contents

The `headings` output emits the headings of the content, in document order, on each render. Build a table of contents
from it:

```html
<nav>
  @for (heading of headings(); track $index) {
    <a [href]="'#' + heading.id" [class]="'toc-level-' + heading.level"
       (click)="$event.preventDefault(); heading.element?.scrollIntoView()">{{ heading.text }}</a>
  }
</nav>

<markdown src="docs/guide.md" headingIds (headings)="headings.set($event)"></markdown>
```

```typescript
import { signal } from '@angular/core';
import type { MarkdownHeading } from '@fsegurai/ngx-markdown';

readonly headings = signal<MarkdownHeading[]>([]);
```

- **Output:** `headings` emits a `MarkdownHeading[]`; each heading is `{ level, text, id, element? }`. `level` is 1 to
  6, `text` is the plain text as the page shows it (no HTML or Markdown markup: `## Hello *world*` gives `Hello world`;
  images give no text; character references decoded: `&copy;` gives `©`), `element` is the heading element in the page
  and `id` its `id` attribute (`''` when it has none). Content without headings emits `[]`, so the previous list is
  replaced. It is emitted once the content is in the element, before `ready`, like `metadata`; a render superseded by a
  newer one emits nothing. A Mermaid-only re-render (`mermaidOptions`) does not change the headings and does not emit
  them again.
- **Ids:** an `id` written by the heading renderer is kept: `marked-gfm-heading-id` (see Marked extensions), a
  `MARKED_EXTENSIONS` heading renderer, or a custom `renderer.heading`. Otherwise the opt-in `headingIds` input gives
  the heading a GitHub-style slug: lower-cased, every character dropped but letters, marks and numbers (in any script),
  `_`, `-` and spaces, then whitespace turned into `-` (`Hello, World!` gives `hello-world`; a heading without any kept
  character gives `heading`). Slugs are unique within a render (`intro`, `intro-1`, `intro-2`…) and never reuse an id
  written by a renderer. Without `headingIds` and without a renderer id, `id` is `''`.
- **Precedence:** `headingIds` runs after the whole renderer chain (own `renderer.heading` method, then
  `MARKED_EXTENSIONS`, then the default renderer), and only fills the headings that chain rendered without an `id`.
- **Sanitizer:** Angular's default sanitizer (`SecurityContext.HTML`) removes `id` attributes, so with it the headings
  have no `id` in the page (`id` is then `''`, `element` is still set: scroll to it with `element.scrollIntoView()`).
  To keep the ids, use a `sanitize` function that keeps them (e.g. DOMPurify) or, for trusted content only,
  `SecurityContext.NONE`.
- **Elements:** each heading is matched to the next `h1`…`h6` element of its level with its `id` or its text, so
  headings written as raw HTML are not listed (a raw HTML heading with the level and text of the next Markdown heading
  may be taken for it). `element` is unset when no element matches.
- **Pipe and service:** `headingIds: true` adds the slugs; the `onHeadings(headings)` callback receives the headings of
  each parse once Marked has run (`[]` for inline parsing), without `element`, and with the `id` Marked rendered,
  before sanitizing.

```html
<div [innerHTML]="markdown | markdown: { headingIds: true, onHeadings: setHeadings } | async"></div>
```

### Pipe

Using `markdown` pipe to transform Markdown to HTML allow you to chain pipe transformations and will update the DOM when value changes. It is important to note that, because the `marked` parsing method returns a `Promise`, it requires the use of the `async` pipe.

```html
<!-- chain `language` pipe with `markdown` pipe to convert typescriptMarkdown variable content -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown | async"></div>
```

The `markdown` pipe allow you to use all the same plugins as the component by providing the option parameters.

```html
<!-- provide options parameters to activate plugins or for configuration -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown : { emoji: true, inline: true } | async"></div>
```

This is the `MarkdownPipeOptions` parameters interface, those options are the same as the ones available for the `markdown` component:

```typescript
export interface MarkdownPipeOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.MermaidConfig;
  mermaidExport?: boolean;
  mermaidExportOptions?: MermaidExportRenderOptions;
  markedOptions?: MarkedOptions;
  disableSanitizer?: boolean;
  baseUrl?: string;
  frontMatter?: boolean;
  onFrontMatter?: (frontMatter: MarkdownFrontMatter) => void;
  headingIds?: boolean;
  onHeadings?: (headings: MarkdownHeading[]) => void;
  plugins?: MarkdownPluginToggles; // see [Plugins](#plugins)
}
```

The pipe resolves to an empty string for `null`/`undefined`, and for a non-string value (an `[ngx-markdown]` error is
logged). KaTeX math is rendered while parsing, so it is scoped to the content. A pipe cannot access the element it is
bound to, so the post-render step (highlight, clipboard, Mermaid) runs on the host element of the component that uses the pipe, i.e. on its whole template. Prefer the
`markdown` component when that step must be scoped to the Markdown content. A pipe has no outputs: with `clipboard`, the copy
results are passed to the `clipboardOptions.onCopied` and `clipboardOptions.onCopyError` callbacks (see Copy events), and
with `mermaidExport` the downloads to `mermaidExportOptions.onExported` and `onExportError` (see [SVG export](#svg-export)).
The image lightbox is not supported through the pipe (see [Image lightbox](#image-lightbox)).

### Service

You can use `MarkdownService` to have access to Markdown parsing, rendering and syntax highlight methods.

```typescript
import {Component, OnInit} from '@angular/core';
import {MarkdownService} from '@fsegurai/ngx-markdown';

@Component({...})
export class ExampleComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {
  }

  ngOnInit() {
    // outputs: <p>I am using <strong>markdown</strong>.</p>
    console.log(this.markdownService.parse('I am using __markdown__.'));
  }
}
```

`MarkdownService.render(element, options, viewContainerRef)` returns a `Promise<void>` that resolves once every
feature, including Mermaid diagrams, is rendered, and rejects with a `MermaidRenderError` when diagrams fail (see
[Rendering and errors](#rendering-and-errors)). Pass `disableSanitizer` in its options, as `<markdown>` and the pipe
do, to get the `'loose'` warning. It destroys the clipboard
and Mermaid export buttons created by the previous `render` of the same element, and supersedes its Mermaid diagrams not drawn yet; call
`cleanup(element)` when you discard that content.
Each `MarkdownService` parses with its own `Marked` instance, so `MARKED_EXTENSIONS` and the configured renderer never
modify the global `marked` object.

## Plugins

This is the configuration of every optional feature of the library: **a plugin works only when its `withX()` feature is
in `provideMarkdown({ plugins: [...] })`**, and its global options are the options of that feature. Components then
enable it with its input (`[katex]`, `[mermaid]`, `[clipboard]`…) or the `[plugins]` record.

```typescript
import {
  provideMarkdown,
  withClipboard,
  withEmoji,
  withKatex,
  withLightbox,
  withMermaid,
  withMermaidExport,
  withPrism,
} from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideMarkdown({
      plugins: [
        withPrism({ lineNumbers: true }),
        withKatex({ throwOnError: false }),
        withMermaid({ loader: () => import('mermaid').then((m) => m.default), config: { look: 'classic' } }),
        withMermaidExport(),
        withClipboard({ buttonComponent: ClipboardButtonComponent }),
        withEmoji(),
        withLightbox(),
      ],
      // plain Marked extensions need no plugin
      markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
    }),
  ],
};
```

Upgrading from 21.x or an earlier 22 pre-release? See [Migrating to 22: plugins](#migrating-to-22-plugins).

The Markdown pipeline runs **plugins**: plain objects with hooks that the service calls in a fixed order. There are two
kinds:

| Kind | Plugins | Registration |
| --- | --- | --- |
| Core built-ins | `frontMatter`, `baseUrl` | Always registered, nothing to provide: they have no dependency and are tiny, so tree-shaking would gain nothing. |
| Feature plugins | `emoji` (`withEmoji()`), `katex` (`withKatex()`), `lightbox` (`withLightbox()`), `clipboard` (`withClipboard()`), `prism` (`withPrism()`), `mermaid` (`withMermaid()`), `mermaidExport` (`withMermaidExport()`), your own | Provided with a `withX()` feature in `provideMarkdown({ plugins: [...] })`, so their code is only bundled when used. |

A registered plugin still runs only where it is **enabled**: per component with the `[plugins]` input, or with its
specific input (`[frontMatter]`, `[baseUrl]`…), and per parse/render with the `plugins` option of the `markdown` pipe and
of `MarkdownService.parse()`/`render()`:

```html
<!-- true enables, false disables, an object enables and overrides options -->
<markdown [data]="markdown" [plugins]="{ frontMatter: true, baseUrl: { url: 'docs/' } }"></markdown>
<!-- a specific input wins over the record: front-matter stays off here -->
<markdown [data]="markdown" [plugins]="{ frontMatter: true }" [frontMatter]="false"></markdown>
<div [innerHTML]="markdown | markdown: { plugins: { externalLinks: true } } | async"></div>
```

- A plugin left out of the record follows its `enabledByDefault` (default `false`).
- Options are merged in this order, `undefined` never overriding: the plugin `defaults`, then the `withX(options)`
  value, then the `[plugins]` options object, then the specific inputs.
- A plugin enabled but not provided (by the record or by its specific input, e.g. `[katex]` without `withKatex()`) is
  ignored, with one `[ngx-markdown]` warning per plugin in dev mode that names the `withX()` to add.
  `MarkdownService.rerenderMermaid()` without `withMermaid()` throws `ERROR_MERMAID_NOT_PROVIDED`.
- Like the other rendering options, `[plugins]` is read when the content renders: changing it alone does not re-render.

### Emoji, KaTeX and lightbox plugins

```typescript
import { provideMarkdown, withEmoji, withKatex, withLightbox } from '@fsegurai/ngx-markdown';

provideMarkdown({
  plugins: [
    withEmoji(), // needs the joypixels global (Emoji-Toolkit), no options
    withKatex({ throwOnError: false, macros: { '\\RR': '\\mathbb{R}' } }), // needs the katex global
    withLightbox({ wrap: false }),
  ],
});
```

```html
<!-- the specific inputs still work, and win over the record -->
<markdown [data]="markdown" emoji katex [katexOptions]="{ errorColor: '#c00' }" lightbox (imageClick)="open($event)"></markdown>
<!-- or the record: an options object enables the plugin and overrides its options -->
<markdown [data]="markdown" [plugins]="{ emoji: true, katex: { output: 'mathml' }, lightbox: true }"></markdown>
```

- `[emoji]`, `[katex]` and `[lightbox]` are unset by default, so the `[plugins]` record decides; `false` disables the
  plugin even when the record enables it. `[katexOptions]` and `[lightboxOptions]` are merged over the record options.
  `imageClick` is emitted however the lightbox is enabled.
- KaTeX is an `enforce: 'pre'` plugin: it inserts the rendered math before the `postSanitize` hooks of the other plugins
  run, so they see the final math HTML.


### Clipboard and Prism plugins

```typescript
import { provideMarkdown, withClipboard, withPrism } from '@fsegurai/ngx-markdown';

provideMarkdown({
  plugins: [
    withClipboard({ languageButton: true }), // needs the ClipboardJS global
    withPrism({ lineNumbers: true }), // needs the Prism global; enabled by default once provided
  ],
});
```

```html
<!-- clipboard: per component, with its input or the record -->
<markdown [data]="markdown" clipboard [clipboardButtonTemplate]="button" (copied)="onCopied($event)"></markdown>
<markdown [data]="markdown" [plugins]="{ clipboard: { buttonTextCopy: 'Copy code' } }"></markdown>
<!-- prism: highlights every <markdown> once provided; the Prism inputs are its per-component options -->
<markdown [data]="markdown" lineHighlight line="2-4" [lineNumbers]="false"></markdown>
<markdown [data]="markdown" [plugins]="{ prism: false }"></markdown>
```

- `withClipboard(options)` takes `ClipboardOptions` (`buttonComponent`, `buttonTextCopy`,
  `buttonTextCopied`, `languageButton`). `[clipboard]` is unset by default (the record decides); the `clipboard*`
  inputs are merged over the record options, and `copied`/`copyError` are emitted however the plugin is enabled. A
  button set by a higher layer (a per-component template or component) replaces the global button component.
- `withPrism(options)` takes `PrismOptions`: `lineNumbers`, `start`, `lineHighlight`, `line`, `lineOffset`,
  `commandLine`, `filterOutput`, `host`, `prompt`, `output`, `user` (the classes and `data-*` attributes of Prism's
  Line Numbers, Line Highlight and Command Line plugins). The `<markdown>` inputs of the same names are merged over them
  (unset inputs never override). It is `enabledByDefault` and `enforce: 'pre'`: it sets the `pre` attributes before the
  other `render` hooks run. A hook of another plugin that throws (e.g. the clipboard without ClipboardJS) does not stop
  the highlighting: the code is still highlighted and the render then rejects with that error. The clipboard reads the
  languages of the code blocks before the highlighting marks the blocks without one `language-none`. Without
  `withPrism()`, nothing is highlighted at render time and the Prism inputs do nothing.
- `MarkdownService.highlight(element)` keeps working on its own (with or without `withPrism()`).


### Mermaid and Mermaid export plugins

```typescript
import { provideMarkdown, withMermaid, withMermaidExport } from '@fsegurai/ngx-markdown';

provideMarkdown({
  plugins: [
    withMermaid({
      loader: () => import('mermaid'), // or the `mermaid` global of its script build when left out
      config: { theme: 'neutral' }, // the `mermaid.initialize()` configuration
      renderTimeout: 30000, // per `mermaid.render()` call (and the load); 0 or Infinity disables it
    }),
    withMermaidExport({ filenamePrefix: 'chart' }), // requires withMermaid()
  ],
});
```

```html
<!-- per component, with the inputs or the record -->
<markdown [data]="markdown" mermaid [mermaidOptions]="{ theme: 'dark' }" mermaidExport></markdown>
<markdown [data]="markdown" [plugins]="{ mermaid: { config: { theme: 'dark' } }, mermaidExport: true }"></markdown>
```

- `withMermaid(options)` takes `MermaidPluginOptions`: `config` (merged over `{ startOnLoad: false, securityLevel:
  'strict' }`), `loader`, `renderTimeout`. `config` is merged **key by key** across the layers (`withMermaid()`, the
  record, then `[mermaidOptions]`), so a per-component `{ theme: 'dark' }` keeps the other keys of the global one.
- `[mermaid]` and `[mermaidExport]` are unset by default (the record decides); `false` disables the plugin even when
  the record enables it. A `[mermaidOptions]` change re-renders the diagrams alone (no parse), whether `[mermaid]` or the
  record enabled Mermaid; so does `MarkdownService.rerenderMermaid(element, options, viewContainerRef)`, which runs the
  `rerender` hooks of both plugins (it throws `ERROR_MERMAID_NOT_PROVIDED` without `withMermaid()`).
- `withMermaidExport(options)` takes `buttonComponent` and `filenamePrefix`; the `mermaidExport*` inputs are merged over
  them (a per-component button replaces the global one), and `mermaidExported`/`mermaidExportError` are emitted however
  the export is enabled. The export only adds buttons where Mermaid is enabled too, and needs a `ViewContainerRef`
  (`ERROR_MERMAID_EXPORT_VIEW_CONTAINER_REQUIRED`: the render rejects before any diagram is drawn).
- Plugin order: the export always runs after Mermaid, whatever their registration order (it `requires` Mermaid), and
  does not run when Mermaid's checks fail, so a failed `rerenderMermaid()` leaves the existing buttons in place. A
  plugin that fails (e.g. `withClipboard()` without ClipboardJS) does not stop the diagrams. When several plugins fail,
  the first one in plugin order wins.

### Migrating to 22: plugins

22.0.0 removes the per-plugin configuration of `provideMarkdown()` and its injection tokens, with no compatibility
bridge: every optional feature is now a plugin, provided with its `withX()` feature. **A plugin works only when its
feature is provided**: a component enabling a plugin that is not provided (`[katex]`, `[mermaid]`, `[clipboard]`…)
gets nothing, and one `[ngx-markdown]` warning per plugin in dev mode names the `withX()` to add. Prism highlighting
(and the `pre` attributes of `[lineNumbers]`, `[lineHighlight]`, `[commandLine]`) now needs `withPrism()`.

| Removed | Replacement |
| --- | --- |
| `provideMarkdown({ katexOptions })`, `KATEX_OPTIONS` | `plugins: [withKatex(katexOptions)]` |
| `provideMarkdown({ mermaidOptions: { provide: MERMAID_OPTIONS, useValue } })`, `MERMAID_OPTIONS` | `plugins: [withMermaid({ config })]` |
| `provideMarkdown({ mermaidLoader })`, `MERMAID_LOADER` | `plugins: [withMermaid({ loader })]` |
| `provideMarkdown({ mermaidRenderTimeout })`, `MERMAID_RENDER_TIMEOUT` | `plugins: [withMermaid({ renderTimeout })]` |
| `provideMarkdown({ mermaidExportOptions: { provide: MERMAID_EXPORT_OPTIONS, useValue } })`, `MERMAID_EXPORT_OPTIONS` | `plugins: [withMermaidExport(options)]` |
| `provideMarkdown({ clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue } })`, `CLIPBOARD_OPTIONS` | `plugins: [withClipboard(options)]` |
| `provideMarkdown({ lightboxOptions: { provide: LIGHTBOX_OPTIONS, useValue } })`, `LIGHTBOX_OPTIONS` | `plugins: [withLightbox(options)]` |
| `[emoji]` without a feature | `plugins: [withEmoji()]` |
| highlighting whenever the `Prism` global is loaded | `plugins: [withPrism(options?)]` |

Unchanged: `MARKED_OPTIONS` / `markedOptions`, `MARKED_EXTENSIONS` / `markedExtensions`, `loader`, `cacheSrc`,
`sanitize`, every per-component input (`[katex]`, `[katexOptions]`, `[mermaid]`, `[mermaidOptions]`, `[clipboard]`,
`clipboard*`, `[emoji]`, `[lightbox]`, `[lightboxOptions]`, `[mermaidExport]`, `mermaidExport*`, the Prism inputs) and
the matching `ParseOptions`/`RenderOptions` of the pipe and the service: they still win over the `[plugins]` record.
The option types (`KatexOptions`, `ClipboardOptions`, `LightboxOptions`, `MermaidExportOptions`, `MermaidLoader`,
`MermaidAPI`…) are still exported.

Before (21.x):

```typescript
provideMarkdown({
  katexOptions: { throwOnError: false },
  mermaidLoader: () => import('mermaid').then((m) => m.default),
  mermaidOptions: { provide: MERMAID_OPTIONS, useValue: { look: 'handDrawn' } },
  mermaidRenderTimeout: 60000,
  mermaidExportOptions: { provide: MERMAID_EXPORT_OPTIONS, useValue: { filenamePrefix: 'chart' } },
  clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: { buttonComponent: ClipboardButtonComponent } },
  lightboxOptions: { provide: LIGHTBOX_OPTIONS, useValue: { wrap: false } },
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }],
});
```

After (22.0.0):

```typescript
provideMarkdown({
  plugins: [
    withKatex({ throwOnError: false }),
    withMermaid({
      loader: () => import('mermaid').then((m) => m.default),
      config: { look: 'handDrawn' },
      renderTimeout: 60000,
    }),
    withMermaidExport({ filenamePrefix: 'chart' }),
    withClipboard({ buttonComponent: ClipboardButtonComponent }),
    withLightbox({ wrap: false }),
    withEmoji(), // if a component uses [emoji]
    withPrism(), // if the Prism global highlights your code blocks
  ],
  markedExtensions: [{ provide: MARKED_EXTENSIONS, useFactory: gfmHeadingId, multi: true }], // unchanged
});
```

A token provided directly (e.g. `{ provide: MERMAID_OPTIONS, useValue }` in a component's `providers`) has no
replacement token: give that component's injector its own `provideMarkdown({ plugins: [...] })` (it creates a
`MarkdownService` for it, which reads `MARKED_OPTIONS` and `MARKED_EXTENSIONS` from the parent injector).

Behaviour of a render also changed: `MarkdownService.render()` (and `rerenderMermaid()`) no longer throw when a plugin
cannot run (missing ClipboardJS, Mermaid or `ViewContainerRef`); every enabled plugin still runs, and the returned
Promise rejects with the first error in plugin order. `<markdown>` emits it through `error`, as before.

### Marked extensions or plugins?

`MARKED_EXTENSIONS` (`provideMarkdown({ markedExtensions })`, see [Marked extensions](#marked-extensions)) stay fully
supported and are not part of the plugin migration: use them for a plain Marked extension (e.g. `marked-gfm-heading-id`)
that applies to every parse of the service. Write a plugin when the feature also needs a per-component toggle
(`[plugins]`), options merged per component, a `render` hook on the element (DOM work, views) or a cleanup. Both work
together: the plugin `walkTokens` run before those of `MARKED_EXTENSIONS`, `MARKED_EXTENSIONS` tokenizers are tried
before the plugin tokenizers, and `MARKED_EXTENSIONS` renderer overrides stay in the renderer chain.

### Writing a plugin

A plugin implements `MarkdownPlugin<Options>`; every hook is optional:

```typescript
export interface MarkdownPlugin<O extends object> {
  readonly name: string; // its key in [plugins]; a later registration with the same name replaces it
  readonly enabledByDefault?: boolean; // runs without being enabled per component (default false)
  readonly workerSafe?: boolean; // reserved for the opt-in parse worker
  readonly enforce?: 'pre' | 'post'; // runs before / after the plugins without it
  readonly defaults?: Partial<O>;
  preprocess?(markdown: string, ctx: MarkdownParseContext<O>): string;
  markedExtensions?(ctx: MarkdownParseContext<O>): MarkedExtension[];
  readonly tokenizerExtensions?: readonly MarkdownTokenizerExtension<O>[];
  postSanitize?(html: string, ctx: MarkdownParseContext<O>): string;
  render?(element: HTMLElement, ctx: MarkdownRenderContext<O>): MarkdownRenderResult;
  rerender?(element: HTMLElement, ctx: MarkdownRenderContext<O>): MarkdownRenderResult;
  cleanup?(element: HTMLElement): void;
}
```

The hooks run in this order, each for the enabled plugins in plugin order: the core built-ins first, then the
`enforce: 'pre'` plugins, the plugins without `enforce`, and the `enforce: 'post'` plugins. Within a group, a plugin
runs after the plugins of the group it `requires`, in registration order otherwise (a requirement in a later group
does not move it: `enforce` wins; a requirement cycle keeps registration order).

1. `preprocess`: the Markdown text, after the indentation trim (and the HTML decoding of transcluded content).
2. `markedExtensions`: the Marked extensions of the parse, called once per parse. Their `walkTokens` run before those of
   `MARKED_EXTENSIONS` and of the Marked options; `async: true` makes the parse asynchronous; `renderer` methods run
   before the configured renderer (`MARKED_OPTIONS`, `MARKED_EXTENSIONS`, `MarkdownService.renderer`) and fall back to it
   when they return `false` (the heading ids and `onHeadings` see their output). Other fields (`tokenizer`, `hooks`,
   `extensions`…) are ignored, with a dev-mode warning.
   `tokenizerExtensions` (`{ name, level, start?, tokenizer, renderer?, childTokens? }`, as in Marked's `extensions`)
   are registered once per service, but only work in the parses the plugin is enabled in; each function gets the
   parse context as its last argument (`tokenizer(src, tokens, ctx)`, `renderer(token, ctx)`).
3. Marked parses, then the core sanitizes the HTML (`sanitize`).
4. `postSanitize`: the sanitized HTML. What it inserts is **not** sanitized: escape it.
5. `render`: the element holding the inserted HTML, once per render. It may return a cleanup function (or a Promise of
   one). The hooks start one after another, with an abort check before each, and run concurrently; `render()` (and the
   `ready` output) waits for them. Each hook is isolated: one that throws synchronously stops neither the others nor
   their `signal`; `render()` never throws, it rejects with the first error in plugin order (thrown or rejected) once
   every started hook has settled. Only the plugins that `require` a plugin whose hook threw do not start.
6. Cleanup: before the next render of the element, on `MarkdownService.cleanup()` and when `<markdown>` is destroyed,
   the cleanup functions run (last first), then each plugin's `cleanup(element)`.

Two more fields: `validate(ctx)` runs for every enabled plugin before any `preprocess` hook (throw there when the parse
cannot run, e.g. a missing library: no other hook, and no `onFrontMatter`, has run), and `exclusiveOptions` lists groups
of options that replace each other across the option layers (e.g. `[['buttonComponent', 'buttonTemplate']]`: a
per-component template replaces a global component). `nestedOptions` lists options whose object values are merged key
by key across the layers (Mermaid's `config`); `requires` names the plugins this one works with (it runs after them,
does not run when one of their hooks threw in the same render, and a dev-mode warning says when one is not provided); `rerender(element, ctx)` is a partial re-render outside of the full render (no parse, no
cleanup of the other plugins), e.g. `MarkdownService.rerenderMermaid()`.

Each hook gets a context: `options` (merged as above), `platform` (`'browser'` or `'server'`), `injector` (the injector
of the `MarkdownService`), `state` (a fresh object per parse, shared by the parse hooks and tokenizer extensions of that
parse, and per render) and `serviceState` (one object per plugin and service, e.g. for a cache). The `render` context adds `signal` (aborted when the render is superseded or the element cleaned up),
`viewContainerRef`, `onCleanup(fn)` (registers a cleanup at once, e.g. before asynchronous work: it still runs when
the hook later rejects) and `isEnabled(name)` (whether another plugin is enabled in the same render).

Example: open the external links of the content in a new tab.

```typescript
import { type MarkdownPlugin, type MarkdownPluginFeature, withMarkdownPlugin } from '@fsegurai/ngx-markdown';

interface ExternalLinksOptions {
  target?: string;
  rel?: string;
}

const externalLinksPlugin: MarkdownPlugin<ExternalLinksOptions> = {
  name: 'externalLinks',
  defaults: { target: '_blank', rel: 'noopener noreferrer' },
  render(element, { options }) {
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href^="http://"], a[href^="https://"]'));
    for (const link of links) {
      link.setAttribute('target', options.target ?? '_blank');
      link.setAttribute('rel', options.rel ?? 'noopener noreferrer');
    }
    return () => {
      for (const link of links) {
        link.removeAttribute('target');
        link.removeAttribute('rel');
      }
    };
  },
};

export function withExternalLinks(options?: ExternalLinksOptions): MarkdownPluginFeature {
  return withMarkdownPlugin(externalLinksPlugin, options);
}

// app.config.ts
provideMarkdown({ plugins: [withExternalLinks({ rel: 'noopener' })] });
```

```html
<markdown [data]="markdown" [plugins]="{ externalLinks: true }"></markdown>
```

`withMarkdownPlugin(plugin, options?, providers?)` returns the feature; its third argument adds providers the plugin
reads through `ctx.injector`. This example is tested end to end in the library (`external-links.example.spec.ts`).

## Renderer

Tokens can be rendered in a custom manner by either...

- providing the `renderer` property with the `MarkedOptions` of `provideMarkdown()` in your application providers (see [Configuration](#markedoptionsrenderer) section)
- using `MarkdownService` exposed `renderer`

Here is an example of overriding the default heading token rendering through `MarkdownService` by adding an embedded anchor tag like on GitHub:

```typescript
import {Component, OnInit} from '@angular/core';
import {MarkdownService, MarkedToken} from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-example',
  template: '<markdown># Heading</markdown>',
})
export class ExampleComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {
  }

  ngOnInit() {
      this.markdownService.renderer.heading = ({text, depth}: MarkedToken.Heading): string => {
      const parsedText = this.markdownService.parseInline(text); // Parse inline Markdown text to HTML
      const escapedText = text
              .toLowerCase()
              .split(/\W+/)
              .filter(Boolean)
              .join('-'); // Remove special characters and join words with hyphens. E.g. "Hello, World!" -> "hello-world"
      return '<h' + depth + '>' +
        '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
        '<span class="header-link"></span>' +
        '</a>' + parsedText +
        '</h' + depth + '>';
    };
  }
}
```

This code will output the following HTML:

```html
<h1>
  <a class="anchor" href="#heading">
    <span class="header-link"></span>
  </a>
  Heading
</h1>
```

> :blue_book: Follow official [marked.renderer](https://marked.js.org/#/USING_PRO.md#renderer) documentation for the list of tokens that can be overridden.

## Re-render Markdown

In some situations, you might need to re-render Markdown after making changes. If you've updated the text, this would be done automatically, however, if the changes are internal to the library such as rendering options, you will need to inform the `MarkdownService` that it needs to update.

To do so, inject the `MarkdownService` and call the `reload()` function as shown below.

```typescript
import {MarkdownService} from '@fsegurai/ngx-markdown';

constructor(private markdownService: MarkdownService){
}

update(){
  this.markdownService.reload();
}
```

> :blue_book: Refer to the `@fsegurai/ngx-markdown` [re-render demo](https://fsegurai.github.io/ngx-markdown/rerender) for a live example.

### Caches

Each `MarkdownService` keeps small caches (the last 50 entries each), so repeated renders do less work:

- **`src` text (opt-in):** with `provideMarkdown({ cacheSrc: true })`, the same `src` is fetched once and shared by every `<markdown>` that loads it, including while the request is pending and when a component is mounted again. There is no expiry: a re-mounted component gets the cached text, not updated server content. A failed request is not cached, and `reload()` drops the cache, so every `src` is fetched again. Off by default: every load fetches, and the browser HTTP cache applies.
- **KaTeX output:** identical math with the same `displayMode` and options is rendered once. An expression KaTeX throws on is never cached, nor math whose options hold a class instance or a symbol (they have no stable key); with a `macros` option, a parse stops using the cache once an expression may define a global macro (`\gdef`, `\newcommand`…).
- **Mermaid SVG:** an identical diagram (same source and merged options, including the theme) is drawn from the cache with fresh element ids. Diagrams with interactions (`click`, `call`, `href`, `callback`, `link`) and failed diagrams are always rendered by Mermaid. An explicit `rerenderMermaid()` never reads the cache (it refreshes it), so it still redraws after the web fonts load or after a global `mermaid.initialize()`.

## Syntax highlight

When using static Markdown, you are responsible to provide the code block with a related language.

```diff
<markdown ngPreserveWhitespaces>
+  ```typescript
    const myProp: string = 'value';
+  ```

When using remote URL `@fsegurai/ngx-markdown` will use the file extension to automatically resolve the code language.

```html
<!-- will use HTML highlights -->
<markdown [src]="'path/to/file.html'"></markdown>

<!-- will use php highlights -->
<markdown [src]="'path/to/file.php'"></markdown>
```

When using variable binding you can optionally use `language` pipe to specify the language of the variable content (default value is Markdown when pipe is not used).

```html
<markdown [data]="markdown | language : 'typescript'"></markdown>
```

## Long documents

`<markdown>` renders long documents without one long main-thread task: a large rendered document (16 KB of HTML or more)
is inserted in three batches of top-level elements, one frame apart (the top of the document first, then the rest in
two halves), and the plugins (highlighting, clipboard buttons) work in chunks. `headings`, `metadata` and `ready` are emitted once the whole document is in place. Nothing needs to be
configured.

The browser still has to lay out and paint the whole document. For very long documents, you can let it skip the blocks
that are off screen with `content-visibility` (opt-in, in your global styles):

```css
markdown.long-document > * {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

```html
<markdown class="long-document" [src]="'docs/handbook.md'"></markdown>
```

On a 5000-line document it lowered the total blocking time by about a third (Chromium 478 → 274 ms, Firefox 700 →
468 ms). Caveats: until a
block has been rendered once, its height is the 500px estimate, so the scrollbar size and position can shift while
scrolling, and a jump to an anchor far down the page (`#section`) can land slightly off before the blocks above it are
laid out. The off-screen content stays in the DOM (find-in-page and accessibility still see it).

## SSR / prerendering

The library is SSR-safe: it works with server-side rendering, static prerendering (`outputMode: "static"`) and client hydration (`provideClientHydration()`). Browser-only work (syntax highlighting, clipboard, Mermaid, emoji) runs only in the browser (KaTeX math is rendered on the server only when `katex` is available there, see Math rendering), and the markdown component and pipe register pending tasks, so the server waits for the rendered markdown before it serializes the page.

When you use `[src]` during SSR or prerendering, keep `HttpClient` on its default Fetch backend (the default since Angular 22). The Angular build serves the application's own assets to the prerenderer through `fetch`, so the XHR backend (`withXhr()`) cannot load them.

## Demo application

To see the components in action, check out the [[DEMO]](https://fsegurai.github.io/ngx-markdown).

To set up the demo locally, follow the next steps:

```bash
git clone https://github.com/fsegurai/ngx-markdown.git
bun install
bun start
```

This will serve the application locally at [http://localhost:4200](http://localhost:4200).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
