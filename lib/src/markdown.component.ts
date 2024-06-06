import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
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
  paths?: { [path: string]: NavigationExtras | undefined };
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'markdown, [markdown]',
  template: `
    <ng-container *ngIf="changed$ | async"/>
    <ng-content></ng-content>
  `,
  imports: [CommonModule],
  standalone: true,
})
export class MarkdownComponent implements OnChanges, AfterViewInit, OnDestroy {

  protected static ngAcceptInputType_clipboard: boolean | '';
  protected static ngAcceptInputType_emoji: boolean | '';
  protected static ngAcceptInputType_katex: boolean | '';
  protected static ngAcceptInputType_mermaid: boolean | '';
  protected static ngAcceptInputType_lineHighlight: boolean | '';
  protected static ngAcceptInputType_lineNumbers: boolean | '';
  protected static ngAcceptInputType_commandLine: boolean | '';

  @Input() data: string | null | undefined;
  @Input() src: string | null | undefined;
  @Input() disableHostListener = false;

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

  // Plugin - clipboard
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

  // Plugin - emoji
  @Input()
  get emoji(): boolean {
    return this._emoji;
  }

  set emoji(value: boolean) {
    this._emoji = this.coerceBooleanProperty(value);
  }

  // Plugin - katex
  @Input()
  get katex(): boolean {
    return this._katex;
  }

  set katex(value: boolean) {
    this._katex = this.coerceBooleanProperty(value);
  }

  @Input() katexOptions: KatexOptions | undefined;

  // Plugin - mermaid
  @Input()
  get mermaid(): boolean {
    return this._mermaid;
  }

  set mermaid(value: boolean) {
    this._mermaid = this.coerceBooleanProperty(value);
  }

  @Input() mermaidOptions: MermaidAPI.Config | undefined;

  // Plugin - lineHighlight
  @Input()
  get lineHighlight(): boolean {
    return this._lineHighlight;
  }

  set lineHighlight(value: boolean) {
    this._lineHighlight = this.coerceBooleanProperty(value);
  }

  @Input() line: string | string[] | undefined;
  @Input() lineOffset: number | undefined;

  // Plugin - lineNumbers
  @Input()
  get lineNumbers(): boolean {
    return this._lineNumbers;
  }

  set lineNumbers(value: boolean) {
    this._lineNumbers = this.coerceBooleanProperty(value);
  }

  @Input() start: number | undefined;

  // Plugin - commandLine
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
  @Input() routerLinkOptions: MarkdownRouterLinkOptions | undefined;

  // Event emitters
  @Output() error = new EventEmitter<string | Error>();
  @Output() load = new EventEmitter<string>();
  @Output() ready = new EventEmitter<void>();

  private changed = new Subject<void>();

  protected changed$ = merge(this.ready, this.changed).pipe(
    map(() => this.element.nativeElement.querySelectorAll('a')),
    switchMap(links => from(links)),
    filter(link => link.getAttribute('href')?.includes('/routerLink:') === true),
    tap(link => link.setAttribute('data-routerLink', link.getAttribute('href')!.replace('/routerLink:', ''))),
    tap(link => link.setAttribute('href', link.getAttribute('href')!.replace('/routerLink:', ''))),
  );

  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // If the component is used in browser mode, intercept the click event
    if (!this.disableHostListener) this.markdownLinkService.interceptClick(event, this.routerLinkOptions);
  }

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

  constructor(
    public markdownService: MarkdownService,
    private markdownLinkService: MarkdownLinkService,
    public element: ElementRef<HTMLElement>,
    public viewContainerRef: ViewContainerRef,
    @Optional() public router?: Router,
  ) {
  }

  ngOnChanges(): void {
    this.loadContent();
    this.changed.next();
  }

  loadContent(): void {
    if (this.data != null) {
      this.handleData();
      return;
    }
    if (this.src != null) {
      this.handleSrc();
      return;
    }
  }

  ngAfterViewInit(): void {
    if (!this.data && !this.src) {
      this.handleTransclusion();
    }

    this.markdownService.reload$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.loadContent());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

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

    const parsed = await this.markdownService.parse(markdown, parsedOptions);

    this.element.nativeElement.innerHTML = parsed;

    this.handlePlugins();

    this.markdownService.render(this.element.nativeElement, renderOptions, this.viewContainerRef);

    this.ready.emit();
  }

  private coerceBooleanProperty(value: boolean | ''): boolean {
    return value != null && `${String(value)}` !== 'false';
  }

  private handleData(): void {
    this.render(this.data!);
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
    this.render(this.element.nativeElement.innerHTML, true);
  }

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

  private setPluginClass(element: HTMLElement, plugin: string | string[]): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      const classes = plugin instanceof Array ? plugin : [plugin];
      preElements.item(i).classList.add(...classes);
    }
  }

  private setPluginOptions(element: HTMLElement, options: {
    [key: string]: number | string | string[] | undefined
  }): void {
    const preElements = element.querySelectorAll('pre');
    for (let i = 0; i < preElements.length; i++) {
      Object.keys(options).forEach(option => {
        const attributeValue = options[option];
        if (attributeValue) {
          const attributeName = this.toLispCase(option);
          preElements.item(i).setAttribute(attributeName, attributeValue.toString());
        }
      });
    }
  }

  private toLispCase(value: string): string {
    const upperChars = value.match(/([A-Z])/g);
    if (!upperChars) {
      return value;
    }
    let str = value.toString();
    for (let i = 0, n = upperChars.length; i < n; i++) {
      str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
    }
    if (str.slice(0, 1) === '-') {
      str = str.slice(1);
    }
    return str;
  }
}
