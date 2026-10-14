export const playgroundDemo = `---
title: ngx-markdown playground
author: fsegurai
tags: [angular, markdown, signals]
---

## Welcome

Edit the Markdown on the left: the output re-renders as you type. The front-matter block above is stripped
(\`frontMatter\`) and shown in the **Front-matter** panel through \`(metadata)\`, every heading gets a slug \`id\`
(\`headingIds\`) and the \`h2\` headings build the side navigation through \`(headings)\`.

The **Events** panel logs the \`(copied)\`, \`(mermaidExported)\`, \`(imageClick)\` and \`(error)\` outputs.

## Images Section

Click an image to open it in the built-in viewer (\`lightbox\`), then use the arrow keys to browse them.

![Sunrise, a warm gradient](lightbox-sunrise.svg)

Like links, images also have a footnote style syntax

![Forest, a green gradient][forest]

With a reference later in the document defining the URL location:

[forest]: lightbox-forest.svg "Forest, from a reference"

![](lightbox-ocean.svg "Ocean, captioned from its title")

A linked image follows its link and is not opened in the viewer:

[![A linked image is not opened](lightbox-sunrise.svg)](https://github.com/fsegurai/ngx-markdown)

## Headings Section

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Horizontal Rules Section

---

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

Syntax highlighting, with a copy button (\`clipboard\`) that reports \`(copied)\`

\`\`\`typescript
const foo = (bar: number): number => bar + 1;

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

### [Math](https://katex.org)

Rendered while parsing (\`katex\`), so \`_\`, \`*\` and \`\\\` inside \`$…$\` stay math: $a_1 * b_2 = c_{1,2}$,
$x_{i} * y_{j}$ and $\\{ n \\in \\NN \\}$, while \\$5 stays a price.

$$
\\sum_{i=1}^n x_i^2 = \\frac{n(n+1)(2n+1)}{6}
$$

$$
\\sqrt{3x-1}+(1+x)^2
$$

$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$

### [Mermaid](https://mermaid.js.org/intro/getting-started.html)

Each diagram gets an export button (\`mermaidExport\`) that downloads its SVG and reports \`(mermaidExported)\`.

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

`;
