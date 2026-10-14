```accordion
title: Click to expand
expanded: true
---
This is the content inside the accordion.

- It can include **bold text**
- Or _italic text_
- Or [links](https://github.com/fsegurai/ngx-markdown)
```

```accordion
title: Pricing
group: faq
---
Accordions sharing a `group` close each other (native `<details name>`).
```

```accordion
title: Support
group: faq
---
Only one accordion of the `faq` group is open at a time.
```

````accordion
title: Nested content
---
> [!TIP]
> Other extensions render inside an accordion.

```javascript
console.log('Code too');
```
````
