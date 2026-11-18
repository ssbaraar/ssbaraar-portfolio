#!/bin/zsh
set -eu
cd -- "${0:A:h}"
if [[ ! -x node_modules/.bin/next ]]; then
  npm ci
fi
exec npm run dev -- --hostname 127.0.0.1 --port 3100
