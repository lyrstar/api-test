'use strict';
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
        name: '获取密室房间信息',
        host: '127.0.0.1',
        port: '3000',
        url: '/open/rooms',
        method: 'GET',
        data: {
            date: '2016-08-31',
            sign: 'S5d6f0OIZtONOa1pGVaMj38bASCk4JBLTrLwN4rvtXcIeyPVNUKc64crQf5fDVMaidRCCrCMbuehhhoUbPRcgQeQeI3k1e4JLNhwPZld0SNDNa7MpGll5NdgkMLBmGsrdjnWPBcXMfTBUkTLJqbiJBJ5v9DlJs3u2lziC/OwqJQoz+9NPJvsrGx+fv52CRMHSpqr3FKDeA3hGichrTq6E9NkrdnDVprcvP5aMhIWpt6ldnm6ftBxX6dpuWRcFqFGg0V0ES6sH7dR/CplVkj4NSB7d6azKHDbRKGmSvynbpWxjIIaUTX6QJI7Gqu0QHxDE+nRqjcifuwFeZ7WzgcqNg==',
            time: 1472278405685
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    },
    {
        name: '下单',
        host: '127.0.0.1',
        port: '3000',
        url: '/open/order',
        method: 'POST',
        data: {
            time: 1472278405685,
            "shopId": 4,
            "roomId": 20,
            "date": 1472278405685,
            "timeRange": "21002200",
            "telNO": "12345678900",
            "name": "12345678900",
            "persons": 6,
            "bookingDate": "2015-12-31",
            "roomName": "猫王国奇遇记",
            "shopName": "王府井",
            "logoUrl": "tubiao.maowanguoqiyuji.png",
            "prepay": 200,
            "outTradeNO": "4_20_20151231_210022000281814374",
            "others": {},
            sign: 'XpWxtdR/8+Xh+i7p0U2T71jvt0jrVBLky+uFCvomZ0AxhJtCuQ+smxJxPd4/PiU5qQBme2HHrjM8lsOCJUdp+9hlp9t7EZ/T8lPvxga5WleKALHrG5XGvTiF2tGKSBfJdWyVW68dxxOYIfX/RlhgU2Uc8N7wtP9E0PfI1XApGDkq6m3qzvbGPB3PLC/YmTtwaDYamsh9dELC0L/Hcgkl2GM8LQaGgAiH3tAbCF3ta3bQDOG51oD+YHGTNlKDL87o6zzD5Aix2CXxXVTmk0oXRekVf3fIOiXkD5yXDpMVKTEyr433o3VBHejUNHxGXvuq4YQMJqvBHFno2F81+EesSQ=='
        },
        success: {data: {}, status: 200},
        error: [
            {data: {}, status: 500}
        ]
    },
    {
        name: '退单',
        host: '127.0.0.1',
        port: '3000',
        url: '/open/cancelOrder',
        method: 'POST',
        data: {
            "sign": "Y0No5wtYA3O8u//Zm/GugWQM1E8w3Dz66KmjbPZY2kkWhYf43q2CBGwH2yKxPl5eFyrxZUz+8Kf4mNooRu06eDSVLBSfYBeJpaEN++M+NRCF6Nx66JMVkQDc86N6BgKRTB89SCx0DRQX8AO6O2f+bpVkQjBQnczGeLtJQd9a7+PW1lzAMY9tKTf94t4pMDEiFoK5cbGqQoeZqI96Rc2vFXquqIfpc/wfWJpBmMMBcN1byVpB3eORixMhiN6/WpWFfAc2GaGZsEBrKHjgAoDnu8H9d96NZ+MxBb5X8lDlDWiYvX39TYVZDy/B9vgkEKJSLKVOP+RDX4g0FYO4BHoMpQ==",
            "time": 1472278405685,
            "outTradeNO": "4_20_20151231_210022000281814374",
            "NO": "4_20_20151231_21002200"
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