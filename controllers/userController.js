const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// MODEL
const User = require('../models/users.js');
const Photo = require('../models/photos.js')


// INDEX ROUTE - show all users
router.get('/', (req, res) => {
	User.find({}, (err, allUsers) => {
		if(err) console.log(err)
		res.render('users/index.ejs', { users: allUsers })
	})
	
})

// POST ROUTE - add new users
router.post('/', (req, res) => {
	// get/encrypt pwd
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	// create user obj to pass in
	const userDbEntry = {
		name: req.body.name,
		location: req.body.location,
		username: req.body.username,
		password: passwordHash
	}

	User.create(userDbEntry, (err, newUser) => {
		if(err) {
			console.log(err);
			res.send(err);
		} else {
			res.redirect('/users/login')
		}	
	})
})

// NEW ROUTE - serve user the sign up form
router.get('/new', (req, res) => {
	res.render('users/new.ejs')
})

// LOGIN ROUTE - show page
router.get('/login', (req, res) => {
	res.render('users/login.ejs', { message: req.session.message })
})

// LOGIN POST ROUTE - check user data
router.post('/login', (req, res) => {
	//check if login is good
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if(foundUser) {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.username = req.body.username;
				req.session.logged = true;
				req.session.message = '';
				// eventually needs to take user to their profile page
				res.redirect('/home')
			} else {//for passwords no match
				req.sessions.message = "Username or Password incorrect";
				res.redirect('/users/login');
			}//nested if/else	
		} else {//for no user found
			req.sessions.message = "Username or Password incorrect";
			res.redirect('/users/login');
		}
	})
})

// SHOW ROUTE - display user's information
router.get('/:id', (req, res) => {
	// console.log(req.params.id)
	User.findById(req.params.id, (err, foundUser) => {
		if(err) console.log(err)
		console.log(foundUser)
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
	User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		const photoIds = [];
		for(let i = 0; i < deletedUser.photos.length; i++) {
			photoIds.push(deletedUser.photos[i]._id);
		}
		Photo.remove({_id: { $in: photoIds }}, (err, data) => {
			if(err) console.log(err)
			res.redirect('/users')
		})
		
	})
})


// EXPORT
module.exports = router; 