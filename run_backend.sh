#!/bin/sh

if ! type -P python3 &> /dev/null; then
  echo Python 3 is not installed, can be installed from https://www.python.org/downloads/
  exit 1
fi

if ! pip list | grep -w "virtualenv" &> /dev/null; then
  python3 -m pip install virtualenv
fi

kill -9 $(lsof -t -i:5000)

cd backend

if ! [ -d "venv" ]; then
  virtualenv --python=`which python3` venv
fi

source venv/bin/activate

python3 -m pip install -q -r requirements.txt

python3 app/src/__init__.py