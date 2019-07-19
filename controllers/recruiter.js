var multer = require('multer');
var pathLib = require('path');
var fs = require('fs');
var Job = require('../models/jobs');
var User = require('../models/users');
var Recruiter = require('../models/recruiters');

exports.profile = function (req, res) {
    if (req.session.user) {
        Job.find({email: req.session.user.email},function (err, docs) {
            if(err){
                next(err);
            }else{
                reviews = docs;
                return res.render('recruiterProfile', {
                    user: req.session.user,
                    jobs: docs
                });
            }
        })
    } else {
        res.redirect('/users/signInRecruiters');
    }
}

exports.editCompany = function (req, res) {
    if(req.session.user){
        res.render('editCompany', {
            user: req.session.user
        });
    }else{
        res.redirect('/users/signInRecruiters');
    }
}

exports.postEdit = function (req, res, next) {
    var body = req.body;
    Recruiter.findOneAndUpdate({
        email: req.session.user.email
    },{
        company_name: body.company_name,
        address: body.address,
        contact_num: body.contact_num,
        employees_num: body.employees_num,
        description: body.description
    },{
        new: true
    })
        .then(function (resolve) {
            req.session.user = resolve;
            req.session.save(function(err) {
                // session needs to be saved before redirect
                next(err);
            });
        }, function (reject) {
            next(reject);
        });
    return res.status(200).json({
        code: 0,
        message: 'success'
    });
}

exports.getJob = function(req, res){
    if(req.session.user){
        res.render('postJob', {
            user: req.session.user
        });
    }else{
        return res.redirect('/users/signInRecruiters');
    }
}

exports.postJob = function (req, res, next) {
    var ext = pathLib.parse(req.file.originalname).ext;
    var newPath = req.file.path + ext;
    var newFileName = req.file.filename + ext;
    try {
        fs.rename(req.file.path, newPath, function (err) {
            if (err) {
                next(err);
            }
        });
        var data = req.body;
        var salary = [];
        if(data.salaryMax && data.salaryMin){
            salary.push(data.salaryMin);
            salary.push(data.salaryMax);
        }
        var job = new Job({
            email: req.session.user.email,
            company: data.company,
            position: data.position,
            location: data.location,
            description: data.description,
            salary: salary,
            field: data.field,
            jobType: data.jobType,
            companyImage: pathLib.join('/upload/jobs/',newFileName).replace(/\\/g,'/')
        });
        job.save();
        res.status(200).json({
            message: 'You have successfully posted a job!'
        });
    }catch (e) {
        next(e);
    }
}