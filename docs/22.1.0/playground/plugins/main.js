// Prism and emoji read the browser globals loaded by the <script> tags of index.html; KaTeX and DOMPurify are
// imported on demand (22.1.0 loaders) through the import map.
import '@angular/compiler';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  MarkdownComponent,
  provideMarkdown,
  withDomPurify,
  withEmoji,
  withKatex,
  withPrism,
} from '@fsegurai/ngx-markdown';

const App = Component({
  selector: 'app-root',
  imports: [MarkdownComponent],
  template: `
    <header>
      <h1>Plugins</h1>
      <!-- Each checkbox toggles one plugin for this <markdown> only -->
      <label><input type="checkbox" [checked]="prism()" (change)="prism.set(!prism())" /> Prism</label>
      <label><input type="checkbox" [checked]="emoji()" (change)="emoji.set(!emoji())" /> Emoji</label>
      <label><input type="checkbox" [checked]="katex()" (change)="katex.set(!katex())" /> KaTeX</label>
    </header>
    <markdown
      class="preview"
      [data]="source"
      [plugins]="{ prism: prism() }"
      [emoji]="emoji()"
      [katex]="katex()"
      lineNumbers
      (ready)="onReady()" />
  `,
})(
  class {
    source = window.playgroundFiles['input.md'];
    prism = signal(true);
    emoji = signal(true);
    katex = signal(true);

    onReady() {
      console.log(`rendered with prism=${this.prism()} emoji=${this.emoji()} katex=${this.katex()}`);
    }
  },
);

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(),
    // Prism is on by default once provided; emoji and KaTeX are enabled per component above.
    // KaTeX and DOMPurify load before the first parse that needs them (22.1.0).
    provideMarkdown({
      plugins: [
        withPrism(),
        withEmoji(),
        withKatex({ loader: () => import('katex'), throwOnError: false }),
        withDomPurify({ purify: () => import('dompurify') }),
      ],
    }),
  ],
}).then(() => console.log('ngx-markdown plugins sample ready: toggle a plugin to re-render'));
