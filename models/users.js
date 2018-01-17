const mongoose = require('mongoose');

// create the schema
const userSchema = new mongoose.Schema({
	username: String,
	name: String,
	location: String,
	password: String
});

// create the model
const User = mongoose.model('User', userSchema);

// export
module.exports = User;

