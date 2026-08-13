<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.7

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.7** was hardened automatically. 3 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ }} expressions are interpolated directly inside run: shell command strings. In the 'Update current release branch' step, the run: block uses `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` directly in shell commands (e.g., `--repository-nwo ${{ github.repository }}`). In the 'Update older release branch' step, `${{ github.repository }}` is again used directly in a run: block. These values flow through YAML template substitution before the shell sees them, enabling script injection.

Locations:

- `.github/workflows/update-release-branch.yml:63`
- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Sub-rule (a): ${{ }} expressions are interpolated directly inside a run: shell command string. In the 'Print release information' step, the run: block uses `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, and `${{ steps.branches.outputs.backport_target_branches }}` directly in echo commands. These step output values flow through YAML template substitution before the shell sees them, enabling script injection if any output contains shell metacharacters.

Locations:

- `.github/workflows/prepare-release.yml:73`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside a run: shell command string. The 'Change SARIF file extension' step uses `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ ... }} expression directly in a run: block is a script-injection finding regardless of which context it reads from, as the value flows through YAML template substitution before the shell processes it.

Locations:

- `.github/workflows/__upload-sarif.yml:170`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all three script-injection findings by moving ${{ }} expressions out of run: shell command strings and into each step's env: block, then referencing them as plain environment variables in the shell scripts:
1. update-release-branch.yml (line 63, 'Update current release branch'): Moved ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} to env: as REPOSITORY_NWO, SOURCE_BRANCH_ARG, and TARGET_BRANCH_PREFIX.
2. update-release-branch.yml (line 100, 'Update older release branch'): Moved ${{ github.repository }} to env: as REPOSITORY_NWO.
3. prepare-release.yml (line 73, 'Print release information'): Moved all five step output expressions to env: as VERSION, MAJOR_VERSION, LATEST_TAG, BACKPORT_SOURCE_BRANCH, and BACKPORT_TARGET_BRANCHES.
4. __upload-sarif.yml (line 170, 'Change SARIF file extension'): Moved ${{ runner.temp }} to env: as RUNNER_TEMP_DIR.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed 7 script-injection findings across 6 workflow files:

1. __ruby.yml (line 57): Moved `fromJson(steps.analysis.outputs.db-locations).ruby` to `env: RUBY_DB:` and referenced as `"$RUBY_DB"` in the shell script.

2. __rust.yml (line 57): Moved `fromJson(steps.analysis.outputs.db-locations).rust` to `env: RUST_DB:` and referenced as `"$RUST_DB"` in the shell script.

3. __swift-autobuild.yml (line 57): Moved `fromJson(steps.analysis.outputs.db-locations).swift` to `env: SWIFT_DB:` and referenced as `"$SWIFT_DB"` in the shell script.

4. __swift-custom-build.yml (line 79): Moved `fromJson(steps.analysis.outputs.db-locations).swift` to `env: SWIFT_DB:` and referenced as `"$SWIFT_DB"` in the shell script.

5. __multi-language-autodetect.yml (line 130): Moved all 7 language DB expressions (cpp, csharp, go, java, javascript, python, ruby) plus `runner.temp` path to `env:` block. Also fixed the Swift-on-macOS step similarly. All variables are now properly double-quoted in the shell comparisons.

6. __unset-environment.yml (line 83): Moved all 6 language DB expressions (cpp, csharp, go, java, javascript, python) to `env:` block. Removed the inline variable assignments from the `run:` block and referenced the env vars directly (double-quoted) in the conditionals.

7. __start-proxy.yml (line 57): Moved `steps.proxy.outputs.proxy_host`, `steps.proxy.outputs.proxy_port`, and `steps.proxy.outputs.proxy_urls` to `env:` block as `PROXY_HOST`, `PROXY_PORT`, `PROXY_URLS` respectively, and referenced them as `"$PROXY_HOST"`, `"$PROXY_PORT"`, `"$PROXY_URLS"` in the shell script.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Replaced all three ${{ runner.temp }} expressions in run: blocks (lines 58, 59, 71) with $RUNNER_TEMP, the pre-set GitHub Actions environment variable. This avoids template-engine interpolation before the shell sees the value, eliminating the script-injection risk. The db-location: with: parameter was left unchanged as it is not a run: shell command.

### Iteration 4

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in hardened/action/.github/actions/prepare-test/action.yml. The `version` variable (derived from `inputs.version` via the `VERSION` env var) was being written unsanitized to $GITHUB_OUTPUT. Fixed by: (1) replacing backtick syntax with `$(...)`, (2) using `printf '%s' "$VERSION"` instead of `echo "$VERSION"` to safely handle values starting with `-`, and (3) piping through `tr -d '\n\r'` to strip newline/carriage-return characters before the value is embedded in the URL written to $GITHUB_OUTPUT. Both the nightly and stable branches were fixed. Also quoted `"$GITHUB_OUTPUT"` for correctness.

