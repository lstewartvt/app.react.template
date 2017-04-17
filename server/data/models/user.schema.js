const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
// const bcrypt = bluebird.promisifyAll(require('bcryptjs'));
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const UserSchema = new Schema({
	avi: String,
	first_name: String,
	last_name: String,
	created: {
		default: new Date(),
		required: true,
		type: Date
	},
	email: {
		match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		required: true,
		type: String
	},
	handle: {
		index: {
			unique: true
		},
		required: true,
		type: String
	},
	password: {
		minlength: 5,
		required: true,
		type: String
	},
	role: {
		default: 'Member',
		enum: ['Member', 'Admin'],
		type: String
	},
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	},
	verified: {
		default: false,
		required: true,
		type: Boolean
	}
}, {
	timestamps: true
});

UserSchema.pre('save', function(next) {

	const user = this,
		SALT_FACTOR = 13;

	if (!user.isModified('password')) {
		return next();
	}

	return bcrypt.hash(user.password, SALT_FACTOR)
		.then(function(hash) {
			user.password = hash;
			return next();
		})
		.catch(function() {
			return next(error);
		});
});

UserSchema.methods.isPasswordValid = function(candidate) {

	return bcrypt.compare(candidate, this.password)
		.then(function(isValid) {
			return isValid;
		})
		.catch(function(error) {
			throw error;
		});
};

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByHandle = (username) => {

	// find the user
	return User.findOne({
		$or: [{
			email: username.trim()
		}, {
			handle: username.trim()
		}]
	});
};

module.exports.getUserById = (id) => {

	// find the user
	return User.findById(id);
};