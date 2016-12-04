/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_userController', function ($state, $scope, $stateParams, $filter, Update_userService,
                                                   $rootScope, localStorageService, $cookieStore, $window) {

        $scope.data = localStorageService.get('DataLogin');

        $scope.isEditUser = true;

        Update_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;


                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];

                $scope.userPic = $filter('filter')($scope.users, {username: localStorageService.get('user')})[0];


                if ($scope.user.firstName == undefined || $scope.user.lastName == undefined ||
                    $scope.user.desscribe == undefined || $scope.user.status == undefined || $scope.user.sex == undefined) {
                    alert("Please update profile of you !");
                }

                $scope.id = $scope.user.id;
                if ($scope.users.length > 0) {
                    $scope.img = $scope.userPic.picture;
                }
                else {
                    $scope.img = 'http://dienanh.net/images/noavatar.jpg';
                }
            })
            .catch(function () {
                $scope.users = [];
            });

        $scope.result = 'male';


        $scope.back = function () {
            $state.go('profile_user', {"username": localStorageService.get('user')});
        };
        function checkUpdate(a, b, d, e, f, g, h) {

            if (a != undefined || b != undefined  || d != undefined
                || e != undefined || f != undefined || g != undefined || h!= undefined) {
                if (a.length > 10) {
                    alert('First name too long !');
                    return false;
                }
                else if (b.length < 5 || b.length > 30) {
                    alert('Last name must larger 5 or smaller 30 !');
                    return false;
                }
                // else if (c === '' || c === null || c === undefined) {
                //     alert('You did not enter birthday');
                //     return false;
                // }
                else if (d.length < 50) {
                    alert('You did not enter address');
                    return false;
                }
                else if (isNaN(e) && e.length < 15) {
                    alert('Phone not number !');
                    return false;
                }
                else if (f.length < 30) {
                    alert('You did not enter degree');
                    return false;
                }
                else if (g.length < 20) {
                    alert('You did not enter status');
                    return false;
                }
                else if (h.length < 2000) {
                    alert('You did not enter desscribe');
                    return false;
                }
                else
                    return true;
            }
        }
        function changePass(passA,passB) {
            if(passA === passB) {
                alert('You changed successfully password !');
                return true
            }
            else {
                alert('You enter the wrong password !');
                return false;
            }
        };


        $scope.post = function (result) {

            if (checkUpdate($scope.firstName,
                    $scope.lastName,
                    $scope.address, $scope.phone, $scope.degree, $scope.status1, $scope.desscribe) === true) {
                var data123 = {
                    "firstName": $scope.firstName,
                    "lastName": $scope.lastName,
                    "birthDay": $scope.birthday,
                    "address": $scope.address,
                    "phone": $scope.phone,
                    "sex": result,
                    "degree": $scope.degree,
                    "picture": $scope.picture,
                    "status": $scope.status1,
                    "desscribe": $scope.desscribe
                };
                Update_userService.createUser(data123)
                    .then(function () {
                        alert("Create success !");
                        $window.location.reload();
                    })
                    .catch(function () {
                        alert("Create failed !");
                    });
            }
        };

        $scope.update = function (result) {




            // if (checkUpdate($scope.firstName,
            //         $scope.lastName, $scope.birthday,
            //         $scope.address, $scope.phone, $scope.degree, $scope.status1, $scope.desscribe) === true) {
                var dataUpdate = {
                    "firstName": $scope.firstName,
                    "lastName": $scope.firstName,
                    "birthDay": $scope.birthday,
                    "address": $scope.address,
                    "phone": $scope.phone,
                    "sex": result,
                    "degree": $scope.degree,
                    "picture": $scope.picture,
                    "status": $scope.status1,
                    "desscribe": $scope.desscribe,
                    "password": $scope.password
                };
            if(changePass(localStorageService.get("password"),$scope.password) == true){
                dataUpdate.password = $scope.newpassword;
            }
            else
                dataUpdate.password = '';




                Update_userService.update123(dataUpdate, $scope.user.id, $scope.data.access_token)
                    .then(function () {
                        $state.go('profile_user', {"username": $scope.user.username});
                    })
                    .catch(function () {
                        alert("Update failed !");
                    });
            // }
        }
    });