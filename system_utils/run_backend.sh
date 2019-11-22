#!/bin/sh
cd backend
virtualenv --python=`which python3` venv
source ./venv/bin/activate
python3 -m pip install -r requirements.txt
python3 app/src/__init__.py