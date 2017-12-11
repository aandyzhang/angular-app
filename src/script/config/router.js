'use strict';
    angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $stateProvider.state('main',{   //配置路由
            url:'/main',
            templateUrl:'view/main.html',
            controller:'mainCtr'
        }).state('position',{
            url:'/position/:id',
            templateUrl:"view/position.html",
            controller:"positionCtrl"
        }).state('corp',{
            url:'/corp/:id',
            templateUrl:"view/corp.html",
            controller:"corpCtrl"
        }).state('search',{
            url:'/search',
            templateUrl:"view/search.html",
            controller:'searchCtrl'
        }).state('me',{
            url:'/me',
            templateUrl:"view/me.html",
            controller:"meCtrl"
        }).state('login',{
            url:'/login',
            templateUrl:'view/login.html',
            controller:'loginCtrl'
        });
    $urlRouterProvider.otherwise('main'); //如果前边的都匹配不到，则转发大main页面
}])