---
label: NgModule Setup
description: Configure an NgModule application with the deprecated MarkdownModule, and the equivalent without it.
order: 2
tags: [ "examples", "ngmodule" ]
keywords: [ "MarkdownModule", "forRoot", "forChild", "AppModule" ]
---

# NgModule Setup

## With MarkdownModule (deprecated)

```typescript
// app.module.ts
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MARKED_OPTIONS, MarkdownModule } from '@fsegurai/ngx-markdown';

@NgModule({
  imports: [
    BrowserModule,
    MarkdownModule.forRoot({
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

## Same app without MarkdownModule

```typescript
@NgModule({
  imports: [BrowserModule, MarkdownComponent, MarkdownPipe],
  providers: [
    provideMarkdown({
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

This version keeps working in 22. Full mapping: [Moving off MarkdownModule](../guides/moving-off-markdown-module.md).
