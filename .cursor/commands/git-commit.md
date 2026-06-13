# Git Commit (canonical for trading-agents)

## Overview

Create a commit with a strict two-`-m` structure: a tagged title and a 1-3
sentence body explaining the essence. Use the local OS git identity — never
inject Cursor attribution into the message.

## Steps

1. **Review changes**
   - `git status` to see what's staged/unstaged.
   - `git diff --cached` (staged) or `git diff` (unstaged) to read the diff.
   - Understand what changed and **why**.
2. **Stage if needed**
   - `git add -A` (or stage selectively).
3. **Confirm git identity is the OS user, not Cursor**
   - `git config user.name` should be the local user.
   - **Never** add lines like `🤖 Generated with Cursor`, `Co-Authored-By: Cursor`, or any Cursor-attribution to the commit message body.
4. **Compose the commit message**
   - Choose a tag: `feature` | `bug` | `refactor` | `docs` | `infra` | `test` | `chore`.
   - Write a short title (≤ 72 chars).
   - Write 1-3 sentences capturing the essence (the "why" + the impact).
5. **Run the commit**

## Required structure

```bash
git commit -m "<tag>: <Title and brief summary>" \
           -m "<1-3 sentence essence of what we committed.>"
```

## Examples

```bash
git commit -m "feature: Add dip_accumulator strategy" \
           -m "Adds a new long-horizon DCA strategy that buys configurable notional on each tick when price has dropped at least N% below a lookback high. Ships with a paper-mode starter config and full unit-test coverage."
```

```bash
git commit -m "bug: Fix analyst rejecting all candidates when cursor-api auth expires" \
           -m "Treat exit_code=1 with the auth-required stderr as a transient failure rather than a parse error. The orchestrator now retries once and logs the auth issue clearly so operators can re-authenticate."
```

```bash
git commit -m "infra: Replace SQLite ledger with Postgres + asyncpg" \
           -m "Adds a postgres service to docker-compose, migrates the ledger to TIMESTAMPTZ throughout, and introduces a SQL-file migration runner with one-pair-per-table layout. Make targets migrate / rollback drive the runner; data is bind-mounted at ./data/postgres."
```

## Rules

- **Tag:** one of `feature` / `bug` / `refactor` / `docs` / `infra` / `test` / `chore`. Lowercase.
- **Title length:** ≤ 72 characters total (including tag and colon).
- **Title style:** capitalize the first letter of the summary; no trailing period.
- **Imperative mood:** "Add", "Fix", "Update" (not "Added", "Fixes").
- **Body length:** 1-3 sentences, max. If you need more, the change is too big — split it.
- **Body content:** explain the **why** and the **impact**, not a line-by-line replay of the diff.
- **No Cursor attribution.** Do not add any `🤖 Generated with…`, `Co-Authored-By: Cursor`, or similar lines. Never. The commit author must be the local OS user.
- **Use HEREDOCs only when necessary.** The two-`-m` form is preferred; HEREDOCs are reserved for multi-paragraph commits which we should generally not be making.

## Anti-patterns

- ❌ `git commit -m "fix stuff"` — vague, no tag, no body.
- ❌ `git commit -m "feature: add stuff" -m "added stuff"` — body restates the title.
- ❌ A 10-sentence commit body — split the change.
- ❌ Any Cursor attribution line.
- ❌ Past tense ("Added X").
- ❌ A title without a tag (`Add new strategy`).

## Reference from agents

Subagents that complete a task and need to commit: read this file and follow
it verbatim. Do not improvise the commit format.
