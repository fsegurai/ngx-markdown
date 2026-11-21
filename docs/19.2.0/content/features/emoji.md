---
label: Emoji
description: "Convert emoji shortcodes such as :heart: to Unicode with emoji-toolkit."
order: 12
tags: [ "features", "plugins" ]
keywords: [ "emoji-toolkit", "joypixels", "shortcodes" ]
---

# Emoji

```html
<markdown emoji>
  I :heart: @fsegurai/ngx-markdown
</markdown>
```

Needs `node_modules/emoji-toolkit/lib/js/joypixels.min.js` as a global script. Without it, parsing throws
`errorJoyPixelsNotLoaded`.

## How it works

Before marked runs, the whole Markdown string goes through `joypixels.shortnameToUnicode()`. That includes code spans,
code blocks and link URLs, so `:shortcodes:` inside code are converted too.

On the server, conversion is skipped and the shortcodes stay as text.

The [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) lists the shortnames.

With the pipe: `text | markdown : { emoji: true } | async`.
