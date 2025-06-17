import{a as E,b as D,c as _,d as L,e as F,f as R,g as T,h as I,i as A,j as O}from"./chunk-NY33LEVP.js";import"./chunk-QKTMIQJI.js";import{a as k,b}from"./chunk-BCIRNEUW.js";import{Ac as M,Bc as x,Ec as S,Ha as c,Ia as o,Ja as n,Ka as v,N as m,aa as f,ab as a,db as p,eb as h,fb as u,ia as d,lc as w,qa as y,zc as C}from"./chunk-KUNPX5WM.js";var l=class l{constructor(){this.elementRef=m(f);this.markdownService=m(w);this.markdown=`## Markdown rules!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;this.overrideEnabled=!1;this._accentColor=""}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:r,depth:t})=>{if(this.overrideEnabled){let s=this.markdownService.parseInline(r);return`<h${t}${e}>${s}</h${t}>`}return!1}}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(r=>e.push(r)),this.headings=e}};l.\u0275fac=function(r){return new(r||l)},l.\u0275cmp=y({type:l,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxFlex.gt-sm","calc(50% - 8px)","fxLayout","column"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["cdkTextareaAutosize","true","matInput","",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(r,t){r&1&&(o(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),n(),o(3,"markdown"),a(4,`
    In some situations, you might need to re-render markdown after making changes. If you've updated the text this would
    be done automatically, however if the changes are internal to the library such as rendering options, you will need
    to inform the \`MarkdownService\` that it needs to update.

    To do so, inject the \`MarkdownService\` and call the \`reload()\` function as shown below.

    \`\`\`typescript
    import { MarkdownService } from 'ngx-markdown';

    constructor(
      private markdownService: MarkdownService,
    ) { }

    update() {
      this.markdownService.reload();
    }
    \`\`\`
  `),n(),o(5,"section")(6,"h2",1),a(7,"Example"),n(),o(8,"markdown"),a(9,`
      The example below will apply the \`style\` attribute on heading elements to customize their colors. This requires
      markdown to be reloaded because it updates the renderer programmatically to override the \`heading\` token.

      Although this could be done simply with CSS variables, this is only for demo purposes.
    `),n(),o(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),n(),o(16,"input",5),u("ngModelChange",function(i){return h(t.accentColor,i)||(t.accentColor=i),i}),n()(),o(17,"mat-form-field",6)(18,"textarea",7),u("ngModelChange",function(i){return h(t.markdown,i)||(t.markdown=i),i}),n()()(),v(19,"markdown",8),n()()()()),r&2&&(c("headings",t.headings),d(16),p("ngModel",t.accentColor),d(2),p("ngModel",t.markdown),d(),c("data",t.markdown))},dependencies:[S,C,M,x,L,E,D,_,k,T,R,F,O,A,I,b],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0});var g=l;export{g as default};
