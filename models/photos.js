const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	username: { type: String, required: true },
	image: { type: String, required: true },
	photoInfo: String
})

// create the model
const Photo = mongoose.model('Photo', photoSchema);

// export
module.exports = Photo;