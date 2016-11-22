/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('ConfirmController', function ($scope, ConfirmService,
                                                    $rootScope, $stateParams, $filter, $cookieStore, $window) {

        ConfirmService.fetchAllUser()
            .then(function (response) {
                $scope.user = $filter('filter')(response.data, {username: $stateParams.username})[0];
            })
            .catch(function () {
            });
    });
