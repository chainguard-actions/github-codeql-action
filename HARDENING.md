<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.2** was hardened automatically. 10 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` is interpolated directly inside `run:` shell command strings in two steps: 'Add a file to the database cluster directory' (`mkdir -p "${{ runner.temp }}/customDbLocation/javascript"`) and 'Validate file cleaned up' (`if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`). Any `${{ ... }}` expression in a run: block is a script-injection risk because YAML template substitution happens before the shell sees the string.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:58`
- `.github/workflows/__cleanup-db-cluster-dir.yml:66`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`, `${{ fromJson(steps.analysis.outputs.db-locations).csharp }}`, `${{ fromJson(steps.analysis.outputs.db-locations).go }}`, `${{ fromJson(steps.analysis.outputs.db-locations).java }}`, `${{ fromJson(steps.analysis.outputs.db-locations).javascript }}`, and `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` are interpolated directly inside `run:` shell command strings in the 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps. `steps.*.outputs.*` is an untrusted-input source per the check rules.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:135`
- `.github/workflows/__multi-language-autodetect.yml:165`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` is interpolated directly inside a `run:` shell command string in the 'Check database' step: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`.

Locations:

- `.github/workflows/__ruby.yml:76`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` is interpolated directly inside a `run:` shell command string in the 'Check database' step: `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`.

Locations:

- `.github/workflows/__rust.yml:74`

### script-injection (severity: high)

Sub-rule (a): `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` are interpolated directly inside `run:` shell command strings in the 'Print proxy outputs' step. `steps.*.outputs.*` is an untrusted-input source per the check rules.

Locations:

- `.github/workflows/__start-proxy.yml:77`
- `.github/workflows/__start-proxy.yml:78`
- `.github/workflows/__start-proxy.yml:79`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` is interpolated directly inside a `run:` shell command string in the 'Check database' step: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-autobuild.yml:72`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` is interpolated directly inside a `run:` shell command string in the 'Check database' step: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-custom-build.yml:90`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` is interpolated directly inside a `run:` shell command string in an unnamed step: `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`.

Locations:

- `.github/workflows/__unset-environment.yml:83`

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` is interpolated directly inside a `run:` shell command string in the 'Change SARIF file extension' step: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`.

Locations:

- `.github/workflows/__upload-sarif.yml:163`

### script-injection (severity: high)

Sub-rule (a): `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, and `${{ steps.branches.outputs.backport_source_branch }}` are interpolated directly inside `run:` shell command strings in the 'Print release information' step. `steps.*.outputs.*` is an untrusted-input source per the check rules.

Locations:

- `.github/workflows/prepare-release.yml:73`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed 10 script-injection findings across 8 workflow files:

1. __cleanup-db-cluster-dir.yml (lines 58, 66): Moved `${{ runner.temp }}` to `RUNNER_TEMP_DIR` env var in both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

2. __multi-language-autodetect.yml (lines 135, 165): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions and `${{ runner.temp }}` to env vars (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB, RUBY_DB, SWIFT_DB, RUNNER_TEMP_DIR) in both 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps.

3. __ruby.yml (line 76): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to `RUBY_DB` env var in 'Check database' step.

4. __rust.yml (line 74): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` to `RUST_DB` env var in 'Check database' step.

5. __start-proxy.yml (lines 77-79): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` to PROXY_HOST, PROXY_PORT, PROXY_URLS env vars in 'Print proxy outputs' step.

6. __swift-autobuild.yml (line 72): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to `SWIFT_DB` env var in 'Check database' step.

7. __swift-custom-build.yml (line 90): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to `SWIFT_DB` env var in 'Check database' step.

8. __unset-environment.yml (line 83): Moved all `${{ fromJson(steps.analysis.outputs.db-locations).* }}` expressions to env vars (CPP_DB, CSHARP_DB, GO_DB, JAVA_DB, JAVASCRIPT_DB, PYTHON_DB) in the unnamed step.

9. __upload-sarif.yml (line 163): Moved `${{ runner.temp }}` to `RUNNER_TEMP_DIR` env var in 'Change SARIF file extension' step, also added proper quoting around the mv arguments.

10. prepare-release.yml (line 73): Moved `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, and `${{ steps.branches.outputs.backport_source_branch }}` to VERSION, MAJOR_VERSION, LATEST_TAG, BACKPORT_SOURCE_BRANCH, BACKPORT_TARGET_BRANCHES env vars in 'Print release information' step.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed two script injection vulnerabilities in .github/workflows/update-release-branch.yml:

1. 'Update current release branch' step: Moved ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} out of the run: shell string and into the step's env: block as REPOSITORY_NWO, SOURCE_BRANCH_VAL, and TARGET_BRANCH_VAL. These are now referenced as plain shell variables ($REPOSITORY_NWO, $SOURCE_BRANCH_VAL, $TARGET_BRANCH_VAL) in the script.

2. 'Update older release branch' step: Moved ${{ github.repository }} out of the run: shell string and into the step's env: block as REPOSITORY_NWO, referenced as $REPOSITORY_NWO in the script.

### Iteration 3

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed three security findings across three workflow files:

1. update-release-branch.yml (script-injection): Quoted all unquoted variable expansions in run blocks - git checkout commands now use quoted "$RELEASE_BRANCH", "${LATEST_TAG}", "${REF_NAME}"; --conductor flag now uses "$GITHUB_ACTOR"; echo statements now use quoted strings; --source-branch and --target-branch arguments now use "${SOURCE_BRANCH}" and "${TARGET_BRANCH}".

2. rollback-release.yml (github-env-injection): Added newline sanitization before writing NEW_BRANCH to GITHUB_OUTPUT using `safe_new_branch="$(printf '%s' "${NEW_BRANCH}" | tr -d '\n\r')"` and writing the sanitized value.

3. post-release-mergeback.yml (github-env-injection): Added newline sanitization before writing NEW_BRANCH to GITHUB_OUTPUT using `safe_new_branch="$(printf '%s' "${NEW_BRANCH}" | tr -d '\n\r')"` and writing the sanitized value.

