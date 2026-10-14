---
label: Moving off MarkdownModule
description: Replace the deprecated MarkdownModule with provideMarkdown() and standalone imports before version 22 removes it.
order: 2
tags: [ "guides", "migration" ]
keywords: [ "MarkdownModule", "forRoot", "forChild", "standalone", "deprecated" ]
---

# Moving off MarkdownModule

`MarkdownModule`, `forRoot()` and `forChild()` are deprecated in 21.x and removed in 22. The replacement works in
21.x already, so you can switch now.

## Mapping

| Before | After |
|--------|-------|
| `MarkdownModule.forRoot(config)` in the root module | `provideMarkdown(config)` in `ApplicationConfig.providers` (or the root module's `providers`) |
| `MarkdownModule.forChild()` | nothing: the providers are already app-wide |
| `imports: [MarkdownModule]` | `imports: [MarkdownComponent, MarkdownPipe, LanguagePipe]`, only what the template uses |

The `config` object is the same `MarkdownModuleConfig` in both cases.

## Before

```typescript
@NgModule({
  imports: [BrowserModule, MarkdownModule.forRoot({ sanitize: SecurityContext.NONE })],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## After

```typescript
export const appConfig: ApplicationConfig = {
  providers: [provideMarkdown({ sanitize: SecurityContext.NONE })],
};

@Component({
  selector: 'app-root',
  imports: [MarkdownComponent],
  template: `<markdown [src]="'README.md'" />`,
})
export class AppComponent {}
```

An NgModule app can keep its module and only swap the call: put `provideMarkdown(config)` in `providers` and import
the standalone `MarkdownComponent` / `MarkdownPipe` into the module's `imports`.

## Checklist

- [ ] No `MarkdownModule` import is left (`forRoot`, `forChild` or plain).
- [ ] `provideMarkdown()` is called once, at the application level.
- [ ] Each standalone component imports the pieces its template uses.
