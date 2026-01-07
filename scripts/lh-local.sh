#!/usr/bin/env bash
set -euo pipefail

# Local Lighthouse runner that disables analytics so audits don't chase third-party scripts.
# Usage: ./scripts/lh-local.sh

export NEXT_PUBLIC_DISABLE_ANALYTICS=1
export DEBUG="lighthouse*"

URL=${1:-http://127.0.0.1:3001}
OUT_JSON=./lh-after-analytics-disabled.json
OUT_LOG=./lh-after-analytics-disabled.log

echo "Running Lighthouse against ${URL} (analytics disabled)"
DEBUG=${DEBUG} NEXT_PUBLIC_DISABLE_ANALYTICS=${NEXT_PUBLIC_DISABLE_ANALYTICS} \
  npx -y lighthouse "${URL}" \
    --output json --output-path="${OUT_JSON}" \
    --chrome-flags="--no-sandbox --disable-dev-shm-usage --headless" \
    --max-wait-for-load=60000 --verbose > "${OUT_LOG}" 2>&1

echo "Finished. JSON -> ${OUT_JSON}, log -> ${OUT_LOG}"
