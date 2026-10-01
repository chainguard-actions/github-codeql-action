<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.38.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.38.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `$version` variable is derived from `inputs.version` (via backtick command substitution: `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) and then written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker who controls `inputs.version` could inject newline characters to append arbitrary key=value pairs to `$GITHUB_OUTPUT`, potentially overwriting subsequent outputs. The two affected lines are:

- `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
- `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In `.github/actions/prepare-test/action.yml`, added `version=$(printf '%s' "$version" | tr -d '\n\r')` after each `version=\`echo "$VERSION" | sed ...\`` computation in both the 'nightly' and 'stable' branches. This sanitizes the user-controlled `version` value by stripping newline and carriage return characters before it is embedded in the URL written to `$GITHUB_OUTPUT`. Also quoted `"$GITHUB_OUTPUT"` for correctness.

