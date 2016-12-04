/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('Update_jobController', function ($scope, Update_jobService, $stateParams,
                                                  $filter, $rootScope, $state, localStorageService, setCredentials, $cookieStore, $window) {
        $scope.status = {
            toggle: false
        };
        $scope.userTempSc = localStorageService.get('userTemp');
        $scope.data = localStorageService.get('DataLogin');
        $scope.editProject = {};
        $scope.close = function () {
            $scope.status.toggle = !$scope.status.toggle;
        };
        $rootScope.doTheBack = function () {
            window.history.back();
        };
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

        $rootScope.checkNullArr = function (data) {
            if (data !== undefined && data.length === 0)
                return true;
            else
                false;
        };

        function checkUpdate(a, b, c, d, e, f, g, h, m) {
            if (a === '' || a === null || a === undefined) {
                alert('You did not enter name of company!');
                return false;
            }
            else if (b === '' || b === null || b === undefined) {
                alert('You did not enter address of company!');
                return false;
            }
            else if (e === '' || e === null || e === undefined) {
                alert('You did not enter phone of_company!');
                return false;
            }
            else if (f === '' || f === null || f === undefined) {
                alert('You did not enter website of company!');
                return false;
            }
            else if (h === '' || h === null || h === undefined) {
                alert('You did not enter position!');
                return false;
            }
            else if (g === '' || g === null || g === undefined) {
                alert('You did not enter type work!');
                return false;
            }
            else if (c === '' || c === null || c === undefined) {
                alert('You did not enter from date!');
                return false;
            }
            else if (d === '' || d === null || d === undefined) {
                alert('You did not enter to date!');
                return false;
            }
            else if (m === '' || m === null || m === undefined) {
                alert('You did not enter describe!');
                return false;
            }
            else
                return true;
        }


        Update_jobService.fetchAllUser()
            .then(function (res) {
                $scope.user = $filter('filter')(res.data, {username: $stateParams.username})[0];
                $scope.jobs = $scope.user.jobs;

                if ($scope.user.verifications === null ||
                    $scope.user.verifications === [] || $scope.user.verifications === undefined || $scope.user.verifications.length === 0)
                    $scope.isVeri = false;
                else
                    $scope.isVeri = true;

                $scope.checkShowBtn = function () {
                    if (localStorageService.get('user') == $scope.user.username)
                        return true;
                    else
                        return false;
                };

                $scope.idNullJob = $rootScope.checkNullArr($scope.jobs);

                $scope.edit = function (id) {
                    $scope.status.toggle = !$scope.status.toggle;
                    $scope.editer = $filter('filter')($scope.jobs, {id: id})[0];
                };


                $scope.createProject = function () {
                    if (checkUpdate($scope.editProject.name_of_company, $scope.editProject.address_of_company, $scope.editProject.phone_of_company,
                            $scope.editProject.website_of_company, $scope.editProject.position, $scope.editProject.type_work, $scope.editProject.from_date,
                            $scope.editProject.to_date, $scope.editProject.describe) === true) {
                        $scope.editProject.personalId = $scope.user.id;
                        Update_jobService.createProject($scope.editProject, $scope.data.access_token)
                            .then(function () {
                                $scope.editProject = {};
                                $state.go('update_job', {"username": $scope.userTempSc});
                            })
                            .catch(function () {
                                alert("Create failed !");
                            });
                    }
                };
                $scope.updateProject = function (id) {
                    $scope.editProject.personalId = $scope.user.id;
                    Update_jobService.updateProject($scope.editProject, id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrJobs = [];
                            Update_jobService.fetchJobs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.newJob = res.data;
                                    for (var i = 0; i < $scope.newJob.length; i++) {
                                        if ($scope.newJob[i].personalId == $scope.user.id) {
                                            $scope.arrJobs.push($scope.newJob[i]);
                                        }
                                    }
                                    $scope.jobs = $scope.arrJobs;
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });
                            $scope.editProject = {};
                            $scope.status.toggle = !$scope.status.toggle;
                        })
                        .catch(function () {
                            alert("Connect internet failed !");
                        });
                }
                $scope.deleteProject = function (id) {
                    $scope.editProject.personalId = $scope.user.id;
                    Update_jobService.deleteProject(id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrJobs = [];
                            Update_jobService.fetchJobs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.newJob = res.data;
                                    for (var i = 0; i < $scope.newJob.length; i++) {
                                        if ($scope.newJob[i].personalId == $scope.user.id) {
                                            $scope.arrJobs.push($scope.newJob[i]);
                                        }
                                    }
                                    $scope.jobs = $scope.arrJobs;
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });
                            $scope.editProject = {};
                            $scope.status.toggle = !$scope.status.toggle;
                        })
                        .catch(function () {
                            alert("Connect internet failed !");
                        });
                };
            })
            .catch(function () {
            });


    });


