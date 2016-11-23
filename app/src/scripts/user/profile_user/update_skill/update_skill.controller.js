/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('Update_SkillController', function ($scope, Update_SkillService,
                                                    $rootScope ,$stateParams, $filter,$cookieStore,$window) {

        $scope.arrSkillNew = [];
        $scope.arrLangNew = [];


        $scope.data = $cookieStore.get('DataLogin');
        $scope.editSkill = {}
        $scope.editLang = {}
        $scope.change = function(){
            $scope.statusSkill.toggle = !$scope.statusSkill.toggle;
        } ;

        $scope.status = {
            toggle: false
        };
        $scope.statusSkill = {
            toggle: false
        };
        $rootScope.doTheBack = function() {
            window.history.back();
        };

        $scope.closeformskill = function () {
            $scope.statusSkill.toggle = !$scope.statusSkill.toggle;
        };

        Update_SkillService.fetchAllSkill()
            .then(function (response) {
                $scope.users = response.data;

                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];
                $scope.skills = $scope.user.skills;
                $scope.langs = $scope.user.languages;

                $scope.changeFormEditSkill = function (id) {
                    $scope.skill = $filter('filter')( $scope.skills, {id: id})[0];
                    $scope.statusSkill.toggle = !$scope.statusSkill.toggle;
                };
                $scope.changeform = function (id) {
                    $scope.lang = $filter('filter')($scope.langs, {id: id})[0];


                    $scope.status.toggle = !$scope.status.toggle;
                };
                $scope.closeform = function () {
                    $scope.status.toggle = !$scope.status.toggle;
                }

                $scope.createSkill = function () {
                    if ($scope.editSkill.level == 'Beginner')
                        $scope.editSkill.level = 20;
                    else if ($scope.editSkill.level == 'Elementary') {
                        $scope.editSkill.level = 40;

                    }
                    else if ($scope.editSkill.level == 'Intermediate') {
                        $scope.editSkill.level = 60;
                    }
                    else if ($scope.editSkill.level == 'Advanced') {
                        $scope.editSkill.level = 80;
                    }
                    else if($scope.editSkill.level == 'Proficient'){
                        $scope.editSkill.level = 100;
                    }
                    $scope.editSkill.personalId = $scope.user.id;
                    Update_SkillService.createSkill($scope.editSkill,$scope.data.access_token)
                        .then(function () {
                            $scope.editSkill = {}
                            alert("Create success !");
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                };
                $scope.updateSkill = function () {

                    if ($scope.editSkill.level == 'Beginner')
                        $scope.editSkill.level = 20;
                    else if ($scope.editSkill.level == 'Elementary') {
                        $scope.editSkill.level = 40;

                    }
                    else if ($scope.editSkill.level == 'Intermediate') {
                        $scope.editSkill.level = 60;
                    }
                    else if ($scope.editSkill.level == 'Advanced') {
                        $scope.editSkill.level = 80;
                    }
                    else if($scope.editSkill.level == 'Proficient'){
                        $scope.editSkill.level = 100;
                    }
                    Update_SkillService.updateSkill($scope.editSkill,$scope.skill.id,$scope.data.access_token)
                        .then(function () {

                            Update_SkillService.fetchSkill($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataSkills = res.data;
                                    $scope.arrSkillNew = [];
                                    for(var i = 0; i<$scope.dataSkills.length; i++){
                                        if($scope.dataSkills[i].personalId == $scope.user.id){
                                            $scope.arrSkillNew.push($scope.dataSkills[i]);
                                        }
                                    }
                                    $scope.user.skills = $scope.arrSkillNew;
                                    $scope.statusSkill.toggle = ! $scope.statusSkill.toggle;
                                    $scope.editSkill = {}
                                })
                                .catch(function () {

                                });
                        })
                        .catch(function () {
                            alert("Update failed !");
                        });
                };




                $scope.deleteSkill = function (id) {

                    $scope.editLang.personalId = $scope.user.id;

                    Update_SkillService.deleteSkill(id,$scope.data.access_token)
                        .then(function () {
                            Update_SkillService.fetchSkill($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataSkills = res.data;
                                    $scope.arrSkillNew = [];
                                    for( var i = 0; i<$scope.dataSkills.length; i++){
                                        if($scope.dataSkills[i].personalId == $scope.user.id){
                                            $scope.arrSkillNew.push($scope.dataSkills[i]);
                                        }
                                    }

                                    $scope.user.skills = $scope.arrSkillNew;
                                })
                                .catch(function () {

                                });
                        })
                        .catch(function () {
                            alert("Delete failed !");
                        });
                };


                $scope.createLang = function () {
                    $scope.editLang.personalId = $scope.user.id;
                    Update_SkillService.createLang($scope.editLang,$scope.data.access_token)
                        .then(function () {
                            $scope.editLang = {}
                            alert("Create success !");
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                };
                $scope.updateLang = function () {
                    $scope.editLang.personalId = $scope.user.id;
                    Update_SkillService.updateLang($scope.editLang,$scope.lang.id,$scope.data.access_token)
                        .then(function () {
                            Update_SkillService.fetchLang($scope.data.access_token)
                                .then(function (res) {
                                    $scope.arrLangNew = [];
                                    $scope.dataLangs = res.data;
                                    for(var i =0;i<$scope.dataLangs.length; i++){
                                        if($scope.dataLangs[i].personalId == $scope.user.id){
                                            $scope.arrLangNew.push($scope.dataLangs[i]);
                                        }
                                    }
                                    $scope.langs = $scope.arrLangNew;
                                    $scope.status.toggle = !$scope.status.toggle;
                                })
                                .catch(function () {

                                });
                            $scope.editLang = {}
                        })
                        .catch(function () {
                            alert("Update failed !");
                        });
                };
                $scope.deleteLang = function () {
                    $scope.editLang.personalId = $scope.user.id;
                    Update_SkillService.deleteLang($scope.lang.id,$scope.data.access_token)
                        .then(function () {
                            Update_SkillService.fetchLang($scope.data.access_token)
                                .then(function (res) {
                                    $scope.arrLangNew = [];
                                    $scope.dataLangs = res.data;
                                    for(var i =0;i<$scope.dataLangs.length; i++){
                                        if($scope.dataLangs[i].personalId == $scope.user.id){
                                            $scope.arrLangNew.push($scope.dataLangs[i]);
                                        }
                                    }
                                    $scope.langs = $scope.arrLangNew;
                                    $scope.status.toggle = !$scope.status.toggle;
                                })
                                .catch(function () {

                                });
                            $scope.editLang = {}
                        })
                        .catch(function () {
                            alert("Delete failed !");
                        });
                };

                $scope.picture = ($filter('filter')($scope.users, {username: $stateParams.username})[0]).picture;
            })
            .catch(function () {
                $scope.users = [];
                $scope.picture = 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg';
            });


        $scope.postLanguage = function () {
            var data = {"name": $scope.language, "level": $scope.levelLanguage,  "personalId": $scope.user.id};

            Update_SkillService.createLanguage(data);
            $scope.update = 'Đã update';
        }
    });
