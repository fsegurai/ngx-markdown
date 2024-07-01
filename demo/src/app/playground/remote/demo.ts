export const playgroundDemo = `## Images

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
    A((Inicio)) --> B{¿Usuario es Administrador?}
    B -- Sí --> C[Módulo de Administración de Promociones]
    B -- No --> F{¿Se realiza una compra?}
    C --> |Crear Promoción| D[CP1 - Crear Promoción]
    C --> |Modificar Promoción| E[CP1 - Modificar Promoción]
    C --> |Activar/Desactivar Promoción| E
    C --> |Consultar Promoción| E
    D & E --> G((Fin))
    F -- Sí --> H[Módulo de Aplicación de Promociones]
    F -- No --> J{¿Generar reporte?}
    H --> |Verificar Promoción| I[CP2 - Aplicar Promoción]
    H --> |Calcular Premio| I
    H --> |Registrar Premio| I
    I --> G
    J -- Sí --> K[Módulo de Generación de Reportes]
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


  `;
