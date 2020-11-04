from .awesomegit import AwesomeGitsApi, AwesomeGitApi
from .auth import SignupApi, LoginApi

def initialize_routes(api):
    api.add_resource(AwesomeGitsApi, '/api/awesomegits')
    api.add_resource(AwesomeGitApi, '/api/awesomegits/<id>')

    api.add_resource(SignupApi, '/api/auth/signup')
    api.add_resource(LoginApi, '/api/auth/login')
