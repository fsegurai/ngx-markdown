import{b as X,c as J}from"./chunk-HARP5QTX.js";import{a as D}from"./chunk-QOSXMQP6.js";import{a as R,b as W,c as U,d as z,f as K,g as Y,h as G,i as q}from"./chunk-T6EXBBXC.js";import"./chunk-NSE5SUUN.js";import{a as A,b as H}from"./chunk-JJTRAXZ2.js";import{$b as L,Ba as r,Ga as n,Ha as t,Ia as i,Ka as w,Na as _,O as y,Pa as j,U as v,V as C,W as u,X as b,Y as S,Za as T,_a as e,bb as h,cb as g,da as M,db as f,eb as O,fb as B,kb as P,la as o,ma as x,rc as I,sc as V,tc as F,wc as N,za as E}from"./chunk-OMMNRTM4.js";function Q(s,m){if(s&1){let Z=w();n(0,"button",32),_("click",function(){u(Z);let p=j();return b(p.onCopyToClipboard())}),S(),n(1,"svg",33),i(2,"path",34),t()()}}var ce=(()=>{let m=class m{constructor(d,p){this.elementRef=d,this.snackbar=p,this.clipboardButton=J,this.emojiMarkdown="# I :heart: @fsegurai/ngx-markdown",this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$",this.mermaidMarkdown="```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```",this.mermaidOptions={fontFamily:"inherit",theme:D.Theme.Dark}}ngOnInit(){this.setHeadings()}onCopyToClipboard(){this.snackbar.open("Copied to clipboard via ng-template!",void 0,{duration:3e3,horizontalPosition:"right",verticalPosition:"bottom"})}setHeadings(){let d=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(p=>d.push(p)),this.headings=d}};m.\u0275fac=function(p){return new(p||m)(x(M),x(X))},m.\u0275cmp=y({type:m,selectors:[["app-plugins"]],standalone:!0,features:[O([{provide:L,useValue:{}}]),B],decls:165,vars:58,consts:[["buttonTemplate",""],[3,"headings"],["id","emoji"],[3,"src"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["appearance","fill","color","accent","fxFlex.gt-sm","calc(50% - 8px)"],["matInput","",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data","emoji"],[3,"emoji"],["id","line-numbers"],[3,"lineNumbers"],[3,"start","lineNumbers"],["id","line-highlight"],[3,"lineOffset","line","lineHighlight"],["id","command-line"],[3,"host","src","user","commandLine"],[3,"host","output","src","user","commandLine"],[3,"output","prompt","src","commandLine"],[3,"filterOutput","prompt","src","commandLine"],["id","katex"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data","katex"],["id","mermaid"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data","mermaidOptions","mermaid"],["id","clipboard"],[3,"clipboard"],[1,"btn-clipboard-toolbar",3,"clipboard"],[1,"btn-clipboard-default",3,"clipboard"],["clipboardButtonTextCopy","Copy me!","clipboardButtonTextCopied","Copied!",1,"btn-clipboard-default",3,"clipboard"],["clipboardButtonTextCopy","Copy code!","clipboardButtonTextCopied","Code copied!",1,"btn-clipboard-default",3,"clipboard"],[1,"btn-clipboard-default",3,"clipboard","clipboardLanguageButton","emoji"],[3,"clipboardButtonComponent","clipboard"],[3,"clipboardButtonTemplate","clipboard"],[1,"btn-clipboard",3,"click"],["viewBox","0 0 24 24",2,"width","16px","height","16px"],["d","M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z","fill","#fff"]],template:function(p,a){if(p&1){let c=w();n(0,"app-scrollspy-nav-layout",1)(1,"h1"),e(2,"Plugins"),t(),n(3,"markdown"),e(4," Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. "),t(),n(5,"section")(6,"h2",2),e(7,"Emoji plugin"),t(),n(8,"markdown"),e(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),t(),n(10,"markdown"),e(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),t(),i(12,"markdown",3),n(13,"markdown"),e(14," The example below illustrate `emoji` directive in action. "),t(),n(15,"div",4)(16,"mat-form-field",5)(17,"textarea",6),f("ngModelChange",function(l){return u(c),g(a.emojiMarkdown,l)||(a.emojiMarkdown=l),b(l)}),t()(),i(18,"markdown",7),t(),n(19,"markdown",8),e(20," > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. "),t()(),n(21,"section")(22,"h2",9),e(23,"Line Numbers plugin"),t(),n(24,"markdown"),e(25,`
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
    `),t(),n(26,"markdown"),e(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),t(),i(28,"markdown",3),n(29,"markdown"),e(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),t(),n(31,"markdown",10),e(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),t(),n(33,"markdown"),e(34," Optionally you can use `start` to specify the offset number for the first display line. "),t(),n(35,"markdown"),e(36," In the example below line offset is set to 5 using `start` input property. "),t(),n(37,"markdown",11),e(38,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;
          if (negate)
          x = -x;
          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);
          if (Math.abs(x - n) < 1 && (x > 0 == n > 0))
          return negate ? -possible : possible;
        } catch (e) { }
      }
      \`\`\`
    `),t()(),n(39,"section")(40,"h2",12),e(41,"Line Highlight plugin"),t(),n(42,"markdown"),e(43,"\n      #### Prism files to include\n      ```javascript\n      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css\n      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js\n      ```\n      #### Directive\n      `lineHighlight` - activate line highlight plugin\n\n      #### Attributes\n      `line` - lines to highlight (i.e.: 6, 11-15)"),i(44,"br"),e(45,"\n      `lineOffset` - starting offset for line numbers"),i(46,"br"),e(47,`

      ### Example
    `),t(),n(48,"markdown"),e(49,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to\n      specify the starting line of code your snippet represents.\n    "),t(),i(50,"markdown",3),n(51,"markdown"),e(52," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),t(),n(53,"markdown",13),e(54,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;
          if (negate)
          x = -x;
          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);
          if (Math.abs(x - n) < 1 && (x > 0 == n > 0))
          return negate ? -possible : possible;
        } catch (e) { }
      }
      \`\`\`
    `),t()(),n(55,"section")(56,"h2",14),e(57,"Command Line plugin"),t(),n(58,"markdown",8),e(59,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),i(60,"br"),e(61,"\n      `output` - lines to be presented as output (optional)"),i(62,"br"),e(63,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),i(64,"br"),e(65,"\n      `prompt` - data prompt"),i(66,"br"),e(67,"\n      `user` - user name"),i(68,"br"),e(69,`

      ### Example
    `),t(),n(70,"markdown"),e(71,`
      Root user without output

      \`\`\`html
      <markdown
      commandLine
      [user]="'root'"
      [host]="'localhost'"
      [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),t(),i(72,"markdown",15),n(73,"markdown"),e(74,`
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
    `),t(),i(75,"markdown",16),n(76,"markdown"),e(77,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
      commandLine
      [prompt]="'PS C:\\Users\\Chris>'"
      [output]="'2-19'"
      [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),t(),i(78,"markdown",17),n(79,"markdown"),e(80,`
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
    `),t(),i(81,"markdown",18),t(),n(82,"section")(83,"h2",19),e(84,"KaTeX plugin"),t(),n(85,"markdown"),e(86,`
      #### KaTeX files to include
      \`\`\`javascript
      node_modules/katex/dist/katex.min.css
      node_modules/katex/dist/katex.min.js
      node_modules/katex/dist/contrib/auto-render.min.js
      \`\`\`

      #### Directive
      \`katex\` - activate KaTeX plugin

      #### Attributes
      \`katexOptions\` - combine [KaTeX options](https://katex.org/docs/options.html) and [Auto-Renderer
      options](https://katex.org/docs/autorender.html#api)`),i(87,"br"),e(88,`

      ### Example
    `),t(),n(89,"markdown"),e(90," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),t(),i(91,"markdown",3),n(92,"markdown"),e(93," The example below illustrate `katex` directive in action. "),t(),n(94,"div",4)(95,"mat-form-field",5)(96,"textarea",6),f("ngModelChange",function(l){return u(c),g(a.katexMarkdown,l)||(a.katexMarkdown=l),b(l)}),t()(),i(97,"markdown",20),t(),n(98,"markdown"),e(99,`
      Optionally, you can specify both [KaTeX options](https://katex.org/docs/options.html) and [Auto-Renderer
      options](https://katex.org/docs/autorender.html#api) using \`katexOptions\` property.

      **example.component.ts**
      \`\`\`typescript
      import { KatexOptions } from 'ngx-markdown';

      public options: KatexOptions = {
        displayMode: true,
        throwOnError: false,
        errorColor: '#cc0000',
        delimiters: [...],
        ...
      };
      \`\`\`

      **example.component.html**
    `),t(),i(100,"markdown",3),t(),n(101,"section")(102,"h2",21),e(103,"Mermaid plugin"),t(),n(104,"markdown"),e(105,`
      #### Mermaid file to include
      \`\`\`javascript
      node_modules/mermaid/dist/mermaid.min.js
      \`\`\`

      #### Directive
      \`mermaid\` - activate mermaid plugin

      #### Attributes
      \`mermaidOptions\` - mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)`),i(106,"br"),e(107,`

      ### Example
    `),t(),n(108,"markdown"),e(109," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),t(),i(110,"markdown",3),n(111,"markdown"),e(112," The example below illustrate `mermaid` directive in action. "),t(),n(113,"div",4)(114,"mat-form-field",5)(115,"textarea",6),f("ngModelChange",function(l){return u(c),g(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),b(l)}),t()(),i(116,"markdown",22),t(),n(117,"markdown"),e(118,`
      Optionally, you can specify mermaid [configuration
      options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) using \`mermaidOptions\`
      property.

      **example.component.ts**
      \`\`\`typescript
      import { MermaidAPI } from 'ngx-markdown';

      public options: MermaidAPI.Config = {
        fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
        logLevel: MermaidAPI.LogLevel.Info,
        theme: MermaidAPI.Theme.Dark,
        ...
      };
      \`\`\`

      **example.component.html**
    `),t(),i(119,"markdown",3),n(120,"markdown",8),e(121," > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. "),t()(),n(122,"section")(123,"h2",23),e(124,"Clipboard plugin"),t(),n(125,"markdown"),e(126,"\n      #### Clipboard file(s) to include\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),i(127,"br"),e(128,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),i(129,"br"),e(130,"\n      `clipboardButtonTextCopy` - text to display on the copy button"),i(131,"br"),e(132,"\n      `clipboardButtonTextCopied` - text to display on the copied button"),i(133,"br"),e(134,"\n      `clipboardLanguageButton` - enable language copy button taken as a reference from the code block"),i(135,"br"),e(136,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),i(137,"br"),e(138,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),i(139,"br"),e(140,"\n      `markdown-clipboard-button` - default button"),i(141,"br"),e(142,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),i(143,"br"),e(144,`

      ### Example
    `),t(),n(145,"markdown",24),e(146,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative
      is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),t(),n(147,"markdown",25),e(148,`
      #### Customize toolbar

      The clipboard button is placed inside a wrapper element that can be customize using the \`.markdown-clipboard-toolbar\` CSS selector in your global \`styles.css/scss\` file.

      This allows to override the default positioning of the clipboard button and play with the visibility of the button using the \`.hover\` CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code block element.

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
    `),t(),n(149,"markdown",26),e(150,`
      #### Customize default button

      The default button can be customized using the \`.markdown-clipboard-button\` CSS selector in your global \`styles.css/scss\` file. You can also customized the "copied" state happening after the button is clicked using the \`.copied\` CSS selector.

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
    `),t(),n(151,"markdown",27),e(152,"\n      #### Customize button text copy and button text copied\n\n      The default button text can be customized using the `clipboardButtonTextCopy` and `clipboardButtonTextCopied` input properties on the `markdown` component, directive or pipe.\n\n      ```javascript\n      const example = 'the default clipboard button with custom text';\n      ```\n    "),t(),n(153,"markdown",28),e(154,`
      \`\`\`cpp
      #include <iostream>

      int main() {
        std::cout << "Hello, World!";
        return 0;
      }
      \`\`\`
    `),t(),n(155,"markdown",29),e(156,`
      #### Language button

      To enable language button, use the \`[clipboardLanguageButton]="true"\` input property on the \`markdown\` component,
      directive or pipe. This will add a language button to the default clipboard button.

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

      \`\`\`
      No language indicated, so no syntax highlighting.
      But let's throw in the default button behavior.
      \`\`\`
    `),t(),n(157,"markdown",30),e(158,`
      #### Using global configuration

      You can provide a custom component to use globaly across your application with the \`clipboardOptions\` in the
      \`MarkdownModuleConfig\` either with \`provideMarkdown\` provide-function for standalone components or
      \`MarkdownModule.forRoot()\` for module configuration.

      \`\`\`typescript
      // using the \`provideMarkdown\` function
      provideMarkdown({
        clipboardOptions: {
          provide: CLIPBOARD_OPTIONS,
          useValue: {
            buttonComponent: ClipboardButtonComponent,
          },
        },
      })

      // using \`MarkdownModule\` import
      MarkdownModule.forRoot({
        clipboardOptions: {
          provide: CLIPBOARD_OPTIONS,
          useValue: {
            buttonComponent: ClipboardButtonComponent,
          },
        },
      }),
      \`\`\`
    `),t(),n(159,"markdown",30),C(),e(160,`
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
    `),v(),t(),E(161,Q,3,0,"ng-template",null,0,P),n(163,"markdown",31),e(164,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button\n      implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),t()()()}if(p&2){let c=T(162);r("headings",a.headings),o(12),r("src","app/plugins/remote/emoji.html"),o(5),h("ngModel",a.emojiMarkdown),o(),r("data",a.emojiMarkdown)("emoji",!0),o(),r("emoji",!0),o(9),r("src","app/plugins/remote/line-numbers.html"),o(3),r("lineNumbers",!0),o(6),r("start",5)("lineNumbers",!0),o(13),r("src","app/plugins/remote/line-highlight.html"),o(3),r("lineOffset",5)("line","6, 10-16")("lineHighlight",!0),o(5),r("emoji",!0),o(14),r("host","localhost")("src","app/plugins/remote/root-user-without-output.bash")("user","root")("commandLine",!0),o(3),r("host","remotehost")("output","2, 4-8")("src","app/plugins/remote/non-root-user-with-output.bash")("user","chris")("commandLine",!0),o(3),r("output","2-19")("prompt","PS C:UsersChris>")("src","app/plugins/remote/windows-powershell-with-output.powershell")("commandLine",!0),o(3),r("filterOutput","(out)")("prompt","PS C:UsersChris>")("src","app/plugins/remote/windows-powershell-with-filter-output.powershell")("commandLine",!0),o(10),r("src","app/plugins/remote/katex.html"),o(5),h("ngModel",a.katexMarkdown),o(),r("data",a.katexMarkdown)("katex",!0),o(3),r("src","app/plugins/remote/katex-options.html"),o(10),r("src","app/plugins/remote/mermaid.html"),o(5),h("ngModel",a.mermaidMarkdown),o(),r("data",a.mermaidMarkdown)("mermaidOptions",a.mermaidOptions)("mermaid",!0),o(3),r("src","app/plugins/remote/mermaid-options.html"),o(),r("emoji",!0),o(25),r("clipboard",!0),o(2),r("clipboard",!0),o(2),r("clipboard",!0),o(2),r("clipboard",!0),o(2),r("clipboard",!0),o(2),r("clipboard",!0)("clipboardLanguageButton",!0)("emoji",!0),o(2),r("clipboardButtonComponent",a.clipboardButton)("clipboard",!0),o(2),r("clipboardButtonComponent",a.clipboardButton)("clipboard",!0),o(4),r("clipboardButtonTemplate",c)("clipboard",!0)}},dependencies:[N,I,V,F,z,R,W,U,A,Y,K,q,G,H],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 8px;min-width:50px;width:auto;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}"],changeDetection:0});let s=m;return s})();export{ce as default};
