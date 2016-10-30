/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .controller('Profile_userController', function ($scope, Profile_userService,$stateParams,$filter) {
         Profile_userService.fetchAllUser()
             .then(function (response) {
                 $scope.users = response.data;
                 $scope.user = $filter('filter')($scope.users, {id : $stateParams.dtu_id})[0];

                 //console.log($filter('filter')($scope.users, {id: $stateParams.dtu_id})[0]);

                 console.log($scope.user.dtu_id);
                //console.log($filter('filter')($scope.users, {id: $stateParams.dtu_id})[0]);
             })
             .catch(function () {
                $scope.users =[];
             })




    });