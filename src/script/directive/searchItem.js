'use strict';

angular.module('app').directive('searchItem',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/searchItem.html",
        replace:true,
        scope:{
            items:"=",
            switch:"=",
        },
        // scope: true,
        link: function(scope){
            scope.cancel = function(){
                scope.switch.menu = false;
            },
            scope.query=function(value){
                scope.switch.menu = false;
                scope.switch.city=value;
            }
        }
    };
});