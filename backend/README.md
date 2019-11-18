# BACKEND SETUP

1. Install Python 3
2. Install virtualenv
3. From the project root folder run 
    `cd backend`
    ```virtualenv --python=`which python3` venv```
    `source ./venv/bin/activate`
    `pip install -r requirements.txt`
    `python3 src/__init__.py`
4. The backend is now running, to see the api definition, navigate to http://127.0.0.1:5000/static/swagger-ui/index.html

### Developer Note:

Regenerate backend api definitions with

`swagger_py_codegen -s swagger.yaml app -p src --ui --spec`


