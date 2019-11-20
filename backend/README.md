# Backend Setup

Make sure you are in `Notare/backend/`

```
virtualenv --python=`which python3` venv

source ./venv/bin/activate

cd app

python3 -m pip install -r requirements.txt

python3 src/__init__.py

http://127.0.0.1:5000/static/swagger-ui/index.html
```

# Changing API Design

Make sure you are in `Notare/backend/`

```
cp -R app oldapp

cp swagger.yaml oldswagger.yaml
```

Copy new swagger design into swagger.yaml

```
rm -rf app

rm -rf venv

virtualenv --python=`which python3` venv

source ./venv/bin/activate

python3 -m pip install swagger-py-codegen

swagger_py_codegen -s swagger.yaml app -p src --ui --spec

cd app

pip install -r requirements.txt
```

Copy relevant code from oldapp

```
python3 src/__init__.py

http://127.0.0.1:5000/static/swagger-ui/index.html
```
