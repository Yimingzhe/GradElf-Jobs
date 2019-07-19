var mongoose = require('mongoose');
var schema = mongoose.Schema;

// create a schema
var companyReviewSchema = new schema({
    rating: {type: Number, required: true, max: 5},
    title: {type: String, required: true, max: 100},
    Review: {type: String, required: true, max: 1000},
    //author: {type: schema.Types.ObjectID, ref: 'JobSeeker'},
   // company: {type: schema.Types.ObjectID, ref: 'companyInfo'},
    posted: {type: Boolean, required: true},
    company: {type: String, required: true},
    author: {type: String, required: true}
   });

/*  Example of custom functions for model
charSchema.methods.charOfTheMonth = function() {
// add some stuff to the users name
    this.name = this.name + '- Person of the Month';
    return this.name;
};
*/

var companyReview = mongoose.model('companyReview', companyReviewSchema );

module.exports = companyReview;