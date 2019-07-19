var Job = require('../models/jobs');
var Request = require('../models/requests');
var CompanyReview = require('../models/companyReview');
var UserReview = require('../models/userReview');
var multer = require('multer');
var pathLib = require('path');
var fs = require('fs');

exports.get = function (req, res) {
    if(!req.session.user){
        res.redirect('users/signIn');
    }else{
        res.render('postRequest', {
            user: req.session.user
        });
    }
}

exports.post = function (req, res, next) {
    var ext = pathLib.parse(req.file.originalname).ext;
    var newPath = req.file.path + ext;
    var newFileName = req.file.filename + ext;
    try{
        fs.rename(req.file.path, newPath, function (err) {
            if(err){
                next(err);
            }
        });
        var data = req.body;
        var salary = [];
        if(data.salaryMin && data.salaryMax){
            salary.push(data.salaryMin);
            salary.push(data.salaryMax);
        }
        var request = new Request({
            email: req.session.user.email,
            name: data.name,
            cv: pathLib.join('/upload/requests/', newFileName).replace(/\\/g, '/'),
            title: data.title,
            location: data.location,
            salary: salary,
            jobType: data.jobType,
            field: data.field,
            description: data.description
        });
        request.save();

        res.status(200).json({
            message: 'You have successfully posted a request!'
        });
    }catch (e) {
        next(e);
    }
}