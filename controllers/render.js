var Job = require('../models/jobs');
var Request = require('../models/requests');
var UserReview = require('../models/userReview');
var CompanyReview = require('../models/companyReview');

exports.index = function (req, res) {
    if (!req.session.user || req.session.user.title !== 'recruiter') {
        res.render('index', {
            user: req.session.user
        });
    } else {
        res.render('companyIndex', {
            user: req.session.user
        });
    }
}

exports.profile = function (req, res) {
    if (req.session.user) {
        Request.find({email: req.session.user.email},function (err, docs) {
            if(err){
                next(err);
            }else{
                reviews = docs;
                return res.render('myProfile', {
                    user: req.session.user,
                    requests: docs
                });
            }
        })
    } else {
        res.redirect('/users/signIn');
    }
}

exports.recruiterReviews = function (req, res, next) {
    if (!req.session.user || req.session.user.title !== 'recruiter') {
        return res.redirect('/users/signInRecruiters');
    }
    var reviews;
    UserReview.find({author: req.session.user.email},function (err, docs) {
        if(err){
            next(err);
        }else{
            reviews = docs;
            res.render('myReviews', {
                user: req.session.user,
                reviews: reviews
            });
        }
    })
}

exports.myReviews = function (req, res, next) {
    if (!req.session.user || req.session.user.title !== 'jobseeker') {
        return res.redirect('/users/signIn');
    }
    var reviews;
    CompanyReview.find({author: req.session.user.email},function (err, docs) {
        if(err){
            next(err);
        }else{
            reviews = docs;
            res.render('myReviews', {
                user: req.session.user,
                reviews: reviews
            });
        }
    })
}

