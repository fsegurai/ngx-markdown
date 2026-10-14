import type { Type } from '@angular/core';
import {
  type MarkdownPluginFeature,
  withClipboard,
  withEmoji,
  withKatex,
  withLightbox,
  withMermaid,
  withMermaidExport,
  withPrism,
} from 'ngx-markdown';

/**
 * The plugins of the demo: each one is provided once with its `withX()` feature, then enabled per component
 * (`[katex]`, `[mermaid]`, `[clipboard]`… or `[plugins]`). Shared by `app.config.ts` and the Plugins page, whose own
 * `MarkdownService` shows the default copy button.
 * @param clipboardButton The global copy button (the app uses its own; the Plugins page the default one).
 * @returns The `plugins` of `provideMarkdown()`.
 */
export function markdownPlugins(clipboardButton?: Type<unknown>): MarkdownPluginFeature[] {
  return [
    withKatex(),
    withMermaid({
      // ? Mermaid is loaded on demand, as a lazy chunk: only pages with a diagram fetch it (no global script)
      loader: () => import('mermaid').then((m) => m.default),
      // ? Mermaid 12 defaults to the ELK layout and, for most diagrams, the neo look: the demo pins the classic dagre
      // ? layout and keeps its hand-drawn look. The theme and darkMode follow the demo theme (ThemeService, through the
      // ? `[mermaidOptions]` input, merged key by key over this config)
      config: { layout: 'dagre', look: 'handDrawn' },
    }),
    withMermaidExport(),
    withPrism(),
    withClipboard({ buttonComponent: clipboardButton }),
    withEmoji(),
    withLightbox(),
  ];
}
