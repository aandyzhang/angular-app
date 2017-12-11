'use strict';

angular.module('app').directive('pHead',function(){
    return{
        restrict:"AE",
        replace:true,
        templateUrl:'view/template/pHead.html',
        //传入值 ，，  =为传入字符串   
        scope:{
            text:'='
        },
        //点击指令中的元素跳转
        link:function($scope,element,attr){
            $scope.back=function(){
                window.history.back();
            }
        }
    };
})