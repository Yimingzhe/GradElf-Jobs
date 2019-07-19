var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recruiter = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'recruiter'
        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        job_field: {
            type: String
        },
        avatar: {
            type: String,
            default: '/images/default.jpg'
        },
        company_name: {
            type: String
        },
        address: {
            type: String
        },
        contact_num: {
            type: Number
        },
        employees_num: {
            type: Number
        },
        photos: {
            type: Array
        }
    }
);

var Recruiter = mongoose.model('Recruiter', Recruiter);
module.exports = Recruiter;