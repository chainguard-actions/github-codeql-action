<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.4

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.4** was hardened automatically. 10 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violation: ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} are directly interpolated inside run: shell command strings. In the 'Update current release branch' step: `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}'`. In the 'Update older release branch' step: `--repository-nwo ${{ github.repository }}`. These expressions flow through YAML template substitution before the shell parses them, enabling injection of shell metacharacters.

Locations:

- `.github/workflows/update-release-branch.yml:73`
- `.github/workflows/update-release-branch.yml:74`
- `.github/workflows/update-release-branch.yml:75`
- `.github/workflows/update-release-branch.yml:108`

### script-injection (severity: high)

Rule (a) violation: ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are directly interpolated inside a run: shell command string in the 'Print release information' step. steps.*.outputs.* is an untrusted-input source that flows through YAML template substitution before the shell parses it.

Locations:

- `.github/workflows/prepare-release.yml:67`
- `.github/workflows/prepare-release.yml:68`
- `.github/workflows/prepare-release.yml:69`
- `.github/workflows/prepare-release.yml:70`
- `.github/workflows/prepare-release.yml:71`

### script-injection (severity: high)

Rule (a) violation: ${{ runner.temp }} is directly interpolated inside run: shell command strings in two steps: 'Add a file to the database cluster directory' (`mkdir -p "${{ runner.temp }}/customDbLocation/javascript"`) and 'Validate file cleaned up' (`if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`). runner.* expressions flow through YAML template substitution before the shell parses them.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:48`
- `.github/workflows/__cleanup-db-cluster-dir.yml:57`

### script-injection (severity: high)

Rule (a) violation: ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is directly interpolated inside a run: shell command string in the 'Check database' step: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`). steps.*.outputs.* is an untrusted-input source.

Locations:

- `.github/workflows/__ruby.yml:60`

### script-injection (severity: high)

Rule (a) violation: ${{ fromJson(steps.analysis.outputs.db-locations).rust }} is directly interpolated inside a run: shell command string in the 'Check database' step: `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`). steps.*.outputs.* is an untrusted-input source.

Locations:

- `.github/workflows/__rust.yml:59`

### script-injection (severity: high)

Rule (a) violation: ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are directly interpolated inside run: shell command strings in the 'Print proxy outputs' step. steps.*.outputs.* is an untrusted-input source that flows through YAML template substitution before the shell parses it.

Locations:

- `.github/workflows/__start-proxy.yml:64`
- `.github/workflows/__start-proxy.yml:65`
- `.github/workflows/__start-proxy.yml:66`

### script-injection (severity: high)

Rule (a) violation: ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is directly interpolated inside a run: shell command string in the 'Check database' step: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`). steps.*.outputs.* is an untrusted-input source.

Locations:

- `.github/workflows/__swift-autobuild.yml:62`

### script-injection (severity: high)

Rule (a) violation: ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is directly interpolated inside a run: shell command string in the 'Check database' step: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`). steps.*.outputs.* is an untrusted-input source.

Locations:

- `.github/workflows/__swift-custom-build.yml:75`

### script-injection (severity: high)

Rule (a) violation: Multiple ${{ fromJson(steps.analysis.outputs.db-locations).LANG }} and ${{ runner.temp }} expressions are directly interpolated inside run: shell command strings in two 'Check language autodetect' steps. For example: `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`, `[[ ! $CPP_DB == ${{ runner.temp }}/customDbLocation/* ]]`, and similar for csharp, go, java, javascript, python, ruby, and swift. steps.*.outputs.* and runner.* are untrusted-input sources.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:109`
- `.github/workflows/__multi-language-autodetect.yml:145`

### script-injection (severity: high)

Rule (a) violation: Multiple ${{ fromJson(steps.analysis.outputs.db-locations).LANG }} expressions are directly interpolated inside a run: shell command string in the 'Check databases' step. For example: `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`, `CSHARP_DB="${{ fromJson(steps.analysis.outputs.db-locations).csharp }}"`, `GO_DB="${{ fromJson(steps.analysis.outputs.db-locations).go }}"`, `JAVA_DB="${{ fromJson(steps.analysis.outputs.db-locations).java }}"`. steps.*.outputs.* is an untrusted-input source.

Locations:

- `.github/workflows/__unset-environment.yml:87`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 10 script-injection findings across 8 workflow files by moving ${{ }} expressions from run: shell strings into step-level env: blocks:

1. **update-release-branch.yml** (lines 73-75, 108): Moved `${{ github.repository }}` → `REPOSITORY_NWO`, `${{ env.REF_NAME }}` → `SOURCE_BRANCH_VAL`, `${{ env.MAJOR_VERSION }}` → `TARGET_BRANCH_VAL` into env blocks for both 'Update current release branch' and 'Update older release branch' steps.

2. **prepare-release.yml** (lines 67-71): Moved `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, `${{ steps.branches.outputs.backport_target_branches }}` into env block for 'Print release information' step.

3. **__cleanup-db-cluster-dir.yml** (lines 48, 57): Moved `${{ runner.temp }}` → `RUNNER_TEMP_DIR` into env blocks for both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

4. **__ruby.yml** (line 60): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` → `RUBY_DB` into env block for 'Check database' step.

5. **__rust.yml** (line 59): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` → `RUST_DB` into env block for 'Check database' step.

6. **__start-proxy.yml** (lines 64-66): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, `${{ steps.proxy.outputs.proxy_urls }}` into env block for 'Print proxy outputs' step.

7. **__swift-autobuild.yml** (line 62): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` → `SWIFT_DB` into env block for 'Check database' step.

8. **__swift-custom-build.yml** (line 75): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` → `SWIFT_DB` into env block for 'Check database' step.

9. **__multi-language-autodetect.yml** (lines 109, 145): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).LANG }}` and `${{ runner.temp }}` expressions into env blocks for both 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps.

10. **__unset-environment.yml** (line 87): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).LANG }}` expressions into env block for the unnamed 'Check databases' run step.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script-injection in hardened/action/.github/workflows/__upload-sarif.yml at line 153. Moved `${{ runner.temp }}` out of the `run:` shell command and into a step-level `env:` block as `TEMP_DIR`. The shell command now uses `"$TEMP_DIR/results/javascript.sarif"` and `"$TEMP_DIR/results/javascript.sarif.json"` with proper double-quoting.

