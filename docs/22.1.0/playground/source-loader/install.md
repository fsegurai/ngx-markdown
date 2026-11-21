# Installation

Provide your own loader to serve `src` from anywhere (a cache, an API, a bundle):

```typescript
import { MARKDOWN_SOURCE_LOADER, provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig = {
  providers: [
    provideMarkdown(),
    { provide: MARKDOWN_SOURCE_LOADER, useValue: (url: string) => loadText(url) },
  ],
};
```

Or keep `HttpClient` and its interceptors: `provideMarkdown({ loader: HttpClient })`.

[Back to the welcome page](intro.md)
