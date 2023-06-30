import { Octokit } from "@octokit/rest";


const { GITHUB_TOKEN } = useRuntimeConfig()

const octokit = new Octokit({
    auth: GITHUB_TOKEN,
})


async function getAllRepositories() {
    let repos = []
    let page = 1
    let response
  
    do {
      response = await octokit.repos.listForOrg({
        org: 'Mindfield-dk',
        per_page: 100,
        page
      });
  
      repos = repos.concat(response.data);
      page++;
    } while (response.headers.link && response.headers.link.includes('rel="next"'));
  
    return repos;
  }



export default defineEventHandler(async (event) => {

/*

    const repo = await octokit.repos.get({
        owner: 'Mindfield-dk',
        repo: 'docker-sonarqube-scanner'})

    return repo.data
    */
   return await getAllRepositories()
})