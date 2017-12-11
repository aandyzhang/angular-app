'use strict';
angular.module('app').directive('classify',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/classify.html",
        replace:true,
        scope:{
            com:'='
        },
        link:function($scope){
                $scope.checkList=function(id){
                    $scope.positionList=$scope.com.positionClass[id].positionList;
                    $scope.isActive=id;
                };
                $scope.$watch('com',function(newVal,oldVal,scope){
                   if(newVal){
                    $scope.checkList(0);
                   }
                });
            } 
    }
});