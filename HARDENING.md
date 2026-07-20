<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.32.4

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.32.4** was hardened automatically. 2 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Numerous workflow files reference external GitHub Actions using mutable version tags (e.g., @v6, @v5, @v4, @v7, @v2.2.1, @v0.0.4) instead of immutable 40-character commit SHAs. This exposes the workflows to supply-chain attacks if the referenced tags are moved. Affected actions include: actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/setup-node@v6, actions/setup-python@v6, actions/download-artifact@v7, github/codeql-action/upload-sarif@v4, actions/create-github-app-token@v2.2.1, actions/publish-immutable-action@v0.0.4.

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
- `.github/workflows/__ccr.yml:1`
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
- `.github/workflows/__go.yml:1`
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

### script-injection (severity: high)

Rule (a): GitHub Actions expressions (${{ ... }}) are interpolated directly inside run: shell command strings. (1) In __upload-sarif.yml: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` — runner.temp is injected directly into the shell command. (2) In prepare-release.yml: a 'Print release information' run block echoes `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, `${{ steps.branches.outputs.backport_target_branches }}` directly in shell. (3) In update-release-branch.yml: two run blocks pass `${{ secrets.GITHUB_TOKEN }}`, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` directly as shell arguments to a Python script.

Locations:

- `.github/workflows/__upload-sarif.yml:175`
- `.github/workflows/prepare-release.yml:65`
- `.github/workflows/update-release-branch.yml:60`
- `.github/workflows/update-release-branch.yml:103`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 70+ workflow files by pinning to full 40-character commit SHAs with original tags preserved as comments. Actions pinned: actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/setup-node@v6, actions/setup-python@v6, actions/download-artifact@v7, github/codeql-action/upload-sarif@v4, actions/create-github-app-token@v2.2.1, actions/publish-immutable-action@v0.0.4, actions/upload-artifact@v6, actions/github-script@v8, actions/setup-java@v5. Fixed script injection in 3 locations: (1) __upload-sarif.yml: moved runner.temp to env block; (2) prepare-release.yml: moved step outputs to env block; (3) update-release-branch.yml: moved secrets.GITHUB_TOKEN and github.repository to env blocks in both the 'Update current release branch' and 'Update older release branch' steps.

### Iteration 2

**Fixes applied:** script-injection, unpinned-uses, github-env-injection

**Notes:**

Fixed 5 findings across 5 files:
1. release-branches/action.yml: Moved ${{ github.action_path }} into env var ACTION_PATH to eliminate script injection risk.
2. release-initialise/action.yml: Pinned actions/setup-python@v6 to full SHA ece7cb06caefa5fff74198d8649806c4678c61a1.
3. prepare-test/action.yml: Sanitized version variable derived from inputs.version using printf '%s' | tr -d '\n\r' before writing to GITHUB_OUTPUT.
4. rollback-release.yml: Sanitized NEW_BRANCH (derived from VERSION and BASE_BRANCH) using printf '%s' | tr -d '\n\r' before writing to GITHUB_OUTPUT.
5. post-release-mergeback.yml: Sanitized both VERSION and NEW_BRANCH (derived from github.event.inputs.baseBranch via BASE_BRANCH) using printf '%s' | tr -d '\n\r' before writing to GITHUB_OUTPUT.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in three workflow files:
1. `.github/workflows/__cleanup-db-cluster-dir.yml`: Moved `${{ runner.temp }}` into `RUNNER_TEMP` env var in both the 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.
2. `.github/workflows/__multi-language-autodetect.yml`: Moved `${{ runner.temp }}` into `RUNNER_TEMP` and all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions into individual env vars (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, SWIFT_DB) in both the 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps.
3. `.github/workflows/__start-proxy.yml`: Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into PROXY_HOST, PROXY_PORT, PROXY_URLS env vars in the 'Print proxy outputs' step.

### Iteration 4

**Fixes applied:** script-injection

**Notes:**

Fixed all 7 script-injection findings across 6 workflow files:

1. __ruby.yml (line 79): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to step env: block as RUBY_DB, removed inline shell assignment.

2. __rust.yml (line 64): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` to step env: block as RUST_DB, removed inline shell assignment.

3. __swift-autobuild.yml (line 63): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to step env: block as SWIFT_DB, removed inline shell assignment.

4. __swift-custom-build.yml (line 88): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to step env: block as SWIFT_DB, removed inline shell assignment.

5. __unset-environment.yml (line 56): Moved all six fromJson expressions (cpp, csharp, go, java, javascript, python) to the step's env: block and removed inline shell assignments from the run: script.

6. __multi-language-autodetect.yml (line 113): Added double-quotes around all unquoted variable expansions in [[ ]] comparisons for CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, SWIFT_DB, and RUNNER_TEMP (split glob pattern so wildcard stays unquoted).

7. update-release-branch.yml (lines 51, 56, 62, 78, 100, 101): Added double-quotes around all unquoted variable expansions: $RELEASE_BRANCH, ${RELEASE_BRANCH}, ${LATEST_TAG}, ${REF_NAME} in 'Ensure release branch exists'; ${GITHUB_ACTOR} in 'Update current release branch'; ${SOURCE_BRANCH}, ${TARGET_BRANCH}, ${GITHUB_ACTOR} in 'Update older release branch'.

