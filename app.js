'use strict';
/**
 * Created by sunpengfei on 16/7/6.
 */
var express = require('express');
var child_process = require('child_process');
var path = require('path');
var bodyParser = require('body-parser');
var agent = require('./agent.js');
var apiPath = './config/';
if (!process.argv[2]) return console.error('请在启动参数配置要使用的api文件,详情请查看README.md');
let api = require(apiPath + process.argv[2]).api;
console.log('加载API文件:', process.argv[2]+'.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

var router = express.Router();
app.use('/', router);


router
    .get('/api-test/test', function (req, res, next) {
        res.render('test', {title: 'api测试'});
    })
    .get('/api-test/api', function (req, res, next) {
        res.render('api', {title: 'api文档'});
    })
    .get('/api-test/getApi', function (req, res) {
        res.send({api: api})
    })
    .get('/*', agent.send)
    .put('/*', agent.send)
    .post('/*', agent.send)
    .delete('/*', agent.send)

app.listen(3300);
module.exports = app;

console.log('接口调用测试:', `http://${getIPAddress()}:3300/api-test/test`);
console.log('查看API文档:', `http://${getIPAddress()}:3300/api-test/api`);
openWindow(`http://${getIPAddress()}:3300/api-test/test`);
function getIPAddress() {
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}


function openWindow(url) {
    var cmd;
    if(process.platform == 'wind32') cmd  = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
    else if(process.platform == 'linux') cmd  = 'xdg-open';
    else if(process.platform == 'darwin') cmd  = 'open';

    child_process.exec(cmd + ' "'+url + '"');
}