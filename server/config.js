exports.server = {
  auth: {
    expires: 1440 // in minutes
  },
  verify: {
    expires: '31m',
    expireText: '31 minutes'
  }
};

exports.app = require('../src/config/app.data');
