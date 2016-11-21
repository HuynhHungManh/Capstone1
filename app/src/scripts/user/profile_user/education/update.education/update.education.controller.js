/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('UpdateEducationController', function ($scope, UpdateEducationService, $stateParams, $filter, $cookieStore,
                                                       $rootScope) {
        $rootScope.doTheBack = function () {
            window.history.back();
        };
        $scope.data = $cookieStore.get('DataLogin');
        $scope.updateEdu = {};
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

                $scope.editEdu = function () {
                    $scope.updateEdu.personalId = $scope.user.id;
                    $scope.updateEdu.created_at = new Date();
                    $scope.updateEdu.updated_at = new Date();
                    if ($scope.education == undefined) {
                        UpdateEducationService.createEducation($scope.updateEdu, $scope.data.access_token)
                            .then(function () {
                                $scope.updateEdu = {};
                                $window.location.reload();
                            })
                            .catch(function () {
                                alert("Create failed !");
                            });
                    }
                    else {
                        UpdateEducationService.updateEducation($scope.updateEdu, $scope.education.id, $scope.data.access_token)
                            .then(function () {
                                $scope.updateEdu = {};
                                $window.location.reload();
                            })
                            .catch(function () {
                                alert("Update failed !");
                            });
                    }
                }
            })
            .catch(function () {
            })


    });