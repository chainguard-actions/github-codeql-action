<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v2** was hardened automatically. 44 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expression interpolated inside a run: shell command. In publish-immutable-action.yml, `echo "Release name: ${{ github.event.release.name }}"` interpolates a GitHub context value directly into the shell command before the shell sees it.

Locations:

- `.github/workflows/publish-immutable-action.yml:18`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expression interpolated inside a run: shell command. In codeql.yml, `run: ${{steps.init.outputs.codeql-path}} version --format=json` uses a step output expression directly as the shell command to execute.

Locations:

- `.github/workflows/codeql.yml:68`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expressions interpolated inside run: shell commands in the 'debug logging' step. Lines like `echo 'version: ${{ steps.versions.outputs.version }}'`, `echo 'major_version: ${{ steps.versions.outputs.major_version }}'`, etc. interpolate step outputs directly into shell commands.

Locations:

- `.github/workflows/update-release-branch.yml:47`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expressions interpolated inside run: shell commands in the 'Update current release branch' step. Expressions `${{ secrets.GITHUB_TOKEN }}`, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` are interpolated directly into the python command arguments.

Locations:

- `.github/workflows/update-release-branch.yml:83`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expressions interpolated inside run: shell commands in the 'Update older release branch' step. Expressions `${{ secrets.GITHUB_TOKEN }}` and `${{ github.repository }}` are interpolated directly into the python command arguments.

Locations:

- `.github/workflows/update-release-branch.yml:118`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ }} expression interpolated inside run: shell commands. `gh pr comment --body-file - --repo github/codeql-action "${{ github.event.pull_request.number }}"` and `gh pr ready --undo --repo github/codeql-action "${{ github.event.pull_request.number }}"` interpolate attacker-controlled PR number directly into shell commands.

Locations:

- `.github/workflows/update-dependencies.yml:38`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ runner.temp }} expressions interpolated inside run: shell commands. `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `touch "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt"` and `if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]` interpolate expressions directly into shell commands.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:44`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ fromJson(...) }} expression interpolated inside a run: shell command. `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"` interpolates a step output expression directly into the shell command.

Locations:

- `.github/workflows/__ruby.yml:56`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ steps.proxy.outputs.* }} expressions interpolated inside run: shell commands. `echo "${{ steps.proxy.outputs.proxy_host }}"`, `echo "${{ steps.proxy.outputs.proxy_port }}"`, and `echo "${{ steps.proxy.outputs.proxy_urls }}"` interpolate step output expressions directly into shell commands.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ fromJson(...) }} expression interpolated inside a run: shell command. `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"` interpolates a step output expression directly into the shell command.

Locations:

- `.github/workflows/__swift-autobuild.yml:57`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ fromJson(...) }} expression interpolated inside a run: shell command. `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"` interpolates a step output expression directly into the shell command.

Locations:

- `.github/workflows/__swift-custom-build.yml:60`

### script-injection (severity: high)

Sub-rule (a): Direct ${{ fromJson(...) }} expression interpolated inside a run: shell command. `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"` interpolates a step output expression directly into the shell command.

Locations:

- `.github/workflows/__unset-environment.yml:60`

### script-injection (severity: high)

Sub-rule (a) and (b): Direct ${{ fromJson(...) }} and ${{ runner.temp }} expressions interpolated unquoted inside run: shell commands. `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`, `${{ runner.temp }}/customDbLocation/*`, `CSHARP_DB=${{ fromJson(...).csharp }}`, `SWIFT_DB=${{ fromJson(...).swift }}` etc. are interpolated directly and unquoted into shell commands.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:88`
- `.github/workflows/__multi-language-autodetect.yml:152`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/publish-immutable-action@v0.0.4`.

Locations:

- `.github/workflows/publish-immutable-action.yml:22`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/check-expected-release-files.yml:15`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-go@v5`, `actions/download-artifact@v4`.

Locations:

- `.github/workflows/debug-artifacts.yml:37`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-go@v5`, `actions/download-artifact@v4`.

Locations:

- `.github/workflows/debug-artifacts-failure.yml:30`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-python@v5`, `github/codeql-action/upload-sarif@v3`.

Locations:

- `.github/workflows/pr-checks.yml:21`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`.

Locations:

- `.github/workflows/python312-windows.yml:20`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/query-filters.yml:22`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-python@v5`.

Locations:

- `.github/workflows/rebuild.yml:14`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/update-bundle.yml:26`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/update-dependencies.yml:12`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-node@v4`.

Locations:

- `.github/workflows/update-release-branch.yml:29`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:12`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`, `actions/setup-node@v4`.

Locations:

- `.github/workflows/post-release-mergeback.yml:36`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/codeql.yml:26`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/codescanning-config-cli.yml:33`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/expected-queries-runs.yml:22`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/test-codeql-bundle-all.yml:26`

### unpinned-uses (severity: high)

Uses references pinned to mutable tags instead of full 40-character commit SHAs. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`, `actions/github-script@v7`.

Locations:

- `.github/workflows/__all-platform-bundle.yml:28`
- `.github/workflows/__analyze-ref-input.yml:28`
- `.github/workflows/__autobuild-action.yml:28`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:28`
- `.github/workflows/__autobuild-direct-tracing.yml:28`
- `.github/workflows/__build-mode-autobuild.yml:28`
- `.github/workflows/__build-mode-manual.yml:28`
- `.github/workflows/__build-mode-none.yml:28`
- `.github/workflows/__build-mode-rollback.yml:28`
- `.github/workflows/__cleanup-db-cluster-dir.yml:28`
- `.github/workflows/__config-export.yml:28`
- `.github/workflows/__config-input.yml:28`
- `.github/workflows/__cpp-deptrace-disabled.yml:28`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:28`
- `.github/workflows/__cpp-deptrace-enabled.yml:28`
- `.github/workflows/__diagnostics-export.yml:28`
- `.github/workflows/__export-file-baseline-information.yml:28`
- `.github/workflows/__extract-direct-to-toolcache.yml:28`
- `.github/workflows/__extractor-ram-threads.yml:28`
- `.github/workflows/__go-custom-queries.yml:28`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:28`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:28`
- `.github/workflows/__go-indirect-tracing-workaround.yml:28`
- `.github/workflows/__go-tracing-autobuilder.yml:28`
- `.github/workflows/__go-tracing-custom-build-steps.yml:28`
- `.github/workflows/__go-tracing-legacy-workflow.yml:28`
- `.github/workflows/__init-with-registries.yml:28`
- `.github/workflows/__javascript-source-root.yml:28`
- `.github/workflows/__job-run-uuid-sarif.yml:28`
- `.github/workflows/__language-aliases.yml:28`
- `.github/workflows/__multi-language-autodetect.yml:28`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:28`
- `.github/workflows/__packaging-config-inputs-js.yml:28`
- `.github/workflows/__packaging-config-js.yml:28`
- `.github/workflows/__packaging-inputs-js.yml:28`
- `.github/workflows/__remote-config.yml:28`
- `.github/workflows/__resolve-environment-action.yml:28`
- `.github/workflows/__rubocop-multi-language.yml:28`
- `.github/workflows/__ruby.yml:28`
- `.github/workflows/__split-workflow.yml:28`
- `.github/workflows/__start-proxy.yml:28`
- `.github/workflows/__submit-sarif-failure.yml:28`
- `.github/workflows/__swift-autobuild.yml:28`
- `.github/workflows/__swift-custom-build.yml:28`
- `.github/workflows/__test-autobuild-working-dir.yml:28`
- `.github/workflows/__test-local-codeql.yml:28`
- `.github/workflows/__test-proxy.yml:28`
- `.github/workflows/__unset-environment.yml:28`
- `.github/workflows/__upload-ref-sha-input.yml:28`
- `.github/workflows/__with-checkout-path.yml:28`
- `.github/workflows/__zstd-bundle-streaming.yml:28`
- `.github/workflows/__zstd-bundle.yml:28`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and at least one job also has no permissions: key. The single job 'check-expected-release-files' has no permissions defined.

Locations:

- `.github/workflows/check-expected-release-files.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'rebuild' has no permissions: key.

Locations:

- `.github/workflows/rebuild.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'update-bundle' has no permissions: key.

Locations:

- `.github/workflows/update-bundle.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'merge-back' has no permissions: key.

Locations:

- `.github/workflows/post-release-mergeback.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and none of the jobs (prepare, update, backport) have a permissions: key.

Locations:

- `.github/workflows/update-release-branch.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'update' has no permissions: key.

Locations:

- `.github/workflows/update-dependencies.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'update-supported-enterprise-server-versions' has no permissions: key.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and neither job (upload-artifacts, download-and-check-artifacts) has a permissions: key.

Locations:

- `.github/workflows/debug-artifacts.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and neither job (upload-artifacts, download-and-check-artifacts) has a permissions: key.

Locations:

- `.github/workflows/debug-artifacts-failure.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'test-setup-python-scripts' has no permissions: key.

Locations:

- `.github/workflows/python312-windows.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'query-filters' has no permissions: key.

Locations:

- `.github/workflows/query-filters.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and the single job 'code-scanning-config-tests' has no permissions: key.

Locations:

- `.github/workflows/codescanning-config-cli.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions: key and not all jobs have permissions: key. Jobs 'check-node-modules', 'check-file-contents', 'npm-test', and 'check-node-version' have no permissions defined (only 'check-js' has permissions).

Locations:

- `.github/workflows/pr-checks.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses, missing-permissions

**Notes:**

Fixed all 13 script-injection findings by moving ${{ }} expressions from run: shell commands into env: blocks. Fixed all unpinned-uses findings across 50+ workflow files by pinning actions/checkout@v4, actions/setup-python@v5, actions/setup-go@v5, actions/setup-node@v4, actions/github-script@v7, actions/download-artifact@v4, actions/publish-immutable-action@v0.0.4, and github/codeql-action/upload-sarif@v3 to full commit SHAs. Added missing permissions blocks to 13 workflow files with appropriate minimum permissions (contents:read for read-only workflows, contents:write+pull-requests:write for workflows that push commits or create PRs, security-events:write for workflows that upload SARIF). For fromJson() expressions in run: blocks, used jq to parse the JSON from an env variable instead of interpolating the expression directly.

### Iteration 2

**Fixes applied:** unpinned-uses, github-env-injection

**Notes:**

Fixed 7 unpinned 'uses:' references: pinned actions/upload-artifact@v4 to SHA ea165f8d65b6e75b540449e92b4886f43607fa02 in 6 workflow files, and ruby/setup-ruby@v1 to SHA 003a5c4d8d6321bd302e38f6f0ec593f77f06600 in __rubocop-multi-language.yml. Fixed github-env-injection in post-release-mergeback.yml by moving the github.event.inputs.baseBranch expression into a step-level env block and sanitizing both the base branch input and the resulting NEW_BRANCH value with 'printf | tr -d \n\r' before writing to $GITHUB_OUTPUT.

