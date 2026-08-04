<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.6

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.6** was hardened automatically. 10 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} are directly interpolated inside run: shell commands in two steps of the 'update' and 'backport' jobs. Example offending lines: `--repository-nwo ${{ github.repository }} \`, `--source-branch '${{ env.REF_NAME }}'`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}'`. These expressions are substituted by the YAML template engine before the shell ever sees them, enabling command injection.

Locations:

- `.github/workflows/update-release-branch.yml:73`
- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are directly interpolated inside echo statements in a run: shell block in the 'Print release information' step. These steps.*.outputs.* expressions flow through YAML template substitution before the shell executes them.

Locations:

- `.github/workflows/prepare-release.yml:73`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }} (and .csharp, .go, .java, .javascript, .python, .ruby, .swift) are directly interpolated unquoted inside run: shell commands in the 'Check language autodetect' steps. Example: `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`. These expressions are substituted before the shell sees them and are unquoted, enabling both template injection and word-splitting/glob expansion.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:150`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is directly interpolated inside a run: shell command in the 'Check database' step. Offending line: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`.

Locations:

- `.github/workflows/__ruby.yml:77`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).rust }} is directly interpolated inside a run: shell command in the 'Check database' step. Offending line: `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`.

Locations:

- `.github/workflows/__rust.yml:75`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is directly interpolated inside a run: shell command in the 'Check database' step. Offending line: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-autobuild.yml:73`
- `.github/workflows/__swift-custom-build.yml:105`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }} (and .csharp, .go, .java, .javascript, .python) are directly interpolated inside run: shell commands in the unnamed run: step. Example: `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`.

Locations:

- `.github/workflows/__unset-environment.yml:102`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are directly interpolated inside echo statements in a run: shell block in the 'Print proxy outputs' step. Offending lines: `echo "${{ steps.proxy.outputs.proxy_host }}"`, `echo "${{ steps.proxy.outputs.proxy_port }}"`, `echo "${{ steps.proxy.outputs.proxy_urls }}"`.

Locations:

- `.github/workflows/__start-proxy.yml:80`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is directly interpolated inside run: shell commands in the 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps. Offending lines: `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:59`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is directly interpolated inside a run: shell command in the 'Change SARIF file extension' step. Offending line: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`.

Locations:

- `.github/workflows/__upload-sarif.yml:157`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed script injection vulnerabilities across 9 workflow files:

1. **update-release-branch.yml** (lines 73, 100): Replaced `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` in run: commands with `${REPOSITORY}`, `${REF_NAME}`, and `${MAJOR_VERSION}` (already defined as job-level env vars). For the backport job, added `REPOSITORY: ${{ github.repository }}` to the step's env: block.

2. **prepare-release.yml** (line 73): Moved `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, and `${{ steps.branches.outputs.backport_target_branches }}` into the step's env: block and referenced them as `${VERSION}`, `${MAJOR_VERSION}`, etc.

3. **__multi-language-autodetect.yml** (line 150): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).xxx }}` expressions (cpp, csharp, go, java, javascript, python, ruby, swift) into env: blocks. Also replaced `${{ runner.temp }}` with `$RUNNER_TEMP` (built-in GitHub Actions env var).

4. **__ruby.yml** (line 77): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` into the step's env: block as `RUBY_DB`.

5. **__rust.yml** (line 75): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` into the step's env: block as `RUST_DB`.

6. **__swift-autobuild.yml** (line 73): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into the step's env: block as `SWIFT_DB`.

7. **__swift-custom-build.yml** (line 105): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into the step's env: block as `SWIFT_DB`.

8. **__unset-environment.yml** (line 102): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).xxx }}` expressions (cpp, csharp, go, java, javascript, python) into the step's env: block.

9. **__start-proxy.yml** (line 80): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into the step's env: block as `PROXY_HOST`, `PROXY_PORT`, `PROXY_URLS`.

10. **__cleanup-db-cluster-dir.yml** (line 59): Replaced `${{ runner.temp }}` with `$RUNNER_TEMP` (built-in GitHub Actions env var) in both the 'Add a file' and 'Validate file cleaned up' steps.

11. **__upload-sarif.yml** (line 157): Replaced `${{ runner.temp }}` with `$RUNNER_TEMP` in the 'Change SARIF file extension' step.

### Iteration 2

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed script-injection in .github/workflows/update-release-branch.yml by double-quoting all shell variables derived from workflow-controllable contexts (RELEASE_BRANCH, LATEST_TAG, REF_NAME, SOURCE_BRANCH, TARGET_BRANCH) in git commands and npx arguments, and fixed unquoted echo arguments. Fixed github-env-injection in .github/actions/prepare-test/action.yml by sanitizing the $version variable (derived from inputs.version) with `printf '%s' ... | tr -d '\n\r'` before writing to $GITHUB_OUTPUT in both the nightly and stable branches, and also sanitizing $artifact_name for defense in depth.

