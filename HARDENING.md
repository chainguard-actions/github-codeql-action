<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.38.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.38.3** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `VERSION` env var (sourced from `inputs.version`) is processed via sed and the result (`$version`) is written to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker controlling the `version` input could inject newline characters to poison `GITHUB_OUTPUT` and set arbitrary output variables. The offending lines are:
  - `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` followed by
  - `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  - `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
The fix requires sanitizing `$version` before writing: `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` and then using `$safe_version` in the echo.

Locations:

- `.github/actions/prepare-test/action.yml:66`
- `.github/actions/prepare-test/action.yml:69`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In `.github/actions/prepare-test/action.yml`, added sanitization of the `$version` variable before writing to `$GITHUB_OUTPUT`. In both the `nightly` and `stable` branches, added `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` after the sed command, then replaced `$version` with `$safe_version` in the echo statements. Also quoted `"$GITHUB_OUTPUT"` for correctness. This prevents newline injection via the `version` input from poisoning `GITHUB_OUTPUT`.

