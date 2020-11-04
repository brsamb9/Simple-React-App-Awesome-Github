
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from flask_restful import Api

from database.db import initialize_db
from resources.routes import initialize_routes

# from resources.awesomegit import gits

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# https://pythonbasics.org/flask-mongodb/
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/AwesomeGits'
}

initialize_db(app)
initialize_routes(api)
# app.register_blueprint(gits)

app.run()