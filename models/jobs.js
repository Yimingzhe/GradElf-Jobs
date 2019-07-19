var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Job = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'job'
        },
        email: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        companyImage: {
            type: String
        },
        salary: {
            type: Array
        },
        field: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        jobType: {
            type: String,
            required: true
        }
    }
);

var Job = mongoose.model('Job', Job);
module.exports = Job;