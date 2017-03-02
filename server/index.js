const app = require('./app');

const PORT = process.env.PORT || 27773;

var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`Magic is being served up at http://${host === '::' ? 'localhost' : host}:${port}`);
});
