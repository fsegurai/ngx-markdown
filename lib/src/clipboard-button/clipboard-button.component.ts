import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  model,
  ModelSignal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'markdown-clipboard',
  template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied()"
      (click)="onCopyToClipboardClick()">
      {{ copiedText() }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipboardButtonComponent {
  // * == SERVICE INJECTIONS ==
  private _destroyRef = inject(DestroyRef);

  // * == INPUTS ==
  buttonTextCopy: ModelSignal<string> = model('Copy');
  buttonTextCopied: ModelSignal<string> = model('Copied!');
  protected readonly copied: WritableSignal<boolean> = signal(false);
  protected readonly copiedText = computed(() =>
    this.copied() ? this.buttonTextCopied() : this.buttonTextCopy(),
  );

  // * == PRIVATE PROPERTIES ==
  private timeoutId: ReturnType<typeof setTimeout> | undefined; // To store the setTimeout ID for clearing

  constructor() {
    this.registerDestroyCleanup();
  }

  /**
   * Handles the click event to copy content to the clipboard.
   * Sets a "copied" state to true, resets it to false after a timeout, and clears any existing timeouts if applicable.
   *
   * @protected - This method is intended for internal use within the component.
   * @return {void} This method does not return a value.
   */
  protected onCopyToClipboardClick(): void {
    this.copied.set(true);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.copied.set(false);
      this.timeoutId = undefined;
    }, 3000);
  }

  /**
   * Clears an existing timeout if it has been set. This method is typically used to clean up resources when the component is destroyed.
   * The timeout ID is reset to `undefined` after clearing to prevent unintended reuse.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private registerDestroyCleanup(): void {
    this._destroyRef.onDestroy(() => {
      // This code will run when the component is destroyed
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined; // Optional, but good practice
      }
    });
  }
}
