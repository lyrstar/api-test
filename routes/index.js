"use strict";

var express = require('express');
var router = express.Router();
let agent = require('../agent.js');

let apiPath = '../config/';
let apiName = 'api';
if(!! process.argv[2]) apiName = process.argv[2];
let api = require(apiPath+apiName).api;

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
    .get('/*', agent.send)
    .post('/*', agent.send)

module.exports = router;
