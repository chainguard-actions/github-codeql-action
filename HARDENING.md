<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.7

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.7** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'Determine URL' step of .github/actions/prepare-test/action.yml, the shell variable `$version` is derived from `inputs.version` (via the env var `$VERSION`) using backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``), and then written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). This occurs in two branches: one for 'nightly' versions and one for 'stable' versions. An attacker who controls the `version` input could inject newline characters to add arbitrary key=value pairs into `$GITHUB_OUTPUT`, potentially overwriting subsequent step outputs. The unsanitized writes are:
  `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:60`
- `.github/actions/prepare-test/action.yml:63`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed the github-env-injection finding in .github/actions/prepare-test/action.yml. In both the 'nightly' and 'stable' branches, the `version` variable (derived from user-controlled `inputs.version`) was written directly to `$GITHUB_OUTPUT` without sanitization. The fix introduces a `raw_version` variable to capture the sed output, then sanitizes it with `printf '%s' "$raw_version" | tr -d '\n\r'` before assigning to `version`. This prevents newline injection attacks that could add arbitrary key=value pairs to `$GITHUB_OUTPUT`. Also quoted `"$GITHUB_OUTPUT"` for correctness.

