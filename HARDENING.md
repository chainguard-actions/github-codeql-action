<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **github--codeql-action/v2** was hardened automatically. 3 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference external actions using mutable tags (e.g. @v4, @v5, @v3, @v0.0.4) instead of pinned 40-character SHA digests. Failing references include: actions/checkout@v4, actions/setup-python@v5, actions/setup-go@v5, actions/setup-node@v4, actions/download-artifact@v4, actions/publish-immutable-action@v0.0.4, github/codeql-action/upload-sarif@v3.

Locations:

- `.github/workflows/__all-platform-bundle.yml:1`
- `.github/workflows/__analyze-ref-input.yml:1`
- `.github/workflows/__autobuild-action.yml:1`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:1`
- `.github/workflows/__autobuild-direct-tracing.yml:1`
- `.github/workflows/__build-mode-autobuild.yml:1`
- `.github/workflows/__build-mode-manual.yml:1`
- `.github/workflows/__build-mode-none.yml:1`
- `.github/workflows/__build-mode-rollback.yml:1`
- `.github/workflows/__cleanup-db-cluster-dir.yml:1`
- `.github/workflows/__config-export.yml:1`
- `.github/workflows/__config-input.yml:1`
- `.github/workflows/__cpp-deptrace-disabled.yml:1`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:1`
- `.github/workflows/__cpp-deptrace-enabled.yml:1`
- `.github/workflows/__diagnostics-export.yml:1`
- `.github/workflows/__export-file-baseline-information.yml:1`
- `.github/workflows/__extract-direct-to-toolcache.yml:1`
- `.github/workflows/__extractor-ram-threads.yml:1`
- `.github/workflows/__go-custom-queries.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround.yml:1`
- `.github/workflows/__go-tracing-autobuilder.yml:1`
- `.github/workflows/__go-tracing-custom-build-steps.yml:1`
- `.github/workflows/__go-tracing-legacy-workflow.yml:1`
- `.github/workflows/__init-with-registries.yml:1`
- `.github/workflows/__javascript-source-root.yml:1`
- `.github/workflows/__job-run-uuid-sarif.yml:1`
- `.github/workflows/__language-aliases.yml:1`
- `.github/workflows/__multi-language-autodetect.yml:1`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-js.yml:1`
- `.github/workflows/__packaging-inputs-js.yml:1`
- `.github/workflows/__remote-config.yml:1`
- `.github/workflows/__resolve-environment-action.yml:1`
- `.github/workflows/__rubocop-multi-language.yml:1`
- `.github/workflows/__ruby.yml:1`
- `.github/workflows/__split-workflow.yml:1`
- `.github/workflows/__start-proxy.yml:1`
- `.github/workflows/__submit-sarif-failure.yml:1`
- `.github/workflows/__swift-autobuild.yml:1`
- `.github/workflows/__swift-custom-build.yml:1`
- `.github/workflows/__test-autobuild-working-dir.yml:1`
- `.github/workflows/__test-local-codeql.yml:1`
- `.github/workflows/__test-proxy.yml:1`
- `.github/workflows/__unset-environment.yml:1`
- `.github/workflows/__upload-ref-sha-input.yml:1`
- `.github/workflows/__with-checkout-path.yml:1`
- `.github/workflows/__zstd-bundle-streaming.yml:1`
- `.github/workflows/__zstd-bundle.yml:1`
- `.github/workflows/check-expected-release-files.yml:1`
- `.github/workflows/codeql.yml:30`
- `.github/workflows/codescanning-config-cli.yml:1`
- `.github/workflows/debug-artifacts-failure.yml:1`
- `.github/workflows/debug-artifacts.yml:1`
- `.github/workflows/expected-queries-runs.yml:1`
- `.github/workflows/post-release-mergeback.yml:1`
- `.github/workflows/pr-checks.yml:1`
- `.github/workflows/publish-immutable-action.yml:1`
- `.github/workflows/python312-windows.yml:1`
- `.github/workflows/query-filters.yml:1`
- `.github/workflows/rebuild.yml:1`
- `.github/workflows/test-codeql-bundle-all.yml:1`
- `.github/workflows/update-bundle.yml:1`
- `.github/workflows/update-dependencies.yml:1`
- `.github/workflows/update-release-branch.yml:1`
- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

### missing-permissions (severity: medium)

These workflow files have no top-level permissions: block and at least one job also lacks a job-level permissions: block, leaving the default (potentially write-all) token permissions in effect.

Locations:

- `.github/workflows/check-expected-release-files.yml:1`
- `.github/workflows/codescanning-config-cli.yml:1`
- `.github/workflows/debug-artifacts-failure.yml:1`
- `.github/workflows/debug-artifacts.yml:1`
- `.github/workflows/post-release-mergeback.yml:1`
- `.github/workflows/pr-checks.yml:1`
- `.github/workflows/python312-windows.yml:1`
- `.github/workflows/query-filters.yml:1`
- `.github/workflows/rebuild.yml:1`
- `.github/workflows/update-bundle.yml:1`
- `.github/workflows/update-dependencies.yml:1`
- `.github/workflows/update-release-branch.yml:1`
- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

### script-injection (severity: high)

Rule (a): ${{ }} expressions are interpolated directly inside run: shell command strings. In codeql.yml, `run: ${{steps.init.outputs.codeql-path}} version --format=json` interpolates a step output directly. In publish-immutable-action.yml, `echo "Release name: ${{ github.event.release.name }}"` interpolates github context directly. In update-release-branch.yml, multiple run: blocks interpolate ${{ steps.versions.outputs.* }}, ${{ secrets.GITHUB_TOKEN }}, ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} directly.

Locations:

- `.github/workflows/codeql.yml:94`
- `.github/workflows/publish-immutable-action.yml:21`
- `.github/workflows/update-release-branch.yml:50`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, missing-permissions, script-injection

**Notes:**

Fixed all three finding types across 70+ workflow files: (1) Pinned all unpinned action references to full SHA digests: actions/checkout@v4 -> @34e114876b0b11c390a56381ad16ebd13914f8d5, actions/setup-python@v5 -> @a26af69be951a213d495a4c3e4e4022e16d87065, actions/setup-go@v5 -> @40f1582b2485089dde7abd97c1529aa768e1baff, actions/setup-node@v4 -> @49933ea5288caeca8642d1e84afbd3f7d6820020, actions/download-artifact@v4 -> @d3f86a106a0bac45b974a628896c90dbdf5c8093, actions/upload-artifact@v4 -> @ea165f8d65b6e75b540449e92b4886f43607fa02, actions/github-script@v7 -> @f28e40c7f34bde8b3046d885e986cb6290c5673b, actions/publish-immutable-action@v0.0.4 -> @4bc8754ffc40f27910afb20287dbbbb675a4e978, github/codeql-action/upload-sarif@v3 -> @02c5e83432fe5497fd85b873b6c9f16a8578e1d9. (2) Added top-level permissions blocks to 13 workflow files that were missing them (check-expected-release-files.yml, codescanning-config-cli.yml, debug-artifacts-failure.yml, debug-artifacts.yml, post-release-mergeback.yml, pr-checks.yml, python312-windows.yml, query-filters.yml, rebuild.yml, update-bundle.yml, update-dependencies.yml, update-release-branch.yml, update-supported-enterprise-server-versions.yml). (3) Fixed script injection in codeql.yml (moved steps.init.outputs.codeql-path to env block), publish-immutable-action.yml (removed direct ${{ github.event.release.name }} from echo command), and update-release-branch.yml (moved secrets.GITHUB_TOKEN, github.repository, and step outputs to env blocks). Also rewrote pr-checks.yml, __zstd-bundle.yml, and __zstd-bundle-streaming.yml to fix corruption caused by replace_all operations.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection, github-env-injection

**Notes:**

1. Pinned ruby/setup-ruby@v1 to full SHA d45b1a4e94b71acab930e56e79c6aa188764e7f9 in __rubocop-multi-language.yml. 2. Fixed script injection in update-dependencies.yml by moving github.event.pull_request.number into a PR_NUMBER env variable instead of directly interpolating it in the run block. 3. Fixed script injection in __start-proxy.yml by moving steps.proxy.outputs.proxy_host/proxy_port/proxy_urls into PROXY_HOST/PROXY_PORT/PROXY_URLS env variables. 4. Fixed github-env-injection in post-release-mergeback.yml by sanitizing BASE_BRANCH and NEW_BRANCH with printf | tr -d newlines before writing to GITHUB_OUTPUT.

