const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	if (Validator.isEmpty(data.email)) {
		errors.name = 'Email is required';
	}
  if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required';
	}

	return {
		errors,
		isValidate: isEmpty(errors)
	};
};
