import { Octokit } from "@octokit/rest";

class GitHubRepositories {

  private octokit

  constructor() {
    const { GITHUB_TOKEN } = useRuntimeConfig();
    this.octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });
  }

  async getAllRepositories() {
    let repositories = await this.getOrgRepositories('Mindfield-dk')
    repositories = repositories.concat(await this.getAllRepositoriesForUser('localgod'))
    //console.log(repositories.length);
    return repositories;
  }

  async getAllRepositoriesForUser(username: string) {
    const repository = await this.octokit.repos.listForUser({
      username,
      per_page: 100,

    });
    console.log(repository.data.filter(item => item.archived === false))
    return repository.data.filter(item => item.archived === false)
  }

  async getOrgRepositories(org: string) {
    let repos = []
    let page = 1
    let response

    do {
      response = await this.octokit.repos.listForOrg({
        org: org,
        per_page: 100,
        page,
      });

      repos = repos.concat(response.data);
      page++;
    } while (response.headers.link && response.headers.link.includes('rel="next"'))

    return repos;
  }

  async getSingleRepository(owner: string, repo: string) {
    const repository = await this.octokit.repos.get({
      owner: owner,
      repo: repo,
    });

    return repository.data
  }
}

export default defineEventHandler(async (event) => {
  const gitHubRepositories = new GitHubRepositories();
  return await gitHubRepositories.getAllRepositories();
})
