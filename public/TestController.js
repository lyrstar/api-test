'use strict';
/**
 * Created by sunpengfei on 16/6/1.
 */
var app = angular.module('app', []);
app.controller('testCtrl', function($scope, connectService){
    $scope.test = {
        title : {
            model : '网络通信测试页面'
        },
        url : {},
        method : {},
        data : {
            style : {
                'margin-left': '2em',
                display: 'block',
                width: '400px',
                height: '88px',
                padding:'2px',
                'font-size':'18px'
            }
        },
        selected : {
            onChange : function() {
                $scope.test.title.model = !!$scope.test.selected.model ? $scope.test.selected.model.name : '';
                $scope.test.url.model = !!$scope.test.selected.model ? $scope.test.selected.model.url : '';
                $scope.test.method.model = !!$scope.test.selected.model ? $scope.test.selected.model.method : '';
                $scope.test.data.model = !!$scope.test.selected.model ? JSON.stringify($scope.test.selected.model.data) : '';
            }
        },
        info : {
            color : 'green'
        },
        submit : {
            style : {
                width : '66px',
                height: '33px'
            },
            onClick : function() {
                var url = $scope.test.url.model;
                var method = $scope.test.method.model;
                var data = JSON.parse($scope.test.data.model);

                connectService.sendRequest(url, method, data)
                    .then(function(d) {
                        $scope.test.info.model = d;
                        $scope.test.info.color = 'green';
                    },
                    function(e) {
                        $scope.test.info.model = e;
                        $scope.test.info.color = 'red';
                    }
                )
            }
        }

    };

    connectService.sendRequest('/api-test/getApi', 'GET').then(
        function(d) {
            $scope.test.selected.data = d.api;
            $scope.test.info.color = 'green';
            $scope.test.selected.model = d.api[0];
            $scope.test.selected.onChange()
        },
        function(e) {
            $scope.test.info.model = '数据请求失败';
            $scope.test.info.color = 'red';
        }
    );

});