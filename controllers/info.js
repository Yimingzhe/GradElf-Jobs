var User = require('../models/users');
var Recruiter = require('../models/recruiters');
var CompanyReview = require('../models/companyReview');
var UserReview = require('../models/userReview');
var multer = require('multer');
var pathLib = require('path');
var fs = require('fs');

exports.company = function (req, res, next) {
    var mail = req.url.substring(req.url.lastIndexOf('/')+1);
    try {
        var recruiter;
        Recruiter.findOne({email: mail}, function(err, data){
            recruiter = data;
            CompanyReview.find({company: mail},function(err, review){
                if(review){
                    res.render('companyInfo', {
                        user: req.session.user,
                        company: recruiter,
                        reviews: review
                    });
                }
            })
        });
    } catch (e) {
        next(e);
    }
}

exports.employee = function (req, res, next) {
    if (!req.session.user || req.session.user.title !== 'recruiter') {
        return res.redirect('/users/signInRecruiters');
    }
    var mail = req.url.substring(req.url.lastIndexOf('/')+1);
    try {
        User.findOne({email: mail}, function(err, data){
            var employee = data;
            UserReview.find({employee: mail},function(err, review){
                if(review){
                    res.render('employeeInfo', {
                        user: req.session.user,
                        employee: employee,
                        reviews: review
                    });
                }
            })
        });
    } catch (e) {
        next(e);
    }
}

exports.post = function (imgs, req, res, next) {
    try {
        var files = req.files;
        var company = req.url.substring(req.url.lastIndexOf('/')+1);
        var photos = [];
        for(var i=0; i<files.length; i++){
            var ext = pathLib.parse(files[i].originalname).ext;
            var newPath = files[i].path + ext;
            var newFileName = files[i].filename + ext;
            fs.rename(files[i].path, newPath, function (err) {
                if(err){
                    next(err);
                }
            });
            if(newFileName){
                photos.push(pathLib.join('/upload/users/companyImg/',newFileName));
            }
        }
        Recruiter.findOne({email: company})
            .then(function(recruiter){
                for(var i=0; i<photos.length; i++){
                    recruiter.photos.push(photos[i].replace(/\\/g,"/"));
                }
                return recruiter.save();
            })
            .then(function (value) {
                return res.status(200).json({
                    message: 'ok'
                });
            });
    }catch (e) {
        next(e);
    }
}