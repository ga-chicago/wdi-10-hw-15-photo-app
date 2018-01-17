const mongooose = require('mongoose');

// set up connection
mongoose.connect('mongodb://localhost:27017/photoapp', { useMongoClien: true });

// connection
mongoose.connection.on('connected', () => {
	console.log('MongoDB is connected')
});

// disconnection
mongoose.connection.on('disconnected', () => {
	console.log('MongoDB is disconnected')
});

// error
mongoose.connection.on('error', (error) => {
	console.log('There was an error in the connection:', error)
});