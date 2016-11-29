/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('EducationController', function ($scope, $stateParams, $filter, EducationService,
                                                 $state, $window, $rootScope, localStorageService) {

        $scope.data = localStorageService.get('DataLogin');
        $scope.status = {
            toggle: false
        };

        $scope.isEditSkill = false




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
        $scope.userTempSc = localStorageService.get('userTemp');
        $scope.isAddSkill = false;
        $scope.changaddskill = function () {
            $scope.isAddSkill = !$scope.isAddSkill;
        };
        $scope.isEduPro = false;
        $scope.changeformEduPro = function () {
            $scope.isEduPro = !$scope.isEduPro;
        };
        $scope.arrSkill = [];
        $scope.objAddSkill = {};

        $scope.trueFalse = false;


        $scope.statusSkillReq = false;
        $scope.temp1 = [];
        $scope.chooeSkillReq = [];
        $scope.tempChoosed = [];
        $scope.choosed = [];
        $scope.SkillRe = {};
        $scope.plusSkills = [];
        $scope.find = function (id) {
            $scope.lengtSkillRe = $scope.skillReqs.length;
            for (var j = 0; j < $scope.skillReqs.length; j++) {
                if (id == $scope.temp1[j].id) {
                    $scope.temp1[j].bool = !$scope.temp1[j].bool;
                }
            }
            $scope.chooeSkillReq = $scope.temp1;
        };
        var i = 1;

        $scope.index = function () {

            $scope.objPlusSkills = {'index': ''}
            $scope.objPlusSkills.index = i;
            $scope.plusSkills.push($scope.objPlusSkills);
            i++;

        };

        $scope.deleteIndex = function (id) {


            delete $scope.plusSkills[id - 1]

        };

        $scope.chooseAcceppSkill = function () {

            $scope.isBool = true;
            for (var i = 0; i < $scope.skillReqs.length; i++) {
                if ($scope.chooeSkillReq[i].bool == true) {
                    $scope.isBool = false;

                }
            }
            if ($scope.isBool == true) {
                $scope.choosed = [];
                alert("You have to choose skills, please!");
            }
            else {
                for (var k = 0; k < $scope.skillReqs.length; k++) {
                    if ($scope.chooeSkillReq[k].bool == true) {
                        $scope.tempChoosed.push($scope.chooeSkillReq[k])
                    }
                }
                $scope.choosed = $scope.tempChoosed;
                $scope.tempChoosed = [];
            }
        }

        $scope.checkNullArr = function (data) {
            if (data !== undefined && data.length === 0 )
                return true;
            else
                false;
        };


        $scope.addSkillReq = function () {
            $scope.statusSkillReq = true
        };
        $scope.editProject = {};
        $rootScope.doTheBack = function () {
            window.history.back();
        };

        $scope.statusEditSkill = {
            toggle: false
        };
        $scope.changeColor = function (value) {
            return {"color": value};
        }

        $scope.changeformeditskill = function () {
            $scope.statusEditSkill.toggle = !$scope.statusEditSkill.toggle;
        };

        $scope.changeform = function () {
            $scope.status.toggle = !$scope.status.toggle;
        };


        EducationService.fetchAllEducation()
            .then(function (response) {
                $scope.infoEducations = response.data;
                $scope.user = $filter('filter')($scope.infoEducations, {username: $stateParams.username})[0];
                $scope.education = $scope.user.educations[0];

                $scope.checkShowBtn = function () {
                    if(localStorageService.get('user') == $scope.user.username)
                        return true;
                    else
                        return false;
                };



                $scope.skillReqs = $scope.user.skills;
                for (var i = 0; i < $scope.skillReqs.length; i++) {
                    $scope.temp = {'id': '', 'name': '', 'bool': ''};
                    $scope.temp1.push($scope.temp);
                    $scope.temp1[i].id = $scope.skillReqs[i].id;
                    $scope.temp1[i].name = $scope.skillReqs[i].name;
                    $scope.temp1[i].bool = false;
                }
                $scope.arrSkill1 = [];
                // $scope.demo = function () {
                //     $scope.arrSkill.push($scope.SkillRe.name);
                // };
                // $scope.deleReq = function (nameSkill) {
                //     for (var i = 0; i < $scope.arrSkill1.length; i++) {
                //         if (nameSkill == $scope.arrSkill1[i]) {
                //             $scope.arrSkill1.splice(i, 1);
                //         }
                //     }
                // };





                $scope.pro = [];
                $scope.ArrSkill = [];
                EducationService.fetchAllSkillOfProject()
                    .then(function (response) {
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i].personalId == $scope.user.id) {
                                $scope.pro.push(response.data[i])
                            }
                        }
                        $scope.projects = $scope.pro;
                        $scope.isNullPro = $scope.checkNullArr($scope.projects)

                        $scope.createProject = function () {
                            $scope.editProject.personalId = $scope.user.id;
                            $scope.editProject.created_at = new Date();
                            $scope.editProject.updated_at = new Date();
                            EducationService.createProject($scope.editProject, $scope.data.access_token)
                                .then(function (respone) {
                                    $scope.SkillRe.personalId = $scope.user.id;
                                    $scope.SkillRe.projectId = respone.data.id;
                                    $scope.SkillRe.level = 0;
                                    $scope.SkillRe.created_at = new Date();
                                    $scope.SkillRe.updated_at = new Date();
                                    EducationService.createSkillRe($scope.SkillRe, $scope.data.access_token)
                                        .then(function () {
                                        })
                                        .catch(function () {
                                        });
                                    $state.go('project', {"username": $scope.userTempSc});
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                })

                        };

                        $scope.updateProject = function (id) {
                            $scope.editProject.personalId = $scope.user.id;
                            $scope.editProject.created_at = new Date();
                            $scope.editProject.updated_at = new Date();
                            EducationService.updateProject($scope.editProject, id, $scope.data.access_token)
                                .then(function () {
                                    $scope.arrProject = [];
                                    EducationService.fetchAllProject($scope.data.access_token)
                                        .then(function (res) {
                                            $scope.newPro = res.data;
                                            for (var i = 0; i < $scope.newPro.length; i++) {
                                                if ($scope.newPro[i].personalId == $scope.user.id) {
                                                    $scope.arrProject.push($scope.newPro[i]);
                                                }
                                            }
                                            $scope.projects = $scope.arrProject;
                                        })
                                        .catch(function () {
                                        });
                                    $scope.editProject = {};
                                    $window.location.reload();
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });

                        };


                        $scope.deleteProject = function (id) {
                            $scope.editProject.personalId = $scope.user.id;
                            EducationService.deleteProject(id, $scope.data.access_token)
                                .then(function () {
                                    $scope.arrProject = [];
                                    EducationService.fetchAllProject($scope.data.access_token)
                                        .then(function (res) {
                                            $scope.newPro = res.data;
                                            for (var i = 0; i < $scope.newPro.length; i++) {
                                                if ($scope.newPro[i].personalId == $scope.user.id) {
                                                    $scope.arrProject.push($scope.newPro[i]);
                                                }
                                            }
                                            $scope.projects = $scope.arrProject;
                                            // $scope.status.toggle = !$scope.status.toggle;
                                            $window.location.reload();
                                        })
                                        .catch(function () {

                                            alert("Connect internet failed !");
                                        });
                                    $scope.editProject = {};
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                });
                        };

                        $scope.tempSkill = [];


                        $scope.edit = function (id) {
                            $scope.status.toggle = !$scope.status.toggle;
                            $scope.editer = $filter('filter')($scope.projects, {id: id})[0];
                            $scope.DelSkill = $scope.editer.skills;


                            $scope.editSkillRe = function (idSkill) {
                                for (var i = 0; i < $scope.DelSkill.length; i++) {
                                    if (idSkill == $scope.DelSkill[i].id)
                                        $scope.editSkillReq = $scope.DelSkill[i];
                                }

                                $scope.isEditSkill = !$scope.isEditSkill;
                            };


                            $scope.removeSkillReq = function (idSkill) {
                                $scope.DelSkill = [];
                                EducationService.deleteSkillRe(idSkill, $scope.data.access_token)
                                    .then(function () {
                                        EducationService.fetchAllSkill()
                                            .then(function (res) {
                                                $scope.Skill2 = res.data;
                                                for (var i = 0; i < $scope.Skill2.length; i++) {
                                                    if ($scope.Skill2[i].projectId == id) {
                                                        $scope.tempSkill.push($scope.Skill2[i]);
                                                    }
                                                }
                                                $scope.DelSkill = $scope.tempSkill;
                                            })
                                            .catch(function () {
                                                alert("Delete failed !");
                                            });

                                        $scope.user = $filter('filter')($scope.infoEducations, {username: $stateParams.username})[0];
                                        $scope.skillReqs = $scope.user.skills;
                                    })
                                    .catch(function () {
                                        alert("Delete failed !");
                                    })
                            };
                            $scope.createSkill = function () {
                                $scope.objAddSkill.created_at = new Date();
                                $scope.objAddSkill.updated_at = new Date();
                                $scope.objAddSkill.projectId = id;
                                $scope.objAddSkill.personalId = $scope.user.id;
                                EducationService.createSkill($scope.objAddSkill, $scope.data.access_token)
                                    .then(function () {
                                        EducationService.fetchAllSkill()
                                            .then(function (res) {
                                                $scope.Skill2 = res.data;
                                                for (var i = 0; i < $scope.Skill2.length; i++) {
                                                    if ($scope.Skill2[i].projectId == id) {
                                                        $scope.tempSkill.push($scope.Skill2[i]);
                                                    }
                                                }
                                                $scope.DelSkill = $scope.tempSkill;
                                                $scope.isAddSkill = !$scope.isAddSkill;

                                                // $scope.statusEditSkill.toggle = !$scope.statusEditSkill.toggle;
                                            })
                                            .catch(function () {

                                            });
                                    })
                                    .catch(function () {
                                        alert("Create failed !");
                                    })
                            };
                            $scope.updateSkillRe = function (idSkill) {
                                $scope.objAddSkill.created_at = new Date();
                                $scope.objAddSkill.updated_at = new Date();
                                $scope.objAddSkill.projectId = id;
                                $scope.objAddSkill.personalId = $scope.user.id;
                                EducationService.updateSkill($scope.objAddSkill, idSkill, $scope.data.access_token)
                                    .then(function () {
                                        EducationService.fetchAllSkill()
                                            .then(function (res) {
                                                $scope.Skill2 = res.data;
                                                for (var i = 0; i < $scope.Skill2.length; i++) {
                                                    if ($scope.Skill2[i].projectId == id) {
                                                        $scope.tempSkill.push($scope.Skill2[i]);
                                                    }
                                                }
                                                $scope.DelSkill = $scope.tempSkill;

                                                $scope.statusEditSkill.toggle = !$scope.statusEditSkill.toggle;
                                            })
                                            .catch(function () {

                                            });
                                    })
                                    .catch(function () {
                                        alert("Update failed !");
                                    })

                            };
                        }

                    });


            })
            .catch(function () {
                $scope.infos = [];
            })
    });