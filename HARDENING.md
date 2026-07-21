<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.26.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.26.0** was hardened automatically. 5 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violation: Direct ${{ }} expression interpolation inside run: shell commands. In the 'Update current release branch' step, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` are interpolated directly into a python CLI invocation. In the 'Update older release branch' (backport job) step, `${{ github.repository }}` is again interpolated directly. GitHub Actions substitutes these expressions before the shell sees them, enabling script injection if any value contains shell metacharacters.

Locations:

- `.github/workflows/update-release-branch.yml:62`
- `.github/workflows/update-release-branch.yml:63`
- `.github/workflows/update-release-branch.yml:64`
- `.github/workflows/update-release-branch.yml:99`

### script-injection (severity: high)

Rule (a) violation: Direct ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are interpolated directly inside a run: block's echo commands. The `steps.*.outputs.*` context is in the untrusted-input list; GitHub Actions substitutes these before the shell runs them, enabling injection if output values contain shell metacharacters.

Locations:

- `.github/workflows/__start-proxy.yml:70`
- `.github/workflows/__start-proxy.yml:71`
- `.github/workflows/__start-proxy.yml:72`

### script-injection (severity: high)

Rule (a) violation: Direct ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are interpolated directly inside a run: block's echo commands. The `steps.*.outputs.*` context is in the untrusted-input list; GitHub Actions substitutes these before the shell runs them.

Locations:

- `.github/workflows/prepare-release.yml:68`
- `.github/workflows/prepare-release.yml:69`
- `.github/workflows/prepare-release.yml:70`
- `.github/workflows/prepare-release.yml:71`
- `.github/workflows/prepare-release.yml:72`

### script-injection (severity: high)

Rule (a) violation: `${{ runner.temp }}` is interpolated directly inside a run: shell command (`mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`). Per the check rules, `runner.*` flows through YAML template substitution before the shell sees it and is a script-injection finding.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Rule (a) violation: `${{ runner.temp }}` is interpolated directly inside run: shell commands (`mkdir -p "${{ runner.temp }}/customDbLocation/javascript"`, `touch "${{ runner.temp }}/..."`, and `if [[ -f "${{ runner.temp }}/..." ]]`). Per the check rules, `runner.*` flows through YAML template substitution before the shell sees it and is a script-injection finding.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:51`
- `.github/workflows/__cleanup-db-cluster-dir.yml:52`
- `.github/workflows/__cleanup-db-cluster-dir.yml:62`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 5 script-injection findings across 5 workflow files:

1. `.github/workflows/update-release-branch.yml` (lines 62-64, 99):
   - 'Update current release branch' step: moved `${{ github.repository }}` to `GH_REPOSITORY` env var; `${{ env.REF_NAME }}` and `${{ env.MAJOR_VERSION }}` were already available as job-level env vars `$REF_NAME` and `$MAJOR_VERSION`, so the `${{ env.* }}` interpolations were replaced with plain `$REF_NAME`/`$MAJOR_VERSION` references.
   - 'Update older release branch' step: moved `${{ github.repository }}` to `GH_REPOSITORY` env var.

2. `.github/workflows/__start-proxy.yml` (lines 70-72):
   - 'Print proxy outputs' step: moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` to `PROXY_HOST`, `PROXY_PORT`, `PROXY_URLS` env vars.

3. `.github/workflows/prepare-release.yml` (lines 68-72):
   - 'Print release information' step: moved all five `${{ steps.*.outputs.* }}` expressions to dedicated env vars (`VERSION`, `MAJOR_VERSION`, `LATEST_TAG`, `BACKPORT_SOURCE_BRANCH`, `BACKPORT_TARGET_BRANCHES`).

4. `.github/workflows/__upload-sarif.yml` (line 148):
   - 'Change SARIF file extension' step: moved `${{ runner.temp }}` to `RUNNER_TEMP_DIR` env var.

5. `.github/workflows/__cleanup-db-cluster-dir.yml` (lines 51-52, 62):
   - 'Add a file to the database cluster directory' step: moved `${{ runner.temp }}` to `RUNNER_TEMP_DIR` env var.
   - 'Validate file cleaned up' step: moved `${{ runner.temp }}` to `RUNNER_TEMP_DIR` env var.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in 6 workflow files by moving `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions from `run:` shell blocks into `env:` blocks:
- __ruby.yml: Moved RUBY_DB to env: block
- __rust.yml: Moved RUST_DB to env: block
- __swift-autobuild.yml: Moved SWIFT_DB to env: block
- __swift-custom-build.yml: Moved SWIFT_DB to env: block
- __unset-environment.yml: Moved CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB to env: block
- __multi-language-autodetect.yml: Moved all DB variables and CUSTOM_DB_LOCATION (from runner.temp) to env: blocks on both run steps. Shell scripts now reference these as properly double-quoted environment variables.

