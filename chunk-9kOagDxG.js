import"./chunk-K_VmmcvY.js";import{Dt as V7,E as Dl,Et as V0,Ft as Yo,On as z,S as Cn,Tn as yM,U as K_,X as MT,_n as ue,a as $0,b as Bt,f as AT,fn as qe,g as BE,gn as tl,n as g,pt as Ss,rn as m,rt as On,tt as Ne,un as pt,ut as SM,wt as Ut,xn as wt,xt as UE,y as Bp,z as Is,zt as _E}from"./main-DEIDU2DI.js";import{t as nt}from"./chunk-C3CyJQp8.js";import{a as _t,c as sn,i as _a,l as vr,n as St,o as ba,s as gr,t as Ln,u as zi}from"./chunk-BGG8Ze5t.js";var G=`---
title: ngx-markdown playground
author: fsegurai
tags: [angular, markdown, signals]
---

## Welcome

Edit the Markdown on the left: the output re-renders as you type. The front-matter block above is stripped
(\`frontMatter\`) and shown in the **Front-matter** panel through \`(metadata)\`, every heading gets a slug \`id\`
(\`headingIds\`) and the \`h2\` headings build the side navigation through \`(headings)\`.

The **Events** panel logs the \`(copied)\`, \`(mermaidExported)\`, \`(imageClick)\` and \`(error)\` outputs.

## Images Section

Click an image to open it in the built-in viewer (\`lightbox\`), then use the arrow keys to browse them.

![Sunrise, a warm gradient](lightbox-sunrise.svg)

Like links, images also have a footnote style syntax

![Forest, a green gradient][forest]

With a reference later in the document defining the URL location:

[forest]: lightbox-forest.svg "Forest, from a reference"

![](lightbox-ocean.svg "Ocean, captioned from its title")

A linked image follows its link and is not opened in the viewer:

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)

## Headings Section

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules Section

---

***

## Emphasis Section

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

__Advertisement :smile:

## Blockquotes Section

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Unordered Lists Section

- Create a list by starting a line with \`+\`, \`-\`, or \`*\`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!
- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly i18n with plurals support and easy syntax.

## Ordered Lists Section

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

<!-- -->

1. You can use sequential numbers...

<!-- -->

1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo

<!-- -->

1. bar

## Task Lists Section

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

## Code Section

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code

Block code "fences"

\`\`\`
Sample
text
here
...
\`\`\`

Syntax highlighting, with a copy button (\`clipboard\`) that reports \`(copied)\`

\`\`\`typescript
const foo = (bar: number): number => bar + 1;

console.log(foo(5));
\`\`\`

## Tables Section

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

## Links Section

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

[smart](https://google.com)

[Internal reference - Code Section](/routerLink:playground#code-section)

## Plugins Section

For more details regarding **Marked** extension, visit the [official documentation](https://marked.js.org/using_advanced#extensions)

### [Emojis](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :cry: :laughing: :yum:

### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19<sup>th</sup>
- H<sub>2</sub>O

### [\`<ins>\`](https://github.com/markdown-it/markdown-it-ins)

<ins>Inserted Text</ins>

### [\`<mark>\`](https://github.com/markdown-it/markdown-it-mark)

<p align="center">
  <mark>Marked Text</mark>
</p>

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is <abbr title="Title test">HTML</abbr> abbreviation example.

It converts <abbr>HTML</abbr>, but keep intact partial entries like "xxxHTMLyyy" and so on.

[HTML]: Hyper Text Markup Language

### [Math](https://katex.org)

Rendered while parsing (\`katex\`), so \`_\`, \`*\` and \`\\\` inside \`$\u2026$\` stay math: $a_1 * b_2 = c_{1,2}$,
$x_{i} * y_{j}$ and $\\{ n \\in \\NN \\}$, while \\$5 stays a price.

$$
\\sum_{i=1}^n x_i^2 = \\frac{n(n+1)(2n+1)}{6}
$$

$$
\\sqrt{3x-1}+(1+x)^2
$$

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

### [Mermaid](https://mermaid.js.org/intro/getting-started.html)

Each diagram gets an export button (\`mermaidExport\`) that downloads its SVG and reports \`(mermaidExported)\`.

\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`

\`\`\`mermaid
sequenceDiagram
  Alice->>John: Hello John, how are you?
  John-->>Alice: Great!
\`\`\`

`;function Z(r,n){let t;return(...e)=>{clearTimeout(t),t=setTimeout(()=>r(...e),n)}}var J=()=>({internalBrowserHandler:!0,externalBrowserHandler:!0});var Q=(r,n)=>n.id;var U=(r,n)=>n.key;function K(r,n){if(r&1&&(tl(0,`dt`),On(1),Bp(),tl(2,`dd`),On(3),Bp()),r&2){let t=n.$implicit;qe(),Dl(t.key),qe(2),Dl(t.value)}}function Y(r,n){if(r&1&&(tl(0,`div`,6)(1,`p`,7),On(2,`Front-matter `),tl(3,`code`),On(4,`(metadata)`),Bp()(),tl(5,`dl`,12),$0(6,K,4,2,null,null,U),Bp()()),r&2){let t=Is();qe(6),V0(t.metadataEntries())}}function X(r,n){if(r&1&&(tl(0,`li`)(1,`code`),On(2),Bp(),tl(3,`span`),On(4),Bp()()),r&2){let t=n.$implicit;pt(`failed`,t.failed),qe(2),Ss(`(`,t.name,`)`),qe(2),Dl(t.detail)}}function nn(r,n){r&1&&(tl(0,`li`,10),On(1,`Copy a code block, export a diagram or click an image.`),Bp())}var tn=5;var M=class r{constructor(){this._destroyRef=m(ue);this.themeService=m(g);this.markdownContent=z(G);this.debounceRendering=Z(()=>this.updateMarkdownRendering(),300);this.headings=z(void 0);this.markdownRendering=z(void 0);this.metadata=z(void 0);this.metadataEntries=wt(()=>Object.entries(this.metadata()?.data??{}).map(([n,t])=>({key:n,value:Array.isArray(t)?t.join(`, `):String(t)})));this.events=z([]);this.eventId=0;this.katexOptions={throwOnError:!1,errorColor:`#cc0000`,macros:{"\\RR":`\\mathbb{R}`,"\\NN":`\\mathbb{N}`,"\\ZZ":`\\mathbb{Z}`,"\\QQ":`\\mathbb{Q}`,"\\f":`#1f(#2)`,"\\g":`#1g(#2)`,"\\h":`#1h(#2)`}};this.mermaidOptions=this.themeService.mermaidOptions;Cn(()=>{this.markdownContent(),this.debounceRendering()}),this._destroyRef.onDestroy(()=>{this.headings.set(void 0),this.markdownRendering.set(void 0)})}onHeadings(n){this.headings.set(n.filter(t=>t.level===2&&t.id&&t.element).map(t=>t.element))}onMetadata(n){this.metadata.set(n)}onCopied({text:n,language:t}){this.log(`copied`,`${n.length} characters of ${t??`plain text`}`)}onCopyError({error:n}){this.log(`copyError`,n.message,!0)}onMermaidExported({filename:n,svg:t}){this.log(`mermaidExported`,`${n} (${t.length} characters of SVG)`)}onMermaidExportError({error:n,filename:t}){this.log(`mermaidExportError`,`${t}: ${n.message}`,!0)}onImageClick({image:n,index:t,images:e}){this.log(`imageClick`,`${n.alt||n.title||n.src} (${t+1} of ${e.length})`)}onError(n){let t=n instanceof K_?`${n.failures.length} Mermaid diagram(s) failed`:typeof n==`string`?n:n.message;this.log(`error`,t,!0)}log(n,t,e=!1){let l={id:++this.eventId,name:n,detail:t,failed:e};this.events.update(o=>[l,...o].slice(0,tn))}updateMarkdownRendering(){this.markdownRendering.set(this.markdownContent())}static{this.ɵfac=function(t){return new(t||r)}}static{this.ɵcmp=Ne({type:r,selectors:[[`app-playground`]],decls:20,vars:21,consts:[[3,`headings`],[1,`playground`],[1,`editor-column`],[`subscriptSizing`,`dynamic`,1,`editor`],[`matInput`,``,3,`ngModelChange`,`ngModel`],[`aria-label`,`Render details`,1,`inspector`],[1,`inspector-panel`],[1,`inspector-title`],[`aria-live`,`polite`,1,`events`],[3,`failed`],[1,`events-empty`],[1,`markdown`,3,`headings`,`metadata`,`copied`,`copyError`,`mermaidExported`,`mermaidExportError`,`imageClick`,`error`,`disableSanitizer`,`frontMatter`,`headingIds`,`lineNumbers`,`start`,`emoji`,`katex`,`katexOptions`,`mermaid`,`mermaidOptions`,`mermaidExport`,`lightbox`,`clipboard`,`clipboardLanguageButton`,`data`,`routerLinkOptions`],[1,`metadata`]],template:function(t,e){t&1&&(tl(0,`app-scrollspy-nav-layout`,0)(1,`h1`),On(2,`Playground`),Bp(),tl(3,`section`)(4,`div`,1)(5,`div`,2)(6,`mat-form-field`,3)(7,`mat-label`),On(8,`Markdown Editor`),Bp(),tl(9,`textarea`,4),MT(),UE(`ngModelChange`,function(o){return yM(e.markdownContent,o)||(e.markdownContent=o),o}),Bp()(),tl(10,`aside`,5),Bt(11,Y,8,0,`div`,6),tl(12,`div`,6)(13,`p`,7),On(14,`Events`),Bp(),tl(15,`ol`,8),$0(16,X,5,4,`li`,9,Q,!1,nn,2,0,`li`,10),Bp()()()(),tl(19,`markdown`,11),Yo(`headings`,function(o){return e.onHeadings(o)})(`metadata`,function(o){return e.onMetadata(o)})(`copied`,function(o){return e.onCopied(o)})(`copyError`,function(o){return e.onCopyError(o)})(`mermaidExported`,function(o){return e.onMermaidExported(o)})(`mermaidExportError`,function(o){return e.onMermaidExportError(o)})(`imageClick`,function(o){return e.onImageClick(o)})(`error`,function(o){return e.onError(o)}),Bp()()()()),t&2&&(_E(`headings`,e.headings()),qe(9),BE(`ngModel`,e.markdownContent),AT(),qe(2),Ut(e.metadataEntries().length?11:-1),qe(5),V0(e.events()),qe(3),_E(`disableSanitizer`,!0)(`frontMatter`,!0)(`headingIds`,!0)(`lineNumbers`,!0)(`start`,1)(`emoji`,!0)(`katex`,!0)(`katexOptions`,e.katexOptions)(`mermaid`,!0)(`mermaidOptions`,e.mermaidOptions())(`mermaidExport`,!0)(`lightbox`,!0)(`clipboard`,!0)(`clipboardLanguageButton`,!0)(`data`,e.markdownRendering())(`routerLinkOptions`,SM(20,J)))},dependencies:[vr,sn,gr,zi,V7,St,Ln,_t,ba,_a,nt],styles:[`@charset "UTF-8";  .outlet-wrapper{max-width:calc(100% - 20rem)!important}.playground[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap}@media(max-width:768px){.playground[_ngcontent-%COMP%]{flex-direction:column}}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor-column[_ngcontent-%COMP%]{flex:1 1 45%;margin:2%;box-sizing:border-box;height:100%;min-width:0}@media(max-width:768px){.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor-column[_ngcontent-%COMP%]{flex:1 1 100%}}.playground[_ngcontent-%COMP%]   .editor-column[_ngcontent-%COMP%]{position:sticky;top:80px;display:flex;flex-direction:column;gap:.75rem}@media(max-width:768px){.playground[_ngcontent-%COMP%]   .editor-column[_ngcontent-%COMP%]{position:static}}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{width:100%}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:calc(100vh - 28rem);min-height:12rem;overflow:auto;field-sizing:content}@media(max-width:768px){.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:50vh}}.playground[_ngcontent-%COMP%]   .inspector[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.5rem;font-size:.8125rem;line-height:1.4}.playground[_ngcontent-%COMP%]   .inspector-panel[_ngcontent-%COMP%]{padding:.5rem .75rem;border:1px solid color-mix(in srgb,currentColor 15%,transparent);border-radius:4px;background-color:color-mix(in srgb,currentColor 4%,transparent)}.playground[_ngcontent-%COMP%]   .inspector-title[_ngcontent-%COMP%]{margin:0 0 .25rem;font-size:.75rem;font-weight:500;letter-spacing:.05em;text-transform:uppercase;opacity:.7}.playground[_ngcontent-%COMP%]   .inspector-title[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{text-transform:none}.playground[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:.125rem .75rem;margin:0}.playground[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{font-weight:500}.playground[_ngcontent-%COMP%]   .metadata[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]{margin:0;overflow-wrap:anywhere;white-space:pre-line}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]{max-height:7.5rem;margin:0;padding:0;overflow:auto;list-style:none}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{overflow-wrap:anywhere}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] + li[_ngcontent-%COMP%]{margin-top:.125rem}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   li.failed[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error, #e5534b)}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{margin-right:.375rem;color:#2196f3}.playground[_ngcontent-%COMP%]   .events[_ngcontent-%COMP%]   .events-empty[_ngcontent-%COMP%]{opacity:.6}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto;padding:.5rem 1.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert{padding:0 1em;margin-bottom:16px;color:inherit;border-left:.25em solid #444c56}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-title{display:inline-flex;align-items:center;font-weight:500}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note{border-left-color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title{color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title svg{fill:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip{border-left-color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title{color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title svg{fill:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important{border-left-color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title{color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title svg{fill:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning{border-left-color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title{color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title svg{fill:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution{border-left-color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title{color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title svg{fill:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mr-2{margin-right:.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{border-radius:2em;font-size:.875em;font-weight:inherit;text-decoration:none;padding:.25em .65em;line-height:1}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag{background-color:#8a5cf51a;border:0 solid hsla(258,88%,66%,.15);color:#a68af9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{background-color:#5cdef51a;border:0 solid hsla(223,88%,66%,.15);color:#8ab0f9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Roboto,Raleway,Open Sans,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;letter-spacing:1px;transition:all .25s ease-out}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00aeff1a;color:#0090ff}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *{box-sizing:border-box}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:first-child{margin-top:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:last-child{margin-bottom:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a{color:#2196f3;background-color:transparent;-webkit-text-decoration-skip:objects}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:hover{outline-width:0;text-decoration:underline}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:not([href]){color:inherit;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor{color:inherit;text-decoration:none;cursor:inherit}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:hover{outline-width:0;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     strong{font-weight:bolder}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     svg{overflow:hidden}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     mark{padding:.2rem .4rem;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     img{max-width:85%;box-sizing:content-box;background-color:transparent;object-fit:cover;border-radius:4px;border-style:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     iframe{width:100%;max-width:85%;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr{cursor:help;text-decoration:none;border-bottom:1px dotted;text-transform:lowercase;font-weight:600;font-variant:small-caps}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr[title]:hover{cursor:help}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr{box-sizing:content-box;height:.25em;margin:.75rem 0;padding:0;overflow:hidden;background-color:#e7e7e7;border:0;border-bottom:1px solid #ddd;opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:before{display:table;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:after{display:table;clear:both;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input{font:inherit;margin:0;overflow:visible;line-height:inherit;-webkit-font-feature-settings:"liga" 0;font-feature-settings:"liga" 0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input[type=checkbox]{box-sizing:border-box;padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input:checked{position:relative;z-index:1;border-color:#4078c0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{padding-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25;text-rendering:optimizeLegibility}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1{margin:.67em 0;font-weight:600;padding-bottom:.3em;font-size:1.802rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2{font-weight:600;padding-bottom:.3em;font-size:1.602rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3{font-weight:600;font-size:1.424rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4{font-weight:600;font-size:1.266rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5{font-weight:600;font-size:1.125rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{font-weight:600;font-size:1rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p{margin-top:0;margin-bottom:10px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol{padding-left:2em;margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol{list-style-type:lower-roman}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol ol{list-style-type:lower-alpha}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ul ol{list-style-type:lower-greek}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul{margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li>p{margin-top:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li+li{margin-top:.25em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl{padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dt{padding:0;margin-top:16px;font-size:1em;font-style:italic;font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dd{padding:0 16px;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dd{margin-left:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin-top:0;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote{margin:0 0 1rem;padding:0 1em;color:#d3d3d3;border-left:.25em solid #2196f3}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:first-child{margin-top:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:last-child{margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption{display:block;margin-top:-1.5rem;margin-bottom:1.5rem;font-size:75%;text-align:right}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption:before{content:"\\2014  ";opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table{display:block;width:100%;overflow:auto;border-spacing:0;border-collapse:collapse}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table td{white-space:normal;word-wrap:break-word;padding:6px 13px;border:1px solid #ddd}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th{font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{font-family:monospace,monospace;font-size:1em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd{display:inline-block;padding:3px 5px;font:11px Consolas,Liberation Mono,Menlo,Courier,monospace;line-height:10px;color:#555;vertical-align:middle;background-color:#fcfcfc;border:solid 1px #ccc;border-bottom-color:#bbb;border-radius:3px;box-shadow:inset 0 -1px #bbb}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code{font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;padding:.2em 0;margin:0;font-size:85%;background-color:#2196f34f;border-radius:6px;font-style:italic}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:after{letter-spacing:-.2em;content:"\\a0"}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin:0 0 1rem;font:12px Consolas,Liberation Mono,Menlo,Courier,monospace;word-wrap:normal;overflow:auto;font-size:85%;line-height:1.45;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre>code{padding:0;margin:0;font-size:100%;word-break:normal;white-space:pre;background:transparent;border:0;font-style:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code{display:inline;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:transparent;border:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:after{content:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .external-link{display:flex}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .katex{font-size:2vw}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .footnotes{opacity:.8;margin-top:1rem;padding:1rem;border-top:1px solid #444c56}`]})}};export{M as default};