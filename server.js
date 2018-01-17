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
const UserController = require('./controllers/userController.js')
app.use('/users', UserController)


// HOME ROUTE
app.get('/', (req, res) => {
	res.render('index.ejs')
})

// LISTENER
app.listen(3000, () => {
	console.log('Server is connected on port 3000')
})