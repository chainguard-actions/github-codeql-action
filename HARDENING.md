<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `inputs.version` value is mapped to the `VERSION` env var, then processed via `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` and written directly to `$GITHUB_OUTPUT` without the required `printf '%s' ... | tr -d '\n\r'` sanitization step. An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT. The two offending lines are:
- `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
- `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in `.github/actions/prepare-test/action.yml` at lines 67 and 70. The `version` variable was derived from the attacker-controlled `inputs.version` via sed and written directly to $GITHUB_OUTPUT without sanitization. Fixed by: (1) replacing backtick command substitution with `$(...)`, (2) piping through `tr -d '\n\r'` to strip newlines before the value is used in the echo commands that write to GITHUB_OUTPUT, and (3) quoting `"$GITHUB_OUTPUT"` as a best practice. The sanitization prevents an attacker from injecting arbitrary key=value pairs into GITHUB_OUTPUT via newlines in the version input.

