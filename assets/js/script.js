var jobsToApplyEl = document.querySelector("#jobs-in-review");
var buttonEl = document.querySelector("#add-job");

//Data collected from the Modal
var date_posted = document.querySelector("#date_posted");
var position = document.querySelector("#position");
var job_link = document.querySelector("#job_link");

var createJobHandler = function () {
  var jobItemEl = document.createElement("li");
  jobItemEl.className = "job-item";

  var jobInfoEl = document.createElement("div");
  jobInfoEl.innerHTML = "<li class='job-item'> Date posted: " + date_posted.value +"<br /> Job position: " + 
  + position.value + "<br /> Job link: "+ job_link.value +"</li>";
  
  jobItemEl.appendChild(jobInfoEl);
  // Add the entire item to the list
  jobsToApplyEl.appendChild(jobItemEl);
};

buttonEl.addEventListener("click", createJobHandler);

// MODAL
