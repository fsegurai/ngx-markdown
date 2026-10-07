# 📦 Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

---

## [Unreleased]

No changes have been made yet.

---

## [21.0.0] - 2026-10-07

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 21** — the library peer dependencies (`@angular/common`, `@angular/core`, `@angular/platform-browser`)
  now require `^21.0.0`. **(Note**: This change is not backward compatible.)
- **Zoneless** — the `zone.js` peer dependency has been removed. The library is zoneless-compatible and works with
  `provideZonelessChangeDetection()`; the demo application now runs fully zoneless.
- **Marked 18** — the `marked` peer dependency now requires `^18.0.0` (was `>= 15.0.0 < 16.0.0`). Marked 17/18 trim
  trailing blank lines from block tokens and changed list tokens; custom renderers or extensions that relied on the
  previous token shape may need updates. The optional plugins move to `katex ^0.19`, `mermaid ^12` (ELK layout by
  default, Node.js ≥ 22.12 for tooling) and `emoji-toolkit ^11`.

### 🐞 Fixes

- **Marked extensions** — `renderer` overrides from `MARKED_EXTENSIONS` (e.g. heading ids from
  `marked-gfm-heading-id`) are now applied to the renderer used for parsing. They were previously dropped because
  the service always passes its own renderer to Marked, replacing the default renderer the extensions were merged into.
- **MarkdownPipe** — post-render processing (syntax highlight, clipboard, KaTeX, Mermaid) now runs via
  `afterNextRender` instead of `NgZone.onStable`, which never fires in zoneless applications.
- **MarkdownComponent** — a render failure after a successful `[src]` load is now emitted through the `error` output
  (like HTTP errors) instead of surfacing as an unhandled promise rejection, and `load` is emitted only after the
  render completes.
- **SSR stability** — `MarkdownComponent` (data, transclusion, and `[src]` renders) and `MarkdownPipe` (async parse)
  register `PendingTasks`, so SSR, prerendering and `ApplicationRef.whenStable()` wait for the markdown output.
- **SSR** — `MarkdownComponent` iterates `querySelectorAll` results with `Array.from`; server-side DOMs whose
  `NodeList` lacks `forEach` crashed the render (`querySelectorAll(...).forEach is not a function`).
- **Peer dependencies** — add the missing `@angular/router` peer dependency (`^21.0.0`). The published package already
  imported `@angular/router` without declaring it, so strict consumers failed with `TS2307`.
- **Demo** — the scrollspy navigation built an invalid selector (`APP-SCROLLSPY-NAV. a`) that threw on pages with a
  table of contents; it now scopes the navigation with a unique `data-scrollspy-id` attribute.
- **Demo** — page content animates when the markdown is rendered; the route transition alone animated an empty
  container because `[src]` content arrives after the transition has started.
- **Demo accessibility** — icon-only buttons (clipboard, re-render, plugins) now declare `aria-label` and
  `type="button"`, decorative SVGs are marked `aria-hidden="true"`, and heading/icon semantics were corrected
  across the demo pages.

### 🔧 Changes

- **Deprecated: MarkdownModule** — `MarkdownModule`, `MarkdownModule.forRoot()` and `MarkdownModule.forChild()` are deprecated and
  will be removed in v22. Use `provideMarkdown()` and import the standalone `MarkdownComponent` / `MarkdownPipe`.
- **Deprecated: ERROR_SRC_WITHOUT_HTTP_CLIENT** — `HttpClient` is injectable by default since Angular 21, so the guard
  that threw this error has been removed and the constant is no longer used.
- **Deprecated: Mermaid `defaultRenderer`** — the `defaultRenderer` option of the flowchart, class, and state diagram
  configs is deprecated because Mermaid 12 removed it; use the top-level `layout` option instead. Mermaid 12 defaults
  to the ELK layout; `{ layout: 'dagre', look: 'classic' }` in `MERMAID_OPTIONS` restores the previous appearance.
- **KaTeX options** — the `strict` callback documentation reflects KaTeX 0.19: callbacks must return `false`,
  `'ignore'`, `true`, `'error'` or `'warn'`; any other value (including `undefined`) falls back to `'warn'`.
- **Build scripts** — `build_post:lib` and `build_post:demo` pass directory destinations with a trailing `/`, as
  required by `cpy-cli` 7.
- **TypeScript** — upgraded to TypeScript `5.9`.
- **Tests** — replace Karma and Jasmine with Vitest through the `@angular/build:unit-test` builder (jsdom); remove
  `fakeAsync`/`tick` in favor of `fixture.whenStable()` and Vitest fake timers. JUnit results are written to
  `junit.xml` and LCOV coverage to `coverage/lcov.info`.
- **Dependencies** — remove `@angular/platform-browser-dynamic` (unused).
- **Demo** — the playground uses signals instead of plain fields with manual `detectChanges()`.
- **MarkdownComponent** — uses `ChangeDetectionStrategy.OnPush` (content is written imperatively and all inputs are
  signals) and the `host` metadata instead of `@HostListener('click')`.
- **Workspace** — the demo consumes the **built** library: the root `tsconfig.json` maps `ngx-markdown` to `dist/lib`
  (replacing `linklocal` and the `file:lib` dependency), so it exercises the published `exports` and FESM bundles.
  `start` runs the library watch build and the demo dev server together, and `build:demo` builds the library first.
- **Library imports guard** — `check:lib-imports` (run by `build:lib`) fails when `lib/` uses aliased or self imports,
  which ng-packagr does not rewrite.
- **Demo** — remove `@angular/flex-layout` (replaced with plain CSS flex and breakpoint mixins) and `hammerjs`.
- **Demo** — remove `provideAnimations()`; enter/leave effects use the native `animate.enter` / `animate.leave` and the
  route transition is plain CSS.
- **Demo** — replace `gumshoejs` with [`@fsegurai/scrollspy`](https://github.com/fsegurai/scrollspy) for the table of
  contents navigation (same offset and `active` class).
- **Demo** — the get-started page renders the local `README.md` (copied as a build asset) instead of fetching it from
  GitHub.
- **Demo tests** — add an essential Vitest smoke suite for the demo (`test-ci_cd:demo`, `test-local:demo`) that
  checks the built library through the demo's providers: routes, `<markdown [data]>` rendering, the `markdown` pipe
  post-render, and the scrollspy selector. JUnit results are written to `junit-demo.xml`.

### 📝 Documentation

- **Contributing guide** — add `CONTRIBUTING.md` covering setup, the `lib/` and `demo/` layout, tests, linting,
  commit conventions and the pull request flow.
- **README** — add an SSR / prerendering section and recommend `provideMarkdown()` with standalone imports over the
  deprecated `MarkdownModule`.

### 🔧 Infrastructure

- **Linting** — replace ESLint with Biome: add `lint:check`, `lint:fix`, `lint:lib`, `lint:demo`, `format` and
  `format:audit` scripts; remove the ESLint configs, the `@angular-eslint` lint targets and schematics from
  `angular.json`, and the ESLint-only dev dependencies.
- **CI** — the PR pipeline now runs the read-only `lint:check` script instead of `lint-ci:lib` and `lint-ci:demo`.
- **CI** — the PR pipeline runs the demo smoke tests and publishes both `junit.xml` (lib) and `junit-demo.xml` (demo).
- **CI** — the GitHub build workflow calls the existing `build:lib`, `build_post:lib`, `build:demo` and
  `build_post:demo` scripts instead of the removed `gh-pages:*` and `postBuild:lib` scripts.
- **Demo build** — `build_post:demo` copies `index.html` to `404.html` (SPA fallback for static hosts) inside
  `dist/demo/browser` instead of the repository root.
- **Appwrite Terraform** — attach a custom domain to the demo site with `appwrite_proxy_rule`
  (`fsi-ngx-markdown[-<env>].appwrite.network`), and add the `site_hostname`, `site_url` and `site_domain_status`
  outputs. The Appwrite API key now also needs the `rules.read` and `rules.write` scopes.
- **Git hooks** — add Husky `pre-commit` and `pre-push` hooks to enforce linting and formatting before changes leave
  the workstation.
- **Engines** — the workspace `package.json` declares `engines` (`node >=24`, `bun >=1.4.0`, `npm >=11`), matching the
  sibling libraries and covering Mermaid 12's Node `>=22.12` tooling requirement. The published library does not
  declare engines.
- **Demo: Mermaid as a static asset** — Mermaid 12's prebuilt `mermaid.min.js` (about 5.5 MB) is copied to the
  versioned path `mermaid/<version>/` and loaded from `index.html`, instead of being re-bundled as a global `scripts`
  entry. This removes esbuild's `Comparison with -0` warning (from Mermaid's own code), speeds up builds, and drops the
  initial bundle from 7.13 MB to 1.63 MB, so the initial budget is tightened to 2 MB (warning) / 2.5 MB (error).
  `check:demo-mermaid`, run by `build:demo`, fails when the versioned path drifts from the installed Mermaid version.
  The README documents this as an alternative to the `scripts` setup.
- **Bun** — `bunfig.toml` keeps only the `[install]` settings; the unused `bun test` configuration (tests run through
  the Angular CLI) and its second `junit.xml` output were removed.

### 🔐 Security

- Added `Trivy Security Scanner` (`Makefile`, Docker image `aquasec/trivy:0.71.1`) to scan dependencies for
  vulnerabilities, secrets, misconfigurations, and licenses, generate SARIF reports and a CycloneDX SBOM, and gate CI on
  fixable `CRITICAL`/`HIGH` vulnerabilities (`make trivy-ci`).
- **Supply chain** — `bunfig.toml` only installs package versions published at least 3 days ago
  (`minimumReleaseAge`), limiting exposure to compromised or yanked releases.
- **Added dependencies**.
    - Dependencies
        - `@fsegurai/scrollspy` - `2.1.0` - needed for the demo table of contents navigation. Replaces `gumshoejs`.
    - Dev Dependencies
        - `@biomejs/biome` - `2.5.15` - needed for linting and formatting - replaces ESLint toolchain.
        - `@vitest/coverage-v8` - `4.1.11` - needed for test coverage reports (LCOV).
        - `concurrently` - `10.0.5` - needed for local development. Runs the library watch build and the demo dev
          server together.
        - `husky` - `9.1.7` - needed for Git hooks to enforce code quality and pre-commit checks.
        - `jsdom` - `30.1.2` - needed for testing purposes only. DOM environment for Vitest.
        - `vitest` - `4.1.11` - needed for unit and smoke tests. Replaces Karma and Jasmine.
- **Update dependencies** — address potential vulnerabilities and/or improvements in dependencies.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `@angular/common`, `@angular/core`, `@angular/platform-browser` from `^20.0.3` to `^21.0.0`
        - `@angular/router` added as `^21.0.0`
        - `marked` from `>= 15.0.0 < 16.0.0` to `^18.0.0`
    - Optional Dependencies (`@fsegurai/ngx-markdown`)
        - `emoji-toolkit` from `^9.0.1` to `^11.0.0`
        - `katex` from `^0.16.22` to `^0.19.0`
        - `mermaid` from `^11.6.0` to `^12.1.0`
    - Dependencies
        - `@angular/cdk` from `20.0.3` to `21.2.14`
        - `@angular/common` from `20.0.4` to `21.2.25`
        - `@angular/compiler` from `20.0.4` to `21.2.25`
        - `@angular/core` from `20.0.4` to `21.2.25`
        - `@angular/forms` from `20.0.4` to `21.2.25`
        - `@angular/material` from `20.0.3` to `21.2.14`
        - `@angular/platform-browser` from `20.0.4` to `21.2.25`
        - `@angular/router` from `20.0.4` to `21.2.25`
        - `emoji-toolkit` from `9.0.1` to `11.0.0`
        - `katex` from `0.16.22` to `0.19.0`
        - `marked` from `15.0.12` to `18.0.14`
        - `marked-gfm-heading-id` from `4.1.1` to `4.1.4`
        - `mermaid` from `11.6.0` to `12.1.0`
    - Dev Dependencies
        - `@angular/build` from `20.0.3` to `21.2.24`
        - `@angular/cli` from `20.0.3` to `21.2.24`
        - `@angular/compiler-cli` from `20.0.4` to `21.2.25`
        - `@angular/language-service` from `20.0.4` to `21.2.25`
        - `cpy-cli` from `5.0.0` to `7.0.0`
        - `ng-packagr` from `20.0.1` to `21.2.7`
        - `typescript` from `5.8.3` to `5.9.3`
- **Removed dependencies** — reduce the dependency surface.
    - Peer Dependencies (`@fsegurai/ngx-markdown`)
        - `zone.js` - the library is zoneless-compatible.
    - Dependencies
        - `@angular/animations` - replaced by native `animate.enter` / `animate.leave` and CSS.
        - `@angular/flex-layout` - deprecated and unmaintained; replaced by plain CSS.
        - `@angular/platform-browser-dynamic` - deprecated and unused.
        - `gumshoejs` - replaced by `@fsegurai/scrollspy`.
        - `hammerjs` - unused.
        - `zone.js` - the demo runs zoneless.
        - `ngx-markdown` (`file:lib`) - the demo consumes the built library through a `tsconfig` path.
    - Dev Dependencies
        - ESLint toolchain: `@eslint/js`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`,
          `@typescript-eslint/types`, `@typescript-eslint/utils`, `angular-eslint`, `eslint`,
          `eslint-formatter-checkstyle`, `eslint-import-resolver-typescript`, `eslint-plugin-import`,
          `typescript-eslint` - replaced by Biome.
        - Karma/Jasmine toolchain: `@chiragrupani/karma-chromium-edge-launcher`, `@types/jasmine`, `jasmine-core`,
          `karma`, `karma-chrome-launcher`, `karma-coverage`, `karma-jasmine`, `karma-jasmine-html-reporter`,
          `karma-junit-reporter` - replaced by Vitest.
        - `linklocal`, `rimraf` - no longer needed for linking the library into the demo.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v21.0.0

---

## [20.0.1] - 2026-10-07

### 🐞 Fixes

- **Tests** — correct type casting in markdown service tests and remove a redundant `ViewRef` cast.

### 🔧 Infrastructure

- **Azure DevOps pipelines** — adapt the ADO build, PR, and release pipelines and the Appwrite Terraform infrastructure
  to `ngx-markdown`; update the release pipeline and Doppler command aliases.
- **CI** — add a coverage command (`test-ci_cd:coverage:lib`) and lint CI scripts; remove unused test results and
  coverage configurations from the PR pipeline; update the JUnit reporter output path in the Karma config.

### 🔐 Security

- **Dependencies** — update the lockfile and dependencies to their latest versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v20.0.1

---

## [20.0.0] - 2025-06-17

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 20** — upgraded the library to Angular `v20`. **(Note**: This change is not backward compatible.)

### 🚀 Features

- **Signals** — migrated the library to Angular signals.
- **Zoneless** — partial `zone.js` deprecation.

### 🐞 Fixes

- **Unit tests** — fixed unit tests after the refactoring and signals implementation.

### 🔧 Changes

- **Link service** — improved logic to better handle external and internal links.
- **Refactoring** — refactored pipes, services, and components for better declaration, error handling, and edge cases;
  overall logic implementation refactored.
- **CI/CD** — removed old CI/CD workflows.

### 🔐 Security

- **Dependencies** — upgraded library versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v20.0.0

---

## [19.2.0] - 2025-03-03

### 🚀 Features

- **Marked extensions** — dependency injection support for marked extensions.
- **Scrollspy** — new TOC validation for the scrollspy component.
- **Browser support** — added browser support configuration.
- **Azure DevOps** — added an ADO workflow.

### 🐞 Fixes

- **Tests** — changed the test browser to Edge and fixed the unit test config file.
- **Demo** — improved the get-started rendering and the project logo.

### 🔧 Changes

- **Project** — refactored the project structure, README, and license; improved the project demo.

### 🔐 Security

- **Dependencies** — upgraded library versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.2.0

---

## [19.1.0] - 2024-12-06

### 🐞 Fixes

- **Release workflows** — multiple fixes to the release library, release demo, and test workflows.
- **README** — fixed README content.

### 🔧 Changes

- **Project** — improved project structure, workflows, validations, and lint.
- **Documentation** — improved the README.
- **Demo** — improved the demo.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.1.0

---

## [19.0.0] - 2024-11-28

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 19** — upgraded the library to Angular `v19` (shipped first as `v19.0.0-beta.1`). **(Note**: This change is
  not backward compatible.)
- **Marked 15** — implemented `marked` version `15`.

### 🚀 Features

- **Mermaid** — global configuration for Mermaid and update options.

### 🔧 Changes

- **Project** — improved workflow validations, ESLint configuration, README, and demo structure.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v19.0.0

---

## [18.1.0] - 2024-11-13

### 🚀 Features

- **Marked 14** — `marked` v14 implementation and updated project libraries.
- **Mermaid** — new chart interfaces based on the current Mermaid release, including the new kanban chart.

### 🐞 Fixes

- **Anchors** — solution for Angular anchors rendered from markdown content.
- **Links** — fixed relative links to local repository files.
- **Mermaid** — improved Mermaid interfaces.
- **Pipelines** — multiple fixes across beta releases to the PR triage, release, and release demo pipelines and
  release workflow dependencies.
- **Labeler** — fixed labeler setup and documentation.

### 🔧 Changes

- **Pipelines** — improved the current pipeline workflow, validations, and schemas.
- **Scripts** — removed unused package scripts.

### 🔐 Security

- **Dependencies** — upgraded Mermaid and ESLint package versions.

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v18.1.0

---

## [18.0.0] - 2024-10-25

### ⚠️ BREAKING CHANGES ⚠️

- **Angular 18** — upgraded the library from Angular `v17` to `v18`. **(Note**: This change is not backward
  compatible.)

### 🐞 Fixes

- **npm publish** — fixed the npm publish pipeline tag setup and publish setup file on `determine_tag`.
- **Pipelines** — fixed pipelines setup and deprecated `save-state`/`set-output` commands.
- **Demo** — fixed the favicon reference.
- **README** — fixed the build badge and README content.

### 🔧 Changes

- **ESLint** — migrated ESLint from `8.57.0` to `v9.13.0` and improved the ESLint implementation.
- **npm publish** — optimized the npm publish pipeline.

### 🔐 Security

- **Dependencies** — upgraded library versions across beta releases; bumped `micromatch`, `express`, `dompurify`,
  `axios`, and `body-parser` (Dependabot).

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v18.0.0

---

## [17.0.0] - 2024-08-05

### 🚀 Features

- **RouterLink handler** — handle router links rendered from markdown content.
- **npm scripts** — added `package.json` npm scripts.

### 🐞 Fixes

- **Hyperlinks** — fixed hyperlink handling.
- **Markdown service** — fixed markdown service parsing.
- **Markdown component** — improved the markdown rendering component and fixed its HTML.
- **Demo** — fixed the demo structure.
- **Scripts** — fixed `package.json` commands and deployment scripts.

### 🔧 Changes

- **CI/CD** — updated the Angular CI/CD workflow across beta releases.
- **Cleanup** — removed unused commands.

### 🔐 Security

- **Dependencies** — upgraded library and demo library versions across beta releases; bumped `socket.io` and `braces`
  (Dependabot).

**Full Changelog**: https://github.com/fsegurai/ngx-markdown/commits/v17.0.0

---

## ✅ Compatibility

| Angular | ngx-markdown |
|---------|--------------|
| 21      | 21.x         |
| 20      | 20.x         |
| 19      | 19.x         |
| 18      | 18.x         |
| 17      | 17.x         |

---

[unreleased]: https://github.com/fsegurai/ngx-markdown/compare/v21.0.0...HEAD

[21.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v20.0.1...v21.0.0

[20.0.1]: https://github.com/fsegurai/ngx-markdown/compare/v20.0.0...v20.0.1

[20.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.2.0...v20.0.0

[19.2.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.1.0...v19.2.0

[19.1.0]: https://github.com/fsegurai/ngx-markdown/compare/v19.0.0...v19.1.0

[19.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v18.1.0...v19.0.0

[18.1.0]: https://github.com/fsegurai/ngx-markdown/compare/v18.0.0...v18.1.0

[18.0.0]: https://github.com/fsegurai/ngx-markdown/compare/v17.0.0...v18.0.0

[17.0.0]: https://github.com/fsegurai/ngx-markdown/commits/v17.0.0
