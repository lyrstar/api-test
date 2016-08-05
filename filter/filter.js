'use strict';
const token = require('../util/token.js');
let config = require('../config/api.js');

let encryptKey = config.encryptKey;
let encryptRequest = config.filter.request;
let encryptResponse = config.filter.response;

let filter = {
	request: function(req, msg) {
		//if(! __getObjectCount(msg)) return msg;
		if(encryptRequest.encryptAttr) msg = msg[encryptRequest.encryptAttr];
		msg = JSON.stringify(msg);
		if(! __isEncrypt(req)) return msg;
		let userId = msg.userId || 0;
		let key = __getKey(req);
		try{
			msg = token[encryptRequest.encryptType].encrypt(msg, key, encryptRequest.encryptParams);
		}catch(e){
			console.error('filter : request : encrypt : ', e);
			return {};
		}
		return {sign : msg, userId : userId};
	},

	response : (req, msg) => {
		if(! msg) return msg;
		if(typeof msg === 'object'){
			return msg;
		}
		if(encryptResponse.encryptAttr) msg = msg[encryptResponse.encryptAttr];
		if(! __isEncrypt(req)) return next();
		let key = __getKey(req);
		try{
			msg = token[encryptResponse.encryptType].decrypt(msg, key, encryptResponse.encryptParams);
		}catch(e){
			console.error('filter : response : encrypt : ', e);
			return '';
		}
		return msg;
	}
};

function __getKey(req){
	let url = req.originalUrl;
	let urls = ['/user/register', '/user/login'];
	for(let item of urls){
		if(url.startsWith(item)){
			return 'o-p@kdn=';
		}
	}
	return encryptKey;
}

function __isEncrypt(req){
	let url = req.originalUrl;
	let urls = ['/log/findLogByGame', '/log/statLogByGame', '/cdkey/use', '/user/super', '/getClientVersion'];
	for(let item of urls){
		if(url.startsWith(item)){
			return false;
		}
	}
	return true;
}

function __getObjectCount(obj){
	let i = 0;
	for(let attr in obj) i ++;
	return i;
}
module.exports = filter;

