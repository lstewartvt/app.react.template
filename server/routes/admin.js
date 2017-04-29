const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

// (GET /admin/restart)
// restarts server
routes.get('/restart', function() {
  process.exit(1);
});

// (GET /admin/contacs)
// test contact email
routes.get('/contacts', (request, response) => {

  const message = {
    config: {
      subject: 'Test React Contact Template',
      to: 'lstewartvt@gmail.com'
    },
    template: 'contact'
  };
  helpers.mail.send(message);

});


// (GET /adming/mongoose)
// generates mongoose schema from json
routes.get('/mongoose', function(request, response, next) {
  const user = {};
  const GenerateSchema = require('generate-schema');
  const schema = GenerateSchema.json('Product', user);

  response.json(schema);
});

// (GET /adming/debug/user)
// debugs user information
routes.get('/debug/user', function(request, response) {

  helpers.user.verify.apply(this, arguments).then(() => {

    helpers.user.list.apply(this, arguments).then((users) => {
      this.users = users;

      response.json({
        errors: this.errors,
        user: request.user,
        users: this.users
      });
    });
  });
});
