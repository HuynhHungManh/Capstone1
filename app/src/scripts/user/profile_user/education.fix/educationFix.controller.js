/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .controller('EducationFix_Controller', function ($scope, EducationFixService, $stateParams, $filter,
                                                    $state, $cookies,
                                                    $cookieStore, $window, $rootScope) {
        $rootScope.isToggleLogout = $cookieStore.get('isToggleLogout');
        $scope.data = $cookieStore.get('DataLogin');
        $scope.isEducation = false;
        $scope.editEducation = {};

        $scope.changeformEdu = function () {
            $scope.isEducation = !$scope.isEducation;
        };



        EducationFixService.fetchAllEducation()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];
                $scope.educations = $scope.user.educations;

                console.log($scope.educations.length);

                if ($scope.educations.length == 0) {
                    alert("Please enter education.. !");
                }

                $scope.editformEdu = function (id) {
                    $scope.editEdu = $filter('filter')($scope.educations, {id: id})[0];
                    $scope.isEducation = !$scope.isEducation;
                };
                $scope.updateEducation = function (id) {
                    $scope.editEducation.personalId = $scope.user.id;
                    EducationFixService.updateEducation($scope.editEducation,id,$scope.data.access_token)
                        .then(function () {
                            alert("Update success !");
                            $scope.editEducation = {};
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Update falied !");
                            $scope.editEducation = {};
                        });
                }
                $scope.deleteEducation = function (id) {
                    $scope.editEducation.personalId = $scope.user.id;
                    EducationFixService.deleteEducation(id,$scope.data.access_token)
                        .then(function () {
                            $scope.editEducation = {};
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Delete failed !");
                            $scope.editEducation = {};
                        });
                };
            })
            .catch(function () {

            })
    });
