<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.8

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.8** was hardened automatically. 3 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): The 'Update current release branch' step directly interpolates ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} inside a run: shell command string. These expressions are substituted by the YAML template engine before the shell sees them, allowing injection of shell metacharacters. Offending lines: `--repository-nwo ${{ github.repository }} \`, `--source-branch '${{ env.REF_NAME }}' \`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}' \`.

Sub-rule (b): The 'Ensure release branch exists' step uses unquoted shell variable expansions of env vars sourced from workflow-controllable contexts (needs.prepare.outputs.*): `RELEASE_BRANCH=releases/${MAJOR_VERSION}`, `git checkout $RELEASE_BRANCH`, `git checkout -b ${RELEASE_BRANCH} ${LATEST_TAG}`, `git push --set-upstream origin ${RELEASE_BRANCH}`, `git checkout ${REF_NAME}`. These unquoted expansions allow shell metacharacter injection.

Locations:

- `.github/workflows/update-release-branch.yml:51`
- `.github/workflows/update-release-branch.yml:57`
- `.github/workflows/update-release-branch.yml:73`
- `.github/workflows/update-release-branch.yml:74`
- `.github/workflows/update-release-branch.yml:75`

### script-injection (severity: high)

Sub-rule (a): The 'Update older release branch' step in the backport job directly interpolates ${{ github.repository }} inside a run: shell command string: `--repository-nwo ${{ github.repository }} \`.

Sub-rule (b): The same step uses unquoted shell variable expansions of env vars sourced from workflow-controllable contexts (needs.prepare.outputs.* and matrix.*): `--source-branch ${SOURCE_BRANCH} \` and `--target-branch ${TARGET_BRANCH} \`. These unquoted expansions allow shell metacharacter injection.

Locations:

- `.github/workflows/update-release-branch.yml:107`
- `.github/workflows/update-release-branch.yml:108`
- `.github/workflows/update-release-branch.yml:109`

### script-injection (severity: high)

Sub-rule (a): The 'Print release information' step directly interpolates ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} inside run: shell command strings (echo statements). These steps.*.outputs.* expressions are substituted by the YAML template engine before the shell sees them, allowing injection of shell metacharacters if any step output contains special characters.

Locations:

- `.github/workflows/prepare-release.yml:73`
- `.github/workflows/prepare-release.yml:74`
- `.github/workflows/prepare-release.yml:75`
- `.github/workflows/prepare-release.yml:76`
- `.github/workflows/prepare-release.yml:77`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all three script-injection findings across two workflow files:

1. `.github/workflows/update-release-branch.yml` - 'Ensure release branch exists' step: Quoted all unquoted shell variable expansions ($RELEASE_BRANCH, $LATEST_TAG, $REF_NAME) to prevent metacharacter injection.

2. `.github/workflows/update-release-branch.yml` - 'Update current release branch' step: Replaced direct `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` template interpolations with env var references (`$REPOSITORY`, `$REF_NAME`, `${MAJOR_VERSION}`) — REPOSITORY was already defined in the job-level env block.

3. `.github/workflows/update-release-branch.yml` - 'Update older release branch' step: Added `REPOSITORY: "${{ github.repository }}"` to the backport job's env block, then replaced the direct `${{ github.repository }}` interpolation with `"$REPOSITORY"`, and quoted `${SOURCE_BRANCH}` and `${TARGET_BRANCH}` as `"$SOURCE_BRANCH"` and `"$TARGET_BRANCH"`.

4. `.github/workflows/prepare-release.yml` - 'Print release information' step: Moved all five `${{ steps.*.outputs.* }}` expressions into the step's `env:` block (VERSION, MAJOR_VERSION, LATEST_TAG, BACKPORT_SOURCE_BRANCH, BACKPORT_TARGET_BRANCHES) and replaced the template interpolations in the run: script with plain shell variable references.

### Iteration 2

**Fixes applied:** script-injection, github-env-injection

**Notes:**

1. Fixed script-injection in .github/workflows/__upload-sarif.yml line 130: replaced `mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` with `mv "$RUNNER_TEMP/results/javascript.sarif" "$RUNNER_TEMP/results/javascript.sarif.json"` to use the pre-set environment variable instead of a template expression in a run block.
2. Fixed github-env-injection in .github/actions/prepare-test/action.yml lines 70 and 74: added `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` after each `version=` assignment in both the nightly and stable branches, and used `$safe_version` in the echo statements writing to $GITHUB_OUTPUT to prevent newline injection attacks.

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed script injection vulnerabilities in 7 workflow files by moving all ${{ }} expressions out of run: shell command strings and into step-level env: blocks:

1. __cleanup-db-cluster-dir.yml: Moved `${{ runner.temp }}` to RUNNER_TEMP_DIR env var in both 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps.

2. __multi-language-autodetect.yml: Moved `${{ runner.temp }}` to RUNNER_TEMP_DIR and all `${{ fromJson(steps.analysis.outputs.db-locations).X }}` expressions to DB_LOCATIONS_* env vars in both 'Check language autodetect for all languages excluding Swift' and 'Check language autodetect for Swift on macOS' steps.

3. __ruby.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to DB_LOCATIONS_RUBY env var in 'Check database' step.

4. __rust.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` to DB_LOCATIONS_RUST env var in 'Check database' step.

5. __start-proxy.yml: Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` to PROXY_HOST, PROXY_PORT, PROXY_URLS env vars in 'Print proxy outputs' step.

6. __swift-autobuild.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to DB_LOCATIONS_SWIFT env var in 'Check database' step.

7. __swift-custom-build.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to DB_LOCATIONS_SWIFT env var in 'Check database' step.

8. __unset-environment.yml: Moved all 6 `${{ fromJson(steps.analysis.outputs.db-locations).X }}` expressions to DB_LOCATIONS_* env vars in the anonymous run step.

