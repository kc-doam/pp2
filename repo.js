"use strict";

// https://medium.com/nuances-of-programming/github-actions-начало-38e47a656ff2

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const accessToken = core.getInput('access-token');
    const message = core.getInput('message');

    const payload = github.context.payload;
    const githubClient = github.getOctokit(accessToken);
    core.info("Request received");

    if (payload.action === "opened") {
      core.info("New Pull Request..");
      const pullRequest = payload.pull_request;
      const userName = pullRequest.user.login;
      const owner = pullRequest.base.repo.owner.login;
      const repoName = pullRequest.base.repo.name;
      const issueNumber = pullRequest.number;
      const comment = message.replace(/{}/g, userName);

      const shouldComment = await isFirstPull(
        githubClient, owner, repoName,
        userName, issueNumber
      );

      // Отправляем комментарий к пул реквесту нового участника
      if (shouldComment) {
        core.info("Commenting");
        githubClient.issues.createComment({ owner, repo: repoName, issue_number: issueNumber, body: comment });
      }
    }
  } catch (err) {
    core.setFailed(err.message);
  }

}

run();
