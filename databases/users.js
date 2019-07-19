var mongoose = require('mongoose');
// var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';
var mongoDB = process.env.MONGODB_URI || 'mongodb://user:password1@ds351807.mlab.com:51807/heroku_f4rbc1tp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!'));