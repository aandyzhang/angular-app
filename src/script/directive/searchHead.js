'use strict';

angular.module('app').directive('searchHead',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/searchHead.html",
        replace:true,
    };
});