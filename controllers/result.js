var Job = require('../models/jobs');
var Request = require('../models/requests');

exports.show = function (req, res, next) {
    // the keywords and city
    var keysearch = req.query.keysearch;
    var city = req.query.city;
    if(city === "All"){
        city = "";
    }
    if ((/^[\s]*$/).test(keysearch)) {
        keysearch = '[\s\S]*';
    }
    if ((/^[\s]*$/).test(city)) {
        city = '[\s\S]*';
    }

    // Graduate, Internship or Part-time
    var jobType = req.query.jobType;
    if(jobType === undefined){
        jobType = /[\w]+/;
    }

    // sort by date or sort by salary
    var sort = req.query.sort;
    var condition;
    if(sort === undefined){
        condition = {date: -1};
    }else{
        condition = {salary: -1};
    }

    // filter by posted time
    var postDate = req.query.postDate;
    var day;
    var today = new Date();
    if(postDate === undefined){
        postDate = {$lte: Date.now()};
    } else if(postDate == 1){
        day = today.setDate(today.getDate() - 1);
        postDate = {$gte: day};
    }else if (postDate == 3){
        day = today.setDate(today.getDate() - 3);
        postDate = {$gte: day};
    }else if (postDate == 7){
        day = today.setDate(today.getDate() - 7);
        postDate = {$gte: day};
    } else if (postDate == "others"){
        day = today.setDate(today.getDate() - 7);
        postDate = {$lt: day};
    }

    try {
        if (!req.session.user || req.session.user.title !== 'recruiter') {
            // search for jobs
            // job title or company, city
            Job.find({
                    $or: [
                        {position: eval('/' + keysearch + '/i')},
                        {company: eval('/' + keysearch + '/i')}
                    ],
                    location: eval('/' + city + '/i'),
                    jobType: jobType,
                    date: postDate
                }, null,
                {
                    sort: condition
                })
                .then(function (resolve) {
                    return res.render('result', {
                        user: req.session.user,
                        jobs: resolve
                    });
                }, function (rej) {
                    return next(rej);
                });
        } else {
            // search talents
            // job title, city
            Request.find({
                    title: eval('/' + keysearch + '/i'),
                    location: eval('/' + city + '/i')
                }, null,
                {
                    sort: {date: -1}
                })
                .then(function (resolve) {
                    return res.render('result', {
                        user: req.session.user,
                        jobs: resolve
                    });
                }, function (rej) {
                    return next(rej);
                });
        }
    } catch (e) {
        next(e);
    }
}