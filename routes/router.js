var express = require('express');
var router = express.Router();
var multer = require('multer');
var pathLib = require('path');
var postData = require('../controllers/postData');
var result = require('../controllers/result');
var jobDescription = require('../controllers/jobDescription');
var info = require('../controllers/info');
var render = require('../controllers/render');
var request = require('../controllers/request');

// init the database
var init = require('../controllers/init');
init.init();

/* GET home page. */
router.get('/', function (req, res) {
    render.index(req, res);
});

/* GET result page. */
router.get('/result', function (req, res, next) {
    result.show(req, res, next);
});

/* GET company information page. */
router.get(/companyInfo\/[\S]+/, function (req, res, next) {
    info.company(req, res, next);
});

/* GET employee information page. */
router.get(/employeeInfo\/[\S]+/, function (req, res, next) {
    info.employee(req, res, next);
});

var imgs = multer({dest: pathLib.join(__dirname, '../public/upload/users/companyImg')});
/* POST company information page. */
router.post(/companyInfo\/[\S]+/, imgs.array('upload'), function (req, res, next) {
    info.post(imgs, req, res, next);
});

/* GET post request page. */
router.get('/postRequest', function (req, res) {
    request.get(req, res);
});

/*POST post request page*/
var upload = multer({dest: pathLib.join(__dirname, '../public/upload/requests')});
router.post('/postRequest', upload.single('cv'), function (req, res, next) {
    request.post(req, res, next);
});

/* GET jobseeker profile page. */
router.get('/profile', function (req, res, next) {
    render.profile(req, res);
});

/* POST jobseeker profile page. */
var cv = multer({dest: pathLib.join(__dirname, '../public/upload/users/cv')});
router.post('/profile', cv.single('cv'), function (req, res, next) {
    postData.postProfile(req, res, next);
});

/* GET jobseekers' my reviews page. */
router.get('/myReviews', function (req, res, next) {
    render.myReviews(req, res, next);
});

/* GET recruiters' my reviews page. */
router.get('/recruiterReviews', function (req, res, next) {
    render.recruiterReviews(req, res, next);
});

/* GET job description page. */
router.get(/jobDescription\/[\S]+/, function (req, res) {
    jobDescription.show(req, res);
});

module.exports = router;
