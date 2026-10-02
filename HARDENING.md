<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.36.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.36.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'Determine URL' step, the env var VERSION is set from inputs.version (untrusted input). A derived variable `version` is computed via backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) and then written directly to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled value for inputs.version containing newlines could inject arbitrary key=value pairs into the GitHub output environment file. Offending lines:
  echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT
  echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In the 'Determine URL' step of .github/actions/prepare-test/action.yml, the `version` variable (derived from untrusted `inputs.version` via sed) is now sanitized with `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` before being written to $GITHUB_OUTPUT. This is done in both the nightly and stable branches of the conditional. The sanitized `safe_version` variable is used in the echo commands instead of the raw `$version`, preventing newline injection attacks. The $GITHUB_OUTPUT references are also now properly quoted.

