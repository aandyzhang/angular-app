'use strict';

angular.module('app')
    .controller('loginCtrl',function($scope,$http){
        $scope.username="";
        $scope.password="";
        $scope.back=function(){
            window.history.back();
        };
        $scope.check=function(){
            if( $scope.username == ''){
                $scope.username="请输入用户名";
            }
            if($scope.password=""){
                $scope.password="请输入密码";
            }
        };
    })