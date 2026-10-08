<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In .github/actions/prepare-test/action.yml, the input `inputs.version` is mapped to the env var `VERSION`, then a derived variable `$version` (extracted via backtick sed: `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\``) is written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled version string containing newlines could inject arbitrary key=value pairs into the GitHub output context. Affected lines write: `echo "tools-url=https://.../$version/$artifact_name" >> $GITHUB_OUTPUT`.

Locations:

- `.github/actions/prepare-test/action.yml:67`
- `.github/actions/prepare-test/action.yml:70`

### unpinned-uses (severity: high)

In .github/actions/release-initialise/action.yml, two `uses:` references are pinned to mutable version tags rather than immutable 40-character commit SHAs: `uses: actions/setup-node@v6` (line 19) and `uses: actions/setup-python@v6` (line 25). A tag can be moved to point to a different (potentially malicious) commit at any time, creating a supply-chain risk.

Locations:

- `.github/actions/release-initialise/action.yml:19`
- `.github/actions/release-initialise/action.yml:25`

## Iteration Notes

### Iteration 1

**Fixes applied:** github-env-injection, unpinned-uses

**Notes:**

Fixed two security findings: (1) In .github/actions/prepare-test/action.yml, sanitized the `version` variable (derived from attacker-controlled `inputs.version` via sed) before writing to $GITHUB_OUTPUT by using `printf '%s' "$raw_version" | tr -d '\n\r'` to strip newlines, preventing newline injection attacks. (2) In .github/actions/release-initialise/action.yml, pinned `actions/setup-node@v6` to SHA `249970729cb0ef3589644e2896645e5dc5ba9c38` and `actions/setup-python@v6` to SHA `ece7cb06caefa5fff74198d8649806c4678c61a1`, with original tags preserved as comments.

