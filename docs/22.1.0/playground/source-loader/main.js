// A custom MARKDOWN_SOURCE_LOADER serves the `src` pages from the .md files of this sample (22.1.0), and a `baseUrl`
// resolveUrl hook decides the URL of each link and image while the page is parsed.
import '@angular/compiler';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  MARKDOWN_SOURCE_LOADER,
  MarkdownComponent,
  MarkdownSourceError,
  provideMarkdown,
} from '@fsegurai/ngx-markdown';
import { Observable } from 'rxjs';

const files = window.playgroundFiles;
const pages = ['docs/intro.md', 'docs/install.md', 'docs/missing.md'];

// The loader receives the `src` as written and returns an Observable of its text. Unsubscribing (a new `src`, or the
// component destroyed) cancels the request: here, the simulated network delay.
function inMemoryLoader(url) {
  return new Observable((subscriber) => {
    const timer = setTimeout(() => {
      const text = files[url.replace(/^docs\//, '')];
      if (text === undefined) {
        subscriber.error(new MarkdownSourceError(url, 404, 'Not Found', `No page at "${url}"`));
      } else {
        subscriber.next(text);
        subscriber.complete();
      }
    }, 300);
    return () => clearTimeout(timer);
  });
}

const App = Component({
  selector: 'app-root',
  imports: [MarkdownComponent],
  template: `
    <header>
      <h1>Source loader and resolveUrl</h1>
      <label>
        Page
        <select [value]="src()" (change)="open($event.target.value)">
          @for (page of pages; track page) {
            <option [value]="page">{{ page }}</option>
          }
        </select>
      </label>
      <span class="status">{{ status() }}</span>
    </header>
    <main>
      <section (click)="onClick($event)">
        <h2 class="panel-title">&lt;markdown [src]&gt;</h2>
        <!-- A failed src keeps the previous content in the element, so it is hidden while the error shows -->
        @if (error()) {
          <p class="error">{{ error() }}</p>
        }
        <!-- The object literal keeps its identity while resolveUrl does, so it does not re-render the page -->
        <markdown
          class="page"
          [class.hidden]="error()"
          [src]="src()"
          [plugins]="{ baseUrl: { resolveUrl } }"
          (load)="onLoad()"
          (error)="onError($event)" />
      </section>
      <section>
        <h2 class="panel-title">resolveUrl(url, context)</h2>
        <table>
          <thead>
            <tr><th>kind</th><th>written</th><th>resolved</th></tr>
          </thead>
          <tbody>
            @for (row of rows(); track $index) {
              <tr>
                <td>{{ row.kind }}</td>
                <td><code>{{ row.url }}</code></td>
                <td><code>{{ row.resolved }}</code></td>
              </tr>
            } @empty {
              <tr><td colspan="3">No link or image on this page.</td></tr>
            }
          </tbody>
        </table>
      </section>
    </main>
  `,
})(
  class {
    pages = pages;
    src = signal(pages[0]);
    status = signal('Loading…');
    error = signal('');
    rows = signal([]);
    // The decisions of the current parse, by kind and URL (a URL written twice is listed once)
    decisions = new Map();

    // Called during the parse for every link href and image src, absolute URLs and fragments included. It returns the
    // new URL, `{ href, attrs }` (attributes for the tag), or undefined to leave the URL as written.
    resolveUrl = (url, { kind }) => {
      const resolution = this.decide(url, kind);
      const resolved = typeof resolution === 'string' ? resolution : (resolution?.href ?? url);
      const attrs = resolution && typeof resolution === 'object' ? ` ${JSON.stringify(resolution.attrs)}` : '';
      this.decisions.set(`${kind} ${url}`, { kind, url, resolved: `${shorten(resolved)}${attrs}` });
      return resolution;
    };

    decide(url, kind) {
      // A page of these docs: a fragment the click handler below turns into a new `src`
      if (kind === 'link' && /^[\w-]+\.md$/.test(url)) return `#docs/${url}`;
      // An image of these docs: a data: URL built from the file of this sample
      const image = kind === 'image' && url.match(/^images\/([\w-]+\.svg)$/);
      if (image && files[image[1]]) return `data:image/svg+xml,${encodeURIComponent(files[image[1]])}`;
      // An external link: same URL, opened in a new tab (Angular's sanitizer keeps target and rel)
      if (kind === 'link' && /^https?:\/\//.test(url)) {
        return { href: url, attrs: { target: '_blank', rel: 'noopener noreferrer' } };
      }
      return undefined;
    }

    open(page) {
      this.decisions.clear();
      this.rows.set([]);
      this.error.set('');
      this.status.set('Loading…');
      this.src.set(page);
    }

    onClick(event) {
      const link = event.target.closest('a[href^="#docs/"]');
      if (!link) return;
      event.preventDefault();
      this.open(link.getAttribute('href').slice(1));
    }

    onLoad() {
      this.rows.set([...this.decisions.values()]);
      this.status.set(`Loaded ${this.src()}`);
    }

    onError(error) {
      this.error.set(error.message);
      this.status.set(error instanceof MarkdownSourceError ? `${error.status} ${error.statusText}` : 'Error');
    }
  },
);

function shorten(url) {
  return url.length > 48 ? `${url.slice(0, 45)}…` : url;
}

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    provideMarkdown(),
    // Replaces the default fetch loader for every `src` of the app
    { provide: MARKDOWN_SOURCE_LOADER, useValue: inMemoryLoader },
  ],
}).then(() => console.log('ngx-markdown source loader sample ready: follow a link or pick a page'));
