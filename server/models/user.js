const mongoose = require('mongoose');
const validator = require('validator');
/*
{
	email: 'michele.nasti@example.com',
	password: 'jfndicfniwefgbiegwein3253495',
	tokens: [{
		access: 'auth',
		tokenValue: 'mdwfjnwejngefmekm34532423mmkfdsf'
	}]
}
*/

let User = mongoose.model('User', {
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6,
		required: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

module.exports = { User };