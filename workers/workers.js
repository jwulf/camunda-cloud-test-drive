module.exports = {
  tasks: {
    "get-some": (job, complete) => {
      core.info(job);
      complete.success();
    }
  }
};
