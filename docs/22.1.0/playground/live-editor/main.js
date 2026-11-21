// Angular runs here without a build step: the JIT compiler compiles the templates in the browser.
import '@angular/compiler';
import { Component, computed, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MarkdownComponent, provideMarkdown } from '@fsegurai/ngx-markdown';

// The editor starts with the content of the input.md tab.
const initial = window.playgroundFiles['input.md'];

// Plain JS: the @Component decorator is applied by hand.
const App = Component({
  selector: 'app-root',
  imports: [MarkdownComponent],
  template: `
    <header>
      <h1>Live Markdown editor</h1>
      <span class="meta">{{ words() }} words &middot; {{ renders() }} renders</span>
      <button type="button" (click)="reset()">Reset</button>
    </header>
    <main>
      <textarea
        aria-label="Markdown source"
        spellcheck="false"
        [value]="source()"
        (input)="source.set($any($event.target).value)"></textarea>
      <!-- (ready) fires after every render of the new data -->
      <markdown class="preview" [data]="source()" (ready)="renders.update((n) => n + 1)" />
    </main>
  `,
})(
  class {
    source = signal(initial);
    renders = signal(0);
    words = computed(() => this.source().split(/\s+/).filter(Boolean).length);

    reset() {
      this.source.set(initial);
    }
  },
);

bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection(), provideMarkdown()],
}).then(() => console.log('ngx-markdown live editor ready: type on the left to update the preview'));
