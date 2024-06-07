There are several ways to create links.

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on GitHub, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org

[1]: http://slashdot.org

[link text itself]: http://www.reddit.com

[I'm an Angular routerlink with page section](/routerLink:/syntax-highlight#language-pipe)

[I'm an Angular routerlink](/routerLink:/syntax-highlight)

[I'm a router link on the same page](/routerLink:/cheat-sheet#headers)

```html
<markdown src="/path/to/markdown.md" [routerLinkOptions]="{
  global: {
    queryParams: { key: 'value' },
  },
  paths: {
    '/path/to/page': {
      queryParams: { key: 'value' },
    }
  }
}">
</markdown>
```
