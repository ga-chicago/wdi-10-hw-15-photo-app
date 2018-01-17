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

// POST ROUTE - add new users
router.post('/', (req, res) => {
	User.create(req.body, (err, newUser) => {
		if(err) console.log(err);
		console.log(newUser);
		res.redirect('/users')
	})
})

// NEW ROUTE - serve user the sign up form
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// SHOW ROUTE - display user's information
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
		res.render('users/show.ejs', { user: foundUser })
	})
})

// EDIT ROUTE - server the user the edit form
router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id, (err, foundUser) => {
			if(err) console.log(err)
			res.render('users/edit.ejs', { user: foundUser })
	})
})

// PUT ROUTE - to save new info
router.put('/:id', (req, res) => {
	User.findByIdAndUpdate(req.params.id, 
		req.body,
		(err, updatedUser) => {
			if(err) console.log(err)
			res.redirect('/users')
		})
})

// DELETE ROUTE
router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, response) => {
		if(err) console.log(err)
			res.redirect('/users')
	})
})


// EXPORT
module.exports = router; 