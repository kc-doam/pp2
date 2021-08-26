"use strict";

import { context, GitHub } from '@actions/github/lib/github';
import * as core from '@actions/core'; const TOKEN = core.getInput('github-token', {required: true}); // client может использовать весть REST api от octokit https://octokit.github.io/rest.js/v18
const client = new GitHub(TOKEN); // context содержит всю информацию 
const {
  payload: {
    repository,
    organization: { login: owner },
    pull_request: pullRequest,
  },
} = context;const isPRMerged = await octokit.pulls.checkIfMerged({
  owner,
  repo: repository.name,
  pull_number: pullRequest.number
});
