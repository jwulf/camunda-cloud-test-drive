# Camunda Cloud Starter

[![Actions Panel](https://img.shields.io/badge/actionspanel-enabled-brightgreen)](https://www.actionspanel.app/app/jwulf/camunda-cloud-starter)

Getting Started with Camunda Cloud with no code or installation of software, using the [Zeebe GitHub Action](https://github.com/marketplace/actions/zeebe-action).

## Setup

* Fork this repo to your own account.
* Get a [Camunda Cloud](https://camunda.io) Account.
* Create a new client in the Camunda Cloud console.
* Click the button to copy the entire client configuration

![](img/client-config.png)

* Create a new secret in your forked repository's Settings > Secrets ([instructions](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets#creating-encrypted-secrets)). Call it `ZEEBE_CLIENT_CONFIG`, and paste in the client config:

![](img/secrets.png)

When you hit "Add secret", you should see this:

![](img/secret-done.png)

* Now, we will add an app to this repo that lets you trigger GitHub Actions from a web-based UI. Go to [Actions Panel](https://www.actionspanel.app/) and sign in with your GitHub account.

* Install the Actions Panel app to your forked repo.

![](img/actionspanel.png)

![](img/actionspanel-install.png)

* Go back to [Actions Panel](https://www.actionspanel.app/)

* You now have buttons to run the various demo workflows in this starter.

![](img/buttons.png)

## Deploy the demo workflows

* Open the "Actions" view in your repo in one browser tab.

![](img/actions.png)

* Open [Actions Panel](https://www.actionspanel.app/) in another browser window.

* In Actions Panel, click on "Run this action" for "_Deploy the demo workflows to your Camunda Cloud Zeebe cluster_". This will deploy the workflows to your cluster.

![](img/click-to-deploy.png)

* After you click the button, refresh the Actions view in the other browser window. You will see the "Deploy Workflows" job running.

![](img/deploying.png)

* Click in the details of the job, and you will see the workflows being deployed to the cluster.

![](img/deployed.png)

* The workflow definitions are now deployed to the cluster. Go to the Camunda Operate dashboard in Camunda Cloud and you will see them there.

![](img/deployed-operate.png)

The GitHub Action that deploys the workflows to Camunda Cloud is in [.github/workflows/deploy-workflows.yml](/.github/workflows/deploy-workflows.yml).

Under the hood, the Zeebe GitHub Action uses the [Zeebe Node.js client](https://www.npmjs.com/package/zeebe-node#deploy-a-workflow) to do this (see the code [here](https://github.com/jwulf/zeebe-action/blob/master/src/main.ts#L88)). 

## Run the Get Time demo

The Get Time demo model is [bpmn/demo-get-time.bpmn](bpmn/demo-get-time.bpmn).

If you open the model in the [Zeebe Modeler](https://github.com/zeebe-io/zeebe-modeler), you will see this:

![](img/get-time-model.png)

It has a single task in it. The task is serviced by the Camunda Cloud HTTP Worker. It does a GET request to the [Camunda Cloud Demo JSON API](https://github.com/jwulf/camunda-cloud-demo-json-api) to get the current time as a JSON object.

Let's create an instance of this workflow.

* In your [Actions Panel](https://www.actionspanel.app/), click on "Run this action" for "_Run the "Get Time" demo workflow_".

![](img/click-to-run-get-time.png)

* In the Actions view of your repo, you will see the "Run Get Time Demo" running. The code for this is in [.github/workflows/demo-get-time.yml].

![](img/run-get-time.png)

* Click into it, and you will see the outcome of the workflow:

![](img/get-time-output.png)

The response from the call to the JSON API has been added to the workflow variables.

## Creating a workflow and awaiting the outcome 

We see the output of the workflow here because we used the [`createWorkflowInstanceWithResult`](https://docs.zeebe.io/reference/grpc.html#createworkflowinstance-rpc) call. This call creates a workflow instance, and awaits the result.

Under the hood, the Zeebe GitHub Action uses the Node.js client (see the implementation [here](https://github.com/jwulf/zeebe-action/blob/master/src/main.ts)), and this command is documented for the Node client [here](https://zeebe.joshwulf.com/createwf/createwf/#create-a-workflow-instance-and-await-its-outcome). You can use it with any [Zeebe client library](https://docs.zeebe.io/clients/index.html).

This pattern is useful for short-lived processes, where the creator of the workflow will also act on the outcome - including passing it back to a requestor (for example inside a REST response). See [this blog post](https://zeebe.io/blog/2019/10/0.22-awaitable-outcomes/) for more information.

## Mapping variables

If you have a workflow that makes a number of REST calls, you don't want subsequent tasks to overwrite the results of previous calls.

You can accomplish this by creating variable mappings on your tasks. In the next demo [bpmn/demo-get-time-2.bpmn](bpmn/demo-get-time-2.bpmn), we create a mapping on the "Get JSON time" task to map the `body` variable to a new `time_from_api` variable.

Here is what that looks like in the Zeebe Modeler: 

![](img/get-time-output-mapping.png)

And in the model XML: 

```XML
<zeebe:ioMapping>
    <zeebe:output source="body" target="time_from_api" />
</zeebe:ioMapping>
```

Let's run the demo!

* In [Actions Panel](https://www.actionspanel.app/) click the _Run the "Get Time No. 2" demo workflow_ button.

The "Run Get Time Demo 2" workflow will run in your repo's Actions.

This time you will see output similar to the following:

![](img/get-time-2-output.png)

The value of the response from the JSON API has been mapped to the variable `time_from_api` in the workflow variables. 

Note also that the status code, which was present in the first demo as the `status` variable, is gone. Once you map one variable on the output, you need to map _all_ the variables that you want. So it acts to both map and constrain the variables that are added to the workflow variables.

