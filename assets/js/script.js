var jobsInReviewEl = document.querySelector("#jobs-in-review");
var jobsToApplyToEl = document.querySelector("#jobs-to-apply-to");
var jobsAlreadyAppliedToEl = document.querySelector("#jobs-already-applied-to");

var buttonEl = document.querySelector("#add-job");
var jobIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#modalForm");

//Data collected from the Modal
var date_posted = document.querySelector("#date_posted");
var job_position = document.querySelector("#job_position");
var job_link = document.querySelector("#job_link");

//Data storage
var jobs = [];
//Where data is stored
var jobDataObj;

var completeEditJob = function (jobDataObj, jobId) {
  //find the matching task list item
  var jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  //set new values
  jobSelected.querySelector("#date").textContent = jobDataObj.date_posted.value;
  jobSelected.querySelector("#position").textContent =
    jobDataObj.job_position.value;
  jobSelected.querySelector("#link").textContent = jobDataObj.job_link.value;

  // loop through jobs array and job object with new content
  for (var i = 0; i < jobs, length; i++) {
    if (jobs[i].id === parseInt(jobId)) {
      jobs[i].date_posted = date_posted;
      jobs[i].job_position = job_position;
      jobs[i].job_link = job_link;
    }
  }

  formEl.removeAttribute("data-job-id");
  document.querySelector("#add-job").textContent = "Save";
};

var createJobHandler = function () {
  var jobItemEl = document.createElement("li");
  jobItemEl.className = "job-item";

  //setting the collected data to an Obj
  jobDataObj = {
    date_posted: date_posted,
    job_position: job_position,
    job_link: job_link,
    status: "In review",
  };

  // testing
  console.log(jobDataObj);
  console.dir(jobDataObj.status);

  //get the id counter in as well
  jobDataObj.id = jobIdCounter;
  // get the data into the array
  jobs.push(jobDataObj);

  //adding draggable
  jobItemEl.setAttribute("draggable", "true");

  //Checking if we are editing or creating a new job post
  var isEdit = formEl.hasAttribute("data-job-id");

  //has data attribute, so get job id and call func() to complete edit process
  if (isEdit) {
    var jobId = formEl.getAttribute("data-job-id");
    completeEditJob(jobDataObj, jobId);
  }
  //no data attribute, so create object as normal and pass data
  else {
    //add task id as a custom attribute
    jobItemEl.setAttribute("data-job-id", jobIdCounter);

    var jobInfoEl = document.createElement("div");
    jobInfoEl.innerHTML =
      "<li class='job-item'> Date posted: " +
      "<span id='date'>" +
      jobDataObj.date_posted.value +
      "</span>" +
      "<br /> Job position: " +
      "<span id='position'>" +
      jobDataObj.job_position.value +
      "</span>" +
      "<br /> Job link: " +
      "<span id='link'>" +
      jobDataObj.job_link.value +
      "</span>" +
      "</li>";

    //adding the innerHTML string with data
    jobItemEl.appendChild(jobInfoEl);

    //adding the edit and delete buttons in
    var jobActionsEl = createJobActions(jobIdCounter);
    jobItemEl.appendChild(jobActionsEl);

    // Add the entire item to the list
    jobsInReviewEl.appendChild(jobItemEl);

    //increase job counter for next unique id
    jobIdCounter++;
  }
};

var createJobActions = function (jobId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "job-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
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
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-job-id", jobId);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-job-id", jobId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["In review", "Jobs to Apply to", "Already applied to"];

  for (var i = 0; i < statusChoices.length; i++) {
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var deleteJob = function (jobId) {
  var jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );
  jobSelected.remove();
};

var editJob = function (jobId) {
  //get job list item element
  var jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  formEl.setAttribute("data-job-id", jobId);
  console.log(formEl);

  //get content from posted date, job link and job position
  var datePostedModal = jobSelected.querySelector("#date").textContent;
  jobDataObj.date_posted.value = datePostedModal;

  var jobPositionModal = jobSelected.querySelector("#position").textContent;
  jobDataObj.job_position.value = jobPositionModal;

  var jobLinkModal = jobSelected.querySelector("#link").textContent;
  jobDataObj.job_link.value = jobLinkModal;

  document.querySelector("#add-job").textContent = "Edit post";
};

var jobButtonHandler = function (event) {
  //get target element from event
  var targetEl = event.target;

  //edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var jobId = targetEl.getAttribute("data-job-id");
    //console.log('edit button things');
    editJob(jobId);
  }

  //delete button was clicked
  if (targetEl.matches(".delete-btn")) {
    var jobId = targetEl.getAttribute("data-job-id");
    deleteJob(jobId);
  }
};

//to reset the modal content when it reopens
$(function () {
  $(".modal").on("hidden.bs.modal", function () {
    $(this).find("form").trigger("reset");
  });
});

var jobStatusChangeHandler = function (event) {
  //get the job id
  var jobId = event.target.getAttribute("data-job-id");

  //get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  //find the parent job item element based on the id
  var jobSelected = document.querySelector(
    ".job-item[data-job-id='" + jobId + "']"
  );

  if (statusValue === "jobs-in-review") {
    jobsInReviewEl.appendChild(jobSelected);
  } else if (statusValue === "jobs-to-apply-to") {
    jobsToApplyToEl.appendChild(jobSelected);
  } else if (statusValue === "jobs-already-applied-to") {
    jobsAlreadyAppliedToEl.appendChild(jobSelected);
  }

  // update job's in jabs array
  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i].id === parseInt(jobId)) {
      jobs[i].status = statusValue;
    }
  }

  console.log('in jobstatuschangehandler(): ',jobs);
};

var dragJobHandler = function (event) {
  var jobId = event.target.getAttribute("data-job-id");

  //storing it here
  event.dataTransfer.setData("text/plain", jobId);

  //to verify the data was stored
  var getId = event.dataTransfer.getData("text/plain");
};

var dropZoneDragHandler = function (event) {
  var jobListEl = event.target.closest(".job-list");
  if (jobListEl) {
    event.preventDefault();

    jobListEl.setAttribute(
      "style",
      "background: #ffb54f; border-style: dashed;"
    );
  }
};

var dropJobHandler = function (event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-job-id='" + id + "']");

  var dropZoneEl = event.target.closest(".job-list");
  var statusType = dropZoneEl.id;

  var statusSelectEl = draggableElement.querySelector(
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
  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i].id === parseInt(id)) {
      jobs[i].status = statusSelectEl.value.toLowerCase();
    }
  }

  console.log('What is being saved here? ', statusSelectEl.value.toLowerCase());

  dropZoneEl.appendChild(draggableElement);
};

var dragLeaveHandler = function (event) {
  var jobListEl = event.target.closest(".job-list");
  if (jobListEl) {
    jobListEl.removeAttribute("style");
  }
};

buttonEl.addEventListener("click", createJobHandler);
pageContentEl.addEventListener("click", jobButtonHandler);
pageContentEl.addEventListener("change", jobStatusChangeHandler);

pageContentEl.addEventListener("dragstart", dragJobHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropJobHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);
