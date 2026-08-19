<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.2** was hardened automatically. 2 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): ${{ ... }} expressions are directly interpolated inside run: shell commands. In __cleanup-db-cluster-dir.yml, `${{ runner.temp }}` is used directly in mkdir and touch commands. In __multi-language-autodetect.yml, `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` and similar are assigned directly to shell variables without quoting. In __ruby.yml, `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` is interpolated directly. In __rust.yml, `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` is interpolated directly. In __start-proxy.yml, `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` are echoed directly. In __swift-autobuild.yml and __swift-custom-build.yml, `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` is interpolated directly. In __unset-environment.yml, `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` and similar are interpolated directly. In __upload-sarif.yml, `${{ runner.temp }}` is used directly in a mv command. In prepare-release.yml, `${{ steps.versions.outputs.version }}` and other step outputs are echoed directly. In update-release-branch.yml, `${{ secrets.GITHUB_TOKEN }}`, `${{ github.repository }}`, `${{ env.REF_NAME }}`, and `${{ env.MAJOR_VERSION }}` are passed directly as CLI arguments in a run: block.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:63`
- `.github/workflows/__multi-language-autodetect.yml:130`
- `.github/workflows/__ruby.yml:63`
- `.github/workflows/__rust.yml:60`
- `.github/workflows/__start-proxy.yml:67`
- `.github/workflows/__swift-autobuild.yml:64`
- `.github/workflows/__swift-custom-build.yml:82`
- `.github/workflows/__unset-environment.yml:84`
- `.github/workflows/__upload-sarif.yml:130`
- `.github/workflows/prepare-release.yml:62`
- `.github/workflows/update-release-branch.yml:60`

### unpinned-uses (severity: high)

Action references use mutable tag-based refs instead of full 40-character SHA commit hashes, making them vulnerable to supply-chain attacks. Failing references include: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/upload-artifact@v7, actions/upload-artifact@v8, actions/download-artifact@v8, actions/github-script@v8, actions/create-github-app-token@v3.1.1, actions/publish-immutable-action@v0.0.4, github/codeql-action/upload-sarif@v4.

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

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses

**Notes:**

Fixed all script injection issues by moving ${{ }} expressions from run: shell commands into step env: blocks across 11 workflow files. Fixed all unpinned action references by replacing mutable tag-based refs with full 40-character SHA commit hashes across 70+ workflow files. Actions pinned: actions/checkout@v6, actions/setup-node@v6, actions/setup-python@v6, actions/setup-go@v6, actions/setup-dotnet@v5, actions/upload-artifact@v7, actions/download-artifact@v8, actions/github-script@v8, actions/create-github-app-token@v3.1.1, actions/publish-immutable-action@v0.0.4, github/codeql-action/upload-sarif@v4, and also actions/setup-java@v5 (found during verification). All ${{ }} expressions in run: blocks have been moved to env: blocks with descriptive variable names.

### Iteration 2

**Fixes applied:** unpinned-uses, github-env-injection

**Notes:**

1. Pinned `actions/setup-node@v6` to full SHA `249970729cb0ef3589644e2896645e5dc5ba9c38` and `actions/setup-python@v6` to full SHA `ece7cb06caefa5fff74198d8649806c4678c61a1` in `.github/actions/release-initialise/action.yml`, preserving the tag as a comment for readability. 2. In `.github/actions/prepare-test/action.yml`, added `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` after each `sed` extraction of `$version`, and used `$safe_version` in the `echo` commands writing to `$GITHUB_OUTPUT`, preventing newline injection via the `inputs.version` workflow input.

