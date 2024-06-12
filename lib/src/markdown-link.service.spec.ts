import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MarkdownLinkService } from './markdown-link.service';

describe('MarkdownLinkService', () => {
  let service: MarkdownLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'value',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigated: false,
            parseUrl: jasmine.createSpy('parseUrl').and.returnValue({
              fragment: 'testFragment',
              queryParams: {},
            }),
            url: '/test',
          },
        },
      ],
    });
    service = TestBed.inject(MarkdownLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should identify external URLs', () => {
    expect(service['isExternalUrl']('http://example.com')).toBeTrue();
    expect(service['isExternalUrl']('https://example.com')).toBeTrue();
    expect(service['isExternalUrl']('mailto:test@example.com')).toBeTrue();
    expect(service['isExternalUrl']('tel:+1234567890')).toBeTrue();
    expect(service['isExternalUrl']('/path')).toBeTrue();
    expect(service['isExternalUrl']('internal/path')).toBeFalse();
  });

  it('should identify internal URLs', () => {
    const anchor = document.createElement('a');
    expect(service['isInternalUrl']('#anchor', anchor)).toBeTrue();
    expect(service['isInternalUrl']('../relative/path', anchor)).toBeTrue();
    expect(service['isInternalUrl']('http://example.com', anchor)).toBeFalse();
  });
});
