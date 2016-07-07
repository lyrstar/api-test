'use strict';
/**
 * Created by sunpengfei on 16/6/3.
 */
var app = angular.module('app', []);
app.controller('apiCtrl', function($scope, connectService){
    $scope.api = {
        list : {},
        info : {
            style : {
                color : 'green'
            }
        },
        datas : [],
        style : {
            'padding': '4em'
        }
    };
    connectService.sendRequest('/api-test/getApi', 'GET')
        .then(
            function (data) {
                $scope.api.datas = data.api.data;
                $scope.api.host = data.api.host;
                $scope.api.port = data.api.port;
                console.log(data)
            },
            function (error) {
                $scope.info.model = error.msg;
                $scope.api.info.style.color = 'red';
            }
        )
});