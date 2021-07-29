// var jobsToApplyEl = document.querySelector("#jobs-in-review");
var buttonEl = document.querySelector("#add-job");

//Data collected from the Modal
var date_posted = document.querySelector("#date_posted");
var position = document.querySelector("#position");
var job_link = document.querySelector("#job_link");

var createJobHandler = function () {
//   var jobItemEl = document.createElement("li");
//   jobItemEl.textContent = "hello";
//   jobItemEl.className = "job-item";
//   jobsToApplyEl.appendChild(jobItemEl);
    console.log(' Date posted:' + date_posted.value);
    console.log(' Position:' + position.value);
    console.log(' Job link:' + job_link.value);
};

buttonEl.addEventListener("click", createJobHandler);

// MODAL
