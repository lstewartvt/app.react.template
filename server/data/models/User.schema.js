const _ = require('lodash'),
	mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	bluebird = require('bluebird');

mongoose.Promise = bluebird;
// const bcrypt = bluebird.promisifyAll(require('bcryptjs'));
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const UserSchema = new Schema({
	avi: String,
	first_name: String,
	last_name: String,
	created: {
		default: Date.now,
		required: true,
		type: Date
	},
	email: {
		match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		required: true,
		type: String
	},
	emailLower: {
		match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
		type: String
	},
	handle: {
		index: {
			unique: true
		},
		required: true,
		type: String
	},
	handleLower: {
		index: {
			unique: true
		},
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
	timestamps: {
		createdAt: 'created',
		updatedAt: 'last_activity'
	}
});

// hash password
UserSchema.pre('save', function(next) {

	const user = this,
		SALT_FACTOR = 13;

	// update email
	if (user.isModified('email')) {
		user.emailLower = user.email.toLowerCase();
	}

	// update handle
	if (user.isModified('handle')) {
		user.handleLower = user.handle.toLowerCase();
	}

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

UserSchema.virtual('name').get(function() {

	const user = this;
	if (!user.first_name && !user.last_name) {
		return user.handle;
	}

	return `${user.first_name} ${user.last_name}`;
});

UserSchema.methods.isPasswordValid = function(candidate) {

	let user = this;
	return bcrypt.compare(candidate, user.password)
		.then(function(isValid) {
			return isValid;
		})
		.catch(function(error) {
			throw error;
		});
};

UserSchema.methods.transform = function() {

	let user = this;

	const {
		name
	} = user;
	let transformedUser = Object.assign(user.toObject(), {
		name
	});

	return _.omit(transformedUser, ['password']);
};

let User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByHandle = (username) => {

	let handle = username.trim().toLowerCase();

	// find the user
	return User.findOne({
		$or: [{
			emailLower: handle
		}, {
			handleLower: handle
		}]
	});
};

module.exports.getUserById = (id) => {

	// find the user
	return User.findById(id);
};