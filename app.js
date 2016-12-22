'use strict';
/**
 * Created by sunpengfei on 16/7/6.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

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

app.use('/', routes);



app.listen(3300);
module.exports = app;

console.log(`http://${getIPAddress()}:3300/api-test/test`);

function getIPAddress(){
    let interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}