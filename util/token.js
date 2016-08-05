'use strict';
/**
 * Created by sunpengfei on 16/6/2.
 */
const crypto = require('crypto');
const os = require('os');

function getKey(key){
    key = key.replace(/-/g,'').slice(0,32);
    if(key.length<32){
        key = key.concat(new Array(33-key.length).join('\0'));
    }
    //key = crypto.createHash('sha256').update(key).digest();
    return key ;
}

var md5 = module.exports.md5 = function(str){
    let md5 = crypto.createHash('md5');
    //md5.update(new Buffer(str)).toString('binary');
    md5.update(str, 'utf8');
    return md5.digest('hex').toLocaleUpperCase();
};

module.exports.aes = {
    encrypt : function(msg, key) {
        key = getKey(key);
        var iv = new Buffer(16);
        iv.fill(0);

        var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        var sign = cipher.update(msg, 'utf8', 'base64');
        sign += cipher.final('base64');
        return sign;
    },
    decode : function(msg, key) {
        key = getKey(key);
        var iv = new Buffer(16);
        iv.fill(0);
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        var dec;
        try {
            dec = decipher.update(msg, 'base64', 'utf8');
            dec += decipher.final('utf8');
        } catch(err) {
            console.error('[token] 数据解密失败 密文 : ', msg);
            console.error('[token] 数据解密失败 key : ', key);
            return null;
        }
        return dec;
    }
};

var guid = module.exports.guid = function() {
    let date = (Date.now().toFixed()*1).toString(36);
    let t1 = date.substring(0, 4);
    let t2 = date.substring(4);
    let mac = parseInt(__getMac().replace(/:/g, ''), 16).toString(36);
    let m1 = mac.substring(0, 5);
    let m2 = mac.substring(5);
    let s1 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0, 5);
    let s2 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0, 5);
    return `${s1}-${s2}-${m1}-${m2}-${t1}-${t2}`;
};

var token = module.exports.token = function() {
    let date = (Date.now().toFixed()*1).toString(36);
    let s1 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0, 5);
    let s2 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0, 5);
    return date + s1 + s2;
};

var des = module.exports.des = {
    /**
     * 加密
     * @param string
     * @param key
     * @param type ['des-ecb', 'des-cbc', 'des-ede3', 'des-ede3-cbc']
     * @returns {*}
     */
    encrypt : function (string, key, type) {
        if(!string || !key){
            return '';
        }
        if(key.length > 8){
            console.error('秘钥长度为:', key.length)
        }
        key = new Buffer(key);
        //var iv = new Buffer(8);
        var iv = new Buffer([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF])
        var desType = type || 'des-cbc';
        try{
            var cipher = crypto.createCipheriv(desType, key, iv);
            var ciph = cipher.update(string, 'utf8', 'base64');
            ciph += cipher.final('base64');
            return ciph;
        }catch(e){
            console.error('加密失败',e)
            return '';
        }
    },
    /**
     * 解密
     * @param string
     * @param key
     * @param type ['des-ecb', 'des-cbc', 'des-ede3', 'des-ede3-cbc']
     * @returns {*}
     */
    decrypt : function(string, key, type){
        if(!string || !key){
            return '';
        }
        if(key.length > 8){
            console.error('秘钥长度为:', key.length)
        }
        key = new Buffer(key);
        var iv = new Buffer([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]);
        var desType = type || 'des-cbc';
        try{
            var decipher = crypto.createDecipheriv(desType, key, iv);
            var txt = decipher.update(string, 'base64', 'utf8');
            txt += decipher.final('utf8');
            return txt;
        }catch(e){
            console.error('解密失败', e)
            return '';
        }

    }
}


function __getMac(){
    var networkInterfaces=os.networkInterfaces();
    for(let attr in networkInterfaces){
        for(let item of networkInterfaces[attr]){
            if(item.family === 'IPv4' && item.mac !== '00:00:00:00:00:00'){
                return item.mac;
            }
        }
    }
};
