<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.26.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.26.3** was hardened automatically. 11 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} are interpolated directly inside run: shell commands in the 'Update current release branch' step (line ~62) and ${{ github.repository }} in the 'Update older release branch' step (line ~97). These expressions are substituted by the template engine before the shell sees them, enabling command injection.

Locations:

- `.github/workflows/update-release-branch.yml:62`
- `.github/workflows/update-release-branch.yml:97`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are interpolated directly inside echo commands in the 'Print release information' run: block. steps.*.outputs.* is a workflow-controllable context and must not appear directly in run: scripts.

Locations:

- `.github/workflows/prepare-release.yml:55`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside a run: shell command: 'run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json'. Any ${{ ... }} expression directly inside a run: script is a script-injection finding.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside run: shell commands in two steps: 'mkdir -p "${{ runner.temp }}/customDbLocation/javascript"' and 'if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]'. Any ${{ ... }} expression directly inside a run: script is a script-injection finding.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:40`
- `.github/workflows/__cleanup-db-cluster-dir.yml:50`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, ${{ fromJson(steps.analysis.outputs.db-locations).csharp }}, and other language variants, as well as ${{ runner.temp }}, are interpolated directly inside run: shell commands in the 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps. steps.*.outputs.* and runner.* are workflow-controllable contexts.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:120`
- `.github/workflows/__multi-language-autodetect.yml:175`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are interpolated directly inside echo commands in the 'Print proxy outputs' run: block. steps.*.outputs.* is a workflow-controllable context.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command in the 'Check database' step: 'SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"'. steps.*.outputs.* is a workflow-controllable context.

Locations:

- `.github/workflows/__swift-autobuild.yml:40`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is interpolated directly inside a run: shell command in the 'Check database' step: 'RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"'. steps.*.outputs.* is a workflow-controllable context.

Locations:

- `.github/workflows/__ruby.yml:40`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).rust }} is interpolated directly inside a run: shell command in the 'Check database' step: 'RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"'. steps.*.outputs.* is a workflow-controllable context.

Locations:

- `.github/workflows/__rust.yml:40`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command in the 'Check database' step: 'SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"'. steps.*.outputs.* is a workflow-controllable context.

Locations:

- `.github/workflows/__swift-custom-build.yml:75`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, .csharp, .go, .java, .javascript, and .python are interpolated directly inside run: shell commands. steps.*.outputs.* is a workflow-controllable context that must not appear directly in run: scripts.

Locations:

- `.github/workflows/__unset-environment.yml:80`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 11 script-injection findings across 9 workflow files by moving ${{ }} expressions from run: shell scripts into step-level env: blocks. Each expression is now referenced as a plain environment variable in the shell script, preventing template-engine substitution from enabling command injection. Files modified: update-release-branch.yml, prepare-release.yml, __upload-sarif.yml, __cleanup-db-cluster-dir.yml, __multi-language-autodetect.yml, __start-proxy.yml, __swift-autobuild.yml, __ruby.yml, __rust.yml, __swift-custom-build.yml, __unset-environment.yml.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed unquoted shell variable expansions in `.github/workflows/update-release-branch.yml`:

1. **'Ensure release branch exists' step (update job)**:
   - `git checkout $RELEASE_BRANCH` → `git checkout "$RELEASE_BRANCH"`
   - `git checkout -b ${RELEASE_BRANCH} ${LATEST_TAG}` → `git checkout -b "${RELEASE_BRANCH}" "${LATEST_TAG}"`
   - `git push --set-upstream origin ${RELEASE_BRANCH}` → `git push --set-upstream origin "${RELEASE_BRANCH}"`
   - `git checkout ${REF_NAME}` → `git checkout "${REF_NAME}"`

2. **'Update older release branch' step (backport job)**:
   - `--source-branch ${SOURCE_BRANCH}` → `--source-branch "${SOURCE_BRANCH}"`
   - `--target-branch ${TARGET_BRANCH}` → `--target-branch "${TARGET_BRANCH}"`

All variables holding values from `needs.*.outputs.*`, `matrix.*`, and `github.*` contexts are now properly double-quoted to prevent shell metacharacter injection.

