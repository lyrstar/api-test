'use strict';
/**
 * Created by sunpengfei on 2016/11/28.
 */
const http = require('http');
const querystring = require('querystring');

function request(params) {
    return new Promise((resolve, reject) => {
        params.data = params.data || '';
        params.data = JSON.stringify(params.data);
        var options = {
            hostname: params.hostname,
            port: params.port,
            path: params.path,
            method: params.method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': params.data.length
            }
        };
        var req = http.request(options, res => {
            var data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on("end", () => {
                resolve(data);
            });
        });
        req.on('error', e => reject(e));
        req.write(params.data);
        req.end();
    })
}

module.exports = {
    request: request
}