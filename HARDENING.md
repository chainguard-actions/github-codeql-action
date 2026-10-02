<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.0

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.0** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In `.github/actions/prepare-test/action.yml`, the `$VERSION` environment variable (sourced from `inputs.version`) is processed via `sed` and the resulting `$version` value is written directly to `$GITHUB_OUTPUT` without sanitization. An attacker who controls the `inputs.version` value could inject newline characters to add arbitrary key=value pairs to GITHUB_OUTPUT. The offending lines are:
```bash
version=`echo "$VERSION" | sed -e 's/^.*\-//'`
echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT
```
and similarly for the `stable` branch. The required sanitization step (`safe=$(printf '%s' "$version" | tr -d '\n\r')`) is absent before each write.

Locations:

- `.github/actions/prepare-test/action.yml:54`
- `.github/actions/prepare-test/action.yml:57`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed two instances of unsanitized writes to $GITHUB_OUTPUT in `.github/actions/prepare-test/action.yml`. After each `version=` assignment (lines 54 and 57), added `safe=$(printf '%s' "$version" | tr -d '\n\r')` to strip newline/carriage-return characters, then replaced `$version` with `$safe` in the echo commands. Also added proper quoting around `$GITHUB_OUTPUT` in both echo commands.

