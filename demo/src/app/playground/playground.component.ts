import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { playgroundDemo } from '@app/playground/remote/demo';
import { debounce } from '@shared/debounce/debounce';
import { ScrollspyNavLayoutComponent } from '@shared/scrollspy-nav-layout';
import { ThemeService } from '@shared/theme';
import {
  type KatexOptions,
  MarkdownComponent,
  type MarkdownCopyErrorEvent,
  type MarkdownCopyEvent,
  type MarkdownError,
  type MarkdownFrontMatter,
  type MarkdownHeading,
  type MarkdownImageClickEvent,
  type MarkdownMermaidExportErrorEvent,
  type MarkdownMermaidExportEvent,
  MermaidRenderError,
} from 'ngx-markdown';

/** One entry of the events log: what the `<markdown>` outputs reported, most recent first. */
interface PlaygroundEvent {
  id: number;
  name: string;
  detail: string;
  failed: boolean;
}

// ? How many entries the events log keeps
const EVENTS_LOG_SIZE = 5;

@Component({
  selector: 'app-playground',
  imports: [FormsModule, MarkdownComponent, MatFormFieldModule, MatInputModule, ScrollspyNavLayoutComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaygroundComponent {
  // * == SERVICE INJECTIONS ==
  private readonly _destroyRef = inject(DestroyRef);
  private readonly themeService = inject(ThemeService);

  // * == PROPERTIES ==
  protected markdownContent = signal<string>(playgroundDemo);
  private debounceRendering = debounce(() => this.updateMarkdownRendering(), 300);

  protected headings = signal<Element[] | undefined>(undefined);
  protected markdownRendering = signal<string | undefined>(undefined);

  // ? The front-matter of the latest render (`frontMatter` input, `metadata` output)
  protected readonly metadata = signal<MarkdownFrontMatter | undefined>(undefined);
  protected readonly metadataEntries = computed(() =>
    Object.entries(this.metadata()?.data ?? {}).map(([key, value]) => ({
      key,
      value: Array.isArray(value) ? value.join(', ') : String(value),
    })),
  );

  // ? The latest output events of the `<markdown>` (copy, Mermaid export, image click, error)
  protected readonly events = signal<PlaygroundEvent[]>([]);
  private eventId = 0;

  protected katexOptions: KatexOptions = {
    throwOnError: false,
    errorColor: '#cc0000',
    macros: {
      '\\RR': '\\mathbb{R}',
      '\\NN': '\\mathbb{N}',
      '\\ZZ': '\\mathbb{Z}',
      '\\QQ': '\\mathbb{Q}',
      '\\f': '#1f(#2)',
      '\\g': '#1g(#2)',
      '\\h': '#1h(#2)',
    },
  };
  // ? Follows the demo theme: a change re-renders the diagrams alone
  protected readonly mermaidOptions = this.themeService.mermaidOptions;

  constructor() {
    effect(() => {
      this.markdownContent(); // Trigger the effect when markdownContent changes
      this.debounceRendering(); // Call the debounced rendering method
    });

    this._destroyRef.onDestroy(() => {
      this.headings.set(undefined); // Clear headings
      this.markdownRendering.set(undefined); // Clear markdown rendering
    });
  }

  /**
   * Build the scrollspy navigation from the h2 headings of the rendered content (ids from `headingIds`)
   * @param headings - The headings emitted by the markdown component, with their elements
   */
  protected onHeadings(headings: MarkdownHeading[]): void {
    this.headings.set(
      headings
        .filter((heading) => heading.level === 2 && heading.id && heading.element)
        .map((heading) => heading.element as HTMLElement),
    );
  }

  protected onMetadata(frontMatter: MarkdownFrontMatter): void {
    this.metadata.set(frontMatter);
  }

  protected onCopied({ text, language }: MarkdownCopyEvent): void {
    this.log('copied', `${text.length} characters of ${language ?? 'plain text'}`);
  }

  protected onCopyError({ error }: MarkdownCopyErrorEvent): void {
    this.log('copyError', error.message, true);
  }

  protected onMermaidExported({ filename, svg }: MarkdownMermaidExportEvent): void {
    this.log('mermaidExported', `${filename} (${svg.length} characters of SVG)`);
  }

  protected onMermaidExportError({ error, filename }: MarkdownMermaidExportErrorEvent): void {
    this.log('mermaidExportError', `${filename}: ${error.message}`, true);
  }

  protected onImageClick({ image, index, images }: MarkdownImageClickEvent): void {
    this.log('imageClick', `${image.alt || image.title || image.src} (${index + 1} of ${images.length})`);
  }

  protected onError(error: MarkdownError): void {
    const detail =
      error instanceof MermaidRenderError
        ? `${error.failures.length} Mermaid diagram(s) failed`
        : typeof error === 'string'
          ? error
          : error.message; // Error or HttpErrorResponse
    this.log('error', detail, true);
  }

  /**
   * Add an entry at the top of the events log, keeping the latest ones only
   * @private - This method is private and should not be accessed outside of this class
   */
  private log(name: string, detail: string, failed = false): void {
    const entry: PlaygroundEvent = { id: ++this.eventId, name, detail, failed };
    this.events.update((events) => [entry, ...events].slice(0, EVENTS_LOG_SIZE));
  }

  /**
   * Update the Markdown rendering with the current Markdown content
   * @private - This method is private and should not be accessed outside of this class
   */
  private updateMarkdownRendering(): void {
    this.markdownRendering.set(this.markdownContent()); // Signal update schedules change detection
  }
}
