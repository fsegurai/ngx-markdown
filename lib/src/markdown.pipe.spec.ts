import { ElementRef, EventEmitter, NgZone, ViewContainerRef } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownModule } from './markdown.module';
import { MarkdownPipe, MarkdownPipeOptions } from './markdown.pipe';
import { MarkdownService } from './markdown.service';
import Expected = jasmine.Expected;

describe('MarkdownPipe', () => {
  let domSanitizer: DomSanitizer;
  let elementRef: ElementRef;
  let markdownService: MarkdownService;
  let pipe: MarkdownPipe;
  let viewContainerRef: ViewContainerRef;
  let zone: NgZone;

  const elementRefSpy = jasmine.createSpyObj<ElementRef>([], { nativeElement: document.createElement('div') });
  const viewContainerRefSpy = jasmine.createSpyObj<ViewContainerRef>(['createComponent']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MarkdownModule.forRoot(),
      ],
      providers: [
        { provide: ElementRef, useValue: elementRefSpy },
        { provide: ViewContainerRef, useValue: viewContainerRefSpy },
      ],
    });

    TestBed.runInInjectionContext(() => {
      elementRef = TestBed.inject(ElementRef);
      domSanitizer = TestBed.inject(DomSanitizer);
      markdownService = TestBed.inject(MarkdownService);
      viewContainerRef = TestBed.inject(ViewContainerRef);
      zone = TestBed.inject(NgZone);

      pipe = new MarkdownPipe();
    });
  });

  it('should return empty string when value is null/undefined', async () => {
    const markdowns: any[] = [undefined, null];

    for (const markdown of markdowns) {
      const result = await pipe.transform(markdown as string);
      expect(result).toBe('');
    }
  });

  it('should log error and return value when parameter is not a string', async () => {
    const markdowns: any[] = [0, {}, [], /regex/];

    spyOn(console, 'error');

    for (const markdown of markdowns) {
      const result = await pipe.transform(markdown as string);

      expect(result).toBe(markdown as Expected<SafeHtml>);
      expect(console.error).toHaveBeenCalledWith(`MarkdownPipe has been invoked with an invalid value type [${typeof markdown}]`);
    }
  });

  it('should render element through MarkdownService when zone is stable', fakeAsync(() => {
    const markdown = '# Markdown';
    const mockPipeOptions: MarkdownPipeOptions = { mermaid: true, mermaidOptions: { darkMode: true } };

    spyOn(markdownService, 'render');

    pipe.transform(markdown, mockPipeOptions);
    tick();

    expect(markdownService.render).not.toHaveBeenCalled();

    (zone.onStable as EventEmitter<void>).emit();

    expect(markdownService.render).toHaveBeenCalledWith(elementRef.nativeElement as HTMLElement, mockPipeOptions, viewContainerRef);
  }));

  it('should return parsed markdown', async () => {
    const markdown = '# Markdown';
    const mockParsed = 'compiled-x';
    const mockBypassSecurity = 'bypass-x';
    const mockPipeOptions: MarkdownPipeOptions = { inline: true, emoji: true, disableSanitizer: true };

    spyOn(markdownService, 'parse').and.returnValue(mockParsed);
    spyOn(domSanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockBypassSecurity);

    const result = await pipe.transform(markdown, mockPipeOptions);

    expect(markdownService.parse).toHaveBeenCalledWith(markdown, mockPipeOptions);
    expect(domSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(mockParsed as string);
    expect(result).toBe(mockBypassSecurity);
  });
});
