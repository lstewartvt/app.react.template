const helpers = includes('helpers/');

module.exports = (app) => {

  // Set up smtp
  helpers.mail.init.call(app);

  app.get('/contacts', (request, response) => {

    var message = {
      config: {
        subject: 'Test React Contact Template',
        to: 'lstewartvt@gmail.com'
      },
      handleError: undefined,
      handleSuccess: undefined,
      response: response,
      template: 'contact'
    };

    helpers.mail.send.call(app, message);
  });
};
