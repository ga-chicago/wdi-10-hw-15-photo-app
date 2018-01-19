// REQUIRE
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');


// DB
require('./db/db.js')


// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'Secret string',
	resave: false,
	saveUninitialized: false
}));


// CONTROLLERS
const UserController = require('./controllers/userController')
app.use('/users', UserController)
const PhotoController = require('./controllers/photoController')
app.use('/photos', PhotoController)


// HOME ROUTE
app.get('/home', (req, res) => {
	res.render('index.ejs')
})

// 404
app.get('*', (req, res) => {
	res.status(404).send(404, 'error, page not found.')
})

// LISTENER
app.listen(3000, () => {
	console.log('Server is connected on port 3000')
})