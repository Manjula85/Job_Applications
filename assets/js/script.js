let jobsInReviewEl = document.querySelector("#jobs-in-review");
let jobsToApplyToEl = document.querySelector("#jobs-to-apply-to");
let jobsAlreadyAppliedToEl = document.querySelector("#jobs-already-applied-to");

let buttonEl = document.querySelector("#add-job");
let jobIdCounter = 0;
let pageContentEl = document.querySelector("#page-content");
let formEl = document.querySelector("#modalForm");

//Data collected from the Modal
let date_posted = document.querySelector("#date_posted");
let job_position = document.querySelector("#job_position");
let job_link = document.querySelector("#job_link");

//Data storage
const jobs = [];
//Where data is stored
let jobDataObj;

// MODAL EDIT POST If the post is being editted (so not new) - update
let completeEditJob = function (jobDataObj, jobId) {
  //find the matching task list item
  let jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  //set new values
  jobSelected.querySelector("#date").textContent = jobDataObj.date_posted;
  jobSelected.querySelector("#position").textContent =
    jobDataObj.job_position;
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

let createJobHandler = function () {
  let jobItemEl = document.createElement("li");
  jobItemEl.className = "job-item";

  //adding draggable
  jobItemEl.setAttribute("draggable", "true");

  //Checking if we are editing or creating a new job post
  let isEdit = formEl.hasAttribute("data-job-id");

  //has data attribute, so get job id and call func() to complete edit process
  if (isEdit) {
    let jobId = formEl.getAttribute("data-job-id");
    completeEditJob(jobDataObj, jobId);
  }
  //no data attribute, so create object as normal and pass data
  else {
    //This is if it's a new Post

    //setting the collected data to an Obj
    jobDataObj = {
      date_posted: date_posted.value,
      job_position: job_position.value,
      job_link: job_link.value,
      status: "In review",
    };

    //add task id as a custom attribute
    jobItemEl.setAttribute("data-job-id", jobIdCounter);

    let jobInfoEl = document.createElement("div");
    jobInfoEl.innerHTML =
      "<li class='job-item'> Date posted: " +
      "<span id='date'>" +
      jobDataObj.date_posted +
      "</span>" +
      "<br /> Job position: " +
      "<span id='position'>" +
      jobDataObj.job_position +
      "</span>" +
      "<br /> Job link: " +
      "<span id='link'>" +
      jobDataObj.job_link +
      "</span>" +
      "</li>";

    //adding the innerHTML string with data
    jobItemEl.appendChild(jobInfoEl);

    //adding 'id' to jobDataObj
    jobDataObj.id = jobIdCounter;

    // get the data into the array
    jobs.push(jobDataObj);

    //adding the edit and delete buttons in
    let jobActionsEl = createJobActions(jobIdCounter);
    jobItemEl.appendChild(jobActionsEl);

    // Add the entire item to the list
    jobsInReviewEl.appendChild(jobItemEl);

    //increase job counter for next unique id
    jobIdCounter++;

    // saving the edited part
    saveJobs();
  }
};

let createJobActions = function (jobId) {
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "job-actions";

  //create edit button
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-job-id", jobId);

  //Reactivating the Modal too
  // data-bs-toggle="modal"
  editButtonEl.setAttribute("data-bs-toggle", "modal");
  // data-bs-target="#staticBackdrop"
  editButtonEl.setAttribute("data-bs-target", "#staticBackdrop");

  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-job-id", jobId);

  actionContainerEl.appendChild(deleteButtonEl);

  let statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-job-id", jobId);

  actionContainerEl.appendChild(statusSelectEl);

  let statusChoices = ["In review", "Jobs to Apply to", "Already applied to"];

  for (let i = 0; i < statusChoices.length; i++) {
    //create option element
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

let deleteJob = function (jobId) {
  let jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  jobSelected.remove();   //This only removes the <li> element

  //A new array to update list of tasks
  let updatedJobArr = [];

  //loop through current jobs
  for (let i = 0; i < jobs.length; i++) {
    //if jobs[i].id doesn't match the value of taskId, let's keep that job and push it into the new array
    if (jobs[i].id !== parseInt(jobId)) {
      console.log('Does this ever get executed?');
      updatedJobArr.push(jobs[i]);
    }
  }

  //reassign tasks array to be the same as the updatedJobArr
  jobs = updatedJobArr;

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
  jobSelected.querySelector("#date_posted").textContent = jobDataObj.date_posted;
  jobSelected.querySelector("#job_position").textContent = jobDataObj.job_position;
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

let jobButtonHandler = function (event) {
  //get target element from event
  let targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    let jobId = targetEl.getAttribute("data-job-id");
    //console.log('edit button things');
    editJob(jobId);
  }

  //delete button was clicked
  if (targetEl.matches(".delete-btn")) {
    let jobId = targetEl.getAttribute("data-job-id");
    deleteJob(jobId);
  }
};

//to reset the modal content when it reopens
$(function () {
  $(".modal").on("hidden.bs.modal", function () {
    $(this).find("form").trigger("reset");
  });
});

let jobStatusChangeHandler = function (event) {
  //get the job id
  let jobId = event.target.getAttribute("data-job-id");

  //get the currently selected option's value and convert to lowercase
  let statusValue = event.target.value.toLowerCase();

  //find the parent job item element based on the id
  let jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  if (statusValue === "in review") {
    jobsInReviewEl.appendChild(jobSelected);
  } else if (statusValue === "jobs to apply to") {
    jobsToApplyToEl.appendChild(jobSelected);
  } else if (statusValue === "already applied to") {
    jobsAlreadyAppliedToEl.appendChild(jobSelected);
  }

  // update job's in jabs array
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id === parseInt(jobId)) {
      jobs[i].status = statusValue;
    }
  }

  console.log("in jobstatuschangehandler(): ", jobs);

  saveJobs();
};

let dragJobHandler = function (event) {
  let jobId = event.target.getAttribute("data-job-id");

  //storing it here
  event.dataTransfer.setData("text/plain", jobId);

  //to verify the data was stored
  let getId = event.dataTransfer.getData("text/plain");
};

let dropZoneDragHandler = function (event) {
  let jobListEl = event.target.closest(".job-list");
  if (jobListEl) {
    event.preventDefault();

    jobListEl.setAttribute(
      "style",
      "background: #ffb54f; border-style: dashed;"
    );
  }

  saveJobs();
};

let dropJobHandler = function (event) {
  let id = event.dataTransfer.getData("text/plain");
  let draggableElement = document.querySelector("[data-job-id='" + id + "']");

  let dropZoneEl = event.target.closest(".job-list");
  let statusType = dropZoneEl.id;

  let statusSelectEl = draggableElement.querySelector(
    "select[name='status-change']"
  );

  if (statusType === "jobs-in-review") {
    statusSelectEl.selectedIndex = 0;
  } else if (statusType === "jobs-to-apply-to") {
    statusSelectEl.selectedIndex = 1;
  } else if (statusType === "jobs-already-applied-to") {
    statusSelectEl.selectedIndex = 2;
  }

  //remove the drag colouring
  dropZoneEl.removeAttribute("style");

  // loop through jobs array to find and update the updated job's status
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].id === parseInt(id)) {
      jobs[i].status = statusSelectEl.value.toLowerCase();
    }
  }

  console.log("What is being saved here? ", statusSelectEl.value.toLowerCase());

  dropZoneEl.appendChild(draggableElement);

  saveJobs();
};

let dragLeaveHandler = function (event) {
  let jobListEl = event.target.closest(".job-list");
  if (jobListEl) {
    jobListEl.removeAttribute("style");
  }
};

let saveJobs = function () {
  localStorage.setItem("jobs", JSON.stringify(jobs));
};

buttonEl.addEventListener("click", createJobHandler);
pageContentEl.addEventListener("click", jobButtonHandler);
pageContentEl.addEventListener("change", jobStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragJobHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropJobHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
