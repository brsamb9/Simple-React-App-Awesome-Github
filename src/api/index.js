// https://docs.github.com/en/free-pro-team@latest/rest

const api = {
  getListOfRepos(name, topic = 'awesome') {
    // https://stackoverflow.com/questions/43259946/github-api-getting-topics-of-a-github-repository
    // curl -H "Accept: application/vnd.github.mercy-preview+json" \
    //  https://api.github.com/search/repositories?q=topic:awesome
    //
    topic = topic.toLowerCase().trim();
    name = name.toLowerCase().trim();
    let url = `https://api.github.com/search/repositories?q=${name}+topic:${topic}&order=desc&page=1`;

    return fetch(url, {method: 'GET'})
      .then((res) => res.json())
      .then((json) => relevantJSONparts(json))
      .catch((error) => console.error(error));
  },

  getRepoREADME(repoOwner, repoName) {
    repoOwner = repoOwner.toLowerCase().trim();
    repoName = repoName.toLowerCase().trim();
    // https://stackoverflow.com/questions/53605718/get-specific-readme-md-data-from-github-api
    // curl
    let url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/README.md`;
    console.log('URL: ', url);
    return fetch(url, {mode: 'no-cors', method: 'GET'})
      .then((res) => res.text())

      .catch((error) => console.error(error));
  },
};

// helper functions
function relevantJSONparts(json) {
  let vec = [];
  for (let i in json.items) {
    let body = new Object();
    body['id'] = i;
    let repo = json.items[i]['full_name'];
    [body['user'], body['repo']] = repo.split('/').map(capitalize);

    body['url'] = json.items[i]['html_url'];
    body['description'] = json.items[i]['description'];
    body['language'] = json.items[i]['language'];
    body['stars'] = json.items[i]['stargazers_count'];
    vec.push(body);
  }
  return vec;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default api;

/*
let topic = 'awesome';
    let name = 'awesome'; // repo:${name}
    let url = `https://api.github.com/search/repositories?q=${name}+topic:${topic}&sort=stars&order=desc`;

    fetch(url, {method: 'GET'})
      .then((res) => res.json())
      .then((json) => {
        console.log(json.items);
        // Log the repo name

        let vec = [];
        for (let i in json.items) {
          let body = new Object();
          body['id'] = i;
          body['repo'] = json.items[i]['full_name'];
          body['url'] = json.items[i]['html_url'];
          body['description'] = json.items[i]['description'];
          body['language'] = json.items[i]['language'];
          body['stars'] = json.items[i]['stargazers_count'];
          vec.push(body);
        }
        this.setState({jsonData: vec});
      })
      .catch((error) => console.error(error));
      */
