const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../Model/User');
const secretKey = require('../../config/keys').secretKey;
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const router = express.Router();

// @route Get api/users/test
// @desc Tests users route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'users router is work' }));

// @route Post api/users/register
// @desc Register User
// @access Public

router.post('/register', (req, res) => {
	const { errors, isValidate } = validateRegisterInput(req.body);
 
	// Check validation
	if (!isValidate) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exists';
			res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});
			const newUser = new User({
				email: req.body.email,
				password: req.body.password,
				name: req.body.name,
				avatar
			});
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route Post api/users/login
// @desc Login User
// @access Public

router.post('/login', (req, res) => {
	const { errors, isValidate } = validateRegisterInput(req.body);

	// Check validation
	if (!isValidate) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email }).then((user) => {
		errors.email = 'User not found';
		if (!user) return res.status(404).json(errors);
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// user matched
				const payload = {
					id: user.id,
					name: user.name,
					avatar: user.avatar
				};
				// Sign JWT
				jwt.sign(
					payload,
					secretKey,
					{ expiresIn: 24 * 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

// @route Post api/users/current
// @desc Return current user
// @access Private
router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({ msg: 'Success' });
	}
);

module.exports = router;
