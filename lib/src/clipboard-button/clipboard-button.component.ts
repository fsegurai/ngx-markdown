import { ChangeDetectionStrategy, Component, computed, model, ModelSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, of, Subject, timer } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

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
  buttonTextCopy: ModelSignal<string> = model('Copy');
  buttonTextCopied: ModelSignal<string> = model('Copied!');

  private _buttonClick$ = new Subject<void>();

  protected readonly copied = toSignal(
    this._buttonClick$.pipe(
      switchMap(() => merge(of(true), timer(3000).pipe(map(() => false)))),
      distinctUntilChanged(),
      shareReplay(1),
    )
  );

  protected readonly copiedText = computed(() =>
    this.copied() ? this.buttonTextCopied() : this.buttonTextCopy()
  );

  onCopyToClipboardClick(): void {
    this._buttonClick$.next();
  }
}
