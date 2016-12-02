/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('ConfirmController', function ($scope, ConfirmService,
                                                    $rootScope, $stateParams, $filter,localStorageService, $state ) {
        $scope.data = localStorageService.get('DataLogin');
        $scope.Veri ={};
        $scope.Veri.sender_id = $scope.data.id;

        $scope.userTempSc = localStorageService.get('userTemp');


        $scope.changetap = function (tab) {
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
                $scope.checkShowBtn = function () {
                    if(localStorageService.get('user') == $scope.user.username)
                        return true;
                    else
                        return false;
                };
                if($scope.user.verifications === null ||
                    $scope.user.verifications === [] || $scope.user.verifications === undefined || $scope.user.verifications.length === 0)
                    $scope.isVeri = false;
                else
                    $scope.isVeri = true;
            })
            .catch(function () {
            });
        ConfirmService.fetchAllTeacher($scope.data.access_token)
            .then(function (response) {
                $scope.teachers = response.data;
                console.log($scope.teachers);
            })
            .catch(function () {
            });

        $scope.send = function () {
            console.log($scope.Veri);
            ConfirmService.createVeri($scope.Veri,$scope.data.access_token)
                .then(function () {
                    console.log('thanh cong');
                })
                .catch(function () {
                    console.log('that bai');
                });
        };
    });
