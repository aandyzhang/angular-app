'use strict';

angular.module('app')
    .controller('corpCtrl',function($scope,$http,$state){
        $http.get('data/company.json?id='+$state.params.id).success(function(resp){
            $scope.company=resp;
        });
    })