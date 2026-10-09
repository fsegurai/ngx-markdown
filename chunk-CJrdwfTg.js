import"./chunk-K_VmmcvY.js";import{A as FC,Bt as _N,Dt as V7,On as z,P as H7,et as NM,fn as qe,gn as tl,ht as TM,kn as z7,ln as pe,rn as m,rt as On,tt as Ne,u as AM,y as Bp,yn as vl,zt as _E}from"./main-DEIDU2DI.js";import{t as nt}from"./chunk-C3CyJQp8.js";var g=class c{constructor(){this.elementRef=m(pe);this.headings=z(void 0);this.myValue=`print('hello-world')`;this.fencedValue=`# Greetings

\`\`\`python
print('hello-world')
\`\`\`

The end.`}ngOnInit(){this.setHeadings()}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(l){return new(l||c)}}static{this.ɵcmp=Ne({type:c,selectors:[[`app-syntax-highlight`]],decls:34,vars:19,consts:[[3,`headings`],[`id`,`getting-started`],[`id`,`auto-detect`],[3,`src`],[`id`,`interpolation`],[3,`emoji`],[`id`,`language-pipe`],[3,`innerHTML`],[`id`,`code-fences`]],template:function(l,p){l&1&&(tl(0,`app-scrollspy-nav-layout`,0)(1,`h1`,1),On(2,`Syntax Highlight`),Bp(),tl(3,`section`)(4,`h2`,2),On(5,`Auto-Detect`),Bp(),tl(6,`markdown`),On(7,"\n      When using the `src` input property to load file remotely, language for syntax highlight will be auto-detected\n      based on the loaded file extension.\n\n      The following example...\n\n      ```html\n      <markdown [src]=\"'app/syntax-highlight/remote/for-loop.js'\"></markdown>\n      ```\n\n      Would render with Javascript syntax highlight based on the `js` file extension.\n\n      The extension is read from the file name only, case-insensitively: the query and the hash are ignored\n      (`file.ts?v=1.2` is `ts`), and both `.md` and `.markdown` files are rendered as Markdown.\n    "),Bp(),vl(8,`markdown`,3),Bp(),tl(9,`section`)(10,`h2`,4),On(11,`Interpolation`),Bp(),tl(12,`markdown`,5),On(13,`
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
    `),Bp(),tl(14,`markdown`),On(15,`
      \`\`\`typescript
      export function greetings(name: string): string {
        return 'Hello ' + name;
      }
      \`\`\`
    `),Bp()(),tl(16,`section`)(17,`h2`,6),On(18,`Language Pipe`),Bp(),tl(19,`markdown`),On(20,"\n      When using the `markdown` pipe, you can specify the syntax highlight language by chaining the `language` pipe.\n\n      For example, having the python code `print('hello world')` into the `myValue` variable could be parsed specifying\n      the language as follow...\n\n      ````\n      ```html\n      <div [innerHTML]=\"myValue | language : 'python' | markdown | async\"><div>\n      ```\n      ````\n\n      Would render with Python syntax highlight as specified with the `language` pipe in front of the `markdown` pipe.\n    "),Bp(),vl(21,`div`,7),TM(22,`language`),TM(23,`markdown`),TM(24,`async`),Bp(),tl(25,`section`)(26,`h2`,8),On(27,`Code Fences`),Bp(),tl(28,`markdown`),On(29,"\n      The code block generated for a non-Markdown `src` file, and by the `language` pipe, uses a fence longer than the\n      longest backtick run of the content, so content that contains a fence is not cut short.\n\n      In the example below, the Markdown source shown with the `language` pipe contains its own code fence.\n    "),Bp(),vl(30,`div`,7),TM(31,`language`),TM(32,`markdown`),TM(33,`async`),Bp()()),l&2&&(_E(`headings`,p.headings()),qe(8),_E(`src`,`app/syntax-highlight/remote/for-loop.js`),qe(4),_E(`emoji`,!0),qe(9),_E(`innerHTML`,NM(24,10,NM(23,8,AM(22,5,p.myValue,`python`))),FC),qe(9),_E(`innerHTML`,NM(33,17,NM(32,15,AM(31,12,p.fencedValue,`markdown`))),FC))},dependencies:[V7,nt,_N,H7,z7],styles:[`[_nghost-%COMP%]{display:block}`]})}};export{g as default};