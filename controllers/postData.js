var User = require('../models/users');
var Recruiter = require('../models/recruiters');
var Job = require('../models/jobs');
var Request = require('../models/requests');
var pathLib = require('path');
var fs = require('fs');

exports.postProfile = function (req, res, next) {
    var ext = pathLib.parse(req.file.originalname).ext;
    var newPath = req.file.path + ext;
    var newFileName = req.file.filename + ext;
    fs.rename(req.file.path, newPath, function (err) {
        if (err) {
            next(err);
        }
    });
    if (req.session.user) {
        User.findOneAndUpdate({email: req.session.user.email},
            {cv: pathLib.join('/upload/users/cv', newFileName)})
            .then(function (resolve) {
                if (resolve.cv) {
                    fs.unlink(pathLib.join(__dirname, '../public', resolve.cv), function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        req.session.user.cv = pathLib.join('/upload/users/cv/', newFileName);
    }
    res.redirect('/profile');
}