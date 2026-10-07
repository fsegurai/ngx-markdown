import{a as k,b as x,c as S,d as _,e as E,f as O,g as R,h as P,i as T,j as A}from"./chunk-YTFLDJFQ.js";import"./chunk-Z3D7KRTD.js";import{a as b}from"./chunk-QVEGATNV.js";import{$a as a,Bc as M,Da as m,Ea as o,Fa as n,Ga as C,I as s,W as f,_ as y,cb as c,db as p,eb as h,fa as l,na as w,zc as v}from"./chunk-BGA6J36P.js";var g=class u{constructor(){this.elementRef=s(y);this.markdownService=s(v);this.headings=f(void 0);this.markdown=`## Markdown rules!
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
> Blockquote to the max`;this.overrideEnabled=!1;this._accentColor=""}get accentColor(){return this._accentColor}set accentColor(t){this._accentColor!==t&&(this._accentColor=t,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let t=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(t),this.markdownService.reload()}overrideRenderer(t){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:i,depth:e})=>{if(this.overrideEnabled){let d=this.markdownService.parseInline(i);return`<h${e}${t}>${d}</h${e}>`}return!1}}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let t=Array.from(this.elementRef.nativeElement.querySelectorAll("h2"));this.headings.set(t)}static{this.\u0275fac=function(i){return new(i||u)}}static{this.\u0275cmp=w({type:u,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],[1,"split"],[1,"split-item","split-column"],["appearance","fill","color","accent","floatLabel","always",1,"fill"],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent",1,"fill"],["cdkTextareaAutosize","true","matInput","",3,"ngModelChange","ngModel"],[1,"split-item",3,"data"]],template:function(i,e){i&1&&(o(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),n(),o(3,"markdown"),a(4,`
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
    `),n(),o(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),n(),o(16,"input",5),h("ngModelChange",function(r){return p(e.accentColor,r)||(e.accentColor=r),r}),n()(),o(17,"mat-form-field",6)(18,"textarea",7),h("ngModelChange",function(r){return p(e.markdown,r)||(e.markdown=r),r}),n()()(),C(19,"markdown",8),n()()()()),i&2&&(m("headings",e.headings()),l(16),c("ngModel",e.accentColor),l(2),c("ngModel",e.markdown),l(),m("data",e.markdown))},dependencies:[_,k,x,S,M,R,O,E,A,T,P,b],styles:["[_nghost-%COMP%]{display:block}.split[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column;gap:16px}@media(min-width:960px){.split[_ngcontent-%COMP%]{flex-direction:row}.split[_ngcontent-%COMP%] > .split-item[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 calc(50% - 8px);min-width:calc(50% - 8px)}}.split-column[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;flex-direction:column}.split-column[_ngcontent-%COMP%] > .fill[_ngcontent-%COMP%]{box-sizing:border-box;flex:1 1 .000000001px}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0})}};export{g as default};
