import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Theme } from '@app/app.models';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { ThemeService } from '@shared/theme';
import { MarkdownComponent, type MarkdownExtendedEvent, provideMarkdown } from 'ngx-markdown';
import { markedExtendedConfig } from './marked-extended-config';

/** One showcase of the page: a package, rendered from its remote Markdown file. */
interface Showcase {
  id: string;
  title: string;
  /** The package name, after `@fsegurai/marked-extended-`. */
  pkg: string;
  description: string;
}

/** One entry of the events log, most recent first. */
interface LoggedEvent {
  id: number;
  type: string;
  detail: string;
}

// ? How many entries the events log keeps
const EVENTS_LOG_SIZE = 8;
// ? The longest detail shown in the events log
const DETAIL_MAX_LENGTH = 140;
// ? The stylesheet of the packages: a non-injected global style bundle of angular.json, loaded by this page only
const STYLESHEET_HREF = 'marked-extended.css';
// ? The body classes the theme files of the packages read (`body.light`/`body.dark`), mapped from the demo theme
const PACKAGE_THEME_CLASSES: Readonly<Record<Theme, string>> = { [Theme.Light]: 'light', [Theme.Dark]: 'dark' };

const SHOWCASES: readonly Showcase[] = [
  { id: 'alert', title: 'Alert', pkg: 'alert', description: 'GitHub-style alerts from a blockquote.' },
  { id: 'footnote', title: 'Footnote', pkg: 'footnote', description: 'Numbered, named and inline footnotes.' },
  { id: 'typographic', title: 'Typographic', pkg: 'typographic', description: 'Smart quotes, dashes and symbols.' },
  { id: 'lists', title: 'Lists', pkg: 'lists', description: 'Interactive task lists and numbering styles.' },
  { id: 'tables', title: 'Tables', pkg: 'tables', description: 'Cells spanning columns and rows.' },
  { id: 'tabs', title: 'Tabs', pkg: 'tabs', description: 'Tabbed panels with keyboard navigation.' },
  { id: 'accordion', title: 'Accordion', pkg: 'accordion', description: 'Collapsible sections, alone or in groups.' },
  { id: 'spoiler', title: 'Spoiler', pkg: 'spoiler', description: 'Hidden content revealed on demand.' },
  { id: 'timeline', title: 'Timeline', pkg: 'timeline', description: 'Dated entries, collapsible on demand.' },
  { id: 'embeds', title: 'Embeds', pkg: 'embeds', description: 'Click-to-load videos and code playgrounds.' },
  { id: 'kanban', title: 'Kanban', pkg: 'kanban', description: 'Boards with columns, cards and view modes.' },
  { id: 'slide', title: 'Slide', pkg: 'slide', description: 'Presentations with navigation and an overview.' },
  { id: 'comments', title: 'Comments', pkg: 'comments', description: 'Inline and block review comments.' },
  {
    id: 'code',
    title: 'Code',
    pkg: 'code',
    description: 'Fence titles, line numbers, highlights, diff and focus lines, and code groups, with Prism.',
  },
];

/**
 * Describes the detail of an event for the log: JSON, with the DOM nodes replaced by their tag name.
 * @param detail The detail of the event.
 * @returns The description, shortened.
 */
function describeDetail(detail: unknown): string {
  let text: string;
  try {
    text =
      JSON.stringify(detail, (_key, value) =>
        typeof Node !== 'undefined' && value instanceof Node ? `<${value.nodeName.toLowerCase()}>` : value,
      ) ?? '';
  } catch {
    text = String(detail);
  }
  return text.length > DETAIL_MAX_LENGTH ? `${text.slice(0, DETAIL_MAX_LENGTH - 1)}…` : text;
}

@Component({
  selector: 'app-marked-extended',
  templateUrl: './marked-extended.component.html',
  styleUrl: './marked-extended.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent, ScrollspyNavLayoutComponent],
  // ? A page-level MarkdownService: only this page parses the marked-extended syntax. No `sanitize` option, so it keeps
  // ? Angular's sanitizer (SecurityContext.HTML), unlike the root service of app.config
  providers: [provideMarkdown(markedExtendedConfig())],
})
export default class MarkedExtendedComponent {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);
  private themeService = inject(ThemeService);

  // * == PROPERTIES ==
  protected readonly showcases = SHOWCASES;
  protected readonly headings = signal<Element[] | undefined>(undefined);
  // ? The latest `(extendedEvent)` outputs of the showcases
  protected readonly events = signal<LoggedEvent[]>([]);
  private eventId = 0;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.loadStylesheet();
      this.syncPackageTheme();
    }
    // ? The sections come from a @for block: their headings exist once the view is rendered
    afterNextRender(() => this.setHeadings());
  }

  onExtendedEvent({ type, detail }: MarkdownExtendedEvent): void {
    const entry: LoggedEvent = { id: ++this.eventId, type, detail: describeDetail(detail) };
    this.events.update((events) => [entry, ...events].slice(0, EVENTS_LOG_SIZE));
  }

  clearEvents(): void {
    this.events.set([]);
  }

  /**
   * Load the stylesheet of the packages while the page is open
   * @private - This method is private and should not be accessed outside of this class
   */
  private loadStylesheet(): void {
    const link = this.document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLESHEET_HREF;
    this.document.head.appendChild(link);
    this.destroyRef.onDestroy(() => link.remove());
  }

  /**
   * Mirror the demo theme (`light-theme`/`dark-theme` body class) as the `light`/`dark` body class the theme files of
   * the packages expect, while the page is open
   * @private - This method is private and should not be accessed outside of this class
   */
  private syncPackageTheme(): void {
    const classList = this.document.body.classList;
    const all = Object.values(PACKAGE_THEME_CLASSES);
    effect(() => {
      classList.remove(...all);
      classList.add(PACKAGE_THEME_CLASSES[this.themeService.theme()]);
    });
    this.destroyRef.onDestroy(() => classList.remove(...all));
  }

  /**
   * Set the headings for the scrollspy
   * @private - This method is private and should not be accessed outside of this class
   */
  private setHeadings(): void {
    // Array.from: NodeList.forEach is not available in every DOM implementation.
    const headings: Element[] = Array.from(this.elementRef.nativeElement.querySelectorAll('h2'));
    this.headings.set(headings);
  }
}
