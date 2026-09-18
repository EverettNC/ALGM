#!/bin/sh
set -eu

# Run from the repo this script lives in, whatever the path is. The Grok export
# hard-coded `cd /workspace`, which exists only inside that sandbox — this
# script failed on line 3 everywhere else, including on a fresh clone.
cd "$(CDPATH= cd "$(dirname "$0")" && pwd)"
while [ ! -f package.json ] && [ "$PWD" != "/" ]; do cd ..; done
[ -f package.json ] || { echo "no package.json found above $0"; exit 1; }

PORT=9099
URL="http://127.0.0.1:$PORT/"
LOG=/tmp/algm-startup.log

[ -f scripts/preview.mjs ] && node scripts/preview.mjs stop >>"$LOG" 2>&1 || true

# Idempotent: if it is already serving, leave it alone.
if curl -sf -o /dev/null --max-time 2 "$URL"; then
  echo "already up on $URL"
  exit 0
fi

if [ -f "$LOG" ] && [ "$(wc -c <"$LOG")" -gt 5000000 ]; then
  mv "$LOG" "$LOG.1"
fi
echo "--- start $(date) in $PWD ---" >>"$LOG"

nohup npm run dev >>"$LOG" 2>&1 &
APP_PID=$!
echo "$APP_PID" >/tmp/algm-startup.pid

# Wait for it to answer, and fail loudly with the log if it dies instead of
# leaving the caller to guess.
i=0
while [ "$i" -lt 60 ]; do
  if curl -sf -o /dev/null --max-time 2 "$URL"; then
    echo "up on $URL (pid $APP_PID)"
    exit 0
  fi
  if ! kill -0 "$APP_PID" 2>/dev/null; then
    echo "dev server exited during startup. Last 40 lines:"
    tail -n 40 "$LOG"
    exit 1
  fi
  i=$((i + 1))
  sleep 1
done

echo "no response on $URL after 60 seconds. Last 40 lines:"
tail -n 40 "$LOG"
exit 1
