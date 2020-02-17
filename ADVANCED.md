# Advanced Getting Started

In this tutorial, we will look at an ecommerce order flow and correlating messages with instances of workflows.

We will use [GhettoHub DB](https://github.com/jwulf/ghettohub-db) for database persistence for our microservices. They will write to a db folder in this repository, so you will need to configure your Camunda Cloud account so that the Camunda HTTP Worker can trigger GhettoHub DB actions in this repo.

## Configure Camunda Cloud to access this repo

* Create a new GitHub Personal Access Token, following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

_Editor's Note_: To not require a GitHub Token (which can access all of the user's repos), we could create a GhettoHub GitHub Application that can be added to just this repo.