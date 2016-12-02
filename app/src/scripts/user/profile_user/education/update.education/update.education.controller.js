/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('UpdateEducationController', function ($state, $scope, localStorageService, UpdateEducationService, $stateParams, $filter, $cookieStore,
                                                       $rootScope) {
        $rootScope.doTheBack = function () {
            window.history.back();
        };
        $scope.data = localStorageService.get('DataLogin');
        $scope.updateEduca = {};


        function checkUpdate(a, b, c, e, g, h, f) {
            if (a === '' || a === null || a === undefined) {
                alert('You did not enter name education');
                return false;
            }
            else if (b === '' || b === null || b === undefined) {
                alert('You did not enter address');
                return false;
            }
            else if (c === '' || c === null || c === undefined) {
                alert('You did not enter phone');
                return false;
            }
            else if (e === '' || e === null || e === undefined) {
                alert('You did not enter major');
                return false;
            }
            else if (g === '' || g === null || g === undefined) {
                alert('You did not enter from date');
                return false;
            }
            else if (h === '' || h === null || h === undefined) {
                alert('You did not enter to date');
                return false;
            }
            else if (f === '' || f === null || f === undefined) {
                alert('You did not enter describe');
                return false;
            }
            else
                return true;
        }

        UpdateEducationService.fetchEducation()
            .then(function (res) {
                $scope.user = $filter('filter')(res.data, {username: $stateParams.username})[0];
                $scope.education = $scope.user.educations[0];


                $scope.createEdu = function () {
                    if (checkUpdate($scope.updateEduca.name_of_school, $scope.updateEduca.address_of_school,
                            $scope.updateEduca.phone_of_school, $scope.updateEduca.major,
                            $scope.updateEduca.from_date, $scope.updateEduca.to_date, $scope.updateEduca.describe) === true) {
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
                    }
                };

            })
            .catch(function () {
            });


    });