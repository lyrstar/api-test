'use strict';
/**
 * Created by sunpengfei on 16/7/7.
 */
const http = require('http');
const request = require('request');
const filter = require('./filter/filter.js');
let hostname = '127.0.0.1';
let port = 13000;

function send(req, res, next){
    //console.log(req.originalUrl);
    let path = req.url;
    let method = req.method;
    let data = req.query;
    console.log(req.url);
    console.log(req.method);
    console.log(req.body);
    console.log(req.query);
    method = method.toUpperCase();
    if(method === 'POST'){
        data = req.body;
    }
    _httpRequest(path, req.method, data)
        .then(d => {
            console.log(d);
            res.send({status : 200, msg : d})
        })
        .catch(e => {
            console.error(e);
            res.send({status : 500, msg : e})
        })

}

module.exports = {
    send : send
}





function _httpRequest(path, method, msg){
    let url = 'http://' + hostname + ':' + port + path;
    return new Promise((resolve, reject) => {
        if(method === 'GET'){
            request.get({url:url, qs:msg, json:true}, function(err, httpResponse, body) {
                if (err) {
                    return reject(err);
                }
                resolve(body);
            });
        }else if(method === 'POST'){
            request.post({url:url, form : msg}, function(err, httpResponse, body) {
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
