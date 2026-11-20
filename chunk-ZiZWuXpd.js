import{t as ot}from"./chunk-BFo-hZcP.js";import{A as DR,Dt as Wn,Fn as xY,I as Fp,K as I_,M as Dn,Mt as Yc,N as ER,Nn as wR,On as qt,Q as MY,Xt as gN,Y as K,Yt as g$1,ft as RY,gn as nt,it as Nb,qt as fl}from"./main-7PGP3Y6F.js";var g=class c{constructor(){this.elementRef=g$1(nt);this.headings=K(void 0);this.myValue=`print('hello-world')`;this.fencedValue=`# Greetings

\`\`\`python
print('hello-world')
\`\`\`

The end.`}ngOnInit(){this.setHeadings()}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(l){return new(l||c)}}static{this.ɵcmp=Wn({type:c,selectors:[[`app-syntax-highlight`]],decls:34,vars:19,consts:[[3,`headings`],[`id`,`getting-started`],[`id`,`auto-detect`],[3,`src`],[`id`,`interpolation`],[3,`emoji`],[`id`,`language-pipe`],[3,`innerHTML`],[`id`,`code-fences`]],template:function(l,p){l&1&&(Yc(0,`app-scrollspy-nav-layout`,0)(1,`h1`,1),Dn(2,`Syntax Highlight`),Fp(),Yc(3,`section`)(4,`h2`,2),Dn(5,`Auto-Detect`),Fp(),Yc(6,`markdown`),Dn(7,"\n      When using the `src` input property to load file remotely, language for syntax highlight will be auto-detected\n      based on the loaded file extension.\n\n      The following example...\n\n      ```html\n      <markdown [src]=\"'app/syntax-highlight/remote/for-loop.js'\"></markdown>\n      ```\n\n      Would render with Javascript syntax highlight based on the `js` file extension.\n\n      The extension is read from the file name only, case-insensitively: the query and the hash are ignored\n      (`file.ts?v=1.2` is `ts`), and both `.md` and `.markdown` files are rendered as Markdown.\n    "),Fp(),fl(8,`markdown`,3),Fp(),Yc(9,`section`)(10,`h2`,4),Dn(11,`Interpolation`),Fp(),Yc(12,`markdown`,5),Dn(13,`
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
    `),Fp(),Yc(14,`markdown`),Dn(15,`
      \`\`\`typescript
      export function greetings(name: string): string {
        return 'Hello ' + name;
      }
      \`\`\`
    `),Fp()(),Yc(16,`section`)(17,`h2`,6),Dn(18,`Language Pipe`),Fp(),Yc(19,`markdown`),Dn(20,"\n      When using the `markdown` pipe, you can specify the syntax highlight language by chaining the `language` pipe.\n\n      For example, having the python code `print('hello world')` into the `myValue` variable could be parsed specifying\n      the language as follow...\n\n      ````\n      ```html\n      <div [innerHTML]=\"myValue | language : 'python' | markdown | async\"><div>\n      ```\n      ````\n\n      Would render with Python syntax highlight as specified with the `language` pipe in front of the `markdown` pipe.\n    "),Fp(),fl(21,`div`,7),ER(22,`language`),ER(23,`markdown`),ER(24,`async`),Fp(),Yc(25,`section`)(26,`h2`,8),Dn(27,`Code Fences`),Fp(),Yc(28,`markdown`),Dn(29,"\n      The code block generated for a non-Markdown `src` file, and by the `language` pipe, uses a fence longer than the\n      longest backtick run of the content, so content that contains a fence is not cut short.\n\n      In the example below, the Markdown source shown with the `language` pipe contains its own code fence.\n    "),Fp(),fl(30,`div`,7),ER(31,`language`),ER(32,`markdown`),ER(33,`async`),Fp()()),l&2&&(Nb(`headings`,p.headings()),qt(8),Nb(`src`,`app/syntax-highlight/remote/for-loop.js`),qt(4),Nb(`emoji`,!0),qt(9),Nb(`innerHTML`,DR(24,10,DR(23,8,wR(22,5,p.myValue,`python`))),I_),qt(9),Nb(`innerHTML`,DR(33,17,DR(32,15,wR(31,12,p.fencedValue,`markdown`))),I_))},dependencies:[MY,ot,gN,xY,RY],styles:[`[_nghost-%COMP%]{display:block}`]})}};export{g as default};