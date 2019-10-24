const GithubContent = require('github-content');

const GetGithubContentAsync = template => new Promise((resolve, reject) => {
    const options = {
        owner: 'mahasak',
        repo: 'DramaCollector',
        branch: 'master'
    };

    const gc = new GithubContent(options);

    gc.file(template, (err, file) => err ? reject(err) : resolve(file));
});

const file = await GetGithubContentAsync("DRAMA.MD");

console.log(file);