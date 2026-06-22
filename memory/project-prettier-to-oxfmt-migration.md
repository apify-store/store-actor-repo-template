---
name: project-prettier-to-oxfmt-migration
description: How we migrated this project from prettier to oxfmt (steps, gotchas)
metadata:
    type: project
---

Migrated from prettier to oxfmt on 2026-06-18.

**Steps taken:**

1. `npm install oxfmt --save-dev`
2. `npm uninstall prettier eslint-config-prettier`
3. Run `./node_modules/.bin/oxfmt --migrate=prettier` — this reads `.prettierrc` and `.prettierignore` and produces `.oxfmtrc.json` automatically.
4. Update `package.json` scripts: `format` → `oxfmt --write .`, `format:check` → `oxfmt --check .`
5. Update `lint-staged` entry to use `oxfmt --write` instead of `prettier --write`
6. Delete `.prettierrc` and `.prettierignore`

**Gotcha:** The migrated `.oxfmtrc.json` `ignorePatterns` array includes the literal string `.prettierignore` (the filename of the old ignore file). Remove that entry — keep only the actual glob patterns that were inside the file.

**VS Code setup:** Add `.vscode/extensions.json` recommending `oxc.oxc-vscode`, and `.vscode/settings.json` setting it as the default formatter with `editor.formatOnSave: true` for TS, JS, and JSON language overrides.

**Why:** oxfmt is the OXC-project formatter, same ecosystem as oxlint. Faster, consistent toolchain.
