import{Bn as zi,D as CR,Dt as Wn,Et as Wb,F as Ex,Hn as r,I as Fp,In as xb,It as _Y,M as Dn,Mt as Yc,On as qt,Ot as Wo,Pt as Zo,Q as MY,Tn as qi,Tt as W,Y as K,Yt as g,Zt as gR,_n as ny,a as me,gn as nt,i as ge,in as j0,it as Nb,jn as ty,n as g$1,on as jp,pn as ml,qt as fl,r as Mn,rn as hy,tn as hC,un as lR,ut as Qe,z as Gb,zn as yx}from"./main-7PGP3Y6F.js";import{c as ln,i as _r,l as vr,n as St,o as ba,r as Xo,s as ji,t as Ln,u as xa}from"./chunk-DMX3T0tl.js";import{t as ot}from"./chunk-BFo-hZcP.js";function te(w,d){if(w&1){let m=jp();Yc(0,`button`,42),Wo(`click`,function(){zi(m);let p=Zo();return qi(p.onCopyToClipboard())}),hy(),Yc(1,`svg`,43),fl(2,`path`,44),Fp()()}}var M=class w{constructor(){this.elementRef=g(nt);this.snackbar=g(me);this.themeService=g(g$1);this.clipboardButton=ge;this.emojiMarkdown=`# I :heart: @fsegurai/ngx-markdown`;this.katexMarkdown=`#### \`katex\` directive example

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
\`\`\``;this.katexNonStandardOptions={nonStandard:!0};this.mermaidErrorMarkdown="```mermaid\ngraph LR;\n  Valid-->Diagram;\n```\n\n```mermaid\nthis is not a diagram\n```";this.mermaidStatus=K(``);this.lastExport=K(``);this.mermaidOptions=Qe(()=>r({fontFamily:`inherit`},this.themeService.mermaidOptions()));this.lightboxMarkdown=`![Sunrise, a warm gradient](lightbox-sunrise.svg)

![Forest, a green gradient](lightbox-forest.svg)

![](lightbox-ocean.svg "Ocean, captioned from its title")

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)`;this.customViewer=K(!1);this.lastImageClick=K(``);this.headings=K(void 0);this.lastCopy=K(``)}ngOnInit(){this.setHeadings()}onCopied({text:d,language:m}){this.lastCopy.set(`Copied ${d.length} characters of ${m??`plain text`}.`)}onCopyError({error:d}){this.lastCopy.set(d.message)}onMermaidError(d){this.mermaidStatus.set(d instanceof hC?`error: ${d.failures.length} diagram(s) failed (MermaidRenderError)`:`error: ${String(d)}`)}onMermaidExported({filename:d,svg:m}){this.lastExport.set(`Downloaded ${d} (${m.length} characters of SVG).`)}onMermaidExportError({error:d,filename:m}){this.lastExport.set(`${m}: ${d.message}`)}onImageClick(d){let m=d.image.alt||d.image.title||d.image.src;this.customViewer()&&d.preventDefault(),this.lastImageClick.set(`imageClick: ${m} (${d.index+1} of ${d.images.length})${d.defaultPrevented?`, viewer prevented`:``}.`)}onCopyToClipboard(){this.snackbar.open(`Copied to clipboard via ng-template!`,void 0,{duration:3e3,horizontalPosition:`right`,verticalPosition:`bottom`})}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(m){return new(m||w)}}static{this.ɵcmp=Wn({type:w,selectors:[[`app-plugins`]],features:[gR([_Y({plugins:Mn(),sanitize:W.NONE})])],decls:221,vars:80,consts:[[`buttonTemplate`,``],[3,`headings`],[`id`,`emoji`],[3,`emoji`],[3,`src`],[1,`split`],[`appearance`,`fill`,`color`,`accent`,1,`split-item`],[`cdkTextareaAutosize`,`true`,`matInput`,``,3,`ngModelChange`,`ngModel`],[1,`split-item`,3,`data`,`emoji`],[`id`,`line-numbers`],[3,`lineNumbers`],[3,`start`,`lineNumbers`],[`id`,`line-highlight`],[3,`lineOffset`,`line`,`lineHighlight`],[`id`,`command-line`],[3,`host`,`src`,`user`,`commandLine`],[3,`host`,`output`,`src`,`user`,`commandLine`],[3,`output`,`prompt`,`src`,`commandLine`],[3,`filterOutput`,`prompt`,`src`,`commandLine`],[`id`,`katex`],[1,`split-item`,3,`data`,`katex`],[1,`split-item`,3,`data`,`katex`,`katexOptions`],[`id`,`mermaid`],[1,`centered`,3,`data`,`mermaidOptions`,`mermaid`],[3,`mermaidExported`,`mermaidExportError`,`error`,`ready`,`data`,`mermaidOptions`,`mermaid`,`mermaidExport`],[`aria-live`,`polite`,1,`mermaid-status`],[`aria-live`,`polite`,1,`mermaid-last-export`],[`id`,`clipboard`],[3,`clipboard`],[1,`btn-clipboard-toolbar`,3,`clipboard`],[1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy me!`,`clipboardButtonTextCopied`,`Copied!`,1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy code!`,`clipboardButtonTextCopied`,`Code copied!`,1,`btn-clipboard-default`,3,`clipboard`],[1,`btn-clipboard-default`,3,`copied`,`copyError`,`clipboard`,`clipboardLanguageButton`,`emoji`],[`aria-live`,`polite`,1,`clipboard-last-copy`],[3,`clipboardButtonComponent`,`clipboard`],[3,`clipboardButtonTemplate`,`clipboard`],[`id`,`lightbox`],[1,`lightbox-custom-viewer`],[`type`,`checkbox`,3,`change`,`checked`],[1,`lightbox-gallery`,3,`imageClick`,`data`,`lightbox`],[`aria-live`,`polite`,1,`lightbox-last-click`],[`aria-label`,`Copy to clipboard`,`type`,`button`,1,`btn-clipboard`,3,`click`],[`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,2,`width`,`16px`,`height`,`16px`],[`d`,`M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z`,`fill`,`#fff`]],template:function(m,a){if(m&1){let p=jp();Yc(0,`app-scrollspy-nav-layout`,1)(1,`h1`),Dn(2,`Plugins`),Fp(),Yc(3,`markdown`),Dn(4,` Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. `),Fp(),Yc(5,`markdown`),Dn(6,'\n    Each plugin is provided once, with its `withX()` feature in the `plugins` of `provideMarkdown()` (its global options\n    go there), then enabled per component with its input (`[katex]`, `[mermaid]`, `[clipboard]`…) or the `[plugins]`\n    record. A plugin whose feature is missing does nothing, even when a component enables it: in development a\n    `[ngx-markdown]` warning names the `withX()` to add.\n\n    ```typescript\n    // app.config.ts\n    providers: [\n      provideMarkdown({\n        plugins: [\n          withEmoji(),\n          withPrism(),\n          withKatex({ throwOnError: false }),\n          withMermaid({ loader: () => import(\'mermaid\').then((m) => m.default) }),\n          withMermaidExport(),\n          withClipboard({ buttonComponent: ClipboardButtonComponent }),\n          withLightbox(),\n        ],\n      }),\n    ],\n    ```\n\n    ```html\n    <markdown [data]="markdown" katex mermaid clipboard />\n    <markdown [data]="markdown" [plugins]="{ katex: true, mermaid: true }" />\n    ```\n  '),Fp(),Yc(7,`section`)(8,`h2`,2),Dn(9,`Emoji plugin`),Fp(),Yc(10,`markdown`,3),Dn(11,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Feature
      \`provideMarkdown({ plugins: [withEmoji()] })\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Fp(),Yc(12,`markdown`),Dn(13," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Fp(),fl(14,`markdown`,4),Yc(15,`markdown`),Dn(16," The example below illustrate `emoji` directive in action. "),Fp(),Yc(17,`div`,5)(18,`mat-form-field`,6)(19,`textarea`,7),yx(),Wb(`ngModelChange`,function(l){return zi(p),lR(a.emojiMarkdown,l)||(a.emojiMarkdown=l),qi(l)}),Fp()(),fl(20,`markdown`,8),Fp(),Yc(21,`markdown`,3),Dn(22,` > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. `),Fp()(),Yc(23,`section`)(24,`h2`,9),Dn(25,`Line Numbers plugin`),Fp(),Yc(26,`markdown`),Dn(27,`
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
    `),Fp(),Yc(28,`markdown`),Dn(29," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Fp(),fl(30,`markdown`,4),Yc(31,`markdown`),Dn(32," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Fp(),Yc(33,`markdown`,10),Dn(34,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Fp(),Yc(35,`markdown`),Dn(36," Optionally you can use `start` to specify the offset number for the first display line. "),Fp(),Yc(37,`markdown`),Dn(38," In the example below line offset is set to 5 using `start` input property. "),Fp(),Yc(39,`markdown`,11),Dn(40,`
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
    `),Fp(),Yc(41,`markdown`),Dn(42," `start` accepts `0`, to count lines from zero. A value that is not an integer is ignored, with a one-time `[ngx-markdown]` warning. "),Fp(),Yc(43,`markdown`,11),Dn(44,"\n      ```javascript\n      const first = items[0];\n      const second = items[1];\n      ```\n    "),Fp()(),Yc(45,`section`)(46,`h2`,12),Dn(47,`Line Highlight plugin`),Fp(),Yc(48,`markdown`),Dn(49,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`
      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),fl(50,`br`),Dn(51,"\n      `lineOffset` - starting offset for line numbers"),fl(52,`br`),Dn(53,`

      ### Example
    `),Fp(),Yc(54,`markdown`),Dn(55,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to\n      specify the starting line of code your snippet represents.\n    "),Fp(),fl(56,`markdown`,4),Yc(57,`markdown`),Dn(58," `line` must be comma-separated line numbers or ranges (e.g. `'6, 10-19'`, or an array of them), and `lineOffset` an integer (`0` included). A malformed value is ignored, with a one-time `[ngx-markdown]` warning, instead of being written to the `data-line` attribute. "),Fp(),Yc(59,`markdown`),Dn(60," In the example below `line` 6 and 10 to 19 are highlighted using a `lineOffset` of 5. "),Fp(),Yc(61,`markdown`,13),Dn(62,`
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
    `),Fp()(),Yc(63,`section`)(64,`h2`,14),Dn(65,`Command Line plugin`),Fp(),Yc(66,`markdown`,3),Dn(67,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),fl(68,`br`),Dn(69,"\n      `output` - lines to be presented as output (optional)"),fl(70,`br`),Dn(71,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),fl(72,`br`),Dn(73,"\n      `prompt` - data prompt"),fl(74,`br`),Dn(75,"\n      `user` - user name"),fl(76,`br`),Dn(77,`

      ### Example
    `),Fp(),Yc(78,`markdown`),Dn(79,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Fp(),fl(80,`markdown`,15),Yc(81,`markdown`),Dn(82,`
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
    `),Fp(),fl(83,`markdown`,16),Yc(84,`markdown`),Dn(85,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Fp(),fl(86,`markdown`,17),Yc(87,`markdown`),Dn(88,`
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
    `),Fp(),fl(89,`markdown`,18),Fp(),Yc(90,`section`)(91,`h2`,19),Dn(92,`KaTeX plugin`),Fp(),Yc(93,`markdown`),Dn(94,"\n      #### KaTeX files to include\n      ```javascript\n      node_modules/katex/dist/katex.min.css\n      node_modules/katex/dist/katex.min.js\n      ```\n\n      #### Feature\n      `provideMarkdown({ plugins: [withKatex(options?)] })`\n\n      #### Directive\n      `katex` - render `$…$` (inline) and `$$…$$` (display) math with KaTeX while the Markdown is parsed\n\n      #### Attributes\n      `katexOptions` - [KaTeX options](https://katex.org/docs/options.html), plus `nonStandard`, merged over the\n      options of `withKatex()`"),fl(95,`br`),Dn(96,"\n\n      #### Supported syntax\n      - `$…$` - inline math: the opening `$` starts the text or follows a space, an opening bracket or a quote, and the\n        closing `$` is followed by a space, punctuation, a closing bracket or the end, so `$5 and $10` stays text\n      - `$$…$$` - display math, inline or on lines of its own\n      - `\\$` - a literal dollar; math in code spans and code blocks is left untouched\n\n      > Upgrading from 21.x: the Auto-Render extension is no longer used. Remove its script from your `angular.json`;\n      > `\\(…\\)`, `\\[…\\]` and its `delimiters` option are not supported, and math inside raw HTML blocks is not\n      > rendered.\n\n      ### Example\n    "),Fp(),Yc(97,`markdown`),Dn(98," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),Fp(),fl(99,`markdown`,4),Yc(100,`markdown`,3),Dn(101,"\n      The example below illustrate `katex` directive in action.\n\n      > :bulb: Math is rendered while the Markdown is parsed, so `_`, `*` and `\\` inside `$…$` are never turned into emphasis or escapes. Write `\\$` for a literal dollar; math in code spans and code blocks is left untouched.\n    "),Fp(),Yc(102,`div`,5)(103,`mat-form-field`,6)(104,`textarea`,7),yx(),Wb(`ngModelChange`,function(l){return zi(p),lR(a.katexMarkdown,l)||(a.katexMarkdown=l),qi(l)}),Fp()(),fl(105,`markdown`,20),Fp(),Yc(106,`markdown`),Dn(107,`
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
    `),Fp(),fl(108,`markdown`,4),Yc(109,`markdown`),Dn(110,`
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
    `),Fp(),Yc(111,`div`,5),fl(112,`markdown`,20)(113,`markdown`,21),Fp(),Yc(114,`markdown`,3),Dn(115,'\n      #### Server-side rendering and sanitization\n\n      Math is also rendered on the server when the global `katex` is available there; otherwise the server leaves the\n      source text. The KaTeX output is inserted after the HTML sanitizer, through `<span class="ngx-katex-…">`\n      placeholders that a custom `sanitize` function must keep.\n\n      > :warning: The `trust` option enables `\\href`, `\\url`, `\\includegraphics` and the `\\html*` commands, whose\n      > output is not sanitized: keep it `false` (the default) for untrusted content.\n    '),Fp()(),Yc(116,`section`)(117,`h2`,22),Dn(118,`Mermaid plugin`),Fp(),Yc(119,`markdown`),Dn(120,"\n      #### Loading Mermaid\n      Provide the plugin with `withMermaid()`, and load Mermaid on demand with its `loader` option, as this demo does:\n      only the pages with a diagram download it, as a lazy chunk (list Mermaid's CommonJS dependencies in\n      `allowedCommonJsDependencies`).\n\n      ```typescript\n      // app.config.ts\n      provideMarkdown({\n        plugins: [withMermaid({ loader: () => import('mermaid').then((m) => m.default) })],\n      }),\n      ```\n\n      Alternatively, add `node_modules/mermaid/dist/mermaid.min.js` to the `scripts` of your `angular.json`: simpler,\n      but every page downloads it (about 5.5 MB).\n\n      #### Directive\n      `mermaid` - activate mermaid plugin\n\n      #### Attributes\n      `mermaidOptions` - mermaid [configuration\n      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)"),fl(121,`br`),Dn(122,`

      #### Outputs
      \`ready\` - emitted once every diagram is drawn`),fl(123,`br`),Dn(124,"\n      `error` - emits a `MermaidRenderError` listing each failed diagram (`failures`: `element`, `error`)"),fl(125,`br`),Dn(126,`

      ### Example
    `),Fp(),Yc(127,`markdown`),Dn(128," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Fp(),fl(129,`markdown`,4),Yc(130,`markdown`),Dn(131," The example below illustrate `mermaid` directive in action. "),Fp(),Yc(132,`div`,5)(133,`mat-form-field`,6)(134,`textarea`,7),yx(),Wb(`ngModelChange`,function(l){return zi(p),lR(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),qi(l)}),Fp()(),fl(135,`markdown`,23),Fp(),Yc(136,`markdown`),Dn(137,`
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
    `),Fp(),fl(138,`markdown`,4),Yc(139,`markdown`),Dn(140,`
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
    `),Fp(),Yc(141,`markdown`,3),Dn(142,` > :construction: The second diagram below is invalid **on purpose**, to show the error box. Its error is also logged in the console. `),Fp(),Yc(143,`markdown`,24),Wo(`mermaidExported`,function(l){return a.onMermaidExported(l)})(`mermaidExportError`,function(l){return a.onMermaidExportError(l)})(`error`,function(l){return a.onMermaidError(l)})(`ready`,function(){return a.mermaidStatus.set(`ready: every diagram rendered`)}),Fp(),Yc(144,`p`,25),Dn(145),Fp(),Yc(146,`p`,26),Dn(147),Fp(),Yc(148,`markdown`),Dn(149,"\n      ```typescript\n      onMermaidError(error: MarkdownError): void {\n        if (error instanceof MermaidRenderError) {\n          console.log(`${error.failures.length} diagram(s) failed`, error.failures);\n        }\n      }\n      ```\n\n      #### SVG export\n\n      With `withMermaidExport()` in the `plugins` and `[mermaidExport]=\"true\"`, every rendered diagram (not the error boxes) gets an `SVG` button that downloads\n      it as `diagram-<n>.svg`, as in the example above. The `(mermaidExported)` output reports each download and\n      `(mermaidExportError)` a failure. `mermaidExportButtonComponent`, `mermaidExportButtonTemplate` and\n      `mermaidExportFilenamePrefix` customize it; the buttons are recreated when the diagrams are re-rendered.\n\n      Each `mermaid.render()` call has 30 seconds to settle; change it with `withMermaid({ renderTimeout })` (in\n      milliseconds, `0` disables it), for instance for large ELK layouts.\n\n      #### Mermaid 12 appearance\n\n      Mermaid 12 defaults to the ELK layout and, for most diagrams, the `redux-color` theme and the `neo` look. To\n      restore the classic look, pin `{ layout: 'dagre', look: 'classic', theme: 'default' }` in the `config`\n      of `withMermaid()` (this demo pins `layout: 'dagre'` and keeps a `handDrawn` look).\n    "),Fp(),Yc(150,`markdown`,3),Dn(151,` > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. `),Fp()(),Yc(152,`section`)(153,`h2`,27),Dn(154,`Clipboard plugin`),Fp(),Yc(155,`markdown`),Dn(156,"\n      #### Clipboard file(s) to include\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Feature\n      `provideMarkdown({ plugins: [withClipboard(options?)] })`\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),fl(157,`br`),Dn(158,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),fl(159,`br`),Dn(160,"\n      `clipboardButtonTextCopy` - text to display on the copy button"),fl(161,`br`),Dn(162,"\n      `clipboardButtonTextCopied` - text to display on the copied button"),fl(163,`br`),Dn(164,"\n      `clipboardLanguageButton` - enable language copy button taken as a reference from the code block"),fl(165,`br`),Dn(166,"\n\n      #### Outputs\n      `copied` - emits `{ text, language?, element }` when the code block was copied"),fl(167,`br`),Dn(168,"\n      `copyError` - emits `{ error, language?, element }` when the copy failed"),fl(169,`br`),Dn(170,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),fl(171,`br`),Dn(172,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),fl(173,`br`),Dn(174,"\n      `markdown-clipboard-button` - default button"),fl(175,`br`),Dn(176,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),fl(177,`br`),Dn(178,`

      ### Example
    `),Fp(),Yc(179,`markdown`,28),Dn(180,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative
      is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),Fp(),Yc(181,`markdown`,29),Dn(182,`
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
    `),Fp(),Yc(183,`markdown`,30),Dn(184,`
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
    `),Fp(),Yc(185,`markdown`,31),Dn(186,"\n      #### Customize button text copy and button text copied\n\n      The default button text can be customized using the `clipboardButtonTextCopy` and `clipboardButtonTextCopied`\n      input properties on the `markdown` component, directive or pipe.\n\n      ```javascript\n      const example = 'the default clipboard button with custom text';\n      ```\n    "),Fp(),Yc(187,`markdown`,32),Dn(188,`
      \`\`\`cpp
      #include <iostream>

      int main() {
        std::cout << "Hello, World!";
        return 0;
      }
      \`\`\`
    `),Fp(),Yc(189,`markdown`,33),Wo(`copied`,function(l){return a.onCopied(l)})(`copyError`,function(l){return a.onCopyError(l)}),Dn(190,`
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
    `),Fp(),Yc(191,`p`,34),Dn(192),Fp(),Yc(193,`markdown`,35),Dn(194,`
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
    `),Fp(),Yc(195,`markdown`,35),ny(),Dn(196,`
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
    `),ty(),Fp(),xb(197,te,3,0,`ng-template`,null,0,CR),Yc(199,`markdown`,36),Dn(200,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button\n      implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n      <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Fp()(),Yc(201,`section`)(202,`h2`,37),Dn(203,`Lightbox`),Fp(),Yc(204,`markdown`),Dn(205,"\n      #### Feature\n      `provideMarkdown({ plugins: [withLightbox(options?)] })`\n\n      #### Directive\n      `lightbox` - open the content images in a built-in, dependency-free `<dialog>` viewer\n\n      #### Attributes\n      `lightboxOptions` - `{ wrap?, dialogLabel?, closeLabel?, previousLabel?, nextLabel? }`, merged over\n      the options of `withLightbox()`"),fl(206,`br`),Dn(207,"\n\n      #### Outputs\n      `imageClick` - emits `{ image, index, images, preventDefault() }` when an image is activated; calling\n      `preventDefault()` keeps the built-in viewer closed, so another viewer can open instead"),fl(208,`br`),Dn(209,`

      ### Example

      Click an image, or focus it with Tab and press Enter. Arrow keys browse, Esc or a click on the backdrop closes.
    `),Fp(),Yc(210,`label`,38)(211,`input`,39),Wo(`change`,function(){return a.customViewer.set(!a.customViewer())}),Fp(),Dn(212,` Handle the click myself (`),Yc(213,`code`),Dn(214,`preventDefault()`),Fp(),Dn(215,`) `),Fp(),Yc(216,`markdown`,40),Wo(`imageClick`,function(l){return a.onImageClick(l)}),Fp(),Yc(217,`p`,41),Dn(218),Fp(),Yc(219,`markdown`),Dn(220,`
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
    `),Fp()()()}if(m&2){let p=j0(198);Nb(`headings`,a.headings()),qt(10),Nb(`emoji`,!0),qt(4),Nb(`src`,`app/plugins/remote/emoji.html`),qt(5),Gb(`ngModel`,a.emojiMarkdown),Ex(),qt(),Nb(`data`,a.emojiMarkdown)(`emoji`,!0),qt(),Nb(`emoji`,!0),qt(9),Nb(`src`,`app/plugins/remote/line-numbers.html`),qt(3),Nb(`lineNumbers`,!0),qt(6),Nb(`start`,5)(`lineNumbers`,!0),qt(4),Nb(`start`,0)(`lineNumbers`,!0),qt(13),Nb(`src`,`app/plugins/remote/line-highlight.html`),qt(5),Nb(`lineOffset`,5)(`line`,`6, 10-19`)(`lineHighlight`,!0),qt(5),Nb(`emoji`,!0),qt(14),Nb(`host`,`localhost`)(`src`,`app/plugins/remote/root-user-without-output.bash`)(`user`,`root`)(`commandLine`,!0),qt(3),Nb(`host`,`remotehost`)(`output`,`2, 4-8`)(`src`,`app/plugins/remote/non-root-user-with-output.bash`)(`user`,`chris`)(`commandLine`,!0),qt(3),Nb(`output`,`2-19`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-output.powershell`)(`commandLine`,!0),qt(3),Nb(`filterOutput`,`(out)`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-filter-output.powershell`)(`commandLine`,!0),qt(10),Nb(`src`,`app/plugins/remote/katex.html`),qt(),Nb(`emoji`,!0),qt(4),Gb(`ngModel`,a.katexMarkdown),Ex(),qt(),Nb(`data`,a.katexMarkdown)(`katex`,!0),qt(3),Nb(`src`,`app/plugins/remote/katex-options.html`),qt(4),Nb(`data`,`Default: a$x^2$b`)(`katex`,!0),qt(),Nb(`data`,`nonStandard: a$x^2$b`)(`katex`,!0)(`katexOptions`,a.katexNonStandardOptions),qt(),Nb(`emoji`,!0),qt(15),Nb(`src`,`app/plugins/remote/mermaid.html`),qt(5),Gb(`ngModel`,a.mermaidMarkdown),Ex(),qt(),Nb(`data`,a.mermaidMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0),qt(3),Nb(`src`,`app/plugins/remote/mermaid-options.html`),qt(3),Nb(`emoji`,!0),qt(2),Nb(`data`,a.mermaidErrorMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0)(`mermaidExport`,!0),qt(2),ml(a.mermaidStatus()),qt(2),ml(a.lastExport()),qt(3),Nb(`emoji`,!0),qt(29),Nb(`clipboard`,!0),qt(2),Nb(`clipboard`,!0),qt(2),Nb(`clipboard`,!0),qt(2),Nb(`clipboard`,!0),qt(2),Nb(`clipboard`,!0),qt(2),Nb(`clipboard`,!0)(`clipboardLanguageButton`,!0)(`emoji`,!0),qt(3),ml(a.lastCopy()),qt(),Nb(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),qt(2),Nb(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),qt(4),Nb(`clipboardButtonTemplate`,p)(`clipboard`,!0),qt(12),Nb(`checked`,a.customViewer()),qt(5),Nb(`data`,a.lightboxMarkdown)(`lightbox`,!0),qt(2),ml(a.lastImageClick())}},dependencies:[_r,ln,vr,ji,MY,St,Ln,xa,ba,Xo,ot],styles:[`[_nghost-%COMP%]{display:block}.split[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;gap:16px}@media(min-width:960px){.split[_ngcontent-%COMP%]{flex-direction:row}.split[_ngcontent-%COMP%] > .split-item[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 calc(50% - 8px);min-width:calc(50% - 8px)}}.centered[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;place-content:center}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}.lightbox-gallery[_ngcontent-%COMP%]     img{width:200px;height:auto;border-radius:4px}.lightbox-custom-viewer[_ngcontent-%COMP%]{display:inline-flex;gap:8px;align-items:center}`]})}};export{M as default};