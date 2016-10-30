/**
 * Created by PC on 9/25/2016.
 */
angular.module('myApp')
    .controller('HomeController', function ($scope, $state,$stateParams, $filter) {

        $scope.login = function () {
            if($scope.email == 'manhhungg@gmail.com' && $scope.password == 'manhhung123')
                $state.go('profile_user', {id : 1921126474});
            else if ( $scope.email == 'company@gmail.com' && $scope.password == 'manhhung123') {
                $state.go('profile_company');
            }
        }
    });