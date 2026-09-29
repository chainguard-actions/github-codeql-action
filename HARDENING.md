<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v3.35.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v3.35.1** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### github-env-injection (severity: high)

In .github/actions/prepare-test/action.yml, the input `inputs.version` is mapped to the env var `VERSION`, and a derived variable `$version` (extracted from `$VERSION` via backtick sed substitution) is written directly to `$GITHUB_OUTPUT` without the required sanitization step (`printf '%s' ... | tr -d '\n\r'`). An attacker-controlled value for `inputs.version` containing newline characters could inject arbitrary key=value pairs into the GitHub output context. The offending lines are: `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` followed by `echo "tools-url=https://github.com/.../codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT`.

Locations:

- `.github/actions/prepare-test/action.yml:70`
- `.github/actions/prepare-test/action.yml:71`
- `.github/actions/prepare-test/action.yml:73`
- `.github/actions/prepare-test/action.yml:74`

### unpinned-uses (severity: high)

In .github/actions/release-initialise/action.yml, two `uses:` references are pinned to mutable version tags rather than full 40-character SHA digests, making them vulnerable to supply-chain attacks if the upstream tag is moved: `uses: actions/setup-node@v6` (line 19) and `uses: actions/setup-python@v6` (line 25).

Locations:

- `.github/actions/release-initialise/action.yml:19`
- `.github/actions/release-initialise/action.yml:25`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, github-env-injection

**Notes:**

1. unpinned-uses: In .github/actions/release-initialise/action.yml, pinned `actions/setup-node@v6` to `actions/setup-node@249970729cb0ef3589644e2896645e5dc5ba9c38 # v6` and `actions/setup-python@v6` to `actions/setup-python@ece7cb06caefa5fff74198d8649806c4678c61a1 # v6`. 2. github-env-injection: In .github/actions/prepare-test/action.yml, sanitized the `version` variable (derived from the attacker-controlled `$VERSION` input via sed) using `printf '%s' ... | tr -d '\n\r'` before embedding it in the URL written to $GITHUB_OUTPUT. Also quoted the $GITHUB_OUTPUT variable references for correctness.

