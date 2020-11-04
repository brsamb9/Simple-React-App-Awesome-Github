# https://dev.to/paurakhsharma/flask-rest-api-part-1-using-mongodb-with-flask-3g7d
from flask_mongoengine import MongoEngine

db = MongoEngine()

def initialize_db(app):
    db.init_app(app)