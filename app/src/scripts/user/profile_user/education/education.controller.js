/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('EducationController', function ($scope, $stateParams, $filter, EducationService,$window, $cookieStore, $rootScope) {

        $scope.data = $cookieStore.get('DataLogin');
        $scope.status = {
            toggle: false
        };
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

            $scope.objPlusSkills = {'index':''}
            $scope.objPlusSkills.index = i;
            $scope.plusSkills.push($scope.objPlusSkills);
            i++;

        };

        $scope.deleteIndex = function (id) {


            delete $scope.plusSkills[id-1]

        };

        $scope.chooseAcceppSkill = function () {

            $scope.isBool = true;
            for(var i =0; i< $scope.skillReqs.length ; i ++){
                if($scope.chooeSkillReq[i].bool == true){
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


                $scope.skillReqs = $scope.user.skills;
                for (var i = 0; i < $scope.skillReqs.length; i++) {
                    $scope.temp = {'id': '', 'name': '', 'bool': ''};
                    $scope.temp1.push($scope.temp);
                    $scope.temp1[i].id = $scope.skillReqs[i].id;
                    $scope.temp1[i].name = $scope.skillReqs[i].name;
                    $scope.temp1[i].bool = false;
                }

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


                        $scope.createProject = function () {
                            $scope.editProject.personalId = $scope.user.id
                            $scope.editProject.created_at = new Date();
                            $scope.editProject.updated_at = new Date();
                            EducationService.createProject($scope.editProject, $scope.data.access_token)
                                .then(function () {
                                    $window.location.reload();
                                })
                                .catch(function () {
                                    alert("Connect internet failed !");
                                })

                        };
                        // $scope.createSkill = function (id) {
                        //     $scope.objAddSkill.personalId = $scope.user.id
                        //     $scope.objAddSkill.projectId = id;
                        //     $scope.objAddSkill.created_at = new Date();
                        //     $scope.objAddSkill.updated_at = new Date();
                        //     EducationService.createSkill($scope.objAddSkill, $scope.data.access_token)
                        //         .then(function () {
                        //             alert("Create success !");
                        //             $window.location.reload();
                        //         })
                        //         .catch(function () {
                        //             alert("Connect internet failed !");
                        //         })
                        //
                        // };

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
                                            for(var i=0;i< $scope.newPro.length;i++){
                                                if($scope.newPro[i].personalId == $scope.user.id){
                                                    $scope.arrProject.push($scope.arrProject[i]);
                                                }
                                            }
                                            $scope.projects = $scope.arrProject;

                                        })
                                        .catch(function () {
                                            alert("Connect internet failed !");
                                        });
                                    $scope.status.toggle = !$scope.status.toggle;
                                    $scope.editProject = {};
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
                                            for(var i=0;i< $scope.newPro.length;i++){
                                                if($scope.newPro[i].personalId == $scope.user.id){
                                                    $scope.arrProject.push($scope.arrProject[i]);
                                                }
                                            }
                                            $scope.projects = $scope.arrProject;

                                        })
                                        .catch(function () {
                                            $scope.status.toggle = !$scope.status.toggle;
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

                            $scope.removeSkillReq = function (idSkill) {
                                console.log('rgredg');
                                console.log(idSkill);
                                console.log(id);
                                EducationService.deleteSkillRe(idSkill,$scope.data.access_token)
                                    .then(function () {
                                        EducationService.fetchAllSkill()
                                            .then(function (res) {
                                                $scope.Skill2 = res.data;
                                                for(var i =0;i<$scope.Skill2.length;i++ ) {
                                                    if($scope.Skill2[i].projectId ==id){
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
                            $scope.updateSkillRe = function (idSkill) {
                                $scope.objAddSkill.created_at = new Date();
                                $scope.objAddSkill.updated_at = new Date();
                                EducationService.updateSkill($scope.objAddSkill,idSkill, $scope.data.access_token)
                                    .then(function () {
                                        EducationService.fetchAllSkill()
                                            .then(function (res) {
                                                $scope.Skill2 = res.data;
                                                for(var i =0;i<$scope.Skill2.length;i++ ) {
                                                    if($scope.Skill2[i].projectId ==id){
                                                        $scope.tempSkill.push($scope.Skill2[i]);
                                                    }
                                                }
                                                $scope.DelSkill = $scope.tempSkill;
                                                $scope.statusEditSkill.toggle = !$scope.statusEditSkill.toggle;
                                            })
                                            .catch(function () {
                                                alert("Delete failed !");
                                            });
                                    })
                                    .catch(function () {
                                        alert("Create failed !");
                                    })

                            };
                        }

                    });


            })
            .catch(function () {
                $scope.infos = [];
            })
    });