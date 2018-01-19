const express = require('express');
const router = express.Router();

// MODEL
const Photo = require('../models/photos.js');
const User = require('../models/users.js');

// INDEX ROUTE - show all photos
router.get('/', (req, res) => {
	Photo.find({}, (err, allPhotos) => {
		if(err) console.log(err)
		res.render('photos/index.ejs', { photos: allPhotos })
	})
})

// POST ROUTE - for new photos -- also add to user
router.post('/', (req, res) => {
	console.log(req.body)
	console.log('hit the post route')
	User.findOne({username: req.body.username}, (err, foundUser) => {
		if (err) console.log(err);
		Photo.create(req.body, (err, newPhoto) => {
			if (err) console.log(err);
				foundUser.photos.push(newPhoto);
				foundUser.save((err, data) => {
					res.redirect('/photos')
				})
		})
	})
	// res.send('photo created')
})

// NEW ROUTE - serve user form for new photos
router.get('/new', (req, res) => {
		console.log(req.body)
		res.render('photos/new.ejs')
})

// SHOW ROUTE for individual photos
router.get('/:id', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		User.findOne({ username: foundPhoto.username}, (err, foundUser) => {
			if (err) console.log(err)
				res.render('photos/show.ejs', { photo: foundPhoto, user: foundUser })
		})
	})
})

// UPDATE ROUTE
router.put('/:id', (req, res) => {
	Photo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPhoto) => {
		if(err) console.log(err)
			User.findOne({username: updatedPhoto.username}, (err, foundUser) => {
				if (foundUser._id.toString !== req.body.userId) {
					foundUser.photos.id(req.params.id).remove();
					foundUser.save((err, data) => {
						User.findById(req.body.userId, (err, newUser) => {
							newUser.photos.push(updatedPhoto)
							newUser.save((err, savedNewUser) => {
								res.redirect('/photos/' + req.params.id)
							})
						})
					})
				} else {
					foundUser.photos.id(req.params.id).remove();
					foundUser.photos.push(updatedPhoto);
					foundUser.save((err, data) => {
						res.redirect('/photos/' + req.params.id)
					})
				}//end if/else
			})
	})
})

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
	Photo.findById(req.params.id, (err, foundPhoto) => {
		if(err) console.log(err)
				User.findOne({username: foundPhoto.username}, (err, foundUser) => {
					res.render('photos/edit.ejs', { 
						photo: foundPhoto,
						user: foundUser
					})
				})
	})
})


// DELETE ROUTE
router.delete('/:id', (req, res) => {
	Photo.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		if (err) console.log(err)
			User.findOne({username: deletedPhoto.username}, (err, foundUser) => {
				foundUser.photos.id(deletedPhoto.id).remove();
				foundUser.save((err, data) => {
					res.redirect('/photos');
				})
			})
	})
})


// EXPORT
module.exports = router;