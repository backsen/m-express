var express = require('express');
var path = require('path');

var Bootstrap = require('./core/bootstrap');

var app = express();

var app = Bootstrap.start(app);

module.exports = app;