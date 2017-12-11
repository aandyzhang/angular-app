'use strict';
angular.module('app').directive('company',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/company.html",
        replace:true,
        scope:{
            com:'='
        }
    }
});