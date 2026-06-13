# `.cursor/` — Agentic Infrastructure for trading-agents

This directory is the agentic control plane for the repo. It tells Cursor (and
any compatible AI tooling) how to behave when working in this codebase. Each
subdirectory has a distinct job; this file is the map.

If you're new to Cursor's primitives, read this top-to-bottom — the
[**When to use what**](#when-to-use-what) decision matrix at the bottom is the
fastest way to onboard.

---

## Subdirectories at a glance

| Path | Purpose | Auto-applies? |
|------|---------|---------------|
| [`rules/`](#rules) | Always-on or glob-scoped guidance the assistant should follow | Yes (when alwaysApply or glob matches) |
| [`commands/`](#commands) | User-invoked slash-command prompt templates | No — fired by the user |
| [`agents/`](#agents) | Specialized subagents with isolated context | On invocation (or auto-routed by `description`) |
| [`skills/`](#skills) | Progressively-loaded domain knowledge | Yes — auto-loads when topic matches |
| [`hooks/`](#hooks) | Deterministic event-driven scripts | Yes — fires on Cursor events |
| [`hooks.json`](#hooks) | Hook event configuration | n/a (config) |
| [`plans/`](#plans) | Approved implementation plans (audit trail) | n/a (artifacts) |

---

## `rules/`

Markdown rule files (`.mdc`) with frontmatter. Each rule is either always-on
(`alwaysApply: true`) or glob-scoped (`globs: **/*.py`). Use rules for guidance
the assistant should keep in mind across many turns — coding style,
architectural invariants, doc-sync requirements.

| File | Scope |
|------|-------|
| `master.mdc` | Always — project overview, hard invariants, clarification protocol, chat interaction guidelines |
| `python-style.mdc` | `**/*.py` — async-first, ruff formatting, type-annotation conventions |
| `strategies.mdc` | `src/trading_agents/strategies/**` — strategy authoring rules |
| `tests.mdc` | `tests/**` — pytest conventions |
| `agents-orchestrator.mdc` | `src/trading_agents/{orchestrator,agents,risk,scheduler}.py` |
| `makefile.mdc` | `Makefile` — target-naming and structure rules |
| `docs-sync.mdc` | docs files — ensures `.env.example` and docs stay in sync |

> Rules **guide**; hooks **enforce**. If you need deterministic behavior, use a hook.

---

## `commands/`

Slash-command prompt templates. The user types `/preflight`, `/code-review`,
`/git-commit`, etc.; Cursor injects the file's content as a prompt fragment.
Commands never auto-fire — they're explicit shortcuts for repeat workflows.

Notable commands:

- `preflight.md` — score 0-100 confidence in the current task before
  implementation; surface what's underspecified.
- `git-commit.md` — the canonical commit format for this repo (two `-m`
  flags: short title with a `feat/fix/...` tag + 1-3 sentence body).
- `code-review.md` — full review checklist; usually piped through the
  `review` subagent.
- `summarizework.md`, `summarizefortransfer.md`, `updateplan.md`,
  `implement.md`, `debug-issue.md`, `optimize-performance.md`,
  `security-audit.md`, `security-review.md`, `database-migration.md`,
  `write-unit-tests.md`, `onboard-new-developer.md` — see file contents.

---

## `agents/`

Specialized subagents. Each `.md` file is a single subagent with isolated
context, its own system prompt, and a fixed scope. Agents auto-route based on
their `description` frontmatter, or you can invoke them by name.

| Agent | Mode | Scope |
|-------|------|-------|
| `coder.md` | write | Implements Python features across `src/`, `submodules/cursor-api/`, `submodules/trading-mcp/api/` |
| `infrastructure.md` | write | Docker, docker-compose, Makefile, migrations, hooks, scripts |
| `testing.md` | write | pytest authoring + execution; reports pass/fail |
| `docs.md` | write | `docs/`, `README.md`, `.env.example` sync, docstrings |
| `review.md` | **readonly** | Architectural review with structured output (consumed by other agents) |

The `review` agent is read-only by design — its output is fed into the
write-capable agents (`coder`, `infrastructure`, `testing`) which apply the
recommended changes.

---

## `skills/`

Progressively-loaded domain knowledge. Skills auto-trigger when their
`description` matches the current work — they inject focused context only when
relevant, avoiding the cost of always-on rules.

| Skill | Triggers when working on |
|-------|--------------------------|
| `ledger-schema/` | `migrations/`, `src/trading_agents/ledger/`, `scripts/migrate.py` |
| `strategy-authoring/` | `src/trading_agents/strategies/` |
| `mcp-tools/` | `src/trading_agents/mcp_client.py`, `submodules/trading-mcp/` |

> Skills are smaller and more focused than rules. Use a skill when the
> guidance is bounded to a specific subsystem.

---

## `hooks/` + `hooks.json`

Deterministic, event-driven scripts. Hooks run automatically on Cursor events
(file edit, session start, prompt submit, shell execution, etc.) — they don't
rely on LLM judgment.

| Hook | Event | What it does |
|------|-------|--------------|
| `ruff-format.sh` | `afterFileEdit` on `*.py` | Runs `ruff format` + `ruff check --fix` on the edited file |
| `session-context.sh` | `sessionStart` | Injects `git status -sb`, `docker compose ps`, recent migrations into the agent's initial context |

See `docs/HOOKS.md` for a full primer on Cursor hooks: events, JSON protocol,
and how to add your own.

---

## `plans/`

Approved implementation plans, written before scaffolding work begins. The
clarification protocol in `master.mdc` requires that any non-trivial change
land here first with the user's sign-off.

Naming: `YYYY-MM-DD-<short-slug>.plan.md`. The `.plan.md` suffix is required —
Cursor uses it to expose the file as a selectable plan when picking which
model will implement it.

These are committed to git on purpose — they're an audit trail of decisions
and the reasoning behind them.

---

## When to use what

| You want… | Reach for |
|----------|-----------|
| Always-on guidance the assistant should keep in mind | **Rule** |
| Scoped guidance only when editing certain files | **Rule** with a `globs` frontmatter |
| Reusable prompt the user manually triggers | **Command** |
| Specialized worker with isolated context for a sub-task | **Agent** |
| Domain knowledge that loads only when relevant | **Skill** |
| Deterministic behavior tied to a Cursor event (no LLM in the loop) | **Hook** |
| Pre-approved plan with sign-off | **Plan** in `plans/` |

## Onboarding for new developers (less familiar with AI tooling)

1. Read `master.mdc` first — that's the contract.
2. Read this README to understand where everything lives.
3. Read `docs/HOOKS.md` to understand the automation layer.
4. Open `.cursor/agents/` and skim each agent's frontmatter to see what each
   one is good at.
5. When in doubt, ask the assistant — and expect it to ask clarifying
   questions before any non-trivial change.
