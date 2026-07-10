<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.26.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **github--codeql-action/codeql-bundle-v2.26.0** was hardened automatically. 3 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a) violation: The 'Change SARIF file extension' step directly interpolates ${{ runner.temp }} inside a run: shell command. Any ${{ ... }} expression in a run: block is a script-injection risk because the value is substituted by the YAML template engine before the shell sees it. Offending line: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`

Locations:

- `.github/workflows/__upload-sarif.yml:155`

### script-injection (severity: high)

Rule (a) violation: The 'Print release information' step directly interpolates ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} inside a run: shell command block. These steps.*.outputs.* expressions are substituted by the YAML template engine before the shell sees them.

Locations:

- `.github/workflows/prepare-release.yml:65`

### script-injection (severity: high)

Rule (a) violation: Two run: blocks in update-release-branch.yml directly interpolate ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} inside shell commands. The 'Update current release branch' step uses `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, and `--target-branch 'releases/${{ env.MAJOR_VERSION }}'`. The 'Update older release branch' step uses `--repository-nwo ${{ github.repository }}`. These expressions are substituted by the YAML template engine before the shell sees them.

Locations:

- `.github/workflows/update-release-branch.yml:60`
- `.github/workflows/update-release-branch.yml:100`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed three script-injection findings across three workflow files:
1. hardened/action/.github/workflows/__upload-sarif.yml (line 155): Moved `${{ runner.temp }}` into a step env var `RUNNER_TEMP` and referenced it as `$RUNNER_TEMP` in the shell command.
2. hardened/action/.github/workflows/prepare-release.yml (line 65): Moved all five `${{ steps.*.outputs.* }}` expressions into a step-level `env:` block and referenced them as plain shell variables.
3. hardened/action/.github/workflows/update-release-branch.yml (lines 60 and 100): Moved `${{ github.repository }}` into a step-level `env:` block as `GH_REPOSITORY` in both the 'Update current release branch' and 'Update older release branch' steps. Also replaced `${{ env.REF_NAME }}` and `${{ env.MAJOR_VERSION }}` with direct shell variable references since those are already defined in the job-level env block.

### Iteration 2

**Fixes applied:** script-injection

**Notes:**

Fixed all 8 script-injection findings across 7 workflow files by moving ${{ }} expressions out of run: shell scripts and into step-level env: blocks. For ${{ steps.proxy.outputs.* }} values, they are now referenced as $PROXY_HOST, $PROXY_PORT, $PROXY_URLS environment variables. For ${{ runner.temp }}, it is now referenced as $RUNNER_TEMP_DIR. For ${{ fromJson(steps.analysis.outputs.db-locations).LANG }} expressions, the entire db-locations JSON string is passed via DB_LOCATIONS env var and parsed in the shell using python3 -c 'import sys,json; print(json.load(sys.stdin).get("lang",""))'. The remaining ${{ steps.proxy.outputs.* }} references in if: conditions are safe as they are evaluated by the GitHub Actions expression engine, not the shell.

### Iteration 3

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed all four findings: (1) Quoted unquoted shell variables in update-release-branch.yml git/python/echo commands; (2) Added newline sanitization (printf + tr -d '\n\r') before writing NEW_BRANCH to GITHUB_OUTPUT in post-release-mergeback.yml; (3) Added newline sanitization before writing NEW_BRANCH to GITHUB_OUTPUT in rollback-release.yml; (4) Quoted all unquoted variables in [[ ]] conditional tests in __multi-language-autodetect.yml (both the main language check and the Swift check).

