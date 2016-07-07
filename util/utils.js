'use strict';

let filter = require('../filter/filter.js');

function getFullDate(odate) {
	let date;
	try{
		date = new Date( odate );
		if( !( date.getFullYear() > 2000 ) ){
			date = new Date( Number(odate) );
		}
		let result = date.getFullYear() + '-' + formateZeroMonAndDay(date.getMonth() + 1) + '-' + formateZeroMonAndDay(date.getDate());
		return result;
	}catch(e){
		console.log('utils::getFullDate,', date)
		return '0000-00-00';
	}
}

function formateZeroMonAndDay(val){
	if( val > 9 ){
		return ''+val;
	}
	return '0'+val;
}
function formateTime(time){
	console.log('formateTime::', time);
	return time.replace(/:/g, '').replace(/-/g, '');
}
function formateTimeReverse(time){
	console.log('formateTimeReverse::', time);
	return time.substring(0,2) + ':' + time.substring(2,4) + '-' + time.substring(4,6) + ':' + time.substring(6,8);
}
function getClientIp(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
}
function response(req, res, data, code, msg) {
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
	rs = filter.response(req, res, rs);
	console.log('response, 加密数据', rs);
	res.send(rs);
}

let mod = {
	response: response,
	getClientIp: getClientIp,
	formateTime: formateTime,
	getFullDate: getFullDate,
	formateTimeReverse:formateTimeReverse,

	checkDate: (date, start, end) => {
		date = new Date(date).getTime();
		start = new Date(start).getTime();
		end = new Date(end).getTime();
		if( date < start || date > end ){
			return false;
		}
		return true;
	},
	
	checkTime: (time, start, end) => {
		console.log('utils::checkTime::', [time, start, end]);
		time = Number(formateTime(time).substring(0,4)); 
		start = Number(formateTime(start)); 
		end = Number(formateTime(end)); 
		if( time < start || time > end ){
			return false;
		}
		return true;
	},

	staticValues: {
		CANCELLED:'cancelled',
		FINISHIED:'finished',
		UPPAID:'unpaid',
		PAID:'paid'
	},

	clone : function (obj) {
		let new_obj = {};
		for (let attr in obj) new_obj[attr] = obj[attr];
		return new_obj;
	}
}



module.exports = mod; 
