## Running Backend

The follow instruction are for Mac and Linux computers.

1. Ensure you have the following software installed:
- Python 3, can be installed from https://www.python.org/downloads/
- virtualenv, can be installed using `python3 -m pip install virtualenv`
2. Ensure you are in `Notare/backend`
3. Run the following commands:

```
virtualenv --python=`which python3` venv
source venv/bin/activate
python3 -m pip install -r requirements.txt
python3 app/src/__init__.py
```

4. The backend is now running, to see the API definition, navigate to http://127.0.0.1:5000/static/swagger-ui/index.html

### Developer Note:

Regenerate backend api definitions with

`swagger_py_codegen -s swagger.yaml app -p src --ui --spec`

## Running Backend Tests

1. `cd tests`
2. `sh run_tests.sh`
