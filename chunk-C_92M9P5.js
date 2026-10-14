import"./chunk-K_VmmcvY.js";import{Dt as U0,Er as zt,F as H0,Ft as VT,Gt as X,J as LN,Lt as Vc,Sn as hb,X as Mp,Zn as sl,gn as g$1,i as $n,it as O7,jn as k7,q as L7,sr as vn,t as $0,zn as nt}from"./chunk-BMJqnaeG.js";import"./main-UM5SAVUH.js";import{t as nt$1}from"./chunk-CivaqMRp.js";var g=class c{constructor(){this.elementRef=g$1(nt);this.headings=X(void 0);this.myValue=`print('hello-world')`;this.fencedValue=`# Greetings

\`\`\`python
print('hello-world')
\`\`\`

The end.`}ngOnInit(){this.setHeadings()}setHeadings(){let d=Array.from(this.elementRef.nativeElement.querySelectorAll(`h2`));this.headings.set(d)}static{this.ɵfac=function(l){return new(l||c)}}static{this.ɵcmp=$n({type:c,selectors:[[`app-syntax-highlight`]],decls:34,vars:19,consts:[[3,`headings`],[`id`,`getting-started`],[`id`,`auto-detect`],[3,`src`],[`id`,`interpolation`],[3,`emoji`],[`id`,`language-pipe`],[3,`innerHTML`],[`id`,`code-fences`]],template:function(l,p){l&1&&(Vc(0,`app-scrollspy-nav-layout`,0)(1,`h1`,1),vn(2,`Syntax Highlight`),Mp(),Vc(3,`section`)(4,`h2`,2),vn(5,`Auto-Detect`),Mp(),Vc(6,`markdown`),vn(7,"\n      When using the `src` input property to load file remotely, language for syntax highlight will be auto-detected\n      based on the loaded file extension.\n\n      The following example...\n\n      ```html\n      <markdown [src]=\"'app/syntax-highlight/remote/for-loop.js'\"></markdown>\n      ```\n\n      Would render with Javascript syntax highlight based on the `js` file extension.\n\n      The extension is read from the file name only, case-insensitively: the query and the hash are ignored\n      (`file.ts?v=1.2` is `ts`), and both `.md` and `.markdown` files are rendered as Markdown.\n    "),Mp(),sl(8,`markdown`,3),Mp(),Vc(9,`section`)(10,`h2`,4),vn(11,`Interpolation`),Mp(),Vc(12,`markdown`,5),vn(13,`
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
    `),Mp(),Vc(14,`markdown`),vn(15,`
      \`\`\`typescript
      export function greetings(name: string): string {
        return 'Hello ' + name;
      }
      \`\`\`
    `),Mp()(),Vc(16,`section`)(17,`h2`,6),vn(18,`Language Pipe`),Mp(),Vc(19,`markdown`),vn(20,"\n      When using the `markdown` pipe, you can specify the syntax highlight language by chaining the `language` pipe.\n\n      For example, having the python code `print('hello world')` into the `myValue` variable could be parsed specifying\n      the language as follow...\n\n      ````\n      ```html\n      <div [innerHTML]=\"myValue | language : 'python' | markdown | async\"><div>\n      ```\n      ````\n\n      Would render with Python syntax highlight as specified with the `language` pipe in front of the `markdown` pipe.\n    "),Mp(),sl(21,`div`,7),U0(22,`language`),U0(23,`markdown`),U0(24,`async`),Mp(),Vc(25,`section`)(26,`h2`,8),vn(27,`Code Fences`),Mp(),Vc(28,`markdown`),vn(29,"\n      The code block generated for a non-Markdown `src` file, and by the `language` pipe, uses a fence longer than the\n      longest backtick run of the content, so content that contains a fence is not cut short.\n\n      In the example below, the Markdown source shown with the `language` pipe contains its own code fence.\n    "),Mp(),sl(30,`div`,7),U0(31,`language`),U0(32,`markdown`),U0(33,`async`),Mp()()),l&2&&(hb(`headings`,p.headings()),zt(8),hb(`src`,`app/syntax-highlight/remote/for-loop.js`),zt(4),hb(`emoji`,!0),zt(9),hb(`innerHTML`,$0(24,10,$0(23,8,H0(22,5,p.myValue,`python`))),VT),zt(9),hb(`innerHTML`,$0(33,17,$0(32,15,H0(31,12,p.fencedValue,`markdown`))),VT))},dependencies:[k7,nt$1,LN,O7,L7],styles:[`[_nghost-%COMP%]{display:block}`]})}};export{g as default};