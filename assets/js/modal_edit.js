// MODAL EDIT POST If the post is being editted (so not new) - update
let completeEditJob = function (jobDataObj, jobId) {
  //find the matching task list item
  let jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  //set new values
  jobSelected.querySelector("#date").textContent = jobDataObj.date_posted;
  jobSelected.querySelector("#position").textContent = jobDataObj.job_position;
  jobSelected.querySelector("#link").textContent = jobDataObj.job_link;

  // loop through jobs array and job object with new content
  for (let i = 0; i < jobs, length; i++) {
    if (jobs[i].id === parseInt(jobId)) {
      jobs[i].date_posted = date_posted;
      jobs[i].job_position = job_position;
      jobs[i].job_link = job_link;
    }
  }

  formEl.removeAttribute("data-job-id");
  document.querySelector("#add-job").textContent = "Save";

  saveJobs();
};

// JOB POST EDIT
let editJob = async function (jobId) {
  //get job list item element
  let jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  formEl.setAttribute("data-job-id", jobId);

  console.log("Selected job info: ", jobSelected);
  console.log("date posted: ", date_posted);
  console.log("content in jobdataobj: ", jobDataObj);

  //get content from posted date, job link and job position
  jobSelected.querySelector("#date_posted").textContent =
    jobDataObj.date_posted;
  jobSelected.querySelector("#job_position").textContent =
    jobDataObj.job_position;
  jobSelected.querySelector("#job_link").textContent = jobDataObj.job_link;

  //loop through the job array and add new content from the jobDataObj
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id === parseInt(jobId)) {
      jobs[i].date_posted = jobDataObj.date_posted.value;
      jobs[i].job_position = jobDataObj.job_position.value;
      jobs[i].job_link = jobDataObj.job_link.value;
      /* Extra */
      //jobs[i].id = parseInt(jobId);
    }
  }

  console.log("Jobs soon after editing: ", jobs);

  document.querySelector("#add-job").textContent = "Save post";

  saveJobs();
};
