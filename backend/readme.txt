cd backend
virtualenv --python=`which python3` venv 
source ./venv/bin/activate 
cd app 
pip install -r requirements.txt 
pip install flask_cors
pip install flask_jwt_extended
python3 src/__init__.py 
go to http://127.0.0.1:5000/static/swagger-ui/index.html 