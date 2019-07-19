var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema
var userReviewSchema = new schema({
    rating: {type: Number, required: true, max: 5},
    title: {type: String, required: true, max: 100},
    Review: {type: String, required: true, max: 1000},
    //author: {type: schema.Types.ObjectID, ref: 'recruiter'},
    //jobSeeker: {type: schema.Types.ObjectID, ref: 'jobSeeker'},
    posted: {type: Boolean, required: true},
    author: {type: String, required: true},
    employee: {type: String, required: true}
   });

/*  Example of custom functions for model
charSchema.methods.charOfTheMonth = function() {
// add some stuff to the users name
    this.name = this.name + '- Person of the Month';
    return this.name;
};
*/

var userReview = mongoose.model('userReview', userReviewSchema );

module.exports = userReview;