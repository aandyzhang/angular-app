'use strict';

angular.module('app').directive('pFooter',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/pFooter.html",
        replace:true,
        scope:{
            name:"="
        }
    };
});