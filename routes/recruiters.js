var express = require('express');
var router = express.Router();
var multer = require('multer');
var pathLib = require('path');
var recruiter = require('../controllers/recruiter');

/* GET recruiter profile page. */
router.get('/recruiterProfile', function (req, res) {
    recruiter.profile(req, res);
});

/* GET review employee page. */
router.get('/reviewEmployee', function (req, res, next) {
    res.render('review', {user: req.session.user, slogan: "Review the employee now!"});
});

/* GET edit company page. */
router.get('/editCompany', function (req, res) {
    recruiter.editCompany(req, res);
});

/* POST edit company page. */
router.post('/editCompany', function (req, res, next) {
    recruiter.postEdit(req, res, next);
});

/* GET post job page. */
router.get('/postJob', function (req, res) {
    recruiter.getJob(req, res);
});

/* POST post job page. */
var upload = multer({dest: pathLib.join(__dirname, '../public/upload/jobs')});
router.post('/postJob', upload.single('logo'),function (req, res, next) {
    recruiter.postJob(req, res, next);
});

/* GET employee information page. */
router.get('/employeeInfo', function (req, res, next) {
    res.render('employeeInfo', {
        user: req.session.user
    });
});

module.exports = router;