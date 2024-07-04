import { ElementRef, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { first } from 'rxjs/operators';
import { ClipboardRenderOptions } from './clipboard-options';
import { KatexOptions } from './katex-options';
import { MarkdownComponent } from './markdown.component';
import { MarkdownModule } from './markdown.module';
import { MarkdownService } from './markdown.service';
import { MermaidAPI } from './mermaid-options';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let markdownService: MarkdownService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownModule.forRoot()],
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

    markdownService = TestBed.inject(MarkdownService);
    fixture = TestBed.createComponent(MarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('data', () => {
    it('should call render with provided data when set', async () => {
      const useCases = ['', '# Markdown', '<p>Html</p>'];

      const spyRender = spyOn(component, 'render');
      const spyRenderSource = spyOn(markdownService, 'getSource');

      for (const data of useCases) {
        spyRender.calls.reset();
        spyRenderSource.calls.reset();
        spyRender.and.returnValue(Promise.resolve());
        spyRenderSource.and.returnValue(of(data));

        component.data = data;
        component.ngOnChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        if(data) {
          expect(spyRender).toHaveBeenCalledWith(data);
        }else{
          expect(spyRender).not.toHaveBeenCalled();
        }
      }
    });

    it('should return value correctly when get', () => {
      const mockData = '# Markdown';
      component.data = mockData;
      expect(component.data).toBe(mockData);
    });
  });

  describe('src', () => {
    it('should call render with retrieved content when set', () => {
      const mockSrc = './src-example/file.md';
      const mockContent = 'source-content';

      spyOn(component, 'render').and.returnValue(Promise.resolve());
      spyOn(markdownService, 'getSource').and.returnValue(of(mockContent));

      component.src = mockSrc;
      component.ngOnChanges();

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect(component.render).toHaveBeenCalledWith(mockContent);
    });

    it('should return value correctly when get', () => {
      const mockSrc = './src-example/file.md';
      spyOn(markdownService, 'getSource').and.returnValue(of());
      component.src = mockSrc;
      expect(component.src).toBe(mockSrc);
    });

    it('should emit load when get', (done) => {
      const mockSrc = './src-example/file.md';
      const mockSrcReturn = 'src-return-value';

      spyOn(markdownService, 'getSource').and.returnValue(of(mockSrcReturn));
      spyOn(component.load, 'emit');

      component.src = mockSrc;
      component.ngOnChanges();

      setTimeout(() => {
        expect(component.load.emit).toHaveBeenCalledWith(mockSrcReturn);
        done();
      }, 0);
    });

    it('should emit error when an error occurs', () => {
      const mockSrc = './src-example/file.md';
      const mockError = 'error-x';

      spyOn(markdownService, 'getSource').and.returnValue(throwError(mockError));
      const spyEmit = spyOn(component.error, 'emit').and.callThrough(); // Ensure to call through

      component.src = mockSrc;
      component.ngOnChanges(); // Manually trigger ngOnChanges
      fixture.detectChanges(); // Trigger change detection

      expect(spyEmit).toHaveBeenCalledWith(mockError);
    });

  });

  describe('ngAfterViewInit', () => {
    it('should call render method and decodeHtml when neither data or src input property is provided', () => {
      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = new ElementRef(mockHtmlElement);
      component.data = undefined;
      component.src = undefined;

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).toHaveBeenCalledWith(
        mockHtmlElement.innerHTML,
        true,
      );
    });

    it('should not call render method when src is provided', () => {
      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      spyOn(markdownService, 'getSource').and.returnValue(of());

      component.element = new ElementRef(mockHtmlElement);
      component.src = './src-example/file.md';

      spyOn(component, 'render');

      component.ngAfterViewInit();

      expect(component.render).not.toHaveBeenCalled();
    });

    it('should not call render method when data is provided', () => {
      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      component.element = new ElementRef(mockHtmlElement);
      component.data = '# Markdown';

      spyOn(component, 'render');

      fixture.detectChanges(); // Trigger change detection

      component.ngAfterViewInit();

      expect(component.render).not.toHaveBeenCalled();
    });

    it('should rerender content on demand', () => {
      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      component.element = new ElementRef(mockHtmlElement);
      component.data = '# Markdown'; // Ensure data is defined

      spyOn(component as any, 'loadContent').and.callThrough();

      fixture.detectChanges(); // Trigger change detection

      markdownService.reload();

      expect((component as any).loadContent).toHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should parse markdown through MarkdownService', async () => {
      const raw = '### Raw';

      spyOn(markdownService, 'parse');

      component.inline = true;
      component.emoji = false;
      component.mermaid = false;
      component.disableSanitizer = true;
      await component.render(raw, true);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: true,
        inline: true,
        emoji: false,
        mermaid: false,
        disableSanitizer: true,
      });
    });

    it('should set innerHTML with parsed markdown', async () => {
      const raw = '### Raw';
      const parsed = '<h3>Compiled</h3>';

      spyOn(markdownService, 'parse').and.returnValue(parsed);

      await component.render(raw, true);

      expect(component.element.nativeElement.innerHTML).toBe(parsed);
    });

    it('should handle commandline plugin correctly', async () => {
      const markdown =
        '```powershell\nGet-Date\n\nSunday, November 7, 2021 8:19:21 PM\n\n```';
      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.commandLine = true;
      await component.render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('command-line');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start'),
      ).toBeNull();

      component.filterOutput = '(out)';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-filter-output')
          ?.value,
      ).toBe('(out)');

      component.host = 'localhost';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-host')?.value,
      ).toBe('localhost');

      component.prompt = 'PS C:\\Users\\Chris>';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-prompt')?.value,
      ).toBe('PS C:\\Users\\Chris>');

      component.output = '2-4';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-output')?.value,
      ).toBe('2-4');

      component.user = 'root';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-user')?.value,
      ).toBe('root');
    });

    it('should handle lineNumbers plugin correctly', async () => {
      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineNumbers = true;
      await component.render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('line-numbers');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start'),
      ).toBeNull();

      component.start = 5;
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start')?.value,
      ).toBe('5');
    });

    it('should handle lineHighlight plugin correctly', async () => {
      const markdown = '```javascript\nconst random = \'Math.random();\n```';
      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      component.lineHighlight = true;
      component.line = '6, 10-16';
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line')?.value,
      ).toBe('6, 10-16');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line-offset'),
      ).toBeNull();

      component.lineOffset = 5;
      await component.render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line-offset')?.value,
      ).toBe('5');
    });

    it('should render html element through MarkdownService', async () => {
      const raw = '### Raw';
      const parsed = '<h3>Compiled</h3>';
      const clipboardOptions: ClipboardRenderOptions = {
        buttonComponent: class mockButtonComponent {
        },
        buttonTemplate:
          new (class mockTemplateRef {
          })() as TemplateRef<unknown>,
        buttonTextCopy: 'Copy',
        buttonTextCopied: 'Copied',
        languageButton: true,
      };
      const katexOptions: KatexOptions = { displayMode: true };
      const mermaidOptions: MermaidAPI.Config = { darkMode: true };

      spyOn(markdownService, 'parse').and.returnValue(parsed);
      spyOn(markdownService, 'render');

      component.clipboard = true;
      component.clipboardButtonComponent = clipboardOptions.buttonComponent;
      component.clipboardButtonTemplate = clipboardOptions.buttonTemplate;
      component.clipboardButtonTextCopy = clipboardOptions.buttonTextCopy;
      component.clipboardButtonTextCopied = clipboardOptions.buttonTextCopied;
      component.clipboardLanguageButton = clipboardOptions.languageButton;
      component.katex = true;
      component.katexOptions = katexOptions;
      component.mermaid = true;
      component.mermaidOptions = mermaidOptions;
      await component.render(raw);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: false,
        inline: false,
        emoji: false,
        mermaid: true,
        disableSanitizer: false,
      });

      expect(markdownService.render).toHaveBeenCalledWith(
        component.element.nativeElement,
        {
          clipboard: true,
          clipboardOptions: clipboardOptions,
          katex: true,
          katexOptions: katexOptions,
          mermaid: true,
          mermaidOptions: mermaidOptions,
        },
        component.viewContainerRef,
      );
    });

    it('should emit `ready` when parsing and rendering is done', async () => {
      const markdown = '# Markdown';
      const parsed = '<h1 id="markdown">Markdown</h1>';

      spyOn(markdownService, 'parse').and.returnValue(parsed);
      spyOn(markdownService, 'render');

      component.ready.pipe(first()).subscribe(() => {
        expect(markdownService.parse).toHaveBeenCalled();
        expect(component.element.nativeElement.innerHTML).toBe(parsed);
        expect(markdownService.render).toHaveBeenCalled();
      });

      await component.render(markdown);
    });
  });
});
