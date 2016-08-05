'use strict';
/**
 * Created by sunpengfei on 16/7/6.
 */
var filter = {
    request : {
        encryptType : 'des',
        encryptParams : 'des-cbc',
        encryptAttr : '',
    },
    response : {
        encryptType : 'des',
        encryptParams : 'des-cbc',
        encryptAttr : '',
    }
}
var data = [
    {
        name : '获取客户端版本',
        host : '127.0.0.1',
        port : '13000',
        url : '/getClientVersion',
        method : 'GET',
        data : {},
        success : {data: { version: '1.1.1' }, status: { code: 200}},
        error : [
            { data: {msg : 'error'}, status: { code: 500} }
        ]
    },
    {
        name : '用户注册',
        host : '127.0.0.1',
        port : '13000',
        url : '/user/register',
        method : 'POST',
        data : {password : 'string', phone : '12345678910'},
        success : {data: { msg: '注册成功' }, status: { code: 200}},
        error : [
            { data: {msg : '注册失败,此手机号已经注册'}, status: { code: 500} },
            { data: {msg : '请输入正确的手机号'}, status: { code: 500} },
            { data: {msg : '请输入正确的密码'}, status: { code: 500 } }
        ]
    },
    {
        name : '用户登录',
        host : '127.0.0.1',
        port : '13000',
        url : '/user/login',
        method : 'POST',
        data : {phone : '12345678910', password : 'string'},
        success : {data: { msg: '登陆成功' }, status: { code: 200}},
        error : [{ data: { msg: '登陆失败'}, status: { code: 500 }}]
    },
    {
        name : '用户身份验证',
        host : '127.0.0.1',
        port : '13000',
        url : '/user/auth',
        method : 'POST',
        data : {phone : '12345678910', password : 'string'},
        success : {data: { msg: '身份验证成功' }, status: { code: 200}},
        error : [{ data: { msg: '身份验证失败'}, status: { code: 500 }}]
    },
    {
        name : '修改密码',
        host : '127.0.0.1',
        port : '13000',
        url : '/user/updatePassword',
        method : 'POST',
        data : {phone : '12345678910', password : 'string', newPassword : 'string'},
        success : {data: { msg: '密码修改成功' }, status: { code: 200}},
        error : [
            { data: {msg: '没有设置新密码'}, status: { code: 500  } },
            { data: {msg: '修改失败, 密码输入错误或新密码与旧密码相同'}, status: { code: 500} }
        ]
    },
    {
        name : '上送活动记录',
        host : '127.0.0.1',
        port : '13000',
        url : '/log/saveLogs',
        method : 'POST',
        data : [{
            userId:1,
            phone:'12345678910',
            computerInfo : 1,
            gameName : '画境',
            gameType : '1',
            startTime : Date.now(),
            endTime : Date.now(),
            estimatedTime : 600000,//ms
            actualTime : 500000,//ms
            estimatedMoney : 20,//¥
            actualMoney : 20,//¥
            other:{}
        }],
        success : {data: { msg: '记录上送成功' }, status: { code: 200}},
        error : [
            { data: { msg: '记录上送失败'}, status: { code: 500 } }
        ]
    },
    {
        name : '查询游戏运行记录',
        host : '127.0.0.1',
        port : '13000',
        url : '/log/findLogByGame',
        data : {userId : 1, game : '画境'},
        method : 'GET',
        success : {data: { msg: '' }, status: { code: 200}},
        error : [
            { data: {msg: 'error'}, status: { code: 500 } }
        ]
    },
    {
        name : '统计游戏运行记录',
        host : '127.0.0.1',
        port : '13000',
        url : '/log/statLogByGame',
        data : {userId : 1, game : ''},
        method : 'GET',
        success : {data: { msg: '' }, status: { code: 200}},
        error : [
            { data: {msg: 'error'}, status: { code: 500 } }
        ]
    },
    {
        name : '添加CDKEY',
        host : '127.0.0.1',
        port : '13000',
        url : '/cdkey/create',
        data : {userId : 1, gameId : 'asd', gameName : '英雄时代', key : '111-111-111', phone : '18888888888',
            CDKeyEffectTimeStart : new Date(), CDKeyEffectTimeEnd : new Date('2017-1-1'),
            GoodsEffectTimeStart : new Date(), GoodsEffectTimeEnd : new Date('2017-1-1')},
        method : 'GET',
        success : { "data": { "__v": 0, "gameName": "英雄时代", "key": "111-222-444", "userId": 1, "status": 2, "_id": "5774d4ffd9616ee41322d85e" }, "status": { "code": 200, "msg": "" } },
        error : [
            { data: {msg: 'error'}, status: { code: 500 } }
        ]
    },
    {
        name : '使用CDKEY',
        host : '127.0.0.1',
        port : '13000',
        url : '/cdkey/use',
        data : {userId : 1, key : '111-111-111'},
        method : 'GET',
        success : { data: {}, "status": { "code": 200, "msg": "" } },
        error : [
            { data: {msg: 'error'}, status: { code: 500 } }
        ]
    },
    {
        name : '获取自己的CDKEY',
        host : '127.0.0.1',
        port : '13000',
        url : '/cdkey/find',
        data : {userId : 1, phone : '18888888888'},
        method : 'GET',
        success : { "data": [ { "CDKeyEffectTimeEnd": "2016-12-31T16:00:00.000Z", "CDKeyEffectTimeStart": "2016-07-01T12:10:48.816Z", "GoodsEffectTimeEnd": "2016-12-31T16:00:00.000Z", "GoodsEffectTimeStart": "2016-07-01T12:10:48.816Z", "gameId": "asd", "gameName": "英雄时代", "key": "211-111-111", "phone": "18888888888", "userId": 1, "status": 1 }, { "CDKeyEffectTimeEnd": "2016-12-31T16:00:00.000Z", "CDKeyEffectTimeStart": "2016-07-01T12:10:48.816Z", "GoodsEffectTimeEnd": "2016-12-31T16:00:00.000Z", "GoodsEffectTimeStart": "2016-07-01T12:10:48.816Z", "gameId": "asd", "gameName": "英雄时代", "key": "311-111-111", "phone": "18888888888", "userId": 1, "status": 1 }, { "CDKeyEffectTimeEnd": "2016-12-31T16:00:00.000Z", "CDKeyEffectTimeStart": "2016-07-01T12:10:48.816Z", "GoodsEffectTimeEnd": "2016-12-31T16:00:00.000Z", "GoodsEffectTimeStart": "2016-07-01T12:10:48.816Z", "gameId": "asdf", "gameName": "4", "key": "411-111-111", "phone": "18888888888", "userId": 1, "status": 1 } ], "status": { "code": 200, "msg": "" } },
        error : [
            { data: {msg: 'error'}, status: { code: 500 } }
        ]
    },
];

module.exports = {
    api : data,
    filter : filter,
    host : '127.0.0.1',
    port : 13000,
    encryptKey : '',
};