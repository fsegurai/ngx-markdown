---
label: Plugin API
description: The MarkdownPlugin interface, hook contexts, withMarkdownPlugin() and the MARKDOWN_PLUGINS token.
order: 6
tags: [ "api", "plugins" ]
keywords: [ "MarkdownPlugin", "MarkdownRenderContext", "withMarkdownPlugin", "MarkdownPluginToggles" ]
---

# Plugin API

## withMarkdownPlugin

```typescript
function withMarkdownPlugin<O extends object>(
  plugin: MarkdownPlugin<O>,
  options?: Partial<O>,
  providers?: Provider[],
): MarkdownPluginFeature;
```

## MarkdownPlugin\<O\>

| Member | Type |
|--------|------|
| `name` | `string` (a later registration with the same name replaces it) |
| `enabledByDefault?` | `boolean` |
| `workerSafe?` | `boolean` (reserved, informational) |
| `enforce?` | `'pre' \| 'post'` |
| `defaults?` | `Partial<O>` |
| `nestedOptions?` | `readonly (keyof O & string)[]` |
| `requires?` | `readonly string[]` |
| `exclusiveOptions?` | `readonly (readonly (keyof O & string)[])[]` |
| `validate?(ctx)` | `void` (throw to fail the parse) |
| `preprocess?(markdown, ctx)` | `string` |
| `markedExtensions?(ctx)` | `MarkedExtension[]` |
| `tokenizerExtensions?` | `readonly MarkdownTokenizerExtension<O>[]` |
| `postprocess?(html, ctx)` | `string` (before the sanitizer) |
| `postSanitize?(html, ctx)` | `string` (after the sanitizer) |
| `render?(element, ctx)` | `MarkdownRenderResult` |
| `rerender?(element, ctx)` | `MarkdownRenderResult` |
| `afterHighlight?(code, ctx)` | `void` |
| `highlightsCode?` | `boolean` |
| `incremental?` | `boolean` (its `render` hook can run on new top-level nodes alone, `ctx.nodes`) |
| `cleanup?(element)` | `void` |

```typescript
type MarkdownRenderResult = void | MarkdownPluginCleanup | Promise<void | MarkdownPluginCleanup>;
type MarkdownPluginCleanup = () => void;
type MarkdownPluginToggles = Readonly<Record<string, boolean | object | undefined>>;
type MarkdownPluginPlatform = 'browser' | 'server';
```

## Contexts

`MarkdownPluginContext<O>` (also `MarkdownParseContext<O>`):

| Field | Description |
|-------|-------------|
| `options` | Merged options of this parse or render. |
| `platform` | `'browser'` or `'server'`. |
| `injector` | The injector of the `MarkdownService`. |
| `state` | Per parse or render, not shared with other plugins. |
| `serviceState` | Per plugin and service, e.g. a cache. |

`MarkdownRenderContext<O>` adds:

| Member | Description |
|--------|-------------|
| `signal` | `AbortSignal`, aborted when the render is superseded. |
| `viewContainerRef` | `ViewContainerRef \| undefined`. |
| `nodes` | In an incremental update: the new top-level nodes, the only ones to enhance. `undefined` in a whole render. |
| `isEnabled(name)` | Whether another plugin is enabled in this render. |
| `onCleanup(cleanup, node?)` | Registers a cleanup at once. With `node`, the cleanup belongs to that node: it runs when an incremental update removes it, or on the cleanup of the element. |
| `afterHighlight(code)` | For highlighting plugins: runs the `afterHighlight` hooks on one block. |
| `afterHighlightAll()` | Runs them on every block; `Promise<void> \| undefined`. |

## Incremental plugins

When every enabled plugin with a `render` hook declares `incremental: true` (every built-in plugin does), `<markdown>` updates a changed
`data`/`src` block by block: the unchanged top-level nodes stay, with what the plugins did on them, and `render` runs
with `ctx.nodes` set to the new top-level nodes. Such a hook must:

- enhance only `ctx.nodes` and their descendants, e.g. `node.querySelectorAll('pre > code')` (the selector is matched in
  the document, so it also finds the code of a top-level `<pre>`); it may still read the whole element;
- not add, remove or move top-level nodes (wrapping one is fine: the clipboard puts a top-level `<pre>` in a `<div>`).

`ctx.nodes` is empty when an update only removed nodes (e.g. the Mermaid export then renames the buttons of the
following diagrams). The cleanups of an update (returned, or `ctx.onCleanup(cleanup)`) run when a later update removes
one of its nodes (all the nodes of that update are then replaced together) and on the cleanup of the element;
`cleanup(element)` runs with the element only. To undo what was done on one node when it goes (destroy its button view,
stop observing it), register `ctx.onCleanup(cleanup, node)`, in a whole render as in an update: it runs once, when an
update removes the top-level node holding `node`, or on the cleanup of the element. A plugin without `incremental` makes every change a whole render.

## MarkdownTokenizerExtension\<O\>

`{ name, level?: 'block' | 'inline', start?, tokenizer?, renderer?, childTokens? }`, like a Marked
`TokenizerAndRendererExtension`, with the parse context as the last argument of each function. Without `tokenizer`
it is a renderer for tokens of type `name` made elsewhere.

## Registration

```typescript
interface MarkdownPluginRegistration<O extends object = Record<string, unknown>> {
  readonly plugin: MarkdownPlugin<O>;
  readonly options?: Partial<O>;
}

const MARKDOWN_PLUGINS: InjectionToken<readonly MarkdownPluginRegistration<object>[]>;

// Opaque: create it with withMarkdownPlugin() or a withX() function, and pass it to provideMarkdown({ plugins }).
interface MarkdownPluginFeature {
  /* internal */
}
```
