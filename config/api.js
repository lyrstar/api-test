'use strict';
const hostname = '127.0.0.1'; //默认访问ip
const port = 3500;  //默认访问端口号
const filter = {
    request: (msg) => {
        return msg; //对请求参数的处理
    },
    response: (msg) => {
        return msg; //对响应参数的处理
    }
};

const data = [  //接口列表
    {
        name: '测试1',    //接口业务描述(名称)
        host: hostname,
        port: port,
        url: '/test1',
        method: 'GET',  //请求方式
        data: {         //参数
            sign: 'ifuwFeZ7WzgcqNg==',
            time: 123456789
        },
        success: {data: {}, status: 200},   //正确时响应的结果
        error: [    //错误时响应的结果
            {data: {}, status: 500}
        ]
    },
    {
        name: '测试2',
        host: hostname,
        port: port,
        url: '/test2',
        method: 'POST',
        data: {
            time: 123456789,
            sign: 'XQMJqvBHFno2F81+EesSQ=='
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    }
];

module.exports = {
    api: data,
    filter: filter,
    host: hostname,
    port: port,
};