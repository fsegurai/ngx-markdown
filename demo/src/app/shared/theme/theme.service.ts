import { computed, DOCUMENT, Injectable, inject, type Signal, signal } from '@angular/core';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from '@app/app.constant';
import { isTheme, Theme } from '@app/app.models';
import type { MermaidAPI } from 'ngx-markdown';

/**
 * The light/dark theme of the demo: a signal, the `<theme>-theme` body class and the stored preference, plus the
 * Mermaid options that follow it.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly _theme = signal<Theme>(DEFAULT_THEME);

  readonly theme: Signal<Theme> = this._theme.asReadonly();

  /**
   * The theme-dependent Mermaid options, bound to `[mermaidOptions]`: changing the theme re-renders the diagrams alone.
   * The classic `default`/`dark` pair is used (not `neo`/`neo-dark`) because it suits every look, including the
   * demo's `handDrawn` one, and every diagram type. `layout` and `look` are pinned in the `config` of
   * `withMermaid()` (markdown-plugins.ts).
   */
  readonly mermaidOptions: Signal<MermaidAPI.MermaidConfig> = computed(() =>
    this._theme() === Theme.Dark ? { theme: 'dark', darkMode: true } : { theme: 'default', darkMode: false },
  );

  /**
   * Applies the stored theme, or the default one (browser only: it reads localStorage and sets a body class).
   */
  init(): void {
    const storedTheme = this.readStoredTheme();
    this.set(isTheme(storedTheme) ? storedTheme : DEFAULT_THEME);
  }

  /**
   * Toggles the theme between light and dark.
   */
  toggle(): void {
    this.set(this._theme() === Theme.Light ? Theme.Dark : Theme.Light);
  }

  /**
   * Sets the theme, its body class, and saves it to local storage.
   * @param theme The theme to set.
   */
  set(theme: Theme): void {
    this._theme.set(theme);
    const bodyClassList = this.document.body.classList;
    const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);

    if (removeClassList) bodyClassList.remove(...removeClassList);

    bodyClassList.add(`${theme}-theme`);

    try {
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the theme still applies for this visit.
    }
  }

  /**
   * Reads the stored theme, tolerating unavailable storage.
   * @private - This method is private and should not be accessed outside of this class
   */
  private readStoredTheme(): string | null {
    try {
      return localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    } catch {
      return null;
    }
  }
}
