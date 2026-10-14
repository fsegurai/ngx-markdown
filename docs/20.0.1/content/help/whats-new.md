---
label: What's New in 20.0.1
description: Release notes for @fsegurai/ngx-markdown 20.0.1, a maintenance release of the Angular 20 line with no library source changes.
order: 1
tags: [ "help", "changelog", "release-notes" ]
keywords: [ "20.0.1", "maintenance", "Azure DevOps", "dependencies" ]
---

# What's New in 20.0.1

Released 2026-10-07, more than a year after 20.0.0. It is a maintenance release cut while the repository moved to
Azure DevOps pipelines, just before the 21.0.0 work started. The published library source is **identical to
20.0.0**: only the version, test files and build tooling changed.

## Fixes

- **Tests** - corrected type casting in the `MarkdownService` tests and removed a redundant `ViewRef` cast.

## Infrastructure

- **Azure DevOps pipelines** - build, PR and release pipelines and the Appwrite Terraform infrastructure adapted to
  `ngx-markdown`; release pipeline and Doppler command aliases updated.
- **CI** - a coverage command (`test-ci_cd:coverage:lib`) and lint CI scripts; unused test results and coverage
  configuration removed from the PR pipeline; the JUnit reporter output path in the Karma config updated.

## Security

- **Dependencies** - the workspace lockfile and dependencies updated to their latest versions. The library's peer
  and optional dependency ranges are unchanged from 20.0.0.

## Upgrade checklist

- [ ] Coming from 20.0.0? Only bump the version; nothing in the library changed.
- [ ] Coming from 19.x? Follow [Upgrading from 19.x](../guides/upgrading-from-19.md).

## Source of these notes

The repository had no `CHANGELOG.md` at the `v20.0.1` tag. These notes are based on today's
[CHANGELOG](https://github.com/fsegurai/ngx-markdown/blob/main/CHANGELOG.md) entry for 20.0.1 and on a diff of the
library source between the `v20.0.0` and `v20.0.1` tags.
