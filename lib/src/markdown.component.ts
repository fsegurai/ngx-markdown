import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Input,
  OnChanges,
  OnDestroy,
  output,
  Output,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { from, merge, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { KatexOptions } from './katex-options';
import { MarkdownLinkService } from './markdown-link.service';
import { MarkdownService, ParseOptions, RenderOptions } from './markdown.service';
import { MermaidAPI } from './mermaid-options';
import { PrismPlugin } from './prism-plugin';

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

    @if (changed$ | async) {
      <ng-container></ng-container>
    }
  `,
  imports: [CommonModule],
})
export class MarkdownComponent implements OnChanges, AfterViewInit, OnDestroy {
  private markdownService = inject(MarkdownService);
  private markdownLinkService = inject(MarkdownLinkService);
  private element = inject<ElementRef<HTMLElement>>(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private router? = inject(Router, { optional: true });

  @Input() data: string | null | undefined;
  @Input() src: string | null | undefined;
  readonly disableRouterLinkHandler = input<boolean | undefined>(false);

  @Input()
  get disableSanitizer(): boolean {
    return this._disableSanitizer;
  }

  set disableSanitizer(value: boolean) {
    this._disableSanitizer = this.coerceBooleanProperty(value);
  }

  @Input()
  get inline(): boolean {
    return this._inline;
  }

  set inline(value: boolean) {
    this._inline = this.coerceBooleanProperty(value);
  }

  @Input()
  get clipboard(): boolean {
    return this._clipboard;
  }

  set clipboard(value: boolean) {
    this._clipboard = this.coerceBooleanProperty(value);
  }

  @Input() clipboardButtonComponent: Type<unknown> | undefined;
  @Input() clipboardButtonTemplate: TemplateRef<unknown> | undefined;
  @Input() clipboardButtonTextCopy: string | undefined;
  @Input() clipboardButtonTextCopied: string | undefined;
  @Input() clipboardLanguageButton: boolean | undefined;

  @Input()
  get emoji(): boolean {
    return this._emoji;
  }

  set emoji(value: boolean) {
    this._emoji = this.coerceBooleanProperty(value);
  }

  @Input()
  get katex(): boolean {
    return this._katex;
  }

  set katex(value: boolean) {
    this._katex = this.coerceBooleanProperty(value);
  }

  @Input() katexOptions: KatexOptions | undefined;

  @Input()
  get mermaid(): boolean {
    return this._mermaid;
  }

  set mermaid(value: boolean) {
    this._mermaid = this.coerceBooleanProperty(value);
  }

  @Input() mermaidOptions: MermaidAPI.MermaidConfig | undefined;

  @Input()
  get lineHighlight(): boolean {
    return this._lineHighlight;
  }

  set lineHighlight(value: boolean) {
    this._lineHighlight = this.coerceBooleanProperty(value);
  }

  @Input() line: string | string[] | undefined;
  @Input() lineOffset: number | undefined;

  @Input()
  get lineNumbers(): boolean {
    return this._lineNumbers;
  }

  set lineNumbers(value: boolean) {
    this._lineNumbers = this.coerceBooleanProperty(value);
  }

  @Input() start: number | undefined;

  @Input()
  get commandLine(): boolean {
    return this._commandLine;
  }

  set commandLine(value: boolean) {
    this._commandLine = this.coerceBooleanProperty(value);
  }

  @Input() filterOutput: string | undefined;
  @Input() host: string | undefined;
  @Input() prompt: string | undefined;
  @Input() output: string | undefined;
  @Input() user: string | undefined;
  readonly routerLinkOptions = input<MarkdownRouterLinkOptions>();

  readonly error = output<string | Error>();
  readonly load = output<string>();
  @Output() ready = new EventEmitter<void>();

  private _clipboard = false;
  private _commandLine = false;
  private _disableSanitizer = false;
  private _emoji = false;
  private _inline = false;
  private _katex = false;
  private _lineHighlight = false;
  private _lineNumbers = false;
  private _mermaid = false;

  private readonly destroyed$ = new Subject<void>();

  private changed = new Subject<void>();

  protected changed$ = merge(this.ready, this.changed).pipe(
    map(() => this.element.nativeElement.querySelectorAll('a')),
    switchMap(links => from(links)),
    filter(link => link.getAttribute('href')?.includes('/routerLink:') === true),
    tap(link => {
      const href = link.getAttribute('href')!;
      const [path, fragment] = href.split('#');
      link.setAttribute('data-routerLink', path);
      link.setAttribute('href', `${ path }${ fragment ? `#${ fragment }` : '' }`);
      link.setAttribute('routerLink', `${ path }${ fragment ? `#${ fragment }` : '' }`);
      if (fragment) {
        link.setAttribute('fragment', fragment);
      }
    }),
  );

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.disableRouterLinkHandler()) return;
    this.markdownLinkService.interceptClick(event, this.routerLinkOptions());
  }

  ngOnChanges(): void {
    this.loadContent();
    this.changed.next();
  }

  ngAfterViewInit(): void {
    if (!this.data && !this.src) this.handleTransclusion();

    this.markdownService.reload$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.loadContent());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Renders the markdown content.
   * @param markdown The markdown content to render.
   * @param decodeHtml Whether to decode HTML entities.
   */
  async render(markdown: string, decodeHtml = false): Promise<void> {
    const parsedOptions: ParseOptions = {
      decodeHtml,
      inline: this.inline,
      emoji: this.emoji,
      mermaid: this.mermaid,
      disableSanitizer: this.disableSanitizer,
    };

    const renderOptions: RenderOptions = {
      clipboard: this.clipboard,
      clipboardOptions: {
        buttonComponent: this.clipboardButtonComponent,
        buttonTemplate: this.clipboardButtonTemplate,
        buttonTextCopy: this.clipboardButtonTextCopy,
        buttonTextCopied: this.clipboardButtonTextCopied,
        languageButton: this.clipboardLanguageButton,
      },
      katex: this.katex,
      katexOptions: this.katexOptions,
      mermaid: this.mermaid,
      mermaidOptions: this.mermaidOptions,
    };

    this.element.nativeElement.innerHTML = await this.markdownService.parse(markdown, parsedOptions);

    this.handlePlugins();
    this.markdownService.render(this.element.nativeElement, renderOptions, this.viewContainerRef);

    this.ready.emit();
  }

  /**
   * Coerces a data-bound value (typically a string) to a boolean.
   * @param value The value to coerce to a boolean.
   * @private - This method is private and should not be accessed outside of this class
   */
  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${ String(value) }` !== 'false';
  }

  private handleData(): void {
    void this.render(this.data!);
  }

  private handleSrc(): void {
    this.markdownService
      .getSource(this.src!)
      .subscribe({
        next: markdown => {
          this.render(markdown).then(() => {
            this.load.emit(markdown);
          });
        },
        error: (error: string | Error) => this.error.emit(error),
      });
  }

  private handleTransclusion(): void {
    void this.render(this.element.nativeElement.innerHTML, true);
  }

  /**
   * Handles the initialization of the plugins.
   * @private - This method is private and should not be accessed outside of this class
   */
  private handlePlugins(): void {
    if (this.commandLine) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.CommandLine);
      this.setPluginOptions(this.element.nativeElement, {
        dataFilterOutput: this.filterOutput,
        dataHost: this.host,
        dataPrompt: this.prompt,
        dataOutput: this.output,
        dataUser: this.user,
      });
    }
    if (this.lineHighlight) {
      this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
    }
    if (this.lineNumbers) {
      this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
      this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
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
   * Converts the value to lisp-case for the plugin options.
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
    if (this.data) {
      this.handleData();
    } else if (this.src) {
      this.handleSrc();
    }
  }
}
