import { ZBClient } from "zeebe-node";

// Uses Camunda Cloud credentials from the environment
const zbc = new ZBClient();

async function main() {
  try {
    const res = await zbc.createWorkflowInstanceWithResult({
      bpmnProcessId: "get-time-demo",
      variables: {}
    });
    console.log(res);
  } catch (e) {
    console.log(`Got an error running that workflow: ${e.message}`);
  }
}

main();
