/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('ConfirmController', function ($scope, ConfirmService,
                                                    $rootScope, $stateParams, $filter,localStorageService, $state ) {

        $scope.userTempSc = localStorageService.get('userTemp');
        $scope.changetap = function (tab) {
            console.log(tab);
            if (tab == 1)
                $state.go('profile_user', {"username": $scope.userTempSc});
            else if (tab == 2)
                $state.go('education', {"username": $scope.userTempSc});
            else if (tab == 3)
                $state.go('project', {"username": $scope.userTempSc});
            else if (tab == 4)
                $state.go('update_job', {"username": $scope.userTempSc});
            else
                $state.go('confirm', {"username": $scope.userTempSc});
        };

        ConfirmService.fetchAllUser()
            .then(function (response) {
                $scope.user = $filter('filter')(response.data, {username: $stateParams.username})[0];
            })
            .catch(function () {
            });
    });
