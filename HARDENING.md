<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.25.6

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.25.6** was hardened automatically. 6 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

The workflow uses `github/codeql-action/upload-sarif@v4`, which is pinned to a mutable version tag rather than a full 40-character commit SHA. This is vulnerable to supply-chain attacks if the tag is moved.

Locations:

- `.github/workflows/pr-checks.yml:65`

### script-injection (severity: high)

Rule (a): `${{ runner.temp }}` is directly interpolated inside a `run:` shell command string: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any `${{ ... }}` expression inside a run: block is a script-injection risk because the value is substituted by the YAML template engine before the shell ever sees it.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Rule (b): `PARTIAL_CHANGELOG` is set from `${{ runner.temp }}/partial_changelog.md` via an `env:` block, then expanded unquoted in `run:` scripts: `python ... > $PARTIAL_CHANGELOG` and `cat $PARTIAL_CHANGELOG`. Unquoted shell variable expansion of a workflow-controllable value allows shell metacharacter injection.

Locations:

- `.github/workflows/post-release-mergeback.yml:120`

### script-injection (severity: high)

Rule (b): `NEW_CHANGELOG` and `PARTIAL_CHANGELOG` are set from `${{ runner.temp }}/...` via `env:` blocks, then expanded unquoted in multiple `run:` scripts: `> $NEW_CHANGELOG`, `cat $NEW_CHANGELOG`, `python ... $NEW_CHANGELOG > $PARTIAL_CHANGELOG`, `cat $PARTIAL_CHANGELOG`, and `mv ${NEW_CHANGELOG} CHANGELOG.md`. Unquoted shell variable expansion of workflow-controllable values allows shell metacharacter injection.

Locations:

- `.github/workflows/rollback-release.yml:90`

### github-env-injection (severity: high)

The job-level env var `BASE_BRANCH` is set from `${{ (github.event_name == 'workflow_dispatch' && 'main') || github.ref_name }}` (a `github.*` untrusted-input source). Inside the `run:` block, `NEW_BRANCH` is constructed from `BASE_BRANCH` and then written to `$GITHUB_OUTPUT` via `echo "new-branch=${NEW_BRANCH}" >> $GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker who controls the branch name could inject newlines to poison subsequent steps that read this output.

Locations:

- `.github/workflows/rollback-release.yml:85`

### github-env-injection (severity: high)

The job-level env var `BASE_BRANCH` is set from `${{ github.event.inputs.baseBranch || 'main' }}` (a `github.*` untrusted-input source, controllable via workflow_dispatch). Inside the `run:` block, `NEW_BRANCH` is constructed from `BASE_BRANCH` and then written to `$GITHUB_OUTPUT` via `echo "newBranch=${NEW_BRANCH}" >> $GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker supplying a crafted `baseBranch` input could inject newlines to poison subsequent steps that read this output.

Locations:

- `.github/workflows/post-release-mergeback.yml:65`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection, github-env-injection

**Notes:**

Fixed 6 findings across 4 files:
1. pr-checks.yml: Pinned github/codeql-action/upload-sarif@v4 to full SHA e4fba868fa4b1b91e1fdab776edc8cfbe6e9fb81 # v4
2. __upload-sarif.yml: Moved ${{ runner.temp }} into env: block as RUNNER_TEMP_DIR and used quoted "$RUNNER_TEMP_DIR" in the mv command
3. post-release-mergeback.yml: (a) Quoted $PARTIAL_CHANGELOG in python redirect and cat commands; (b) Added printf '%s' "$NEW_BRANCH" | tr -d '\n\r' sanitization before writing newBranch to GITHUB_OUTPUT
4. rollback-release.yml: (a) Quoted $NEW_CHANGELOG and $PARTIAL_CHANGELOG in all run: scripts (python redirect, cat, mv); (b) Added printf '%s' "$NEW_BRANCH" | tr -d '\n\r' sanitization before writing new-branch to GITHUB_OUTPUT

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed all 9 script-injection findings across 5 workflow files:

1. **__cleanup-db-cluster-dir.yml**: Moved `${{ runner.temp }}` to `RUNNER_TEMP` env var in both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

2. **__start-proxy.yml**: Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` to `PROXY_HOST`, `PROXY_PORT`, `PROXY_URLS` env vars in the 'Print proxy outputs' step.

3. **__multi-language-autodetect.yml**: Moved all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` and `${{ runner.temp }}` expressions to env vars (`CPP_DB`, `CSHARP_DB`, `GO_DB`, `JAVA_DB`, `JAVASCRIPT_DB`, `PYTHON_DB`, `RUBY_DB`, `RUNNER_TEMP`) in both the 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps. Also fixed unquoted variable usages in the shell script.

4. **prepare-release.yml**: Moved all `${{ steps.versions.outputs.* }}` and `${{ steps.branches.outputs.* }}` expressions to env vars in the 'Print release information' step.

5. **update-release-branch.yml**: 
   - 'Ensure release branch exists': Quoted all unquoted `${MAJOR_VERSION}`, `${LATEST_TAG}`, and `${REF_NAME}` usages.
   - 'Update current release branch': Removed `${{ github.repository }}`, `${{ env.REF_NAME }}`, `${{ env.MAJOR_VERSION }}` from run block; used the already-defined job-level env vars `$REPOSITORY`, `$REF_NAME`, `$MAJOR_VERSION` with proper quoting.
   - 'Update older release branch': Moved `${{ github.repository }}` to a step-level `REPOSITORY` env var; quoted `$SOURCE_BRANCH`, `$TARGET_BRANCH`, and `$GITHUB_ACTOR` in the shell script.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in `.github/workflows/__unset-environment.yml` at the step around line 106. Moved all six `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions (cpp, csharp, go, java, javascript, python) from inline shell string interpolation into a step-level `env:` block as CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, and PYTHON_DB. The `run:` block now references these as plain environment variables, preventing shell command injection via workflow-controllable step output values.

### Iteration 4

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in 4 workflow files by moving `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions from inline `run:` shell interpolation into step-level `env:` blocks. Affected files: __ruby.yml (line 68), __rust.yml (line 68), __swift-autobuild.yml (line 63), __swift-custom-build.yml (line 88). In each case, the variable (RUBY_DB, RUST_DB, SWIFT_DB) is now set via the `env:` block and referenced as a plain shell variable in the `run:` script.

