var User = require('../models/users');
var Recruiter = require('../models/recruiters');
var CompanyReview = require('../models/companyReview');
var UserReview = require('../models/userReview');
var Job = require('../models/jobs');
var password = require('myLibs/password');

exports.employee = function (req, res, next) {
    var reviewId;
    var last = req.url.substring(req.url.lastIndexOf('/')+1);
    if(!last.match("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")){
        reviewId = last;
    }

    if(req.url.indexOf("delete")>0){
        UserReview.findByIdAndDelete(reviewId, function(err, data){
            if(err){
                next(err);
            }else{
                res.redirect("/recruiterReviews");
            }
        });
    }else{
        if (!req.session.user || req.session.user.title !== 'recruiter') {
            res.redirect('/users/signInRecruiters');
        } else if(reviewId){
            UserReview.findById(reviewId, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.render('review', {user: req.session.user, slogan: "Review the employee now!", value: data});
                }
            });
        }else {
            res.render('review', {user: req.session.user, slogan: "Review the employee now!", value: null});
        }
    }
}
exports.jobseeker = function (req, res) {
    var last = req.url.substring(req.url.lastIndexOf('/')+1);
    var reviewId;
    if(!last.match("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")){
        reviewId = last;
    }
    if(req.url.indexOf("delete")>0){
        CompanyReview.findByIdAndDelete(reviewId, function(err, data){
            if(err){
                next(err);
            }else{
                res.redirect("/myReviews");
            }
        });
    } else {
        if (!req.session.user || req.session.user.title !== 'jobseeker') {
            res.redirect('/users/signIn');
        } else if(reviewId){
            CompanyReview.findById(reviewId, function(err, data){
                if(err){
                    next(err);
                }else{
                    res.render('review', {user: req.session.user, slogan: "Review the company now!", value: data});
                }
            });
        }else {
            res.render('review', {user: req.session.user, slogan: "Review the company now!", value: null});
        }
    }
}

exports.postEmployee = function (req, res, next) {
    var body = req.body;
    var posted;
    if(body.posted == 1){
        posted = true;
    }else {
        posted = false;
    }
    try {
        new UserReview({
            title: body.title,
            Review: body.review,
            rating: body.star_num,
            author: req.session.user.email,
            posted: posted,
            employee: req.url.substring(req.url.lastIndexOf('/')+1)
        }).save();
    }catch (e) {
        next(e);
    }
    return res.status(200).json({
        message: 'user'
    });
}

exports.postJobseeker = function (req, res, next) {
    var body = req.body;
    var posted;
    if(body.posted == 1){
        posted = true;
    }else {
        posted = false;
    }
    try {
        new CompanyReview({
            title: body.title,
            Review: body.review,
            rating: body.star_num,
            author: req.session.user.email,
            posted: posted,
            company: req.url.substring(1)
        }).save();
    }catch (e) {
        next(e);
    }
    return res.status(200).json({
        message: 'company'
    });
}