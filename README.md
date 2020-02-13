# Camunda Cloud Starter

[![Actions Panel](https://img.shields.io/badge/actionspanel-enabled-brightgreen)](https://www.actionspanel.app/app/jwulf/camunda-cloud-starter)

Getting Started with Camunda Cloud using GitHub.

## Setup

* Fork this repo to your own account.
* Get a [Camunda Cloud](https://camunda.io) Account.
* Create a new client in the Camunda Cloud console.
* Click the button to copy the entire client configuration

![](img/client-config.png)

* Create a new secret in your repository's Settings > Secrets ([instructions](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets)). Call it `ZEEBE_CLIENT_CONFIG`, and paste in the client config:

![](img/secrets.png)

* Go to [https://www.actionspanel.app/](https://www.actionspanel.app/) and sign in with GitHub.

* Install the Actions Panel app to your forked repo.

![](img/actionspanel.png)

![](img/actionspanel-install.png)

* Go back to [https://www.actionspanel.app/](https://www.actionspanel.app/)

* You now have buttons to run the various demo workflows in this starter.

![](img/buttons.png)

## Run the demos

* Open the "Actions" view in your repo in one browser tab.

![](img/actions.png)

* Open [https://www.actionspanel.app/](https://www.actionspanel.app/) in another.

* Click on "Run this action" to "Deploy the demo workflows to your Camunda Cloud Zeebe cluster".

* After you click it, refresh the Actions view in the repo.