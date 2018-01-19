const mongoose = require('mongoose');

// require photo model
const Photo = require('./photos.js');

// create the schema
const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	location: String,
	password: String,
	photos: [Photo.schema]
});

// create the model
const User = mongoose.model('User', userSchema);

// export
module.exports = User;

