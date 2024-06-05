import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {merge, of, Subject, timer} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, startWith, switchMap,} from 'rxjs/operators';

@Component({
  selector: 'markdown-clipboard',
  template: `
    <button
      class="markdown-clipboard-button"
      [class.copied]="copied$ | async"
      (click)="onCopyToClipboardClick()">
      {{ copiedText$ | async }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
})
export class ClipboardButtonComponent {
  @Input() buttonTextCopy: string = 'Copy';
  @Input() buttonTextCopied: string = 'Copied';

  private _buttonClick$ = new Subject<void>();

  readonly copied$ = this._buttonClick$.pipe(
    switchMap(() => merge(of(true), timer(3000).pipe(map(() => false)))),
    distinctUntilChanged(),
    shareReplay(1)
  );

  readonly copiedText$ = this.copied$.pipe(
    startWith(false),
    map((copied) => (copied ? this.buttonTextCopied : this.buttonTextCopy))
  );

  onCopyToClipboardClick(): void {
    this._buttonClick$.next();
  }
}
