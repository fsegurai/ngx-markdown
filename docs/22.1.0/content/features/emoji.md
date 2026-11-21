---
label: Emoji
description: "Convert emoji shortcodes such as :heart: to Unicode with Emoji-Toolkit and the withEmoji() plugin."
order: 7
tags: [ "features", "plugins", "emoji" ]
keywords: [ "withEmoji", "emoji-toolkit", "joypixels", "shortcodes" ]
---

# Emoji

Needs Emoji-Toolkit (the global `joypixels` of its script, or a `loader`) and the feature:

```typescript
provideMarkdown({ plugins: [withEmoji()] }); // joypixels global
provideMarkdown({ plugins: [withEmoji({ loader: () => import('emoji-toolkit') })] }); // on demand (22.1.0)
```

With a `loader` (`EmojiOptions`), Emoji-Toolkit loads in the browser before the first parse emoji is enabled in (that
parse returns a Promise), once per loader, and again after a failed load; nothing is loaded on the server.

```html
<markdown emoji>
  I :heart: @fsegurai/ngx-markdown
</markdown>
```

| Converted | Left as written |
|-----------|-----------------|
| Text, link labels (`[label](url)`) | Code blocks, inline code, raw HTML, link URLs, autolinks |

- Shortcodes are looked up in `joypixels.emojiList`, with the same result as `joypixels.shortnameToUnicode`
  (alternate names, skin tones, flags). Unknown shortcodes stay as written.
- With `joypixels.ascii = true`, `shortnameToUnicode` itself is used, so ASCII smileys such as `:)` convert too.
- In the browser without `joypixels` (and without a `loader`), the parse fails with `ERROR_JOYPIXELS_NOT_LOADED`. On the server the
  shortcodes are left as they are.
