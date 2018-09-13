const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	if (Validator.isEmpty(data.text)) {
		errors.text = 'Text is required';
  }
  if (!Validator.isLength(data.text, { min: 2, max: 400 })) {
		errors.text = 'Post must be between 2 and 400';
	}
	return {
		errors,
		isValidate: isEmpty(errors)
	};
};
