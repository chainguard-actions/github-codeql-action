<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.5

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.5** was hardened automatically. 5 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation of ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} inside run: shell commands in the 'Update current release branch' step. These expressions are substituted by the Actions template engine before the shell ever sees them, allowing an attacker who controls the repository name or ref name to inject arbitrary shell commands.

Locations:

- `.github/workflows/update-release-branch.yml:73`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation of ${{ github.repository }} inside a run: shell command in the 'Update older release branch' step of the backport job. The github.repository context is substituted by the Actions template engine before the shell, enabling shell injection.

Locations:

- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation of ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} inside run: echo commands in the 'Print release information' step. Step outputs are substituted by the template engine before the shell, allowing injection if any output value contains shell metacharacters.

Locations:

- `.github/workflows/prepare-release.yml:63`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation of ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} inside run: echo commands in the 'Print proxy outputs' step. Step outputs are substituted by the Actions template engine before the shell executes, allowing injection if any proxy output value contains shell metacharacters.

Locations:

- `.github/workflows/__start-proxy.yml:68`

### script-injection (severity: high)

Sub-rule (a): Direct expression interpolation of ${{ runner.temp }} inside a run: shell command ('run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json') in the 'Change SARIF file extension' step. Any ${{ ... }} expression directly inside a run: block is a script-injection finding regardless of which context it reads from, as the value is substituted by the template engine before the shell.

Locations:

- `.github/workflows/__upload-sarif.yml:155`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 5 script-injection findings across 4 workflow files:

1. `.github/workflows/update-release-branch.yml` (line 73 - 'Update current release branch'): Moved `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` into the step's `env:` block as `REPOSITORY_NWO`, `SOURCE_BRANCH_ARG`, and `TARGET_BRANCH_ARG`, then referenced them as shell variables.

2. `.github/workflows/update-release-branch.yml` (line 100 - 'Update older release branch'): Moved `${{ github.repository }}` into the step's `env:` block as `REPOSITORY_NWO`, then referenced it as a shell variable.

3. `.github/workflows/prepare-release.yml` (line 63 - 'Print release information'): Moved all five step output expressions (`${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, `${{ steps.branches.outputs.backport_target_branches }}`) into the step's `env:` block and referenced them as shell variables.

4. `.github/workflows/__start-proxy.yml` (line 68 - 'Print proxy outputs'): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into the step's `env:` block as `PROXY_HOST`, `PROXY_PORT`, and `PROXY_URLS`, then referenced them as shell variables.

5. `.github/workflows/__upload-sarif.yml` (line 155 - 'Change SARIF file extension'): Moved `${{ runner.temp }}` into the step's `env:` block as `RUNNER_TEMP_DIR` and referenced it as a shell variable in the `mv` command.

### Iteration 2

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 3 findings across 3 workflow files:
1. __cleanup-db-cluster-dir.yml: Moved ${{ runner.temp }} to env: blocks (as RUNNER_TEMP_DIR) in 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.
2. __multi-language-autodetect.yml: Moved all ${{ fromJson(steps.analysis.outputs.db-locations).* }} and ${{ runner.temp }} expressions to env: blocks in both check steps; shell scripts now reference env vars with proper quoting.
3. __build-mode-autobuild.yml: Added `safe_yq_path=$(printf '%s' "$YQ_PATH" | tr -d '\n\r')` sanitization before writing to $GITHUB_PATH to prevent newline injection.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in 5 workflow files by moving ${{ fromJson(steps.analysis.outputs.db-locations).LANG }} expressions from run: shell blocks into step-level env: blocks:
1. __ruby.yml (line 57): Added env: RUBY_DB block, removed inline assignment from run:
2. __rust.yml (line 57): Added env: RUST_DB block, removed inline assignment from run:
3. __swift-autobuild.yml (line 55): Added env: SWIFT_DB block, removed inline assignment from run:
4. __swift-custom-build.yml (line 77): Added env: SWIFT_DB block, removed inline assignment from run:
5. __unset-environment.yml (line 89): Added env: block with CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, removed all 6 inline assignments from run: script.
In all cases the shell scripts now reference plain $VAR_NAME environment variables instead of ${{ }} template expressions, eliminating the shell metacharacter injection risk.

### Iteration 4

**Fixes applied:** script-injection

**Notes:**

Fixed all unquoted shell variable expansions in .github/workflows/update-release-branch.yml:
1. 'Ensure release branch exists' step: Quoted $RELEASE_BRANCH, ${RELEASE_BRANCH}, ${LATEST_TAG}, and ${REF_NAME} in git commands (git checkout, git checkout -b, git push, git checkout).
2. 'Update current release branch' step: Quoted ${GITHUB_ACTOR} in --conductor argument.
3. 'Update older release branch' step: Quoted ${SOURCE_BRANCH}, ${TARGET_BRANCH}, and ${GITHUB_ACTOR} in --source-branch, --target-branch, and --conductor arguments respectively.
All variables are now properly double-quoted to prevent shell word splitting and glob expansion of attacker-influenced values.

