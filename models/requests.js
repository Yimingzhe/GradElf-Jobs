var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Request = new Schema(
    {
        type: {
            type: String,
            required: true,
            default: 'request'
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        cv: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        salary: {
            type: Array
        },
        jobType: {
            type: String,
            required: true
        },
        field: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
    }
);

var Request = mongoose.model('Request', Request);
module.exports = Request;