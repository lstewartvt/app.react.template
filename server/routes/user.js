const express = require('express');
const helpers = includes('helpers/');

let routes = module.exports = express.Router();

// route to view user profile (GET /profile)
routes.get('/profile', function(request, response) {});
