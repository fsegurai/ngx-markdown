import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  InputSignal,
  InputSignalWithTransform,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationExtras } from '@angular/router';
import { KatexOptions } from '../configuration/katex-options';
import { MermaidAPI } from '../configuration/mermaid-options';
import { PrismPlugin } from '../configuration/prism-plugin';
import { MarkdownLinkService } from '../services/markdown-link.service';
import { MarkdownService, ParseOptions, RenderOptions } from '../services/markdown.service';

export interface MarkdownRouterLinkOptions {
  global?: NavigationExtras;
  paths?: Record<string, NavigationExtras | undefined>;
  internalBrowserHandler?: boolean; // Angular SPA navigation
  internalDesktopHandler?: boolean; // Electron desktop navigation
  externalBrowserHandler?: boolean; // External browser navigation
}

@Component({
  selector: 'ngx-markdown, markdown, [markdown]',
  template: `
    <ng-content></ng-content>
  `,
  imports: [CommonModule],
})
export class MarkdownComponent implements AfterViewInit {
  // * == SERVICE INJECTIONS ==
  private readonly _markdownService: MarkdownService = inject(MarkdownService);
  private readonly _markdownLinkService: MarkdownLinkService = inject(MarkdownLinkService);
  private readonly _element: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private readonly _destroyRef = inject(DestroyRef);

  // * == INPUTS ==
  readonly data: ModelSignal<string | null | undefined> = model<string | null>();
  readonly src: ModelSignal<string | null | undefined> = model<string | null>();
  // ? Router link options for internal and external links
  readonly routerLinkOptions: InputSignal<MarkdownRouterLinkOptions | undefined> = input<MarkdownRouterLinkOptions>();
  // ? Disable the sanitizer for the Markdown content
  readonly disableSanitizer: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly disableRouterLinkHandler: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  // ? Whether to render the Markdown inline or not
  readonly inline: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  // ? Whether to enable the clipboard functionality
  readonly clipboard: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly clipboardButtonComponent: InputSignal<Type<unknown> | undefined> = input<Type<unknown>>();
  readonly clipboardButtonTemplate: InputSignal<TemplateRef<unknown> | undefined> = input<TemplateRef<unknown>>();
  readonly clipboardButtonTextCopy: InputSignal<string | undefined> = input<string>();
  readonly clipboardButtonTextCopied: InputSignal<string | undefined> = input<string>();
  readonly clipboardLanguageButton: InputSignal<boolean | undefined> = input<boolean>();
  // ? Whether to enable the emoji rendering
  readonly emoji: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  // ? Options for KaTeX rendering
  readonly katex: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly katexOptions: InputSignal<KatexOptions | undefined> = input<KatexOptions>();
  // ? Whether to enable the Mermaid rendering
  readonly mermaid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly mermaidOptions: InputSignal<MermaidAPI.MermaidConfig | undefined> = input<MermaidAPI.MermaidConfig>();
  // ? Whether to enable the line highlighting
  readonly lineHighlight: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly line: InputSignal<string | string[] | undefined> = input<string | string[]>();
  readonly lineOffset: InputSignal<number | undefined> = input<number>();
  // ? Whether to enable the line numbers
  readonly lineNumbers: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly start: InputSignal<number | undefined> = input<number>();
  // ? Whether to enable the command line rendering
  readonly commandLine: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute });
  readonly filterOutput: InputSignal<string | undefined> = input<string>();
  readonly host: InputSignal<string | undefined> = input<string>();
  readonly prompt: InputSignal<string | undefined> = input<string>();
  readonly output: InputSignal<string | undefined> = input<string>();
  readonly user: InputSignal<string | undefined> = input<string>();

  // * == OUTPUTS ==
  readonly error: OutputEmitterRef<string | Error> = output<string | Error>();
  readonly load: OutputEmitterRef<string> = output<string>();
  readonly ready: OutputEmitterRef<void> = output<void>();

  constructor() {
    this.setupContentLoadingEffect();
  }

  ngAfterViewInit(): void {
    if (!this.data() && !this.src()) this.handleTransclusion();
  }

  /**
   * Handles document click events and processes them based on application logic.
   *
   * @param {MouseEvent} event - The mouse click event triggered within the document.
   * @return {void}
   */
  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.disableRouterLinkHandler()) return;
    this._markdownLinkService.interceptClick(event, this.routerLinkOptions());
  }

  /**
   * Sets up the content loading effect to handle changes to data and src inputs,
   * replacing traditional change detection methods like ngOnChanges for these inputs.
   * The method uses reactive programming to monitor changes and trigger respective
   * content handling processes. It also listens for a reload signal from the markdownService,
   * ensuring the content is reloaded when necessary, with the appropriate cleanup upon
   * component destruction.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private setupContentLoadingEffect(): void {
    // ? Effect for reacting to data() and src() input changes (replaces ngOnChanges for these)
    effect(() => {
      this.loadContent(); // This will call handleData or handleSrc based on the inputs
      // ! Note: We avoid an `else` that triggers `handleTransclusion` here
      // ! because transclusion content is only available in ngAfterViewInit.
      // ! The initial transclusion is handled in ngAfterViewInit.
    });

    // Subscribe to markdownService.reload$ and automatically unsubscribe on component destruction
    this._markdownService.reload$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.loadContent(); // This call is sufficient. render() will trigger contentRenderedTrigger.update()
      });
  }

  /**
   * Renders the Markdown content.
   * @param markdown The markdown content to render.
   * @param decodeHtml Whether to decode HTML entities.
   * @private - This method is private and should not be accessed outside of this class
   */
  private async render(markdown: string, decodeHtml = false): Promise<void> {
    const parsedOptions: ParseOptions = {
      decodeHtml,
      inline: this.inline(),
      emoji: this.emoji(),
      mermaid: this.mermaid(),
      disableSanitizer: this.disableSanitizer(),
    };

    const renderOptions: RenderOptions = {
      clipboard: this.clipboard(),
      clipboardOptions: {
        buttonComponent: this.clipboardButtonComponent(),
        buttonTemplate: this.clipboardButtonTemplate(),
        buttonTextCopy: this.clipboardButtonTextCopy(),
        buttonTextCopied: this.clipboardButtonTextCopied(),
        languageButton: this.clipboardLanguageButton(),
      },
      katex: this.katex(),
      katexOptions: this.katexOptions(),
      mermaid: this.mermaid(),
      mermaidOptions: this.mermaidOptions(),
    };

    this._element.nativeElement.innerHTML = await this._markdownService.parse(markdown, parsedOptions);

    this.handlePlugins();
    this._markdownService.render(this._element.nativeElement, renderOptions, this._viewContainerRef);

    this.processInternalLinks(); // Process internal links after rendering

    this.ready.emit();
  }

  /**
   * Processes all internal links within a native HTML element and converts them
   * if they contain a specific routerLink attribute.
   *
   * This method queries all anchor elements within the associated native element,
   * checks for the presence of the `href` attribute containing `/routerLink:`,
   * and applies the `internalLinksConverter` method to each qualifying link.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private processInternalLinks(): void {
    const links = this._element.nativeElement.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('href')?.includes('/routerLink:') === true) {
        this.internalLinksConverter(link);
      }
    });
  }

  /**
   * A handler function for processing anchor elements within an internal browser.
   * This function modifies the attributes of the provided anchor element to work with a custom routing mechanism.
   *
   * @param {HTMLAnchorElement} link - The anchor element whose attributes will be modified.
   * @private - This method is private and should not be accessed outside of this class
   */
  private internalLinksConverter = (link: HTMLAnchorElement): void => {
    const href = link.getAttribute('href')!;
    const [path, fragment] = href.split('#');
    link.setAttribute('data-routerLink', path);
    link.setAttribute('href', `${ path }${ fragment ? `#${ fragment }` : '' }`);
    link.setAttribute('routerLink', `${ path }${ fragment ? `#${ fragment }` : '' }`);
    if (fragment) link.setAttribute('fragment', fragment);
  };

  /**
   * Fetches a Markdown source using the `src` value, processes it, and emits the result or an error.
   *
   * The method subscribes to the Markdown source provided by the `markdownService`. On successful retrieval,
   * it processes the Markdown using the `render` method and emits the result via the `load` event. In case of
   * an error, it emits the error through the `error` event.
   *
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private handleSrc(): void {
    this._markdownService
      .getSource(this.src()!)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: markdown => {
          this.render(markdown).then(() => {
            this.load.emit(markdown);
          });
        },
        error: (error: string | Error) => this.error.emit(error),
      });
  }

  /**
   * Handles the transclusion of content by rendering the innerHTML of the associated element.
   * @private - This method is private and should not be accessed outside of this class
   * @return {void} This method does not return a value.
   */
  private handleTransclusion(): void {
    void this.render(this._element.nativeElement.innerHTML, true);
  }

  /**
   * Handles the initialization of the plugins.
   * @private - This method is private and should not be accessed outside of this class
   */
  private handlePlugins(): void {
    if (this.commandLine()) {
      this.setPluginClass(this._element.nativeElement, PrismPlugin.CommandLine);
      this.setPluginOptions(this._element.nativeElement, {
        dataFilterOutput: this.filterOutput(),
        dataHost: this.host(),
        dataPrompt: this.prompt(),
        dataOutput: this.output(),
        dataUser: this.user(),
      });
    }

    if (this.lineHighlight()) {
      this.setPluginOptions(this._element.nativeElement, { dataLine: this.line(), dataLineOffset: this.lineOffset() });
    }

    if (this.lineNumbers()) {
      this.setPluginClass(this._element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this._element.nativeElement, { dataStart: this.start() });
    }
  }

  /**
   * Sets the plugin class to the element with the specified plugin.
   * @param element The element to set the plugin class to.
   * @param plugin The plugin to set.
   * @private - This method is private and should not be accessed outside of this class
   */
  private setPluginClass(element: HTMLElement, plugin: string | string[]): void {
    const preElements = element.querySelectorAll('pre');
    preElements.forEach(preElement => {
      const classes = Array.isArray(plugin) ? plugin : [plugin];
      preElement.classList.add(...classes);
    });
  }

  /**
   * Sets the plugin options to the element with the specified options.
   * @param element The element to set the plugin options to.
   * @param options The options to set.
   * @private - This method is private and should not be accessed outside of this class
   */
  private setPluginOptions(element: HTMLElement, options: Record<string, number | string | string[] | undefined>): void {
    const preElements = element.querySelectorAll('pre');
    preElements.forEach(preElement => {
      Object.keys(options).forEach(option => {
        const attributeValue = options[option];
        if (attributeValue) {
          const attributeName = this.toLispCase(option);
          preElement.setAttribute(attributeName, attributeValue.toString());
        }
      });
    });
  }

  /**
   * Converts the value to a lisp-case for the plugin options.
   * @param value The value to convert to lisp-case.
   * @private - This method is private and should not be accessed outside of this class
   */
  private toLispCase(value: string): string {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  /**
   * Loads the content from the data or the src.
   * @private - This method is private and should not be accessed outside of this class
   */
  private loadContent(): void {
    const dataValue = this.data();
    const srcValue = this.src();

    if (dataValue) {
      void this.render(dataValue);
    } else if (srcValue) {
      this.handleSrc();
    }
  }
}
