#!/usr/bin/env bash
# sessionStart hook — injects current repo / docker / migrations state into the
# agent's initial context. Output is printed as a structured-output JSON object
# Cursor will surface as additional system context for the session.
#
# Sections:
#   1. git status (-sb): branch + uncommitted file summary
#   2. docker compose ps: which services are up
#   3. recent migrations: last 3 from schema_migrations (best-effort)

set -uo pipefail

git_status="$(git -C "$(pwd)" status -sb 2>/dev/null || echo 'git status unavailable')"

if command -v docker >/dev/null 2>&1; then
    docker_ps="$(docker compose ps --format 'table {{.Name}}\t{{.Status}}\t{{.Ports}}' 2>/dev/null || echo 'docker compose ps failed')"
else
    docker_ps="docker not installed"
fi

# Best-effort: pull last 3 applied migrations. Silently skip if postgres is down
# or psql isn't available — this is just nice-to-have context.
recent_migrations="(skipped — postgres not reachable)"
if command -v docker >/dev/null 2>&1; then
    if docker compose ps postgres 2>/dev/null | grep -q "Up"; then
        recent_migrations="$(docker compose exec -T postgres psql \
            -U "${TRADING_AGENTS_DB_USER:-trading}" \
            -d "${TRADING_AGENTS_DB_NAME:-trading_agents}" \
            -t -c "SELECT version, applied_at FROM schema_migrations ORDER BY version DESC LIMIT 3" \
            2>/dev/null | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$' || echo '(none)')"
    fi
fi

# Combine into a single context blob. We print as a Cursor "additional context"
# JSON object on stdout; Cursor reads the structured output if present.
context_body=$(cat <<EOF
## Repo state

\`\`\`
$git_status
\`\`\`

## Running services

\`\`\`
$docker_ps
\`\`\`

## Recent migrations

\`\`\`
$recent_migrations
\`\`\`
EOF
)

# Cursor's hook protocol: print a JSON object on stdout with an
# "additionalContext" key (or use the older { "context": "..." } form). Both
# are accepted; the structure below is the most compatible.
python3 - <<PY 2>/dev/null || cat <<RAW
import json, sys
print(json.dumps({"additionalContext": $(printf '%s' "$context_body" | python3 -c 'import sys,json; print(json.dumps(sys.stdin.read()))')}))
PY
RAW

exit 0
