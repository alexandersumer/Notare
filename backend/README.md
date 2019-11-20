# Backend Setup

```
virtualenv --python=`which python3` venv
source ./venv/bin/activate
cd app
pip install -r requirements.txt
python3 src/__init__.py
http://127.0.0.1:5000/static/swagger-ui/index.html
```

# Changing API Design

### ONlY DO IF NEEDED TO CHANGE THE API DESIGN <br/> THIS WILL OVERWRITE EXISTING CODE, MAKE SURE TO BACKUP

```
cp -R app oldapp
cp swagger.yaml oldswagger.yaml

# Copy new swagger design into swagger.yaml

rm -rf app
rm -rf venv
virtualenv --python=`which python3` venv
source ./venv/bin/activate
pip3 install swagger-py-codegen
swagger_py_codegen -s swagger.yaml app -p src --ui --spec
cd app
pip install -r requirements.txt

# Copy relevant code from oldapp

python3 src/__init__.py
http://127.0.0.1:5000/static/swagger-ui/index.html
```
