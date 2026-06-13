---
name: ledger-schema
description: Knowledge of the trading-agents ledger Postgres schema, migration runner, and asyncpg conventions. Auto-loads when working on migrations, ledger code, or schema changes.
paths:
  - migrations/**
  - src/trading_agents/ledger/**
  - scripts/migrate.py
---

# Ledger schema (skill)

Quick reference for working with the trading-agents Postgres ledger.

## Tables (5)

| Table | Purpose | Key columns |
|-------|---------|-------------|
| `ticks` | One row per scheduler tick | `id`, `strategy_id`, `started_at`, `finished_at`, `status` |
| `decisions` | Pre-LLM strategy candidates | `id`, `tick_id`, `strategy_id`, `symbol`, `action`, `qty`, `notional`, `rationale`, `payload` (JSON), `created_at` |
| `analyses` | Analyst LLM verdicts | `id`, `tick_id`, `approved_decision_ids` (JSON), `rejected_decision_ids` (JSON), `notes`, `raw_response`, `cursor_session_id` |
| `executions` | Broker execution attempts | `id`, `tick_id`, `decision_id`, `symbol`, `action`, `status`, `order_id`, `filled_avg_price`, `filled_qty`, `error`, `raw_response` |
| `lots` | Open buy lots (source of truth for entry prices) | `id`, `strategy_id`, `symbol`, `qty`, `entry_price`, `entry_notional`, `opened_at`, `closed_at`, `exit_price`, `exit_notional`, `realized_pnl`, `status`, `open_order_id`, `close_order_id`, `reconciled_at` |

Plus `schema_migrations` (managed by `scripts/migrate.py`).

## Strategy filtering

Every table that's directly queryable by strategy carries `strategy_id`:
`ticks`, `decisions`, `lots`. `analyses` and `executions` join via
`tick_id → ticks.strategy_id` or `decision_id → decisions.strategy_id`.

## Migration runner

`scripts/migrate.py` — pure SQL files, paired up/down, applied in version order.

```bash
make migrate                       # apply all pending
make rollback                      # roll back last applied
make rollback TARGET=002_decisions # roll back everything after 002_decisions
```

Migration files live in `migrations/` and follow `NNN_<table>.up.sql` /
`NNN_<table>.down.sql`. The runner tracks applied versions in
`schema_migrations`.

## Adding a new table

1. Create `migrations/00N_<table>.up.sql` — `CREATE TABLE IF NOT EXISTS` + indexes.
2. Create `migrations/00N_<table>.down.sql` — drop indexes first, then table.
3. `make migrate` to apply.
4. Add a Pydantic row model in `src/trading_agents/ledger/models.py`.
5. Add CRUD methods in `src/trading_agents/ledger/store.py` using asyncpg.

## Adding a column to an existing table

1. Create a new migration `migrations/00N_<table>_add_<col>.up.sql` — `ALTER TABLE ... ADD COLUMN ... IF NOT EXISTS`.
2. Pair it with a `.down.sql` — `ALTER TABLE ... DROP COLUMN IF EXISTS`.
3. Update the matching Pydantic model.
4. Update any `INSERT` / `UPDATE` / row-mapper code in `store.py`.

## asyncpg conventions

- **Pool, not single connection.** `LedgerStore` constructs `asyncpg.create_pool(dsn, min_size, max_size)`. Always go through `self.pool`.
- **`$N` placeholders**, not `?` (which is SQLite). asyncpg uses positional dollar parameters.
- **`TIMESTAMPTZ`** columns map to Python `datetime` (timezone-aware). No string round-trips — pass `datetime` objects directly to `pool.execute()` and read back as `datetime` from `fetchrow()` / `fetch()`.
- **`ANY($n)`** for `IN` clauses with a list parameter. Don't construct a placeholder string yourself.
- **`executemany`** for bulk inserts (e.g. `insert_decisions`).
- **Transactions** — use `async with conn.transaction():` only when wrapping multiple writes that must atomically succeed/fail.

## DSN

Built from `Settings.db_dsn`:

```python
postgresql://{user}:{password}@{host}:{port}/{name}
```

In Docker, `host = postgres`. From the host shell, `host = 127.0.0.1`.

## Common pitfalls

- **Forgetting `TIMESTAMPTZ`** on a new datetime column. Use it; not `TIMESTAMP`.
- **Using string concat to build SQL.** Always parameterize.
- **Bypassing the pool** to open ad-hoc connections — defeats the pooling.
- **Updating `LedgerStore` without writing the migration**, or vice versa. Both go together.
