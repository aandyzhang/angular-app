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