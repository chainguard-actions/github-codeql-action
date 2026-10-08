<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v4.32.4

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `2`

Action **github--codeql-action/v4.32.4** was hardened automatically. 3 finding(s) were identified and resolved across 1 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Sub-rule (a): A ${{ }} expression is directly interpolated inside a run: shell command string. In .github/actions/release-branches/action.yml, the run: block contains `python ${{ github.action_path }}/release-branches.py \` — the github.action_path context value is substituted directly into the shell command before the shell ever sees it, enabling script injection if the value contains shell metacharacters.

Locations:

- `.github/actions/release-branches/action.yml:25`

### github-env-injection (severity: high)

The run: block in .github/actions/prepare-test/action.yml writes a value derived from inputs.version (via the env var VERSION, processed through sed into $version) directly to $GITHUB_OUTPUT without the required sanitization step (printf '%s' ... | tr -d '\n\r'). An attacker-controlled inputs.version value containing newlines could inject arbitrary key=value pairs into GITHUB_OUTPUT. The offending lines are: `echo "tools-url=https://github.com/dsp-testing/codeql-cli-nightlies/releases/download/codeql-bundle-$version/$artifact_name" >> $GITHUB_OUTPUT` and the equivalent stable-release line.

Locations:

- `.github/actions/prepare-test/action.yml:68`
- `.github/actions/prepare-test/action.yml:71`

### unpinned-uses (severity: high)

The composite action .github/actions/release-initialise/action.yml references `uses: actions/setup-python@v6`, which is a mutable tag reference rather than a pinned 40-character commit SHA. This allows the referenced action to be silently updated (or compromised) without the consuming workflow noticing, enabling supply-chain attacks.

Locations:

- `.github/actions/release-initialise/action.yml:19`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, github-env-injection, unpinned-uses

**Notes:**

1. script-injection (.github/actions/release-branches/action.yml line 25): Moved `${{ github.action_path }}` from the run: shell command into the step's env: block as ACTION_PATH, then referenced it as "$ACTION_PATH" in the shell script to prevent shell metacharacter injection.
2. github-env-injection (.github/actions/prepare-test/action.yml lines 68, 71): Added proper sanitization for the version-derived value before writing to GITHUB_OUTPUT. Used a two-step approach: capture raw value from sed, then sanitize with `printf '%s' "$raw_version" | tr -d '\n\r'` before interpolating into the echo command writing to GITHUB_OUTPUT.
3. unpinned-uses (.github/actions/release-initialise/action.yml line 19): Pinned `actions/setup-python@v6` to its full commit SHA `ece7cb06caefa5fff74198d8649806c4678c61a1` with a `# v6` comment for readability.

