zbc.createWorkflowInstance("get-some", {});
module.exports = {
  tasks: {
    "get-some": (job, complete) => {
      core.info(`Got a job from Camunda Cloud:`);
      core.info(JSON.stringify(job, null, 2));
      complete.success();
    }
  }
};
