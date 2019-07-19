var Job = require('../models/jobs');
var Request = require('../models/requests');

exports.show = function (req, res) {
    var jobId = req.url.substring(req.url.lastIndexOf('/')+1);
    // for jobseekers or users who didn't log in -> jobs
    console.log(req.session.user);
    if(!req.session.user || req.session.user.title==='jobseeker'){
        Job.findById(jobId)
            .then(function (jobData) {
                console.log("aaa"+jobData);
                res.render('jobDescription', {
                    user: req.session.user,
                    job: jobData
                });
            });
    }else{
        // for recruiters -> requests
        Request.findById(jobId)
            .then(function(requestData){
                console.log("rrr"+requestData);
                res.render('jobDescription', {
                    user: req.session.user,
                    job: requestData
                })
            })
    }
}