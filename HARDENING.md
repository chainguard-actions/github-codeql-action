<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `VERSION` env var is set from `${{ inputs.version }}` (untrusted input). Inside the `run:` block, a local variable `version` is derived from `$VERSION` via backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) and then written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into `$GITHUB_OUTPUT`, potentially overwriting subsequent step outputs. The offending lines are:
  - `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  - `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In `.github/actions/prepare-test/action.yml`, sanitized the `version` variable (derived from user-controlled `inputs.version`) before writing to `$GITHUB_OUTPUT`. Changed backtick command substitution to `$(...)` and added `| tr -d '\n\r'` to strip newline/carriage-return characters from the version value in both the `nightly` and `stable` branches. Also quoted `"$GITHUB_OUTPUT"` for correctness. This prevents an attacker from injecting arbitrary key=value pairs into `$GITHUB_OUTPUT` via newlines in the version input.

