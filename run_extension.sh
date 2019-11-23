#!/bin/sh

if ! type -P node &> /dev/null; then
  echo Node.js is not installed, can be installed from https://nodejs.org/en/download/
  exit 1
fi

if ! type -P npm &> /dev/null; then
  echo npm is not installed, can be installed from https://www.npmjs.com/get-npm/
  exit 1
fi

cd extension

if ! [ -d "node_modules" ]; then
  npm i
fi

npm run watch

pgrep -f "sh run_extension.sh" | xargs kill -9