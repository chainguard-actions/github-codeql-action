<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.3** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In the 'Determine URL' step, the shell variable `$version` is derived from `inputs.version` (via the `$VERSION` env var) using `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` and then written directly to `$GITHUB_OUTPUT` without the required `printf '%s' ... | tr -d '\n\r'` sanitization:

  echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT
  echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT

An attacker-controlled `inputs.version` value containing embedded newlines could survive the sed transformation and inject additional key=value pairs into `$GITHUB_OUTPUT`, potentially overwriting subsequent output variables consumed by downstream steps.

Locations:

- `.github/actions/prepare-test/action.yml:65`
- `.github/actions/prepare-test/action.yml:68`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed the github-env-injection finding in .github/actions/prepare-test/action.yml. In both the 'nightly' and 'stable' branches of the 'Determine URL' step, the `version` variable (derived from `inputs.version` via sed) is now sanitized with `printf '%s' "$raw_version" | tr -d '\n\r'` before being written to $GITHUB_OUTPUT. This prevents embedded newlines in attacker-controlled input from injecting additional key=value pairs into $GITHUB_OUTPUT. Also fixed unquoted `$GITHUB_OUTPUT` references to use `"$GITHUB_OUTPUT"` for correctness.

