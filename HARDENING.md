<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.26.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.26.2** was hardened automatically. 12 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Change SARIF file extension' uses `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` — the ${{ runner.temp }} expression is interpolated directly into the shell command string before the shell sees it.

Locations:

- `.github/workflows/__upload-sarif.yml:152`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check language autodetect for all languages excluding Swift' uses `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` and similar expressions (CSHARP_DB, GO_DB, JAVA_DB) directly inside the run: shell script. The ${{ steps.*.outputs.* }} values are interpolated before the shell executes the script.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:127`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check language autodetect for Swift' uses `SWIFT_DB=${{ fromJson(steps.analysis.outputs.db-locations).swift }}` directly inside the run: shell script.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:183`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step uses `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"` and similar expressions (CSHARP_DB, etc.) directly inside the run: shell script. The ${{ steps.*.outputs.* }} values are interpolated before the shell executes the script.

Locations:

- `.github/workflows/__unset-environment.yml:82`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Create cluster directory' uses `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `touch "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt"` directly in the run: shell script. A second step 'Validate file cleaned up' also uses `${{ runner.temp }}` directly in the run: block.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:41`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Print proxy outputs' uses `echo "${{ steps.proxy.outputs.proxy_host }}"`, `echo "${{ steps.proxy.outputs.proxy_port }}"`, and `echo "${{ steps.proxy.outputs.proxy_urls }}"` directly inside the run: shell script.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check database' uses `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"` directly inside the run: shell script.

Locations:

- `.github/workflows/__ruby.yml:53`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check database' uses `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"` directly inside the run: shell script.

Locations:

- `.github/workflows/__rust.yml:52`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check database' uses `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"` directly inside the run: shell script.

Locations:

- `.github/workflows/__swift-autobuild.yml:51`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Check database' uses `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"` directly inside the run: shell script.

Locations:

- `.github/workflows/__swift-custom-build.yml:82`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Update current release branch' uses `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, and `--target-branch 'releases/${{ env.MAJOR_VERSION }}'` directly inside the run: shell script. A second step in the backport job also uses `--repository-nwo ${{ github.repository }}` directly in the run: block.

Locations:

- `.github/workflows/update-release-branch.yml:62`
- `.github/workflows/update-release-branch.yml:107`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation in run: blocks. The step 'Print release information' uses `echo 'version: ${{ steps.versions.outputs.version }}'`, `echo 'major_version: ${{ steps.versions.outputs.major_version }}'`, `echo 'latest_tag: ${{ steps.versions.outputs.latest_tag }}'`, `echo 'backport_source_branch: ${{ steps.branches.outputs.backport_source_branch }}'`, and `echo 'backport_target_branches: ${{ steps.branches.outputs.backport_target_branches }}'` directly inside the run: shell script.

Locations:

- `.github/workflows/prepare-release.yml:68`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed 12 script-injection findings across 10 workflow files by moving ${{ }} expression interpolation out of run: blocks and into step-level env: blocks:

1. __upload-sarif.yml (line 152): Moved `${{ runner.temp }}` to env var RUNNER_TEMP_DIR in 'Change SARIF file extension' step.

2. __multi-language-autodetect.yml (line 127): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` and `${{ runner.temp }}` expressions to env vars (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, RUNNER_TEMP_DIR) in 'Check language autodetect for all languages excluding Swift' step.

3. __multi-language-autodetect.yml (line 183): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` and `${{ runner.temp }}` to env vars (SWIFT_DB, RUNNER_TEMP_DIR) in 'Check language autodetect for Swift on macOS' step.

4. __unset-environment.yml (line 82): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions to env vars (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB) in the unnamed run step.

5. __cleanup-db-cluster-dir.yml (line 41): Moved `${{ runner.temp }}` to env var RUNNER_TEMP_DIR in both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

6. __start-proxy.yml (line 55): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` to env vars (PROXY_HOST, PROXY_PORT, PROXY_URLS) in 'Print proxy outputs' step.

7. __ruby.yml (line 53): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to env var RUBY_DB in 'Check database' step.

8. __rust.yml (line 52): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` to env var RUST_DB in 'Check database' step.

9. __swift-autobuild.yml (line 51): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to env var SWIFT_DB in 'Check database' step.

10. __swift-custom-build.yml (line 82): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to env var SWIFT_DB in 'Check database' step.

11. update-release-branch.yml (line 62): Moved `${{ github.repository }}` to env var REPOSITORY_NWO in 'Update current release branch' step; also replaced `'${{ env.REF_NAME }}'` and `'releases/${{ env.MAJOR_VERSION }}'` with `"$REF_NAME"` and `"releases/$MAJOR_VERSION"` (already safe as job-level env vars).

12. update-release-branch.yml (line 107): Moved `${{ github.repository }}` to env var REPOSITORY_NWO in 'Update older release branch' step.

13. prepare-release.yml (line 68): Moved all `${{ steps.versions.outputs.* }}` and `${{ steps.branches.outputs.* }}` expressions to env vars (VERSION, MAJOR_VERSION, LATEST_TAG, BACKPORT_SOURCE_BRANCH, BACKPORT_TARGET_BRANCHES) in 'Print release information' step.

### Iteration 2

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed all 6 findings across 4 files:

1. update-release-branch.yml: Quoted all unquoted variable expansions in 'Ensure release branch exists' (git checkout, git checkout -b, git push, git checkout), 'Update current release branch' (echo statements), and 'Update older release branch' (echo statements).

2. rollback-release.yml (script-injection): Quoted `cat $NEW_CHANGELOG`, `cat $PARTIAL_CHANGELOG`, and `mv ${NEW_CHANGELOG} CHANGELOG.md`.

3. rollback-release.yml (github-env-injection): Sanitized NEW_BRANCH with `printf '%s' ... | tr -d '\n\r'` before writing `new-branch` to $GITHUB_OUTPUT to prevent newline injection from github.ref_name.

4. post-release-mergeback.yml (script-injection): Quoted `cat $PARTIAL_CHANGELOG`.

5. post-release-mergeback.yml (github-env-injection): Sanitized NEW_BRANCH with `printf '%s' ... | tr -d '\n\r'` before writing `newBranch` to $GITHUB_OUTPUT to prevent newline injection from github.event.inputs.baseBranch. Also quoted other $GITHUB_OUTPUT writes.

6. prepare-test/action.yml (github-env-injection): Sanitized tools_url with `printf '%s' ... | tr -d '\n\r'` before writing `tools-url` to $GITHUB_OUTPUT for both nightly and stable branches to prevent newline injection from inputs.version.

