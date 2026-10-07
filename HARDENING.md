<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.8

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.8** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'get-url' step, the env var VERSION is set from inputs.version (an attacker-controlled composite-action input). The script derives a local variable `version` from it via backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) and then writes it directly to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). A malicious value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT, poisoning downstream step outputs. The two offending lines are:
  echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT
  echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in hardened/action/.github/actions/prepare-test/action.yml at lines 67 and 70. The `version` variable was derived from the attacker-controlled `$VERSION` input via sed and written directly to $GITHUB_OUTPUT without sanitization. Fixed by: (1) capturing the raw sed output into `raw_version`, (2) sanitizing with `printf '%s' "$raw_version" | tr -d '\n\r'` into `version` as a separate step (not nested, to avoid swallowing exit codes under errexit), and (3) quoting `"$GITHUB_OUTPUT"` in the redirections. Both the nightly and stable branches were fixed.

