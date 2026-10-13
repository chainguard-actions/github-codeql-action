<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.5

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.5** was hardened automatically. 1 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In .github/actions/prepare-test/action.yml, the `inputs.version` value is mapped to the `VERSION` env var and then processed into a `$version` shell variable via backtick command substitution (`version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``). This derived value is then written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT, potentially poisoning subsequent steps. The two failing lines are:
  - `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`
  - `echo "tools-url=https://github.com/github/codeql-action/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`

Locations:

- `.github/actions/prepare-test/action.yml:68`
- `.github/actions/prepare-test/action.yml:71`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection

**Notes:**

Fixed github-env-injection in .github/actions/prepare-test/action.yml. The `version` variable derived from `inputs.version` via sed was being written directly to $GITHUB_OUTPUT without sanitization. Fixed by: (1) capturing the sed output into `raw_version`, (2) sanitizing with `printf '%s' "$raw_version" | tr -d '\n\r'` before assigning to `version`, and (3) quoting `"$GITHUB_OUTPUT"`. This applies to both the nightly and stable branches of the conditional.

