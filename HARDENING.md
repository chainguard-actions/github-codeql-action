<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.1** was hardened automatically. 21 finding(s) were identified and resolved across 3 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

actions/checkout@v6 is referenced by tag, not a full 40-character SHA commit hash. All external action references in this file use mutable tags instead of pinned SHAs, making the workflow vulnerable to supply-chain attacks if the tag is moved.

Locations:

- `.github/workflows/codeql.yml:30`
- `.github/workflows/codeql.yml:88`
- `.github/workflows/codeql.yml:116`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-node@v6, github/codeql-action/upload-sarif@v4. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/pr-checks.yml:28`
- `.github/workflows/pr-checks.yml:32`
- `.github/workflows/pr-checks.yml:36`
- `.github/workflows/pr-checks.yml:74`
- `.github/workflows/pr-checks.yml:78`
- `.github/workflows/pr-checks.yml:100`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-node@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/rebuild.yml:22`
- `.github/workflows/rebuild.yml:26`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/create-github-app-token@v3.0.0. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/rollback-release.yml:42`
- `.github/workflows/rollback-release.yml:120`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-python@v6, actions/setup-node@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/update-bundle.yml:32`
- `.github/workflows/update-bundle.yml:40`
- `.github/workflows/update-bundle.yml:44`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/create-github-app-token@v3.0.0. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/update-release-branch.yml:30`
- `.github/workflows/update-release-branch.yml:78`
- `.github/workflows/update-release-branch.yml:82`

### unpinned-uses (severity: high)

Unpinned action reference: actions/checkout@v6. Uses a mutable tag instead of a pinned SHA commit.

Locations:

- `.github/workflows/prepare-release.yml:38`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/create-github-app-token@v3.0.0. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/post-release-mergeback.yml:32`
- `.github/workflows/post-release-mergeback.yml:33`
- `.github/workflows/post-release-mergeback.yml:34`
- `.github/workflows/post-release-mergeback.yml:116`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-node@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/codescanning-config-cli.yml:44`
- `.github/workflows/codescanning-config-cli.yml:46`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/debug-artifacts-failure-safe.yml:30`
- `.github/workflows/debug-artifacts-failure-safe.yml:34`
- `.github/workflows/debug-artifacts-failure-safe.yml:37`
- `.github/workflows/debug-artifacts-failure-safe.yml:60`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/debug-artifacts-safe.yml:26`
- `.github/workflows/debug-artifacts-safe.yml:30`
- `.github/workflows/debug-artifacts-safe.yml:33`
- `.github/workflows/debug-artifacts-safe.yml:56`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/publish-immutable-action@v0.0.4. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/publish-immutable-action.yml:18`
- `.github/workflows/publish-immutable-action.yml:22`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/setup-python@v6, actions/checkout@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/python312-windows.yml:20`
- `.github/workflows/python312-windows.yml:22`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-node@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/query-filters.yml:18`
- `.github/workflows/query-filters.yml:20`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/checkout@v6, actions/setup-dotnet@v5. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/test-codeql-bundle-all.yml:22`
- `.github/workflows/test-codeql-bundle-all.yml:26`

### unpinned-uses (severity: high)

Multiple unpinned action references: actions/setup-python@v6, actions/checkout@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:18`
- `.github/workflows/update-supported-enterprise-server-versions.yml:20`
- `.github/workflows/update-supported-enterprise-server-versions.yml:22`

### unpinned-uses (severity: high)

Unpinned action reference: actions/checkout@v6. Uses a mutable tag instead of a pinned SHA commit.

Locations:

- `.github/workflows/check-expected-release-files.yml:14`

### unpinned-uses (severity: high)

Multiple unpinned action references in auto-generated PR check workflow: actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/__upload-sarif.yml:55`
- `.github/workflows/__upload-sarif.yml:57`
- `.github/workflows/__upload-sarif.yml:61`

### unpinned-uses (severity: high)

Multiple unpinned action references in auto-generated PR check workflow: actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6. All use mutable tags instead of pinned SHA commits.

Locations:

- `.github/workflows/__all-platform-bundle.yml:52`
- `.github/workflows/__all-platform-bundle.yml:54`
- `.github/workflows/__all-platform-bundle.yml:58`

### script-injection (severity: high)

Sub-rule (a): The run: block directly interpolates ${{ runner.temp }} expressions inside a shell command: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ ... }} expression inside a run: block is a script-injection risk because the value is substituted by the Actions template engine before the shell parses it.

Locations:

- `.github/workflows/__upload-sarif.yml:146`

### script-injection (severity: high)

Sub-rule (a): The 'Print release information' run: block directly interpolates ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} expressions inside shell echo commands. These steps.*.outputs.* values are workflow-controllable and are substituted by the Actions template engine before the shell parses them, enabling script injection.

Locations:

- `.github/workflows/prepare-release.yml:57`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all 19 unpinned-uses findings across workflow files: codeql.yml, pr-checks.yml, rebuild.yml, rollback-release.yml, update-bundle.yml, update-release-branch.yml, prepare-release.yml, post-release-mergeback.yml, codescanning-config-cli.yml, debug-artifacts-failure-safe.yml, debug-artifacts-safe.yml, publish-immutable-action.yml, python312-windows.yml, query-filters.yml, test-codeql-bundle-all.yml, update-supported-enterprise-server-versions.yml, check-expected-release-files.yml, __upload-sarif.yml, __all-platform-bundle.yml. All action references pinned to full 40-char SHA hashes with tag comments for readability. Fixed 2 script-injection findings: (1) __upload-sarif.yml line 146 - moved ${{ runner.temp }} from run: shell command to env: block as RUNNER_TEMP; (2) prepare-release.yml line 57 - moved all ${{ steps.*.outputs.* }} expressions from echo commands to env: block with plain env var references in the shell script.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 56 workflow files by pinning to full SHA commits: actions/checkout@v6→df4cb1c069e1874edd31b4311f1884172cec0e10, actions/setup-dotnet@v5→26b0ec14cb23fa6904739307f278c14f94c95bf1, actions/setup-go@v6→924ae3a1cded613372ab5595356fb5720e22ba16, actions/upload-artifact@v7→043fb46d1a93c77aae656e7c1c64a875d1fc6a0a, actions/github-script@v8→ed597411d8f924073f98dfc5c65a23a2325f34cd. Fixed script injection in update-release-branch.yml (moved secrets.GITHUB_TOKEN and github.repository from run: blocks to env: blocks) and __start-proxy.yml (moved steps.proxy.outputs.* expressions from run: block to env: block). Several files experienced corruption during editing which were detected and repaired.

### Iteration 3

**Fixes applied:** script-injection, github-env-injection, unpinned-uses

**Notes:**

Fixed all three finding categories:

1. script-injection: Moved all ${{ fromJson(steps.analysis.outputs.db-locations).* }} and ${{ runner.temp }} expressions out of run: blocks into env: blocks in 7 workflow files (__cleanup-db-cluster-dir.yml, __multi-language-autodetect.yml, __ruby.yml, __rust.yml, __swift-autobuild.yml, __swift-custom-build.yml, __unset-environment.yml). Shell scripts now use jq to parse the DB_LOCATIONS env var and reference RUNNER_TEMP_DIR instead of inline template expressions.

2. github-env-injection: In __build-mode-autobuild.yml, sanitized the YQ_PATH value before writing to $GITHUB_PATH using `printf '%s' "$YQ_PATH" | tr -d '\n\r'`.

3. unpinned-uses: Pinned all mutable tag references to full 40-character SHA hashes: actions/setup-java@v5 → @03ad4de0992f5dab5e18fcb136590ce7c4a0ac95, actions/setup-node@v6 → @249970729cb0ef3589644e2896645e5dc5ba9c38, actions/setup-python@v6 → @ece7cb06caefa5fff74198d8649806c4678c61a1. All original tags preserved as comments.

