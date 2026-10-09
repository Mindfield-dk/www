import { Octokit } from "@octokit/rest";
import { defineCachedFunction } from 'nitropack/runtime'
import { defineEventHandler, useRuntimeConfig } from 'nuxt/server'
import type Repository from "../../types/repository"

type RepositorySummary = Pick<Repository,
  | 'name'
  | 'description'
  | 'topics'
  | 'created_at'
  | 'updated_at'
  | 'html_url'
  | 'homepage'
>

class GitHubRepositories {
  private octokit;

  constructor(githubToken: string) {
    this.octokit = new Octokit({
      auth: githubToken || undefined,
    });
  }

  async getAllRepositories() {
    const orgRepos = await this.getOrgRepositories('Mindfield-dk');
    const userRepos = await this.getAllNonArchivedRepositoriesForUser('localgod');
    return [...orgRepos, ...userRepos];
  }

  async getAllNonArchivedRepositoriesForUser(username: string): Promise<Repository[]> {
    try {
      let repos: Repository[] = [];
      let page = 1;
      let response;

      do {
        response = await this.octokit.repos.listForUser({
          username,
          per_page: 100,
          page
        });

        repos = repos.concat(response.data as Repository[]);
        page++;
      } while (response.headers.link && response.headers.link.includes('rel="next"'));

      return repos.filter(repo => repo.archived === false)
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

const getRepositories = defineCachedFunction(async (githubToken: string): Promise<RepositorySummary[]> => {
  const gitHubRepositories = new GitHubRepositories(githubToken);
  return (await gitHubRepositories.getAllRepositories()).filter((repo) => {
    return !repo.topics?.includes('personal')
  } ).sort((a: Repository, b: Repository) => {
    const dateA: Date = new Date(a.created_at as string);
    const dateB: Date = new Date(b.created_at as string);
    return dateB.getTime() - dateA.getTime();
  }).map(repo => ({
    name: repo.name,
    description: repo.description,
    topics: repo.topics,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    html_url: repo.html_url,
    homepage: repo.homepage
  }))
}, {
  getKey: () => 'all',
  maxAge: 300,
  name: 'github-repositories',
  swr: true
});

export default defineEventHandler(() => {
  const { githubToken } = useRuntimeConfig()
  return getRepositories(githubToken)
})
