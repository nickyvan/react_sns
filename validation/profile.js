const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'handle is required';
	}
	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle = 'Password must be between 2 and 40';
	}
	if (Validator.isEmpty(data.status)) {
		errors.status = 'status is required';
	}
	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'skills is required';
	}
	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = ' This is not URL';
		}
	}
	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = ' This is not URL';
		}
	}
	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = ' This is not URL';
		}
	}
	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = ' This is not URL';
		}
	}
	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = ' This is not URL';
		}
	}
	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = ' This is not URL';
		}
	}
	return {
		errors,
		isValidate: isEmpty(errors)
	};
};
