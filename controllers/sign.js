var password = require('myLibs/password');
var Recruiter = require('../models/recruiters');
var User = require('../models/users');
var pathLib = require('path');
var fs = require('fs');

exports.signIn = function (req, res) {
    res.render('signIn', {
        user: req.session.user, slogan: 'New to GradElf?', slogan1: 'Apply faster',
        slogan2: 'Save favorite jobs', slogan3: 'Save CV'
    });
}

exports.postSignIn = function (req, res, next) {
    var body = req.body;
    var pw = password.md5(body.password + password.SECRET);

    User.findOne({
        email: body.email,
        password: pw
    }, function (err, user) {
        if (err) {
            next(err);
        }
        // if didn't find the user
        if (!user) {
            return res.status(200).json({
                code: 1,
                message: 'the email or password is incorrect!'
            });
        } else {
            // user successfully logged in
            req.session.user = user;
            if(body.keep === "on"){
                req.session.cookie.maxAge = 7*24*60*60*1000;
            }
            res.status(200).json({
                code: 0,
                message: 'has successfully logged in'
            });
        }
    });
}

exports.signInRecruiters = function (req, res) {
    res.render('signIn', {
        user: req.session.user,
        slogan: 'New to GradElf Recruiter? Register now!', slogan1: 'Post jobs faster',
        slogan2: 'Find excellent talents', slogan3: 'Let more people know your company'
    });
}

exports.postSignInRecruiters = function (req, res, next) {
    var body = req.body;
    var pw = password.md5(body.password + password.SECRET);

    Recruiter.findOne({
        email: body.email,
        password: pw
    }, function (err, recruiter) {
        if (err) {
            next(err);
        }

        // if didn't find the recruiter
        if (!recruiter) {
            return res.status(200).json({
                code: 1,
                message: 'the email or password is incorrect!'
            });
        } else {
            // recruiter successfully logged in
            req.session.user = recruiter;
            res.status(200).json({
                code: 100,
                message: 'has successfully logged in'
            });
        }
    });
}

exports.postRegister = function (req, res, next) {
    var body = req.body;
    body.password = password.md5(body.password + password.SECRET);

    User.findOne({
        email: body.email
    })
        .then(function (data) {
            if(data){
                // the email has been registered
                return res.status(200).json({
                    code: 0,
                    message: 'this email has been registered!'
                });
            }else{
                return Recruiter.findOne({
                    email: body.email
                });
            }
        })
        .then(function (dataR) {
            if(dataR){
                // the email has been registered
                return res.status(200).json({
                    code: 0,
                    message: 'this email has been registered!'
                });
            }else{
                // the email can be registered
                // deal with upload avatar
                if(req.file){
                    var ext = pathLib.parse(req.file.originalname).ext;
                    var newPath = req.file.path + ext;
                    var newFileName = req.file.filename + ext;
                    fs.rename(req.file.path, newPath, function (err) {
                        if (err) {
                            return next(err);
                        }
                    });
                }
                if (body.check !== "on") {
                    // register as a jobseeker
                    new User({
                        first_name: body.firstName,
                        last_name: body.surname,
                        email: body.email,
                        password: body.password,
                        description: body.description,
                        job_field: body.regField
                    }).save()
                        .then(function (user) {
                            if (newFileName){
                                user.avatar = pathLib.join('/upload/users/avatar/',newFileName);
                                user.save();
                            }
                            req.session.user = user;
                            return res.status(200).json({
                                code: 1,
                                message: 'success'
                            });
                        }, function (reject) {
                            return next(reject);
                        });
                } else {
                    // register as a recruiter
                    new Recruiter({
                        first_name: body.firstName,
                        last_name: body.surname,
                        email: body.email,
                        password: body.password,
                        description: body.description,
                        job_field: body.regField,
                        company_name: body.company,
                        address: body.address,
                        contact_num: body.contact,
                        employees_num: body.num
                    }).save()

                        .then(function (recruiter) {
                            if (newFileName){
                                recruiter.avatar = pathLib.join('/upload/users/avatar/',newFileName);
                                recruiter.save();
                            }
                            req.session.user = recruiter;
                            return res.status(200).json({
                                code: 2,
                                message: 'success'
                            });
                        }, function (reject) {
                            return next(reject);
                        });
                }
            }
        });
}