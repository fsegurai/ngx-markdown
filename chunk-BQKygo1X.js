import{t as r}from"./chunk-K_VmmcvY.js";import{$ as Nb,Bn as o0,D as FM,Dn as ji,Er as zt,Gt as X,Ht as W,K as L0,Kn as qm,Lt as Vc,N as Gm,Nt as V0,O as Fi,R as Ho,Sn as hb,Vn as oy,Vt as Vw,X as Mp,Zn as sl,a as $o,gn as g,i as $n,jn as k7,kt as UM,mr as x0,mt as Qe,pn as fb,rr as ul,s as A7,sr as vn,vr as xp,yt as Rb,zn as nt}from"./chunk-BMJqnaeG.js";import{a as me,i as ge,n as g$1,r as Mn}from"./main-UM5SAVUH.js";import{c as sn,i as _a,l as vr,n as St,o as ba,r as Yo,s as gr,t as Ln,u as zi}from"./chunk-SxOENNgq.js";import{t as nt$1}from"./chunk-CivaqMRp.js";function te(w,d){if(w&1){let m=xp();Vc(0,`button`,42),$o(`click`,function(){Fi(m);let p=Ho();return ji(p.onCopyToClipboard())}),oy(),Vc(1,`svg`,43),sl(2,`path`,44),Mp()()}}var M=class w{constructor(){this.elementRef=g(nt);this.snackbar=g(me);this.themeService=g(g$1);this.clipboardButton=ge;this.emojiMarkdown=`# I :heart: @fsegurai/ngx-markdown`;this.katexMarkdown=`#### \`katex\` directive example

\`\`\`latex
f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi
\`\`\`

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

Underscores and stars stay math: $a_1 * b_2 = c_{1,2}$, and \\$5 stays a price.

In brackets ($x^2$) and after a quote "$y$" too.
$z = x + y$ starts a wrapped line.

$$
\\sum_{i=1}^n x_i^2 = \\frac{n(n+1)(2n+1)}{6}
$$`;this.mermaidMarkdown=`\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;this.katexNonStandardOptions={nonStandard:!0};this.mermaidErrorMarkdown="```mermaid\ngraph LR;\n  Valid-->Diagram;\n```\n\n```mermaid\nthis is not a diagram\n```";this.mermaidStatus=X(``);this.lastExport=X(``);this.mermaidOptions=Qe(()=>r({fontFamily:`inherit`},this.themeService.mermaidOptions()));this.lightboxMarkdown=`![Sunrise, a warm gradient](lightbox-sunrise.svg)

![Forest, a green gradient](lightbox-forest.svg)

![](lightbox-ocean.svg "Ocean, captioned from its title")

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)`;this.customViewer=X(!1);this.lastImageClick=X(``);this.headings=X(void 0);this.lastCopy=X(``)}ngOnInit(){this.setHeadings()}onCopied({text:d,language:m}){this.lastCopy.set(`Copied ${d.length} characters of ${m??`plain text`}.`)}onCopyError({error:d}){this.lastCopy.set(d.message)}onMermaidError(d){this.mermaidStatus.set(d instanceof Vw?`error: ${d.failures.length} diagram(s) failed (MermaidRenderError)`:`error: ${String(d)}`)}onMermaidExported({filename:d,svg:m}){this.lastExport.set(`Downloaded ${d} (${m.length} characters of SVG).`)}onMermaidExportError({error:d,filename:m}){this.lastExport.set(`${m}: ${d.message}`)}onImageClick(d){let m=d.image.alt||d.image.title||d.image.src;this.customViewer()&&d.preventDefault(),this.lastImageClick.set(`imageClick: ${m} (${d.index+1} of ${d.images.length})${d.defaultPrevented?`, viewer prevented`:``}.`)}onCopyToClipboard(){this.snackbar.open(`Copied to clipboard via ng-template!`,void 0,{duration:3e3,horizontalPosition:`right`,verticalPosition:`bottom`})}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(m){return new(m||w)}}static{this.ɵcmp=$n({type:w,selectors:[[`app-plugins`]],features:[L0([A7({plugins:Mn(),sanitize:W.NONE})])],decls:221,vars:80,consts:[[`buttonTemplate`,``],[3,`headings`],[`id`,`emoji`],[3,`emoji`],[3,`src`],[1,`split`],[`appearance`,`fill`,`color`,`accent`,1,`split-item`],[`cdkTextareaAutosize`,`true`,`matInput`,``,3,`ngModelChange`,`ngModel`],[1,`split-item`,3,`data`,`emoji`],[`id`,`line-numbers`],[3,`lineNumbers`],[3,`start`,`lineNumbers`],[`id`,`line-highlight`],[3,`lineOffset`,`line`,`lineHighlight`],[`id`,`command-line`],[3,`host`,`src`,`user`,`commandLine`],[3,`host`,`output`,`src`,`user`,`commandLine`],[3,`output`,`prompt`,`src`,`commandLine`],[3,`filterOutput`,`prompt`,`src`,`commandLine`],[`id`,`katex`],[1,`split-item`,3,`data`,`katex`],[1,`split-item`,3,`data`,`katex`,`katexOptions`],[`id`,`mermaid`],[1,`centered`,3,`data`,`mermaidOptions`,`mermaid`],[3,`mermaidExported`,`mermaidExportError`,`error`,`ready`,`data`,`mermaidOptions`,`mermaid`,`mermaidExport`],[`aria-live`,`polite`,1,`mermaid-status`],[`aria-live`,`polite`,1,`mermaid-last-export`],[`id`,`clipboard`],[3,`clipboard`],[1,`btn-clipboard-toolbar`,3,`clipboard`],[1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy me!`,`clipboardButtonTextCopied`,`Copied!`,1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy code!`,`clipboardButtonTextCopied`,`Code copied!`,1,`btn-clipboard-default`,3,`clipboard`],[1,`btn-clipboard-default`,3,`copied`,`copyError`,`clipboard`,`clipboardLanguageButton`,`emoji`],[`aria-live`,`polite`,1,`clipboard-last-copy`],[3,`clipboardButtonComponent`,`clipboard`],[3,`clipboardButtonTemplate`,`clipboard`],[`id`,`lightbox`],[1,`lightbox-custom-viewer`],[`type`,`checkbox`,3,`change`,`checked`],[1,`lightbox-gallery`,3,`imageClick`,`data`,`lightbox`],[`aria-live`,`polite`,1,`lightbox-last-click`],[`aria-label`,`Copy to clipboard`,`type`,`button`,1,`btn-clipboard`,3,`click`],[`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,2,`width`,`16px`,`height`,`16px`],[`d`,`M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z`,`fill`,`#fff`]],template:function(m,a){if(m&1){let p=xp();Vc(0,`app-scrollspy-nav-layout`,1)(1,`h1`),vn(2,`Plugins`),Mp(),Vc(3,`markdown`),vn(4,` Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. `),Mp(),Vc(5,`markdown`),vn(6,'\n    Each plugin is provided once, with its `withX()` feature in the `plugins` of `provideMarkdown()` (its global options\n    go there), then enabled per component with its input (`[katex]`, `[mermaid]`, `[clipboard]`…) or the `[plugins]`\n    record. A plugin whose feature is missing does nothing, even when a component enables it: in development a\n    `[ngx-markdown]` warning names the `withX()` to add.\n\n    ```typescript\n    // app.config.ts\n    providers: [\n      provideMarkdown({\n        plugins: [\n          withEmoji(),\n          withPrism(),\n          withKatex({ throwOnError: false }),\n          withMermaid({ loader: () => import(\'mermaid\').then((m) => m.default) }),\n          withMermaidExport(),\n          withClipboard({ buttonComponent: ClipboardButtonComponent }),\n          withLightbox(),\n        ],\n      }),\n    ],\n    ```\n\n    ```html\n    <markdown [data]="markdown" katex mermaid clipboard />\n    <markdown [data]="markdown" [plugins]="{ katex: true, mermaid: true }" />\n    ```\n  '),Mp(),Vc(7,`section`)(8,`h2`,2),vn(9,`Emoji plugin`),Mp(),Vc(10,`markdown`,3),vn(11,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Feature
      \`provideMarkdown({ plugins: [withEmoji()] })\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Mp(),Vc(12,`markdown`),vn(13," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Mp(),sl(14,`markdown`,4),Vc(15,`markdown`),vn(16," The example below illustrate `emoji` directive in action. "),Mp(),Vc(17,`div`,5)(18,`mat-form-field`,6)(19,`textarea`,7),FM(),Rb(`ngModelChange`,function(l){return Fi(p),x0(a.emojiMarkdown,l)||(a.emojiMarkdown=l),ji(l)}),Mp()(),sl(20,`markdown`,8),Mp(),Vc(21,`markdown`,3),vn(22,` > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. `),Mp()(),Vc(23,`section`)(24,`h2`,9),vn(25,`Line Numbers plugin`),Mp(),Vc(26,`markdown`),vn(27,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js
      \`\`\`

      #### Feature
      \`provideMarkdown({ plugins: [withPrism()] })\` highlights the code of every component (Prism itself, its
      Line Numbers, Line Highlight and Command Line plugins); \`withPrism({ lineNumbers: true })\` sets their
      options for the whole application, under the inputs below.

      #### Directive
      \`lineNumbers\` - activate line numbers plugin

      #### Attributes
      \`start\` - offset number for the first display line

      ### Example
    `),Mp(),Vc(28,`markdown`),vn(29," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Mp(),sl(30,`markdown`,4),Vc(31,`markdown`),vn(32," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Mp(),Vc(33,`markdown`,10),vn(34,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Mp(),Vc(35,`markdown`),vn(36," Optionally you can use `start` to specify the offset number for the first display line. "),Mp(),Vc(37,`markdown`),vn(38," In the example below line offset is set to 5 using `start` input property. "),Mp(),Vc(39,`markdown`,11),vn(40,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;

          if (negate) x = -x;

          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);

          if (Math.abs(x - n) < 1 && (x > 0 == n > 0)) {
            return negate ? -possible : possible;
          }
        } catch (e) { }
      }
      \`\`\`
    `),Mp(),Vc(41,`markdown`),vn(42," `start` accepts `0`, to count lines from zero. A value that is not an integer is ignored, with a one-time `[ngx-markdown]` warning. "),Mp(),Vc(43,`markdown`,11),vn(44,"\n      ```javascript\n      const first = items[0];\n      const second = items[1];\n      ```\n    "),Mp()(),Vc(45,`section`)(46,`h2`,12),vn(47,`Line Highlight plugin`),Mp(),Vc(48,`markdown`),vn(49,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`
      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),sl(50,`br`),vn(51,"\n      `lineOffset` - starting offset for line numbers"),sl(52,`br`),vn(53,`

      ### Example
    `),Mp(),Vc(54,`markdown`),vn(55,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to\n      specify the starting line of code your snippet represents.\n    "),Mp(),sl(56,`markdown`,4),Vc(57,`markdown`),vn(58," `line` must be comma-separated line numbers or ranges (e.g. `'6, 10-19'`, or an array of them), and `lineOffset` an integer (`0` included). A malformed value is ignored, with a one-time `[ngx-markdown]` warning, instead of being written to the `data-line` attribute. "),Mp(),Vc(59,`markdown`),vn(60," In the example below `line` 6 and 10 to 19 are highlighted using a `lineOffset` of 5. "),Mp(),Vc(61,`markdown`,13),vn(62,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;

          if (negate) x = -x;

          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);

          if (Math.abs(x - n) < 1 && (x > 0 == n > 0)) {
            return negate ? -possible : possible;
          }
        } catch (e) { }
      }
      \`\`\`
    `),Mp()(),Vc(63,`section`)(64,`h2`,14),vn(65,`Command Line plugin`),Mp(),Vc(66,`markdown`,3),vn(67,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),sl(68,`br`),vn(69,"\n      `output` - lines to be presented as output (optional)"),sl(70,`br`),vn(71,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),sl(72,`br`),vn(73,"\n      `prompt` - data prompt"),sl(74,`br`),vn(75,"\n      `user` - user name"),sl(76,`br`),vn(77,`

      ### Example
    `),Mp(),Vc(78,`markdown`),vn(79,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Mp(),sl(80,`markdown`,15),Vc(81,`markdown`),vn(82,`
      Non-Root User With Output

      \`\`\`html
      <markdown
        commandLine
        [user]="'chris'"
        [host]="'remotehost'"
        [output]="'2, 4-8'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Mp(),sl(83,`markdown`,16),Vc(84,`markdown`),vn(85,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Mp(),sl(86,`markdown`,17),Vc(87,`markdown`),vn(88,`
      Windows PowerShell With Filter Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [filterOutput]="'(out)'">
        \`\`\`powershell
        Get-Date
        (out)
        (out)Sunday, November 7, 2021 8:19:21 PM
        (out)
        \`\u200B\`\`
      </markdown>
      \`\`\`
    `),Mp(),sl(89,`markdown`,18),Mp(),Vc(90,`section`)(91,`h2`,19),vn(92,`KaTeX plugin`),Mp(),Vc(93,`markdown`),vn(94,"\n      #### KaTeX files to include\n      ```javascript\n      node_modules/katex/dist/katex.min.css\n      node_modules/katex/dist/katex.min.js\n      ```\n\n      #### Feature\n      `provideMarkdown({ plugins: [withKatex(options?)] })`\n\n      #### Directive\n      `katex` - render `$…$` (inline) and `$$…$$` (display) math with KaTeX while the Markdown is parsed\n\n      #### Attributes\n      `katexOptions` - [KaTeX options](https://katex.org/docs/options.html), plus `nonStandard`, merged over the\n      options of `withKatex()`"),sl(95,`br`),vn(96,"\n\n      #### Supported syntax\n      - `$…$` - inline math: the opening `$` starts the text or follows a space, an opening bracket or a quote, and the\n        closing `$` is followed by a space, punctuation, a closing bracket or the end, so `$5 and $10` stays text\n      - `$$…$$` - display math, inline or on lines of its own\n      - `\\$` - a literal dollar; math in code spans and code blocks is left untouched\n\n      > Upgrading from 21.x: the Auto-Render extension is no longer used. Remove its script from your `angular.json`;\n      > `\\(…\\)`, `\\[…\\]` and its `delimiters` option are not supported, and math inside raw HTML blocks is not\n      > rendered.\n\n      ### Example\n    "),Mp(),Vc(97,`markdown`),vn(98," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),Mp(),sl(99,`markdown`,4),Vc(100,`markdown`,3),vn(101,"\n      The example below illustrate `katex` directive in action.\n\n      > :bulb: Math is rendered while the Markdown is parsed, so `_`, `*` and `\\` inside `$…$` are never turned into emphasis or escapes. Write `\\$` for a literal dollar; math in code spans and code blocks is left untouched.\n    "),Mp(),Vc(102,`div`,5)(103,`mat-form-field`,6)(104,`textarea`,7),FM(),Rb(`ngModelChange`,function(l){return Fi(p),x0(a.katexMarkdown,l)||(a.katexMarkdown=l),ji(l)}),Mp()(),sl(105,`markdown`,20),Mp(),Vc(106,`markdown`),vn(107,`
      Optionally, you can specify [KaTeX options](https://katex.org/docs/options.html) using the \`katexOptions\`
      property, or for the whole application with \`withKatex(options)\`.

      **example.component.ts**
      \`\`\`typescript
      import { KatexOptions } from '@fsegurai/ngx-markdown';

      public options: KatexOptions = {
        throwOnError: false,
        errorColor: '#cc0000',
        macros: { '\\\\RR': '\\\\mathbb{R}' },
      };
      \`\`\`

      **example.component.html**
    `),Mp(),sl(108,`markdown`,4),Vc(109,`markdown`),vn(110,`
      #### Global options

      \`withKatex(options)\` sets the options of the whole application; the \`katexOptions\` input of a component is
      merged over them.

      \`\`\`typescript
      // app.config.ts
      providers: [
        provideMarkdown({
          plugins: [withKatex({ throwOnError: false, macros: { '\\\\RR': '\\\\mathbb{R}' } })],
        }),
      ],
      \`\`\`

      #### Math glued to text: \`nonStandard\`

      By default \`a$x^2$b\` stays text, so prices and shell variables are not turned into math. \`nonStandard: true\`
      renders every \`$\u2026$\`, wherever it is.
    `),Mp(),Vc(111,`div`,5),sl(112,`markdown`,20)(113,`markdown`,21),Mp(),Vc(114,`markdown`,3),vn(115,'\n      #### Server-side rendering and sanitization\n\n      Math is also rendered on the server when the global `katex` is available there; otherwise the server leaves the\n      source text. The KaTeX output is inserted after the HTML sanitizer, through `<span class="ngx-katex-…">`\n      placeholders that a custom `sanitize` function must keep.\n\n      > :warning: The `trust` option enables `\\href`, `\\url`, `\\includegraphics` and the `\\html*` commands, whose\n      > output is not sanitized: keep it `false` (the default) for untrusted content.\n    '),Mp()(),Vc(116,`section`)(117,`h2`,22),vn(118,`Mermaid plugin`),Mp(),Vc(119,`markdown`),vn(120,"\n      #### Loading Mermaid\n      Provide the plugin with `withMermaid()`, and load Mermaid on demand with its `loader` option, as this demo does:\n      only the pages with a diagram download it, as a lazy chunk (list Mermaid's CommonJS dependencies in\n      `allowedCommonJsDependencies`).\n\n      ```typescript\n      // app.config.ts\n      provideMarkdown({\n        plugins: [withMermaid({ loader: () => import('mermaid').then((m) => m.default) })],\n      }),\n      ```\n\n      Alternatively, add `node_modules/mermaid/dist/mermaid.min.js` to the `scripts` of your `angular.json`: simpler,\n      but every page downloads it (about 5.5 MB).\n\n      #### Directive\n      `mermaid` - activate mermaid plugin\n\n      #### Attributes\n      `mermaidOptions` - mermaid [configuration\n      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)"),sl(121,`br`),vn(122,`

      #### Outputs
      \`ready\` - emitted once every diagram is drawn`),sl(123,`br`),vn(124,"\n      `error` - emits a `MermaidRenderError` listing each failed diagram (`failures`: `element`, `error`)"),sl(125,`br`),vn(126,`

      ### Example
    `),Mp(),Vc(127,`markdown`),vn(128," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Mp(),sl(129,`markdown`,4),Vc(130,`markdown`),vn(131," The example below illustrate `mermaid` directive in action. "),Mp(),Vc(132,`div`,5)(133,`mat-form-field`,6)(134,`textarea`,7),FM(),Rb(`ngModelChange`,function(l){return Fi(p),x0(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),ji(l)}),Mp()(),sl(135,`markdown`,23),Mp(),Vc(136,`markdown`),vn(137,`
      #### Global configuration

      You can provide a global configuration for mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) to use across your
      application with the \`config\` of \`withMermaid()\` in your application providers. The \`mermaidOptions\` of a
      component are merged over it, key by key. Components then import the standalone \`MarkdownComponent\`.

      \`\`\`typescript
      // app.config.ts
      providers: [
        provideMarkdown({
          plugins: [
            withMermaid({
              config: {
                darkMode: true,
                look: 'handDrawn',
                ...
              },
            }),
          ],
        }),
      ],

      // your component
      imports: [MarkdownComponent],
      \`\`\`

      #### Component configuration

      Additionally, you can specify mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) on component directly
      using \`mermaidOptions\` property.

      **example.component.ts**
      \`\`\`typescript
      import { MermaidAPI } from '@fsegurai/ngx-markdown';

      public options: MermaidAPI.MermaidConfig = {
        darkMode: true,
        look: 'handDrawn',
        ...
      };
      \`\`\`

      **example.component.html**
    `),Mp(),sl(138,`markdown`,4),Vc(139,`markdown`),vn(140,`
      #### Following a light/dark theme

      \`mermaidOptions\` is the one rendering input that is tracked: when its value changes after the first render, only
      the Mermaid diagrams are rendered again, from their kept sources (the Markdown is not parsed again). Bind it to a
      signal or a \`computed\` derived from your theme, as this demo does: toggle the theme in the toolbar and the diagram
      above follows it.

      \`\`\`typescript
      protected readonly mermaidOptions = computed<MermaidAPI.MermaidConfig>(() =>
        this.theme() === 'dark' ? { theme: 'dark', darkMode: true } : { theme: 'default', darkMode: false },
      );
      \`\`\`

      Outside of a component, \`MarkdownService.rerenderMermaid(element, { mermaidOptions })\` does the same for an
      element you rendered: it returns a Promise that rejects with a \`MermaidRenderError\`.

      #### Errors

      Each diagram is rendered on its own: a diagram that fails shows a \`.mermaid-error\` box with the error message
      (style it with that class), the others still render, and the component emits \`error\` instead of \`ready\`.
    `),Mp(),Vc(141,`markdown`,3),vn(142,` > :construction: The second diagram below is invalid **on purpose**, to show the error box. Its error is also logged in the console. `),Mp(),Vc(143,`markdown`,24),$o(`mermaidExported`,function(l){return a.onMermaidExported(l)})(`mermaidExportError`,function(l){return a.onMermaidExportError(l)})(`error`,function(l){return a.onMermaidError(l)})(`ready`,function(){return a.mermaidStatus.set(`ready: every diagram rendered`)}),Mp(),Vc(144,`p`,25),vn(145),Mp(),Vc(146,`p`,26),vn(147),Mp(),Vc(148,`markdown`),vn(149,"\n      ```typescript\n      onMermaidError(error: MarkdownError): void {\n        if (error instanceof MermaidRenderError) {\n          console.log(`${error.failures.length} diagram(s) failed`, error.failures);\n        }\n      }\n      ```\n\n      #### SVG export\n\n      With `withMermaidExport()` in the `plugins` and `[mermaidExport]=\"true\"`, every rendered diagram (not the error boxes) gets an `SVG` button that downloads\n      it as `diagram-<n>.svg`, as in the example above. The `(mermaidExported)` output reports each download and\n      `(mermaidExportError)` a failure. `mermaidExportButtonComponent`, `mermaidExportButtonTemplate` and\n      `mermaidExportFilenamePrefix` customize it; the buttons are recreated when the diagrams are re-rendered.\n\n      Each `mermaid.render()` call has 30 seconds to settle; change it with `withMermaid({ renderTimeout })` (in\n      milliseconds, `0` disables it), for instance for large ELK layouts.\n\n      #### Mermaid 12 appearance\n\n      Mermaid 12 defaults to the ELK layout and, for most diagrams, the `redux-color` theme and the `neo` look. To\n      restore the classic look, pin `{ layout: 'dagre', look: 'classic', theme: 'default' }` in the `config`\n      of `withMermaid()` (this demo pins `layout: 'dagre'` and keeps a `handDrawn` look).\n    "),Mp(),Vc(150,`markdown`,3),vn(151,` > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. `),Mp()(),Vc(152,`section`)(153,`h2`,27),vn(154,`Clipboard plugin`),Mp(),Vc(155,`markdown`),vn(156,"\n      #### Clipboard file(s) to include\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Feature\n      `provideMarkdown({ plugins: [withClipboard(options?)] })`\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),sl(157,`br`),vn(158,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),sl(159,`br`),vn(160,"\n      `clipboardButtonTextCopy` - text to display on the copy button"),sl(161,`br`),vn(162,"\n      `clipboardButtonTextCopied` - text to display on the copied button"),sl(163,`br`),vn(164,"\n      `clipboardLanguageButton` - enable language copy button taken as a reference from the code block"),sl(165,`br`),vn(166,"\n\n      #### Outputs\n      `copied` - emits `{ text, language?, element }` when the code block was copied"),sl(167,`br`),vn(168,"\n      `copyError` - emits `{ error, language?, element }` when the copy failed"),sl(169,`br`),vn(170,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),sl(171,`br`),vn(172,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),sl(173,`br`),vn(174,"\n      `markdown-clipboard-button` - default button"),sl(175,`br`),vn(176,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),sl(177,`br`),vn(178,`

      ### Example
    `),Mp(),Vc(179,`markdown`,28),vn(180,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative
      is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),Mp(),Vc(181,`markdown`,29),vn(182,`
      #### Customize toolbar

      The clipboard button is placed inside a wrapper element that can be customize using the
      \`.markdown-clipboard-toolbar\` CSS selector in your global \`styles.css/scss\` file.

      This allows to override the default positioning of the clipboard button and play with the visibility of the button
      using the \`.hover\` CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code
      block element.

      \`\`\`css
      .markdown-clipboard-toolbar {
        top: 16px;
        right: 16px;
        opacity: 0;
        transition: opacity 250ms ease-out;
      }

      .markdown-clipboard-toolbar.hover {
        opacity: 1;
      }
      \`\`\`
    `),Mp(),Vc(183,`markdown`,30),vn(184,`
      #### Customize default button

      The default button can be customized using the \`.markdown-clipboard-button\` CSS selector in your global
      \`styles.css/scss\` file. You can also customized the "copied" state happening after the button is clicked using the
      \`.copied\` CSS selector.

      \`\`\`css
      .markdown-clipboard-button {
        background-color: rgba(255, 255, 255, 0.07);
        border: none;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        font-size: 11px;
        padding: 4px 0;
        width: 50px;
        transition: all 250ms ease-out;
      }

      .markdown-clipboard-button:hover {
        background-color: rgba(255, 255, 255, 0.14);
      }

      .markdown-clipboard-button:active {
        transform: scale(0.95);
      }

      .markdown-clipboard-button.copied {
        background-color: rgba(0, 255, 0, 0.1);
        color: #00ff00;
      }
      \`\`\`
    `),Mp(),Vc(185,`markdown`,31),vn(186,"\n      #### Customize button text copy and button text copied\n\n      The default button text can be customized using the `clipboardButtonTextCopy` and `clipboardButtonTextCopied`\n      input properties on the `markdown` component, directive or pipe.\n\n      ```javascript\n      const example = 'the default clipboard button with custom text';\n      ```\n    "),Mp(),Vc(187,`markdown`,32),vn(188,`
      \`\`\`cpp
      #include <iostream>

      int main() {
        std::cout << "Hello, World!";
        return 0;
      }
      \`\`\`
    `),Mp(),Vc(189,`markdown`,33),$o(`copied`,function(l){return a.onCopied(l)})(`copyError`,function(l){return a.onCopyError(l)}),vn(190,`
      #### Language button

      To enable language button, use the \`[clipboardLanguageButton]="true"\` input property on the \`markdown\` component,
      directive or pipe. The default button is then labelled with the \`language-xxx\` class of the code block, alone
      (\`ts\` for \`class="language-ts line-numbers"\`), or \`Copy\` when it has no language.

      #### Copy events

      The \`(copied)\` and \`(copyError)\` outputs of this example report each copy below the code blocks, whatever the
      button (default, component or template).

      \`\`\`html
      <markdown clipboard (copied)="onCopied($event)" (copyError)="onCopyError($event)"></markdown>
      \`\`\`

      \`\`\`typescript
      onCopied({ text, language }: MarkdownCopyEvent): void { ... }
      onCopyError({ error }: MarkdownCopyErrorEvent): void { console.warn(error.message); }
      \`\`\`

      \`\`\` python
      s = "Python syntax highlighting"
      print s
      \`\`\`

      \`\`\` javascript
      const message = "JavaScript syntax highlighting";
      alert(message);

      const regexp = /foo/g;

      function findSequence(goal) {
        function find(start, history) {
          if (start == goal) {
            return history;
          } else if (start > goal) {
            return null;
          } else {
            return find(start + 5, "(" + history + " + 5)") ||
            find(start * 3, "(" + history + " * 3)");
          }
        }
        return find(1, "1");
      }
      \`\`\`

      \`\`\`
      No language indicated, so no syntax highlighting.
      But let's throw in the default button behavior.
      \`\`\`
    `),Mp(),Vc(191,`p`,34),vn(192),Mp(),Vc(193,`markdown`,35),vn(194,`
      #### Using global configuration

      You can provide a custom component to use globally across your application with the options of
      \`withClipboard()\` in your application providers. Components then import the standalone \`MarkdownComponent\`.

      \`\`\`typescript
      // app.config.ts
      providers: [
        provideMarkdown({
          plugins: [withClipboard({ buttonComponent: ClipboardButtonComponent })],
        }),
      ],

      // your component
      imports: [MarkdownComponent],
      \`\`\`

      A button set on an instance (\`clipboardButtonComponent\` or \`clipboardButtonTemplate\`) replaces the global button
      for that instance. This page provides its own \`provideMarkdown()\` (with \`withClipboard()\` and no button
      component) in the component \`providers\`, so its other examples show the default button.
    `),Mp(),Vc(195,`markdown`,35),Gm(),vn(196,`
      #### Using a component

      You can also provide your custom component using the \`clipboardButtonComponent\` input property when using the
      \`clipboard\` directive.

      \`\`\`typescript
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-clipboard-button',
        template: \`<button (click)="onClick()">Copy</button>\`,
      })
      export class ClipboardButtonComponent {
        onClick() {
          alert('Copied to clipboard!');
        }
      }
      \`\`\`

      \`\`\`typescript
      import { ClipboardButtonComponent } from './clipboard-button-component';

      @Component({ ... })
      export class ExampleComponent {
        readonly clipboardButton = ClipboardButtonComponent;
      }
      \`\`\`

      \`\`\`html
      <markdown clipboard [clipboardButtonComponent]="clipboardButton"></markdown>
      \`\`\`

      #### Inputs of a custom component

      A custom button component gets the \`language\`, \`code\`, \`buttonTextCopy\` and \`buttonTextCopied\` inputs
      (\`ClipboardButtonInputs\`) that it declares; undeclared ones are never set. The button of this demo declares
      \`language\` and uses it in its label (hover it above).

      \`\`\`typescript
      export class ClipboardButtonComponent {
        readonly language = input<string>();
        readonly code = input<string>('');
      }
      \`\`\`
    `),qm(),Mp(),fb(197,te,3,0,`ng-template`,null,0,V0),Vc(199,`markdown`,36),vn(200,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button\n      implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n      <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Mp()(),Vc(201,`section`)(202,`h2`,37),vn(203,`Lightbox`),Mp(),Vc(204,`markdown`),vn(205,"\n      #### Feature\n      `provideMarkdown({ plugins: [withLightbox(options?)] })`\n\n      #### Directive\n      `lightbox` - open the content images in a built-in, dependency-free `<dialog>` viewer\n\n      #### Attributes\n      `lightboxOptions` - `{ wrap?, dialogLabel?, closeLabel?, previousLabel?, nextLabel? }`, merged over\n      the options of `withLightbox()`"),sl(206,`br`),vn(207,"\n\n      #### Outputs\n      `imageClick` - emits `{ image, index, images, preventDefault() }` when an image is activated; calling\n      `preventDefault()` keeps the built-in viewer closed, so another viewer can open instead"),sl(208,`br`),vn(209,`

      ### Example

      Click an image, or focus it with Tab and press Enter. Arrow keys browse, Esc or a click on the backdrop closes.
    `),Mp(),Vc(210,`label`,38)(211,`input`,39),$o(`change`,function(){return a.customViewer.set(!a.customViewer())}),Mp(),vn(212,` Handle the click myself (`),Vc(213,`code`),vn(214,`preventDefault()`),Mp(),vn(215,`) `),Mp(),Vc(216,`markdown`,40),$o(`imageClick`,function(l){return a.onImageClick(l)}),Mp(),Vc(217,`p`,41),vn(218),Mp(),Vc(219,`markdown`),vn(220,`
      \`\`\`html
      <markdown [data]="markdown" lightbox (imageClick)="onImageClick($event)" />
      \`\`\`

      \`\`\`typescript
      onImageClick(event: MarkdownImageClickEvent): void {
        if (this.customViewer()) {
          event.preventDefault(); // open LightGallery, PhotoSwipe... instead
        }
      }
      \`\`\`

      Linked images, and images inside Mermaid or KaTeX output, are never opened. Theme the viewer with the
      \`--markdown-lightbox-*\` CSS custom properties (see the README).
    `),Mp()()()}if(m&2){let p=o0(198);hb(`headings`,a.headings()),zt(10),hb(`emoji`,!0),zt(4),hb(`src`,`app/plugins/remote/emoji.html`),zt(5),Nb(`ngModel`,a.emojiMarkdown),UM(),zt(),hb(`data`,a.emojiMarkdown)(`emoji`,!0),zt(),hb(`emoji`,!0),zt(9),hb(`src`,`app/plugins/remote/line-numbers.html`),zt(3),hb(`lineNumbers`,!0),zt(6),hb(`start`,5)(`lineNumbers`,!0),zt(4),hb(`start`,0)(`lineNumbers`,!0),zt(13),hb(`src`,`app/plugins/remote/line-highlight.html`),zt(5),hb(`lineOffset`,5)(`line`,`6, 10-19`)(`lineHighlight`,!0),zt(5),hb(`emoji`,!0),zt(14),hb(`host`,`localhost`)(`src`,`app/plugins/remote/root-user-without-output.bash`)(`user`,`root`)(`commandLine`,!0),zt(3),hb(`host`,`remotehost`)(`output`,`2, 4-8`)(`src`,`app/plugins/remote/non-root-user-with-output.bash`)(`user`,`chris`)(`commandLine`,!0),zt(3),hb(`output`,`2-19`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-output.powershell`)(`commandLine`,!0),zt(3),hb(`filterOutput`,`(out)`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-filter-output.powershell`)(`commandLine`,!0),zt(10),hb(`src`,`app/plugins/remote/katex.html`),zt(),hb(`emoji`,!0),zt(4),Nb(`ngModel`,a.katexMarkdown),UM(),zt(),hb(`data`,a.katexMarkdown)(`katex`,!0),zt(3),hb(`src`,`app/plugins/remote/katex-options.html`),zt(4),hb(`data`,`Default: a$x^2$b`)(`katex`,!0),zt(),hb(`data`,`nonStandard: a$x^2$b`)(`katex`,!0)(`katexOptions`,a.katexNonStandardOptions),zt(),hb(`emoji`,!0),zt(15),hb(`src`,`app/plugins/remote/mermaid.html`),zt(5),Nb(`ngModel`,a.mermaidMarkdown),UM(),zt(),hb(`data`,a.mermaidMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0),zt(3),hb(`src`,`app/plugins/remote/mermaid-options.html`),zt(3),hb(`emoji`,!0),zt(2),hb(`data`,a.mermaidErrorMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0)(`mermaidExport`,!0),zt(2),ul(a.mermaidStatus()),zt(2),ul(a.lastExport()),zt(3),hb(`emoji`,!0),zt(29),hb(`clipboard`,!0),zt(2),hb(`clipboard`,!0),zt(2),hb(`clipboard`,!0),zt(2),hb(`clipboard`,!0),zt(2),hb(`clipboard`,!0),zt(2),hb(`clipboard`,!0)(`clipboardLanguageButton`,!0)(`emoji`,!0),zt(3),ul(a.lastCopy()),zt(),hb(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),zt(2),hb(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),zt(4),hb(`clipboardButtonTemplate`,p)(`clipboard`,!0),zt(12),hb(`checked`,a.customViewer()),zt(5),hb(`data`,a.lightboxMarkdown)(`lightbox`,!0),zt(2),ul(a.lastImageClick())}},dependencies:[vr,sn,gr,zi,k7,St,Ln,ba,_a,Yo,nt$1],styles:[`[_nghost-%COMP%]{display:block}.split[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;gap:16px}@media(min-width:960px){.split[_ngcontent-%COMP%]{flex-direction:row}.split[_ngcontent-%COMP%] > .split-item[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 calc(50% - 8px);min-width:calc(50% - 8px)}}.centered[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;place-content:center}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}.lightbox-gallery[_ngcontent-%COMP%]     img{width:200px;height:auto;border-radius:4px}.lightbox-custom-viewer[_ngcontent-%COMP%]{display:inline-flex;gap:8px;align-items:center}`]})}};export{M as default};