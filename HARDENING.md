<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.36.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.36.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `$version` variable is derived from `inputs.version` (via the `VERSION` env var) and written directly to `$GITHUB_OUTPUT` without sanitization (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key-value pairs into the GitHub output context. The offending lines are:
  - `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  - `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:66`
- `.github/actions/prepare-test/action.yml:69`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in .github/actions/prepare-test/action.yml. The $version variable (derived from inputs.version via the VERSION env var) was written directly to $GITHUB_OUTPUT without sanitization. Fixed by: (1) storing the sed output in a raw_version variable, (2) sanitizing it with `printf '%s' "$raw_version" | tr -d '\n\r'` before assigning to version, and (3) quoting $GITHUB_OUTPUT with double quotes. This prevents newline injection attacks where an attacker-controlled version input could inject arbitrary key-value pairs into the GitHub output context.

