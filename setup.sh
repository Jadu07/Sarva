#!/bin/bash

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed."
    exit 1
fi

echo "[INFO] Node $(node -v) | NPM $(npm -v)"

if [ ! -d "client" ]; then
    echo "[ERROR] Frontend folder not found."
    exit 1
fi

if [ ! -d "server" ]; then
    echo "[ERROR] Backend folder not found."
    exit 1
fi

echo "[INFO] Starting Frontend..."
cd client && npm install && npm run dev &
cd ..

echo "[INFO] Starting Backend..."
cd server && npm install && npm run dev
