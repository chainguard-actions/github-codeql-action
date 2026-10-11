<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.38.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `inputs.version` value is placed into the `VERSION` env var and then processed via sed into a `$version` shell variable. This derived value is written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into the GitHub output context. Offending lines:
  - Line 67: `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  - Line 70: `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in `.github/actions/prepare-test/action.yml` at lines 67 and 70. The `$version` variable derived from `inputs.version` via `sed` was being written directly to `$GITHUB_OUTPUT` without sanitization. Fixed by: (1) storing the raw sed output in `raw_version`, (2) sanitizing with `printf '%s' "$raw_version" | tr -d '\n\r'` into `version` (using a two-step approach to preserve exit codes under errexit), and (3) quoting `$GITHUB_OUTPUT` properly. Both the nightly and stable code paths were fixed.

