"use strict";

var express = require('express');
var router = express.Router();
let api = require('../config/api.js');

router
    .get('/api-test/test', function (req, res, next) {
        res.render('test', {title : 'api测试'});
    })
    .get('/api-test/api', function (req, res, next) {
        res.render('api', {title : 'api文档'});
    })
    .get('/api-test/getApi', function (req, res) {
        res.send({api : api})
    })
    .get('/*', function (req, res, next) {
        res.send('start success ! ');
    })

module.exports = router;
