import { markdownPlugins } from '@app/markdown-plugins';
import markedExtendedAccordion, { attachAccordion } from '@fsegurai/marked-extended-accordion';
import markedExtendedAlert from '@fsegurai/marked-extended-alert';
import markedExtendedCode, { attachCode, wrapLines } from '@fsegurai/marked-extended-code';
import markedExtendedComments, { attachComments } from '@fsegurai/marked-extended-comments';
import markedExtendedEmbeds, { attachEmbeds } from '@fsegurai/marked-extended-embeds';
import markedExtendedFootnote, { attachFootnotes } from '@fsegurai/marked-extended-footnote';
import markedExtendedKanban, { attachKanban } from '@fsegurai/marked-extended-kanban';
import markedExtendedLists, { attachLists } from '@fsegurai/marked-extended-lists';
import markedExtendedSlide, { attachSlides } from '@fsegurai/marked-extended-slide';
import markedExtendedSpoiler, { attachSpoilers } from '@fsegurai/marked-extended-spoiler';
import markedExtendedTables from '@fsegurai/marked-extended-tables';
import markedExtendedTabs, { attachTabs } from '@fsegurai/marked-extended-tabs';
import markedExtendedTimeline, { attachTimeline } from '@fsegurai/marked-extended-timeline';
import markedExtendedTypographic from '@fsegurai/marked-extended-typographic';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { type MarkdownConfig, withMarkedExtended } from 'ngx-markdown';

/**
 * The `provideMarkdown()` config of the Marked Extended page: the demo plugins (Prism, clipboard...) plus
 * `withMarkedExtended()` with the `@fsegurai/marked-extended-*` packages. Provided by the page itself, so the other
 * pages do not parse their syntax. No `sanitize` option: Angular's sanitizer stays on. No `markedExtensions` either:
 * the root ones (`gfmHeadingId`) apply here too.
 * @returns The config.
 */
export function markedExtendedConfig(): MarkdownConfig {
  return {
    plugins: [
      ...markdownPlugins(ClipboardButtonComponent),
      withMarkedExtended([
        { name: 'accordion', extension: markedExtendedAccordion(), attach: attachAccordion },
        { name: 'alert', extension: markedExtendedAlert() },
        { name: 'comments', extension: markedExtendedComments(), attach: attachComments },
        // ? Click-to-load: an embed's iframe is created only when the reader activates its placeholder
        { name: 'embeds', extension: markedExtendedEmbeds(), attach: attachEmbeds },
        {
          name: 'footnote',
          extension: markedExtendedFootnote(),
          attach: attachFootnotes,
          options: { scrollOffset: 120 },
        },
        { name: 'kanban', extension: markedExtendedKanban(), attach: attachKanban },
        // ? Interactive task checkboxes: attachLists reports the toggles as `marked-extended:lists:toggle`. The `list`
        // ? tokenizer override of the package (alphabetic and Roman numbering, the source position of the tasks) is
        // ? applied per parse by withMarkedExtended()
        {
          name: 'lists',
          extension: markedExtendedLists({ interactiveCheckboxes: true }),
          attach: attachLists,
        },
        { name: 'slide', extension: markedExtendedSlide(), attach: attachSlides },
        { name: 'spoiler', extension: markedExtendedSpoiler(), attach: attachSpoilers },
        { name: 'tables', extension: markedExtendedTables() },
        { name: 'tabs', extension: markedExtendedTabs(), attach: attachTabs },
        { name: 'timeline', extension: markedExtendedTimeline(), attach: attachTimeline },
        { name: 'typographic', extension: markedExtendedTypographic() },
        // ? Prism (withPrism) highlights the blocks, then `wrapLines` wraps their lines: the runtime must not wrap them
        // ? itself, since highlighting would undo it. Code groups with the same labels switch together
        {
          name: 'code',
          extension: markedExtendedCode(),
          attach: attachCode,
          options: { lineClasses: false, syncByLabel: true },
          afterHighlight: wrapLines,
        },
      ]),
    ],
  };
}
