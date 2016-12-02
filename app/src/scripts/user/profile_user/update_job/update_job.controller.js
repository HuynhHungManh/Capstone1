/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('Update_jobController', function ($scope, Update_jobService,$stateParams,
                                                  $filter,$rootScope, $state,localStorageService, setCredentials, $cookieStore ,$window) {
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

        Update_jobService.fetchAllUser()
            .then(function (res) {
                $scope.user = $filter('filter')(res.data, {username: $stateParams.username})[0];
                $scope.jobs = $scope.user.jobs;

                console.log($scope.user.verifications);


                if($scope.user.verifications === null ||
                    $scope.user.verifications === [] || $scope.user.verifications === undefined || $scope.user.verifications.length === 0)
                    $scope.isVeri = false;
                else
                    $scope.isVeri = true;

                $scope.checkShowBtn = function () {
                    if(localStorageService.get('user') == $scope.user.username)
                        return true;
                    else
                        return false;
                };

                $scope.idNullJob = $rootScope.checkNullArr($scope.jobs);

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


