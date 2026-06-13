# Deploy (trading-agents full stack)

## Overview

Rebuild and redeploy the trading-agents stack after code changes. This command
covers the most common deploy scenarios — from a quick rolling restart to a
full build + migration cycle — and knows which services need which treatment.

---

## Stack topology recap

| Port | Service | Runtime | Image / Process |
|------|---------|---------|-----------------|
| 5432 | `postgres` | Docker | `postgres:17` — never rebuilt |
| 9230 | `trading-mcp` | Docker | `trading-mcp` — rebuild only when submodule changes |
| 8000 | `cursor-api` | Host process | `submodules/cursor-api/` — `make headless-stop` + redeploy |
| 8100 | `trading-agents` | Docker | `trading-agents` image — rebuilt from `src/` + `pyproject.toml` |
| 8501 | `performance` | Docker | `trading-agents-performance` image — same source, `EXTRAS=[performance]` build arg |

`cursor-api` runs as a **host process** (not Docker) because the Cursor `agent` CLI
needs the OS keyring. Its PID is tracked in `cursor_api.pid`.

---

## Decision tree — choose the right deploy

### 1. Python source only changed (`src/`, `pyproject.toml`, `migrations/`)

```bash
# Build both app images in parallel (performance gets EXTRAS=[performance])
docker compose build trading-agents performance

# Apply any new migrations BEFORE restarting app containers
make migrate

# Rolling restart — zero downtime for postgres + trading-mcp
docker compose up -d trading-agents performance
```

### 2. `trading-mcp` submodule changed (`submodules/trading-mcp/`)

```bash
docker compose build trading-mcp
docker compose up -d trading-mcp
# trading-agents will reconnect automatically on next tick
```

### 3. `cursor-api` submodule changed (`submodules/cursor-api/`)

```bash
make headless-stop          # kills the host cursor-api process
make cursor-api-run         # or: make headless-deploy to restart everything
```

### 4. `docker-compose.yml` or `Dockerfile` changed (env vars, ports, volumes)

```bash
docker compose build trading-agents performance   # if Dockerfile changed
docker compose up -d <service>                    # picks up compose changes
```

### 5. Full fresh redeploy (first bring-up or after `docker compose down`)

```bash
make submodules-init        # once: init git submodules
cp .env.example .env        # once: fill in secrets

docker compose up -d postgres trading-mcp         # infra first
make migrate                                       # apply all pending migrations
make headless-deploy                               # cursor-api (host) + trading-agents (docker)
docker compose up -d performance                   # opt-in dashboard
```

---

## Steps the agent must follow

1. **Identify what changed** — read `git diff HEAD~1` or `git status` to know
   which services are affected. Only rebuild images that actually changed.

2. **Build affected images**

   ```bash
   # trading-agents image (orchestrator — no extras)
   docker compose build trading-agents

   # performance image (dashboard — installs [performance] extra via build arg)
   docker compose build performance
   ```

   Both use the same `Dockerfile`. The performance build passes
   `ARG EXTRAS="[performance]"` so `streamlit` and `pandas` are installed only
   in that image, keeping the orchestrator image lean.

3. **Run pending migrations** (always before restarting app containers)

   ```bash
   make migrate
   # Output: "N migration(s) applied." or "Nothing to apply."
   ```

   Migrations live in `migrations/NNN_<name>.{up,down}.sql`. The runner tracks
   applied versions in the `schema_migrations` Postgres table.

4. **Restart services**

   ```bash
   docker compose up -d trading-agents performance
   ```

   `--force-recreate` is only needed when compose config changed (env vars,
   ports, volumes). A normal `up -d` is sufficient after an image rebuild.

5. **Verify**

   ```bash
   docker compose ps
   # All target services must show "Up" and healthy where applicable.

   docker logs trading-agents --tail 20
   # Look for: "AgentsScheduler started with N strategies"

   docker logs performance --tail 10
   # Look for: "Uvicorn server started on 0.0.0.0:8501"

   curl -s http://127.0.0.1:8100/health | python3 -m json.tool
   # Expect: {"ok": true, ...}
   ```

---

## Port binding notes

- `trading-agents` status API: `127.0.0.1:8100` (loopback-only)
- `performance` dashboard: `0.0.0.0:8501` (all interfaces — accessible remotely)
- `postgres`: `127.0.0.1:5432` (loopback-only)
- `trading-mcp`: `127.0.0.1:9230` (loopback-only)

The dashboard has no authentication. Keep it behind a firewall or VPN when
bound to `0.0.0.0`.

---

## Common pitfalls

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| `performance` shows `ImportError: no known parent package` | Stale image with relative imports | Rebuild: `docker compose build performance` |
| `make migrate` errors — can't reach postgres | Postgres not running or `DB_PASSWORD` not set in `.env` | `docker compose up -d postgres`, check `.env` |
| `trading-agents` exits immediately | Missing env var or bad strategy config | `docker logs trading-agents` for details |
| `cursor-api` 404 / unreachable from container | Host process not running | `make headless-deploy` or `make cursor-api-run` |
| Old image still running after build | `up -d` used cached container | `docker compose up -d --force-recreate <service>` |

---

## Reference files

- [`docker-compose.yml`](../docker-compose.yml) — service definitions, ports, build args
- [`Dockerfile`](../Dockerfile) — two-stage uv wheel build; `ARG EXTRAS` for optional deps
- [`Makefile`](../Makefile) — `make migrate`, `make performance`, `make headless-deploy`
- [`scripts/headless_deploy.sh`](../scripts/headless_deploy.sh) — cursor-api host process lifecycle
- [`migrations/`](../migrations/) — numbered SQL migration pairs
