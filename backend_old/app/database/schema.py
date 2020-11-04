#~movie-bag/database/models.py
from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class Git(db.Document):
    topic = db.StringField(required=True, unique=True)
    page_link = db.StringField(required=True, unique=True)
    favourite_subheading = db.ListField(db.StringField(), required=False)
    stars = db.StringField(required=True)
    description =db.StringField(required=False)


class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    favourite_gits = db.ListField(db.ReferenceField('Git', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

User.register_delete_rule(Git, 'added_by', db.CASCADE)

#for example
#     {
#         "topic": "awesome-react-native",
#         "page_link": "https://github.com/jondot/awesome-react-native",
#         "["#tutorials"]"
#         "stars": "28.4k", # need a number to string
#         "description": "Awesome React Native is an awesome style list that curates the best React Native libraries, tools, tutorials, articles and more. PRs are welcome! "
#     },
# ]