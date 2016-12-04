/**
 * Created by PC on 9/28/2016.
 */

angular.module('myApp')
    .controller('Profile_userController', function ($scope, Profile_userService, $stateParams, $filter,
                                                    CompanyService, $rootScope, $state, localStorageService, setCredentials, $cookieStore, $window) {
        $rootScope.isToggleLogout = localStorageService.get('isToggleLogout');

        $scope.comment = {};
        $scope.arrSkillShows = [];
        $scope.inter = {};
        $scope.isInter = false;
        $scope.isAddInter = false;
        $scope.iconShow = false;
        $scope.isShowIconInter = false;
        $scope.dataLogin = {};
        $rootScope.isGolbalUser = false;
        $scope.isNav = true;

        $scope.userTempSc = localStorageService.get("userTemp");


        if(localStorageService.get("Type") == 'personal')
            $rootScope.auth = false;
        // $rootScope.auth = false;


        $scope.editUserCom = function (user) {
            if(user == localStorageService.get('user'))
               return true;
            else
                return false;
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


        $scope.addInter = function () {
            $scope.iconShow = !$scope.iconShow;
            $scope.isAddInter = !$scope.isAddInter;
        };


        $rootScope.doTheBack = function () {
            window.history.back();
        };


        $rootScope.isSearch = function () {
            if (localStorageService.get('DataLogin') != undefined ||
                localStorageService.get('DataLogin') != null || localStorageService.get('DataLogin') != '') {
                $rootScope.isSearch = !$rootScope.isSearch;
            }
            else {
                $rootScope.isSearch = false;
            }
        };


        $scope.isEditCom = true;
        $scope.isCom = true;


        $scope.data = localStorageService.get('DataLogin');


        $rootScope.status = {
            toggle404: false
        };
        $scope.RemoveCookie = function () {
            localStorageService.remove('DataLogin');
        };
        function testemail(x) {
            var email = x; //change form to id or containment selector
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (email == '' || !re.test(email)) {
                // alert('Please enter a valid email address.');
                return false;
            }
            return true;
        }

        $rootScope.checkNullData = function (data) {
            if (data == null || data === '' || data === 'string' || data === undefined)
                return false;
            else
                return true;
        };




        $rootScope.checkNullArr = function (data) {
            if (data !== undefined && data.length === 0 )
                return true;
            else
                false;
        };


        $rootScope.checkNull = function (data) {
            if (data == null || data === '' || data === 'string' || data === undefined)
                return '--------------------------';
            else
                return data;
        };
        $scope.checkShowBtn = function () {
            if(localStorageService.get('user') == $scope.user.username)
                return true;
            else
                return false;
        };


        Profile_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];

                if($scope.user.verifications === null ||
                    $scope.user.verifications === [] || $scope.user.verifications === undefined || $scope.user.verifications.length === 0)
                    $scope.isVeri = false;
                else
                    $scope.isVeri = true;



                $scope.arrSkillShows1=[];
                for(var i =0;i<$scope.user.skills.length;i++){
                    if($scope.user.skills[i].level != 0 && $scope.user.skills[i].level !=null && $scope.user.skills[i].level != undefined)
                        $scope.arrSkillShows.push($scope.user.skills[i]);
                }
                $scope.arrSkillShows1 =$scope.arrSkillShows;


                $scope.isNullSkill = $rootScope.checkNullArr($scope.user.skills);

                if (localStorageService.get("user") == $scope.user.username) {
                    localStorageService.set('picture', $scope.user.picture);
                }


                if (localStorageService.get('user') == $scope.user.username) {
                    $scope.isToggle = true;
                    $scope.isToggleCom = false;
                    $scope.isCom = false;
                    $scope.isShowIconInter = !$scope.isShowIconInter;
                    $rootScope.isGolbalUser = true;
                }
                else {
                    $scope.isToggleCom = true;
                    $scope.isToggle = false;
                    $rootScope.isGolbalUser = true;
                }

                $scope.image = $scope.user.picture;
                if ($scope.image != undefined && $scope.image != 'string') {
                    $rootScope.picture = $scope.image
                }
                else {
                    $rootScope.picture = 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg';
                }

                if ($scope.user.firstName == undefined || $scope.user.lastName == undefined) {
                    alert("You don't enter first name or lastname !");
                }


                $scope.showComment = $scope.user.comments;
                $scope.isNullCom = $rootScope.checkNullArr($scope.showComment);

                $scope.inters = $scope.user.interests;
                $scope.userComent = $filter('filter')($scope.users, {username: localStorageService.get("user")})[0];





                if ($scope.userComent.picture === undefined  || $scope.userComent.picture === null) {
                    $scope.pic = 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg';
                }
                else {

                    $scope.pic = localStorageService.get('picture');
                }


                $scope.langs = $scope.user.languages;

                $scope.isNullLang = $rootScope.checkNullArr($scope.langs);


                CompanyService.fetchAllCompany()
                    .then(function (response) {
                        $scope.companies = response.data;
                        // $scope.company = $filter('filter')($scope.companies, {username : $stateParams.username})[0];

                    })
                    .catch(function () {

                    });


                $rootScope.Search = function (userSearch) {
                    if (testemail(userSearch) == true) {
                        $scope.user = $filter('filter')($scope.users, {email: userSearch})[0];
                        if ($scope.user != undefined && $rootScope.status.toggle404 == false) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.user.username);
                            $state.go('profile_user', {"username": $scope.user.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                        }
                        else if ($scope.user != undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_user', {"username": localStorageService.get("user")});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.user == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }

                    else {
                        $scope.user = $filter('filter')($scope.users, {username: userSearch})[0];

                        $scope.company = $filter('filter')($scope.companies, {username: userSearch})[0];

                        if($scope.user == undefined && $scope.company != undefined)
                            $scope.temp = $scope.company ;
                        else if($scope.user != undefined && $scope.company == undefined)
                            $scope.temp = $scope.user ;
                        else
                            $rootScope.status.toggle404 == true;

                        if ($scope.temp != undefined && $scope.company == undefined && $rootScope.status.toggle404 == false) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.temp.username);
                            $state.go('profile_user', {"username": $scope.temp.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                        }
                        else if($scope.temp != undefined && $scope.user == undefined && $rootScope.status.toggle404 == false){
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.temp.username);
                            $state.go('profile_company', {"username": $scope.temp.username});
                        }
                        else if ($scope.temp != undefined && $scope.company == undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_user', {"username": $scope.temp.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.temp != undefined && $scope.user == undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_company', {"username": $scope.temp.username});
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }

                        else if ($scope.temp == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }
                };


                $scope.createInter = function () {
                    $scope.inter.personalId = $scope.user.id;

                    Profile_userService.createInter($scope.inter, $scope.data.access_token)
                        .then(function () {
                            $scope.arrInters = [];
                            Profile_userService.fetchInters($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataNewInter = res.data;
                                    for (var i = 0; i < $scope.dataNewInter.length; i++) {
                                        if ($scope.dataNewInter[i].personalId == $scope.user.id) {
                                            $scope.arrInters.push($scope.dataNewInter[i]);
                                        }
                                    }
                                    $scope.inters = $scope.arrInters;
                                })
                                .catch(function () {
                                });
                            $scope.iconShow = !$scope.iconShow;
                            $scope.isAddInter = !$scope.isAddInter;
                            $scope.inter = {};
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                };
                $scope.deleteInter = function (id) {
                    Profile_userService.deleteInter(id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrInters = [];
                            Profile_userService.fetchInters($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataNewInter = res.data;
                                    for (var i = 0; i < $scope.dataNewInter.length; i++) {
                                        if ($scope.dataNewInter[i].personalId == $scope.user.id) {
                                            $scope.arrInters.push($scope.dataNewInter[i]);
                                        }
                                    }
                                    $scope.inters = $scope.arrInters;
                                })
                                .catch(function () {
                                });
                            $scope.inter = {};
                        }).catch(function () {
                        alert("Delete failed !");
                    });
                };


                $scope.back = function () {
                    $scope.isInter = !$scope.isInter;
                };

                $scope.changeUpdateInter = function (id, name) {
                    $scope.name = name;
                    $scope.inter.personalId = $scope.user.id;
                    $scope.isInter = !$scope.isInter;
                    $scope.updateInter = function () {
                        Profile_userService.updateInter($scope.inter, id, $scope.data.access_token)
                            .then(function () {
                                $scope.arrInters = [];
                                Profile_userService.fetchInters($scope.data.access_token)
                                    .then(function (res) {
                                        $scope.dataNewInter = res.data;
                                        for (var i = 0; i < $scope.dataNewInter.length; i++) {
                                            if ($scope.dataNewInter[i].personalId == $scope.user.id) {
                                                $scope.arrInters.push($scope.dataNewInter[i]);
                                            }
                                        }
                                        $scope.inters = $scope.arrInters;
                                        $scope.isInter = !$scope.isInter;
                                    })
                                    .catch(function () {
                                    });
                                $scope.inter = {};


                            })
                            .catch(function () {
                                alert("Connect internet failed !");
                            });
                    };
                };


                $scope.updateCom = function (id) {
                    if ($scope.comment != {} && $scope.comment.content != '') {

                        $scope.comment.personalId = $scope.user.id;
                        $scope.comment.commentator = $scope.userComent;
                        $scope.created_at = new Date();
                        $scope.updated_at = new Date();
                        Profile_userService.updateCom($scope.comment, id)
                            .then(function () {
                                $scope.comment = {};
                                $window.location.reload();
                            }).catch(function () {
                            alert("Connect internet failed !");
                        });
                        $scope.isEditCom = !$scope.isEditCom;
                        alert("Edit success !");
                        $window.location.reload();
                        $scope.comment = {};
                    }
                    else {
                        alert("Connect internet failed !");
                    }
                }
                $scope.createCom = function () {
                    $scope.comment.personalId = $scope.user.id;

                    $scope.comment.commentator = {firstName : $scope.userComent.firstName,
                        lastName : $scope.userComent.lastName,
                        username: $scope.userComent.username,
                        picture: $scope.userComent.picture ,
                        job: $scope.userComent.jobs[0].name_of_company };

                    $scope.created_at = new Date();
                    $scope.updated_at = new Date();

                    Profile_userService.createCom($scope.comment)
                        .then(function () {
                            $scope.arrComs = [];
                            Profile_userService.fetchComs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataNewComs = res.data;
                                    for (var i = 0; i < $scope.dataNewComs.length; i++) {
                                        if ($scope.dataNewComs[i].personalId == $scope.user.id) {
                                            $scope.arrComs.push($scope.dataNewComs[i]);
                                        }
                                    }
                                    $scope.showComment = $scope.arrComs;
                                })
                                .catch(function () {

                                });
                            $scope.comment = {};
                        }).catch(function () {
                        alert("Connect internet failed !");
                    });
                };
                $scope.deleteCom = function (id) {
                    Profile_userService.deleteCom(id, $scope.data.access_token)
                        .then(function () {
                            $scope.arrComs = [];
                            Profile_userService.fetchComs($scope.data.access_token)
                                .then(function (res) {
                                    $scope.dataNewComs = res.data;
                                    for (var i = 0; i < $scope.dataNewComs.length; i++) {
                                        if ($scope.dataNewComs[i].personalId == $scope.user.id) {
                                            $scope.arrComs.push($scope.dataNewComs[i]);
                                        }
                                    }
                                    $scope.showComment = $scope.arrComs;
                                })
                                .catch(function () {

                                });
                            $scope.comment = {};
                        }).catch(function () {
                        alert("Connect internet failed !");
                    });
                };


            })
            .catch(function () {
                $scope.users = [];
            });







        // $rootScope.logout = function () {
        //     $scope.isNav = false;
        //     alert("Do you want to out website ?");
        //     localStorageService.remove('isToggleLogout');
        //     localStorageService.remove('DataLogin');
        //     localStorageService.remove('user');
        //     localStorageService.remove('email');
        //     localStorageService.remove('userTemp');
        //     $rootScope.isToggleLogout = false;
        //
        //     Profile_userService.logout($scope.data.access_token)
        //         .then(function () {
        //         })
        //         .catch(function () {
        //         });
        //     $state.go('home');
        // };
    });
