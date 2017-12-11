'use strict';

angular.module('app')
    .controller('searchCtrl',function($scope,$http){
        $scope.current="search";   //导航当前的值
        $scope.select="city";      //搜索选项中默认选择城市这一项
        $scope.word='';   //为关键字
        $scope.words={};   //返回后的职位信息
        $scope.citys={};   //所有的城市
        $scope.salary={};  //所有的工资选项
        $scope.scale={};   //公司规模数据
        $scope.sliders={};
        $scope.switch={    
            menu:false,
            list:false,
            city:'城市'
        };
        $scope.selectNum=function(index){
            $scope.switch.menu=true;
            $scope.select=index;
            // $scope.sliders=$scope.switch.slider[0][index];
            $http.get('/data/'+index+'.json').success(function(resp){
                 $scope.sliders=resp;
             });
        };
        // $http.get('/data/city.json').success(function(resp){
        //     $scope.cities=resp;
        // });
        // $http.get('/data/salary.json').success(function(resp){
        //     $scope.salary=resp;
        // });
        // $http.get('/data/scale.json').success(function(resp){
        //     $scope.scale=resp;
        // });
        $scope.search=function(){
            $http.get('/data/positionList.json?id='+$scope.word).success(function(success){
                $scope.list=success;
                $scope.switch.list=false;
            });
        };
        $scope.search();
        //选择搜索关键子
        $scope.choose=function(value){
            $scope.word=value;   
            $scope.switch.list=false;
        }
        $scope.$watch('word',function(){
            if($scope.word==''){
                $scope.switch.list=false;
            }
          $http.jsonp('https://suggest.lagou.com/suggestion/mix?suggestback=jQuery111308069170940620887_1512956169277&input='+$scope.word+'&num=5&callback=JSON_CALLBACK').success(function(resp){
                 $scope.works=resp.POSITION;
                 if($scope.works.length == 0){
                    $scope.switch.list=false;
                 }else{
                    $scope.switch.list=true;
                 }
             });
        });
    });