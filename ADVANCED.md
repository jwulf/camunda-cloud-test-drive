# Advanced Getting Started

In this tutorial, we will look at an ecommerce order flow and correlating messages with instances of workflows.

We will use [GhettoHub DB](https://github.com/jwulf/ghettohub-db) for database persistence for our microservices. They will write to a db folder in this repository, so you will need to configure your Camunda Cloud account so that the Camunda HTTP Worker can trigger GhettoHub DB actions in this repo.

## Configure Camunda Cloud to access this repo

In this section you will create a GitHub Token that will allow the Camunda HTTP Worker to post `repository_dispatch` events to this repository. 

The token will not be available to any code that runs in response to these events, it is used only to authorize the POST request that triggers Actions. Nor will it be visible in any logs, including Operate. We will be using variable substitution to make it available to the Camunda HTTP Worker from secret Worker Variables in your Camunda Cloud account.

* Create a new GitHub Personal Access Token, following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line). It needs repo scope.

* Create a new Worker variable in your Camunda Cloud cluster, named `GitHubToken`. Paste the GitHub token in there.

All workflows and commands will use `{{GitHubToken}}` to refer to this token, and only the Camunda HTTP Worker running in Camunda Cloud will have access to its actual value at runtime, to authorize the POST to the `repository_dispatch` endpoint.