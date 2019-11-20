# BACKEND SETUP
```
virtualenv --python=\`which python3\` venv <br/>
source ./venv/bin/activate <br/>
cd app <br/>
pip install -r requirements.txt <br/>
python3 src/__init__.py <br/>
http://127.0.0.1:5000/static/swagger-ui/index.html <br/>
```

# CHANGING API DESIGN
### ONlY DO IF NEEDED TO CHANGE THE API DESIGN <br/> THIS WILL OVERWRITE EXISTING CODE, MAKE SURE TO BACKUP
```
cp -R app oldapp <br/>
cp swagger.yaml oldswagger.yaml <br/>
copy new swagger design into swagger.yaml <br/>
rm -rf app <br/>
rm -rf venv <br/>
virtualenv --python=\`which python3\` venv <br/>
source ./venv/bin/activate <br/>
pip3 install swagger-py-codegen <br/>
swagger_py_codegen -s swagger.yaml app -p src --ui --spec <br/>
cd app <br/>
pip install -r requirements.txt <br/>
Then copy relevant code from oldapp <br/>
python3 src/__init__.py <br/>
http://127.0.0.1:5000/static/swagger-ui/index.html <br/>
```
