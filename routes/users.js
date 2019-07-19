var express = require('express');
var router = express.Router();
// var User = require('../models/users');
// var Recruiter = require('../models/recruiters');
// var CompanyReview = require('../models/companyReview');
// var UserReview = require('../models/userReview');
// var Job = require('../models/jobs');
// var Request = require('../models/requests');
var multer = require('multer');
var pathLib = require('path');
// var fs = require('fs');
var sign = require('../controllers/sign');

// GET jobseeker sign in page.
router.get('/signIn', function (req, res) {
    sign.signIn(req, res);
});

// POST jobseeker sign in page.
router.post('/signIn', function (req, res, next) {
    sign.postSignIn(req, res, next);
});

// Get recruiters sign in page.
router.get('/signInRecruiters', function (req, res) {
    sign.signInRecruiters(req, res);
});

// Post recruiters sign in page.
router.post('/signInRecruiters', function (req, res, next) {
    sign.postSignInRecruiters(req, res, next);
});

// GET register page.
router.get('/register', function (req, res, next) {
    res.render('register', {
        user: req.session.user
    });
});

// POST register page.
var upload = multer({dest: pathLib.join(__dirname, '../public/upload/users/avatar')});
router.post('/register', upload.single('avatar'), function (req, res, next) {
    sign.postRegister(req, res, next);
});

// just test the database, don't forget to delete!!!!!!!!!!!
// router.get('/db',function(req, res, next){
//     User.find({},function (err, data) {
//        res.send(data);
//     });
// });
// router.get('/db2',function(req, res, next){
//     Recruiter.find({},function (err, data) {
//         res.send(data);
//     });
// });
// router.get('/db3',function(req, res, next){
//     Job.find({},function (err, data) {
//         res.send(data);
//     });
// });
// router.get('/db4',function(req, res, next){
//     CompanyReview.find({},function (err, data) {
//         res.send(data);
//     });
// });
// router.get('/db5',function(req, res, next){
//     UserReview.find({},function (err, data) {
//         res.send(data);
//     });
// });
// router.get('/db6',function(req, res, next){
//     Request.find({},function (err, data) {
//         res.send(data);
//     });
// });

// Get sign out page
router.get('/signOut', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
