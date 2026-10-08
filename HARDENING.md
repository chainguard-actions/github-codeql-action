<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.37.2

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.37.2** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (b): In the 'get-url' step, the shell variable $version (derived from $VERSION which is set from inputs.version) and $artifact_name are expanded unquoted inside the echo command that writes to $GITHUB_OUTPUT. Unquoted expansion allows the shell to perform word splitting and glob expansion on attacker-controlled data. Specifically, lines 67 and 70 contain: `echo "tools-url=https://github.com/.../codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT` — both $version and $artifact_name are unquoted, and $version is derived from the workflow-controllable input inputs.version.

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

### github-env-injection (severity: high)

In the 'get-url' step, the variable $version (derived from inputs.version via backtick command substitution: `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) is written to $GITHUB_OUTPUT without the required sanitization step (printf '%s' ... | tr -d '\n\r'). The env var VERSION is set from inputs.version, which is caller-controlled. Lines 67 and 70 write this unsanitized value: `echo "tools-url=https://.../$version/$artifact_name" >> $GITHUB_OUTPUT`. An attacker could inject newlines into inputs.version to poison GITHUB_OUTPUT with additional key=value pairs.

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection

**Notes:**

Fixed both findings in hardened/action/.github/actions/prepare-test/action.yml in the 'get-url' step. For the github-env-injection finding: split the version extraction into two steps — first capture the raw value with backtick substitution, then sanitize with `printf '%s' "$raw_version" | tr -d '\n\r'` to strip embedded newlines before writing to $GITHUB_OUTPUT. For the script-injection finding: used `${version}` and `${artifact_name}` inside double-quoted echo strings and quoted `$GITHUB_OUTPUT`. Both nightly and stable branches were fixed identically.

