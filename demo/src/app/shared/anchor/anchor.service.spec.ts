import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AnchorService } from './anchor.service';

describe('AnchorService', () => {
  let service: AnchorService;
  let router: Router;

  const click = (href: string): Event => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    const event = new MouseEvent('click', { cancelable: true });
    Object.defineProperty(event, 'target', { value: anchor });
    return event;
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideRouter([{ path: '**', children: [] }])],
    });
    service = TestBed.inject(AnchorService);
    router = TestBed.inject(Router);
    await router.navigateByUrl('/bindings');
  });

  it('navigates a fragment-only link within the current page', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl');
    const event = click('#relative-links');

    service.interceptClick(event);

    expect(event.defaultPrevented).toBe(true);
    expect(router.serializeUrl(navigate.mock.calls[0][0] as never)).toBe('/bindings#relative-links');
  });

  it('leaves external links and asset files to the browser', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl');

    for (const href of ['https://example.com/a', 'mailto:a@b.c', 'app/bindings/remote/demo.md', 'images/badge.svg']) {
      const event = click(href);
      service.interceptClick(event);
      expect(event.defaultPrevented, href).toBe(false);
    }
    expect(navigate).not.toHaveBeenCalled();
  });

  it('normalizes a fragment-only link to the current route, so copied URLs stay on the page', () => {
    expect(service.normalizeExternalUrl('#relative-links')).toBe('/bindings#relative-links');
    expect(service.normalizeExternalUrl('https://example.com/a')).toBe('https://example.com/a');
  });
});
