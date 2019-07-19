var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        title: {
            type: String,
            required: true,
            default: 'jobseeker'
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
        cv: {
            type: String
        },
        avatar: {
            type: String,
            default: '/images/default.jpg'
        }
    }
);

var User = mongoose.model('User', User);
module.exports = User;