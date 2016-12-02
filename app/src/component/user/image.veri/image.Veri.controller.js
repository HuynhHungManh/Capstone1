/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('ImageVeriController', function ($scope, ConfirmService,
                                               $rootScope, $stateParams, $filter,localStorageService, $state,Profile_userService) {

        Profile_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];
                if($scope.user.verifications === null ||
                    $scope.user.verifications === [] || $scope.user.verifications === undefined || $scope.user.verifications.length === 0)
                    $scope.isVeri = false;
                else
                    $scope.isVeri = true;
            })
            .catch(function () {

            });

    });
