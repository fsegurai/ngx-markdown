<p align="center" class="intro">
  <img alt="NGX Markdown Logo" src="https://raw.githubusercontent.com/fsegurai/ngx-markdown/main/public/ngx-markdown.png">
</p>

<p align="center" class="intro">
  <a href="https://github.com/fsegurai/ngx-markdown">
      <img src="https://img.shields.io/azure-devops/build/fsegurai/93779823-473d-4fb3-a5b1-27aaa1a88ea2/24/main?label=Build%20Status&"
          alt="Build Main Status">
  </a>
  <a href="https://github.com/fsegurai/ngx-markdown/releases/latest">
      <img src="https://img.shields.io/github/v/release/fsegurai/ngx-markdown"
          alt="Latest Release">
  </a>
  <br>
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/fsegurai/ngx-markdown">
  <img alt="Dependency status for repo" src="https://img.shields.io/librariesio/github/fsegurai/ngx-markdown">
  <a href="https://opensource.org/licenses/MIT">
    <img alt="GitHub License" src="https://img.shields.io/github/license/fsegurai/ngx-markdown">
  </a>
  <br>
  <img alt="Stars" src="https://img.shields.io/github/stars/fsegurai/ngx-markdown?style=square&labelColor=343b41"/> 
  <img alt="Forks" src="https://img.shields.io/github/forks/fsegurai/ngx-markdown?style=square&labelColor=343b41"/>
  <a href="https://www.npmjs.com/package/@fsegurai/ngx-markdown">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dt/@fsegurai/ngx-markdown">
  </a>
</p>

`@fsegurai/ngx-markdown` is an [Angular](https://angular.dev/) library that combines...

- [Marked](http://marked.js.org/) to parse Markdown to HTML
- [Prism.js](http://prismjs.com/) for language syntax highlight
- [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji support
- [KaTeX](https://katex.org/) for math expression rendering
- [Mermaid](https://mermaid-js.github.io/) for diagrams and charts visualization
- [Clipboard.js](https://clipboardjs.com/) to copy code blocks to the clipboard

### Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Renderer](#renderer)
- [Re-renderer Markdown](#re-render-markdown)
- [Syntax highlight](#syntax-highlight)
- [Demo application](#demo-application)
- [License](#license)

## Installation

### @fsegurai/ngx-markdown

To add `@fsegurai/ngx-markdown` along with the required marked library to your `package.json` use the following commands.

```bash
npm install @fsegurai/ngx-markdown marked@^15.0.12 --save
```

### Syntax highlighting

> :bell: Syntax highlight is **optional**, skip this step if you are not planning to use it

To add [Prism.js](http://prismjs.com/) library to your `package.json` use the following command.

```bash
npm install prismjs@^1.30.0 --save
```

To activate [Prism.js](http://prismjs.com/) syntax highlight, you will need to include...

- prism.js core library - `node_modules/prismjs/prism.js` file
- a highlight CSS theme - from `node_modules/prismjs/themes` directory
- desired code language syntax files - from `node_modules/prismjs/components` directory

_Additional themes can be found by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example._

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-csharp.min.js", # c-sharp language syntax
+ "node_modules/prismjs/components/prism-css.min.js" # css language syntax
]
```

#### Line Numbers plugin

To use the [line numbers plugin](http://prismjs.com/plugins/line-numbers/) that shows line numbers in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-numbers` directory to your application:

- CSS styling for line numbers - `prism-line-numbers.css`
- line numbers plugin script - `prism-line-numbers.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineNumbers` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

Additionally, you can use `start` input property to specify the offset number for the first display line.

```html
<markdown
  [lineNumbers]="true"
  [start]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Line Highlight plugin

To use the [line highlight plugin](http://prismjs.com/plugins/line-highlight/) that highlights specific lines and/or line ranges in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-highlight` directory to your application:

- CSS styling for line highlight - `prism-line-highlight.css`
- line highlight plugin script - `prism-line-highlight.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineHighlight` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.

```html
<markdown
  [lineHighlight]="true"
  [line]="'6, 10-16'"
  [lineOffset]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Command Line Plugin

To use the [command line plugin](https://prismjs.com/plugins/command-line/) that displays a command line with a prompt and, optionally, the output/response from the commands, you will need to include the following files from `prismjs/plugins/command-line` directory to your application:

- CSS styling for command line - `prism-command-line.css`
- command line plugin script - `prism-command-line.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.css"
],
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `commandLine` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static Markdown.

For a server command line, specify the user and host names using the `user` and `host` input properties. The resulting prompt displays a `#` for the root user and `$` for all other users. For any other command line, such as a Windows prompt, you may specify the entire prompt using the `prompt` input property.

You may also specify the lines to be presented as output (no prompt and no highlighting) through the `output` property in the following simple format:

- A single number refers to the line with that number
- Ranges are denoted by two numbers, separated with a hyphen (-)
- Commas separate multiple line numbers or ranges
- Whitespace is allowed anywhere and will be stripped off

```html
<markdown
  [commandLine]="true"
  [user]="'chris'"
  [host]="'remotehost'"
  [output]="'2, 4-8'"
  [src]="'path/to/file.bash'">
</markdown>
```

Optionally, to automatically present some lines as output without providing the line numbers, you can prefix those lines with any string and specify the prefix using the `filterOutput` input property. For example, `[filterOutput]="'(out)'"` will treat lines beginning with `(out)` as output and remove the prefix.

```html
<markdown
  [commandLine]="true"
  [prompt]="'PS C:\Users\Chris>'"
  [filterOutput]="'(out)'">
  ```PowerShell
  Get-Date
  (out)
  (out)Sunday, November 7, 2021 8:19:21 PM
  (out)
  `​``
</markdown>
```

### Emoji support

> :bell: Emoji support is **optional**, skip this step if you are not planning to use it

To add [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) library to your `package.json` use the following command.

```bash
npm install emoji-toolkit@^9.0.1 --save
```

To activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji support, you will need to include...

- Emoji-Toolkit library - `node_modules/emoji-toolkit/lib/js/joypixels.min.js`

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/emoji-toolkit/lib/js/joypixels.min.js",
]
```

#### Emoji plugin

Using `markdown` component and/or directive, you will be able to use the `emoji` property to activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) plugin that converts emoji shortnames such as `:heart:` to native Unicode emojis.

```html
<markdown [emoji]="true">
  I :heart: @fsegurai/ngx-markdown
</markdown>
```

> :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_.

### Math rendering

> :bell: Math rendering is **optional**, skip this step if you are not planning to use it

To add [KaTeX](https://katex.org/) library to your `package.json` use the following command.

```bash
npm install katex@^0.16.22 --save
```

To activate [KaTeX](https://katex.org/) math rendering, you will need to include...

- KaTex JavaScript library - `node_modules/katex/dist/katex.min.js` file
- KaTex Auto-Render extension - `node_modules/katex/dist/contrib/auto-render.min.js,` file
- KaTex CSS customization - `node_modules/katex/dist/katex.min.css` file

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/katex/dist/katex.min.css"
],
"scripts": [
+ "node_modules/katex/dist/katex.min.js",
+ "node_modules/katex/dist/contrib/auto-render.min.js",
]
```

#### KaTeX plugin

Using `markdown` component and/or directive, you will be able to use the `katex` property to activate [KaTeX](https://katex.org/) plugin that renders mathematical expression to HTML.

```html
<markdown
  [katex]="true"
  [src]="path/to/file.md">
</markdown>
```

Optionally, you can use `katexOptions` property to specify both the [KaTeX options](https://katex.org/docs/options.html) and the [KaTeX Auto-Render options](https://katex.org/docs/autorender.html#api).

```typescript
import {KatexOptions} from '@fsegurai/ngx-markdown';

public options: KatexOptions = {
  displayMode: true,
  throwOnError: false,
  errorColor: '#cc0000',
  delimiters: [...],
  ...
};
```

```html
<markdown
  [katex]="true"
  [katexOptions]="options"
  [src]="path/to/file.md">
</markdown>
```

> :blue_book: Follow official [KaTeX options](https://katex.org/docs/options.html) and [KaTeX Auto-Render options](https://katex.org/docs/autorender.html#api) documentation for more details on the available options.

### Diagrams tool

> :bell: Diagram support is **optional**, skip this step if you are not planning to use it

To add [Mermaid](https://mermaid-js.github.io/) library to your `package.json` use the following command.

```bash
npm install mermaid@^11.6.0 --save
```

To activate [Mermaid](https://mermaid-js.github.io/) diagramming and charting tool, you will need to include...

- Mermaid JavaScript library - `node_modules/mermaid/dist/mermaid.min.js` file

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/mermaid/dist/mermaid.min.js",
]
```

#### Mermaid plugin

Using `markdown` component and/or directive, you will be able to use the `mermaid` property to activate [Mermaid](https://mermaid-js.github.io/) plugin that renders Markdown-inspired text definitions to create and modify diagrams dynamically.

```html
<markdown
  [mermaid]="true"
  [src]="path/to/file.md">
</markdown>
```

#### Global configuration
You can provide a global configuration for mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) to use across your application with the `mermaidOptions` in the `MarkdownModuleConfig` either with `provideMarkdown` provide-function for standalone components or `MarkdownModule.forRoot()` for module configuration.
##### Using the `provideMarkdown` function
```typescript
provideMarkdown({
  mermaidOptions: {
    provide: MERMAID_OPTIONS,
    useValue: {
      darkMode: true,
      look: 'handDrawn',
      ...
    },
  },
}),
```
##### Using the `MarkdownModule` import
```typescript
MarkdownModule.forRoot({
  mermaidOptions: {
    provide: MERMAID_OPTIONS,
    useValue: {
      darkMode: true,
      look: 'handDrawn',
      ...
    },
  },
}),
```
#### Component configuration
Additionally, you can specify mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) on a component directly using `mermaidOptions` property.

```typescript
import {MermaidAPI} from '@fsegurai/ngx-markdown';

public options: MermaidAPI.MermaidConfig = {
  darkMode: true,
  look: 'handDrawn',
  ...
};
```

```html
<markdown
  [mermaid]="true"
  [mermaidOptions]="options"
  [src]="'path/to/file.md'">
</markdown>
```

> :blue_book: Follow official [Mermaid](https://mermaid-js.github.io/) documentation for more details on diagrams and charts syntax.

### Copy-to-clipboard

> :bell: Copy-to-clipboard support is **optional**, skip this step if you are not planning to use it

To add [Clipboard](https://clipboardjs.com/) library to your `package.json` use the following command.

```bash
npm install clipboard@^2.0.11 --save
```

To activate [Clipboard](https://clipboardjs.com/) allowing copy-to-clipboard, you will need to include...

- Clipboard JavaScript library - `node_modules/clipboard/dist/clipboard.min.js` file

If you are using [Angular CLI](https://cli.angular.dev/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/clipboard/dist/clipboard.min.js",
]
```

#### Clipboard plugin

Using `markdown` component and/or directive, you will be able to use the `clipboard` property to activate [Clipboard](https://clipboardjs.com/) plugin that enable copy-to-clipboard for code block from a single click.

```html
<markdown
  [clipboard]="true"
  [src]="path/to/file.md">
</markdown>
```

#### Default button

The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

#### Customize the button toolbar

The clipboard button is placed inside a wrapper element that can be customized using the `.markdown-clipboard-toolbar` CSS selector in your global `styles.css/scss` file.

This allows overriding the default positioning of the clipboard button and play with the visibility of the button using the `.hover` CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code block element.

#### Customize default button

To customize the default button styling, use the `.markdown-clipboard-button` CSS selector in your global `styles.css/scss` file. You can also customize the "copied" state happening after the button is clicked using the `.copied` CSS selector.

#### Using global configuration

You can provide a custom component to use globally across your application with the `clipboardOptions` in the `MarkdownModuleConfig` either with `provideMarkdown` provide-function for standalone components or `MarkdownModule.forRoot()` for module configuration.

##### Using the `provideMarkdown` function

```typescript
provideMarkdown({
  clipboardOptions: {
    provide: CLIPBOARD_OPTIONS,
    useValue: {
      buttonComponent: ClipboardButtonComponent,
    },
  },
})
```

##### Using the `MarkdownModule` import

```typescript
MarkdownModule.forRoot({
  clipboardOptions: {
    provide: CLIPBOARD_OPTIONS,
    useValue: {
      buttonComponent: ClipboardButtonComponent,
    },
  },
}),
```

#### Using a component

You can also provide your custom component using the `clipboardButtonComponent` input property when using the `clipboard` directive.

```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'app-clipboard-button',
  template: `<button (click)="onClick()">Copy</button>`,
})
export class ClipboardButtonComponent {
  onClick() {
    alert('Copied to clipboard!');
  }
}
```

```typescript
import {ClipboardButtonComponent} from './clipboard-button-component';

@Component({...})
export class ExampleComponent {
  readonly clipboardButton = ClipboardButtonComponent;
}
```

```html
<markdown
  [clipboard]="true"
  [clipboardButtonComponent]="clipboardButton">
</markdown>
```

#### Using ng-template

Alternatively, the `clipboard` directive can be used in conjunction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.

```html
<ng-template #buttonTemplate>
  <button (click)="onCopyToClipboard()">...</button>
</ng-template>

<markdown
  [clipboard]="true"
  [clipboardButtonTemplate]="buttonTemplate">
</markdown>
```

> :blue_book: Refer to the `@fsegurai/ngx-markdown` [clipboard plugin demo](https://fsegurai.github.io/ngx-markdown/plugins#clipboard) for live examples.

## Configuration

The `@fsegurai/ngx-markdown` library can be used either with the standalone components or with modules configuration. Please follow the configuration section that matches your application.

### Standalone components

Use the `provideMarkdown` provide-function in your application configuration `ApplicationConfig` to be able to provide the `MarkdownComponent` and `MarkdownPipe` to your standalone components and/or inject the `MarkdownService`.

```diff
import { NgModule } from '@angular/core';
+ import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
+   provideMarkdown(),
  ],
};
```

### Modules configuration

You must import `MarkdownModule` inside your main application module (usually named AppModule) with `forRoot` to be able to use the `markdown` component, directive, pipe and/or `MarkdownService`.

```diff
import { NgModule } from '@angular/core';
+ import { MarkdownModule } from '@fsegurai/ngx-markdown';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
+   MarkdownModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

Use `forChild` when importing `MarkdownModule` into other application modules to allow you to use the same parser configuration across your application.

```diff
import { NgModule } from '@angular/core';
+ import { MarkdownModule } from '@fsegurai/ngx-markdown';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
+   MarkdownModule.forChild(),
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
```

### Remote file configuration

If you want to use the `[src]` attribute to directly load a remote file, to keep only one instance of `HttpClient` and avoid issues with interceptors, you also have to provide `HttpClient`:

##### Using the `provideMarkdown` function

```diff
providers: [
+  provideHttpClient(),
+  provideMarkdown({ loader: HttpClient }),
],
```

##### Using the `MarkdownModule` import

```diff
imports: [
+  HttpClientModule,
+  MarkdownModule.forRoot({ loader: HttpClient }),
],
```

#### Sanitization

As of `@fsegurai/ngx-markdown@v19.0.0` **sanitization is enabled by default** and uses Angular `DomSanitizer` with `SecurityContext.HTML` to avoid XSS vulnerabilities. The `SecurityContext` level can be changed using the `sanitize` property when configuring `MarkdownModule`.

##### Using the `provideMarkdown` function

```typescript
import {SecurityContext} from '@angular/core';

// enable default sanitization
provideMarkdown()

// turn off sanitization
provideMarkdown({
  sanitize: SecurityContext.NONE
})
```

##### Using the `MarkdownModule` import

```typescript
import {SecurityContext} from '@angular/core';

// enable default sanitization
MarkdownModule.forRoot()

// turn off sanitization
MarkdownModule.forRoot({
  sanitize: SecurityContext.NONE
})
```

> :blue_book: Follow [Angular DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#sanitize) documentation for more information on sanitization and security contexts.

You can bypass sanitization using the Markdown component, directive or pipe using the `disableSanitizer` option as follows:

```html
<!-- disable sanitizer using a Markdown component -->
<markdown
  [data]="markdown"
  [disableSanitizer]="true">
</markdown>

<!-- disable sanitizer using a Markdown directive -->
<div markdown
     [data]="markdown"
     [disableSanitizer]="true">
</div>

<!-- disable sanitizer using markdown pipe -->
<div [innerHTML]="markdown | markdown : { disableSanitizer: true } | async"></div>
```

#### MarkedOptions

Optionally, markdown parsing can be configured using [MarkedOptions](https://marked.js.org/#/USING_ADVANCED.md#options) that can be provided with the `MARKED_OPTIONS` injection token via the `markedOptions` property of the `forRoot` method of `MarkdownModule`.

##### Using the `provideMarkdown` function

```typescript
// imports
import {MARKED_OPTIONS, provideMarkdown} from '@fsegurai/ngx-markdown';

// using default options
provideMarkdown(),

// using specific options with ValueProvider and passing HttpClient
  provideMarkdown({
    markedOptions: {
      provide: MARKED_OPTIONS,
      useValue: {
        gfm: true,
        breaks: false,
        pedantic: false,
      },
    },
  }),
```

##### Using the `MarkdownModule` import

```typescript
// imports
import {MarkdownModule, MARKED_OPTIONS} from '@fsegurai/ngx-markdown';

// using default options
MarkdownModule.forRoot(),

// using specific options with ValueProvider and passing HttpClient
  MarkdownModule.forRoot({
    loader: HttpClient, // optional, only if you use [src] attribute
    markedOptions: {
      provide: MARKED_OPTIONS,
      useValue: {
        gfm: true,
        breaks: false,
        pedantic: false,
      },
    },
  }),
```

#### MarkedOptions.renderer

`MarkedOptions` also exposes the `renderer` property which allows you to override token rendering for your whole application.

The example uses a factory function and overrides the default blockquote token rendering by adding a CSS class for custom styling when using Bootstrap CSS:

```typescript
import {MARKED_OPTIONS, MarkedOptions, MarkedRenderer, MarkedToken} from '@fsegurai/ngx-markdown';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = ({ text }: MarkedToken.Blockquote) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}
```

##### Using the `provideMarkdown` function

```typescript
// using specific option with FactoryProvider
provideMarkdown({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
  },
}),
```

##### Using the `MarkdownModule` import

```typescript
// using specific option with FactoryProvider
MarkdownModule.forRoot({
  markedOptions: {
    provide: MARKED_OPTIONS,
    useFactory: markedOptionsFactory,
  },
}),
```

### Marked extensions

When configuring the `MarkdownModule`, you can provide [marked extensions](https://marked.js.org/using_advanced#extensions) using the `MARKED_EXTENSION` injection token via the `markedExtensions` property, which accepts an array of providers and supports Angular dependency injection.

##### Using the `provideMarkdown` function

```typescript
import {gfmHeadingId} from 'marked-gfm-heading-id';

providemarkdown({
    markedExtensions: [
        {
            provide: MARKED_EXTENSIONS,
            useFactory: gfmHeadingId,
            multi: true,
        },
        {
            provide: MARKED_EXTENSIONS,
            useFactory: myExtensionFactory,
            deps: [SomeService],
            multi: true,
        },
    ],
}),
```

##### Using the `MarkdownModule` import

```typescript
import {gfmHeadingId} from 'marked-gfm-heading-id';

MarkdownModule.forRoot({
    markedExtensions: [
        {
            provide: MARKED_EXTENSIONS,
            useFactory: gfmHeadingId,
            multi: true,
        },
        {
            provide: MARKED_EXTENSIONS,
            useFactory: myExtensionFactory,
            deps: [SomeService],
            multi: true,
        },
    ],
}),
```

## Usage

`@fsegurai/ngx-markdown` provides different approaches to help you parse Markdown to your application depending on your needs.

> :bulb: As of Angular 6, the template compiler strips whitespace by default. Use `ngPreserveWhitespaces` directive to preserve whitespaces such as newlines in order for the markdown-formatted content to render as intended.  
https://angular.io/api/core/Component#preserveWhitespaces

### Component

You can use `markdown` component to either parse static Markdown directly from your HTML markup, load the content from a remote URL using `src` property or bind a variable to your component using `data` property. You can get a hook on a load complete using `load` output event property, on loading error using `error` output event property or when parsing is completed using `ready` output event property.

```html
<!-- static markdown -->
<markdown ngPreserveWhitespaces>
  # Markdown
</markdown>

<!-- loaded from remote url -->
<markdown
  [src]="'path/to/file.md'"
  (load)="onLoad($event)"
  (error)="onError($event)">
</markdown>

<!-- variable binding -->
<markdown
  [data]="markdown"
  (ready)="onReady()">
</markdown>

<!-- inline parser, omitting rendering top-level paragraph -->
<markdown
  [data]="markdown"
  [inline]="true">
</markdown>
```

### Directive

The same way the component works, you can use `markdown` directive to achieve the same thing.

```html
<!-- static markdown -->
<div markdown ngPreserveWhitespaces>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown
     [src]="'path/to/file.md'"
     (load)="onLoad($event)"
     (error)="onError($event)">
</div>

<!-- variable binding -->
<div markdown
     [data]="markdown"
     (ready)="onReady()">
</div>

<!-- inline parser, omitting rendering top-level paragraph -->
<div markdown
     [data]="markdown"
     [inline]="true">
</div>
```

### Pipe

Using `markdown` pipe to transform Markdown to HTML allow you to chain pipe transformations and will update the DOM when value changes. It is important to note that, because the `marked` parsing method returns a `Promise`, it requires the use of the `async` pipe.

```html
<!-- chain `language` pipe with `markdown` pipe to convert typescriptMarkdown variable content -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown | async"></div>
```

The `markdown` pipe allow you to use all the same plugins as the component by providing the option parameters.

```html
<!-- provide options parameters to activate plugins or for configuration -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown : { emoji: true, inline: true } | async"></div>
```

This is the `MarkdownPipeOptions` parameters interface, those options are the same as the ones available for the `markdown` component:

```typescript
export interface MarkdownPipeOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.MermaidConfig;
  markedOptions?: MarkedOptions;
  disableSanitizer?: boolean;
}
```

### Service

You can use `MarkdownService` to have access to Markdown parsing, rendering and syntax highlight methods.

```typescript
import {Component, OnInit} from '@angular/core';
import {MarkdownService} from '@fsegurai/ngx-markdown';

@Component({...})
export class ExampleComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {
  }

  ngOnInit() {
    // outputs: <p>I am using <strong>markdown</strong>.</p>
    console.log(this.markdownService.parse('I am using __markdown__.'));
  }
}
```

## Renderer

Tokens can be rendered in a custom manner by either...

- providing the `renderer` property with the `MarkedOptions` when importing `MarkdownModule.forRoot()` into your main application module (see [Configuration](#markedoptionsrenderer) section)
- using `MarkdownService` exposed `renderer`

Here is an example of overriding the default heading token rendering through `MarkdownService` by adding an embedded anchor tag like on GitHub:

```typescript
import {Component, OnInit} from '@angular/core';
import {MarkdownService, MarkedToken} from '@fsegurai/ngx-markdown';

@Component({
  selector: 'app-example',
  template: '<markdown># Heading</markdown>',
})
export class ExampleComponent implements OnInit {
  constructor(private markdownService: MarkdownService) {
  }

  ngOnInit() {
      this.markdownService.renderer.heading = ({text, depth}: MarkedToken.Heading): string => {
      const parsedText = this.markdownService.parseInline(text); // Parse inline Markdown text to HTML
      const escapedText = text
              .toLowerCase()
              .split(/\W+/)
              .filter(Boolean)
              .join('-'); // Remove special characters and join words with hyphens. E.g. "Hello, World!" -> "hello-world"
      return '<h' + depth + '>' +
        '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
        '<span class="header-link"></span>' +
        '</a>' + parsedText +
        '</h' + depth + '>';
    };
  }
}
```

This code will output the following HTML:

```html
<h1>
  <a class="anchor" href="#heading">
    <span class="header-link"></span>
  </a>
  Heading
</h1>
```

> :blue_book: Follow official [marked.renderer](https://marked.js.org/#/USING_PRO.md#renderer) documentation for the list of tokens that can be overridden.

## Re-render Markdown

In some situations, you might need to re-render Markdown after making changes. If you've updated the text, this would be done automatically, however, if the changes are internal to the library such as rendering options, you will need to inform the `MarkdownService` that it needs to update.

To do so, inject the `MarkdownService` and call the `reload()` function as shown below.

```typescript
import {MarkdownService} from '@fsegurai/ngx-markdown';

constructor(private markdownService: MarkdownService){
}

update(){
  this.markdownService.reload();
}
```

> :blue_book: Refer to the `@fsegurai/ngx-markdown` [re-render demo](https://fsegurai.github.io/ngx-markdown/rerender) for a live example.

## Syntax highlight

When using static Markdown, you are responsible to provide the code block with a related language.

```diff
<markdown ngPreserveWhitespaces>
+  ```typescript
    const myProp: string = 'value';
+  ```

When using remote URL `@fsegurai/ngx-markdown` will use the file extension to automatically resolve the code language.

```html
<!-- will use HTML highlights -->
<markdown [src]="'path/to/file.html'"></markdown>

<!-- will use php highlights -->
<markdown [src]="'path/to/file.php'"></markdown>
```

When using variable binding you can optionally use `language` pipe to specify the language of the variable content (default value is Markdown when pipe is not used).

```html
<markdown [data]="markdown | language : 'typescript'"></markdown>
```

## Demo application

To see the components in action, check out the [[DEMO]](https://fsegurai.github.io/ngx-markdown).

To set up the demo locally, follow the next steps:

```bash
git clone https://github.com/fsegurai/ngx-markdown.git
bun install
bun start
```

This will serve the application locally at [http://localhost:4200](http://localhost:4200).

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
