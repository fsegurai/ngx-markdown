import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MarkdownLinkService } from './markdown-link.service';

describe('MarkdownLinkService', () => {
  let service: MarkdownLinkService;
  let router: Router;

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
            navigate: jasmine.createSpy('navigate'),
            createUrlTree: jasmine.createSpy('createUrlTree'),
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
    router = TestBed.inject(Router);
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

  it('should navigate to internal URLs in browser mode', () => {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', '#anchor');

    const div = document.createElement('div');
    const mockNodeList: NodeListOf<Element> = {
      0: div,
      length: 1,
      item: (index: number) => div,
      forEach: function(callback, thisArg) {
        callback.call(thisArg, div, 0, this);
      },
    };

    spyOn(document, 'querySelectorAll').and.returnValue(mockNodeList);

    service['internalUrlHandler'](anchor);
    expect(router.navigate).toHaveBeenCalled();
  });
});
