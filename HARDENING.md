<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.39.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.39.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `inputs.version` value is mapped to the `VERSION` environment variable and then a derived local variable `$version` (extracted via backtick command substitution: `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) is written directly to `$GITHUB_OUTPUT` without the required `tr -d '\n\r'` sanitization step. Specifically, lines 67 and 70 write `echo "tools-url=https://.../$version/$artifact_name" >> $GITHUB_OUTPUT` where `$version` is attacker-controlled via `inputs.version`. A malicious caller could inject newlines into the output to poison subsequent steps that read `tools-url`.

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in .github/actions/prepare-test/action.yml. The $version variable (derived from inputs.version via sed) was being written directly to $GITHUB_OUTPUT without newline sanitization. Fixed by: (1) capturing the raw sed output into raw_version, (2) sanitizing with 'printf "%s" "$raw_version" | tr -d '\n\r'' before assigning to version, applied to both the nightly and stable branches. Also quoted $GITHUB_OUTPUT references.

