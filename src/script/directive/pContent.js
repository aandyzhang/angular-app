'use strict';

angular.module('app').directive('pContent',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/pContent.html",
        replace:true,
    };
});