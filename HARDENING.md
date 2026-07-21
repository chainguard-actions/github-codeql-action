<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.3** was hardened automatically. 7 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Multiple workflow files reference GitHub Actions using mutable version tags instead of full 40-character commit SHAs. Unpinned references include: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/setup-python@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`, `actions/upload-artifact@v7`, `actions/github-script@v8`, `actions/create-github-app-token@v3.1.1`, `actions/publish-immutable-action@v0.0.4`, `github/codeql-action/upload-sarif@v4`. These mutable tags can be silently redirected to malicious code.

Locations:

- `.github/workflows/check-expected-release-files.yml:21`
- `.github/workflows/codeql.yml:32`
- `.github/workflows/codescanning-config-cli.yml:60`
- `.github/workflows/debug-artifacts-failure-safe.yml:44`
- `.github/workflows/debug-artifacts-safe.yml:39`
- `.github/workflows/post-release-mergeback.yml:55`
- `.github/workflows/pr-checks.yml:35`
- `.github/workflows/prepare-release.yml:48`
- `.github/workflows/publish-immutable-action.yml:18`
- `.github/workflows/python312-windows.yml:28`
- `.github/workflows/query-filters.yml:35`
- `.github/workflows/rebuild.yml:26`
- `.github/workflows/rollback-release.yml:52`
- `.github/workflows/test-codeql-bundle-all.yml:31`
- `.github/workflows/update-bundle.yml:37`
- `.github/workflows/update-release-branch.yml:47`
- `.github/workflows/update-supported-enterprise-server-versions.yml:22`
- `.github/workflows/__all-platform-bundle.yml:1`
- `.github/workflows/__analysis-kinds.yml:1`
- `.github/workflows/__bundle-from-toolcache.yml:1`
- `.github/workflows/__bundle-toolcache.yml:1`
- `.github/workflows/__bundle-zstd.yml:1`
- `.github/workflows/__config-export.yml:1`
- `.github/workflows/__diagnostics-export.yml:1`
- `.github/workflows/__export-file-baseline-information.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:1`
- `.github/workflows/__job-run-uuid-sarif.yml:1`
- `.github/workflows/__local-bundle.yml:1`
- `.github/workflows/__multi-language-autodetect.yml:1`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-js.yml:1`
- `.github/workflows/__packaging-inputs-js.yml:1`
- `.github/workflows/__remote-config.yml:1`
- `.github/workflows/__split-workflow.yml:1`
- `.github/workflows/__upload-sarif.yml:1`
- `.github/workflows/__with-checkout-path.yml:1`
- `.github/workflows/__go-custom-queries.yml:1`
- `.github/workflows/__go-tracing-autobuilder.yml:1`
- `.github/workflows/__go-tracing-custom-build-steps.yml:1`
- `.github/workflows/__go-tracing-legacy-workflow.yml:1`
- `.github/workflows/__swift-custom-build.yml:1`
- `.github/workflows/__unset-environment.yml:1`
- `.github/workflows/__upload-ref-sha-input.yml:1`
- `.github/workflows/__submit-sarif-failure.yml:1`

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` expression is directly interpolated inside a `run:` shell command string. The line `run: |  mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `if [[ -f "${{ runner.temp }}/customDbLocation/...` embed the expression directly in shell, bypassing safe env-var routing.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:37`

### script-injection (severity: high)

Sub-rule (a): Multiple `${{ ... }}` expressions are directly interpolated inside `run:` shell command strings. Offending lines include: `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`, `if [[ ! $CPP_DB == ${{ runner.temp }}/customDbLocation/* ]]`, and similar patterns for csharp, go, java, javascript, python, ruby, and swift databases. The `steps.*.outputs.*` and `runner.*` contexts are interpolated directly into shell without env-var indirection.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:115`

### script-injection (severity: high)

Sub-rule (a): `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` expressions are directly interpolated inside `run:` shell command strings. The step `echo "${{ steps.proxy.outputs.proxy_host }}"` etc. embed step output expressions directly in shell.

Locations:

- `.github/workflows/__start-proxy.yml:62`

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` expression is directly interpolated inside a `run:` shell command string. The line `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` embeds the runner context expression directly in shell.

Locations:

- `.github/workflows/__upload-sarif.yml:163`

### script-injection (severity: high)

Sub-rule (a): Multiple `${{ steps.*.outputs.* }}` expressions are directly interpolated inside a `run:` shell command string. The step 'Print release information' contains lines like `echo 'version: ${{ steps.versions.outputs.version }}'`, `echo 'major_version: ${{ steps.versions.outputs.major_version }}'`, `echo 'latest_tag: ${{ steps.versions.outputs.latest_tag }}'`, `echo 'backport_source_branch: ${{ steps.branches.outputs.backport_source_branch }}'`, and `echo 'backport_target_branches: ${{ steps.branches.outputs.backport_target_branches }}'`.

Locations:

- `.github/workflows/prepare-release.yml:68`

### script-injection (severity: high)

Sub-rule (a): `${{ secrets.GITHUB_TOKEN }}`, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` expressions are directly interpolated inside `run:` shell command strings in two jobs. Offending lines include: `--github-token ${{ secrets.GITHUB_TOKEN }}`, `--repository-nwo ${{ github.repository }}`, `--source-branch '${{ env.REF_NAME }}'`, `--target-branch 'releases/${{ env.MAJOR_VERSION }}'`. These appear in both the `update` and `backport` jobs.

Locations:

- `.github/workflows/update-release-branch.yml:65`
- `.github/workflows/update-release-branch.yml:100`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 50+ workflow files by replacing mutable version tags with full 40-character commit SHAs. Fixed script injection in 7 workflow files (__cleanup-db-cluster-dir.yml, __multi-language-autodetect.yml, __start-proxy.yml, __upload-sarif.yml, prepare-release.yml, update-release-branch.yml, and additionally __swift-custom-build.yml and __unset-environment.yml) by moving ${{ }} expressions from run: blocks into env: blocks. For fromJson() expressions that extracted JSON fields, replaced with jq parsing of the env var in shell. All SHAs were resolved using lookup_action_sha tool.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed 4 findings across 5 files: (1) Pinned actions/setup-java@v5 to full SHA 03ad4de0992f5dab5e18fcb136590ce7c4a0ac95 in __autobuild-direct-tracing-with-working-dir.yml and __build-mode-autobuild.yml. (2) Fixed script injection in __ruby.yml, __rust.yml, and __swift-autobuild.yml by moving fromJson(steps.analysis.outputs.db-locations).* expressions out of run: shell strings and into step-level env: blocks, then referencing them as plain environment variables ($RUBY_DB, $RUST_DB, $SWIFT_DB) in the shell scripts.

