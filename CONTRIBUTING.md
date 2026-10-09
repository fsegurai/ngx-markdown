# 🙌 Contributing to ngx-markdown

Thanks for your interest in improving the **ngx-markdown** project! Whether it's fixing bugs, improving documentation, or suggesting new features—your help is welcome 🙏

---

## 🚀 Getting Started

> **Requirements**
> Ensure you're using **Node.js v24.x** and **Bun v1.4.x** or higher.

### 1. Clone the Repository

```bash
git clone https://github.com/fsegurai/ngx-markdown.git
cd ngx-markdown
```

### 2. Install Dependencies

```bash
bun install
```

### 3. Build the Library

```bash
bun run build:lib
```

The library is built with `ng-packagr` into `dist/lib`. `build:lib` first runs `check:lib-imports`, which fails if
`lib/` imports `ngx-markdown`, `@fsegurai/ngx-markdown`, `@app/` or `@shared/`: ng-packagr does not rewrite path
aliases, so library sources must use relative imports only.

### 4. Start Development Server

```bash
bun run start
```

This runs `ng build lib --watch` and `ng serve demo` side by side (with `concurrently`). The dev server waits for the
first library build before it starts.

The demo imports `ngx-markdown`, which the root `tsconfig.json` maps to the **built** library in `dist/lib`, not to
`lib/src`. The demo therefore consumes exactly what gets published (the package.json `exports` and the FESM bundle). That
is why every script that builds or type-checks the demo needs `dist/lib`:

- `build:demo` (and `build:all`) always runs `build:lib` first.
- `type-check:demo`, `test-local:demo` and `test-ci_cd:demo` run `ensure:lib`, which builds the library only when
  `dist/lib` is missing. Run `bun run build:lib` after library changes to type-check or test the demo against fresh
  output (`bun run start` keeps `dist/lib` up to date while it runs).

---

## 🧪 Running Tests

Tests run with **Vitest** (jsdom environment) through the Angular CLI `@angular/build:unit-test` builder. The
library is zoneless, so specs use `await fixture.whenStable()` and Vitest fake timers (`vi.useFakeTimers()`) instead
of `fakeAsync`/`tick`.

To run the test suite in watch mode:

```bash
bun run test-local:lib
```

To run the tests once (as the CI pipeline does); JUnit results are written to `junit.xml`:

```bash
bun run test-ci_cd:lib
```

### 📊 Coverage

To run the tests once with a coverage report (LCOV at `coverage/lcov.info`):

```bash
bun run test-ci_cd:coverage:lib
```

### 🧩 Demo Smoke Tests

The demo has a small smoke suite (`demo/src/**/*.spec.ts`, same builder, `demo/vitest.config.mts`) that checks the
library works through the demo: it imports `ngx-markdown` from the **built** `dist/lib` and uses the demo's own
providers (`app.config.ts`). It is not an exhaustive suite: keep it to essential checks (routes, markdown rendering,
pipe post-render, scrollspy). Both scripts run `ensure:lib` first, which builds the library only when `dist/lib` is
missing, so run `bun run build:lib` after library changes:

```bash
bun run test-local:demo   # watch mode
bun run test-ci_cd:demo   # single run; JUnit results are written to junit-demo.xml
```

The demo report has its own file so it never overwrites the library's `junit.xml`; the PR pipeline publishes both.

### 🔎 Type Checking

```bash
bun run type-check:lib
bun run type-check:demo
```

### ⏱️ Performance (not part of CI)

Both use `generateLongMarkdown` (`lib/src/testing/generate-long-markdown.ts`), a seeded generator of long Markdown
documents. It is test tooling and is not exported from the library.

```bash
bun run bench:lib   # vitest bench: MarkdownService.parse() on 2000 and 5000 lines, per plugin (jsdom, parse only)
```

For the real-browser cost, the demo has an unlisted `/perf` page (`/perf?lines=5000&katex=1&mermaid=1&clipboard=1&emoji=1&prism=0`).
`scripts/perf/measure-long-doc.mjs` (`bun run perf:demo`) opens it with Playwright and reports the time to `ready`, the
longest task and the total blocking time. Its header comment lists the options and environment variables
(`PLAYWRIGHT_CORE`, `PLAYWRIGHT_BROWSERS_PATH`, `PERF_URL`). Build and serve the demo first:

```bash
bun run build:demo && bun run build_post:demo
# serve dist/demo/browser with an index.html fallback, then:
PERF_URL=http://127.0.0.1:8769 bun run perf:demo -- --lines 2000,5000 --out perf.json
```

---

## 🧼 Linting

> Linting is enforced as part of the CI pipeline. Please ensure your code is clean before pushing:

```bash
bun run lint
bun run format:audit   # Read-only check (Biome, covers lint + format)
```

You can also lint specific parts:
- Demo: `bun run lint:demo`
- Library: `bun run lint:lib`

Run `bun run lint:fix` to auto-fix formatting issues before committing (it is the same command as `format`).

`bun run lint:check` is the read-only check the PR pipeline runs.

---

## 📦 Project Structure

This project is an Angular workspace with two projects:

- `lib/` - The `ngx-markdown` library
  - `src/` - Components, pipes, services and configuration
  - `public_api.ts` - Public API entry point
  - `vitest.config.mts` - Vitest configuration used by the `test` target
- `demo/` - The demo application that showcases the library
  - `src/app/` - Demo pages (get started, bindings, plugins, syntax highlight, and more)
  - `vitest.config.mts`, `tsconfig.spec.json` - Configuration of the demo smoke tests
  - `public/` - Static assets (icons and images)

### Post Build Steps

Once you've finished working on the library, run the following to build and verify your changes:

```bash
bun run build:demo       # builds the library first, then the demo
bun run build_post:lib   # copies README.md and LICENSE into dist/lib
bun run build_post:demo  # copies index.html to 404.html (SPA fallback) and the third-party licenses into dist/demo/browser
```

---

## ✍️ Commit Message Convention

This project follows **[Conventional Commits](https://www.conventionalcommits.org/)**.

| Type        | Description                           |
|-------------|---------------------------------------|
| `feat:`     | New feature                           |
| `fix:`      | Bug fix                               |
| `docs:`     | Documentation only changes            |
| `refactor:` | Code refactoring (no behavior change) |
| `test:`     | Adding or fixing tests                |
| `chore:`    | Maintenance tasks, build config       |
| `ci:`       | CI pipeline changes                   |
| `del:`      | File or code removal                  |

Example:

```bash
git commit -m "feat: add support for custom clipboard button templates"
```

---

## 🔀 Submitting a Pull Request

Day-to-day work happens on the `development` branch; `main` holds released code.

Please follow these steps to ensure a smooth review:

1. **Merge** the latest changes from `development` into your branch:
   ```bash
   git checkout development
   git pull origin development
   git checkout your-feature-branch
   git merge development
   ```

2. Make sure all tests pass:
   ```bash
   bun run test-ci_cd:lib
   bun run test-ci_cd:demo
   ```

3. Lint, type-check, build and verify your changes:
   ```bash
   bun run lint:check
   bun run type-check:lib
   bun run type-check:demo
   bun run build:lib
   bun run build:demo
   ```

4. If you've added functionality:
    - Include **unit tests**.
    - Update the **README.md** or relevant documentation.
    - Add a demo example if applicable.

5. Reference any related issues in your PR comment:
   > Example: _"Closes #12"_

6. Ensure your PR title follows the **conventional commit** format.

---

## 🐛 Reporting Bugs

When submitting a bug report, please include:

- A **clear description** of the issue.
- The **expected vs actual behavior**.
- A **minimal reproducible example** (CodeSandbox or StackBlitz is ideal).
- Details about:
    - Browser(s) and OS
    - Node and Bun versions
    - Angular version
    - ngx-markdown version
    - Which feature is affected (e.g. syntax highlight, KaTeX, Mermaid, clipboard)

---

## 💬 Need Help?

Open a [discussion](https://github.com/fsegurai/ngx-markdown/discussions)
or [create an issue](https://github.com/fsegurai/ngx-markdown/issues) and we'll do our best to assist!

---

Thanks for contributing to ngx-markdown! ✨
