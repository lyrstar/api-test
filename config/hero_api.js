'use strict';
/**
 * Created by sunpengfei on 16/7/6.
 */
const hostname = '127.0.0.1';
const port = 3500;
const filter = {
    request: (msg) => {
        return msg
    },
    response: (msg) => {
        return msg
    }
};
const data = [
    {
        name: '获取房间列表',
        host: '127.0.0.1',
        port: '3500',
        url: '/json/reply/ListMatchRequest',
        method: 'post',
        data: {
            date: '2016-08-31',
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    },
    {
        name: '创建房间',
        host: '127.0.0.1',
        port: '3500',
        url: '/json/reply/CreateMatchRequest',
        method: 'post',
        data: {
            date: '2016-08-31',
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    },
    {
        name: '加入房间',
        host: '127.0.0.1',
        port: '3500',
        url: '/json/reply/JoinMatchRequest',
        method: 'post',
        data: {
            date: '2016-08-31',
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    },
];

module.exports = {
    api: data,
    filter: filter,
    host: hostname,
    port: port,
};