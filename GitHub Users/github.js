class Github{
  constructor(){
    this.client_id = 'b6589c773e78cb724faa';
    this.client_secret = 'f4dda5b154ae037fc52c8bc7b38e5bf5bc49d2d1';
    this.repos_count = 5;
    //Can use this in the query string to format the response
    this.repos_sort = 'created: asc';
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}client_id=${this.client_id}&client_secret=${this.client_secret}`);


    const profile = await profileResponse.json()
    const repos = await repoResponse.json()

   return {
      profile,
      repos
    }
  }

  // async getRepos(repo_url){
  //   const reposResponse = await fetch(`${repo_url}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

  //   const repos = await reposResponse.json()

  //  return {
  //     repos
  //   }
  // }

}
