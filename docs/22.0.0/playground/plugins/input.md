## Syntax highlighting :sparkles:

```typescript
import { provideMarkdown, withPrism } from '@fsegurai/ngx-markdown';

export const appConfig = {
  providers: [provideMarkdown({ plugins: [withPrism()] })],
};
```

## Emoji :tada:

I :heart: Markdown, :rocket: fast and :white_check_mark: tested.

## Math

Inline: the area of a circle is $A = \pi r^2$.

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
