var jobsToApplyEl = document.querySelector('#jobs-in-review');
var buttonEl = document.querySelector('#save-job');

buttonEl.addEventListener('click', function () {
    var jobItemEl = document.createElement('li');
    jobItemEl.textContent = "hello";
    jobItemEl.className = 'job-item';
    jobsToApplyEl.appendChild(jobItemEl);
});