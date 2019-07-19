var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema
var companyReviewSchema = new schema({
    rating: {type: Number, required: true, max: 5},
    title: {type: String, required: true, max: 100},
    Review: {type: String, required: true, max: 1000},
    posted: {type: Boolean, required: true},
    company: {type: String, required: true},
    author: {type: String, required: true}
   });

var companyReview = mongoose.model('companyReview', companyReviewSchema );

module.exports = companyReview;