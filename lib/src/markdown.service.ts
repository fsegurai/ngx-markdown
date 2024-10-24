import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
  SecurityContext,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked, MarkedExtension, Renderer } from 'marked';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClipboardButtonComponent } from './clipboard-button.component';
import { CLIPBOARD_OPTIONS, ClipboardOptions, ClipboardRenderOptions } from './clipboard-options';
import { KatexOptions } from './katex-options';
import { MARKED_EXTENSIONS } from './marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from './marked-options';
import { MarkedRenderer } from './marked-renderer';
import { MermaidAPI } from './mermaid-options';

// clipboard
declare let ClipboardJS: {
  new(selector: string | Element | NodeListOf<Element>, options?: {
    text?: (elem: Element) => string
  }): typeof ClipboardJS;
  destroy(): void;
};

// emoji
declare let joypixels: {
  shortnameToUnicode(input: string): string;
};

// katex
declare let katex: unknown;

declare function renderMathInElement(elem: HTMLElement, options?: KatexOptions): void;

// mermaid
declare let mermaid: {
  initialize: (options: MermaidAPI.Config) => void;
  run: (runOptions: MermaidAPI.RunOptions) => void;
};

// prism
declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

export const errorJoyPixelsNotLoaded = '[ngx-markdown] Emoji-Toolkit files required. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] KaTeX files required. See README for more information';
export const errorMermaidNotLoaded = '[ngx-markdown] Mermaid files required. See README for more information';
export const errorClipboardNotLoaded = '[ngx-markdown] Clipboard files required. See README for more information';
export const errorClipboardViewContainerRequired = '[ngx-markdown] viewContainerRef parameter required for clipboard';
export const errorSrcWithoutHttpClient = '[ngx-markdown] HttpClient required for src attribute. See README for more information';

export const SECURITY_CONTEXT = new InjectionToken<SecurityContext>('SECURITY_CONTEXT');

export interface ParseOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  mermaid?: boolean;
  markedOptions?: MarkedOptions;
  disableSanitizer?: boolean;
}

export interface RenderOptions {
  clipboard?: boolean;
  clipboardOptions?: ClipboardRenderOptions;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.Config;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtendedForExtensions = false;
  ɵNgxMarkdownRendererExtendedForMermaid = false;
}

@Injectable()
export class MarkdownService {
  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = { renderer: new MarkedRenderer() };
  private readonly DEFAULT_KATEX_OPTIONS: KatexOptions = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\begin{equation}', right: '\\end{equation}', display: true },
      { left: '\\begin{align}', right: '\\end{align}', display: true },
      { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
      { left: '\\begin{gather}', right: '\\end{gather}', display: true },
      { left: '\\begin{CD}', right: '\\end{CD}', display: true },
      { left: '\\[', right: '\\]', display: true },
    ],
  };
  private readonly DEFAULT_MERMAID_OPTIONS: MermaidAPI.Config = { startOnLoad: false };
  private readonly DEFAULT_CLIPBOARD_OPTIONS: ClipboardOptions = { buttonComponent: undefined };
  private readonly DEFAULT_PARSE_OPTIONS: ParseOptions = {
    decodeHtml: false,
    inline: false,
    emoji: false,
    mermaid: false,
    markedOptions: undefined,
    disableSanitizer: false,
  };
  private readonly DEFAULT_RENDER_OPTIONS: RenderOptions = {
    clipboard: false,
    clipboardOptions: undefined,
    katex: false,
    katexOptions: undefined,
    mermaid: false,
    mermaidOptions: undefined,
  };

  private readonly _reload$ = new Subject<void>();
  readonly reload$ = this._reload$.asObservable();

  private _options: MarkedOptions = this.DEFAULT_MARKED_OPTIONS;

  constructor(
    @Inject(CLIPBOARD_OPTIONS) @Optional() private clipboardOptions: ClipboardOptions,
    @Inject(MARKED_EXTENSIONS) @Optional() private extensions: MarkedExtension[],
    @Inject(MARKED_OPTIONS) @Optional() options: MarkedOptions,
    @Inject(PLATFORM_ID) private platform: object,
    @Inject(SECURITY_CONTEXT) private securityContext: SecurityContext,
    @Optional() private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
    this.options = { ...this.DEFAULT_MARKED_OPTIONS, ...options };
  }

  get options(): MarkedOptions {
    return this._options;
  }

  set options(value: MarkedOptions) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer {
    return this.options.renderer!;
  }

  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  parse(markdown: string, parseOptions: ParseOptions = this.DEFAULT_PARSE_OPTIONS): string | Promise<string> {
    const {
      decodeHtml,
      inline,
      emoji,
      mermaid,
      disableSanitizer,
      markedOptions: userMarkedOptions,
    } = parseOptions;

    const markedOptions = { ...this.options, ...userMarkedOptions };
    const renderer = markedOptions.renderer || this.renderer;

    if (this.extensions) this.renderer = this.extendRenderer(renderer, 'extensions');
    if (mermaid) this.renderer = this.extendRenderer(renderer, 'mermaid');

    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.parseEmoji(decoded) : decoded;
    const markedOutput = this.parseMarked(emojified, markedOptions, inline);
    const sanitized = disableSanitizer ? markedOutput : this.sanitizer.sanitize(this.securityContext, markedOutput);

    return sanitized || '';
  }

  render(element: HTMLElement, options: RenderOptions = this.DEFAULT_RENDER_OPTIONS, viewContainerRef?: ViewContainerRef): void {
    const {
      clipboard,
      clipboardOptions,
      katex,
      katexOptions,
      mermaid,
      mermaidOptions,
    } = options;

    if (katex) this.renderKatex(element, { ...this.DEFAULT_KATEX_OPTIONS, ...katexOptions });
    if (mermaid) this.renderMermaid(element, { ...this.DEFAULT_MERMAID_OPTIONS, ...mermaidOptions });
    if (clipboard) this.renderClipboard(element, viewContainerRef, { ...this.DEFAULT_CLIPBOARD_OPTIONS, ...this.clipboardOptions, ...clipboardOptions });

    this.highlight(element);
  }

  reload(): void {
    this._reload$.next();
  }

  getSource(src: string): Observable<string> {
    if (!this.http) throw new Error(errorSrcWithoutHttpClient);

    return this.http.get(src, { responseType: 'text' }).pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  highlight(element?: Element | Document): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }
    if (typeof Prism === 'undefined' || typeof Prism.highlightAllUnder === 'undefined') {
      return;
    }
    if (!element) {
      element = document;
    }
    const noLanguageElements = element.querySelectorAll('pre code:not([class*="language-"])');
    Array.prototype.forEach.call(noLanguageElements, (x: Element) => x.classList.add('language-none'));
    Prism.highlightAllUnder(element);
  }

  private decodeHtml(html: string): string {
    if (!isPlatformBrowser(this.platform)) return html;

    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }

  private extendRenderer(renderer: Renderer, type: 'extensions' | 'mermaid'): Renderer {
    const extendedRenderer = renderer as ExtendedRenderer;
    const flag = type === 'extensions' ? 'ɵNgxMarkdownRendererExtendedForExtensions' : 'ɵNgxMarkdownRendererExtendedForMermaid';

    if (extendedRenderer[flag]) return renderer;

    if (type === 'extensions' && this.extensions?.length > 0) marked.use(...this.extensions);

    if (type === 'mermaid') {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const defaultCode = renderer.code;
      renderer.code = (code: string, language: string | undefined, isEscaped: boolean) => {
        if (language === 'mermaid') {
          return `<div class="mermaid">${code}</div>`;
        } else if (defaultCode) {
          return defaultCode.call(renderer, code, language, isEscaped);
        }
        return '';
      };
    }

    extendedRenderer[flag] = true;
    return renderer;
  }

  private handleExtension(src: string, markdown: string): string {
    const extensionMatch = src.match(/\.([a-zA-Z0-9]+)(?:[?#].*)?$/);
    const extension = extensionMatch ? extensionMatch[1] : '';

    return extension && extension !== 'md'
      ? `\`\`\`${extension}\n${markdown}\n\`\`\``
      : markdown;
  }

  private parseEmoji(markdown: string): string {
    if (!isPlatformBrowser(this.platform)) return markdown;

    if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
      throw new Error(errorJoyPixelsNotLoaded);
    }

    return joypixels.shortnameToUnicode(markdown);
  }

  private parseMarked(markdown: string, options: MarkedOptions, inline = false): string | Promise<string> {
    if (options.renderer) {
      // clone renderer and remove extended flags otherwise
      // marked throws an error thinking it is a renderer prop
      const renderer = { ...options.renderer } as Partial<ExtendedRenderer>;
      delete renderer.ɵNgxMarkdownRendererExtendedForExtensions;
      delete renderer.ɵNgxMarkdownRendererExtendedForMermaid;

      // remove renderer from markedOptions because if renderer is
      // passed to marked.parse method, it will ignore all extensions
      delete options.renderer;

      marked.use({ renderer });
    }

    return inline ? marked.parseInline(markdown, options) : marked(markdown, options);
  }

  private renderClipboard(element: HTMLElement, viewContainerRef: ViewContainerRef | undefined, options: ClipboardRenderOptions): void {
    if (!isPlatformBrowser(this.platform)) return;
    if (typeof ClipboardJS === 'undefined') throw new Error(errorClipboardNotLoaded);
    if (!viewContainerRef) throw new Error(errorClipboardViewContainerRequired);

    const {
      buttonComponent,
      buttonTemplate,
      buttonTextCopy,
      buttonTextCopied,
      languageButton,
    } = options;

    // Target every <pre> element
    const preElements = element.querySelectorAll('pre');

    preElements.forEach(preElement => {
      const preWrapperElement = this.createPreWrapper(preElement);
      const toolbarWrapperElement = this.createToolbar(preWrapperElement);

      // Register mouse enter/leave listeners
      preWrapperElement.addEventListener('mouseenter', () => toolbarWrapperElement.classList.add('hover'));
      preWrapperElement.addEventListener('mouseleave', () => toolbarWrapperElement.classList.remove('hover'));

      // Create button component or template
      const embeddedViewRef = this.createButton(viewContainerRef, buttonComponent, buttonTemplate, preElement, languageButton, buttonTextCopy, buttonTextCopied);

      // Attach clipboard.js to root node
      this.attachClipboard(embeddedViewRef, toolbarWrapperElement, preElement);
    });
  }

  private createPreWrapper(preElement: HTMLElement): HTMLElement {
    const preWrapperElement = document.createElement('div');
    preWrapperElement.style.position = 'relative';
    preElement.parentNode!.insertBefore(preWrapperElement, preElement);
    preWrapperElement.appendChild(preElement);
    return preWrapperElement;
  }

  private createToolbar(preWrapperElement: HTMLElement): HTMLElement {
    const toolbarWrapperElement = document.createElement('div');
    toolbarWrapperElement.classList.add('markdown-clipboard-toolbar');
    toolbarWrapperElement.style.position = 'absolute';
    toolbarWrapperElement.style.top = '.5em';
    toolbarWrapperElement.style.right = '.5em';
    toolbarWrapperElement.style.zIndex = '1';
    preWrapperElement.appendChild(toolbarWrapperElement);
    return toolbarWrapperElement;
  }

  private createButton<T>(
    viewContainerRef: ViewContainerRef,
    buttonComponent: Type<T> | undefined,
    buttonTemplate: TemplateRef<T> | undefined,
    preElement: HTMLElement,
    languageButton?: boolean,
    buttonTextCopy?: string,
    buttonTextCopied?: string,
  ): EmbeddedViewRef<T> {
    // declare embeddedViewRef holding variable
    let embeddedViewRef: EmbeddedViewRef<T>;

    // use provided component via input property
    // or provided via ClipboardOptions provider
    if (buttonComponent) {
      const componentRef = viewContainerRef.createComponent(buttonComponent);
      embeddedViewRef = componentRef.hostView as EmbeddedViewRef<T>;
      componentRef.changeDetectorRef.markForCheck();
      // use provided template via input property
    } else if (buttonTemplate) {
      embeddedViewRef = viewContainerRef.createEmbeddedView(buttonTemplate);
      // use default component
    } else {
      const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
      this.setButtonText(componentRef.instance, preElement, languageButton, buttonTextCopy, buttonTextCopied);
      embeddedViewRef = componentRef.hostView as EmbeddedViewRef<T>;
      componentRef.changeDetectorRef.markForCheck();
    }

    return embeddedViewRef;
  }

  private setButtonText(
    instance: ClipboardButtonComponent,
    preElement: HTMLElement,
    languageButton?: boolean,
    buttonTextCopy?: string,
    buttonTextCopied?: string,
  ): void {
    if (!instance) {
      console.error('ClipboardButtonComponent instance is undefined.');
      return;
    }

    const language = languageButton ? preElement.querySelector('code')?.className.replace('language-', '') || 'Copy' : 'Copy';
    instance.buttonTextCopy = buttonTextCopy || language;
    instance.buttonTextCopied = buttonTextCopied || 'Copied!';
  }

  private attachClipboard(embeddedViewRef: EmbeddedViewRef<unknown>, toolbarWrapperElement: HTMLElement, preElement: HTMLElement): void {
    let clipboardInstance: typeof ClipboardJS;

    embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
      toolbarWrapperElement.appendChild(node);
      clipboardInstance = new ClipboardJS(node, { text: () => preElement.innerText });
    });

    embeddedViewRef.onDestroy(() => clipboardInstance.destroy());
  }

  private renderKatex(element: HTMLElement, options?: KatexOptions): void {
    if (!isPlatformBrowser(this.platform)) return;

    if (typeof katex === 'undefined' || typeof renderMathInElement === 'undefined') {
      throw new Error(errorKatexNotLoaded);
    }

    renderMathInElement(element, options);
  }

  private renderMermaid(element: HTMLElement, options: MermaidAPI.Config = this.DEFAULT_MERMAID_OPTIONS): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }

    if (typeof mermaid === 'undefined' || typeof mermaid.initialize === 'undefined') {
      throw new Error(errorMermaidNotLoaded);
    }

    const mermaidElements = element.querySelectorAll('.mermaid');
    if (mermaidElements.length > 0) {
      mermaid.initialize(options);

      // Convert NodeList to Array
      const nodes = Array.from(mermaidElements) as HTMLElement[];
      mermaid.run({ nodes });
    }
  }

  private trimIndentation(markdown: string): string {
    // Return early if markdown is null, undefined, or empty
    if (!markdown) return '';

    const indentSize = markdown.match(/^[^\S\r\n]*(?=\S)/gm)?.reduce((min, line) => Math.min(min, line.length), Number.POSITIVE_INFINITY) ?? 0;
    return indentSize > 0 ? markdown.replace(new RegExp(`^[^S\r\n]{${indentSize}}`, 'gm'), '') : markdown;
  }
}
