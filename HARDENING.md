<!-- markdownlint-disable -->

# Hardening Report: github--codeql-action/v2.28.1

> This file was generated automatically by the hardening agent.

**Policy SHA:** `d636be7e43ef829af6e853da6b3c7566db9f72fe`

**Test Policy SHA:** `843adf9e4b8f85d0c08b27b9d0b09dd094b54702`

**Harden Agent Version:** `1`

Action **github--codeql-action/v2.28.1** was hardened automatically. 39 finding(s) were identified and resolved across 2 iteration(s).

## Findings Fixed

### script-injection (severity: high)

Rule (a): A ${{ ... }} expression is interpolated directly inside a run: shell command string. In codeql.yml, `run: ${{steps.init.outputs.codeql-path}} version --format=json` injects a step output directly as the command. This allows an attacker who controls the output value to execute arbitrary commands.

Locations:

- `.github/workflows/codeql.yml:87`

### script-injection (severity: high)

Rule (a): A ${{ ... }} expression is interpolated directly inside a run: shell command string. In publish-immutable-action.yml, `echo "Release name: ${{ github.event.release.name }}"` injects the github.event.release.name context directly into the shell command.

Locations:

- `.github/workflows/publish-immutable-action.yml:18`

### script-injection (severity: high)

Rule (a): Multiple ${{ ... }} expressions are interpolated directly inside run: shell command strings in update-release-branch.yml. Examples include: `echo 'version: ${{ steps.versions.outputs.version }}'` in the debug logging step, and `--github-token ${{ secrets.GITHUB_TOKEN }}` / `--repository-nwo ${{ github.repository }}` / `--source-branch '${{ env.REF_NAME }}'` in the update and backport steps.

Locations:

- `.github/workflows/update-release-branch.yml:47`

### script-injection (severity: high)

Rule (a): ${{ runner.temp }} is interpolated directly inside run: shell command strings. In __cleanup-db-cluster-dir.yml: `mkdir -p "${{ runner.temp }}/customDbLocation/javascript"` and the validate step inject the runner.temp context directly into shell commands.

Locations:

- `.github/workflows/__cleanup-db-cluster-dir.yml:43`

### script-injection (severity: high)

Rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }} and ${{ runner.temp }} are interpolated directly inside run: shell command strings in __multi-language-autodetect.yml. Example: `CPP_DB=${{ fromJson(steps.analysis.outputs.db-locations).cpp }}`.

Locations:

- `.github/workflows/__multi-language-autodetect.yml:90`

### script-injection (severity: high)

Rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).ruby }} is interpolated directly inside a run: shell command string in __ruby.yml. Example: `RUBY_DB="${{ fromJson(steps.analysis.outputs.db-locations).ruby }}"`.

Locations:

- `.github/workflows/__ruby.yml:57`

### script-injection (severity: high)

Rule (a): ${{ steps.proxy.outputs.proxy_host }}, ${{ steps.proxy.outputs.proxy_port }}, etc. are interpolated directly inside run: shell command strings in __start-proxy.yml.

Locations:

- `.github/workflows/__start-proxy.yml:55`

### script-injection (severity: high)

Rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command string in __swift-autobuild.yml. Example: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-autobuild.yml:57`

### script-injection (severity: high)

Rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).swift }} is interpolated directly inside a run: shell command string in __swift-custom-build.yml. Example: `SWIFT_DB="${{ fromJson(steps.analysis.outputs.db-locations).swift }}"`.

Locations:

- `.github/workflows/__swift-custom-build.yml:60`

### script-injection (severity: high)

Rule (a): ${{ fromJson(steps.analysis.outputs.db-locations).cpp }} is interpolated directly inside a run: shell command string in __unset-environment.yml. Example: `CPP_DB="${{ fromJson(steps.analysis.outputs.db-locations).cpp }}"`.

Locations:

- `.github/workflows/__unset-environment.yml:62`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/codeql.yml:27`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `actions/publish-immutable-action@v0.0.4`.

Locations:

- `.github/workflows/publish-immutable-action.yml:16`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `actions/setup-node@v4`.

Locations:

- `.github/workflows/post-release-mergeback.yml:36`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `github/codeql-action/upload-sarif@v3`, `actions/setup-python@v5`.

Locations:

- `.github/workflows/pr-checks.yml:21`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `actions/setup-python@v5`.

Locations:

- `.github/workflows/rebuild.yml:14`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/update-bundle.yml:30`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/update-dependencies.yml:13`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/update-release-branch.yml:27`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:16`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `actions/setup-go@v5`, `actions/download-artifact@v4`.

Locations:

- `.github/workflows/debug-artifacts.yml:36`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`, `actions/setup-go@v5`, `actions/download-artifact@v4`.

Locations:

- `.github/workflows/debug-artifacts-failure.yml:27`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/codescanning-config-cli.yml:38`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/check-expected-release-files.yml:14`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`.

Locations:

- `.github/workflows/python312-windows.yml:22`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/checkout@v4`.

Locations:

- `.github/workflows/query-filters.yml:20`

### unpinned-uses (severity: high)

Unpinned action references using mutable tags instead of full SHA digests. Failing references include: `actions/setup-python@v5`, `actions/checkout@v4`, and others. This applies to all generated __ prefixed workflow files.

Locations:

- `.github/workflows/__all-platform-bundle.yml:30`
- `.github/workflows/__analyze-ref-input.yml:30`
- `.github/workflows/__autobuild-action.yml:30`
- `.github/workflows/__cleanup-db-cluster-dir.yml:30`
- `.github/workflows/__multi-language-autodetect.yml:30`
- `.github/workflows/__ruby.yml:30`
- `.github/workflows/__start-proxy.yml:30`
- `.github/workflows/__swift-autobuild.yml:30`
- `.github/workflows/__swift-custom-build.yml:30`
- `.github/workflows/__unset-environment.yml:30`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `check-expected-release-files` has no job-level permissions block.

Locations:

- `.github/workflows/check-expected-release-files.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and multiple jobs (check-node-modules, check-file-contents, npm-test, check-node-version) have no job-level permissions block.

Locations:

- `.github/workflows/pr-checks.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `test-setup-python-scripts` has no job-level permissions block.

Locations:

- `.github/workflows/python312-windows.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `query-filters` has no job-level permissions block.

Locations:

- `.github/workflows/query-filters.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `rebuild` has no job-level permissions block.

Locations:

- `.github/workflows/rebuild.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `update-bundle` has no job-level permissions block.

Locations:

- `.github/workflows/update-bundle.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `update` has no job-level permissions block.

Locations:

- `.github/workflows/update-dependencies.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the jobs `prepare`, `update`, and `backport` have no job-level permissions block.

Locations:

- `.github/workflows/update-release-branch.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `update-supported-enterprise-server-versions` has no job-level permissions block.

Locations:

- `.github/workflows/update-supported-enterprise-server-versions.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the jobs `upload-artifacts` and `download-and-check-artifacts` have no job-level permissions block.

Locations:

- `.github/workflows/debug-artifacts.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the jobs `upload-artifacts` and `download-and-check-artifacts` have no job-level permissions block.

Locations:

- `.github/workflows/debug-artifacts-failure.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `code-scanning-config-tests` has no job-level permissions block.

Locations:

- `.github/workflows/codescanning-config-cli.yml:1`

### missing-permissions (severity: medium)

Workflow file has no top-level permissions block and the job `merge-back` has no job-level permissions block.

Locations:

- `.github/workflows/post-release-mergeback.yml:1`

## Iteration Notes

### Iteration 1

**Fixes applied:** script-injection, unpinned-uses, missing-permissions

**Notes:**

Fixed all security findings across 40+ workflow files:

1. SCRIPT INJECTION (10 files):
- codeql.yml: Moved ${{steps.init.outputs.codeql-path}} to env block (CODEQL_PATH)
- publish-immutable-action.yml: Removed ${{ github.event.release.name }} from echo command, using RELEASE_NAME env var instead
- update-release-branch.yml: Moved debug logging expressions to env block; moved --github-token and --repository-nwo args to env vars (GH_TOKEN, REPO_NWO)
- __cleanup-db-cluster-dir.yml: Replaced ${{ runner.temp }} with $RUNNER_TEMP in run blocks
- __multi-language-autodetect.yml: Moved all fromJson() and runner.temp expressions to env block
- __ruby.yml: Moved fromJson() expression to env block
- __start-proxy.yml: Moved proxy output expressions to env block
- __swift-autobuild.yml: Moved fromJson() expression to env block
- __swift-custom-build.yml: Moved fromJson() expression to env block
- __unset-environment.yml: Moved all fromJson() expressions to env block

2. UNPINNED ACTIONS (40+ files): Pinned all action references to full SHA digests:
- actions/checkout@v4 -> @34e114876b0b11c390a56381ad16ebd13914f8d5
- actions/setup-python@v5 -> @a26af69be951a213d495a4c3e4e4022e16d87065
- actions/setup-node@v4 -> @49933ea5288caeca8642d1e84afbd3f7d6820020
- actions/setup-go@v5 -> @40f1582b2485089dde7abd97c1529aa768e1baff
- actions/download-artifact@v4 -> @d3f86a106a0bac45b974a628896c90dbdf5c8093
- actions/upload-artifact@v4 -> @ea165f8d65b6e75b540449e92b4886f43607fa02
- actions/github-script@v7 -> @f28e40c7f34bde8b3046d885e986cb6290c5673b
- actions/publish-immutable-action@v0.0.4 -> @4bc8754ffc40f27910afb20287dbbbb675a4e978
- github/codeql-action/upload-sarif@v3 -> @02c5e83432fe5497fd85b873b6c9f16a8578e1d9

3. MISSING PERMISSIONS (13 files): Added 'permissions: {}' top-level block to:
- check-expected-release-files.yml, pr-checks.yml, python312-windows.yml, query-filters.yml, rebuild.yml, update-bundle.yml, update-dependencies.yml, update-release-branch.yml, update-supported-enterprise-server-versions.yml, debug-artifacts.yml, debug-artifacts-failure.yml, codescanning-config-cli.yml, post-release-mergeback.yml

Note: One file (__go-indirect-tracing-workaround.yml) had a corruption during editing that was subsequently repaired.

### Iteration 2

**Fixes applied:** unpinned-uses, script-injection

**Notes:**

Fixed 2 unpinned-uses: (1) ruby/setup-ruby@v1 → @d45b1a4e94b71acab930e56e79c6aa188764e7f9 in __rubocop-multi-language.yml; (2) actions/setup-python@v5 → @a26af69be951a213d495a4c3e4e4022e16d87065 in release-initialise/action.yml. Fixed script-injection in 3 files: (1) prepare-test/action.yml: moved inputs.version and inputs.use-all-platform-bundle to env: block as INPUTS_VERSION and INPUTS_USE_ALL_PLATFORM_BUNDLE; (2) release-branches/action.yml: moved github.action_path, inputs.major_version, and inputs.latest_tag to env: block as ACTION_PATH, INPUTS_MAJOR_VERSION, INPUTS_LATEST_TAG; (3) check-codescanning-config/action.yml: moved runner.temp and inputs.expected-config-file-contents to env: blocks in both Check config and Clean up steps.

