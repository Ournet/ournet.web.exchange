'use strict';

var express = require('express');
var utils = require('../utils.js');
/*eslint new-cap:1*/
var route = module.exports = express.Router();

route.get('/favicon.ico', function(req, res) {
	var config = res.locals.config;
	utils.maxage(res, 60 * 24 * 14);
	return res.redirect(301, config.favicon);
});
