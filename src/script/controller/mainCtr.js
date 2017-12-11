'use strict';

angular.module('app')
    .controller('mainCtr',function($scope,$http){
        $scope.current="main";
        $http.get('/data/positionList.json').success(function(success){
            $scope.list=success;
        });
    })