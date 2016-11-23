/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('Update_jobController', function ($scope, Update_jobService,$stateParams,
                                                  $filter,$rootScope, $state, $cookies, setCredentials, $cookieStore ,$window) {
        $scope.status = {
            toggle: false
        };
        $scope.data = $cookieStore.get('DataLogin');
        $scope.editProject = {};
        $scope.close = function () {
            $scope.status.toggle = !$scope.status.toggle;

        };
        $rootScope.doTheBack = function () {
            window.history.back();
        };

        Update_jobService.fetchAllUser()
            .then(function (res) {
                $scope.user = $filter('filter')(res.data, {username: $stateParams.username})[0];
                $scope.jobs = $scope.user.jobs;

                $scope.edit = function (id) {
                    $scope.status.toggle = !$scope.status.toggle;
                    $scope.editer = $filter('filter')($scope.jobs, {id: id})[0];
                }



                $scope.createProject = function () {
                    $scope.editProject.personalId = $scope.user.id;
                    Update_jobService.createProject($scope.editProject,$scope.data.access_token)
                        .then(function () {
                            $scope.editProject = {};
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                }
                $scope.updateProject = function (id) {
                    $scope.editProject.personalId = $scope.user.id;
                    Update_jobService.updateProject($scope.editProject,id,$scope.data.access_token)
                        .then(function () {
                            $scope.arrJobs = [];
                            Update_jobService.fetchJobs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.newJob = res.data;
                                    for(var i = 0 ; i < $scope.newJob.length;i++){
                                        if($scope.newJob[i].personalId == $scope.user.id){
                                            $scope.arrJobs.push($scope.newJob[i]);
                                        }
                                    }
                                    $scope.jobs = $scope.arrJobs;
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });
                            $scope.editProject = {};
                            $scope.status.toggle = ! $scope.status.toggle;
                        })
                        .catch(function () {
                            alert("Connect internet failed !");
                        });
                }
                $scope.deleteProject = function (id) {
                    $scope.editProject.personalId = $scope.user.id;
                    Update_jobService.deleteProject(id,$scope.data.access_token)
                        .then(function () {
                            $scope.arrJobs = [];
                            Update_jobService.fetchJobs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.newJob = res.data;
                                    for(var i = 0 ; i < $scope.newJob.length;i++){
                                        if($scope.newJob[i].personalId == $scope.user.id){
                                            $scope.arrJobs.push($scope.newJob[i]);
                                        }
                                    }
                                    $scope.jobs = $scope.arrJobs;
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });
                            $scope.editProject = {};
                            $scope.status.toggle = ! $scope.status.toggle;
                        })
                        .catch(function () {
                            alert("Connect internet failed !");
                        });
                };
            })
            .catch(function () {
            });


    });


