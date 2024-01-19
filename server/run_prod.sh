#!/bin/sh

echo "Building in production mode..."
yarn run build

echo "Running in production mode..."
node dist/main