import { HttpClient, provideHttpClient, withXhr } from '@angular/common/http';
import { type ApplicationConfig, provideZonelessChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from '@app/app.routes';
import { markdownPlugins } from '@app/markdown-plugins';
import { markedOptionsFactory } from '@app/marked-options-factory';
import { AnchorService } from '@shared/anchor/anchor.service';
import { ClipboardButtonComponent } from '@shared/clipboard-button';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { MARKED_EXTENSIONS, MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withXhr()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideMarkdown({
      loader: HttpClient,
      // ? withKatex(), withMermaid({ loader, config }), withMermaidExport(), withPrism(),
      // ? withClipboard({ buttonComponent }), withEmoji(), withLightbox(): see markdown-plugins.ts
      plugins: markdownPlugins(ClipboardButtonComponent),
      markedOptions: {
        provide: MARKED_OPTIONS,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      // ? Plain Marked extensions stay in `markedExtensions`: they need no plugin
      markedExtensions: [
        {
          provide: MARKED_EXTENSIONS,
          useFactory: gfmHeadingId,
          multi: true,
        },
      ],
      sanitize: SecurityContext.NONE,
    }),
  ],
};
