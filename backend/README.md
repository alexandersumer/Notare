# BACKEND SETUP

1. Install Python 3 from this link https://www.python.org/downloads/
2. Install virtualenv with `sudo pip3 install virtualenv`
3. Make sure you are currently in the backend directory
```
    virtualenv --python=`which python3` venv
    source ./venv/bin/activate
    pip install -r requirements.txt
    python3 app/src/__init__.py
```
4. The backend is now running, to see the api definition, navigate to http://127.0.0.1:5000/static/swagger-ui/index.html
5. Now you can run the extension setup and the frontend setup.

### Developer Note:

Regenerate backend api definitions with

`swagger_py_codegen -s swagger.yaml app -p src --ui --spec`


