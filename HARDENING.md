<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.35.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.35.1** was hardened automatically. 6 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): ${{ }} expressions are directly interpolated inside run: shell command strings. In prepare-release.yml, the 'Print release information' step interpolates steps.*.outputs.* context values directly: `echo 'version: ${{ steps.versions.outputs.version }}'`, `echo 'major_version: ${{ steps.versions.outputs.major_version }}'`, `echo 'latest_tag: ${{ steps.versions.outputs.latest_tag }}'`, `echo 'backport_source_branch: ${{ steps.branches.outputs.backport_source_branch }}'`, `echo 'backport_target_branches: ${{ steps.branches.outputs.backport_target_branches }}'`. These values flow through YAML template substitution before the shell sees them.

Locations:

- `.github/workflows/prepare-release.yml:69`

### script-injection (severity: high)

Rule (a): ${{ }} expressions are directly interpolated inside run: shell command strings. In update-release-branch.yml, the 'Update current release branch' step uses `--github-token ${{ secrets.GITHUB_TOKEN }}`, `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}'` directly in the run: block. Rule (b): The 'Update older release branch' step uses unquoted shell variable expansions `--source-branch ${SOURCE_BRANCH}` and `--target-branch ${TARGET_BRANCH}` where SOURCE_BRANCH is sourced from needs.prepare.outputs.backport_source_branch and TARGET_BRANCH from matrix.target_branch.

Locations:

- `.github/workflows/update-release-branch.yml:60`
- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Rule (a): ${{ runner.temp }} is directly interpolated inside a run: shell command string. The 'Change SARIF file extension' step uses: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ ... }} expression directly inside a run: block is a script-injection finding regardless of which context it reads from.

Locations:

- `.github/workflows/__upload-sarif.yml:130`

### github-env-injection (severity: high)

The 'Get version and new branch' step in post-release-mergeback.yml writes `echo "newBranch=${NEW_BRANCH}" >> $GITHUB_OUTPUT` where NEW_BRANCH is constructed as `"mergeback/${VERSION}-to-${BASE_BRANCH}-${short_sha}"`. BASE_BRANCH is set from `${{ github.event.inputs.baseBranch || 'main' }}` (a github.* context value). This value is written to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`).

Locations:

- `.github/workflows/post-release-mergeback.yml:55`

### github-env-injection (severity: high)

The 'Prepare mergeback branch' step in rollback-release.yml writes `echo "new-branch=${NEW_BRANCH}" >> $GITHUB_OUTPUT` where NEW_BRANCH is constructed as `"mergeback/${VERSION}-to-${BASE_BRANCH}-${short_sha}"`. BASE_BRANCH is set from `${{ (github.event_name == 'workflow_dispatch' && 'main') || github.ref_name }}` (a github.* context value) and VERSION from `${{ needs.prepare.outputs.version }}` (a needs.*.outputs.* context). These values are written to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`).

Locations:

- `.github/workflows/rollback-release.yml:75`

### unpinned-uses (severity: high)

Multiple workflow files use external actions pinned to mutable version tags instead of immutable 40-character SHA digests. Failing references include: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/setup-dotnet@v5, actions/setup-go@v6, actions/download-artifact@v8, actions/create-github-app-token@v3.0.0, actions/publish-immutable-action@v0.0.4, github/codeql-action/upload-sarif@v4. These tag-based references can be silently redirected to malicious code if the upstream repository is compromised.

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

Fixed all 5 findings across multiple workflow files:

1. script-injection (prepare-release.yml): Moved steps.*.outputs.* expressions to env block.

2. script-injection (update-release-branch.yml): Moved secrets.GITHUB_TOKEN and github.repository to env blocks; quoted shell variable expansions for SOURCE_BRANCH and TARGET_BRANCH.

3. script-injection (__upload-sarif.yml): Moved runner.temp to env block (RUNNER_TEMP_DIR).

4. github-env-injection (post-release-mergeback.yml): Added printf/tr sanitization before writing to GITHUB_OUTPUT.

5. github-env-injection (rollback-release.yml): Added printf/tr sanitization before writing new-branch to GITHUB_OUTPUT.

6. unpinned-uses: Pinned all 9 specified action types across ~75 workflow files to full SHA digests: actions/checkout@v6→d23441a4, actions/setup-node@v6→24997072, actions/setup-python@v6→ece7cb06, actions/setup-dotnet@v5→26b0ec14, actions/setup-go@v6→924ae3a1, actions/download-artifact@v8→3e5f45b2, actions/create-github-app-token@v3.0.0→f8d387b6, actions/publish-immutable-action@v0.0.4→4bc8754f, github/codeql-action/upload-sarif@v4→ff2f1c62. Several files required full rewrites due to corruption from sequential replace_all operations.

### Iteration 2

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 3 script-injection findings by moving ${{ }} expressions from run: blocks into env: blocks and referencing them as plain environment variables. Fixed all unpinned-uses findings by pinning: actions/upload-artifact@v7 → SHA 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/github-script@v8 → SHA ed597411d8f924073f98dfc5c65a23a2325f34cd, actions/setup-java@v5 → SHA b6effb05e454b25005698d916606bdc6ffcbf961, actions/setup-node@v6 → SHA 249970729cb0ef3589644e2896645e5dc5ba9c38, actions/setup-python@v6 → SHA ece7cb06caefa5fff74198d8649806c4678c61a1. All 16 files were updated across the 3 script-injection findings and 13 unpinned-uses findings.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed all 6 script-injection findings across 6 workflow files:

1. __ruby.yml (line 81): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to step env: block as DB_LOCATION_RUBY; used "$DB_LOCATION_RUBY" (quoted) in run:.

2. __rust.yml (line 79): Same pattern for rust → DB_LOCATION_RUST.

3. __swift-autobuild.yml (line 77): Same pattern for swift → DB_LOCATION_SWIFT.

4. __swift-custom-build.yml (line 100): Same pattern for swift → DB_LOCATION_SWIFT.

5. __unset-environment.yml (line 106): Moved all 6 fromJson expressions (cpp, csharp, go, java, javascript, python) from run: block to step env: block as DB_LOCATION_* vars; used all quoted in run:.

6. __multi-language-autodetect.yml (line 152): The env: block was already correct (sub-rule b finding), but all 8 env vars (CPP, CSHARP, GO, JAVA, JAVASCRIPT, PYTHON, RUBY, SWIFT) were used unquoted in run:. Added double-quotes around all variable expansions in both the main check step and the Swift-specific step.

