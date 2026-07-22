<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.3** was hardened automatically. 10 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` is directly interpolated inside a `run:` shell command string. The offending line is: `run: mv ${{ runner.temp }}/results/javascript.sarif ${{ runner.temp }}/results/javascript.sarif.json`. Any `${{ ... }}` expression in a run: block is a script-injection risk regardless of context.

Locations:

- `.github/workflows/__upload-sarif.yml:148`

### script-injection (severity: high)

Sub-rule (a): `${{ runner.temp }}` is directly interpolated inside `run:` shell command strings. Offending lines include: `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and `if [[ -f "${{ runner.temp }}/customDbLocation/javascript/a-file-to-clean-up.txt" ]]`.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:48`
- `.github/workflows/__cleanup-db-cluster-dir.yml:57`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`, `${{ fromJson(steps.analysis.outputs.db-locations).swift }}`, and `${{ runner.temp }}` are directly interpolated inside `run:` shell command strings. Offending lines include: `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` and `SWIFT_DB=${{ fromJson(steps.analysis.outputs.db-locations).swift }}`.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:131`
- `.github/workflows/__multi-language-autodetect.yml:175`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` is directly interpolated inside a `run:` shell command string. Offending line: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`.

Locations:

- `.github/workflows/__ruby.yml:76`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` is directly interpolated inside a `run:` shell command string. Offending line: `RUST_DB="${{ fromJson(steps.analysis.outputs.db-locations).rust }}"`.

Locations:

- `.github/workflows/__rust.yml:77`

### script-injection (severity: high)

Sub-rule (a): `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` are directly interpolated inside a `run:` shell command string. Offending lines: `echo "${{ steps.proxy.outputs.proxy_host }}"` etc.

Locations:

- `.github/workflows/__start-proxy.yml:62`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` is directly interpolated inside a `run:` shell command string. Offending line: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-autobuild.yml:60`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` is directly interpolated inside a `run:` shell command string. Offending line: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-custom-build.yml:87`

### script-injection (severity: high)

Sub-rule (a): `${{ fromJson(steps.analysis.outputs.db-locations).cpp }}` is directly interpolated inside a `run:` shell command string. Offending line: `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`.

Locations:

- `.github/workflows/__unset-environment.yml:88`

### script-injection (severity: high)

Sub-rule (a): `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, and `${{ steps.versions.outputs.latest_tag }}` are directly interpolated inside a `run:` shell command string. Offending lines: `echo 'version: ${{ steps.versions.outputs.version }}'` etc.

Locations:

- `.github/workflows/prepare-release.yml:78`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection

**Notes:**

Fixed all 10 script-injection findings across 9 workflow files by moving ${{ }} expressions from run: shell strings into step-level env: blocks:

1. __upload-sarif.yml (line 148): Moved `${{ runner.temp }}` into env as RUNNER_TEMP.

2. __cleanup-db-cluster-dir.yml (lines 48, 57): Moved `${{ runner.temp }}` into env as RUNNER_TEMP for both the 'Add a file' and 'Validate file cleaned up' steps.

3. __multi-language-autodetect.yml (lines 131, 175): Moved `${{ fromJson(steps.analysis.outputs.db-locations).* }}` for all languages (cpp, csharp, go, java, javascript, python, ruby, swift) and `${{ runner.temp }}` into env blocks for both the 'all languages' and 'Swift on macOS' steps.

4. __ruby.yml (line 76): Moved `${{ fromJson(steps.analysis.outputs.db-locations).ruby }}` into env as DB_LOCATIONS_RUBY.

5. __rust.yml (line 77): Moved `${{ fromJson(steps.analysis.outputs.db-locations).rust }}` into env as DB_LOCATIONS_RUST.

6. __start-proxy.yml (line 62): Moved `${{ steps.proxy.outputs.proxy_host }}`, `${{ steps.proxy.outputs.proxy_port }}`, and `${{ steps.proxy.outputs.proxy_urls }}` into env as PROXY_HOST, PROXY_PORT, PROXY_URLS.

7. __swift-autobuild.yml (line 60): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into env as DB_LOCATIONS_SWIFT.

8. __swift-custom-build.yml (line 87): Moved `${{ fromJson(steps.analysis.outputs.db-locations).swift }}` into env as DB_LOCATIONS_SWIFT.

9. __unset-environment.yml (line 88): Moved `${{ fromJson(steps.analysis.outputs.db-locations).* }}` for cpp, csharp, go, java, javascript, python into env block.

10. prepare-release.yml (line 78): Moved `${{ steps.versions.outputs.version }}`, `${{ steps.versions.outputs.major_version }}`, `${{ steps.versions.outputs.latest_tag }}`, `${{ steps.branches.outputs.backport_source_branch }}`, and `${{ steps.branches.outputs.backport_target_branches }}` into env block.

