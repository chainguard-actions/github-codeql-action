<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.2** was hardened automatically. 7 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): The 'Print release information' step directly interpolates ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} inside a run: shell command. These steps.*.outputs.* values are untrusted and flow through YAML template substitution before the shell sees them, enabling script injection.

Locations:

- `.github/workflows/prepare-release.yml:65`

### script-injection (severity: high)

Rule (a): The 'Update current release branch' step directly interpolates ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} inside a run: shell command (e.g. `--repository-nwo ${{ github.repository }}`). Rule (b): ${REF_NAME}, ${MAJOR_VERSION}, and ${GITHUB_ACTOR} are expanded unquoted in the same run: block. These are github.* and env.* values that are untrusted.

Locations:

- `.github/workflows/update-release-branch.yml:62`

### script-injection (severity: high)

Rule (b): The 'Ensure release branch exists' step uses unquoted shell variable expansions of ${MAJOR_VERSION}, ${RELEASE_BRANCH}, ${LATEST_TAG}, and ${REF_NAME} in git commands (e.g. `git checkout $RELEASE_BRANCH`, `git checkout -b ${RELEASE_BRANCH} ${LATEST_TAG}`, `git checkout ${REF_NAME}`). These variables are derived from needs.*.outputs.* and github.* values set in the job-level env: block and are untrusted.

Locations:

- `.github/workflows/update-release-branch.yml:46`

### script-injection (severity: high)

Rule (a): The 'Update older release branch' step directly interpolates ${{ github.repository }} inside a run: shell command (`--repository-nwo ${{ github.repository }}`). Rule (b): ${SOURCE_BRANCH}, ${TARGET_BRANCH}, and ${GITHUB_ACTOR} are expanded unquoted in the same run: block. SOURCE_BRANCH and TARGET_BRANCH are derived from needs.*.outputs.* and matrix.* values.

Locations:

- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Rule (a): An unnamed run: step directly interpolates ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, ${{ fromJson(steps.analysis.outputs.db-locations).csharp }}, ${{ fromJson(steps.analysis.outputs.db-locations).go }}, ${{ fromJson(steps.analysis.outputs.db-locations).java }}, ${{ fromJson(steps.analysis.outputs.db-locations).javascript }}, and ${{ fromJson(steps.analysis.outputs.db-locations).python }} inside shell commands. These steps.*.outputs.* values are untrusted and enable script injection.

Locations:

- `.github/workflows/__unset-environment.yml:80`

### github-env-injection (severity: high)

The 'Get version and new branch' step constructs NEW_BRANCH using $BASE_BRANCH (derived from the job-level env var BASE_BRANCH which is set to ${{ github.event.inputs.baseBranch || 'main' }}, a workflow_dispatch user-controlled input) and writes it to $GITHUB_OUTPUT without sanitization: `echo "newBranch=${NEW_BRANCH}" >> $GITHUB_OUTPUT`. An attacker supplying a newline in baseBranch could inject arbitrary GITHUB_OUTPUT entries.

Locations:

- `.github/workflows/post-release-mergeback.yml:65`

### github-env-injection (severity: high)

The 'Prepare mergeback branch' step constructs NEW_BRANCH using $BASE_BRANCH (derived from the env var set to `${{ (github.event_name == 'workflow_dispatch' && 'main') || github.ref_name }}`, a github.* value) and $VERSION (from needs.prepare.outputs.version) and writes it to $GITHUB_OUTPUT without sanitization: `echo "new-branch=${NEW_BRANCH}" >> $GITHUB_OUTPUT`. A malicious ref_name or version output containing a newline could inject arbitrary GITHUB_OUTPUT entries.

Locations:

- `.github/workflows/rollback-release.yml:68`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed 5 script-injection findings and 2 github-env-injection findings across 5 workflow files:

1. prepare-release.yml (line 65): Moved all ${{ steps.versions.outputs.* }} and ${{ steps.branches.outputs.* }} expressions into the step's env: block; shell script now references plain env vars.

2. update-release-branch.yml (line 46): Quoted all unquoted shell variable expansions (${MAJOR_VERSION}, ${RELEASE_BRANCH}, ${LATEST_TAG}, ${REF_NAME}) in 'Ensure release branch exists' step.

3. update-release-branch.yml (line 62): Moved ${{ github.repository }} into env: block as REPOSITORY_NWO; quoted all shell variable expansions ($REF_NAME, $MAJOR_VERSION, $GITHUB_ACTOR) in 'Update current release branch' step.

4. update-release-branch.yml (line 100): Moved ${{ github.repository }} into env: block as REPOSITORY_NWO; quoted all shell variable expansions ($SOURCE_BRANCH, $TARGET_BRANCH, $GITHUB_ACTOR) in 'Update older release branch' step.

5. __unset-environment.yml (line 80): Moved all ${{ fromJson(steps.analysis.outputs.db-locations).* }} expressions into the step's env: block; shell script now references plain env vars.

6. post-release-mergeback.yml (line 65): Added sanitization using printf + tr -d '\n\r' before writing NEW_BRANCH (derived from user-controlled baseBranch input) to $GITHUB_OUTPUT.

7. rollback-release.yml (line 68): Added sanitization using printf + tr -d '\n\r' for BASE_BRANCH (from github.ref_name) and VERSION (from needs output) before writing NEW_BRANCH to $GITHUB_OUTPUT.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed 8 script-injection findings across 7 workflow files:

1. __upload-sarif.yml (line 153): Moved `${{ runner.temp }}` into `env: RUNNER_TEMP` for the 'Change SARIF file extension' step; shell now uses `$RUNNER_TEMP`.

2. __cleanup-db-cluster-dir.yml (lines 58, 70): Moved `${{ runner.temp }}` into `env: RUNNER_TEMP` for both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

3. __multi-language-autodetect.yml (line 131): Moved `${{ runner.temp }}` and all seven `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions into an `env:` block for 'Check language autodetect for all languages excluding Swift'. Also fixed the Swift-on-macOS check step similarly. Shell now uses `$RUNNER_TEMP`, `$CPP_DB`, `$CSHARP_DB`, etc.

4. __ruby.yml (line 76): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` into `env: RUBY_DB` for the 'Check database' step.

5. __rust.yml (line 74): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` into `env: RUST_DB` for the 'Check database' step.

6. __swift-autobuild.yml (line 72): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into `env: SWIFT_DB` for the 'Check database' step.

7. __swift-custom-build.yml (line 104): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into `env: SWIFT_DB` for the 'Check database' step.

8. __start-proxy.yml (line 79): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into `env: PROXY_HOST/PROXY_PORT/PROXY_URLS` for the 'Print proxy outputs' step.

### Iteration 3

**Fixes applied:** github-env-injection

**Notes:**

Fixed newline injection vulnerability in .github/actions/prepare-test/action.yml. The `version` variable (derived from `inputs.version` via `sed`) is now sanitized with `printf '%s' "$(...)" | tr -d '\n\r'` before being written to $GITHUB_OUTPUT in both the nightly and stable branches. This prevents an attacker from injecting additional key=value pairs into GITHUB_OUTPUT by embedding newline characters in the version input. Also added proper quoting around `$GITHUB_OUTPUT`.

