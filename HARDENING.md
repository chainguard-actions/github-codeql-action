<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.25.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.25.1** was hardened automatically. 5 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): ${{ }} expressions are interpolated directly inside run: shell command strings. In prepare-release.yml, the 'Print release information' step uses ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} directly inside echo commands in a run: block. These step outputs could contain attacker-controlled content.

Locations:

- `.github/workflows/prepare-release.yml:69`

### script-injection (severity: high)

Rule (a): ${{ }} expressions are interpolated directly inside run: shell command strings. In update-release-branch.yml, the 'Update current release branch' step uses ${{ secrets.GITHUB_TOKEN }}, ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} directly as CLI arguments in a run: block. The 'Update older release branch' step in the backport job similarly uses ${{ secrets.GITHUB_TOKEN }} and ${{ github.repository }} directly in a run: block. Any of these values flowing through YAML template substitution before the shell processes them is a script-injection risk.

Locations:

- `.github/workflows/update-release-branch.yml:60`
- `.github/workflows/update-release-branch.yml:99`

### script-injection (severity: high)

Rule (a): ${{ runner.temp }} is interpolated directly inside a run: shell command string. In __upload-sarif.yml, the 'Change SARIF file extension' step uses 'run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json'. Any ${{ ... }} expression directly in a run: block is a script-injection finding regardless of which context it reads from.

Locations:

- `.github/workflows/__upload-sarif.yml:152`

### script-injection (severity: high)

Rule (a): ${{ steps.proxy.outputs.* }} expressions are interpolated directly inside run: shell command strings. In __start-proxy.yml, the 'Print proxy outputs' step uses echo "${{ steps.proxy.outputs.proxy_host }}", echo "${{ steps.proxy.outputs.proxy_port }}", and echo "${{ steps.proxy.outputs.proxy_urls }}" directly in a run: block. Step outputs are workflow-controllable and must not be interpolated directly into shell commands.

Locations:

- `.github/workflows/__start-proxy.yml:57`

### unpinned-uses (severity: high)

Multiple workflow files and composite actions reference external actions using mutable version tags (e.g. @v6, @v5, @v4, @v3.0.0, @v0.0.4, @v8) instead of immutable full 40-character SHA commit hashes. Failing references include: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8, actions/create-github-app-token@v3.0.0, actions/publish-immutable-action@v0.0.4, github/codeql-action/upload-sarif@v4. These mutable tags can be silently updated to point to malicious code.

Locations:

- `.github/workflows/__all-platform-bundle.yml:56`
- `.github/workflows/__analysis-kinds.yml:55`
- `.github/workflows/__analyze-ref-input.yml:55`
- `.github/workflows/__autobuild-action.yml:47`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:52`
- `.github/workflows/__autobuild-working-dir.yml:37`
- `.github/workflows/__build-mode-autobuild.yml:50`
- `.github/workflows/__build-mode-manual.yml:53`
- `.github/workflows/__build-mode-none.yml:38`
- `.github/workflows/__build-mode-rollback.yml:37`
- `.github/workflows/__bundle-from-nightly.yml:37`
- `.github/workflows/__bundle-from-toolcache.yml:38`
- `.github/workflows/__bundle-toolcache.yml:41`
- `.github/workflows/__bundle-zstd.yml:41`
- `.github/workflows/__cleanup-db-cluster-dir.yml:38`
- `.github/workflows/__config-export.yml:38`
- `.github/workflows/__config-input.yml:36`
- `.github/workflows/__cpp-deptrace-disabled.yml:40`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:39`
- `.github/workflows/__cpp-deptrace-enabled.yml:40`
- `.github/workflows/__diagnostics-export.yml:38`
- `.github/workflows/__export-file-baseline-information.yml:58`
- `.github/workflows/__extractor-ram-threads.yml:38`
- `.github/workflows/__global-proxy.yml:38`
- `.github/workflows/__go-custom-queries.yml:55`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:48`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:48`
- `.github/workflows/__go-indirect-tracing-workaround.yml:46`
- `.github/workflows/__go-tracing-autobuilder.yml:62`
- `.github/workflows/__go-tracing-custom-build-steps.yml:63`
- `.github/workflows/__go-tracing-legacy-workflow.yml:62`
- `.github/workflows/__init-with-registries.yml:41`
- `.github/workflows/__javascript-source-root.yml:40`
- `.github/workflows/__job-run-uuid-sarif.yml:38`
- `.github/workflows/__language-aliases.yml:37`
- `.github/workflows/__local-bundle.yml:54`
- `.github/workflows/__multi-language-autodetect.yml:82`
- `.github/workflows/__overlay-init-fallback.yml:39`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:60`
- `.github/workflows/__packaging-config-inputs-js.yml:58`
- `.github/workflows/__packaging-config-js.yml:57`
- `.github/workflows/__packaging-inputs-js.yml:57`
- `.github/workflows/__remote-config.yml:55`
- `.github/workflows/__resolve-environment-action.yml:41`
- `.github/workflows/__rubocop-multi-language.yml:37`
- `.github/workflows/__ruby.yml:43`
- `.github/workflows/__rust.yml:41`
- `.github/workflows/__split-workflow.yml:62`
- `.github/workflows/__start-proxy.yml:38`
- `.github/workflows/__submit-sarif-failure.yml:40`
- `.github/workflows/__swift-autobuild.yml:38`
- `.github/workflows/__swift-custom-build.yml:59`
- `.github/workflows/__unset-environment.yml:56`
- `.github/workflows/__upload-ref-sha-input.yml:55`
- `.github/workflows/__upload-sarif.yml:62`
- `.github/workflows/__with-checkout-path.yml:57`
- `.github/workflows/check-expected-release-files.yml:18`
- `.github/workflows/codeql.yml:27`
- `.github/workflows/codescanning-config-cli.yml:50`
- `.github/workflows/debug-artifacts-failure-safe.yml:40`
- `.github/workflows/debug-artifacts-safe.yml:37`
- `.github/workflows/post-release-mergeback.yml:34`
- `.github/workflows/pr-checks.yml:27`
- `.github/workflows/prepare-release.yml:44`
- `.github/workflows/publish-immutable-action.yml:18`
- `.github/workflows/python312-windows.yml:29`
- `.github/workflows/query-filters.yml:26`
- `.github/workflows/rebuild.yml:22`
- `.github/workflows/rollback-release.yml:49`
- `.github/workflows/test-codeql-bundle-all.yml:29`
- `.github/workflows/update-bundle.yml:34`
- `.github/workflows/update-release-branch.yml:38`
- `.github/workflows/update-supported-enterprise-server-versions.yml:23`
- `.github/actions/release-initialise/action.yml:16`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 4 script-injection findings by moving ${{ }} expressions to env: blocks in prepare-release.yml, update-release-branch.yml, __upload-sarif.yml, and __start-proxy.yml. Fixed all unpinned-uses findings across 77+ workflow files and the release-initialise composite action by pinning all external action references to full 40-character SHA commit hashes: actions/checkout@v6→d23441a48e516b6c34aea4fa41551a30e30af803, actions/setup-node@v6→249970729cb0ef3589644e2896645e5dc5ba9c38, actions/setup-python@v6→ece7cb06caefa5fff74198d8649806c4678c61a1, actions/setup-go@v6→924ae3a1cded613372ab5595356fb5720e22ba16, actions/setup-dotnet@v5→26b0ec14cb23fa6904739307f278c14f94c95bf1, actions/setup-java@v5→b6effb05e454b25005698d916606bdc6ffcbf961, actions/download-artifact@v8→3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c, actions/upload-artifact@v7→043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/github-script@v8→ed597411d8f924073f98dfc5c65a23a2325f34cd, actions/create-github-app-token@v3.0.0→f8d387b68d61c58ab83c6c016672934102569859, actions/publish-immutable-action@v0.0.4→4bc8754ffc40f27910afb20287dbbbb675a4e978, github/codeql-action/upload-sarif@v4→ff2f1c621b7f889edc0d3c761ac2e6a3f8cdb0dd.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed all 7 script-injection findings across 6 workflow files by moving ${{ }} template expressions out of run: shell commands and into step-level env: blocks:

1. __cleanup-db-cluster-dir.yml: Replaced ${{ runner.temp }} with $RUNNER_TEMP in 'Add a file to the database cluster directory' and 'Validate file cleaned up' run steps.

2. __multi-language-autodetect.yml: Added env: blocks with all db-location variables (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, SWIFT_DB) for both check steps. Replaced ${{ runner.temp }} with $RUNNER_TEMP in shell glob comparisons.

3. __ruby.yml: Moved ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} to env: block as RUBY_DB.

4. __rust.yml: Moved ${{ fromJson(steps.analysis.outputs.db-locations).rust }} to env: block as RUST_DB.

5. __swift-autobuild.yml: Moved ${{ fromJson(steps.analysis.outputs.db-locations).swift }} to env: block as SWIFT_DB.

6. __swift-custom-build.yml: Moved ${{ fromJson(steps.analysis.outputs.db-locations).swift }} to env: block as SWIFT_DB.

7. __unset-environment.yml: Moved all six fromJson db-location expressions to env: block (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB).

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed all unquoted shell variable expansions in .github/workflows/update-release-branch.yml. Added double quotes around: $RELEASE_BRANCH in git checkout, ${RELEASE_BRANCH} and ${LATEST_TAG} in git checkout -b, ${RELEASE_BRANCH} in git push, ${REF_NAME} in git checkout, ${GITHUB_ACTOR} in --conductor flag (both update and backport jobs), ${SOURCE_BRANCH} in echo and --source-branch, ${TARGET_BRANCH} in echo and --target-branch. Also fixed the echo statements in the backport job to properly quote the entire string to prevent metacharacter interpretation.

