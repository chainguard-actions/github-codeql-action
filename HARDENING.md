<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.37.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.37.1** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In .github/actions/prepare-test/action.yml, the `version` shell variable is derived from the `inputs.version` action input (via the `VERSION` env var) using `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` and then written directly to $GITHUB_OUTPUT without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT. This occurs in both the nightly and stable branches of the conditional: `echo "tools-url=https://github.com/.../codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`.

Locations:

- `.github/actions/prepare-test/action.yml:63`
- `.github/actions/prepare-test/action.yml:65`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

In `.github/actions/prepare-test/action.yml`, added `version=$(printf '%s' "$version" | tr -d '\n\r')` after each `version=\`echo "$VERSION" | sed ...\`` assignment in both the nightly and stable branches. This sanitizes the attacker-controlled `inputs.version` value by stripping newlines and carriage returns before writing to $GITHUB_OUTPUT, preventing injection of arbitrary key=value pairs. Also quoted `"$GITHUB_OUTPUT"` for correctness.

