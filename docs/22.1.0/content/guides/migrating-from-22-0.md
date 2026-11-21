---
label: Migrating from 22.0 to 22.1
description: Upgrade @fsegurai/ngx-markdown from 22.0 to 22.1.0, where src loads with fetch by default and HttpClient is opt-in.
order: 1
tags: [ "guides", "migration" ]
keywords: [ "upgrade", "fetch", "HttpClient", "MarkdownSourceError", "interceptors" ]
---

# Migrating from 22.0 to 22.1

22.1.0 keeps Angular `^22` and `marked ^18`. The library's major version follows Angular's, so one behavior change
ships in this minor release: **`src` loads with `fetch` by default**, and `HttpClient` is opt-in. Apps that only use
`data`, projected content or the pipe have nothing to change.

## Checklist

- [ ] Your app relies on HTTP interceptors for `src` (auth headers, base URLs)? Add `loader: HttpClient`.
- [ ] Your `(error)` handler checks for `HttpErrorResponse`? Add `loader: HttpClient`, or handle `MarkdownSourceError`.
- [ ] You prerender or server-render a relative `src` without an HTTP request URL? Use an absolute URL, or add
      `loader: HttpClient`.
- [ ] You use `@fsegurai/marked-extended-*`? Move to 18.1.0.

## Keep `HttpClient` for `src` (one line)

```typescript
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideMarkdown } from '@fsegurai/ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])), // optional: configures HttpClient
    provideMarkdown({ loader: HttpClient }),
  ],
};
```

This restores the 22.0 behavior: interceptors run, a failed request is an `HttpErrorResponse`, and `HttpClient`
handles relative URLs on the server. `HttpClient` is then back in your bundle.

## What changes with the default `fetch` loader

| Topic | 22.0 (`HttpClient`) | 22.1 (`fetch`, default) |
|-------|---------------------|-------------------------|
| HTTP interceptors | Run | Do not run |
| Error in `(error)` | `HttpErrorResponse` | `MarkdownSourceError` (`status`, `statusText`, `url`; `status` `0` for a network error, with `cause`) |
| Cancel | When `src` changes or the component is destroyed | Same (`AbortController`) |
| Relative `src` in the browser | Against the document base URL | Same |
| Relative `src` on the server | `HttpClient`'s handling | Against the request URL and the base href; without one, a `MarkdownSourceError` naming `loader: HttpClient` |
| Server → browser | `HttpClient` transfer cache | `TransferState`: hydration does not fetch the text again |
| SSR waits for the request | Yes | Yes (`PendingTasks`) |
| `HttpClient` in the startup bundle | Yes | No (−7.6 kB on a minimal app) |

## Handling `MarkdownSourceError`

```typescript
import { type MarkdownError, MarkdownSourceError } from '@fsegurai/ngx-markdown';

onError(error: MarkdownError): void {
  if (error instanceof MarkdownSourceError) {
    console.warn(`Could not load ${error.url}: ${error.status} ${error.statusText}`);
  }
}
```

`MarkdownError` is now `Error | MarkdownSourceError | HttpErrorResponse | string`.

## Your own loader

Provide `MARKDOWN_SOURCE_LOADER` (`(url) => Observable<string>`) to load the sources another way, e.g. from a cache
or a virtual file system:

```typescript
{ provide: MARKDOWN_SOURCE_LOADER, useValue: (url: string) => of(myFiles.get(url) ?? '') }
```

## Optional: adopt the new features

None of these is required to upgrade; see [What's New in 22.1.0](../getting-started/whats-new.md):

- Replace the `katex` / `joypixels` / `Prism` script tags with `withKatex({ loader })`, `withEmoji({ loader })` and
  `withPrism({ loader, languages, onLoad })`.
- Replace a hand-written DOMPurify `sanitize` function with `withDomPurify({ purify: () => import('dompurify') })`.
- Replace DOM link rewriting after `ready` with `[plugins]="{ baseUrl: { resolveUrl } }"`.
- Replace `marked-gfm-heading-id` with the `headingIds` input.
- With `@fsegurai/marked-extended-code` marking its own lines, pass `withPrism({ codeLineHighlight: 'skip' })`.
