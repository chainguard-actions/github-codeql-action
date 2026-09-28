<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.38.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.38.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `$version` variable is derived from `inputs.version` (via the `$VERSION` env var and a `sed` command) and then written directly to `$GITHUB_OUTPUT` without sanitization. An attacker who controls the `version` input could inject newline characters to write arbitrary key-value pairs into `$GITHUB_OUTPUT`. The two unsanitized writes are:
- `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
- `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

The fix is to sanitize `$version` before the write: `safe_version=$(printf '%s' "$version" | tr -d '\n\r')`.

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed two unsanitized writes to $GITHUB_OUTPUT in `.github/actions/prepare-test/action.yml`. After each `version=` assignment (derived from `$VERSION` via `sed`), added `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` to strip newline and carriage return characters. Replaced `$version` with `$safe_version` in both `echo "tools-url=..." >> $GITHUB_OUTPUT` statements, and also quoted `"$GITHUB_OUTPUT"` for best practice.

