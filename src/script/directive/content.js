'use strict';
angular.module('app').directive('appContent',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/content.html",
        replace:true,
        scope:{
            data:"="
        }
    }
});