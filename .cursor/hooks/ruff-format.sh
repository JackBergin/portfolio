#!/usr/bin/env bash
# afterFileEdit hook — runs ruff format + ruff check --fix on the edited file.
#
# Cursor sends a JSON payload on stdin describing the edit; we extract the
# file path and run the formatter / linter on it. We never block (exit 0
# always) because formatting issues should not interrupt the agent's flow.
#
# Logs go to stderr, which Cursor surfaces in its hook log panel.

set -uo pipefail

# Read payload, extract file path. jq is preferred; fall back to grep if missing.
payload="$(cat)"
if command -v jq >/dev/null 2>&1; then
    file_path="$(echo "$payload" | jq -r '.file_path // .filePath // empty' 2>/dev/null)"
else
    file_path="$(echo "$payload" | grep -oE '"file_?[Pp]ath":"[^"]+"' | head -1 | sed 's/.*:"\(.*\)"/\1/')"
fi

# Bail quietly if no file path or not a Python file.
if [[ -z "$file_path" || "$file_path" != *.py ]]; then
    exit 0
fi

# Bail if the file no longer exists (the edit may have been a delete).
if [[ ! -f "$file_path" ]]; then
    exit 0
fi

# Bail if uv isn't installed in this environment (e.g. minimal CI).
if ! command -v uv >/dev/null 2>&1; then
    echo "ruff-format hook: 'uv' not found, skipping." >&2
    exit 0
fi

echo "ruff-format hook: $file_path" >&2
uv run ruff format "$file_path" 2>&1 >&2 || true
uv run ruff check --fix "$file_path" 2>&1 >&2 || true

exit 0
