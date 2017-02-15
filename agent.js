'use strict';
/**
 * Created by sunpengfei on 16/7/7.
 */
const http = require('http');
const request = require('request');
const connect = require('./connect.js');

let apiPath = './config/';
let apiName = 'api';
if(!! process.argv[2]) apiName = process.argv[2];
let config = require(apiPath+apiName);

const host = config.host || '127.0.0.1';
const port = config.port || 80;
const filter = config.filter;


function send(req, res, next){
    //console.log(req.originalUrl);
    let path = req.url;
    let method = req.method;
    let data = req.query;
    console.log(req.method, req.url);
    console.log(req.params, req.query, req.body);
    if(req.url === '/favicon.ico'){
        res.send('');
        return;
    }
    method = method.toUpperCase();
    if(method === 'POST'){
        data = req.body;
    }
    data = filter.request(data);
    _httpRequest(path, req.method, data)
        .then(d => {
            console.log('agent : response :', d);
            d = filter.response(d);
            res.send(d)
        })
        .catch(e => {
            console.error('agent : response :', e);
            res.send(e)
        })

}


function _httpRequest(path, method, msg){
    console.log('data : msg :', msg);
    return connect.request({
        hostname: host,
        port: port,
        path: path,
        method: method,
        data: msg
    })
}
/**
function _httpRequest(path, method, msg){
    let url = 'http://' + host + ':' + port + path;
    return new Promise((resolve, reject) => {
        if(method === 'GET'){
            request.get({url:url, qs:msg, json:true}, function(err, httpResponse, body) {
                if (err) {
                    console.error('_httpRequest')
                    return reject(err);
                }
                resolve(body);
            });
        }else if(method === 'POST'){
            request.post({url:url, form : msg}, function(err, httpResponse, body) {
                console.log(msg)
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        }else{
            resolve('暂不支持此种请求方式');
        }

    })
}
 */

module.exports = {
    send : send
};