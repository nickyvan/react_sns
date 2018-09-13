const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePostInput = require('../../validation/post');
const Post = require('../../Model/Post');
const Profile = require('../../Model/Profile');
// @route Get api/posts/test
// @desc Tests posts route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'posts router is work' }));

// @route Get api/posts/
// @desc Get posts
// @access Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ nopostfound: 'No posts' }));
});

// @route Get api/posts/:id
// @desc Get posts by id
// @access Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) =>
			res.status(404).json({ nopostfound: 'No post found with that ID' })
		);
});

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

// @route Delete api/posts/:id
// @desc Delete Post by id
// @access Private
router.delete('/:id', (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				// Check post's owner
				if (post.user.toString() !== req.user.id) {
					return res
						.status(401)
						.json({ notauthorized: 'User not authorized' });
				}
				// Delete
				post.remove().then(() => res.json({ success: true }));
			})
			.catch((err) =>
				res.status(404).json({ postnotfound: 'No post found' })
			);
	});
});

// @route Post api/posts/like/:id
// @desc Like Post
// @access Private
router.post('/like/:id', (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (
					post.likes.filter(
						(like) => like.user.toSring() === req.user.id
					).length > 0
				) {
					return res.status(400).json({
						alreadyliked: 'You have already like this post'
					});
				}

				// Add like to post
				post.likes.unshift({ user: req.user.id });
				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postnotfound: 'No post found' })
			);
	});
});

// @route Post api/posts/unlike/:id
// @desc Unlike Post
// @access Private
router.post('/unlike/:id', (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (
					post.likes.filter(
						(like) => like.user.toSring() === req.user.id
					).length === 0
				) {
					return res.status(400).json({
						notliked: 'You have not already like this post'
					});
				}

				// Remove like from post
				const removeIndex = post.likes
					.map((like) => like.user.toString())
					.indexOf(req.user.id);

				post.likes.splice(removeIndex, 1);

				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postnotfound: 'No post found' })
			);
	});
});

// @route Post api/posts/comment/:id
// @desc Add Comment Post
// @access Private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValidate } = validatePostInput(req.body);

		// Check validation
		if (!isValidate) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then((post) => {
				const newComment = {
					user: req.user.id,
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar
				};
				post.comments.unshift(newComment);
				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postnotfound: 'No post found' })
			);
	}
);

// @route Delete api/posts/comment/:id/:comment_id
// @desc Delete Comment Post
// @access Private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (
					post.comments.filter(
						(comment) =>
							comment._id.toSring() === req.params.comment_id
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentnotexist: 'Comment does not exist' });
				}
				const removeIndex = post.comments
					.map((item) => item._id.toSring())
					.indexOf(req.params.comment_id);

				post.comments.splice(removeIndex, 1);
				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postnotfound: 'No post found' })
			);
	}
);

module.exports = router;
