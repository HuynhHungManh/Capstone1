/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_userController', function ($state, $scope, $stateParams, $filter, Update_userService,
                                                   $rootScope, localStorageService, $cookieStore, $window) {

        $scope.data = localStorageService.get('DataLogin');

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


        function checkUpdate(a, b, c, d, e, f, g, h) {
            if (a === '' || a === null || a === undefined) {
                alert('You did not enter firstName');
                return false;
            }
            else if (b === '' || b === null || b === undefined) {
                alert('You did not enter lastName');
                return false;
            }
            else if (c === '' || c === null || c === undefined) {
                alert('You did not enter birthday');
                return false;
            }
            else if (d === '' || d === null || d === undefined) {
                alert('You did not enter address');
                return false;
            }
            else if (e === '' || e === null || e === undefined) {
                alert('You did not enter phone');
                return false;
            }
            else if (f === '' || f === null || f === undefined) {
                alert('You did not enter degree');
                return false;
            }
            else if (g === '' || g === null || g === undefined) {
                alert('You did not enter status');
                return false;
            }
            else if (h === '' || h === null || h === undefined) {
                alert('You did not enter desscribe');
                return false;
            }
            else
                return true;
        }


        $scope.post = function (result) {

            if (checkUpdate($scope.firstName,
                    $scope.lastName, $scope.birthday,
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

            if (checkUpdate($scope.firstName,
                    $scope.lastName, $scope.birthday,
                    $scope.address, $scope.phone, $scope.degree, $scope.status1, $scope.desscribe) === true) {
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
                    "desscribe": $scope.desscribe
                };

                Update_userService.update123(dataUpdate, $scope.user.id, $scope.data.access_token)
                    .then(function () {
                        $state.go('profile_user', {"username": $scope.user.username});
                    })
                    .catch(function () {
                        alert("Update failed !");
                    });
            }
        }
    });