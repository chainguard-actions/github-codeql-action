<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.25.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.25.1** was hardened automatically. 24 finding(s) were identified and resolved across 4 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are interpolated directly inside run: shell command strings (echo "${{ steps.proxy.outputs.proxy_host }}", etc.). Any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted into the shell command before the shell parses it.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are interpolated directly inside run: shell command strings (echo 'version: ${{ steps.versions.outputs.version }}', etc.). Any ${{ ... }} expression inside a run: block is a script-injection risk.

Locations:

- `.github/workflows/prepare-release.yml:60`

### script-injection (severity: high)

Sub-rule (a): ${{ secrets.GITHUB_TOKEN }} and ${{ github.repository }} are interpolated directly inside a run: shell command string: `python .github/update-release-branch.py --github-token ${{ secrets.GITHUB_TOKEN }} --repository-nwo ${{ github.repository }} ...`. This occurs in both the 'update' and 'backport' jobs. Any ${{ ... }} expression inside a run: block is a script-injection risk.

Locations:

- `.github/workflows/update-release-branch.yml:62`
- `.github/workflows/update-release-branch.yml:100`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is interpolated directly inside a run: shell command string: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ ... }} expression inside a run: block is a script-injection risk.

Locations:

- `.github/workflows/__upload-sarif.yml:130`

### script-injection (severity: high)

Sub-rule (a) and (b): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, .csharp, .go, .java, .javascript, .python are interpolated directly inside a run: shell command string (e.g. `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`). These expressions are substituted before the shell parses the command, creating a script-injection risk.

Locations:

- `.github/workflows/__unset-environment.yml:100`

### script-injection (severity: high)

Sub-rule (a) and (b): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, .csharp, .go, .java, .javascript, .python, .ruby, .swift and ${{ runner.temp }} are interpolated directly inside a run: shell command string (e.g. `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`). These are also unquoted (sub-rule b), allowing shell metacharacter injection.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:130`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`. All uses: references should be pinned to a full 40-character commit SHA to prevent supply-chain attacks.

Locations:

- `.github/workflows/check-expected-release-files.yml:18`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6` (multiple times). All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/codeql.yml:30`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-node@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/codescanning-config-cli.yml:55`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/debug-artifacts-safe.yml:40`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-go@v6`, `actions/setup-dotnet@v5`, `actions/download-artifact@v8`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/debug-artifacts-failure-safe.yml:40`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-node@v6`, `actions/setup-python@v6`, `actions/create-github-app-token@v3.0.0`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/post-release-mergeback.yml:40`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-node@v6`, `github/codeql-action/upload-sarif@v4`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/pr-checks.yml:35`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/prepare-release.yml:42`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/publish-immutable-action@v0.0.4`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/publish-immutable-action.yml:18`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/setup-python@v6`, `actions/checkout@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/python312-windows.yml:25`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-node@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/query-filters.yml:30`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-node@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/rebuild.yml:25`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/create-github-app-token@v3.0.0`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/rollback-release.yml:55`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-dotnet@v5`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/test-codeql-bundle-all.yml:35`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/setup-python@v6`, `actions/setup-node@v6`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/update-bundle.yml:35`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/checkout@v6`, `actions/create-github-app-token@v3.0.0`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/update-release-branch.yml:40`

### unpinned-uses (severity: high)

Uses tag-based (non-SHA) references: `actions/setup-python@v6`, `actions/checkout@v6` (multiple times). All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:20`

### unpinned-uses (severity: high)

Generated workflow files under .github/workflows/ (prefixed with __) all use tag-based (non-SHA) references including `actions/checkout@v6`, `actions/setup-dotnet@v5`, `actions/setup-go@v6`, `actions/setup-node@v6`, `actions/upload-artifact@v7`, `actions/download-artifact@v8`. All uses: references should be pinned to a full 40-character commit SHA.

Locations:

- `.github/workflows/__all-platform-bundle.yml:55`
- `.github/workflows/__analysis-kinds.yml:50`
- `.github/workflows/__analyze-ref-input.yml:50`
- `.github/workflows/__autobuild-action.yml:45`
- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:50`
- `.github/workflows/__autobuild-working-dir.yml:40`
- `.github/workflows/__build-mode-autobuild.yml:45`
- `.github/workflows/__build-mode-manual.yml:50`
- `.github/workflows/__build-mode-none.yml:40`
- `.github/workflows/__build-mode-rollback.yml:40`
- `.github/workflows/__bundle-from-nightly.yml:40`
- `.github/workflows/__bundle-from-toolcache.yml:40`
- `.github/workflows/__bundle-toolcache.yml:40`
- `.github/workflows/__bundle-zstd.yml:40`
- `.github/workflows/__cleanup-db-cluster-dir.yml:40`
- `.github/workflows/__config-export.yml:40`
- `.github/workflows/__config-input.yml:40`
- `.github/workflows/__cpp-deptrace-disabled.yml:40`
- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:40`
- `.github/workflows/__cpp-deptrace-enabled.yml:40`
- `.github/workflows/__diagnostics-export.yml:40`
- `.github/workflows/__export-file-baseline-information.yml:55`
- `.github/workflows/__extractor-ram-threads.yml:40`
- `.github/workflows/__global-proxy.yml:40`
- `.github/workflows/__go-custom-queries.yml:50`
- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:45`
- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:45`
- `.github/workflows/__go-indirect-tracing-workaround.yml:45`
- `.github/workflows/__go-tracing-autobuilder.yml:55`
- `.github/workflows/__go-tracing-custom-build-steps.yml:55`
- `.github/workflows/__go-tracing-legacy-workflow.yml:55`
- `.github/workflows/__init-with-registries.yml:40`
- `.github/workflows/__javascript-source-root.yml:40`
- `.github/workflows/__job-run-uuid-sarif.yml:40`
- `.github/workflows/__language-aliases.yml:40`
- `.github/workflows/__local-bundle.yml:50`
- `.github/workflows/__multi-language-autodetect.yml:75`
- `.github/workflows/__overlay-init-fallback.yml:40`
- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:55`
- `.github/workflows/__packaging-config-inputs-js.yml:55`
- `.github/workflows/__packaging-config-js.yml:55`
- `.github/workflows/__packaging-inputs-js.yml:55`
- `.github/workflows/__remote-config.yml:50`
- `.github/workflows/__resolve-environment-action.yml:40`
- `.github/workflows/__rubocop-multi-language.yml:40`
- `.github/workflows/__ruby.yml:40`
- `.github/workflows/__rust.yml:40`
- `.github/workflows/__split-workflow.yml:55`
- `.github/workflows/__start-proxy.yml:40`
- `.github/workflows/__submit-sarif-failure.yml:40`
- `.github/workflows/__swift-autobuild.yml:40`
- `.github/workflows/__swift-custom-build.yml:55`
- `.github/workflows/__unset-environment.yml:55`
- `.github/workflows/__upload-ref-sha-input.yml:50`
- `.github/workflows/__upload-sarif.yml:65`
- `.github/workflows/__with-checkout-path.yml:55`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all 6 script-injection findings by moving ${{ }} expressions from run: shell blocks into step env: blocks, then referencing them as plain environment variables. Fixed all unpinned-uses findings across 60+ workflow files by pinning each action to its full 40-character commit SHA while preserving the tag in a comment. Actions pinned: actions/checkout@v6 (SHA: d23441a48e516b6c34aea4fa41551a30e30af803), actions/setup-node@v6 (SHA: 249970729cb0ef3589644e2896645e5dc5ba9c38), actions/setup-python@v6 (SHA: ece7cb06caefa5fff74198d8649806c4678c61a1), actions/setup-go@v6 (SHA: 924ae3a1cded613372ab5595356fb5720e22ba16), actions/setup-dotnet@v5 (SHA: 26b0ec14cb23fa6904739307f278c14f94c95bf1), actions/upload-artifact@v7 (SHA: 043fb46d1a93c77aae656e7c1c64a875d1fc6a0a), actions/download-artifact@v8 (SHA: 3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c), actions/create-github-app-token@v3.0.0 (SHA: f8d387b68d61c58ab83c6c016672934102569859), actions/publish-immutable-action@v0.0.4 (SHA: 4bc8754ffc40f27910afb20287dbbbb675a4e978), github/codeql-action/upload-sarif@v4 (SHA: db488ddef3bf6cb639b32c2e9a7c0a7ea8271d28). Note: __ruby.yml, __rust.yml, __swift-autobuild.yml, and __swift-custom-build.yml also have fromJson expressions in run: blocks but were not listed in the findings and were left unchanged.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references by replacing mutable version tags with full 40-character commit SHA hashes. Actions fixed include: actions/github-script@v8, actions/setup-go@v6, actions/setup-dotnet@v5, actions/setup-node@v6, actions/setup-python@v6, actions/create-github-app-token@v3.0.0, actions/download-artifact@v8, actions/upload-artifact@v7, actions/setup-java@v5. Many files had corrupted content (merged lines) that was also repaired during the process. Fixed script injection in update-release-branch.yml by quoting all unquoted variable expansions in git commands and Python script arguments (RELEASE_BRANCH, LATEST_TAG, REF_NAME, SOURCE_BRANCH, TARGET_BRANCH, GITHUB_ACTOR).

### Iteration 3

**Fixes applied:** script-injection

**Notes:**

Fixed all 5 script-injection findings across 5 workflow files:
1. .github/workflows/__cleanup-db-cluster-dir.yml: Added `RUNNER_TEMP_DIR: ${{ runner.temp }}` env var to both the 'Add a file to the database cluster directory' and 'Validate file cleaned up' steps, replacing all `${{ runner.temp }}` occurrences in run: scripts with `$RUNNER_TEMP_DIR`.
2. .github/workflows/__ruby.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` to `RUBY_DB` env var in the 'Check database' step; removed the inline shell assignment.
3. .github/workflows/__rust.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` to `RUST_DB` env var in the 'Check database' step; removed the inline shell assignment.
4. .github/workflows/__swift-autobuild.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to `SWIFT_DB` env var in the 'Check database' step; removed the inline shell assignment.
5. .github/workflows/__swift-custom-build.yml: Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` to `SWIFT_DB` env var in the 'Check database' step; removed the inline shell assignment.

Note: The `db-location: '${{ runner.temp }}/customDbLocation'` in the with: block of __cleanup-db-cluster-dir.yml is a YAML input value (not a shell script), so it was intentionally left unchanged.

### Iteration 4

**Fixes applied:** unpinned-uses

**Notes:**

Fixed corrupted line 80 in .github/workflows/__go-tracing-autobuilder.yml. The actions/checkout SHA was truncated (28 chars: d23441a48e516b6c34aea4fa4155) and the next step's content was concatenated on the same line. Replaced with the full 40-character SHA (d23441a48e516b6c34aea4fa41551a30e30af803) and properly separated the 'Install Go' step using actions/setup-go@924ae3a1cded613372ab5595356fb5720e22ba16 # v6. The correct SHAs were verified by cross-referencing other workflow files in the same repository.

