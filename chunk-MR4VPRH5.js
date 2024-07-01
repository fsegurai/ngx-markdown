import{e as L}from"./chunk-ZIW5IXEY.js";import"./chunk-QOSXMQP6.js";import{a as P,b as f,c as y,d as x,e as v,f as T,g as H,h as S,i as D}from"./chunk-P4ET3GYD.js";import{a as _,b as O}from"./chunk-PLCMESQ2.js";import{Da as w,Hb as k,Ka as g,M as m,Oa as M,Pa as C,_b as b,fa as p,ia as c,ja as d,ka as u,pa as l,va as i,wa as r,xa as h}from"./chunk-G2QQ6AEL.js";var R=`## Images

Testing [code](/routerLink:#code) - [google](https://google.com)

![Custom background](https://pub-5319465d44da4d52805a6be35612d5b4.r2.dev/assets/large/background/custom-bg-01.jpg)

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://pub-5319465d44da4d52805a6be35612d5b4.r2.dev/assets/large/background/custom-bg-01.jpg  "Test Inline Reference"

<!---
title: Getting started with Node.js
date: 2023-04-01
author: John Doe
--->

[//]: # "title: Getting started with Node.js"
[//]: # "date: 2023-04-01"
[//]: # "author: John Doe"

---

\`\`\` mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
\`\`\`
---

__Advertisement :smile:

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

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

## Task Lists

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

Preview

\`\`\` html preview title="Code title"
<div class='foo'>Hello, World!</div>
\`\`\`

## Tables

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

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

[smart](https://google.com)

## Plugins

### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

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

### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote[^Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**
[^second]: Footnote text.
[^Text of inline footnote]: [Text](https://google.com)

### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is <abbr title="Title test">HTML</abbr> abbreviation example.

It converts <abbr>HTML</abbr>, but keep intact partial entries like "xxxHTMLyyy" and so on.

[HTML]: Hyper Text Markup Language

### [Math](katex.com)

<p align="center">
  $\\sqrt{3x-1}+(1+x)^2$
</p>

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

# Example

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

\`\`\` mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
\`\`\`

\`\`\` mermaid
graph TD
    A((Inicio)) --> B{\xBFUsuario es Administrador?}
    B -- S\xED --> C[M\xF3dulo de Administraci\xF3n de Promociones]
    B -- No --> F{\xBFSe realiza una compra?}
    C --> |Crear Promoci\xF3n| D[CP1 - Crear Promoci\xF3n]
    C --> |Modificar Promoci\xF3n| E[CP1 - Modificar Promoci\xF3n]
    C --> |Activar/Desactivar Promoci\xF3n| E
    C --> |Consultar Promoci\xF3n| E
    D & E --> G((Fin))
    F -- S\xED --> H[M\xF3dulo de Aplicaci\xF3n de Promociones]
    F -- No --> J{\xBFGenerar reporte?}
    H --> |Verificar Promoci\xF3n| I[CP2 - Aplicar Promoci\xF3n]
    H --> |Calcular Premio| I
    H --> |Registrar Premio| I
    I --> G
    J -- S\xED --> K[M\xF3dulo de Generaci\xF3n de Reportes]
    J -- No --> G
    K --> |Generar Reporte Diario| L[CP3 - Generar Reporte]
    K --> |Exportar Reporte| L
    L --> G
\`\`\`

This is an example note.
You can write docs in [GitHub-flavored Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

# H1
## H2
### H3
#### H4
##### H5
###### H6

## Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

1. First ordered list item
2. Another item
  * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.
   Note that this line is separate, but within the same paragraph.
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)


* Unordered list can use asterisks
- Or minuses
+ Or pluses

## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Images

Here's our logo (hover to see the title text):

Inline-style:

![alt text](https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "Logo Title Text 2"

## Code and Syntax Highlighting

Inline \`code\` has \`back-ticks around\` it.

\`\`\`javascript
const message = "JavaScript syntax highlighting";
alert(message);

const regexp = /foo/g;

function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}
\`\`\`

\`\`\`python
s = "Python syntax highlighting"
print s
\`\`\`

\`\`\`
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
\`\`\`

## Tables

Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

## Horizontal Rule

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.


  `;function A(a,o){let s;return(...n)=>{clearTimeout(s),s=setTimeout(()=>a(...n),o)}}var z=()=>({internalBrowserHandler:!0,externalBrowserHandler:!0}),nn=(()=>{let o=class o{get markdownContent(){return this._markdownContent}set markdownContent(n){this._markdownContent=n,this.debounceRendering()}constructor(n,t,e){this.markdownService=n,this.elementRef=t,this.changeDetector=e,this.debounceRendering=A(()=>this.updateMarkdownRendering(),1e3),this._markdownContent=R,this.katexOptions={displayMode:!0,throwOnError:!1,errorColor:"#cc0000",macros:{"\\RR":"\\mathbb{R}","\\NN":"\\mathbb{N}","\\ZZ":"\\mathbb{Z}","\\QQ":"\\mathbb{Q}","\\f":"#1f(#2)","\\g":"#1g(#2)","\\h":"#1h(#2)"}},this.mermaidOptions={theme:L}}ngOnInit(){this.setHeadings(),this.updateMarkdownRendering()}ngOnDestroy(){this.headings=void 0}setHeadings(){let n=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(t=>n.push(t)),this.headings=n}updateMarkdownRendering(){this.markdownRendering=this.markdownContent,this.markdownService.renderer.heading=(n,t)=>{let e=n.toLowerCase().replace(/[^\w]+/g,"-");return`<h${t} id="${e}">${n}</h${t}>`},this.changeDetector.detectChanges()}};o.\u0275fac=function(t){return new(t||o)(d(k),d(p),d(u))},o.\u0275cmp=m({type:o,selectors:[["app-playground"]],standalone:!0,features:[M],decls:12,vars:10,consts:[[3,"headings"],[1,"playground"],[1,"editor"],["matInput","",3,"ngModel","ngModelChange"],["lineNumbers","","emoji","","katex","","mermaid","","clipboard","",1,"markdown",3,"disableSanitizer","start","katexOptions","mermaidOptions","clipboardLanguageButton","data","routerLinkOptions"]],template:function(t,e){t&1&&(i(0,"app-scrollspy-nav-layout",0)(1,"h1"),g(2,"Playground"),r(),i(3,"section")(4,"h2"),g(5,"Markdown"),r(),i(6,"div",1)(7,"mat-form-field",2)(8,"mat-label"),g(9,"Textarea"),r(),i(10,"textarea",3),w("ngModelChange",function(I){return e.markdownContent=I}),r()(),h(11,"markdown",4),r()()()),t&2&&(l("headings",e.headings),c(10),l("ngModel",e.markdownContent),c(1),l("disableSanitizer",!0)("start",1)("katexOptions",e.katexOptions)("mermaidOptions",e.mermaidOptions)("clipboardLanguageButton",!0)("data",e.markdownRendering)("routerLinkOptions",C(9,z)))},dependencies:[b,x,P,f,y,_,H,T,v,D,S,O],styles:['@charset "UTF-8";  .outlet-wrapper{max-width:calc(100% - 20rem)!important}.playground[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:wrap}@media (max-width: 768px){.playground[_ngcontent-%COMP%]{flex-direction:column}}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{flex:1 1 45%;margin:2%;box-sizing:border-box;height:100%}@media (max-width: 768px){.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%], .playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{flex:1 1 100%}}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]{position:sticky;top:80px}.playground[_ngcontent-%COMP%]   .editor[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{height:calc(100vh - 8rem);overflow:auto;field-sizing:content}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto;padding:.5rem 1.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert{padding:0 1em;margin-bottom:16px;color:inherit;border-left:.25em solid #444c56}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-title{display:inline-flex;align-items:center;font-weight:500}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note{border-left-color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title{color:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-note>.markdown-alert-title svg{fill:#539bf5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip{border-left-color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title{color:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-tip>.markdown-alert-title svg{fill:#57ab5a}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important{border-left-color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title{color:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-important>.markdown-alert-title svg{fill:#986ee2}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning{border-left-color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title{color:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-warning>.markdown-alert-title svg{fill:#c69026}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution{border-left-color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title{color:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-alert-caution>.markdown-alert-title svg{fill:#e5534b}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mr-2{margin-right:.5rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{border-radius:2em;font-size:.875em;font-weight:inherit;text-decoration:none;padding:.25em .65em;line-height:1}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .hashtag{background-color:#8a5cf51a;border:0 solid hsla(258,88%,66%,.15);color:#a68af9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .mention{background-color:#5cdef51a;border:0 solid hsla(223,88%,66%,.15);color:#8ab0f9}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Roboto,Raleway,Open Sans,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;letter-spacing:1px;transition:all .25s ease-out}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00aeff1a;color:#0090ff}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *{box-sizing:border-box}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:first-child{margin-top:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     *:last-child{margin-bottom:0!important}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a{color:#2196f3;background-color:transparent;-webkit-text-decoration-skip:objects}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:hover{outline-width:0;text-decoration:underline}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a:not([href]){color:inherit;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor{color:inherit;text-decoration:none;cursor:inherit}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:active, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     a.title-anchor:hover{outline-width:0;text-decoration:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     strong{font-weight:bolder}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     svg{overflow:hidden}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     mark{padding:.2rem .4rem;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     img{max-width:85%;box-sizing:content-box;background-color:transparent;object-fit:cover;border-radius:4px;border-style:none}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     iframe{width:100%;max-width:85%;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr{cursor:help;text-decoration:none;border-bottom:1px dotted;text-transform:lowercase;font-weight:600;font-variant:small-caps}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     abbr[title]:hover{cursor:help}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr{box-sizing:content-box;height:.25em;margin:.75rem 0;padding:0;overflow:hidden;background-color:#e7e7e7;border:0;border-bottom:1px solid #ddd;opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:before{display:table;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     hr:after{display:table;clear:both;content:""}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input{font:inherit;margin:0;overflow:visible;line-height:inherit;-webkit-font-feature-settings:"liga" 0;font-feature-settings:"liga" 0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input[type=checkbox]{box-sizing:border-box;padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     input:checked{position:relative;z-index:1;border-color:#4078c0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{padding-top:24px;margin-bottom:16px;font-weight:600;line-height:1.25;text-rendering:optimizeLegibility}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h1{margin:.67em 0;font-weight:600;padding-bottom:.3em;font-size:1.802rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h2{font-weight:600;padding-bottom:.3em;font-size:1.602rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h3{font-weight:600;font-size:1.424rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h4{font-weight:600;font-size:1.266rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h5{font-weight:600;font-size:1.125rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     h6{font-weight:600;font-size:1rem}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p{margin-top:0;margin-bottom:10px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol{padding-left:2em;margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol{list-style-type:lower-roman}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol ol{list-style-type:lower-alpha}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul ul ol{list-style-type:lower-greek}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol ul{margin-top:0;margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li>p{margin-top:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     li+li{margin-top:.25em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl{padding:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dt{padding:0;margin-top:16px;font-size:1em;font-style:italic;font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl dd{padding:0 16px;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dd{margin-left:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     p, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ul, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     ol, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     dl, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin-top:0;margin-bottom:16px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote{margin:0 0 1rem;padding:0 1em;color:#d3d3d3;border-left:.25em solid #2196f3}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:first-child{margin-top:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote>:last-child{margin-bottom:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption{display:block;margin-top:-1.5rem;margin-bottom:1.5rem;font-size:75%;text-align:right}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     blockquote+figcaption:before{content:"\\2014  ";opacity:.5}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table{display:block;width:100%;overflow:auto;border-spacing:0;border-collapse:collapse}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table td{white-space:normal;word-wrap:break-word;padding:6px 13px;border:1px solid #ddd}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     table th{font-weight:700}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{font-family:monospace,monospace;font-size:1em}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     kbd{display:inline-block;padding:3px 5px;font:11px Consolas,Liberation Mono,Menlo,Courier,monospace;line-height:10px;color:#555;vertical-align:middle;background-color:#fcfcfc;border:solid 1px #ccc;border-bottom-color:#bbb;border-radius:3px;box-shadow:inset 0 -1px #bbb}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code{font-family:Consolas,Liberation Mono,Menlo,Courier,monospace;padding:.2em 0;margin:0;font-size:85%;background-color:#2196f34f;border-radius:6px;font-style:italic}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     code:after{letter-spacing:-.2em;content:"\\a0"}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre{margin:0 0 1rem;font:12px Consolas,Liberation Mono,Menlo,Courier,monospace;word-wrap:normal;overflow:auto;font-size:85%;line-height:1.45;border-radius:4px}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre>code{padding:0;margin:0;font-size:100%;word-break:normal;white-space:pre;background:transparent;border:0;font-style:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code{display:inline;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:transparent;border:0}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:before, .playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     pre code:after{content:normal}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .external-link{display:flex}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .katex{font-size:2vw}.playground[_ngcontent-%COMP%]   .markdown[_ngcontent-%COMP%]     .footnotes{opacity:.8;margin-top:1rem;padding:1rem;border-top:1px solid #444c56}'],changeDetection:0});let a=o;return a})();export{nn as default};
