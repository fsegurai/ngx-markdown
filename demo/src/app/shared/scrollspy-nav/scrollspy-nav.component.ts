import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import Gumshoe from 'gumshoejs';

@Component({
  selector: 'app-scrollspy-nav',
  templateUrl: './scrollspy-nav.component.html',
  styleUrls: ['./scrollspy-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ]
})
export class ScrollspyNavComponent {
  // * == SERVICE INJECTIONS ==
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);

  // * == INPUTS ==
  readonly headings = input<Element[] | undefined>();

  // * == PROPERTIES ==
  private scrollSpy: Gumshoe | undefined;

  constructor() {
    this.setupScrollSpyEffect();
  }

  /**
   * Sanitize HTML content by removing all HTML tags (any content starting and ending with <>) and returning only text content.
   * @param html - HTML content to sanitize.
   */
  protected sanitizeInnerHTML(html: string): string {
    return html.replace(/<[^>]+>/g, '');
  }

  /**
   * Sets up a scroll spy effect to monitor and react to changes in the headings.
   * If headings are available, the scroll spy watcher is initialized.
   * If headings become empty, the scroll spy is destroyed.
   * Handles proper cleanup on component destruction.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private setupScrollSpyEffect(): void {
    // Use an effect to react to changes in the headings input
    effect(() => {
      const currentHeadings = this.headings();
      if (currentHeadings && currentHeadings.length > 0) {
        queueMicrotask(() => {
          // Ensure the scroll spy is set up when headings are available
          this.initializeScrollSpyWatcher();
        })
      } else {
        // If headings become empty, destroy the scroll spy
        this.destroyScrollSpy();
      }
    });

    // Use DestroyRef for component cleanup
    this.destroyRef.onDestroy(() => {
      this.destroyScrollSpy();
    });
  }

  /**
   * Set up the scroll spy for the current component.
   * This method should be called after the headings have been initialized and
   * the DOM elements are confirmed to be rendered.
   * It is typically called within a microtask or effect.
   * @private - This method is private and should not be accessed outside of this class
   */
  private initializeScrollSpyWatcher(): void {
    // If Gumshoe already exists, destroy the previous instance before re-initializing
    if (this.scrollSpy) this.destroyScrollSpy();

    const hostElement = this.elementRef.nativeElement;
    const linkSelector = `${ hostElement.tagName }.${ hostElement.className } a`;

    // The crucial part: pass the 'content' option to Gumshoe
    // This tells Gumshoe *what elements* to watch for scrolling.
    // It's expecting elements with IDs that match the hrefs of your nav links.
    this.scrollSpy = new Gumshoe(linkSelector, {
      offset: 64, // Adjust this value based on your fixed header height
      reflow: true,
    });
  }

  /**
   * Destroy the current scroll spy instance.
   * @private - This method is private and should not be accessed outside of this class
   */
  private destroyScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.destroy(); // Call Gumshoe's destroy method
      this.scrollSpy = undefined; // Clear the reference
    }
  }
}
