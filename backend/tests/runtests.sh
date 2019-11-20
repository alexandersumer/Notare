source ../venv/bin/activate
rm database.db
python3 ../app/src/__init__.py &
sleep 5
pytest -vs notare
rm database.db
deactivate
kill -9 `ps | grep "python3 ../app/src/__init__.py" | head -n 1 | cut -d" " -f2`
kill -9 `ps | grep "/pyt" | head -n 1 | cut -d" " -f2`
