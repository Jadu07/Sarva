#!/usr/bin/env bash

if ! command -v node > /dev/null; then
  echo "[ERROR] node not installed"
  exit 1
fi

if ! command -v npm > /dev/null; then
  echo "[ERROR] npm not installed"
  exit 1
fi

for dir in client server
do
  if [ -d "$dir" ]; then
    cd "$dir" || exit 1

    if [ -d "node_modules" ]; then
      echo "[INFO] Skipping install in $dir"
    else
      echo "[INFO] Installing in $dir"
      npm install
    fi

    cd ..
  fi
done
