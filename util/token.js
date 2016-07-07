'use strict';
/**
 * Created by sunpengfei on 16/6/2.
 */
let crypto = require('crypto');
const DESTYPE = ['des-ecb', 'des-cbc', 'des-ede3', 'des-ede3-cbc'];

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

module.exports.guid = function() {
    let date = ((Date.now()/1000).toFixed()*1).toString(36);
    let s1 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0);
    let s2 = (((1 + Math.random()) * 0x1000000) | 0).toString(36).substring(0);
    return date + '-' + s1 + '-' + s2;
};

var des = module.exports.des = {
    encrypt : function (string, key) {
        key = new Buffer(key);
        //var iv = new Buffer(8);
        var iv = new Buffer([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF])
        var desType = DESTYPE[1];
        try{
            var cipher = crypto.createCipheriv(desType, key, iv);
            var ciph = cipher.update(string, 'utf8', 'base64');
            ciph += cipher.final('base64');
            return ciph;
        }catch(e){
            console.error('加密失败',e)
        }
    },
    decrypt : function(string, key){
        //console.log('=======:string', string);
        //console.log('=======:key', key);
        key = new Buffer(key);
        var iv = new Buffer([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]);
        var desType = DESTYPE[1];
        try{
            var decipher = crypto.createDecipheriv(desType, key, iv);
            var txt = decipher.update(string, 'base64', 'utf8');
            txt += decipher.final('utf8');
            return txt;
        }catch(e){
            console.error('解密失败', e)
        }

    }
}


//let a = des.encrypt('一二三fasd123', 'o-p@kdn=')
//let b = des.decrypt('d4WJVtycGWsjZcBb3P64XaLYAOgJ75wM1wCxIzwRavuRG//ENFhPA8v76G7KVOk2', 'f59bd65f')
//console.log('a', a);
//let c = md5('123456');
//console.log('b', b);
//console.log('c', c);//202cb962ac59075b964b07152d234b70 202cb962ac59075b964b07152d234b70
