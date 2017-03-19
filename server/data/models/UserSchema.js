const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;
// const bcrypt = bluebird.promisifyAll(require('bcrypt'));
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const UserSchema = new Schema({
  admin: Boolean,
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
  first_name: String,
  last_name: String,
  password: {
    minlength: 5,
    required: true,
    type: String
  },
  handle: {
    index: {
      unique: true
    },
    type: String
  }
});

UserSchema.pre('save', function(next) {

  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.hash(user.password, 13)
    .then(function(hash) {
      user.password = hash;
      return next();
    })
    .catch(function() {
      return next(error);
    });
});

UserSchema.methods.passwordIsValid = function(password) {

  return bcrypt.compare(password, this.password)
    .then(function(isValid) {
      return isValid;
    })
    .catch(function(error) {
      throw error;
    });
};

module.exports = mongoose.model('User', UserSchema);
