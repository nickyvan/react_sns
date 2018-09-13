const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePostInput = require('../../validation/post');
const Post = require('../../Model/Post');
// @route Get api/posts/test
// @desc Tests posts route
// @access Public
router.get('', (req, res) => res.json({ msg: 'posts router is work' }));

// @route Post api/posts/
// @desc Creat Post
// @access Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
    const { errors, isValidate } = validatePostInput(req.body);

		// Check validation
		if (!isValidate) {
			return res.status(400).json(errors);
    }
    
		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then((post) => res.json(post));
	}
);

module.exports = router;
