'use strict';

angular.module('app').directive('positionDetail',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/positionDetail.html",
        replace:true,
    };
});