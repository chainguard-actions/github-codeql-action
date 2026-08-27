<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.35.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.35.1** was hardened automatically. 21 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): A ${{ runner.temp }} expression is directly interpolated inside a run: shell command string. The line reads: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted into the shell command before the shell parses it.

Locations:

- `.github/workflows/__upload-sarif.yml:152`

### script-injection (severity: high)

Rule (a): Multiple ${{ steps.*.outputs.* }} expressions are directly interpolated inside a run: shell command block in the 'Print release information' step. The lines include: `echo 'version: ${{ steps.versions.outputs.version }}'`, `echo 'major_version: ${{ steps.versions.outputs.major_version }}'`, `echo 'latest_tag: ${{ steps.versions.outputs.latest_tag }}'`, `echo 'backport_source_branch: ${{ steps.branches.outputs.backport_source_branch }}'`, `echo 'backport_target_branches: ${{ steps.branches.outputs.backport_target_branches }}'`. Steps outputs are workflow-controllable and must not be interpolated directly into run: blocks.

Locations:

- `.github/workflows/prepare-release.yml:62`

### script-injection (severity: high)

Rule (a): Multiple ${{ ... }} expressions are directly interpolated inside run: shell command blocks in the 'Update current release branch' and 'Update older release branch' steps. The offending lines include: `--github-token ${{ secrets.GITHUB_TOKEN }}`, `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}'`. Even though secrets.GITHUB_TOKEN is a secret reference, all ${{ ... }} expressions in run: blocks are script-injection risks because they are substituted before the shell parses the command.

Locations:

- `.github/workflows/update-release-branch.yml:57`
- `.github/workflows/update-release-branch.yml:100`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-dotnet@v5`, `actions/setup-go@v6`, `actions/download-artifact@v8`.

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
- `.github/workflows/__rubocop-multi-language.yml:1`
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

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`.

Locations:

- `.github/workflows/check-expected-release-files.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`.

Locations:

- `.github/workflows/codeql.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`.

Locations:

- `.github/workflows/codescanning-config-cli.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`.

Locations:

- `.github/workflows/debug-artifacts-failure-safe.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`.

Locations:

- `.github/workflows/debug-artifacts-safe.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/setup-python@v6`, `actions/create-github-app-token@v3.0.0`.

Locations:

- `.github/workflows/post-release-mergeback.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`, `github/codeql-action/upload-sarif@v4`.

Locations:

- `.github/workflows/pr-checks.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`.

Locations:

- `.github/workflows/prepare-release.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/publish-immutable-action@v0.0.4`.

Locations:

- `.github/workflows/publish-immutable-action.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/setup-python@v6`, `actions/checkout@v6`.

Locations:

- `.github/workflows/python312-windows.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`.

Locations:

- `.github/workflows/query-filters.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`.

Locations:

- `.github/workflows/rebuild.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/create-github-app-token@v3.0.0`.

Locations:

- `.github/workflows/rollback-release.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-dotnet@v5`.

Locations:

- `.github/workflows/test-codeql-bundle-all.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/setup-python@v6`, `actions/setup-node@v6`.

Locations:

- `.github/workflows/update-bundle.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/checkout@v6`, `actions/create-github-app-token@v3.0.0`.

Locations:

- `.github/workflows/update-release-branch.yml:1`

### unpinned-uses (severity: high)

The workflow uses mutable version tags instead of pinned full-length SHA commit hashes. Failing references include: `actions/setup-python@v6`, `actions/checkout@v6`.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 3 script-injection findings and all unpinned-uses findings across 77+ workflow files.

Script injection fixes:
1. __upload-sarif.yml (line 152): Moved ${{ runner.temp }} into env: block as RUNNER_TEMP variable
2. prepare-release.yml (line 62): Moved all ${{ steps.*.outputs.* }} expressions into env: block
3. update-release-branch.yml (lines 57, 100): Moved ${{ secrets.GITHUB_TOKEN }} and ${{ github.repository }} into env: blocks; replaced ${{ env.REF_NAME }} and ${{ env.MAJOR_VERSION }} with shell variable references

Unpinned actions fixed (all pinned to full SHA with tag comment):
- actions/checkout@v6 → d23441a48e516b6c34aea4fa41551a30e30af803
- actions/setup-dotnet@v5 → 26b0ec14cb23fa6904739307f278c14f94c95bf1
- actions/setup-go@v6 → 924ae3a1cded613372ab5595356fb5720e22ba16
- actions/download-artifact@v8 → 3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c
- actions/setup-node@v6 → 249970729cb0ef3589644e2896645e5dc5ba9c38
- actions/setup-python@v6 → ece7cb06caefa5fff74198d8649806c4678c61a1
- actions/create-github-app-token@v3.0.0 → f8d387b68d61c58ab83c6c016672934102569859
- actions/publish-immutable-action@v0.0.4 → 4bc8754ffc40f27910afb20287dbbbb675a4e978
- github/codeql-action/upload-sarif@v4 → cdf488f595d80d6e07e03d4674febd5ab45fa938

Note: Several files were corrupted during initial replacement attempts (due to replace_all tool behavior inserting replacement text at wrong positions) and had to be fully rewritten to restore correct content with pinned SHAs.

### Iteration 2

**Fixes applied:** unpinned-uses, github-env-injection

**Notes:**

Fixed all unpinned action references by replacing mutable version tags with full 40-character commit SHAs:
- actions/upload-artifact@v7 → @043fb46d1a93c77aae656e7c1c64a875d1fc6a0a (in __analysis-kinds.yml, __bundle-zstd.yml, __config-export.yml, __diagnostics-export.yml, __export-file-baseline-information.yml, __job-run-uuid-sarif.yml)
- actions/github-script@v8 → @ed597411d8f924073f98dfc5c65a23a2325f34cd (in __analysis-kinds.yml, __bundle-from-toolcache.yml, __bundle-toolcache.yml, __bundle-zstd.yml, __config-export.yml, __diagnostics-export.yml, __go-indirect-tracing-workaround-diagnostic.yml, __go-indirect-tracing-workaround-no-file-program.yml)
- actions/setup-java@v5 → @b6effb05e454b25005698d916606bdc6ffcbf961 (in __autobuild-direct-tracing-with-working-dir.yml, __build-mode-autobuild.yml)
- actions/setup-node@v6 → @249970729cb0ef3589644e2896645e5dc5ba9c38 (in release-initialise/action.yml)
- actions/setup-python@v6 → @ece7cb06caefa5fff74198d8649806c4678c61a1 (in release-initialise/action.yml)

Fixed github-env-injection in prepare-test/action.yml: the $version variable derived from inputs.version via sed is now sanitized with `printf '%s' "$version" | tr -d '\n\r'` before being written to $GITHUB_OUTPUT, preventing newline injection attacks.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed script-injection findings in 7 workflow files by moving all ${{ }} expressions from run: blocks into env: blocks:

1. __start-proxy.yml (line 63): Moved steps.proxy.outputs.proxy_host, proxy_port, proxy_urls to env vars PROXY_HOST, PROXY_PORT, PROXY_URLS.

2. __multi-language-autodetect.yml (lines 155, 225): Moved fromJson(steps.analysis.outputs.db-locations).{cpp,csharp,go,java,javascript,python,ruby} and runner.temp to env vars CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, CUSTOM_DB_LOCATION in the first step; moved fromJson(...).swift and runner.temp to SWIFT_DB, CUSTOM_DB_LOCATION in the second step.

3. __ruby.yml (line 67): Moved fromJson(steps.analysis.outputs.db-locations).ruby to env var RUBY_DB.

4. __rust.yml (line 65): Moved fromJson(steps.analysis.outputs.db-locations).rust to env var RUST_DB.

5. __swift-autobuild.yml (line 65): Moved fromJson(steps.analysis.outputs.db-locations).swift to env var SWIFT_DB.

6. __swift-custom-build.yml (line 105): Moved fromJson(steps.analysis.outputs.db-locations).swift to env var SWIFT_DB.

7. __unset-environment.yml (line 100): Moved fromJson(steps.analysis.outputs.db-locations).{cpp,csharp,go,java,javascript,python} to env vars CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB (RUNNER_TEMP is already a built-in env var so no change needed there).

8. __cleanup-db-cluster-dir.yml (lines 55, 65): Moved runner.temp to env var RUNNER_TEMP_DIR in both the 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

