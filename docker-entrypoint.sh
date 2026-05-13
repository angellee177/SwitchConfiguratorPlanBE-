#!/bin/sh
set -e
cd /app

echo "[entrypoint] Running database migrations..."
node ./node_modules/typeorm/cli.js migration:run -d ./dist/src/config/typeorm.js

echo "[entrypoint] Running seeders (skipped when data already exists)..."
node ./dist/src/database/seeders/run-seeders.js

echo "[entrypoint] Starting API..."
exec node ./dist/index.js
