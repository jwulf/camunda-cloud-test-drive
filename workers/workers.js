zbc.createWorkflowInstance("get-some", {});
module.exports = {
  tasks: {
    "get-some": (job, complete) => {
      core.info(JSON.stringify(job));
      complete.success();
    }
  }
};
