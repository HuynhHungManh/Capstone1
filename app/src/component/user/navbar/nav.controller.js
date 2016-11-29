/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('NavController', function ($scope, ConfirmService,
                                               $rootScope, $stateParams, Profile_userService,$filter,localStorageService, $state ) {



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
        $scope.data = localStorageService.get("DataLogin", $scope.dataLogin);

        $scope.logout = function () {
            $scope.isNav = false;
            alert("Do you want to out website ?");
            localStorageService.remove('isToggleLogout');
            localStorageService.remove('DataLogin');
            localStorageService.remove('user');
            localStorageService.remove('email');
            localStorageService.remove('userTemp');
            $rootScope.isToggleLogout = false;

            Profile_userService.logout($scope.data.access_token)
                .then(function () {
                })
                .catch(function () {
                });
            $state.go('home');
        };




    });
