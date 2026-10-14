---
label: Emoji
description: "Convert emoji shortcodes such as :heart: to Unicode with Emoji-Toolkit and the withEmoji() plugin."
order: 7
tags: [ "features", "plugins", "emoji" ]
keywords: [ "withEmoji", "emoji-toolkit", "joypixels", "shortcodes" ]
---

# Emoji

Needs the Emoji-Toolkit script (global `joypixels`) and the feature, which has no options:

```typescript
provideMarkdown({ plugins: [withEmoji()] });
```

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
- In the browser without `joypixels`, the parse fails with `ERROR_JOYPIXELS_NOT_LOADED`. On the server the
  shortcodes are left as they are.
