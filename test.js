#!/usr/bin/env node

const command = require('commander');
const GithubContent = require('github-content');
const local = require("github-crud")
const config = require('./config.json')
const FacebookGraph = require("facebookgraph")




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

process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || config.github.token;
command
    .action(async () => {
        console.log(config.facebook.token)
        const graph = new FacebookGraph(config.facebook.token)
        /** 
        const getInstalledGroup = await graph.fetch(`${config.facebook.appId}/app_installed_groups?access_token=${config.facebook.appToken}`);
        console.log(`${config.facebook.appId}/app_installed_groups?access_token=${config.facebook.appToken}`)
        console.log(getInstalledGroup);
        */
        const payload = {
            message: "New post collected !!",
            link: "https://facebook.com/2344297192503191_2352950534971190"
        }
        console.log('/2344297192503191/feed')

        await graph.post('2344297192503191', payload);
    })
    .parse(process.argv);;