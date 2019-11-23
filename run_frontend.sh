#!/bin/sh

if ! type -P node &> /dev/null; then
  echo Node.js is not installed, can be installed from https://nodejs.org/en/download/
  exit 1
fi

if ! type -P yarn &> /dev/null; then
  echo yarn is not installed, can be installed from https://yarnpkg.com/lang/en/docs/install/
  exit 1
fi

kill -9 $(lsof -t -i:3000)

cd frontend

if ! [ -d "node_modules" ]; then
  yarn
fi

yarn start

pgrep -f "sh run_frontend.sh" | xargs kill -9