/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .controller('EducationFix_Controller', function ($scope, EducationFixService, $stateParams, $filter,
                                                     $state, localStorageService,
                                                     $cookieStore, $window, $rootScope) {
        $scope.data = localStorageService.get('DataLogin');
        $scope.isEducation = false;
        $scope.editEducation = {};

        $scope.userTempSc = localStorageService.get('userTemp');
        $rootScope.checkNullArr = function (data) {
            if (data !== undefined && data.length === 0 )
                return true;
            else
                false;
        };


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

        $scope.changeformEdu = function () {
            $scope.isEducation = !$scope.isEducation;
        };


        EducationFixService.fetchAllEducation()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];
                $scope.educations = $scope.user.educations;
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

                $scope.isNullEdu = $scope.checkNullArr($scope.educations)


                $scope.editformEdu = function (id) {
                    $scope.editEdu = $filter('filter')($scope.educations, {id: id})[0];
                    $scope.isEducation = !$scope.isEducation;
                };
                $scope.updateEducation = function (id) {
                    $scope.editEducation.personalId = $scope.user.id;
                    EducationFixService.updateEducation($scope.editEducation, id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrEdaucations = [];
                            EducationFixService.fetchEducation()
                                .then(function (res) {
                                    $scope.newEdu = res.data;
                                    for (var i = 0; i < $scope.newEdu.length; i++) {
                                        if ($scope.newEdu[i].personalId == $scope.user.id) {
                                            $scope.arrEdaucations.push($scope.newEdu[i]);
                                        }
                                    }
                                    $scope.educations = $scope.arrEdaucations ;
                                    $scope.isEducation = !$scope.isEducation;
                                })
                                .catch(function () {
                                    alert("Connect Internet failed !");
                                });
                            $scope.editEducation = {};
                        })
                        .catch(function () {
                            alert("Connect Internet failed !");
                            $scope.editEducation = {};
                        });
                }
                $scope.deleteEducation = function (id) {
                    $scope.editEducation.personalId = $scope.user.id;
                    EducationFixService.deleteEducation(id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrEdaucations = [];
                            EducationFixService.fetchEducation()
                                .then(function (res) {
                                    $scope.newEdu = res.data;
                                    for (var i = 0; i < $scope.newEdu.length; i++) {
                                        if ($scope.newEdu[i].personalId == $scope.user.id) {
                                            $scope.arrEdaucations.push($scope.newEdu[i]);
                                        }
                                    }
                                    $scope.educations = $scope.arrEdaucations ;
                                    $scope.isEducation = !$scope.isEducation;
                                })
                                .catch(function () {
                                    alert("Connect Internet failed !");
                                });
                            $scope.editEducation = {};
                        })
                        .catch(function () {
                            alert("Connect Internet failed !");
                            $scope.editEducation = {};
                        });
                };
            })
            .catch(function () {

            })
    });
