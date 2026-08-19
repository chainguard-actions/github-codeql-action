<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.25.5

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.25.5** was hardened automatically. 85 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — all pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__all-platform-bundle.yml:72`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/github-script@v8, actions/upload-artifact@v7 — all pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__analysis-kinds.yml:60`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — all pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__analyze-ref-input.yml:55`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__autobuild-action.yml:48`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__autobuild-direct-tracing-with-working-dir.yml:54`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__autobuild-working-dir.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__build-mode-autobuild.yml:52`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__build-mode-manual.yml:55`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__build-mode-none.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__build-mode-rollback.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__bundle-from-nightly.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/upload-artifact@v7, actions/download-artifact@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__bundle-from-toolcache.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/upload-artifact@v7, actions/download-artifact@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__bundle-toolcache.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/upload-artifact@v7, actions/github-script@v8, actions/download-artifact@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__bundle-zstd.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/github-script@v8, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__config-export.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__config-input.yml:36`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__cpp-deptrace-disabled.yml:43`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__cpp-deptrace-enabled-on-macos.yml:43`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__cpp-deptrace-enabled.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/github-script@v8, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__diagnostics-export.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/github-script@v8, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__export-file-baseline-information.yml:62`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__extractor-ram-threads.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__global-proxy.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-custom-queries.yml:57`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/github-script@v8, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-indirect-tracing-workaround-diagnostic.yml:49`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-indirect-tracing-workaround-no-file-program.yml:49`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-indirect-tracing-workaround.yml:47`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-tracing-autobuilder.yml:65`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-tracing-custom-build-steps.yml:65`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__go-tracing-legacy-workflow.yml:65`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 across multiple jobs — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__go.yml:20`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__init-with-registries.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__javascript-source-root.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__job-run-uuid-sarif.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__language-aliases.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__local-bundle.yml:55`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:92`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__overlay-init-fallback.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v7, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__packaging-codescanning-config-inputs-js.yml:65`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v7, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__packaging-config-inputs-js.yml:63`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v7, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__packaging-config-js.yml:63`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v7, actions/github-script@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__packaging-inputs-js.yml:63`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/upload-artifact@v7 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__remote-config.yml:57`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__resolve-environment-action.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest (ruby/setup-ruby is correctly SHA-pinned).

Locations:

- `.github/workflows/__rubocop-multi-language.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__ruby.yml:45`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__rust.yml:43`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__split-workflow.yml:67`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__start-proxy.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__submit-sarif-failure.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/__swift-autobuild.yml:37`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__swift-custom-build.yml:60`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__unset-environment.yml:58`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__upload-ref-sha-input.yml:57`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__upload-sarif.yml:72`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5, actions/setup-go@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/__with-checkout-path.yml:58`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/check-expected-release-files.yml:22`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/codeql.yml:34`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/codescanning-config-cli.yml:44`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/debug-artifacts-failure-safe.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/download-artifact@v8 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/debug-artifacts-safe.yml:38`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/upload-artifact@v7, actions/download-artifact@v8, github/codeql-action/upload-sarif@v4 — all pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/pr-checks.yml:40`

### unpinned-uses (severity: high)

Uses actions/checkout@v6 — pinned to a version tag, not a SHA digest.

Locations:

- `.github/workflows/prepare-release.yml:44`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/publish-immutable-action@v0.0.4 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/publish-immutable-action.yml:17`

### unpinned-uses (severity: high)

Uses actions/setup-python@v6, actions/checkout@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/python312-windows.yml:28`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/query-filters.yml:28`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/rebuild.yml:22`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/create-github-app-token@v3.2.0 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/rollback-release.yml:47`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-dotnet@v5 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/test-codeql-bundle-all.yml:33`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-python@v6, actions/setup-node@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/update-bundle.yml:30`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/create-github-app-token@v3.2.0 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/update-release-branch.yml:38`

### unpinned-uses (severity: high)

Uses actions/setup-python@v6, actions/checkout@v6 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:22`

### unpinned-uses (severity: high)

Uses actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/create-github-app-token@v3.2.0 — pinned to version tags, not SHA digests.

Locations:

- `.github/workflows/post-release-mergeback.yml:38`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is directly interpolated inside a run: shell command string: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any ${{ }} expression is substituted before the shell sees the command, enabling injection if the value contains shell metacharacters.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, ${{ fromJson(steps.analysis.outputs.db-locations).csharp }}, ${{ runner.temp }}, and other ${{ }} expressions are directly interpolated inside run: shell command strings, e.g. `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`. Step outputs are workflow-controllable and must not be interpolated directly in shell.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:141`

### script-injection (severity: high)

Sub-rule (a): ${{ runner.temp }} is directly interpolated inside run: shell command strings: `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:50`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, and ${{ steps.proxy.outputs.proxy_urls }} are directly interpolated inside run: shell command strings, e.g. `echo "${{ steps.proxy.outputs.proxy_host }}"`). Step outputs are workflow-controllable and must not be interpolated directly in shell.

Locations:

- `.github/workflows/__start-proxy.yml:68`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }}, ${{ fromJson(steps.analysis.outputs.db-locations).csharp }}, and other ${{ }} expressions are directly interpolated inside run: shell command strings, e.g. `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`).

Locations:

- `.github/workflows/__unset-environment.yml:91`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is directly interpolated inside a run: shell command string: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`

Locations:

- `.github/workflows/__ruby.yml:60`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).rust }} is directly interpolated inside a run: shell command string: `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`

Locations:

- `.github/workflows/__rust.yml:58`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is directly interpolated inside a run: shell command string: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`

Locations:

- `.github/workflows/__swift-autobuild.yml:57`

### script-injection (severity: high)

Sub-rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is directly interpolated inside a run: shell command string: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`

Locations:

- `.github/workflows/__swift-custom-build.yml:93`

### script-injection (severity: high)

Sub-rule (a): ${{ github.repository }}, ${{ env.REF_NAME }}, and ${{ env.MAJOR_VERSION }} are directly interpolated inside run: shell command strings in two steps: `--repository-nwo ${{ github.repository }}`, `'${{ env.REF_NAME }}'`, `'releases/${{ env.MAJOR_VERSION }}'`. The github.* and env.* contexts flow through YAML template substitution before the shell sees them.

Locations:

- `.github/workflows/update-release-branch.yml:63`
- `.github/workflows/update-release-branch.yml:103`

### script-injection (severity: high)

Sub-rule (a): ${{ steps.versions.outputs.version }}, ${{ steps.versions.outputs.major_version }}, ${{ steps.versions.outputs.latest_tag }}, ${{ steps.branches.outputs.backport_source_branch }}, and ${{ steps.branches.outputs.backport_target_branches }} are directly interpolated inside a run: shell command string (echo statements). Step outputs are workflow-controllable and must not be interpolated directly in shell.

Locations:

- `.github/workflows/prepare-release.yml:68`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed all unpinned action references across 70+ workflow files by pinning to full SHA digests. Actions pinned: actions/checkout@v6→d23441a4, actions/setup-dotnet@v5→26b0ec14, actions/setup-go@v6→924ae3a1, actions/upload-artifact@v7→043fb46d, actions/download-artifact@v8→3e5f45b2, actions/github-script@v8→ed597411, actions/setup-node@v6→249970729, actions/setup-python@v6→ece7cb06, actions/setup-java@v5→03ad4de0, actions/create-github-app-token@v3.2.0→bcd2ba49, actions/publish-immutable-action@v0.0.4→4bc8754f, github/codeql-action/upload-sarif@v4→e4fba868. Fixed all 11 script-injection findings by moving ${{ }} expressions from run: shell strings into step env: blocks, including runner.temp, fromJson(steps.analysis.outputs.db-locations).*, steps.proxy.outputs.*, github.repository, env.REF_NAME, env.MAJOR_VERSION, steps.versions.outputs.*, and steps.branches.outputs.* references.

