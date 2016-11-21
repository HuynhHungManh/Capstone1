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

        $rootScope.checkUser = function () {
            if ($cookieStore.get('DataLogin').StoreUser != "") {
                $state.go('profile_user', {"username": $scope.dataStore.StoreUser});
            }
            else {
                alert("Please login Website !");
            }
        };


        $rootScope.doTheBack = function () {
            window.history.back();
        };


        $rootScope.isSearch = function () {
            if ($cookieStore.get('DataLogin') != undefined) {
                $rootScope.isSearch = !$rootScope.isSearch;
            }
            else{
                $rootScope.isSearch = false;
            }
        };

        $rootScope.checkCompany = function () {
            if ($cookieStore.get('DataLogin').StoreUser != "" ) {
                $state.go('profile_company');
            }
            else {
                alert("Please login Website !");
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


        // $scope.load = function () {
        //     angular.element('#321').DataTable().ajax.reload(null, false);
        // };

        Profile_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];

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

                //
                // if($scope.user.educations == []){
                //     console.log('wfawfaf')
                //     $state.go('education', {"username": $scope.user.username});
                // }




                $scope.image = $scope.user.picture;
                if ($scope.image != undefined && $scope.image != 'string') {
                    $rootScope.picture = $scope.image
                }
                else {
                    $rootScope.picture = 'http://www.translationwebshop.com/wp-content/themes/translationwebshop/images/img_placeholder_avatar.jpg';
                }

                if ($scope.user.firstName == undefined || $scope.user.lastName == undefined ||
                    $scope.user.desscribe == undefined || $scope.user.status == undefined) {
                    $state.go('update_user', {"username": $scope.user.username});
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
                            $scope.inter = {};
                            $window.location.reload();
                        })
                        .catch(function () {
                            alert("Create failed !");
                        });
                };
                $scope.deleteInter = function (id) {
                    Profile_userService.deleteInter(id, $scope.data.access_token)
                        .then(function () {
                            $scope.inter = {}
                            $window.location.reload();
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
                                $scope.isInter = {};
                                $window.location.reload();
                            })
                            .catch(function () {
                                alert("Update failed !");
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
                            alert("update failed !");
                        });
                        $scope.isEditCom = !$scope.isEditCom;
                        alert("Edit success !");
                        $window.location.reload();
                        $scope.comment = {};
                    }
                    else {
                        alert("Edit failed !");
                    }
                }
                $scope.createCom = function () {
                    $scope.comment.personalId = $scope.user.id;
                    $scope.comment.commentator = $scope.userComent;
                    $scope.created_at = new Date();
                    $scope.updated_at = new Date();
                    Profile_userService.createCom($scope.comment)
                        .then(function () {
                            $scope.comment = {};
                            $window.location.reload();
                        }).catch(function () {
                        alert("Create failed !");
                    });
                };
                $scope.deleteCom = function (id) {
                    Profile_userService.deleteCom(id, $scope.data.access_token)
                        .then(function () {
                            $scope.comment = {};
                            $window.location.reload();
                        }).catch(function () {
                        alert("Delete failed !");
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
            Profile_userService.logout($scope.data.access_token);
            $state.go('home');
        };
    });
