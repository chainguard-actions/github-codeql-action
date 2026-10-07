<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/codeql-bundle-v2.27.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/codeql-bundle-v2.27.2** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'Determine URL' step of .github/actions/prepare-test/action.yml, user-controlled input (inputs.version) is mapped to the env var VERSION, then processed via sed into a local variable $version, and written directly to $GITHUB_OUTPUT without sanitization. Specifically: `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT` and the analogous stable-release line. An attacker-controlled value for inputs.version containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT. The required sanitization step (`printf '%s' "$version" | tr -d '\n\r'`) is absent before both writes.

Locations:

- `.github/actions/prepare-test/action.yml:66`
- `.github/actions/prepare-test/action.yml:69`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In .github/actions/prepare-test/action.yml, fixed both the nightly and stable URL construction branches. The user-controlled $VERSION value is processed by sed into raw_version, then sanitized via `printf '%s' "$raw_version" | tr -d '\n\r'` into version before being written to $GITHUB_OUTPUT. This prevents newline injection attacks. Also quoted $GITHUB_OUTPUT references with double quotes for correctness.

