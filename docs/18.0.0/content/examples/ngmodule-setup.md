---
label: NgModule Setup
description: Configure an NgModule application with MarkdownModule.forRoot() and forChild(), or with provideMarkdown() and standalone imports.
order: 2
tags: [ "examples", "ngmodule" ]
keywords: [ "MarkdownModule", "forRoot", "forChild", "AppModule" ]
---

# NgModule Setup

## With MarkdownModule

```typescript
// app.module.ts
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MARKED_OPTIONS, MarkdownModule } from '@fsegurai/ngx-markdown';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true } },
      sanitize: SecurityContext.HTML,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

// home.module.ts
@NgModule({
  imports: [MarkdownModule.forChild()],
  declarations: [HomeComponent],
})
export class HomeModule {}
```

## Same app with standalone pieces

```typescript
@NgModule({
  imports: [BrowserModule, MarkdownComponent, MarkdownPipe],
  providers: [
    provideHttpClient(),
    provideMarkdown({
      loader: HttpClient,
      markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true } },
      sanitize: SecurityContext.HTML,
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

@NgModule({
  imports: [MarkdownComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}
```

Both work in 18.x. The standalone version also keeps working after 21.0.0 deprecates `MarkdownModule`.
