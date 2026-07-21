<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.36.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.36.2** was hardened automatically. 4 finding(s) were identified and resolved across 5 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

The workflow uses `github/codeql-action/upload-sarif@v4` which is pinned to a mutable tag (`@v4`) rather than a full 40-character commit SHA. This is vulnerable to supply-chain attacks if the tag is moved. All other `uses:` references in this repository use full SHA hashes.

Locations:

- `.github/workflows/pr-checks.yml:60`

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` is interpolated directly inside a `run:` shell command string. GitHub Actions performs template substitution before the shell runs, so any expression in `${{ ... }}` inside a `run:` block is a script-injection risk regardless of the context. Offending line: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`

Locations:

- `.github/workflows/__upload-sarif.yml:143`

### script-injection (severity: high)

Sub-rule (a): Multiple `${{ ... }}` expressions are interpolated directly inside `run:` shell command strings in two jobs. In the `update` job: `--repository-nwo ${{ github.repository }}`, `'${{ env.REF_NAME }}'`, and `'releases/${{ env.MAJOR_VERSION }}'` are passed as arguments to a Python script inside a `run:` block. In the `backport` job: `--repository-nwo ${{ github.repository }}` is similarly used. GitHub Actions performs template substitution before the shell runs, making these script-injection vulnerabilities.

Locations:

- `.github/workflows/update-release-branch.yml:75`
- `.github/workflows/update-release-branch.yml:120`

### script-injection (severity: high)

Sub-rule (a): Multiple `${{ steps.*.outputs.* }}` expressions are interpolated directly inside a `run:` block in the 'Print release information' step. Specifically: `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, and `${{ steps.branches.outputs.backport_target_branches }}` are embedded in `echo` commands inside a `run: |` block. Even though they are inside single-quoted shell strings, GitHub Actions interpolates `${{ }}` expressions before the shell runs, so a value containing a single quote could break out of the string and inject shell commands.

Locations:

- `.github/workflows/prepare-release.yml:80`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed 4 findings across 4 files:
1. pr-checks.yml: Pinned github/codeql-action/upload-sarif@v4 to full SHA 7188fc363630916deb702c7fdcf4e481b751f97a
2. __upload-sarif.yml: Moved ${{ runner.temp }} into RUNNER_TEMP_DIR env var in the 'Change SARIF file extension' step
3. update-release-branch.yml: Moved ${{ github.repository }} into REPOSITORY_NWO env var in both 'update' and 'backport' jobs; the REF_NAME and MAJOR_VERSION were already in env vars and are now referenced directly without ${{ }} in the run block
4. prepare-release.yml: Moved all 5 ${{ steps.*.outputs.* }} expressions into env vars (VERSION, MAJOR_VERSION, LATEST_TAG, BACKPORT_SOURCE_BRANCH, BACKPORT_TARGET_BRANCHES) and referenced them as plain env vars in the echo commands. The pr-checks/checks/upload-sarif.yml template file was left unmodified as it is a test harness file.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed script injection in 6 workflow files:
1. __start-proxy.yml (line 69): Moved proxy_host, proxy_port, proxy_urls step outputs to env block (PROXY_HOST, PROXY_PORT, PROXY_URLS).
2. __ruby.yml (line 62): Moved fromJson(steps.analysis.outputs.db-locations).ruby to env block as RUBY_DB.
3. __rust.yml (line 62): Moved fromJson(steps.analysis.outputs.db-locations).rust to env block as RUST_DB.
4. __swift-autobuild.yml (line 61): Moved fromJson(steps.analysis.outputs.db-locations).swift to env block as SWIFT_DB.
5. __swift-custom-build.yml (line 97): Moved fromJson(steps.analysis.outputs.db-locations).swift to env block as SWIFT_DB.
6. __unset-environment.yml (line 96): Moved all 6 fromJson expressions (cpp, csharp, go, java, javascript, python) to env block.
7. __multi-language-autodetect.yml (line 148): Fixed two steps - moved all 7 fromJson expressions and runner.temp to env blocks, and added proper double-quoting for all variable references in the shell scripts.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Replaced all three `${{ runner.temp }}` expressions inside `run:` shell blocks in `.github/workflows/__cleanup-db-cluster-dir.yml` with the `$RUNNER_TEMP` environment variable: lines 55-56 in the 'Add a file to the database cluster directory' step and line 65 in the 'Validate file cleaned up' step. The remaining `${{ runner.temp }}` in the `with: db-location:` input block is not a shell script context and was not flagged.

### Iteration 4

**Fixes applied:** github-env-injection, script-injection

**Notes:**

Fixed 3 findings across 3 workflow files:

1. post-release-mergeback.yml: Sanitized BASE_BRANCH and NEW_BRANCH with `printf '%s' ... | tr -d '\n\r'` before writing to $GITHUB_OUTPUT to prevent newline injection.

2. rollback-release.yml: Sanitized BASE_BRANCH and NEW_BRANCH with `printf '%s' ... | tr -d '\n\r'` before writing to $GITHUB_OUTPUT to prevent newline injection via github.ref_name.

3. update-release-branch.yml: Double-quoted all unquoted variable expansions in shell scripts - RELEASE_BRANCH, LATEST_TAG, and REF_NAME in the 'Ensure release branch exists' step; SOURCE_BRANCH and TARGET_BRANCH in the 'Update older release branch' step of the backport job.

### Iteration 5

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in .github/actions/prepare-test/action.yml at lines 67 and 70. The `version` variable derived from `inputs.version` via `sed` is now sanitized with `printf '%s' "$(...)" | tr -d '\n\r'` before being written to $GITHUB_OUTPUT in both the nightly and stable branches. Also added proper quoting around `"$GITHUB_OUTPUT"` in the redirection.

