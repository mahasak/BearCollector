#!/usr/bin/env node

const command = require('commander');
const GithubContent = require('github-content');
const local = require("github-crud");
const config = require('./config.json')
const GetGithubContentAsync = template => new Promise((resolve, reject) => {
    const options = {
        owner: 'mahasak',
        repo: 'DramaCollector',
        branch: 'master'
    };

    const gc = new GithubContent(options);

    gc.file(template, (err, file) => err ? reject(err) : resolve(file));
});

const WriteGithubContentAsync = content => new Promise((resolve, reject) => {
    local.githubCrudContentPut({
        content: content,
        modeDebug: false,
        message: "commit message 1",
        url: "https://github.com/mahasak/DramaCollector/blob/master/DRAMA.MD"
    }, (err)=>{ console.log(err)} );
})

process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || config.token;
command
    .action(async () => {
        console.log("test")
        const file = await GetGithubContentAsync("DRAMA.MD");

        console.log(file.contents.toString());
        const test = await WriteGithubContentAsync("## Drama Collector");
    })
    .parse(process.argv);;