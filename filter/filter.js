'use strict';
let token = require('../util/token.js');

let __userKey = {};

let filter = {

	request: function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		console.log('url', req.url);
		if(req.method === 'GET'){
			let data = req.query;
			if(!data.sign){
				return next();
			}
			_getUserKey(req)
				.then(key => {
					let userId = req.query.userId;
					let d = token.des.decrypt(data.sign, key);
					req.query = JSON.parse(d);
					req.query.userId = userId;
					next();
				})
				.catch(e => {
					res.send({status : {code : 500, msg : e}});
				})
		} else if(req.method === 'POST'){
			let data = req.body;
			if(!data.sign){
				return next();
			}
			_getUserKey(req)
				.then(key => {
					let userId = req.body.userId;
					let d = token.des.decrypt(data.sign, key);
					req.body = JSON.parse(d);
					req.body.userId = userId;
					next();
				})
				.catch(e => {
					res.send({status : {code : 500, msg : e}});
				})
		}
	},

	response : (req, res, data, code, msg) => {
		msg = msg || '';
		code = code || 200;
		let rs = {
			data: data,
			status: {
				code: code,
				msg: msg
			}
		};
		if(code === 500 && !rs.data.msg){
			rs.data = {msg : msg};
		}
		console.log('response,', rs);

		//若不需要加密, 直接返回
		if(! __isEncrypt(req)){
			res.send(rs);
			return;
		}
		_getUserKey(req)
			.then(key => {
				let d = token.des.encrypt(JSON.stringify(rs), key);
				res.send(d);
				console.log('response, 加密数据', d);
			})
			.catch(e => {
				res.send({status : {code : 500, msg : e}});
			})
	}

}

function _getUserKey(req){
	return new Promise((resolve, reject) => {
		let url = req.originalUrl;
		let key = 'o-p@kdn=';
		//特定请求使用固定key
		if( url.startsWith('/user/register') || url.startsWith('/user/login') || url.startsWith('/getClientVersion')){
			resolve(key);
			return;
		}
		//尝试内存取key
		let userId = req.query.userId || req.body.userId;
		if(! userId){
			reject('请先登录!')
			return;
		}
		let userKey = __userKey[userId];
		if(userKey){
			resolve(userKey);
			return;
		}
		//数据库取key
		_getUserPassWord(userId)
			.then(password => {
				let key = password;
				key = key.substring(0, 8);
				__userKey[userId] = key;
				resolve(key);
			})
			.catch(e => {
				reject(e);
			})
	})

}


function _getUserPassWord(userId){
	return new Promise((resolve, reject) => {
		UserService.getUser({userId : userId}).
			then(user => {
				user = user[0];
				if(!user.password){
					reject('用户信息没有找到');
					return;
				}
				resolve(user.password);
			}).
			catch(e => {
				reject(e)
			})
	});
}



function __isEncrypt(req){
	let url = req.originalUrl;
	if(url.startsWith('/log/findLogByGame') || url.startsWith('/log/statLogByGame')){
		return false;
	}
	return true;
}

module.exports = filter;

