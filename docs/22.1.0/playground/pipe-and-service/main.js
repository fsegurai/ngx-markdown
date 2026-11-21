import '@angular/compiler';
import { AsyncPipe } from '@angular/common';
import { Component, inject, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MarkdownPipe, MarkdownService, provideMarkdown } from '@fsegurai/ngx-markdown';

const notes = window.playgroundFiles['input.md'].split('\n---\n');

const App = Component({
  selector: 'app-root',
  imports: [AsyncPipe, MarkdownPipe],
  template: `
    <header>
      <h1>Pipe and MarkdownService</h1>
      <button type="button" (click)="next()">Next note ({{ index() + 1 }}/{{ notes.length }})</button>
    </header>
    <main>
      <section>
        <h2 class="panel-title">markdown pipe</h2>
        <!-- The pipe returns a Promise<SafeHtml>, so it is followed by async -->
        <article class="note" [innerHTML]="note() | markdown | async"></article>
      </section>
      <section>
        <h2 class="panel-title">MarkdownService.parse()</h2>
        <h3 class="panel-subtitle">Headings (onHeadings)</h3>
        <ul class="toc">
          @for (heading of headings(); track $index) {
            <li [style.padding-left.px]="(heading.level - 1) * 12">{{ heading.text }} <code>#{{ heading.id }}</code></li>
          }
        </ul>
        <h3 class="panel-subtitle">Sanitized HTML</h3>
        <pre class="html">{{ html() }}</pre>
      </section>
    </main>
  `,
})(
  class {
    markdownService = inject(MarkdownService);
    notes = notes;
    index = signal(0);
    note = signal(notes[0]);
    html = signal('');
    headings = signal([]);

    constructor() {
      this.parse();
    }

    next() {
      this.index.update((i) => (i + 1) % notes.length);
      this.note.set(notes[this.index()]);
      this.parse();
    }

    // parse() returns a string or a Promise, so it is awaited either way. The default sanitizer removes the heading
    // ids from the HTML (Angular warns "sanitizing HTML stripped some content"), but onHeadings still receives them.
    async parse() {
      const html = await this.markdownService.parse(this.note(), {
        headingIds: true,
        onHeadings: (headings) => this.headings.set(headings),
      });
      // The sanitizer encodes line breaks as &#10;, so they are turned back into new lines for display.
      this.html.set(html.replaceAll('&#10;', '\n').trim());
    }
  },
);

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection(), provideMarkdown()],
}).then(() => console.log('ngx-markdown pipe and service sample ready: press "Next note"'));
