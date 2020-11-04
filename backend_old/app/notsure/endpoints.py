from flask import Flask
from flask_restful import Api


from .middlewares import login_required
from app.awesomegit.service import Service as Awesome
from app.awesomegit.schema import GithubRepoSchema



app = Flask(__name__)
app.config['']




@app.route("/awesomegit", methods=["GET"])
@login_required
def index():
 return json_response(Awesome(g.user).find_all_awesomes())


@app.route("/awesomegit", methods=["POST"])
@login_required
def create():
   github_repo = GithubRepoSchema().load(json.loads(request.data))
  
   if github_repo.errors:
     return json_response({'error': github_repo.errors}, 422)

   awesome = Awesome(g.user).create_awesome_for(github_repo)
   return json_response(awesome)


@app.route("/awesomegit/<int:repo_id>", methods=["GET"])
@login_required
def show(repo_id):
 awesome = Awesome(g.user).find_awesome(repo_id)

 if awesome:
   return json_response(awesome)
 else:
   return json_response({'error': 'awesome not found'}, 404)


@app.route("/awesomegit/<int:repo_id>", methods=["PUT"])
@login_required
def update(repo_id):
   github_repo = GithubRepoSchema().load(json.loads(request.data))
  
   if github_repo.errors:
     return json_response({'error': github_repo.errors}, 422)

   awesome_service = Awesome(g.user)
   if awesome_service.update_awesome_with(repo_id, github_repo):
     return json_response(github_repo.data)
   else:
     return json_response({'error': 'awesome not found'}, 404)

  
@app.route("/awesome/<int:repo_id>", methods=["DELETE"])
@login_required
def delete(repo_id):
 awesome_service = Awesome(g.user)
 if awesome_service.delete_awesome_for(repo_id):
   return json_response({})
 else:
   return json_response({'error': 'awesome not found'}, 404)


def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})
