// REQUIRE
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// DB
require('./db/db.js')

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// CONTROLLERS


// HOME ROUTE


// LISTENER
app.listen(3000, () => {
	console.log('Server is connected on port 3000')
})