import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MarkedExtension } from 'marked';
import { of } from 'rxjs';
import { CLIPBOARD_OPTIONS, ClipboardOptions } from './clipboard-button/clipboard-options';
import { MARKED_EXTENSIONS } from './configuration/marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from './configuration/marked-options';
import { MarkdownComponent } from './markdown/markdown.component';
import { MarkdownModule } from './markdown.module';
import { errorSrcWithoutHttpClient, SECURITY_CONTEXT } from './services/markdown.service';

@Component({
  selector: 'markdown-host-comp',
  template: `
    @if (src) {
      <div>
        <markdown [src]="src"></markdown>
      </div>
    } @else {
      <markdown [data]="markdown"></markdown>
    }
  `,
  imports: [
    MarkdownComponent,
  ],
})
class HostComponent {
  markdown = '# Markdown Title';
  src: string | undefined;
}

describe('MarkdownModule', () => {

  describe('forRoot', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MarkdownModule.forChild(),
          HostComponent,
        ],
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
        ],
      }).compileComponents();
    });

    it('should provide HttpClient when MarkdownModuleConfig.loader is provided', () => {

      TestBed.configureTestingModule({
        imports: [MarkdownModule.forRoot({ loader: HttpClient })],
        providers: [provideHttpClient(withInterceptorsFromDi())],
      });

      const httpClient = TestBed.inject(HttpClient);

      expect(httpClient instanceof HttpClient).toBeTruthy();
    });

    it('should not provide HttpClient when MarkdownModuleConfig is provided without loader', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MARKED_OPTIONS,
              useValue: {},
            },
          }),
        ],
      });

      const httpClient = TestBed.inject(HttpClient, null, { optional: true });

      expect(httpClient).toBeNull();
    });

    it('should not provide HttpClient when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const httpClient = TestBed.inject(HttpClient, null, { optional: true });

      expect(httpClient).toBeNull();
    });

    it('should provide ClipboardOptions when MarkdownModuleConfig is provided with clipboardOptions', () => {

      const mockClipboardOptions: ClipboardOptions = {
        buttonComponent: class mockClipboardButtonComponent {
        },
      };

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            clipboardOptions: {
              provide: CLIPBOARD_OPTIONS,
              useValue: mockClipboardOptions,
            },
          }),
        ],
      });

      const clipboardOptions = TestBed.inject(CLIPBOARD_OPTIONS);

      expect(clipboardOptions).toEqual(mockClipboardOptions);
    });

    it('should not provide ClipboardOptions when MarkdownModuleConfig is provided without clipboardOptions', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const clipboardOptions = TestBed.inject(CLIPBOARD_OPTIONS, null, { optional: true });

      expect(clipboardOptions).toBeNull();
    });

    it('should provide MarkedOptions when MarkdownModuleConfig is provided with markedOptions', () => {

      const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false };

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MARKED_OPTIONS,
              useValue: mockMarkedOptions,
            },
          }),
        ],
      });

      const markedOptions = TestBed.inject(MARKED_OPTIONS);

      expect(markedOptions).toEqual(mockMarkedOptions);
    });

    it('should not provide MarkedOptions when MarkdownModuleConfig is provided without markedOptions', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ loader: HttpClient }),
        ],
      });

      const markedOptions = TestBed.inject(MARKED_OPTIONS, null, { optional: true });

      expect(markedOptions).toBeNull();
    });

    it('should not provide MarkedOptions when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const markedOptions = TestBed.inject(MARKED_OPTIONS, null, { optional: true });

      expect(markedOptions).toBeNull();
    });

    it('should provide MarkedExtensions when MarkdownModuleConfig is provided with markedExtension functions', () => {

      const mockExtensions = [
        { name: 'mock-extension-one' } as MarkedExtension,
        { name: 'mock-extension-two' } as MarkedExtension,
      ];

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ markedExtensions: mockExtensions }),
        ],
      });

      const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS);

      expect(markedExtensions).toEqual(mockExtensions);
    });

    it('should provide MarkedExtensions when MarkdownModuleConfig is provided with markedExtension providers', () => {
      const mockExtensionOne = { name: 'mock-extension-one' } as MarkedExtension;
      const mockExtensionTwo = { name: 'mock-extension-two' } as MarkedExtension;

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedExtensions: [
              {
                provide: MARKED_EXTENSIONS,
                useValue: mockExtensionOne,
                multi: true,
              },
              {
                provide: MARKED_EXTENSIONS,
                useFactory: () => mockExtensionTwo,
                multi: true,
              },
            ],
          }),
        ],
      });

      const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS);

      expect(markedExtensions).toEqual([mockExtensionOne, mockExtensionTwo]);
    });

    it('should provide null when MarkdownModuleConfig is provided without markedExtensions', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MARKED_OPTIONS,
              useValue: {},
            },
          }),
        ],
      });

      const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS, null, { optional: true });

      expect(markedExtensions).toBeNull();
    });

    it('should provide null when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const markedExtensions = TestBed.inject<MarkedExtension[]>(MARKED_EXTENSIONS, null, { optional: true });

      expect(markedExtensions).toBeNull();
    });

    it('should provide SecurityContext when MarkdownModuleConfig is provided with sanitize', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
        ],
      });

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.NONE);
    });

    it('should provide default SecurityContext when MarkdownModuleConfig is provided without sanitize', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot({
            markedOptions: {
              provide: MARKED_OPTIONS,
              useValue: {},
            },
          }),
        ],
      });

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.HTML);
    });

    it('should provide default SecurityContext when MarkdownModuleConfig is not provided', () => {

      TestBed.configureTestingModule({
        imports: [
          MarkdownModule.forRoot(),
        ],
      });

      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(securityContext).toBe(SecurityContext.HTML);
    });
  });

  describe('forChild', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MarkdownModule.forChild(),
          HostComponent,
        ],
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
        ],
      }).compileComponents();
    });

    it('should not provide any providers', () => {

      const forChildModule = MarkdownModule.forChild();

      expect(forChildModule.providers).toBeUndefined();
    });

    it('should inherit from forRoot providers', () => {

      const mockMarkedOptions: MarkedOptions = { breaks: true, gfm: false };
      const mockClipboardOptions: ClipboardOptions = {
        buttonComponent: class mockClipboardButtonComponent {
        },
      };

      TestBed.configureTestingModule({
        imports: [MarkdownModule.forRoot({
          loader: HttpClient,
          clipboardOptions: { provide: CLIPBOARD_OPTIONS, useValue: mockClipboardOptions },
          markedOptions: { provide: MARKED_OPTIONS, useValue: mockMarkedOptions },
          sanitize: SecurityContext.NONE,
        }),
          MarkdownModule.forChild()],
        providers: [provideHttpClient(withInterceptorsFromDi())],
      });

      const httpClient = TestBed.inject(HttpClient);
      const clipboardOptions = TestBed.inject(CLIPBOARD_OPTIONS);
      const markedOptions = TestBed.inject(MARKED_OPTIONS);
      const securityContext = TestBed.inject(SECURITY_CONTEXT);

      expect(httpClient instanceof HttpClient).toBeTruthy();
      expect(clipboardOptions).toEqual(mockClipboardOptions);
      expect(markedOptions).toEqual(mockMarkedOptions);
      expect(securityContext).toBe(SecurityContext.NONE);
    });
  });

  describe('without HttpClient', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          CommonModule,
          MarkdownModule.forRoot(),
          HostComponent,
        ],
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
        ],
      }).compileComponents();
    });

    it('should render the markdown if not passing src attribute', fakeAsync(() => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.detectChanges();
      tick();

      const title = (fixture.nativeElement as HTMLElement).textContent!.trim();

      expect(title).toEqual('Markdown Title');
    }));

    it('should throw an error when using src attribute', () => {

      const fixture = TestBed.createComponent(HostComponent);

      fixture.componentInstance.src = '/some/path/to/file.md';

      expect(() => fixture.detectChanges()).toThrowError(errorSrcWithoutHttpClient);
    });
  });
});
