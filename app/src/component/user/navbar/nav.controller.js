/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('NavController', function ($scope, ConfirmService,
                                           AlertBox,   $rootScope, $stateParams, Profile_userService,$filter,localStorageService, $state ) {



        $scope.nav = function () {
            if(localStorageService.get('user') == null)
                return false;
            else
                return true;
        };


        if(localStorageService.get('user') == null){
            $scope.isNav = false;
        }
        else{
            $scope.isNav = true;
        }
        $scope.data = localStorageService.get("DataLogin");




        $scope.logout = function () {
            Profile_userService.logout($scope.data.access_token)
                .then(function () {
                })
                .catch(function () {
                });
            $scope.isNav = false;
            localStorageService.remove('isToggleLogout');
            localStorageService.remove('DataLogin');
            localStorageService.remove('user');
            localStorageService.remove('email');
            localStorageService.remove('userTemp');
            $rootScope.isToggleLogout = false;

            $state.go('home');
        };




    });
