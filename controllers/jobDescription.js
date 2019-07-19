var Job = require('../models/jobs');
var Request = require('../models/requests');

exports.show = function (req, res) {
    var jobId = req.url.substring(req.url.lastIndexOf('/')+1);
    // for jobseekers or users who didn't log in -> jobs
    if(!req.session.user || (req.session.user.title==='jobseeker'&&!req.session.user.search) || req.session.user.search==='own-job'){
        Job.findById(jobId)
            .then(function (jobData) {
                res.render('jobDescription', {
                    user: req.session.user,
                    job: jobData
                });
            });
    }else if(req.session.user.title==='recruiter' || req.session.user.search==='own-request'){
        // for recruiters -> requests
        Request.findById(jobId)
            .then(function(requestData){
                res.render('jobDescription', {
                    user: req.session.user,
                    job:  requestData
                })
            })
    }
}