var jobsToApplyEl = document.querySelector("#jobs-in-review");
var buttonEl = document.querySelector("#save-job");

var createJobHandler = function () {
  var jobItemEl = document.createElement("li");
  jobItemEl.textContent = "hello";
  jobItemEl.className = "job-item";
  jobsToApplyEl.appendChild(jobItemEl);
};

buttonEl.addEventListener("click", createJobHandler);
