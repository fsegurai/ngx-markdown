import { AsyncPipe } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { appConfig } from '@app/app.config';
import { MarkdownComponent, MarkdownPipe, MarkdownService } from 'ngx-markdown';

// Smoke tests of the BUILT library (`ngx-markdown` resolves to `dist/lib`) wired with the demo's own providers.

@Component({
  selector: 'app-markdown-component-host',
  template: '<markdown [data]="markdown()" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownComponent],
})
class MarkdownComponentHost {
  readonly markdown = signal('# Title\n\n## Subtitle\n\n```typescript\nconst answer = 42;\n```');
}

@Component({
  selector: 'app-markdown-pipe-host',
  template: '<div [innerHTML]="markdown() | markdown | async"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MarkdownPipe, AsyncPipe],
})
class MarkdownPipeHost {
  readonly markdown = signal('## Piped heading');
}

describe('ngx-markdown through the demo providers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  it('renders headings and code from [data] into the DOM', async () => {
    const fixture = TestBed.createComponent(MarkdownComponentHost);
    await TestBed.inject(ApplicationRef).whenStable();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1')?.textContent).toBe('Title');
    expect(element.querySelector('h2')?.textContent).toBe('Subtitle');
    expect(element.querySelector('pre code.language-typescript')?.textContent).toContain('const answer = 42;');
  });

  it('runs the post-render processing for the markdown pipe output', async () => {
    const renderSpy = vi.spyOn(TestBed.inject(MarkdownService), 'render');

    const fixture = TestBed.createComponent(MarkdownPipeHost);
    await TestBed.inject(ApplicationRef).whenStable();
    await fixture.whenStable();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toBe('Piped heading');
    expect(renderSpy).toHaveBeenCalled();
  });
});
