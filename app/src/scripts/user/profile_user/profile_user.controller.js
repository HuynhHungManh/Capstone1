/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .controller('Profile_userController', function ($scope, Profile_userService, $stateParams, $filter,
                                                    $rootScope, $state, $cookies, setCredentials, $cookieStore, $window, $rootScope) {
        $rootScope.isToggleLogout = $cookieStore.get('isToggleLogout');
        $scope.comment = {};
        $scope.inter = {};
        $scope.isInter = false;
        $scope.isAddInter = false;
        $scope.iconShow = false;
        $scope.isShowIconInter = false;
        $scope.dataLogin = {};
        $rootScope.isGolbalUser = false;
        $scope.dataStore = $cookieStore.get('DataLogin');


        $scope.addInter = function () {
            $scope.iconShow = !$scope.iconShow;
            $scope.isAddInter = !$scope.isAddInter;
        }


        $rootScope.doTheBack = function () {
            window.history.back();
        };


        $rootScope.isSearch = function () {
            if ($cookieStore.get('DataLogin') != undefined) {
                $rootScope.isSearch = !$rootScope.isSearch;
            }
            else {
                $rootScope.isSearch = false;
            }
        };


        $scope.isEditCom = true;
        $scope.isCom = true;


        $scope.data = $cookieStore.get('DataLogin');

        $rootScope.status = {
            toggle404: false
        };
        $scope.RemoveCookie = function () {
            $cookieStore.remove('DataLogin');
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


        $rootScope.checkCompany = function () {
            if ($rootScope.isToggleLogout == true) {
                $state.go('profile_company');
            }
            else {
                alert("Please login Website !");
            }
        };
        $rootScope.checkUser = function () {
            if ($rootScope.isToggleLogout == true) {
                $state.go('profile_user', {"username": $cookieStore.get('DataLogin').StoreUser});

            }
            else {
                console.log($cookieStore.get('DataLogin').StoreUser);
                alert("Please login Website !");
            }

        };

        $rootScope.checkNullData = function (data) {
            if (data == null || data === ''  ||  data === 'string' || data === undefined)
                return false;
            else
                return true;
        };

        $rootScope.checkNullArr = function (data) {
            if(data.length  == 0)
                return true;
            else
                return false;
        };


        $rootScope.checkNull = function (data) {
            if (data == null || data === ''  ||  data ===  'string'  === undefined)
                return '--------------------------';
            else
                return data;
        };



        Profile_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];


                // console.log(checkNullArr($scope.user.skills));


                if ($cookieStore.get('DataLogin').StoreUser == $scope.user.username) {
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
                // else if($scope.user.educations[0].name_of_school == undefined ||
                //     $scope.user.educations[0].address_of_school ==undefined ||
                //     $scope.user.educations[0].describe == undefined ||$scope.user.educations[0].major ==undefined||
                //     $scope.user.educations[0].achiviement == undefined){
                //     $state.go('education', {"username": $scope.user.username});
                // }


                $scope.showComment = $scope.user.comments;

                $scope.inters = $scope.user.interests;
                $scope.userComent = $filter('filter')($scope.users, {username: $scope.data.StoreUser})[0];


                if ($scope.userComent.picture == undefined || $scope.userComent.picture == 'string') {
                    $scope.pic = 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg';
                }
                else {
                    $scope.pic = $scope.userComent.picture;
                }


                $scope.langs = $scope.user.languages;


                $scope.Search = function () {

                    if (testemail($scope.search) == true) {
                        $scope.user = $filter('filter')($scope.users, {email: $scope.search})[0];
                        if ($scope.user != undefined && $rootScope.status.toggle404 == false) {
                            $state.go('profile_user', {"username": $scope.user.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                        }
                        else if ($scope.user != undefined && $rootScope.status.toggle404 == true) {
                            $state.go('profile_user', {"username": $scope.user.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.user == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }

                    else {
                        $scope.user = $filter('filter')($scope.users, {username: $scope.search})[0];


                        if ($scope.user != undefined && $rootScope.status.toggle404 == false) {
                            $state.go('profile_user', {"username": $scope.user.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                        }
                        else if ($scope.user != undefined && $rootScope.status.toggle404 == true) {

                            $state.go('profile_user', {"username": $scope.user.username});
                            $scope.isToggle = false;
                            $scope.searchuser = false;
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.user == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }
                }


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
                    $scope.comment.commentator = $scope.userComent;
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

        $rootScope.logout = function () {
            alert("Do you want to out website ?");
            $cookieStore.remove('isToggleLogout');
            $cookieStore.remove('DataLogin');
            $rootScope.isToggleLogout = false;
            Profile_userService.logout($scope.data.access_token);
            $state.go('home');
        };
    });
