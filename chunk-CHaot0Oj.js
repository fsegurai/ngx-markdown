import"./chunk-K_VmmcvY.js";import{$ as Kx,At as Ut,Bn as qD,Dt as U9,J as Je,Jt as Zx,K as JS,L as G,St as Rc,bn as jn,dn as gn,hr as z0,ln as g$1,mn as hp,qt as Zc,t as $9,u as B9,yt as Qx}from"./chunk-D6AO0_Ol.js";import"./main-NRJDHGSS.js";import{t as nt}from"./chunk-BaRhwODn.js";var g=class c{constructor(){this.elementRef=g$1(Je);this.headings=G(void 0);this.myValue=`print('hello-world')`;this.fencedValue=`# Greetings

\`\`\`python
print('hello-world')
\`\`\`

The end.`}ngOnInit(){this.setHeadings()}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(l){return new(l||c)}}static{this.ɵcmp=jn({type:c,selectors:[[`app-syntax-highlight`]],decls:34,vars:19,consts:[[3,`headings`],[`id`,`getting-started`],[`id`,`auto-detect`],[3,`src`],[`id`,`interpolation`],[3,`emoji`],[`id`,`language-pipe`],[3,`innerHTML`],[`id`,`code-fences`]],template:function(l,p){l&1&&(Rc(0,`app-scrollspy-nav-layout`,0)(1,`h1`,1),gn(2,`Syntax Highlight`),hp(),Rc(3,`section`)(4,`h2`,2),gn(5,`Auto-Detect`),hp(),Rc(6,`markdown`),gn(7,"\n      When using the `src` input property to load file remotely, language for syntax highlight will be auto-detected\n      based on the loaded file extension.\n\n      The following example...\n\n      ```html\n      <markdown [src]=\"'app/syntax-highlight/remote/for-loop.js'\"></markdown>\n      ```\n\n      Would render with Javascript syntax highlight based on the `js` file extension.\n\n      The extension is read from the file name only, case-insensitively: the query and the hash are ignored\n      (`file.ts?v=1.2` is `ts`), and both `.md` and `.markdown` files are rendered as Markdown.\n    "),hp(),Zc(8,`markdown`,3),hp(),Rc(9,`section`)(10,`h2`,4),gn(11,`Interpolation`),hp(),Rc(12,`markdown`,5),gn(13,`
      > :bulb: Using interpolation requires the uses of \`ngPreserveWhitespaces\` to keep indentation and spaces untouched
      during compilation.

      When using [interpolation](https://angular.io/guide/template-syntax#interpolation-), the language for code block
      must be specified after the first three backticks.

      \`\`\`\`html
      <markdown ngPreserveWhitespaces>
        \`\`\`typescript
        export function greetings(name: string): string {
          return 'Hello ' + name;
        }
        \`\`\`
      </markdown>
      \`\`\`\`
      ##### _* Characters such as \`<, >, {, }\` directly written in the HTML template file must be escaped
      so that the compiler doesn't try to bind it as regular Angular code_.

      Would render with TypeScript syntax highlight based on the specified \`typescript\` language.
    `),hp(),Rc(14,`markdown`),gn(15,`
      \`\`\`typescript
      export function greetings(name: string): string {
        return 'Hello ' + name;
      }
      \`\`\`
    `),hp()(),Rc(16,`section`)(17,`h2`,6),gn(18,`Language Pipe`),hp(),Rc(19,`markdown`),gn(20,"\n      When using the `markdown` pipe, you can specify the syntax highlight language by chaining the `language` pipe.\n\n      For example, having the python code `print('hello world')` into the `myValue` variable could be parsed specifying\n      the language as follow...\n\n      ````\n      ```html\n      <div [innerHTML]=\"myValue | language : 'python' | markdown | async\"><div>\n      ```\n      ````\n\n      Would render with Python syntax highlight as specified with the `language` pipe in front of the `markdown` pipe.\n    "),hp(),Zc(21,`div`,7),Zx(22,`language`),Zx(23,`markdown`),Zx(24,`async`),hp(),Rc(25,`section`)(26,`h2`,8),gn(27,`Code Fences`),hp(),Rc(28,`markdown`),gn(29,"\n      The code block generated for a non-Markdown `src` file, and by the `language` pipe, uses a fence longer than the\n      longest backtick run of the content, so content that contains a fence is not cut short.\n\n      In the example below, the Markdown source shown with the `language` pipe contains its own code fence.\n    "),hp(),Zc(30,`div`,7),Zx(31,`language`),Zx(32,`markdown`),Zx(33,`async`),hp()()),l&2&&(qD(`headings`,p.headings()),Ut(8),qD(`src`,`app/syntax-highlight/remote/for-loop.js`),Ut(4),qD(`emoji`,!0),Ut(9),qD(`innerHTML`,Kx(24,10,Kx(23,8,Qx(22,5,p.myValue,`python`))),JS),Ut(9),qD(`innerHTML`,Kx(33,17,Kx(32,15,Qx(31,12,p.fencedValue,`markdown`))),JS))},dependencies:[U9,nt,z0,B9,$9],styles:[`[_nghost-%COMP%]{display:block}`]})}};export{g as default};