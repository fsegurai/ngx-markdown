# ADO pipelines for ngx-markdown

## Objective
Adapt the copied scrollspy ADO pipelines and Appwrite Terraform to this Angular workspace.

## Scope
- `pipelines/.ado/{build,pr,release}-pipeline.yml`
- `pipelines/infrastructure/appwrite/terraform/**`
- `package.json` (adds CI lint scripts)

Plan: `~/.claude/plans/current-ado-pipelines-work-validated-lerdorf.md`

## Tasks
- [x] T1 — Rewire the build, PR and release pipelines, the Terraform and the CI lint scripts (route: delegated writer, because 2+ non-trivial files)

## Acceptance
- No scrollspy, aurora, vite, `mde_` or `packages/` references remain under `pipelines/`.
- The YAML parses, and Terraform passes fmt and validate.
- Every referenced bun script exists and runs locally.

## Progress / evidence
### T1 (delegated writer) — done
- `rg -n -i "scrollspy|spy_|aurora|vite|mde_|packages/" pipelines/`: no matches.
- YAML `safe_load` on the 3 pipelines: ok.
- Consumer validator (`validate-consumer-pipeline.py`, jsonschema in a scratch venv): passed, 0 errors / 0 warnings on all 3.
- `terraform fmt -check`: clean. `terraform init -backend=false && terraform validate` (v1.15.5, appwrite ~> 2.2): valid. `.terraform` and lock file removed afterwards.
- `build:lib && build_post:lib`, `type-check:lib`, `type-check:demo`, `lint-ci:lib`, `lint-ci:demo`, `build:demo`: all pass (demo has a pre-existing 225 B SCSS budget warning).
- `test-ci_cd:lib`: fails locally without `CHROME_BIN`; with Playwright Chromium as `CHROME_BIN`, 115/115 pass.

### Deviations from the plan
- Demo build runs through the resource `root_scripts: build:demo`, not the Appwrite publisher `build_command`: the template passes `build_command` to `appwrite sites create-deployment --build-command`, so Appwrite would rebuild remotely.
- `site.tf` already had `fallback_file = "index.html"` (validated against the provider); kept it with a comment. No 404 copy is involved because `build_post:demo` is not used.
- `test_results_configuration.results_files` and `coverage_configuration.lcov_file` are set explicitly (the default results glob is `**/junit.xml`, which would not match).

### Open issues (outside T1 scope)
- `lib/karma.conf.js` junit `outputFile: '../test-results.xml'` resolves against the workspace root under `@angular/build:karma`, so the file lands one level above the repo, not at `test-results.xml`. The Tests tab publishes nothing until it is fixed.
- `test-ci_cd:lib` does not pass `--code-coverage`, so `coverage/lcov.info` is not produced. The Coverage tab publishes nothing until it is added.
- ADO prerequisites: `VG-ngx-markdown` (tokens, `LIB_PATH` empty/unset, `DEMO_PATH=dist/demo/browser` for the pages publishers), Doppler config `ngxmd_prod`, build definition "NGX Markdown - Build", Appwrite service connection.
- `.github/workflows/build.yml` references missing scripts (`postBuild:lib`, `gh-pages:*`).

## Next step
Decide on the karma junit path and `--code-coverage` follow-up.
