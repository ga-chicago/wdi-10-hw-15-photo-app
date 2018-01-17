const express = require('express');
const router = express.Router();

// MODEL
const User = require('../models/users.js');

// INDEX ROUTE - show all users
router.get('/', (req, res) => {
	User.find({}, (err, allUsers) => {
		if(err) console.log(err)
		res.render('users/index.ejs', { users: allUsers })
	})
	
})

// NEW ROUTE - serve user the sign up form
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// EXPORT
module.exports = router; 