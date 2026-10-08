<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.35.3

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.35.3** was hardened automatically. 2 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### unpinned-uses (severity: high)

The composite action .github/actions/release-initialise/action.yml references two actions using mutable version tags instead of full 40-character commit SHAs: `uses: actions/setup-node@v6` (line 19) and `uses: actions/setup-python@v6` (line 25). These tags can be moved to point to different commits, enabling supply-chain attacks.

Locations:

- `.github/actions/release-initialise/action.yml:19`
- `.github/actions/release-initialise/action.yml:25`

### github-env-injection (severity: high)

In .github/actions/prepare-test/action.yml, the composite action's `get-url` step writes a value derived from `inputs.version` (via the `$VERSION` env var) to `$GITHUB_OUTPUT` without sanitization. Specifically, `version` is computed as `version=\`echo "$VERSION" | sed -e 's/^.*\-//'\`` and then written with `echo "tools-url=https://.../$version/$artifact_name" >> $GITHUB_OUTPUT`. A caller-controlled `inputs.version` value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT. The required sanitization step (`printf '%s' "$version" | tr -d '\n\r'`) is absent before the write.

Locations:

- `.github/actions/prepare-test/action.yml:65`
- `.github/actions/prepare-test/action.yml:68`

## Iteration Notes

### Iteration 1

**Fixes applied:** unpinned-uses, github-env-injection

**Notes:**

1. Pinned actions/setup-node@v6 → @249970729cb0ef3589644e2896645e5dc5ba9c38 # v6 and actions/setup-python@v6 → @ece7cb06caefa5fff74198d8649806c4678c61a1 # v6 in .github/actions/release-initialise/action.yml. 2. In .github/actions/prepare-test/action.yml, sanitized the `version` variable (derived from caller-controlled inputs.version) before writing to $GITHUB_OUTPUT: captured sed output into `raw_version` first, then applied `printf '%s' "$raw_version" | tr -d '\n\r'` to strip newlines into `version`, preventing GITHUB_OUTPUT injection. Also quoted $GITHUB_OUTPUT references consistently.

