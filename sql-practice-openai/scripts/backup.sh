#!/usr/bin/env sh
set -eu
: "${DATABASE_URL:?DATABASE_URL is required}"
out="${1:-./backups}"
mkdir -p "$out"
ts="$(date -u +%Y%m%dT%H%M%SZ)"
pg_dump "$DATABASE_URL" --format=custom --file="$out/sql-practice-$ts.dump"
echo "Backup written to $out/sql-practice-$ts.dump"
