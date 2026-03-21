#!/bin/bash
set -e

npm install
npx drizzle-kit push --yes 2>/dev/null || npx drizzle-kit push
