var express = require('express');
var router = express.Router();
var review = require('../controllers/review');

/* GET review page. */
router.get(/employee\/[\S]+/, function (req, res, next) {
    review.employee(req, res, next);
});

/* POST review page. */
router.post(/employee\/[\S]+/, function (req, res, next) {
   review.postEmployee(req, res, next);
});

/* GET review page. */
router.get(/[\S]+/, function (req, res, next) {
    review.jobseeker(req, res, next);
});

/* POST review page. */
router.post(/[\S]+/, function (req, res, next) {
    review.postJobseeker(req, res, next);
});

module.exports = router;
