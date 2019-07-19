var express = require('express');
var router = express.Router();
var multer = require('multer');
var pathLib = require('path');
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

// Get sign out page
router.get('/signOut', function (req, res, next) {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router;
