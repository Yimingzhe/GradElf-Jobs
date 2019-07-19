var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema
var userReviewSchema = new schema({
    rating: {type: Number, required: true, max: 5},
    title: {type: String, required: true, max: 100},
    Review: {type: String, required: true, max: 1000},
    posted: {type: Boolean, required: true},
    author: {type: String, required: true},
    employee: {type: String, required: true}
   });

var userReview = mongoose.model('userReview', userReviewSchema );

module.exports = userReview;