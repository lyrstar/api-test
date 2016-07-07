'use strict';
/**
 * Created by sunpengfei on 16/7/6.
 */
var cookieParser = require('cookie-parser');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var filter = require('./filter/filter.js');

var app = express();
var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(filter.request);

app.use('/', routes);



var server = app.listen(3300);

module.exports = app;

console.log('http://127.0.0.1:3300');
console.log('http://127.0.0.1:3300/api-test/api');
console.log('http://127.0.0.1:3300/api-test/test');

