import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrl: './clipboard-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
})
export class ClipboardButtonComponent {
  private snackbar = inject(MatSnackBar);

  // ? Set by ngx-markdown (ClipboardButtonInputs): the language of the code block, when it has one
  readonly language = input<string>();

  onCopyToClipboard(): void {
    this.snackbar.open(`Copied ${this.language() ?? 'code'} to clipboard via component!`, undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
