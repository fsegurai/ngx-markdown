import{a as S,b as T,c as z,d as L,e as R,f as H,g as D,i as q,j as I}from"./chunk-NY33LEVP.js";import"./chunk-QKTMIQJI.js";import{a as f,b as v}from"./chunk-BCIRNEUW.js";import{Ec as x,Ha as c,Ia as a,Ja as d,N as r,Na as _,W as s,Z as u,aa as M,ab as m,db as O,eb as w,fb as k,ia as l,jb as P,lc as y,qa as C,qb as b,xb as h}from"./chunk-KUNPX5WM.js";var E=`## Images Section

![Custom background](https://pub-5319465d44da4d52805a6be35612d5b4.r2.dev/assets/large/background/custom-bg-01.jpg)

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://pub-5319465d44da4d52805a6be35612d5b4.r2.dev/assets/large/background/custom-bg-01.jpg  "Test Inline Reference"

## Horizontal Rule Section

---

***

## Headings Section

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules

---

***

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

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

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

### [Math](katex.com)

<p align="center">
  $\\sqrt{3x-1}+(1+x)^2$
</p>

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

### [Mermaid](https://mermaid.js.org/intro/getting-started.html)

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

`;function j(A,o){let n;return(...t)=>{clearTimeout(n),n=setTimeout(()=>A(...t),o)}}var F=()=>({internalBrowserHandler:!0,externalBrowserHandler:!0}),e=class e{constructor(){this.markdownService=r(y);this.elementRef=r(M);this.changeDetector=r(h);this._destroyRef=r(s);this.markdownContent=u(E);this.debounceRendering=j(()=>this.updateMarkdownRendering(),250);this.katexOptions={displayMode:!0,throwOnError:!1,errorColor:"#cc0000",macros:{"\\RR":"\\mathbb{R}","\\NN":"\\mathbb{N}","\\ZZ":"\\mathbb{Z}","\\QQ":"\\mathbb{Q}","\\f":"#1f(#2)","\\g":"#1g(#2)","\\h":"#1h(#2)"}};this.mermaidOptions={theme:"dark"};b(()=>{this.markdownContent(),this.debounceRendering()}),this._destroyRef.onDestroy(()=>{this.headings=void 0,this.markdownRendering=void 0})}onLoad(){this.setHeadings()}setHeadings(){let o=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(n=>o.push(n)),this.headings=o}updateMarkdownRendering(){this.markdownRendering=this.markdownContent(),this.markdownRendering&&(this.markdownService.renderer.heading=({text:o,depth:n})=>{let t=this.markdownService.parseInline(o),i=o.toLowerCase().split(/\W+/).filter(Boolean).join("-");return`<h${n} id="${i}">${t}</h${n}>`}),this.changeDetector.detectChanges()}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=C({type:e,selectors:[["app-playground"]],decls:10,vars:15,consts:[[3,"headings"],[1,"playground"],[1,"editor"],["matInput","",3,"ngModelChange","ngModel"],[1,"markdown",3,"ready","disableSanitizer","lineNumbers","start","emoji","katex","katexOptions","mermaid","mermaidOptions","clipboard","clipboardLanguageButton","data","routerLinkOptions"]],template:function(n,t){n&1&&(a(0,"app-scrollspy-nav-layout",0)(1,"h1"),m(2,"Playground"),d(),a(3,"section")(4,"div",1)(5,"mat-form-field",2)(6,"mat-label"),m(7,"Markdown Editor"),d(),a(8,"textarea",3),k("ngModelChange",function(g){return w(t.markdownContent,g)||(t.markdownContent=g),g}),d()(),a(9,"markdown",4),_("ready",function(){return t.onLoad()}),d()()()()),n&2&&(c("headings",t.headings),l(8),O("ngModel",t.markdownContent),l(),c("disableSanitizer",!0)("lineNumbers",!0)("start",1)("emoji",!0)("katex",!0)("katexOptions",t.katexOptions)("mermaid",!0)("mermaidOptions",t.mermaidOptions)("clipboard",!0)("clipboardLanguageButton",!0)("data",t.markdownRendering)("routerLinkOptions",P(14,F)))},dependencies:[x,L,S,T,z,f,D,H,R,I,q,v],styles:['@charset "UTF-8";  .outlet-wrapper{max-width:calc(100% - 20rem)!important}.playground[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap}@media (max-width: 768px){.playground[_ngcontent-%COMP%]{flex-direction:column}}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{flex:1 1 45%;margin:2%;box-sizing:border-box;height:100%}@media (max-width: 768px){.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{flex:1 1 100%}}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{position:sticky;top:80px}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:calc(100vh - 8rem);overflow:auto;field-sizing:content}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto;padding:.5rem 1.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert{padding:0 1em;margin-bottom:16px;color:inherit;border-left:.25em solid #444c56}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-title{display:inline-flex;align-items:center;font-weight:500}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note{border-left-color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title{color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title svg{fill:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip{border-left-color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title{color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title svg{fill:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important{border-left-color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title{color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title svg{fill:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning{border-left-color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title{color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title svg{fill:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution{border-left-color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title{color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title svg{fill:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mr-2{margin-right:.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{border-radius:2em;font-size:.875em;font-weight:inherit;text-decoration:none;padding:.25em .65em;line-height:1}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag{background-color:#8a5cf51a;border:0 solid hsla(258,88%,66%,.15);color:#a68af9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{background-color:#5cdef51a;border:0 solid hsla(223,88%,66%,.15);color:#8ab0f9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Roboto,Raleway,Open Sans,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;letter-spacing:1px;transition:all .25s ease-out}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00aeff1a;color:#0090ff}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *{box-sizing:border-box}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:first-child{margin-top:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:last-child{margin-bottom:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a{color:#2196f3;background-color:transparent;-webkit-text-decoration-skip:objects}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:hover{outline-width:0;text-decoration:underline}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:not([href]){color:inherit;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor{color:inherit;text-decoration:none;cursor:inherit}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:hover{outline-width:0;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     strong{font-weight:bolder}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     svg{overflow:hidden}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     mark{padding:.2rem .4rem;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     img{max-width:85%;box-sizing:content-box;background-color:transparent;object-fit:cover;border-radius:4px;border-style:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     iframe{width:100%;max-width:85%;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr{cursor:help;text-decoration:none;border-bottom:1px dotted;text-transform:lowercase;font-weight:600;font-variant:small-caps}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr[title]:hover{cursor:help}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr{box-sizing:content-box;height:.25em;margin:.75rem 0;padding:0;overflow:hidden;background-color:#e7e7e7;border:0;border-bottom:1px solid #ddd;opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:before{display:table;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:after{display:table;clear:both;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input{font:inherit;margin:0;overflow:visible;line-height:inherit;-webkit-font-feature-settings:"liga" 0;font-feature-settings:"liga" 0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input[type=checkbox]{box-sizing:border-box;padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input:checked{position:relative;z-index:1;border-color:#4078c0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{padding-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25;text-rendering:optimizeLegibility}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1{margin:.67em 0;font-weight:600;padding-bottom:.3em;font-size:1.802rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2{font-weight:600;padding-bottom:.3em;font-size:1.602rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3{font-weight:600;font-size:1.424rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4{font-weight:600;font-size:1.266rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5{font-weight:600;font-size:1.125rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{font-weight:600;font-size:1rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p{margin-top:0;margin-bottom:10px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol{padding-left:2em;margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol{list-style-type:lower-roman}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol ol{list-style-type:lower-alpha}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ul ol{list-style-type:lower-greek}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul{margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li>p{margin-top:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li+li{margin-top:.25em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl{padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dt{padding:0;margin-top:16px;font-size:1em;font-style:italic;font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dd{padding:0 16px;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dd{margin-left:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin-top:0;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote{margin:0 0 1rem;padding:0 1em;color:#d3d3d3;border-left:.25em solid #2196f3}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:first-child{margin-top:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:last-child{margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption{display:block;margin-top:-1.5rem;margin-bottom:1.5rem;font-size:75%;text-align:right}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption:before{content:"\\2014  ";opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table{display:block;width:100%;overflow:auto;border-spacing:0;border-collapse:collapse}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table td{white-space:normal;word-wrap:break-word;padding:6px 13px;border:1px solid #ddd}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th{font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{font-family:monospace,monospace;font-size:1em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd{display:inline-block;padding:3px 5px;font:11px Consolas,Liberation Mono,Menlo,Courier,monospace;line-height:10px;color:#555;vertical-align:middle;background-color:#fcfcfc;border:solid 1px #ccc;border-bottom-color:#bbb;border-radius:3px;box-shadow:inset 0 -1px #bbb}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code{font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;padding:.2em 0;margin:0;font-size:85%;background-color:#2196f34f;border-radius:6px;font-style:italic}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:after{letter-spacing:-.2em;content:"\\a0"}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin:0 0 1rem;font:12px Consolas,Liberation Mono,Menlo,Courier,monospace;word-wrap:normal;overflow:auto;font-size:85%;line-height:1.45;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre>code{padding:0;margin:0;font-size:100%;word-break:normal;white-space:pre;background:transparent;border:0;font-style:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code{display:inline;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:transparent;border:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:after{content:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .external-link{display:flex}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .katex{font-size:2vw}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .footnotes{opacity:.8;margin-top:1rem;padding:1rem;border-top:1px solid #444c56}'],changeDetection:0});var p=e;export{p as default};
