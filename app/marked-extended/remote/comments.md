This text has :::comment{author="Alice" type="note"}a simple note::: embedded, and a question:
:::comment{type="question" author="Bob"}should we use the v2 API here?:::

```comments
id: comment-review
author: Dana
type: review
status: open
priority: high
---
This paragraph needs **fact-checking**.

- Verify the statistics
- Add source citations
```

```comments
author: Grace
type: suggestion
replyTo: comment-review
---
Replying to the review above: the statistics are updated.
```
