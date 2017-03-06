const url = require('url');

// Http helper methods
module.exports = {
  full_url: (request) => {

    var url_parts = url.parse(request.originalUrl);
    url_parts.host = request.get('host');
    url_parts.protocol = request.protocol;
    var full_url = url.format(url_parts);
    return full_url;
  }
};
