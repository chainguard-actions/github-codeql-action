<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.38.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.38.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'Determine URL' step, the env var VERSION is set from inputs.version (untrusted input). A derived variable `version` is computed via backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) and then written directly to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled inputs.version value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT, potentially poisoning subsequent steps. The two offending lines are:
  echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT
  echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT

Locations:

- `.github/actions/prepare-test/action.yml:63`
- `.github/actions/prepare-test/action.yml:66`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In hardened/action/.github/actions/prepare-test/action.yml, fixed the 'Determine URL' step by adding sanitization of the `version` variable (derived from untrusted inputs.version) before writing to $GITHUB_OUTPUT. In both the nightly and stable branches, added `safe_version=$(printf '%s' "$version" | tr -d '\n\r')` and replaced `$version` with `$safe_version` in the echo statements. Also properly quoted `"$GITHUB_OUTPUT"` in the redirects.

