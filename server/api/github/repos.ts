import { Octokit } from "@octokit/rest";
import Repository from "./Repository"

class GitHubRepositories {
  private octokit;

  constructor() {
    const { GITHUB_TOKEN } = useRuntimeConfig();
    this.octokit = new Octokit({
      auth: GITHUB_TOKEN,
    });
  }

  async getAllRepositories() {
    const orgRepos = await this.getOrgRepositories('Mindfield-dk');
    const userRepos = await this.getAllNonArchivedRepositoriesForUser('localgod');
    return [...orgRepos, ...userRepos];
  }

  async getAllNonArchivedRepositoriesForUser(username: string): Promise<Repository[]> {
    try {
      const response = await this.octokit.repos.listForUser({
        username,
        per_page: 100
      });

      return (response.data as Repository[]).filter(repo => repo.archived === false)
    } catch (error) {
      console.error('Error fetching repositories for user:', username, error);
      throw error;
    }
  }

  async getOrgRepositories(org: string): Promise<Repository[]> {
    try {
      let repos: Repository[] = [];
      let page = 1;
      let response;

      do {
        response = await this.octokit.repos.listForOrg({
          org: org,
          per_page: 100,
          page,
        });

        repos = repos.concat(response.data as Repository[]);

        page++;
      } while (response.headers.link && response.headers.link.includes('rel="next"'));

      return repos;
    } catch (error) {
      console.error('Error fetching repositories for organization:', org, error);
      throw error;
    }
  }
}

export default defineEventHandler(async () => {
  const gitHubRepositories = new GitHubRepositories();
  return (await gitHubRepositories.getAllRepositories()).filter((repo) => {
    return !repo.topics.includes('personal')
  } ).sort((a: Repository, b: Repository) => {
    const dateA: Date = new Date(a.created_at as string);
    const dateB: Date = new Date(b.created_at as string);
    return dateB.getTime() - dateA.getTime();
})
});
