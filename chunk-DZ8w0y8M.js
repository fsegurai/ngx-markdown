import{t as r}from"./chunk-K_VmmcvY.js";import{Ct as Up,Dt as V7,E as Dl,F as HE,Ft as Yo,Mt as Y0,On as z,Rt as Zi,Tn as yM,U as K_,V as Jg,W as Ki,X as MT,cn as pb,d as AO,f as AT,fn as qe,g as BE,gn as tl,i as de,ln as pe,lt as RM,n as g,qt as eb,r as ce,rn as m,rt as On,tt as Ne,v as Bh,w as DE,xn as wt,xt as UE,y as Bp,yn as vl,z as Is,zt as _E}from"./main-DEIDU2DI.js";import{t as nt}from"./chunk-C3CyJQp8.js";import{c as sn,i as _a,l as vr,n as St,o as ba,r as Yo$1,s as gr,t as Ln,u as zi}from"./chunk-BGG8Ze5t.js";function ne(f,d){if(f&1){let m=Up();tl(0,`button`,42),Yo(`click`,function(){Zi(m);let p=Is();return Ki(p.onCopyToClipboard())}),pb(),tl(1,`svg`,43),vl(2,`path`,44),Bp()()}}var M=class f{constructor(){this.elementRef=m(pe);this.snackbar=m(ce);this.themeService=m(g);this.clipboardButton=de;this.emojiMarkdown=`# I :heart: @fsegurai/ngx-markdown`;this.katexMarkdown=`#### \`katex\` directive example

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
\`\`\``;this.katexNonStandardOptions={nonStandard:!0};this.mermaidErrorMarkdown="```mermaid\ngraph LR;\n  Valid-->Diagram;\n```\n\n```mermaid\nthis is not a diagram\n```";this.mermaidStatus=z(``);this.lastExport=z(``);this.mermaidOptions=wt(()=>r({fontFamily:`inherit`},this.themeService.mermaidOptions()));this.lightboxMarkdown=`![Sunrise, a warm gradient](lightbox-sunrise.svg)

![Forest, a green gradient](lightbox-forest.svg)

![](lightbox-ocean.svg "Ocean, captioned from its title")

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)`;this.customViewer=z(!1);this.lastImageClick=z(``);this.headings=z(void 0);this.lastCopy=z(``)}ngOnInit(){this.setHeadings()}onCopied({text:d,language:m}){this.lastCopy.set(`Copied ${d.length} characters of ${m??`plain text`}.`)}onCopyError({error:d}){this.lastCopy.set(d.message)}onMermaidError(d){this.mermaidStatus.set(d instanceof K_?`error: ${d.failures.length} diagram(s) failed (MermaidRenderError)`:`error: ${String(d)}`)}onMermaidExported({filename:d,svg:m}){this.lastExport.set(`Downloaded ${d} (${m.length} characters of SVG).`)}onMermaidExportError({error:d,filename:m}){this.lastExport.set(`${m}: ${d.message}`)}onImageClick(d){let m=d.image.alt||d.image.title||d.image.src;this.customViewer()&&d.preventDefault(),this.lastImageClick.set(`imageClick: ${m} (${d.index+1} of ${d.images.length})${d.defaultPrevented?`, viewer prevented`:``}.`)}onCopyToClipboard(){this.snackbar.open(`Copied to clipboard via ng-template!`,void 0,{duration:3e3,horizontalPosition:`right`,verticalPosition:`bottom`})}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(m){return new(m||f)}}static{this.ɵcmp=Ne({type:f,selectors:[[`app-plugins`]],features:[HE([Bh,{provide:AO,useValue:{}}])],decls:219,vars:80,consts:[[`buttonTemplate`,``],[3,`headings`],[`id`,`emoji`],[3,`emoji`],[3,`src`],[1,`split`],[`appearance`,`fill`,`color`,`accent`,1,`split-item`],[`cdkTextareaAutosize`,`true`,`matInput`,``,3,`ngModelChange`,`ngModel`],[1,`split-item`,3,`data`,`emoji`],[`id`,`line-numbers`],[3,`lineNumbers`],[3,`start`,`lineNumbers`],[`id`,`line-highlight`],[3,`lineOffset`,`line`,`lineHighlight`],[`id`,`command-line`],[3,`host`,`src`,`user`,`commandLine`],[3,`host`,`output`,`src`,`user`,`commandLine`],[3,`output`,`prompt`,`src`,`commandLine`],[3,`filterOutput`,`prompt`,`src`,`commandLine`],[`id`,`katex`],[1,`split-item`,3,`data`,`katex`],[1,`split-item`,3,`data`,`katex`,`katexOptions`],[`id`,`mermaid`],[1,`centered`,3,`data`,`mermaidOptions`,`mermaid`],[3,`mermaidExported`,`mermaidExportError`,`error`,`ready`,`data`,`mermaidOptions`,`mermaid`,`mermaidExport`],[`aria-live`,`polite`,1,`mermaid-status`],[`aria-live`,`polite`,1,`mermaid-last-export`],[`id`,`clipboard`],[3,`clipboard`],[1,`btn-clipboard-toolbar`,3,`clipboard`],[1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy me!`,`clipboardButtonTextCopied`,`Copied!`,1,`btn-clipboard-default`,3,`clipboard`],[`clipboardButtonTextCopy`,`Copy code!`,`clipboardButtonTextCopied`,`Code copied!`,1,`btn-clipboard-default`,3,`clipboard`],[1,`btn-clipboard-default`,3,`copied`,`copyError`,`clipboard`,`clipboardLanguageButton`,`emoji`],[`aria-live`,`polite`,1,`clipboard-last-copy`],[3,`clipboardButtonComponent`,`clipboard`],[3,`clipboardButtonTemplate`,`clipboard`],[`id`,`lightbox`],[1,`lightbox-custom-viewer`],[`type`,`checkbox`,3,`change`,`checked`],[1,`lightbox-gallery`,3,`imageClick`,`data`,`lightbox`],[`aria-live`,`polite`,1,`lightbox-last-click`],[`aria-label`,`Copy to clipboard`,`type`,`button`,1,`btn-clipboard`,3,`click`],[`aria-hidden`,`true`,`viewBox`,`0 0 24 24`,2,`width`,`16px`,`height`,`16px`],[`d`,`M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z`,`fill`,`#fff`]],template:function(m,a){if(m&1){let p=Up();tl(0,`app-scrollspy-nav-layout`,1)(1,`h1`),On(2,`Plugins`),Bp(),tl(3,`markdown`),On(4,` Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. `),Bp(),tl(5,`section`)(6,`h2`,2),On(7,`Emoji plugin`),Bp(),tl(8,`markdown`,3),On(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Bp(),tl(10,`markdown`),On(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Bp(),vl(12,`markdown`,4),tl(13,`markdown`),On(14," The example below illustrate `emoji` directive in action. "),Bp(),tl(15,`div`,5)(16,`mat-form-field`,6)(17,`textarea`,7),MT(),UE(`ngModelChange`,function(l){return Zi(p),yM(a.emojiMarkdown,l)||(a.emojiMarkdown=l),Ki(l)}),Bp()(),vl(18,`markdown`,8),Bp(),tl(19,`markdown`,3),On(20,` > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. `),Bp()(),tl(21,`section`)(22,`h2`,9),On(23,`Line Numbers plugin`),Bp(),tl(24,`markdown`),On(25,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js
      \`\`\`

      #### Directive
      \`lineNumbers\` - activate line numbers plugin

      #### Attributes
      \`start\` - offset number for the first display line

      ### Example
    `),Bp(),tl(26,`markdown`),On(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Bp(),vl(28,`markdown`,4),tl(29,`markdown`),On(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Bp(),tl(31,`markdown`,10),On(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Bp(),tl(33,`markdown`),On(34," Optionally you can use `start` to specify the offset number for the first display line. "),Bp(),tl(35,`markdown`),On(36," In the example below line offset is set to 5 using `start` input property. "),Bp(),tl(37,`markdown`,11),On(38,`
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
    `),Bp(),tl(39,`markdown`),On(40," `start` accepts `0`, to count lines from zero. A value that is not an integer is ignored, with a one-time `[ngx-markdown]` warning. "),Bp(),tl(41,`markdown`,11),On(42,"\n      ```javascript\n      const first = items[0];\n      const second = items[1];\n      ```\n    "),Bp()(),tl(43,`section`)(44,`h2`,12),On(45,`Line Highlight plugin`),Bp(),tl(46,`markdown`),On(47,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`
      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),vl(48,`br`),On(49,"\n      `lineOffset` - starting offset for line numbers"),vl(50,`br`),On(51,`

      ### Example
    `),Bp(),tl(52,`markdown`),On(53,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to\n      specify the starting line of code your snippet represents.\n    "),Bp(),vl(54,`markdown`,4),tl(55,`markdown`),On(56," `line` must be comma-separated line numbers or ranges (e.g. `'6, 10-19'`, or an array of them), and `lineOffset` an integer (`0` included). A malformed value is ignored, with a one-time `[ngx-markdown]` warning, instead of being written to the `data-line` attribute. "),Bp(),tl(57,`markdown`),On(58," In the example below `line` 6 and 10 to 19 are highlighted using a `lineOffset` of 5. "),Bp(),tl(59,`markdown`,13),On(60,`
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
    `),Bp()(),tl(61,`section`)(62,`h2`,14),On(63,`Command Line plugin`),Bp(),tl(64,`markdown`,3),On(65,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),vl(66,`br`),On(67,"\n      `output` - lines to be presented as output (optional)"),vl(68,`br`),On(69,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),vl(70,`br`),On(71,"\n      `prompt` - data prompt"),vl(72,`br`),On(73,"\n      `user` - user name"),vl(74,`br`),On(75,`

      ### Example
    `),Bp(),tl(76,`markdown`),On(77,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Bp(),vl(78,`markdown`,15),tl(79,`markdown`),On(80,`
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
    `),Bp(),vl(81,`markdown`,16),tl(82,`markdown`),On(83,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Bp(),vl(84,`markdown`,17),tl(85,`markdown`),On(86,`
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
    `),Bp(),vl(87,`markdown`,18),Bp(),tl(88,`section`)(89,`h2`,19),On(90,`KaTeX plugin`),Bp(),tl(91,`markdown`),On(92,"\n      #### KaTeX files to include\n      ```javascript\n      node_modules/katex/dist/katex.min.css\n      node_modules/katex/dist/katex.min.js\n      ```\n\n      #### Directive\n      `katex` - render `$…$` (inline) and `$$…$$` (display) math with KaTeX while the Markdown is parsed\n\n      #### Attributes\n      `katexOptions` - [KaTeX options](https://katex.org/docs/options.html), plus `nonStandard`, merged over the\n      `katexOptions` of `provideMarkdown()`"),vl(93,`br`),On(94,"\n\n      #### Supported syntax\n      - `$…$` - inline math: the opening `$` starts the text or follows a space, an opening bracket or a quote, and the\n        closing `$` is followed by a space, punctuation, a closing bracket or the end, so `$5 and $10` stays text\n      - `$$…$$` - display math, inline or on lines of its own\n      - `\\$` - a literal dollar; math in code spans and code blocks is left untouched\n\n      > Upgrading from 21.x: the Auto-Render extension is no longer used. Remove its script from your `angular.json`;\n      > `\\(…\\)`, `\\[…\\]` and its `delimiters` option are not supported, and math inside raw HTML blocks is not\n      > rendered.\n\n      ### Example\n    "),Bp(),tl(95,`markdown`),On(96," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),Bp(),vl(97,`markdown`,4),tl(98,`markdown`,3),On(99,"\n      The example below illustrate `katex` directive in action.\n\n      > :bulb: Math is rendered while the Markdown is parsed, so `_`, `*` and `\\` inside `$…$` are never turned into emphasis or escapes. Write `\\$` for a literal dollar; math in code spans and code blocks is left untouched.\n    "),Bp(),tl(100,`div`,5)(101,`mat-form-field`,6)(102,`textarea`,7),MT(),UE(`ngModelChange`,function(l){return Zi(p),yM(a.katexMarkdown,l)||(a.katexMarkdown=l),Ki(l)}),Bp()(),vl(103,`markdown`,20),Bp(),tl(104,`markdown`),On(105,`
      Optionally, you can specify [KaTeX options](https://katex.org/docs/options.html) using the \`katexOptions\`
      property, or for the whole application with \`provideMarkdown({ katexOptions })\`.

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
    `),Bp(),vl(106,`markdown`,4),tl(107,`markdown`),On(108,"\n      #### Global options\n\n      `provideMarkdown({ katexOptions })` sets the options of the whole application (the `KATEX_OPTIONS`\n      token); the `katexOptions` input of a component is merged over them.\n\n      ```typescript\n      // app.config.ts\n      providers: [\n        provideMarkdown({\n          katexOptions: { throwOnError: false, macros: { '\\\\RR': '\\\\mathbb{R}' } },\n        }),\n      ],\n      ```\n\n      #### Math glued to text: `nonStandard`\n\n      By default `a$x^2$b` stays text, so prices and shell variables are not turned into math. `nonStandard: true`\n      renders every `$…$`, wherever it is.\n    "),Bp(),tl(109,`div`,5),vl(110,`markdown`,20)(111,`markdown`,21),Bp(),tl(112,`markdown`,3),On(113,'\n      #### Server-side rendering and sanitization\n\n      Math is also rendered on the server when the global `katex` is available there; otherwise the server leaves the\n      source text. The KaTeX output is inserted after the HTML sanitizer, through `<span class="ngx-katex-…">`\n      placeholders that a custom `sanitize` function must keep.\n\n      > :warning: The `trust` option enables `\\href`, `\\url`, `\\includegraphics` and the `\\html*` commands, whose\n      > output is not sanitized: keep it `false` (the default) for untrusted content.\n    '),Bp()(),tl(114,`section`)(115,`h2`,22),On(116,`Mermaid plugin`),Bp(),tl(117,`markdown`),On(118,`
      #### Loading Mermaid
      Load Mermaid on demand with the \`mermaidLoader\` option, as this demo does: only the pages with a diagram
      download it, as a lazy chunk (list Mermaid's CommonJS dependencies in \`allowedCommonJsDependencies\`).

      \`\`\`typescript
      // app.config.ts
      provideMarkdown({
        mermaidLoader: () => import('mermaid').then((m) => m.default),
      }),
      \`\`\`

      Alternatively, add \`node_modules/mermaid/dist/mermaid.min.js\` to the \`scripts\` of your \`angular.json\`: simpler,
      but every page downloads it (about 5.5 MB).

      #### Directive
      \`mermaid\` - activate mermaid plugin

      #### Attributes
      \`mermaidOptions\` - mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)`),vl(119,`br`),On(120,`

      #### Outputs
      \`ready\` - emitted once every diagram is drawn`),vl(121,`br`),On(122,"\n      `error` - emits a `MermaidRenderError` listing each failed diagram (`failures`: `element`, `error`)"),vl(123,`br`),On(124,`

      ### Example
    `),Bp(),tl(125,`markdown`),On(126," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Bp(),vl(127,`markdown`,4),tl(128,`markdown`),On(129," The example below illustrate `mermaid` directive in action. "),Bp(),tl(130,`div`,5)(131,`mat-form-field`,6)(132,`textarea`,7),MT(),UE(`ngModelChange`,function(l){return Zi(p),yM(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),Ki(l)}),Bp()(),vl(133,`markdown`,23),Bp(),tl(134,`markdown`),On(135,`
      #### Global configuration

      You can provide a global configuration for mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) to use across your
      application with the \`mermaidOptions\` of the \`MarkdownConfig\` passed to \`provideMarkdown\` in your application
      providers. Components then import the standalone \`MarkdownComponent\`.

      \`\`\`typescript
      // app.config.ts
      providers: [
        provideMarkdown({
          mermaidOptions: {
            provide: MERMAID_OPTIONS,
            useValue: {
              darkMode: true,
              look: 'handDrawn',
              ...
            },
          },
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
    `),Bp(),vl(136,`markdown`,4),tl(137,`markdown`),On(138,`
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
    `),Bp(),tl(139,`markdown`,3),On(140,` > :construction: The second diagram below is invalid **on purpose**, to show the error box. Its error is also logged in the console. `),Bp(),tl(141,`markdown`,24),Yo(`mermaidExported`,function(l){return a.onMermaidExported(l)})(`mermaidExportError`,function(l){return a.onMermaidExportError(l)})(`error`,function(l){return a.onMermaidError(l)})(`ready`,function(){return a.mermaidStatus.set(`ready: every diagram rendered`)}),Bp(),tl(142,`p`,25),On(143),Bp(),tl(144,`p`,26),On(145),Bp(),tl(146,`markdown`),On(147,"\n      ```typescript\n      onMermaidError(error: MarkdownError): void {\n        if (error instanceof MermaidRenderError) {\n          console.log(`${error.failures.length} diagram(s) failed`, error.failures);\n        }\n      }\n      ```\n\n      #### SVG export\n\n      With `[mermaidExport]=\"true\"`, every rendered diagram (not the error boxes) gets an `SVG` button that downloads\n      it as `diagram-<n>.svg`, as in the example above. The `(mermaidExported)` output reports each download and\n      `(mermaidExportError)` a failure. `mermaidExportButtonComponent`, `mermaidExportButtonTemplate` and\n      `mermaidExportFilenamePrefix` customize it; the buttons are recreated when the diagrams are re-rendered.\n\n      Each `mermaid.render()` call has 30 seconds to settle; change it with `provideMarkdown({ mermaidRenderTimeout\n      })` (in milliseconds, `0` disables it), for instance for large ELK layouts.\n\n      #### Mermaid 12 appearance\n\n      Mermaid 12 defaults to the ELK layout and, for most diagrams, the `redux-color` theme and the `neo` look. To\n      restore the classic look, pin `{ layout: 'dagre', look: 'classic', theme: 'default' }` in\n      `MERMAID_OPTIONS` (this demo pins `layout: 'dagre'` and keeps a `handDrawn` look).\n    "),Bp(),tl(148,`markdown`,3),On(149,` > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. `),Bp()(),tl(150,`section`)(151,`h2`,27),On(152,`Clipboard plugin`),Bp(),tl(153,`markdown`),On(154,"\n      #### Clipboard file(s) to include\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),vl(155,`br`),On(156,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),vl(157,`br`),On(158,"\n      `clipboardButtonTextCopy` - text to display on the copy button"),vl(159,`br`),On(160,"\n      `clipboardButtonTextCopied` - text to display on the copied button"),vl(161,`br`),On(162,"\n      `clipboardLanguageButton` - enable language copy button taken as a reference from the code block"),vl(163,`br`),On(164,"\n\n      #### Outputs\n      `copied` - emits `{ text, language?, element }` when the code block was copied"),vl(165,`br`),On(166,"\n      `copyError` - emits `{ error, language?, element }` when the copy failed"),vl(167,`br`),On(168,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),vl(169,`br`),On(170,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),vl(171,`br`),On(172,"\n      `markdown-clipboard-button` - default button"),vl(173,`br`),On(174,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),vl(175,`br`),On(176,`

      ### Example
    `),Bp(),tl(177,`markdown`,28),On(178,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative
      is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),Bp(),tl(179,`markdown`,29),On(180,`
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
    `),Bp(),tl(181,`markdown`,30),On(182,`
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
    `),Bp(),tl(183,`markdown`,31),On(184,"\n      #### Customize button text copy and button text copied\n\n      The default button text can be customized using the `clipboardButtonTextCopy` and `clipboardButtonTextCopied`\n      input properties on the `markdown` component, directive or pipe.\n\n      ```javascript\n      const example = 'the default clipboard button with custom text';\n      ```\n    "),Bp(),tl(185,`markdown`,32),On(186,`
      \`\`\`cpp
      #include <iostream>

      int main() {
        std::cout << "Hello, World!";
        return 0;
      }
      \`\`\`
    `),Bp(),tl(187,`markdown`,33),Yo(`copied`,function(l){return a.onCopied(l)})(`copyError`,function(l){return a.onCopyError(l)}),On(188,`
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
    `),Bp(),tl(189,`p`,34),On(190),Bp(),tl(191,`markdown`,35),On(192,`
      #### Using global configuration

      You can provide a custom component to use globally across your application with the \`clipboardOptions\` in the
      \`MarkdownConfig\` passed to \`provideMarkdown\` in your application providers. Components then import the
      standalone \`MarkdownComponent\`.

      \`\`\`typescript
      // app.config.ts
      providers: [
        provideMarkdown({
          clipboardOptions: {
            provide: CLIPBOARD_OPTIONS,
            useValue: {
              buttonComponent: ClipboardButtonComponent,
            },
          },
        }),
      ],

      // your component
      imports: [MarkdownComponent],
      \`\`\`

      A button set on an instance (\`clipboardButtonComponent\` or \`clipboardButtonTemplate\`) replaces the global button
      for that instance. This page provides an empty \`CLIPBOARD_OPTIONS\` (with its own \`MarkdownService\`) in the
      component \`providers\`, so its other examples show the default button.
    `),Bp(),tl(193,`markdown`,35),eb(),On(194,`
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
    `),Jg(),Bp(),DE(195,ne,3,0,`ng-template`,null,0,RM),tl(197,`markdown`,36),On(198,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button\n      implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n      <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Bp()(),tl(199,`section`)(200,`h2`,37),On(201,`Lightbox`),Bp(),tl(202,`markdown`),On(203,"\n      #### Directive\n      `lightbox` - open the content images in a built-in, dependency-free `<dialog>` viewer\n\n      #### Attributes\n      `lightboxOptions` - `{ wrap?, dialogLabel?, closeLabel?, previousLabel?, nextLabel? }`, merged over\n      `provideMarkdown({ lightboxOptions })`"),vl(204,`br`),On(205,"\n\n      #### Outputs\n      `imageClick` - emits `{ image, index, images, preventDefault() }` when an image is activated; calling\n      `preventDefault()` keeps the built-in viewer closed, so another viewer can open instead"),vl(206,`br`),On(207,`

      ### Example

      Click an image, or focus it with Tab and press Enter. Arrow keys browse, Esc or a click on the backdrop closes.
    `),Bp(),tl(208,`label`,38)(209,`input`,39),Yo(`change`,function(){return a.customViewer.set(!a.customViewer())}),Bp(),On(210,` Handle the click myself (`),tl(211,`code`),On(212,`preventDefault()`),Bp(),On(213,`) `),Bp(),tl(214,`markdown`,40),Yo(`imageClick`,function(l){return a.onImageClick(l)}),Bp(),tl(215,`p`,41),On(216),Bp(),tl(217,`markdown`),On(218,`
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
    `),Bp()()()}if(m&2){let p=Y0(196);_E(`headings`,a.headings()),qe(8),_E(`emoji`,!0),qe(4),_E(`src`,`app/plugins/remote/emoji.html`),qe(5),BE(`ngModel`,a.emojiMarkdown),AT(),qe(),_E(`data`,a.emojiMarkdown)(`emoji`,!0),qe(),_E(`emoji`,!0),qe(9),_E(`src`,`app/plugins/remote/line-numbers.html`),qe(3),_E(`lineNumbers`,!0),qe(6),_E(`start`,5)(`lineNumbers`,!0),qe(4),_E(`start`,0)(`lineNumbers`,!0),qe(13),_E(`src`,`app/plugins/remote/line-highlight.html`),qe(5),_E(`lineOffset`,5)(`line`,`6, 10-19`)(`lineHighlight`,!0),qe(5),_E(`emoji`,!0),qe(14),_E(`host`,`localhost`)(`src`,`app/plugins/remote/root-user-without-output.bash`)(`user`,`root`)(`commandLine`,!0),qe(3),_E(`host`,`remotehost`)(`output`,`2, 4-8`)(`src`,`app/plugins/remote/non-root-user-with-output.bash`)(`user`,`chris`)(`commandLine`,!0),qe(3),_E(`output`,`2-19`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-output.powershell`)(`commandLine`,!0),qe(3),_E(`filterOutput`,`(out)`)(`prompt`,`PS C:UsersChris>`)(`src`,`app/plugins/remote/windows-powershell-with-filter-output.powershell`)(`commandLine`,!0),qe(10),_E(`src`,`app/plugins/remote/katex.html`),qe(),_E(`emoji`,!0),qe(4),BE(`ngModel`,a.katexMarkdown),AT(),qe(),_E(`data`,a.katexMarkdown)(`katex`,!0),qe(3),_E(`src`,`app/plugins/remote/katex-options.html`),qe(4),_E(`data`,`Default: a$x^2$b`)(`katex`,!0),qe(),_E(`data`,`nonStandard: a$x^2$b`)(`katex`,!0)(`katexOptions`,a.katexNonStandardOptions),qe(),_E(`emoji`,!0),qe(15),_E(`src`,`app/plugins/remote/mermaid.html`),qe(5),BE(`ngModel`,a.mermaidMarkdown),AT(),qe(),_E(`data`,a.mermaidMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0),qe(3),_E(`src`,`app/plugins/remote/mermaid-options.html`),qe(3),_E(`emoji`,!0),qe(2),_E(`data`,a.mermaidErrorMarkdown)(`mermaidOptions`,a.mermaidOptions())(`mermaid`,!0)(`mermaidExport`,!0),qe(2),Dl(a.mermaidStatus()),qe(2),Dl(a.lastExport()),qe(3),_E(`emoji`,!0),qe(29),_E(`clipboard`,!0),qe(2),_E(`clipboard`,!0),qe(2),_E(`clipboard`,!0),qe(2),_E(`clipboard`,!0),qe(2),_E(`clipboard`,!0),qe(2),_E(`clipboard`,!0)(`clipboardLanguageButton`,!0)(`emoji`,!0),qe(3),Dl(a.lastCopy()),qe(),_E(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),qe(2),_E(`clipboardButtonComponent`,a.clipboardButton)(`clipboard`,!0),qe(4),_E(`clipboardButtonTemplate`,p)(`clipboard`,!0),qe(12),_E(`checked`,a.customViewer()),qe(5),_E(`data`,a.lightboxMarkdown)(`lightbox`,!0),qe(2),Dl(a.lastImageClick())}},dependencies:[vr,sn,gr,zi,V7,St,Ln,ba,_a,Yo$1,nt],styles:[`[_nghost-%COMP%]{display:block}.split[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;gap:16px}@media(min-width:960px){.split[_ngcontent-%COMP%]{flex-direction:row}.split[_ngcontent-%COMP%] > .split-item[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 calc(50% - 8px);min-width:calc(50% - 8px)}}.centered[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;flex-direction:row;place-content:center}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}.lightbox-gallery[_ngcontent-%COMP%]     img{width:200px;height:auto;border-radius:4px}.lightbox-custom-viewer[_ngcontent-%COMP%]{display:inline-flex;gap:8px;align-items:center}`]})}};export{M as default};