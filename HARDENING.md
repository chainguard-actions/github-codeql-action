<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.3** was hardened automatically. 6 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside a run: shell command string. The expression `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` passes the runner.temp context value through YAML template substitution before the shell sees it, making it a script-injection risk.

Locations:

- `.github/workflows/__upload-sarif.yml:131`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are interpolated directly inside a run: shell command string in the 'Print proxy outputs' step. These step output expressions are expanded by the YAML template engine before the shell executes the script, allowing injection of shell metacharacters.

Locations:

- `.github/workflows/__start-proxy.yml:76`

### github-env-injection (severity: high)

The env var YQ_PATH is set from `${{ runner.temp }}/yq` (a runner.* context value) and then written directly to $GITHUB_PATH without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled runner.temp value could inject additional PATH entries.

Locations:

- `.github/workflows/__build-mode-autobuild.yml:65`

### github-env-injection (severity: high)

The env var BASE_BRANCH is set from `${{ (github.event_name == 'workflow_dispatch' && 'main') || github.ref_name }}` (a github.* context value) and is incorporated into NEW_BRANCH which is then written to $GITHUB_OUTPUT without sanitization. A branch name containing newlines could inject additional output variables.

Locations:

- `.github/workflows/rollback-release.yml:82`

### github-env-injection (severity: high)

The env var BASE_BRANCH is set from `${{ github.event.inputs.baseBranch || 'main' }}` (a workflow_dispatch input) and is incorporated into NEW_BRANCH which is then written to $GITHUB_OUTPUT without sanitization. A caller-supplied baseBranch value containing newlines could inject additional output variables.

Locations:

- `.github/workflows/post-release-mergeback.yml:57`

### unpinned-uses (severity: high)

One or more `uses:` references use mutable tag-based refs instead of immutable 40-character SHA digests. Failing references include: `actions/checkout@v6`, `actions/setup-dotnet@v5`, `actions/setup-go@v6`.

Locations:

- `.github/workflows/__all-platform-bundle.yml:1`
- `.github/workflows/__analysis-kinds.yml:1`
- `.github/workflows/__analyze-ref-input.yml:1`
- `.github/workflows/__autobuild-action.yml:1`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:1`
- `.github/workflows/__autobuild-working-dir.yml:1`
- `.github/workflows/__build-mode-autobuild.yml:1`
- `.github/workflows/__build-mode-manual.yml:1`
- `.github/workflows/__build-mode-none.yml:1`
- `.github/workflows/__build-mode-rollback.yml:1`
- `.github/workflows/__bundle-from-nightly.yml:1`
- `.github/workflows/__bundle-from-toolcache.yml:1`
- `.github/workflows/__bundle-toolcache.yml:1`
- `.github/workflows/__bundle-zstd.yml:1`
- `.github/workflows/__cleanup-db-cluster-dir.yml:1`
- `.github/workflows/__config-export.yml:1`
- `.github/workflows/__config-input.yml:1`
- `.github/workflows/__cpp-deptrace-disabled.yml:1`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:1`
- `.github/workflows/__cpp-deptrace-enabled.yml:1`
- `.github/workflows/__diagnostics-export.yml:1`
- `.github/workflows/__export-file-baseline-information.yml:1`
- `.github/workflows/__extractor-ram-threads.yml:1`
- `.github/workflows/__global-proxy.yml:1`
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
- `.github/workflows/__local-bundle.yml:1`
- `.github/workflows/__multi-language-autodetect.yml:1`
- `.github/workflows/__overlay-init-fallback.yml:1`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-js.yml:1`
- `.github/workflows/__packaging-inputs-js.yml:1`
- `.github/workflows/__remote-config.yml:1`
- `.github/workflows/__resolve-environment-action.yml:1`
- `.github/workflows/__ruby.yml:1`
- `.github/workflows/__rust.yml:1`
- `.github/workflows/__split-workflow.yml:1`
- `.github/workflows/__start-proxy.yml:1`
- `.github/workflows/__submit-sarif-failure.yml:1`
- `.github/workflows/__swift-autobuild.yml:1`
- `.github/workflows/__swift-custom-build.yml:1`
- `.github/workflows/__unset-environment.yml:1`
- `.github/workflows/__upload-ref-sha-input.yml:1`
- `.github/workflows/__upload-sarif.yml:1`
- `.github/workflows/__with-checkout-path.yml:1`
- `.github/workflows/check-expected-release-files.yml:1`
- `.github/workflows/codeql.yml:1`
- `.github/workflows/codescanning-config-cli.yml:1`
- `.github/workflows/debug-artifacts-failure-safe.yml:1`
- `.github/workflows/debug-artifacts-safe.yml:1`
- `.github/workflows/post-release-mergeback.yml:1`
- `.github/workflows/pr-checks.yml:1`
- `.github/workflows/prepare-release.yml:1`
- `.github/workflows/publish-immutable-action.yml:1`
- `.github/workflows/python312-windows.yml:1`
- `.github/workflows/query-filters.yml:1`
- `.github/workflows/rebuild.yml:1`
- `.github/workflows/rollback-release.yml:1`
- `.github/workflows/test-codeql-bundle-all.yml:1`
- `.github/workflows/update-bundle.yml:1`
- `.github/workflows/update-release-branch.yml:1`
- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection, unpinned-uses

**Notes:**

Fixed all 5 security findings:

1. script-injection in __upload-sarif.yml: Moved runner.temp into env block as RUNNER_TEMP
2. script-injection in __start-proxy.yml: Moved proxy step outputs into env block as PROXY_HOST/PROXY_PORT/PROXY_URLS
3. github-env-injection in __build-mode-autobuild.yml: Sanitized YQ_PATH with printf/tr before writing to GITHUB_PATH
4. github-env-injection in rollback-release.yml: Sanitized BASE_BRANCH with printf/tr before using in NEW_BRANCH written to GITHUB_OUTPUT
5. github-env-injection in post-release-mergeback.yml: Sanitized BASE_BRANCH with printf/tr before using in NEW_BRANCH written to GITHUB_OUTPUT
6. unpinned-uses: Pinned all action references across 70+ workflow files to full SHA digests:
   - actions/checkout@v6 → d23441a48e516b6c34aea4fa41551a30e30af803
   - actions/setup-dotnet@v5 → 26b0ec14cb23fa6904739307f278c14f94c95bf1
   - actions/setup-go@v6 → 924ae3a1cded613372ab5595356fb5720e22ba16
   - actions/setup-java@v5 → 03ad4de0992f5dab5e18fcb136590ce7c4a0ac95
   - actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38
   - actions/setup-python@v6 → ece7cb06caefa5fff74198d8649806c4678c61a1
   - actions/upload-artifact@v7 → 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a
   - actions/github-script@v8 → ed597411d8f924073f98dfc5c65a23a2325f34cd
   - actions/download-artifact@v8 → 3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c
   - actions/create-github-app-token@v3.1.1 → 1b10c78c7865c340bc4f6099eb2f838309f1e8c3
   - actions/publish-immutable-action@v0.0.4 → 4bc8754ffc40f27910afb20287dbbbb675a4e978

Note: Several files had corruption during batch replacements where SHA text was inserted mid-string. All corruptions were identified and manually repaired.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

1. pr-checks.yml line 64: Pinned `github/codeql-action/upload-sarif@v4` to full SHA `7188fc363630916deb702c7fdcf4e481b751f97a` with `# v4` comment.
2. update-release-branch.yml: Fixed all script-injection issues:
   - 'Ensure release branch exists' step: Quoted all shell variable expansions (`$RELEASE_BRANCH`, `$LATEST_TAG`, `$REF_NAME`) to prevent word-splitting/glob injection.
   - 'Update current release branch' step: Moved `${{ secrets.GITHUB_TOKEN }}` to step `env:` block; replaced `${{ github.repository }}` with job-level `$REPOSITORY` env var; replaced `${{ env.REF_NAME }}` and `${{ env.MAJOR_VERSION }}` with their env var equivalents; quoted all shell variables.
   - 'Update older release branch' step (backport job): Moved `${{ secrets.GITHUB_TOKEN }}` and `${{ github.repository }}` to step-level `env:` block; quoted `$SOURCE_BRANCH`, `$TARGET_BRANCH`, and `$GITHUB_ACTOR` in the shell script.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script injection findings across 7 workflow files by moving ${{ }} template expressions out of run: shell blocks and into step-level env: blocks. The shell scripts now reference plain environment variables instead of directly interpolating GitHub Actions expressions. Files modified: prepare-release.yml (steps.versions.outputs.* and steps.branches.outputs.*), __cleanup-db-cluster-dir.yml (runner.temp in two steps), __ruby.yml (fromJson db-locations.ruby), __rust.yml (fromJson db-locations.rust), __swift-autobuild.yml (fromJson db-locations.swift), __swift-custom-build.yml (fromJson db-locations.swift), __unset-environment.yml (multiple fromJson db-locations expressions), __multi-language-autodetect.yml (multiple fromJson db-locations and runner.temp expressions in two steps).

### Iteration 4

**Fixes applied:** script-injection

**Notes:**

Fixed unquoted shell variable expansions in three workflow files:

1. `.github/workflows/update-release-branch.yml`: Quoted `${REF_NAME}` and `${MAJOR_VERSION}` in the 'Update current release branch' step (`echo "SOURCE_BRANCH=${REF_NAME}"` and `echo "TARGET_BRANCH=releases/${MAJOR_VERSION}"`), and quoted `${SOURCE_BRANCH}` and `${TARGET_BRANCH}` in the 'Update older release branch' step.

2. `.github/workflows/post-release-mergeback.yml`: Quoted `$PARTIAL_CHANGELOG` in both the redirect (`> "$PARTIAL_CHANGELOG"`) and the `cat` command (`cat "$PARTIAL_CHANGELOG"`) in the 'Prepare partial Changelog' step.

3. `.github/workflows/rollback-release.yml`: Quoted `$NEW_CHANGELOG` in the redirect and `cat` in 'Prepare rollback changelog'; quoted both `$NEW_CHANGELOG` and `$PARTIAL_CHANGELOG` in the redirect and `cat` in 'Prepare partial Changelog'; and quoted `${NEW_CHANGELOG}` in the `mv` command in 'Update changelog'.

