
print('__file__={0:<35} | __name__={1:<20} | __package__={2:<20}'.format(__file__,__name__,str(__package__)))

from .schema import AwesomeGitSchema
from ..repository import Repository
from ..repository.mongo import MongoRepository

class Service(object):
    def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")

    def find_all_awesomes(self):
        Awesomes  = self.repo_client.find_all({'user_id': self.user_id})
        return [self.dump(awesome) for awesome in Awesomes]

    def find_awesome(self, repo_id):
        awesome = self.repo_client.find({'user_id': self.user_id, 'repo_id': repo_id})
        return self.dump(awesome)

    def create_awesome_for(self, githubRepo):
        self.repo_client.create(self.prepare_awesome(githubRepo))
        return self.dump(githubRepo.data)

    def update_awesome_with(self, repo_id, githubRepo):
        records_affected = self.repo_client.update({'user_id': self.user_id, 'repo_id': repo_id}, self.prepare_awesome(githubRepo))
        return records_affected > 0

    def delete_awesome_for(self, repo_id):
        records_affected = self.repo_client.delete({'user_id': self.user_id, 'repo_id': repo_id})
        return records_affected > 0

    def dump(self, data):
        return AwesomeGitSchema(exclude=['_id']).dump(data).data

    def prepare_awesome(self, githubRepo):
        data = githubRepo.data
        data['user_id'] = self.user_id
        return data