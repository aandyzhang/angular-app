'use strict';

angular.module('app',['ui.router','ngCookies']);
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
'use strict';

angular.module('app')
    .controller('corpCtrl',function($scope,$http,$state){
        $http.get('data/company.json?id='+$state.params.id).success(function(resp){
            $scope.company=resp;
        });
    })
'use strict';

angular.module('app')
    .controller('loginCtrl',function($scope,$http){
        $scope.username="";
        $scope.password="";
        $scope.back=function(){
            window.history.back();
        };
        $scope.check=function(){
            if( $scope.username == ''){
                $scope.username="请输入用户名";
            }
            if($scope.password=""){
                $scope.password="请输入密码";
            }
        };
    })
'use strict';

angular.module('app')
    .controller('mainCtr',function($scope,$http){
        $scope.current="main";
        $http.get('/data/positionList.json').success(function(success){
            $scope.list=success;
        });
    })
'use strict';

angular.module('app')
    .controller('meCtrl',function($scope,$http){
        $scope.current="me";
    })
'use strict';

angular.module('app')
    .controller('positionCtrl',function($q,$scope,$state,$http){
        $http.get('/data/position.json?id='+$state.params.id).success(function(resp){
                $scope.position=resp;
                console.log(resp);
                console.log($state.params.id);
            $http.get('/data/company.json?id='+resp.companyId).success(function(res){
                $scope.company=res;
                console.log(res);
            })
        })
        // function getPosition() {
        //     var def = $q.defer();
        //     $http.get('data/position.json?id='+$state.params.id).success(function(resp) {
        //          $scope.position = resp;
        //          def.resolve(resp);
        //     })
        //     return def.promise;
        //   }
        //   function getCompany(id) {
             
        //     $http.get('data/company.json?id='+id).success(function(resp){

        //       $scope.company = resp;
        //       console.log(id);
        //     })
        //   }
        //   getPosition().then(function(obj){
        //       console.log(obj);
        //     getCompany(obj.companyId);
        //   });
    });
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
'use strict';
angular.module('app').directive('classify',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/classify.html",
        replace:true,
        scope:{
            com:'='
        },
        link:function($scope){
                $scope.checkList=function(id){
                    $scope.positionList=$scope.com.positionClass[id].positionList;
                    $scope.isActive=id;
                };
                $scope.$watch('com',function(newVal,oldVal,scope){
                   if(newVal){
                    $scope.checkList(0);
                   }
                });
            } 
    }
});
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
'use strict';
angular.module('app').directive('appFooter',function(){
    return{
        restrict:"A",
        replace:true,
        scope:{
            current:"=",
        },
        templateUrl:"view/template/footer.html",
    }
});
'use strict';

angular.module('app').directive('appHead',function(){
    return{
        restrict:"AE",
        replace:true,
        templateUrl:'view/template/head.html'
    };
});
'use strict';

angular.module('app').directive('pContent',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/pContent.html",
        replace:true,
    };
});
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
'use strict';

angular.module('app').directive('positionDetail',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/positionDetail.html",
        replace:true,
    };
});
'use strict';

angular.module('app').directive('searchHead',function(){
    return {
        restrict:"A",
        templateUrl:"view/template/searchHead.html",
        replace:true,
    };
});
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
'use strict';
angular.module('app').service('cache',function($cookies){
    this.put=function(key,value){
        $cookies.put(key,value);
    }
    this.get=function(key){
        return $cookies.get(key);
    }
    this.remove=function(key){
        $cookies.remove(key);
    }
});