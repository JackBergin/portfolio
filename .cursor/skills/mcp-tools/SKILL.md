---
name: mcp-tools
description: Reference for the trading-mcp tool surface (Alpaca execution + Massive market data) and how the parent repo's mcp_client.py wraps it. Auto-loads when working on the MCP boundary.
paths:
  - src/trading_agents/mcp_client.py
  - submodules/trading-mcp/**
---

# MCP tool surface (skill)

The trading-mcp server exposes 13 tools over Streamable HTTP at
`http://trading-mcp:9230/mcp` (Docker) or `http://127.0.0.1:9230/mcp` (host).

**Execution backend:** Alpaca (paper / live).
**Market data backend:** Massive (formerly Polygon.io).

The split: Alpaca handles orders, accounts, positions; Massive handles all
market data reads (snapshots, candles, tickers).

## Tool catalog

### Account / Positions (Alpaca)

| Tool | Args | Returns |
|------|------|---------|
| `get_account` | `mode` | dict with `cash`, `equity`, `buying_power`, `status` |
| `get_positions` | `mode` | list of position dicts (each has `symbol`, `qty`, `avg_entry_price`, `unrealized_pl`) |
| `get_position` | `mode`, `symbol` | one position dict |

### Market Data (Massive)

All mode-agnostic — `mode` param is ignored, real market data either way.

| Tool | Args | Returns |
|------|------|---------|
| `get_ticker` | `mode`, `symbol` | `{"symbol": ..., "price": ...}` |
| `get_snapshot` | `mode`, `symbol` | dict with `latest_trade`, `latest_quote`, `minute_bar`, `daily_bar` |
| `get_candles` | `mode`, `symbol`, `timeframe`, `start?`, `end?`, `limit?` | list of OHLCV bars |

### Orders (Alpaca)

| Tool | Args | Returns |
|------|------|---------|
| `create_order` | `mode`, `symbol`, `side`, `order_type`, `qty?` or `notional?`, `limit_price?`, `time_in_force?` | order dict |
| `list_orders` | `mode`, `status?`, `limit?` | list of order dicts |
| `get_order` | `mode`, `order_id` | order dict (use this for fill reconciliation) |
| `cancel_order` | `mode`, `order_id` | `{"status": "cancelled"}` |
| `cancel_all_orders` | `mode` | list |

### Position Management (Alpaca)

| Tool | Args | Returns |
|------|------|---------|
| `close_position` | `mode`, `symbol`, `qty?` or `percentage?` | dict |
| `close_all_positions` | `mode` | list |

## Symbol vocabulary

Allowlist (enforced at the MCP layer):

```
BTC/USD, ETH/USD, XRP/USD, HBAR/USD, SOL/USD
```

`/` separator on the MCP boundary; Massive translates internally to its
`X:BTCUSD` form.

## Mode

`"paper"` (default) or `"live"`. Selects the Alpaca paper or live account.
**Don't pass `"live"` unless `TRADING_AGENTS_ALLOW_LIVE=true`** is set in env;
the parent orchestrator + risk guards enforce this.

## Timeframe vocabulary (`get_candles`)

```
1Min, 5Min, 15Min, 30Min, 1Hour, 4Hour, 1Day, 1Week, 1Month
```

## Parent client wrapper (`src/trading_agents/mcp_client.py`)

`TradingMcpClient` opens a transient session per call (the MCP SDK is
designed around `async with` lifecycles). High-level methods:

```python
async def get_account(mode: str = "paper") -> dict
async def get_positions(mode: str = "paper") -> list[dict]
async def get_snapshot(symbol: str, mode: str = "paper") -> dict
async def get_ticker(symbol: str, mode: str = "paper") -> dict
async def get_order(order_id: str, mode: str = "paper") -> dict
async def get_candles(symbol, timeframe, start?, end?, limit?, mode="paper") -> list[dict]
```

The `call(name, args)` method is the escape hatch for tools without a
convenience wrapper.

## Errors

`TradingMcpError` is raised when a tool returns `isError=True` or an
unexpected payload. The orchestrator catches these per-symbol and degrades
gracefully (logs a warning, sets `snap = {}` or `bars = []`); a single bad
symbol must never kill a tick.

## Adding a new tool to the surface

1. Add Zod schema in `submodules/trading-mcp/mcp/src/tools.ts`.
2. Add the routing `case "tool_name"` in `submodules/trading-mcp/api/src/api/server.py`.
3. Implement the method on `AlpacaCryptoClient` (orders/positions) or `MassiveMarketDataClient` (market data).
4. Rebuild: `docker compose build trading-mcp && docker compose up -d --force-recreate trading-mcp`.
5. Optionally: add a wrapper to `src/trading_agents/mcp_client.py`.

## Common pitfalls

- **Datetime format for `get_candles`.** Massive accepts `datetime`, Unix-ms ints, or `YYYY-MM-DD` strings — but NOT full ISO 8601 with offset. The Python client converts internally. If calling from somewhere new, use `datetime` objects.
- **`mode` is required by Zod**, even when the tool ignores it (e.g. all market data). Pass `mode="paper"` defensively.
- **Symbol enum strictness.** The Zod schema rejects symbols outside the allowlist. Adding a symbol means updating: `tools.ts` enum, `api/models/types.py` `ALLOWED_SYMBOLS`, and `mcp_client.py` `ALLOWED_SYMBOLS`.
