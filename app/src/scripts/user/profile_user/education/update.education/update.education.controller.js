/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('UpdateEducationController', function ($state,$scope, UpdateEducationService, $stateParams, $filter, $cookieStore,
                                                       $rootScope) {
        $rootScope.doTheBack = function () {
            window.history.back();
        };
        $scope.data = $cookieStore.get('DataLogin');
        $scope.updateEduca = {};
        UpdateEducationService.fetchEducation()
            .then(function (res) {
                $scope.user = $filter('filter')(res.data, {username: $stateParams.username})[0];
                $scope.education = $scope.user.educations[0];

                if ($scope.education.name_of_school == undefined ||
                    $scope.education.address_of_school == undefined ||
                    $scope.education.describe == undefined || $scope.education.major == undefined ||
                    $scope.education.achiviement == undefined) {
                    alert("Please enter education.. !");
                }

                $scope.createEdu = function () {
                    $scope.updateEduca.personalId = $scope.user.id;
                    $scope.updateEduca.created_at = new Date();
                    $scope.updateEduca.updated_at = new Date();
                    UpdateEducationService.createEducation($scope.updateEduca, $scope.data.access_token)
                        .then(function () {
                            $scope.updateEduca = {};
                            $state.go('education', {"username": $scope.user.username});
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                };
                // $scope.updateEdu = function () {
                //     $scope.updateEduca.personalId = $scope.user.id;
                //     $scope.updateEduca.created_at = new Date();
                //     $scope.updateEduca.updated_at = new Date();
                //     UpdateEducationService.updateEducation($scope.updateEduca, $scope.education.id, $scope.data.access_token)
                //         .then(function () {
                //             $scope.updateEduca = {};
                //             $state.go('education', {"username": $scope.user.username});
                //         })
                //         .catch(function () {
                //             alert("Update failed !");
                //         });
                // };
            })
            .catch(function () {
            });


    });