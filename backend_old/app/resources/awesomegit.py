from flask import Blueprint, request
from flask_restful import Resource

from database.schema import Git, User
from flask_jwt_extended import jwt_required, get_jwt_identity
# gits = Blueprint('awesomegit', __name__)


class AwesomeGitsApi(Resource):
    def get(self):
        query = Git.objects()
        gits = Git.objects().to_json()
        return Response(gits, mimetype="application/json", status=200)

    @jwt_required
    def post(self):
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        body = request.get_json()

        git = Git(**body).save()
        git.save()
        user.update(push__gits=git)
        user.save()
        id = git.id
        return {'id': str(id)}, 200

class AwesomeGitApi(Resource):
    def get(self, id):
        gits = Git.objects.get(id=id).to_json()
        return Response(gits, mimetype="application/json", status=200)
    
    @jwt_required
    def put(self, id):
        user_id = get_jwt_identity()
        git = Git.objects.get(id=id, added_by=user_id)
        body = request.get_json()
        Git.objects.get(id=id).update(**body)
        return '', 200

    @jwt_required
    def delete(self, id):
        user_id = get_jwt_identity()
        git = Git.objects.get(id=id, added_by=user_id)
        git.delete()
        return '', 200






# @awesomegit.route('/gits')
# def get_gits():
    # gits = Git.objects().to_json()
    # return Response(gits, mimetype="application/json", status=200)

# @awesomegit.route('/gits', methods=['POST'])
# def add_git(request):
#     body = request.get_json()
#     gits = Git(**body).save()
#     id = gits.id
#     return {'id': str(id)}, 200

# @awesomegit.route('/gits/<id>', methods=['PUT'])
# def update_git(id):
#     body = request.get_json()
#     Git.objects.get(id=id).update(**body)
#     return '', 200

# @awesomegit.route('/gits/<id>', methods=['DELETE'])
# def delete_git(id):
#     Git.objects.get(id=id).delete()
#     return '', 200

# @awesomegit.route('/gits/<id>')
# def get_git(id):
#     gits = Git.objects.get(id=id).to_json()
#     return Response(gits, mimetype="application/json", status=200)
