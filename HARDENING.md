<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.3** was hardened automatically. 2 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Workflow files use mutable tag-based `uses:` references instead of pinned 40-character SHA commits. Failing references include: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/setup-python@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`, `actions/create-github-app-token@v3.1.1`, `github/codeql-action/upload-sarif@v4`, `actions/publish-immutable-action@v0.0.4`. These tags can be moved to point to different (potentially malicious) commits at any time, enabling supply-chain attacks.

Locations:

- `.github/workflows/__all-platform-bundle.yml:1`
- `.github/workflows/__analysis-kinds.yml:1`
- `.github/workflows/__analyze-ref-input.yml:1`
- `.github/workflows/__autobuild-action.yml:1`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:1`
- `.github/workflows/__autobuild-working-dir.yml:1`
- `.github/workflows/__build-mode-autobuild.yml:1`
- `.github/workflows/__build-mode-manual.yml:1`
- `.github/workflows/__build-mode-none.yml:1`
- `.github/workflows/__build-mode-rollback.yml:1`
- `.github/workflows/__bundle-from-nightly.yml:1`
- `.github/workflows/__bundle-from-toolcache.yml:1`
- `.github/workflows/__bundle-toolcache.yml:1`
- `.github/workflows/__bundle-zstd.yml:1`
- `.github/workflows/__cleanup-db-cluster-dir.yml:1`
- `.github/workflows/__config-export.yml:1`
- `.github/workflows/__config-input.yml:1`
- `.github/workflows/__cpp-deptrace-disabled.yml:1`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:1`
- `.github/workflows/__cpp-deptrace-enabled.yml:1`
- `.github/workflows/__diagnostics-export.yml:1`
- `.github/workflows/__export-file-baseline-information.yml:1`
- `.github/workflows/__extractor-ram-threads.yml:1`
- `.github/workflows/__global-proxy.yml:1`
- `.github/workflows/__go-custom-queries.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:1`
- `.github/workflows/__go-indirect-tracing-workaround.yml:1`
- `.github/workflows/__go-tracing-autobuilder.yml:1`
- `.github/workflows/__go-tracing-custom-build-steps.yml:1`
- `.github/workflows/__go-tracing-legacy-workflow.yml:1`
- `.github/workflows/__go.yml:1`
- `.github/workflows/__init-with-registries.yml:1`
- `.github/workflows/__javascript-source-root.yml:1`
- `.github/workflows/__job-run-uuid-sarif.yml:1`
- `.github/workflows/__language-aliases.yml:1`
- `.github/workflows/__local-bundle.yml:1`
- `.github/workflows/__multi-language-autodetect.yml:1`
- `.github/workflows/__overlay-init-fallback.yml:1`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-inputs-js.yml:1`
- `.github/workflows/__packaging-config-js.yml:1`
- `.github/workflows/__packaging-inputs-js.yml:1`
- `.github/workflows/__remote-config.yml:1`
- `.github/workflows/__resolve-environment-action.yml:1`
- `.github/workflows/__rubocop-multi-language.yml:1`
- `.github/workflows/__ruby.yml:1`
- `.github/workflows/__rust.yml:1`
- `.github/workflows/__split-workflow.yml:1`
- `.github/workflows/__start-proxy.yml:1`
- `.github/workflows/__submit-sarif-failure.yml:1`
- `.github/workflows/__swift-autobuild.yml:1`
- `.github/workflows/__swift-custom-build.yml:1`
- `.github/workflows/__unset-environment.yml:1`
- `.github/workflows/__upload-ref-sha-input.yml:1`
- `.github/workflows/__upload-sarif.yml:1`
- `.github/workflows/__with-checkout-path.yml:1`
- `.github/workflows/check-expected-release-files.yml:1`
- `.github/workflows/codeql.yml:1`
- `.github/workflows/codescanning-config-cli.yml:1`
- `.github/workflows/debug-artifacts-failure-safe.yml:1`
- `.github/workflows/debug-artifacts-safe.yml:1`
- `.github/workflows/post-release-mergeback.yml:1`
- `.github/workflows/pr-checks.yml:1`
- `.github/workflows/prepare-release.yml:1`
- `.github/workflows/publish-immutable-action.yml:1`
- `.github/workflows/python312-windows.yml:1`
- `.github/workflows/query-filters.yml:1`
- `.github/workflows/rebuild.yml:1`
- `.github/workflows/rollback-release.yml:1`
- `.github/workflows/test-codeql-bundle-all.yml:1`
- `.github/workflows/update-bundle.yml:1`
- `.github/workflows/update-release-branch.yml:1`
- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

### script-injection (severity: high)

Sub-rule (a): GitHub Actions expressions (`${{ ... }}`) are interpolated directly inside `run:` shell command strings. In `.github/workflows/__upload-sarif.yml`, the step 'Change SARIF file extension' uses `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json` — the `runner.temp` expression is expanded by the template engine before the shell sees it. In `.github/workflows/update-release-branch.yml`, the 'Update current release branch' step embeds `${{ secrets.GITHUB_TOKEN }}`, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` directly in a multi-line `run:` block; the 'Update older release branch' step similarly embeds `${{ secrets.GITHUB_TOKEN }}` and `${{ github.repository }}`. All of these are YAML-template-substituted before the shell parses the command, bypassing shell quoting.

Locations:

- `.github/workflows/__upload-sarif.yml:167`
- `.github/workflows/update-release-branch.yml:63`
- `.github/workflows/update-release-branch.yml:100`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 75+ workflow files by pinning to full SHA commits. The 9 action types pinned were: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8, actions/create-github-app-token@v3.1.1, github/codeql-action/upload-sarif@v4, and actions/publish-immutable-action@v0.0.4. Fixed 3 script injection locations: (1) __upload-sarif.yml 'Change SARIF file extension' step - moved runner.temp expressions to env block; (2) update-release-branch.yml 'Update current release branch' step - moved secrets.GITHUB_TOKEN, github.repository, env.REF_NAME, env.MAJOR_VERSION to env block; (3) update-release-branch.yml 'Update older release branch' step - moved secrets.GITHUB_TOKEN and github.repository to env block. Several files required complete rewrites due to edit_file corruption during the process.

### Iteration 2

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed script-injection in 9 workflow files by moving ${{ }} expressions into step env: blocks and referencing them as plain shell variables. For fromJson(steps.analysis.outputs.db-locations).* patterns, moved the raw JSON output to a DB_LOCATIONS env var and used jq to parse individual language paths in the shell script. Fixed unpinned-uses in 12 workflow files: actions/upload-artifact@v7 pinned to SHA 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/github-script@v8 pinned to SHA ed597411d8f924073f98dfc5c65a23a2325f34cd, and actions/setup-java@v5 pinned to SHA 03ad4de0992f5dab5e18fcb136590ce7c4a0ac95. All SHAs were resolved via lookup_action_sha.

### Iteration 3

**Fixes applied:** unpinned-uses, script-injection, github-env-injection

**Notes:**

Fixed all 7 findings across 5 files:

1. **unpinned-uses** (.github/actions/release-initialise/action.yml): Pinned actions/setup-node@v6 → @249970729cb0ef3589644e2896645e5dc5ba9c38 and actions/setup-python@v6 → @ece7cb06caefa5fff74198d8649806c4678c61a1.

2. **script-injection** (.github/workflows/update-release-branch.yml): Double-quoted all unquoted variable expansions in 'Ensure release branch exists' ($RELEASE_BRANCH, ${LATEST_TAG}, ${REF_NAME}), 'Update current release branch' (echo statements, --conductor $GITHUB_ACTOR), and 'Update older release branch' (echo statements, --source-branch, --target-branch, --conductor).

3. **script-injection** (.github/workflows/post-release-mergeback.yml): Double-quoted $PARTIAL_CHANGELOG in redirect and cat commands in 'Prepare partial Changelog' step.

4. **script-injection** (.github/workflows/rollback-release.yml): Double-quoted $NEW_CHANGELOG and $PARTIAL_CHANGELOG in 'Prepare rollback changelog', 'Prepare partial Changelog', and 'Update changelog' steps.

5. **github-env-injection** (.github/workflows/post-release-mergeback.yml): Sanitized NEW_BRANCH with `printf '%s' | tr -d '\n\r'` before writing to $GITHUB_OUTPUT in 'Get version and new branch' step.

6. **github-env-injection** (.github/workflows/rollback-release.yml): Sanitized NEW_BRANCH with `printf '%s' | tr -d '\n\r'` before writing to $GITHUB_OUTPUT in 'Prepare mergeback branch' step.

7. **github-env-injection** (.github/actions/prepare-test/action.yml): Sanitized version variable (derived from user-controlled $VERSION input) with `printf '%s' | tr -d '\n\r'` before writing tools-url to $GITHUB_OUTPUT.

