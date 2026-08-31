<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.9

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.9** was hardened automatically. 11 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ ... }} expressions are interpolated directly inside run: shell command strings. In __upload-sarif.yml, the step 'Change SARIF file extension' uses `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` — runner.temp is substituted before the shell sees the command.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside run: shell command strings. The step 'Add a file to the database cluster directory' uses `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and the step 'Validate file cleaned up' uses `if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:42`
- `.github/workflows/__cleanup-db-cluster-dir.yml:52`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).* }} and ${{ runner.temp }} are interpolated directly inside run: shell command strings. The step 'Check language autodetect for all languages excluding Swift' assigns e.g. `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` and compares against `${{ runner.temp }}/customDbLocation/*`. The step 'Check language autodetect for Swift on macOS' similarly uses `SWIFT_DB=${{ fromJson(steps.analysis.outputs.db-locations).swift }}`.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:120`
- `.github/workflows/__multi-language-autodetect.yml:163`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).* }} is interpolated directly inside a run: shell command string. The unnamed run step assigns e.g. `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"` and similar for csharp, go, java, javascript, python.

Locations:

- `.github/workflows/__unset-environment.yml:82`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is interpolated directly inside a run: shell command string. The step 'Check database' assigns `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`.

Locations:

- `.github/workflows/__ruby.yml:52`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).rust }} is interpolated directly inside a run: shell command string. The step 'Check database' assigns `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`.

Locations:

- `.github/workflows/__rust.yml:50`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command string. The step 'Check database' assigns `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-autobuild.yml:50`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command string. The step 'Check database' assigns `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-custom-build.yml:82`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are interpolated directly inside a run: shell command string. The step 'Print proxy outputs' uses `echo "${{ steps.proxy.outputs.proxy_host }}"` etc.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Sub-rule (a): ${{ github.repository }} and ${{ env.REF_NAME }} / ${{ env.MAJOR_VERSION }} are interpolated directly inside run: shell command strings. The step 'Update current release branch' passes `--repository-nwo ${{ github.repository }}` and `--source-branch '${{ env.REF_NAME }}'` directly to a shell command. The step 'Update older release branch' similarly uses `--repository-nwo ${{ github.repository }}`.

Locations:

- `.github/workflows/update-release-branch.yml:57`
- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are interpolated directly inside a run: shell command string. The step 'Print release information' echoes these values directly.

Locations:

- `.github/workflows/prepare-release.yml:72`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 11 script injection findings across 9 workflow files:

1. **__upload-sarif.yml** (line 148): Replaced `${{ runner.temp }}` with `$RUNNER_TEMP` in the 'Change SARIF file extension' step.

2. **__cleanup-db-cluster-dir.yml** (lines 42, 52): Replaced `${{ runner.temp }}` with `$RUNNER_TEMP` in both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

3. **__multi-language-autodetect.yml** (lines 120, 163): Moved `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions for cpp, csharp, go, java, javascript, python, ruby, and swift into `env:` blocks. Replaced `${{ runner.temp }}` with `$RUNNER_TEMP` in glob comparisons.

4. **__unset-environment.yml** (line 82): Moved `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions for cpp, csharp, go, java, javascript, and python into an `env:` block on the unnamed run step.

5. **__ruby.yml** (line 52): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` into an `env:` block on the 'Check database' step.

6. **__rust.yml** (line 50): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` into an `env:` block on the 'Check database' step.

7. **__swift-autobuild.yml** (line 50): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into an `env:` block on the 'Check database' step.

8. **__swift-custom-build.yml** (line 82): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into an `env:` block on the 'Check database' step.

9. **__start-proxy.yml** (line 55): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into an `env:` block on the 'Print proxy outputs' step.

10. **update-release-branch.yml** (line 57): Replaced `${{ github.repository }}` with `$REPOSITORY` (already in job env), `${{ env.REF_NAME }}` with `$REF_NAME`, and `${{ env.MAJOR_VERSION }}` with `$MAJOR_VERSION` in the 'Update current release branch' step.

11. **update-release-branch.yml** (line 100): Replaced `${{ github.repository }}` with `$GITHUB_REPOSITORY` (built-in env var) in the 'Update older release branch' step.

12. **prepare-release.yml** (line 72): Moved all `${{ steps.versions.outputs.* }}` and `${{ steps.branches.outputs.* }}` expressions into an `env:` block on the 'Print release information' step.

