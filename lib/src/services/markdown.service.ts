import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  EmbeddedViewRef,
  inject,
  Injectable,
  InjectionToken,
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
import { ClipboardButtonComponent } from '../clipboard-button/clipboard-button.component';
import { CLIPBOARD_OPTIONS, ClipboardOptions, ClipboardRenderOptions } from '../clipboard-button/clipboard-options';
import { KatexOptions } from '../configuration/katex-options';
import { MARKED_EXTENSIONS } from '../configuration/marked-extensions';
import { MARKED_OPTIONS, MarkedOptions } from '../configuration/marked-options';
import { MarkedRenderer, MarkedToken } from '../configuration/marked-renderer';
import { MERMAID_OPTIONS, MermaidAPI } from '../configuration/mermaid-options';

//  * clipboard
declare let ClipboardJS: {
  new(selector: string | Element | NodeListOf<Element>, options?: {
    text?: (elem: Element) => string
  }): typeof ClipboardJS;
  destroy(): void;
};

// * emoji
declare let joypixels: {
  shortnameToUnicode(input: string): string;
};

// * katex
declare let katex: unknown;

declare function renderMathInElement(elem: HTMLElement, options?: KatexOptions): void;

// * mermaid
declare let mermaid: {
  initialize: (options: MermaidAPI.MermaidConfig) => void;
  run: (runOptions: MermaidAPI.RunOptions) => void;
};

// * prism
declare let Prism: {
  highlightAllUnder: (element: Element | Document) => void;
};

export const ERROR_JOYPIXELS_NOT_LOADED = '[ngx-markdown] Emoji-Toolkit files required. See README for more information';
export const ERROR_KATEX_NOT_LOADED = '[ngx-markdown] KaTeX files required. See README for more information';
export const ERROR_MERMAID_NOT_LOADED = '[ngx-markdown] Mermaid files required. See README for more information';
export const ERROR_CLIPBOARD_NOT_LOADED = '[ngx-markdown] Clipboard files required. See README for more information';
export const ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED = '[ngx-markdown] viewContainerRef parameter required for clipboard';
export const ERROR_SRC_WITHOUT_HTTP_CLIENT = '[ngx-markdown] HttpClient required for src attribute. See README for more information';

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
  mermaidOptions?: MermaidAPI.MermaidConfig;
}

export class ExtendedRenderer extends Renderer {
  ɵNgxMarkdownRendererExtendedForExtensions = false;
  ɵNgxMarkdownRendererExtendedForMermaid = false;
}

@Injectable({
  providedIn: 'root' // Make the service a singleton and tree-shakable
})
export class MarkdownService {
  // * == SERVICE INJECTIONS ==
  private readonly _clipboardOptions = inject<ClipboardOptions>(CLIPBOARD_OPTIONS, { optional: true });
  private readonly _extensions = inject(MARKED_EXTENSIONS, { optional: true }) as MarkedExtension[];
  private readonly _mermaidOptions = inject<MermaidAPI.MermaidConfig>(MERMAID_OPTIONS, { optional: true });
  private readonly _platform = inject(PLATFORM_ID);
  private readonly _securityContext = inject<SecurityContext>(SECURITY_CONTEXT);
  private readonly _http = inject(HttpClient, { optional: true });
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _userMarkedOptions: MarkedOptions | null = inject<MarkedOptions>(MARKED_OPTIONS, { optional: true });

  // * == DEFAULT OPTIONS ==
  private readonly DEFAULT_MARKED_OPTIONS: MarkedOptions = { renderer: new MarkedRenderer() };
  private readonly DEFAULT_KATEX_OPTIONS: KatexOptions = {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true },
      { left: '\\begin{align}', right: '\\end{align}', display: true },
      { left: '\\begin{align*}', right: '\\end{align*}', display: true },
      { left: '\\begin{aligned}', right: '\\end{aligned}', display: true },
      { left: '\\begin{alignat}', right: '\\end{alignat}', display: true },
      { left: '\\begin{alignat*}', right: '\\end{alignat*}', display: true },
      { left: '\\begin{alignedat}', right: '\\end{alignedat}', display: true },
      { left: '\\begin{array}', right: '\\end{array}', display: true },
      { left: '\\begin{bmatrix}', right: '\\end{bmatrix}', display: true },
      { left: '\\begin{cases}', right: '\\end{cases}', display: true },
      { left: '\\begin{CD}', right: '\\end{CD}', display: true },
      { left: '\\begin{equation}', right: '\\end{equation}', display: true },
      { left: '\\begin{gather}', right: '\\end{gather}', display: true },
      { left: '\\begin{matrix}', right: '\\end{matrix}', display: true },
      { left: '\\begin{pmatrix}', right: '\\end{pmatrix}', display: true },
      { left: '\\begin{rcases}', right: '\\end{rcases}', display: true },
      { left: '\\begin{smallmatrix}', right: '\\end{smallmatrix}', display: true },
      { left: '\\begin{vmatrix}', right: '\\end{vmatrix}', display: true },
      { left: '\\begin{Vmatrix}', right: '\\end{Vmatrix}', display: true },
    ],
  };

  private readonly DEFAULT_MERMAID_OPTIONS: MermaidAPI.MermaidConfig = { startOnLoad: false };
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

  private _options: MarkedOptions;
  private readonly _reload$ = new Subject<void>();
  readonly reload$ = this._reload$.asObservable();

  constructor() {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...this._userMarkedOptions };
  }

  get options(): MarkedOptions {
    return this._options;
  }

  set options(value: MarkedOptions) {
    this._options = { ...this.DEFAULT_MARKED_OPTIONS, ...value };
  }

  get renderer(): MarkedRenderer {
    // Ensure the renderer always exists, falling back to a new instance if needed
    if (!this.options.renderer) this.options.renderer = new MarkedRenderer();
    return this.options.renderer;
  }

  set renderer(value: MarkedRenderer) {
    this.options.renderer = value;
  }

  /**
   * Parses a Markdown string into HTML.
   * @param markdown The Markdown string to parse.
   * @param parseOptions Optional configuration for the parsing process.
   * @returns The parsed HTML string or a Promise of a string if extensions are asynchronous.
   */
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

    if (this._extensions) this.renderer = this.extendRenderer(renderer, 'extensions');
    if (mermaid) this.renderer = this.extendRenderer(renderer, 'mermaid');

    const trimmed = this.trimIndentation(markdown);
    const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
    const emojified = emoji ? this.parseEmoji(decoded) : decoded;

    const markedOutput = this.parseMarked(emojified, markedOptions, inline);

    if (markedOutput instanceof Promise) {
      return markedOutput.then(output => this.sanitizeOutput(output, disableSanitizer));
    }

    return this.sanitizeOutput(markedOutput, disableSanitizer);
  }

  /**
   * Parses an inline Markdown string into HTML.
   * @param markdown The inline Markdown string to parse.
   * @param options Optional Marked options.
   * @returns The parsed inline HTML string or a Promise of a string.
   */
  parseInline(markdown: string, options?: MarkedOptions | null): string | Promise<string> {
    return marked.parseInline(markdown, options);
  }

  /**
   * Renders additional features (clipboard, KaTeX, Mermaid) within an HTML element.
   * @param element The HTML element where features should be rendered.
   * @param options Optional rendering options.
   * @param viewContainerRef Optional `ViewContainerRef` for dynamic component creation (required for clipboard button).
   */
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
    if (mermaid) this.renderMermaid(element, { ...this.DEFAULT_MERMAID_OPTIONS, ...this._mermaidOptions, ...mermaidOptions });
    if (clipboard) this.renderClipboard(element, viewContainerRef, { ...this.DEFAULT_CLIPBOARD_OPTIONS, ...this._clipboardOptions, ...clipboardOptions });

    this.highlight(element);
  }

  /**
   * Triggers a reload of Markdown content in components using this service.
   */
  reload(): void {
    this._reload$.next();
  }

  /**
   * Fetches Markdown content from a given URL or file path.
   * Automatically adds a language fence if the extension is not `.md`.
   * @param src The URL or file path to the Markdown source.
   * @returns An `Observable` of the Markdown content as a string.
   * @throws Error if `HttpClient` is not available.
   */
  getSource(src: string): Observable<string> {
    if (!this._http) throw new Error(ERROR_SRC_WITHOUT_HTTP_CLIENT);

    return this._http.get(src, { responseType: 'text' }).pipe(map(markdown => this.handleExtension(src, markdown)));
  }

  /**
   * Highlights code blocks within a specified HTML element using Prism.js.
   * @param element The HTML element containing the code blocks to highlight. Defaults to `document`.
   */
  highlight(element?: Element | Document): void {
    if (!isPlatformBrowser(this._platform)) return;
    if (typeof Prism === 'undefined' || typeof Prism.highlightAllUnder === 'undefined') {
      console.warn('Prism.js not loaded. Code highlighting will not be applied.');
      return
    }

    const targetElement = element || document;

    const noLanguageElements = targetElement.querySelectorAll('pre code:not([class*="language-"])');
    noLanguageElements.forEach(x => x.classList.add('language-none'));
    Prism.highlightAllUnder(targetElement);
  }

  /**
   * Decodes HTML entities in a given HTML string.
   * @param html The HTML string to decode.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The HTML string with decoded entities.
   */
  private decodeHtml(html: string): string {
    if (!isPlatformBrowser(this._platform)) return html;

    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }

  /**
   * Extends the Marked.js renderer with custom functionalities like extensions or Mermaid handling.
   * Prevents re-extension by checking internal flags on the renderer instance.
   * @param renderer The Marked.js renderer instance to extend.
   * @param type The type of extension ('extensions' or 'mermaid').
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The extended renderer instance.
   */
  private extendRenderer(renderer: Renderer, type: 'extensions' | 'mermaid'): Renderer {
    const extendedRenderer = renderer as ExtendedRenderer;
    const flag = type === 'extensions' ? 'ɵNgxMarkdownRendererExtendedForExtensions' : 'ɵNgxMarkdownRendererExtendedForMermaid';

    if (extendedRenderer[flag]) return renderer;

    if (type === 'extensions' && this._extensions?.length > 0) marked.use(...this._extensions);

    if (type === 'mermaid') {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      const defaultCode = renderer.code;

      renderer.code = (codeToken: MarkedToken.Code) => {
        if (codeToken.lang === 'mermaid') {
          return `<div class="mermaid">${ codeToken.text }</div>`;
        } else if (defaultCode) {
          return defaultCode.call(renderer, codeToken);
        }
        return '';
      };
    }

    extendedRenderer[flag] = true;
    return renderer;
  }

  /**
   * Adds a language fence to Markdown content if the source URL's extension is not `.md`.
   * Useful for displaying code snippets from files with other extensions.
   * @param src The source URL or file path.
   * @param markdown The raw Markdown content.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The Markdown content, possibly with a language fence.
   */
  private handleExtension(src: string, markdown: string): string {
    const extensionMatch = src.match(/\.([a-zA-Z0-9]+)(?:[?#].*)?$/);
    const extension = extensionMatch ? extensionMatch[1] : '';

    return extension && extension !== 'md'
      ? `\`\`\`${ extension }\n${ markdown }\n\`\`\``
      : markdown;
  }

  /**
   * Parses emoji shortcodes (e.g., `:smile:`) into Unicode emoji characters.
   * Requires `joypixels` (Emoji-Toolkit) to be loaded.
   * @param markdown The Markdown string to parse for emojis.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The Markdown string with emojis replaced.
   * @throws Error if `joypixels` is not loaded.
   */
  private parseEmoji(markdown: string): string {
    if (!isPlatformBrowser(this._platform)) return markdown;

    if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
      throw new Error(ERROR_JOYPIXELS_NOT_LOADED);
    }

    return joypixels.shortnameToUnicode(markdown);
  }

  /**
   * Parses a Markdown string using Marked.js with the specified options.
   * Handles both inline and block parsing.
   * @param markdown The Markdown string to parse.
   * @param options The Marked.js options to use for parsing.
   * @param inline Whether to parse as inline Markdown.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The parsed HTML string or a Promise of a string.
   */
  private parseMarked(markdown: string, options: MarkedOptions, inline = false): string | Promise<string> {
    if (options.renderer) {
      // Clone renderer and remove extended flags to prevent Marked.js errors
      const renderer = { ...options.renderer } as Partial<ExtendedRenderer>;
      delete renderer.ɵNgxMarkdownRendererExtendedForExtensions;
      delete renderer.ɵNgxMarkdownRendererExtendedForMermaid;

      marked.use({ renderer });
    }

    return inline ? this.parseInline(markdown, options) : marked(markdown, options);
  }

  /**
   * Sanitizes the given HTML output using Angular's `DomSanitizer`.
   * @param html The HTML string to sanitize.
   * @param disableSanitizer If `true`, sanitation is skipped.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The sanitized HTML string.
   */
  private sanitizeOutput(html: string, disableSanitizer: boolean | undefined): string {
    return disableSanitizer ? html : this._sanitizer.sanitize(this._securityContext, html) || '';
  }

  /**
   * Renders clipboard copy buttons for code blocks within the given HTML element.
   * Requires `ClipboardJS` to be loaded and a `ViewContainerRef` for component creation.
   * @param element The HTML element containing code blocks.
   * @param viewContainerRef The `ViewContainerRef` to attach the clipboard button component/template.
   * @param options Clipboard rendering options.
   * @private - This method is private and should not be accessed outside of this class
   * @throws Error if `ClipboardJS` is not loaded or `viewContainerRef` is missing.
   */
  private renderClipboard(element: HTMLElement, viewContainerRef: ViewContainerRef | undefined, options: ClipboardRenderOptions): void {
    if (!isPlatformBrowser(this._platform)) return;
    if (typeof ClipboardJS === 'undefined') throw new Error(ERROR_CLIPBOARD_NOT_LOADED);
    if (!viewContainerRef) throw new Error(ERROR_CLIPBOARD_VIEW_CONTAINER_REQUIRED);

    const {
      buttonComponent,
      buttonTemplate,
      buttonTextCopy,
      buttonTextCopied,
      languageButton,
    } = options;

    const preElements = element.querySelectorAll('pre');

    preElements.forEach(preElement => {
      const preWrapperElement = this.createPreWrapper(preElement);
      const toolbarWrapperElement = this.createToolbar(preWrapperElement);

      // Register mouse enter/leave listeners
      this.addToolbarHoverListeners(preWrapperElement, toolbarWrapperElement);

      // Create a button component or template
      const embeddedViewRef = this.createClipboardButton(
        viewContainerRef,
        buttonComponent,
        buttonTemplate,
        preElement,
        languageButton,
        buttonTextCopy,
        buttonTextCopied
      );

      // Attach clipboard.js to the root node
      this.attachClipboardJS(embeddedViewRef, toolbarWrapperElement, preElement);
    });
  }

  /**
   * Creates a wrapper `div` around a `<pre>` element for styling and positioning.
   * @param preElement The `<pre>` element to wrap.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The newly created wrapper `div`.
   */
  private createPreWrapper(preElement: HTMLElement): HTMLElement {
    const preWrapperElement = document.createElement('div');
    preWrapperElement.style.position = 'relative';
    preElement.parentNode!.insertBefore(preWrapperElement, preElement);
    preWrapperElement.appendChild(preElement);
    return preWrapperElement;
  }

  /**
   * Creates a toolbar `div` within the pre-wrapper for housing the clipboard button.
   * @param preWrapperElement The wrapper `div` for the `<pre>` element.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The newly created toolbar `div`.
   */
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

  /**
   * Adds mouse enter/leave listeners to the pre-wrapper to control toolbar visibility.
   * @param preWrapperElement The wrapper `div` for the `<pre>` element.
   * @param toolbarWrapperElement The toolbar `div`.
   * @private - This method is private and should not be accessed outside of this class
   */
  private addToolbarHoverListeners(preWrapperElement: HTMLElement, toolbarWrapperElement: HTMLElement): void {
    preWrapperElement.addEventListener('mouseenter', () => toolbarWrapperElement.classList.add('hover'));
    preWrapperElement.addEventListener('mouseleave', () => toolbarWrapperElement.classList.remove('hover'));
  }

  /**
   * Creates and returns an `EmbeddedViewRef` for the clipboard button, using either a
   * provided component, template, or the default `ClipboardButtonComponent`.
   * @param viewContainerRef The `ViewContainerRef` to create the component/template in.
   * @param buttonComponent Optional custom button component type.
   * @param buttonTemplate Optional custom button template.
   * @param preElement The `<pre>` element associated with the button.
   * @param languageButton Whether to display the detected language on the button.
   * @param buttonTextCopy Custom text for the "copy" state.
   * @param buttonTextCopied Custom text for the "copied" state.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns An `EmbeddedViewRef` representing the created button.
   */
  private createClipboardButton<T>(
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

    if (buttonComponent) {     // ? use the provided component via input property or provided via ClipboardOptions provider
      const componentRef = viewContainerRef.createComponent(buttonComponent);
      embeddedViewRef = componentRef.hostView as EmbeddedViewRef<T>;
      componentRef.changeDetectorRef.markForCheck();
    } else if (buttonTemplate) { // ? use the provided template via input property
      embeddedViewRef = viewContainerRef.createEmbeddedView(buttonTemplate);
    } else { // ? use default component
      const componentRef = viewContainerRef.createComponent(ClipboardButtonComponent);
      this.setClipboardButtonText(componentRef.instance, preElement, languageButton, buttonTextCopy, buttonTextCopied);
      embeddedViewRef = componentRef.hostView as EmbeddedViewRef<T>;
      componentRef.changeDetectorRef.markForCheck();
    }

    return embeddedViewRef;
  }

  /**
   * Sets the `buttonTextCopy` and `buttonTextCopied` signals on a `ClipboardButtonComponent` instance.
   * @param instance The `ClipboardButtonComponent` instance.
   * @param preElement The associated `<pre>` element.
   * @param languageButton Whether to derive the "copy" text from the code language.
   * @param buttonTextCopy Custom text for the "copy" state.
   * @param buttonTextCopied Custom text for the "copied" state.
   * @private - This method is private and should not be accessed outside of this class
   */
  private setClipboardButtonText(
    instance: ClipboardButtonComponent,
    preElement: HTMLElement,
    languageButton?: boolean,
    buttonTextCopy?: string,
    buttonTextCopied?: string,
  ): void {
    if (!instance) {
      console.error('ClipboardButtonComponent instance is undefined. Cannot set button text.');
      return;
    }

    const detectedLanguage = languageButton ? preElement.querySelector('code')?.className.replace('language-', '') || 'Copy' : 'Copy';
    instance.buttonTextCopy.set(buttonTextCopy || detectedLanguage);
    instance.buttonTextCopied.set(buttonTextCopied || 'Copied!');
  }

  /**
   * Attaches Clipboard.js functionality to the clipboard button's root node.
   * Destroys the Clipboard.js instance when the `embeddedViewRef` is destroyed.
   * @param embeddedViewRef The `EmbeddedViewRef` of the clipboard button.
   * @param toolbarWrapperElement The toolbar `div` where the button is appended.
   * @param preElement The `<pre>` element whose content will be copied.
   * @private - This method is private and should not be accessed outside of this class
   */
  private attachClipboardJS(embeddedViewRef: EmbeddedViewRef<unknown>, toolbarWrapperElement: HTMLElement, preElement: HTMLElement): void {
    let clipboardInstance: typeof ClipboardJS;

    embeddedViewRef.rootNodes.forEach((node: HTMLElement) => {
      toolbarWrapperElement.appendChild(node);
      clipboardInstance = new ClipboardJS(node, { text: () => preElement.innerText });
    });

    embeddedViewRef.onDestroy(() => {
      if (clipboardInstance) clipboardInstance.destroy();
    });
  }

  /**
   * Renders mathematical expressions using KaTeX within the given HTML element.
   * Requires `katex` and `renderMathInElement` to be loaded.
   * @param element The HTML element where KaTeX expressions should be rendered.
   * @param options Optional KaTeX options.
   * @private - This method is private and should not be accessed outside of this class
   * @throws Error if KaTeX files are not loaded.
   */
  private renderKatex(element: HTMLElement, options?: KatexOptions): void {
    if (!isPlatformBrowser(this._platform)) return;

    if (typeof katex === 'undefined' || typeof renderMathInElement === 'undefined') {
      throw new Error(ERROR_KATEX_NOT_LOADED);
    }

    renderMathInElement(element, options);
  }

  /**
   * Renders Mermaid diagrams within the given HTML element.
   * Requires `mermaid` to be loaded.
   * @param element The HTML element containing Mermaid diagrams.
   * @param options Optional Mermaid configuration.
   * @private - This method is private and should not be accessed outside of this class
   * @throws Error if Mermaid files are not loaded.
   */
  private renderMermaid(element: HTMLElement, options: MermaidAPI.MermaidConfig = this.DEFAULT_MERMAID_OPTIONS): void {
    if (!isPlatformBrowser(this._platform)) return;

    if (typeof mermaid === 'undefined' || typeof mermaid.initialize === 'undefined') {
      throw new Error(ERROR_MERMAID_NOT_LOADED);
    }

    const mermaidElements = element.querySelectorAll('.mermaid');
    if (mermaidElements.length > 0) {
      mermaid.initialize(options);
      mermaid.run({ nodes: mermaidElements as NodeListOf<HTMLElement> });
    }
  }

  /**
   * Trims common leading indentation from each line of a Markdown string.
   * This prevents unintended code block rendering in some Markdown processors.
   * @param markdown The Markdown string to trim.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @returns The Markdown string with common indentation removed.
   */
  private trimIndentation(markdown: string): string {
    if (!markdown) return '';

    const lines = markdown.split('\n');
    if (lines.length === 0) return '';

    let minIndent = Number.POSITIVE_INFINITY;

    // Find the minimum indentation of non-empty lines
    for (const line of lines) {
      if (line.trim().length > 0) {
        const indentMatch = line.match(/^\s*/);
        if (indentMatch) minIndent = Math.min(minIndent, indentMatch[0].length);
      }
    }

    if (minIndent === Number.POSITIVE_INFINITY || minIndent === 0) {
      return markdown; // No common indentation or only empty lines
    }

    // Remove the common indentation from each line
    return lines.map(line => line.substring(minIndent)).join('\n');
  }
}
