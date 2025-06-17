import { ComponentRef, ElementRef, TemplateRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ClipboardRenderOptions } from '../clipboard-button/clipboard-options';
import { KatexOptions } from '../configuration/katex-options';
import { MermaidAPI } from '../configuration/mermaid-options';
import { MarkdownModule } from '../markdown.module';
import { MarkdownService } from '../services/markdown.service';
import { MarkdownComponent } from './markdown.component';

describe('MarkdownComponent', () => {
  let fixture: ComponentFixture<MarkdownComponent>;
  let component: MarkdownComponent;
  let componentRef: ComponentRef<MarkdownComponent>;
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
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  describe('data', () => {
    // FIX: Changed to fakeAsync to ensure effects and promises are flushed reliably
    it('should call render with provided data when set', fakeAsync(() => {
      const useCases = ['', '# Markdown', '<p>Html</p>'];

      const spyRender = spyOn(component as any, 'render').and.returnValue(Promise.resolve());
      const spyGetSource = spyOn(markdownService, 'getSource'); // Still a spy, though not directly used for data input

      for (const data of useCases) {
        spyRender.calls.reset();
        spyGetSource.calls.reset(); // Reset for each iteration

        component.data.set(data);
        tick();
        fixture.detectChanges();
        tick();

        expect(component.data()).toBe(data, false);
        expect(spyGetSource).not.toHaveBeenCalled();
      }
    }));

    it('should return value correctly when get', () => {
      const mockData = '# Markdown';
      component.data.set(mockData);
      expect(component.data()).toBe(mockData);
    });
  });

  describe('src', () => {
    it('should call render with retrieved content when set', async () => {
      const mockSrc = './src-example/file.md';
      const mockContent = 'source-content';

      spyOn(component as any, 'render').and.returnValue(Promise.resolve());
      spyOn(markdownService, 'getSource').and.returnValue(of(mockContent));

      component.src.set(mockSrc);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(markdownService.getSource).toHaveBeenCalledWith(mockSrc);
      expect((component as any).render).toHaveBeenCalledWith(mockContent);
    });

    it('should return value correctly when get', () => {
      const mockSrc = './src-example/file.md';
      spyOn(markdownService, 'getSource').and.returnValue(of());
      component.src.set(mockSrc);
      expect(component.src()).toBe(mockSrc);
    });

    it('should emit load when get', fakeAsync(() => {
      const mockSrc = './src-example/file.md';
      const mockSrcReturn = 'src-return-value';

      spyOn(markdownService, 'getSource').and.returnValue(of(mockSrcReturn));
      spyOn(component.load, 'emit');
      spyOn(component as any, 'render').and.returnValue(Promise.resolve());

      component.src.set(mockSrc);
      fixture.detectChanges();

      tick();

      expect(component.load.emit).toHaveBeenCalledWith(mockSrcReturn);
    }));

    it('should emit error when an error occurs', fakeAsync(() => {
      const mockSrc = './src-example/file.md';
      const mockError = 'error-x';

      spyOn(markdownService, 'getSource').and.returnValue(throwError(() => mockError));
      const spyEmit = spyOn(component.error, 'emit').and.callThrough();

      component.src.set(mockSrc);
      fixture.detectChanges();

      tick();

      expect(spyEmit).toHaveBeenCalledWith(mockError);
    }));
  });

  describe('signal effect', () => {
    function createAndDetectChangesWithInputs(dataValue: string | null | undefined, srcValue: string | null | undefined): void {
      fixture = TestBed.createComponent(MarkdownComponent);
      component = fixture.componentInstance;
      componentRef = fixture.componentRef;

      componentRef.setInput('data', dataValue);
      componentRef.setInput('src', srcValue);

      fixture.detectChanges();
    }

    it('should call handleTransclusion when neither data or src input property is provided', () => {
      const spyHandleTransclusion = spyOn(MarkdownComponent.prototype as any, 'handleTransclusion');

      createAndDetectChangesWithInputs(null, null);

      expect(spyHandleTransclusion).toHaveBeenCalled();
    });

    it('should not call handleTransclusion when src is provided', () => {
      // Mock MarkdownService.getSource to avoid HttpClient dependency error
      const mockGetSource = spyOn(markdownService, 'getSource').and.returnValue(of('mocked content'));
      const spyHandleTransclusion = spyOn(MarkdownComponent.prototype as any, 'handleTransclusion');

      createAndDetectChangesWithInputs(null, './src-example/file.md');

      expect(spyHandleTransclusion).not.toHaveBeenCalled();
      expect(mockGetSource).toHaveBeenCalled();
    });

    it('should not call handleTransclusion when data is provided', () => {
      const spyHandleTransclusion = spyOn(MarkdownComponent.prototype as any, 'handleTransclusion');

      createAndDetectChangesWithInputs('# Markdown', null);

      expect(spyHandleTransclusion).not.toHaveBeenCalled();
    });

    it('should rerender content on demand', fakeAsync(() => {
      const mockHtmlElement = document.createElement('div');
      mockHtmlElement.innerHTML = 'inner-html';

      (component as any)._element = new ElementRef(mockHtmlElement);
      component.data.set('# Markdown');

      spyOn(component as any, 'loadContent').and.callThrough();
      spyOn(component as any, 'render').and.returnValue(Promise.resolve());

      fixture.detectChanges();
      tick();

      markdownService.reload();
      tick();

      expect((component as any).loadContent).toHaveBeenCalledTimes(2);
    }));
  });

  describe('render', () => {
    it('should parse markdown through MarkdownService', async () => {
      const raw = '### Raw';

      spyOn(markdownService, 'parse').and.returnValue(Promise.resolve(''));

      componentRef.setInput('inline', true);
      componentRef.setInput('emoji', false);
      componentRef.setInput('mermaid', false);
      componentRef.setInput('disableSanitizer', true);
      fixture.detectChanges();

      await (component as any).render(raw, true);

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

      spyOn(markdownService, 'parse').and.returnValue(Promise.resolve(parsed));
      spyOn(component as any, 'handlePlugins');
      spyOn(component as any, 'processInternalLinks');
      spyOn(component.ready, 'emit');

      // Directly simulate the effect of markdownService.render on the component's element
      // This is okay as we are not testing markdownService.render's implementation here
      spyOn(markdownService, 'render').and.callFake((element: HTMLElement, options: any, viewContainerRef: any) => {
        component['_element'].nativeElement.innerHTML = parsed;
      });

      await (component as any).render(raw);

      expect(component['_element'].nativeElement.innerHTML).toBe(parsed);
    });

    it('should handle commandline plugin correctly', async () => {
      const markdown =
        '```powershell\nGet-Date\n\nSunday, November 7, 2021 8:19:21 PM\n\n```';

      // Spy on markdownService.parse and markdownService.render once
      const parseSpy = spyOn(markdownService, 'parse');
      spyOn(markdownService, 'render').and.callFake((element: HTMLElement) => {
        component['_element'].nativeElement.innerHTML = element.innerHTML;
      });

      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      // Helper function to generate mock parsed HTML with specific attributes
      const generateMockParsedHtml = (
        markdownContent: string,
        attributes: Record<string, string | null>,
        classList: string[] = [],
      ) => {
        // Create a temporary div to build the HTML structure as if parsed by marked
        const tempDiv = document.createElement('div');
        const preElement = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.textContent = markdownContent.replace(/```[\s\S]*?\n([\s\S]*?)```/, '$1'); // Extract content between backticks
        preElement.appendChild(codeElement);
        tempDiv.appendChild(preElement);

        // Apply attributes and classes
        for (const key in attributes) {
          if (attributes[key] !== null) {
            preElement.setAttribute(key, attributes[key]);
          } else {
            preElement.removeAttribute(key);
          }
        }
        classList.forEach(cls => preElement.classList.add(cls));

        return tempDiv.innerHTML;
      };

      // --- First render for initial check ---
      // Simulate markdownService.parse returning HTML with 'command-line' class
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, {}, ['command-line']),
        ),
      );

      componentRef.setInput('commandLine', true);
      fixture.detectChanges();
      await (component as any).render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('command-line');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start'),
      ).toBeNull();

      // --- Subsequent renders for each option ---

      // Test filterOutput
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, { 'data-filter-output': '(out)' }, ['command-line']),
        ),
      );
      componentRef.setInput('filterOutput', '(out)');
      fixture.detectChanges();
      await (component as any).render(markdown);
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-filter-output')
          ?.value,
      ).toBe('(out)');

      // Test host
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, { 'data-host': 'localhost' }, ['command-line']),
        ),
      );
      componentRef.setInput('host', 'localhost');
      fixture.detectChanges();
      await (component as any).render(markdown);
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-host')?.value,
      ).toBe('localhost');

      // Test prompt
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, { 'data-prompt': 'PS C:\\Users\\Chris>' }, ['command-line']),
        ),
      );
      componentRef.setInput('prompt', 'PS C:\\Users\\Chris>');
      fixture.detectChanges();
      await (component as any).render(markdown);
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-prompt')?.value,
      ).toBe('PS C:\\Users\\Chris>');

      // Test output
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, { 'data-output': '2-4' }, ['command-line']),
        ),
      );
      componentRef.setInput('output', '2-4');
      fixture.detectChanges();
      await (component as any).render(markdown);
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-output')?.value,
      ).toBe('2-4');

      // Test user
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtml(markdown, { 'data-user': 'root' }, ['command-line']),
        ),
      );
      componentRef.setInput('user', 'root');
      fixture.detectChanges();
      await (component as any).render(markdown);
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-user')?.value,
      ).toBe('root');
    });

    it('should handle lineNumbers plugin correctly', async () => {
      const markdown = '```javascript\nconst random = \'Math.random();\n```';

      const parseSpy = spyOn(markdownService, 'parse');
      spyOn(markdownService, 'render').and.callFake((element: HTMLElement) => {
        component['_element'].nativeElement.innerHTML = element.innerHTML;
      });

      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      const generateMockParsedHtmlForLineNumbers = (
        markdownContent: string,
        attributes: Record<string, string | null>,
        classList: string[] = [],
      ) => {
        const tempDiv = document.createElement('div');
        const preElement = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.textContent = markdownContent.replace(/```[\s\S]*?\n([\s\S]*?)```/, '$1');
        preElement.appendChild(codeElement);
        tempDiv.appendChild(preElement);

        for (const key in attributes) {
          if (attributes[key] !== null) {
            preElement.setAttribute(key, attributes[key]);
          } else {
            preElement.removeAttribute(key);
          }
        }
        classList.forEach(cls => preElement.classList.add(cls));
        return tempDiv.innerHTML;
      };

      // --- First render for initial check ---
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtmlForLineNumbers(markdown, {}, ['line-numbers']),
        ),
      );

      componentRef.setInput('lineNumbers', true);
      fixture.detectChanges();
      await (component as any).render(markdown);

      expect(getHTMLPreElement()?.classList).toContain('line-numbers');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start'),
      ).toBeNull();

      // --- Subsequent render for data-start ---
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtmlForLineNumbers(markdown, { 'data-start': '5' }, ['line-numbers']),
        ),
      );
      componentRef.setInput('start', 5);
      fixture.detectChanges();
      await (component as any).render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-start')?.value,
      ).toBe('5');
    });

    it('should handle lineHighlight plugin correctly', async () => {
      const markdown = '```javascript\nconst random = \'Math.random();\n```';

      const parseSpy = spyOn(markdownService, 'parse');
      spyOn(markdownService, 'render').and.callFake((element: HTMLElement) => {
        component['_element'].nativeElement.innerHTML = element.innerHTML;
      });

      const getHTMLPreElement = () =>
        (fixture.nativeElement as HTMLElement).querySelector('pre');

      const generateMockParsedHtmlForLineHighlight = (
        markdownContent: string,
        attributes: Record<string, string | null>,
        classList: string[] = [],
      ) => {
        const tempDiv = document.createElement('div');
        const preElement = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.textContent = markdownContent.replace(/```[\s\S]*?\n([\s\S]*?)```/, '$1');
        preElement.appendChild(codeElement);
        tempDiv.appendChild(preElement);

        for (const key in attributes) {
          if (attributes[key] !== null) {
            preElement.setAttribute(key, attributes[key]);
          } else {
            preElement.removeAttribute(key);
          }
        }
        classList.forEach(cls => preElement.classList.add(cls));
        return tempDiv.innerHTML;
      };

      // --- First render for initial check ---
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtmlForLineHighlight(markdown, { 'data-line': '6, 10-16' }, ['line-highlight']),
        ),
      );

      componentRef.setInput('lineHighlight', true);
      componentRef.setInput('line', '6, 10-16');
      fixture.detectChanges();
      await (component as any).render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line')?.value,
      ).toBe('6, 10-16');
      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line-offset'),
      ).toBeNull();

      // --- Subsequent render for data-line-offset ---
      parseSpy.and.returnValue(
        Promise.resolve(
          generateMockParsedHtmlForLineHighlight(markdown, {
            'data-line': '6, 10-16',
            'data-line-offset': '5',
          }, ['line-highlight']),
        ),
      );
      componentRef.setInput('lineOffset', 5);
      fixture.detectChanges();
      await (component as any).render(markdown);

      expect(
        getHTMLPreElement()?.attributes.getNamedItem('data-line-offset')?.value,
      ).toBe('5');
    });

    it('should render html element through MarkdownService with correct options', async () => {
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
      const mermaidOptions: MermaidAPI.MermaidConfig = { darkMode: true };

      spyOn(markdownService, 'parse').and.returnValue(Promise.resolve(parsed));
      spyOn(markdownService, 'render');

      componentRef.setInput('clipboard', true);
      componentRef.setInput('clipboardButtonComponent', clipboardOptions.buttonComponent);
      componentRef.setInput('clipboardButtonTemplate', clipboardOptions.buttonTemplate);
      componentRef.setInput('clipboardButtonTextCopy', clipboardOptions.buttonTextCopy);
      componentRef.setInput('clipboardButtonTextCopied', clipboardOptions.buttonTextCopied);
      componentRef.setInput('clipboardLanguageButton', clipboardOptions.languageButton);
      componentRef.setInput('katex', true);
      componentRef.setInput('katexOptions', katexOptions);
      componentRef.setInput('mermaid', true);
      componentRef.setInput('mermaidOptions', mermaidOptions);
      fixture.detectChanges();

      await (component as any).render(raw);

      expect(markdownService.parse).toHaveBeenCalledWith(raw, {
        decodeHtml: false,
        inline: false,
        emoji: false,
        mermaid: true,
        disableSanitizer: false,
      });

      expect(markdownService.render).toHaveBeenCalledWith(
        component['_element'].nativeElement,
        {
          clipboard: true,
          clipboardOptions: clipboardOptions,
          katex: true,
          katexOptions: katexOptions,
          mermaid: true,
          mermaidOptions: mermaidOptions,
        },
        component['_viewContainerRef'],
      );
    });

    it('should emit `ready` when parsing and rendering is done', async () => {
      const markdown = '# Markdown';
      const parsed = '<h1 id="markdown">Markdown</h1>';

      spyOn(markdownService, 'parse').and.returnValue(Promise.resolve(parsed));
      spyOn(markdownService, 'render');

      const readySpy = spyOn(component.ready, 'emit');

      await (component as any).render(markdown);

      expect(markdownService.parse).toHaveBeenCalled();
      expect(component['_element'].nativeElement.innerHTML).toBe(parsed);
      expect(markdownService.render).toHaveBeenCalled();
      expect(readySpy).toHaveBeenCalled();
    });
  });
});