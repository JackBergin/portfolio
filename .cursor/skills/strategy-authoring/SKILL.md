---
name: strategy-authoring
description: Reference for authoring deterministic trading strategies. Auto-loads when working on src/trading_agents/strategies/ or strategy JSON configs.
paths:
  - src/trading_agents/strategies/**
---

# Strategy authoring (skill)

Strategies are **fully deterministic** — no randomness, no I/O outside
`ctx.market`. Config envelope in `strategies/schema.json`; per-type params are
validated by the strategy's pydantic `params_model` at load time (typo'd keys
fail at boot). Full config reference, exit-rule library, and recipes live in
`docs/STRATEGIES.md` — follow that doc, don't reinvent boilerplate here.

## Two authoring paths

| Path | What you write | When |
|------|----------------|------|
| **JSON-only variant** | One config with `"type": "rule_based"` (copy `configs/rule_based_rsi_dip_v1.json`) | Entry is "indicator vs. threshold" + exits from the shared rule library. Default choice. |
| **Plugin strategy** | A `Strategy` subclass implementing `entry_signal` / `exit_policy`, with a `params_model`, plus a JSON config | Novel signals (see `volume_flux.py`). |

For the plugin path: the base class (`base.py`) owns the per-symbol loop —
price extraction, exit evaluation via `exits.evaluate_exits` (which owns the
never-sell-at-a-loss gate), holdings gating, logging. Build entries from
`entries.py` / `indicators.py`, exits from the rule library in `exits.py`.
Override `data_requirements()` for a non-default candle lookback or trade
flow. Override `compute_candidates()` only as the escape hatch — and keep
exits routed through the shared evaluator. Register the module import in
`loader.py::register_builtin_strategies()`.

Every config carries `"exit": {"stop_loss": {"enabled": false}}` while the
never-sell-at-a-loss experiment runs (see `docs/STRATEGIES.md`).

## Authoring guidelines

- **Determinism.** No randomness, no I/O outside `ctx.market`. The analyst
  must be able to re-derive your reasoning from `Candidate.rationale`.
- **Always set `Candidate.rationale`.** A short, human-readable string that
  gets surfaced to the analyst and broker prompts.
- **Use `ctx.open_lots[symbol]`** for entry prices, not Alpaca's
  `avg_entry_price`. Lots are the source of truth.
- **Degrade to no-op, never to BUY/SELL.** On a missing price the base
  template skips the symbol with a log line and **no candidate rows (not even
  HOLD)** — emitting HOLDs would change decision-row volume and the
  orchestrator's analyst-skip condition. Missing indicator data → return
  `(None, "skip_reason")` from `entry_signal`. Never crash a tick; never
  guess a price.
- **Respect `ctx.config.constraints`.** Compute notional against
  `max_notional_per_trade_usd`; don't propose a BUY if `len(open_lots) >=
  max_holdings_per_symbol`.
- **Keep starter JSON configs conservative.** `mode: "paper"`, tight
  `max_notional_per_trade_usd`, small `daily_max_trades`. Operators raise
  these later.

## Available context

`StrategyContext` provides:

- `ctx.config` — the validated `StrategyConfig` (id, type, symbols, interval, constraints, params).
- `ctx.market` — `MarketState` with:
  - `account` — account dict from MCP `get_account`.
  - `positions` — list of open positions from MCP `get_positions`.
  - `snapshots` — `{symbol: snapshot_dict}` from MCP `get_snapshot`. Has `latest_trade.price`, `latest_quote.bid_price`/`ask_price`, `minute_bar.close`, `daily_bar.close`.
  - `candles` — `{symbol: [bar_dict, ...]}` from MCP `get_candles`. Each bar has `open`, `high`, `low`, `close`, `volume`, `vwap`, `timestamp`.
  - `trade_flow` — `{symbol: flow_dict}` from MCP `get_trade_flow`, only fetched when `data_requirements()` asks for it.
  - `fetched_at` — the consumer's request time (not the cache-entry time; lot-age math depends on it).
- `ctx.open_lots` — `{symbol: [LotRow, ...]}` of currently-open lots for THIS strategy.

## Field-name compatibility

Snapshot and candle dicts may have either long-form keys (`close`, `price`,
`bid_price`) or short-form (`c`, `p`, `bp`). Don't hand-roll accessors — the
toolkit's helpers in `indicators.py` (`to_decimal`, `latest_price`,
`recent_low`, `recent_high`, `rolling_vwap`, `compute_rsi`) already try both
forms.

## Tests

Mirror an existing test in `tests/agents/test_<your_type>.py` using synthetic
candle data. Never hit the live MCP in tests. Use stub clients
(`StubCursorApiClient` is a common pattern).

## What strategies CAN'T do

- Place orders directly. They emit `Candidate`s; the orchestrator routes them
  through risk → analyst → broker.
- Read the ledger directly. They get `ctx.open_lots` (already filtered to
  this strategy) and that's it.
- Make HTTP calls. Only the orchestrator calls MCP.
- Talk to cursor-api. Only the analyst/broker agents do that.
