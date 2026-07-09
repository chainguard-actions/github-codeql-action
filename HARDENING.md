<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **github--codeql-action/v2** was hardened automatically. 5 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ ... }} expression is directly interpolated inside a run: shell command. In codeql.yml, the step 'Print CodeQL Version' uses `run: ${{steps.init.outputs.codeql-path}} version --format=json`, which injects the steps output directly into the shell command string before the shell ever sees it.

Locations:

- `.github/workflows/codeql.yml:93`

### script-injection (severity: high)

Sub-rule (a): A ${{ ... }} expression is directly interpolated inside a run: shell command. In publish-immutable-action.yml, the step 'Check release name' uses `echo "Release name: ${{ github.event.release.name }}"` directly in the run block, injecting the github context value into the shell command string.

Locations:

- `.github/workflows/publish-immutable-action.yml:21`

### script-injection (severity: high)

Sub-rule (a): Multiple ${{ ... }} expressions are directly interpolated inside run: shell commands in update-release-branch.yml. The 'debug logging' step (prepare job) uses `echo 'version: ${{ steps.versions.outputs.version }}'` and similar lines. The 'Update current release branch' step (update job) uses `--github-token ${{ secrets.GITHUB_TOKEN }}`, `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, and `--target-branch 'releases/${{ env.MAJOR_VERSION }}'` directly in the run block. The 'Update older release branch' step (backport job) has the same pattern.

Locations:

- `.github/workflows/update-release-branch.yml:49`
- `.github/workflows/update-release-branch.yml:96`

### unpinned-uses (severity: high)

Uses references are pinned to mutable tags instead of full 40-character SHA digests. Failing references include: `actions/checkout@v4`, `actions/setup-python@v5`, `actions/setup-node@v4`, `actions/setup-go@v5`, `actions/download-artifact@v4`, `github/codeql-action/upload-sarif@v3`, and `actions/publish-immutable-action@v0.0.4` across all workflow files.

Locations:

- `.github/workflows/codeql.yml:30`
- `.github/workflows/pr-checks.yml:30`
- `.github/workflows/publish-immutable-action.yml:30`
- `.github/workflows/post-release-mergeback.yml:33`
- `.github/workflows/update-release-branch.yml:26`
- `.github/workflows/update-bundle.yml:30`
- `.github/workflows/rebuild.yml:10`
- `.github/workflows/update-dependencies.yml:12`
- `.github/workflows/update-supported-enterprise-server-versions.yml:14`
- `.github/workflows/python312-windows.yml:18`
- `.github/workflows/query-filters.yml:22`
- `.github/workflows/debug-artifacts.yml:20`
- `.github/workflows/debug-artifacts-failure.yml:20`
- `.github/workflows/check-expected-release-files.yml:14`
- `.github/workflows/codescanning-config-cli.yml:22`
- `.github/workflows/expected-queries-runs.yml:22`
- `.github/workflows/test-codeql-bundle-all.yml:22`
- `.github/workflows/__all-platform-bundle.yml:30`
- `.github/workflows/__analyze-ref-input.yml:30`
- `.github/workflows/__autobuild-action.yml:30`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:30`
- `.github/workflows/__autobuild-direct-tracing.yml:30`
- `.github/workflows/__build-mode-autobuild.yml:30`
- `.github/workflows/__build-mode-manual.yml:30`
- `.github/workflows/__build-mode-none.yml:30`
- `.github/workflows/__build-mode-rollback.yml:30`
- `.github/workflows/__cleanup-db-cluster-dir.yml:30`
- `.github/workflows/__config-export.yml:30`
- `.github/workflows/__config-input.yml:30`
- `.github/workflows/__cpp-deptrace-disabled.yml:30`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:30`
- `.github/workflows/__cpp-deptrace-enabled.yml:30`
- `.github/workflows/__diagnostics-export.yml:30`
- `.github/workflows/__export-file-baseline-information.yml:30`
- `.github/workflows/__extract-direct-to-toolcache.yml:30`
- `.github/workflows/__extractor-ram-threads.yml:30`
- `.github/workflows/__go-custom-queries.yml:30`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:30`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:30`
- `.github/workflows/__go-indirect-tracing-workaround.yml:30`
- `.github/workflows/__go-tracing-autobuilder.yml:30`
- `.github/workflows/__go-tracing-custom-build-steps.yml:30`
- `.github/workflows/__go-tracing-legacy-workflow.yml:30`
- `.github/workflows/__init-with-registries.yml:30`
- `.github/workflows/__javascript-source-root.yml:30`
- `.github/workflows/__job-run-uuid-sarif.yml:30`
- `.github/workflows/__language-aliases.yml:30`
- `.github/workflows/__multi-language-autodetect.yml:30`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:30`
- `.github/workflows/__packaging-config-inputs-js.yml:30`
- `.github/workflows/__packaging-config-js.yml:30`
- `.github/workflows/__packaging-inputs-js.yml:30`
- `.github/workflows/__remote-config.yml:30`
- `.github/workflows/__resolve-environment-action.yml:30`
- `.github/workflows/__rubocop-multi-language.yml:30`
- `.github/workflows/__ruby.yml:30`
- `.github/workflows/__split-workflow.yml:30`
- `.github/workflows/__start-proxy.yml:30`
- `.github/workflows/__submit-sarif-failure.yml:30`
- `.github/workflows/__swift-autobuild.yml:30`
- `.github/workflows/__swift-custom-build.yml:30`
- `.github/workflows/__test-autobuild-working-dir.yml:30`
- `.github/workflows/__test-local-codeql.yml:30`
- `.github/workflows/__test-proxy.yml:30`
- `.github/workflows/__unset-environment.yml:30`
- `.github/workflows/__upload-ref-sha-input.yml:30`
- `.github/workflows/__with-checkout-path.yml:30`
- `.github/workflows/__zstd-bundle-streaming.yml:30`
- `.github/workflows/__zstd-bundle.yml:30`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: block and at least one job also has no permissions: block, leaving jobs with the default (potentially broad) token permissions.

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

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses, missing-permissions

**Notes:**

Fixed all three finding types across 70+ workflow files:

1. script-injection (3 locations):
   - codeql.yml: Moved steps.init.outputs.codeql-path to CODEQL_PATH env var
   - publish-immutable-action.yml: Replaced ${{ github.event.release.name }} in echo with $RELEASE_NAME env var
   - update-release-branch.yml: Fixed debug logging step (5 outputs to env vars), 'Update current release branch' step (GITHUB_TOKEN and github.repository to env vars), and 'Update older release branch' step (same pattern)

2. unpinned-uses: Pinned all 7 action types to full SHA digests across all workflow files:
   - actions/checkout@v4 → SHA 34e114876b0b11c390a56381ad16ebd13914f8d5
   - actions/setup-python@v5 → SHA a26af69be951a213d495a4c3e4e4022e16d87065
   - actions/setup-node@v4 → SHA 49933ea5288caeca8642d1e84afbd3f7d6820020
   - actions/setup-go@v5 → SHA 40f1582b2485089dde7abd97c1529aa768e1baff
   - actions/download-artifact@v4 → SHA d3f86a106a0bac45b974a628896c90dbdf5c8093
   - github/codeql-action/upload-sarif@v3 → SHA 02c5e83432fe5497fd85b873b6c9f16a8578e1d9
   - actions/publish-immutable-action@v0.0.4 → SHA 4bc8754ffc40f27910afb20287dbbbb675a4e978

3. missing-permissions: Added top-level permissions blocks to 13 workflow files with minimum required permissions (contents: read for read-only workflows, contents: write + pull-requests: write for workflows that push commits/create PRs, contents: read + security-events: write for CodeQL workflows)

### Iteration 2

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 16 findings across 16 files:

Script injection (sub-rule a) - moved ${{ }} expressions from run: shell commands into env: blocks:
- .github/actions/prepare-test/action.yml: inputs.version and inputs.use-all-platform-bundle moved to env block
- .github/actions/release-branches/action.yml: inputs.major_version, inputs.latest_tag, github.action_path moved to env block
- .github/actions/check-codescanning-config/action.yml: runner.temp and inputs.expected-config-file-contents moved to env blocks
- .github/workflows/__multi-language-autodetect.yml: all fromJson(steps.analysis.outputs.db-locations).* moved to env block, runner.temp replaced with $RUNNER_TEMP
- .github/workflows/__unset-environment.yml: all fromJson expressions moved to env block
- .github/workflows/__ruby.yml: fromJson expression moved to env block
- .github/workflows/__swift-autobuild.yml: fromJson expression moved to env block
- .github/workflows/__swift-custom-build.yml: fromJson expression moved to env block
- .github/workflows/__start-proxy.yml: steps.proxy.outputs.* moved to env block
- .github/workflows/__cleanup-db-cluster-dir.yml: runner.temp moved to env blocks in both steps
- .github/workflows/update-dependencies.yml: github.event.pull_request.number moved to env block as PR_NUMBER

Script injection (sub-rule b) - quoted unquoted variables:
- .github/workflows/publish-immutable-action.yml: quoted $RELEASE_NAME in shell condition
- .github/workflows/update-release-branch.yml: quoted ${SOURCE_BRANCH} and ${TARGET_BRANCH} in CLI arguments

Unpinned actions - pinned all mutable tag references to full SHA:
- ruby/setup-ruby@v1 -> @d45b1a4e94b71acab930e56e79c6aa188764e7f9
- actions/upload-artifact@v4 -> @ea165f8d65b6e75b540449e92b4886f43607fa02 (in 7 files)
- actions/github-script@v7 -> @f28e40c7f34bde8b3046d885e986cb6290c5673b (in 7 files)
- actions/setup-python@v5 -> @a26af69be951a213d495a4c3e4e4022e16d87065 (in release-initialise/action.yml)

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

Fixed the github-env-injection finding in .github/workflows/post-release-mergeback.yml. In the 'Get version and new branch' step, added sanitization of the BASE_BRANCH value (which comes from the untrusted workflow_dispatch input `github.event.inputs.baseBranch`) before using it to construct NEW_BRANCH. The fix uses `safe_base_branch="$(printf '%s' "$BASE_BRANCH" | tr -d '\n\r')"` to strip newline characters, then uses `safe_base_branch` instead of `BASE_BRANCH` when constructing the NEW_BRANCH value that is written to $GITHUB_OUTPUT.

