'use strict';
/**
 * Created by sunpengfei on 16/6/2.
 */
var app = angular.module('app');
app.service('connectService', function($http, $q){
    function sendRequest(url, method, data){
        method = method.toLocaleUpperCase();
        var s = {
            method: method,
            url: url
        };
        if(method === 'GET'){
            s.params = data;
        }else{
            s.data = data;
        }

        return send(s);
    }

    function send(params){
        var deferred = $q.defer();
        var promise = $http(params);
        promise.then(
            function(success){
                deferred.resolve(success.data)
            },
            function(error){
                deferred.reject(error)
            }
        );
        return deferred.promise;
    }


    return {
        sendRequest : sendRequest
    }
});

