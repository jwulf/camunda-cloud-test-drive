import { ZBClient } from "zeebe-node";

// Uses Camunda Cloud credentials from the environment
const zbc = new ZBClient();

async function main() {
  try {
    const res = await zbc.createWorkflowInstanceWithResult(
      "demo-get-greeting-2",
      {}
    );
    console.log("===Outcome to Requestor===");
    console.log(JSON.stringify(res, null, 2));
    console.log("===Outcome to Requestor===");
  } catch (e) {
    console.log(`Got an error running that workflow: ${e.message}`);
  }
  await zbc.close();
}

zbc.createWorker(null, "get-greeting", (job, complete) => {
  console.log("===Worker===");
  console.log(`Got a job from Camunda Cloud:`);
  console.log(JSON.stringify(job, null, 2));
  console.log("===Worker===");
  const { hour } = job.variables;
  let greeting;
  if (hour > 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 20) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night!";
  }
  complete.success({ greeting });
});

main();
