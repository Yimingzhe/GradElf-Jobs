var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/users';

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {useMongoClient: true});//{useNewUrlParser: true}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!'));