#!/usr/bin/env bash

if ! command -v node > /dev/null; then
  echo "[ERROR] node not installed"
  exit 1
fi

if ! command -v npm > /dev/null; then
  echo "[ERROR] npm not installed"
  exit 1
fi

cd server || exit 1
npm run dev
