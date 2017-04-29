const _ = require('lodash'),
  app_data = includes('../src/components/app.data'),
  bcrypt = require('bcryptjs'),
  bluebird = require('bluebird'),
  config = require('../config'),
  mongoose = require('mongoose'),
  User = require('./User.schema'),
  user_helper = includes('../server/helpers/user.helper'),
  uuid = require('uuid');

mongoose.Promise = bluebird;
const Schema = mongoose.Schema;

const VerifySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    index: {
      unique: true
    },
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    expires: config.verify.expires,
    required: true
  }
});

VerifySchema.methods.generateToken = function() {

  let verify = this;
  const token = uuid.v4();
  verify.set('token', token);
  return verify.save().then(function() {
    console.log('Verification token:', verify);
    return token;
  }).catch(function(error) {
    return error;
  });
};

let Verify = module.exports = mongoose.model('Verify', VerifySchema);

module.exports.getTokenUrl = function(options) {
  return `${options.protocol}://${options.host}${app_data.nav.format.verify.replace(':token', options.token)}`;
};

module.exports.getUserToken = function(user_id) {

  return Verify.findOne({
    user_id: user_id
  }).then(function(verify) {

    if (!verify) {
      return {
        success: false
      };
    }

    return {
      success: true,
      token: verify.token
    };
  }).catch(function(error) {
    return {
      success: false
    };
  });
};

module.exports.user = function(token) {

  return Verify.findOne({
    token: token
  }).then(function(verify) {

    if (!verify) {
      return {
        success: false
      };
    }

    return User.getUserById(verify.user_id).then(function(user) {

      user.verified = true;
      return user.save().then(function() {

        user = user.toObject();
        return {
          success: true,
          token: user_helper.get_token(user),
          user: _.omit(user, ['password'])
        };
      }).catch(function(error) {
        console.log(error);
        return {
          success: false
        };
      });
    }).catch(function(error) {
      console.log(error);
      return {
        success: false
      };
    });
  }).catch(function(error) {
    console.log(error);
    return {
      success: false
    };
  });
};
