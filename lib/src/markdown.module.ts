import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule, Provider, SecurityContext } from '@angular/core';
import { MarkedExtension } from 'marked';
import { ClipboardButtonComponent } from './clipboard-button/clipboard-button.component';
import { CLIPBOARD_OPTIONS } from './clipboard-button/clipboard-options';
import { LanguagePipe } from './pipes/language.pipe';
import { MarkdownComponent } from './markdown/markdown.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { MARKED_OPTIONS } from './configuration/marked-options';
import { MERMAID_OPTIONS } from './configuration/mermaid-options';
import { provideMarkdown } from './configuration/provide-markdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InjectionTokenType<T extends InjectionToken<any>> = T extends InjectionToken<infer R> ? R : unknown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedProvider<T extends InjectionToken<any>> = TypedValueProvider<T> | TypedFactoryProvider<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TypedValueProvider<T extends InjectionToken<any>> {
  provide: T;
  useValue: InjectionTokenType<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface TypedFactoryProvider<T extends InjectionToken<any>> {
  provide: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => InjectionTokenType<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps?: any[];
};

// having a dependency on `HttpClientModule` within a library
// breaks all the interceptors from the app consuming the library
// here, we explicitly ask the user to pass a provider with
// their own instance of `HttpClientModule`
export interface MarkdownModuleConfig {
  loader?: Provider;
  clipboardOptions?: TypedProvider<typeof CLIPBOARD_OPTIONS>;
  markedOptions?: TypedProvider<typeof MARKED_OPTIONS>;
  markedExtensions?: MarkedExtension[];
  mermaidOptions?: TypedProvider<typeof MERMAID_OPTIONS>;
  sanitize?: SecurityContext;
}

const sharedDeclarations = [
  ClipboardButtonComponent,
  LanguagePipe,
  MarkdownComponent,
  MarkdownPipe,
];

@NgModule({
  imports: [CommonModule, ...sharedDeclarations],
  exports: sharedDeclarations,
})
export class MarkdownModule {
  static forRoot(markdownModuleConfig?: MarkdownModuleConfig): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
      providers: [
        provideMarkdown(markdownModuleConfig),
      ],
    };
  }

  static forChild(): ModuleWithProviders<MarkdownModule> {
    return {
      ngModule: MarkdownModule,
    };
  }
}
