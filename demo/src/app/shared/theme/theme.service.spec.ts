import { TestBed } from '@angular/core/testing';
import { DEFAULT_THEME, LOCAL_STORAGE_THEME_KEY } from '@app/app.constant';
import { Theme } from '@app/app.models';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    document.body.className = '';
    service = TestBed.inject(ThemeService);
  });

  it('applies the stored theme, or the default one, on init', () => {
    service.init();
    expect(service.theme()).toBe(DEFAULT_THEME);

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.Dark);
    service.init();
    expect(service.theme()).toBe(Theme.Dark);
    expect(document.body.classList).toContain('dark-theme');
  });

  it('toggles the theme, its body class and its stored value', () => {
    service.init();
    service.toggle();

    expect(service.theme()).toBe(Theme.Dark);
    expect(document.body.classList).toContain('dark-theme');
    expect(document.body.classList).not.toContain('light-theme');
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.Dark);
  });

  it('derives the Mermaid options from the theme', () => {
    service.init();
    expect(service.mermaidOptions()).toEqual({ theme: 'default', darkMode: false });

    service.toggle();
    expect(service.mermaidOptions()).toEqual({ theme: 'dark', darkMode: true });
  });
});
