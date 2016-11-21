/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_userController', function ($scope, $stateParams, $filter, Update_userService,
                                                   $rootScope, $cookies, $cookieStore ,$window) {

        $scope.data = $cookieStore.get('DataLogin');




        Update_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data


                $scope.user = $filter('filter')($scope.users, {username: $stateParams.username})[0];

                if($scope.user.firstName == undefined ||  $scope.user.lastName == undefined ||
                    $scope.user.desscribe ==undefined || $scope.user.status == undefined){
                    alert("Please update profile of you !");
                }







                $scope.id = $scope.user.id;
                if ($scope.users.length > 0) {
                    $scope.img = $scope.user.picture;
                }
                else {
                    $scope.img = 'http://dienanh.net/images/noavatar.jpg';
                }
            })
            .catch(function () {
                $scope.users = [];
            })

        $scope.result = 'male';

        $scope.post = function (result) {
            if ($scope.dtu_id.length == 10) {
            }
            var data123 = {
                "dtu_id": $scope.dtu_id,
                "firstName": $scope.firstName,
                "lastName": $scope.firstName,
                "email": $scope.email,
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
            // $scope.update = 'Đã update';
        }

        $scope.update = function (result) {

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
            console.log($scope.data.access_token);

            Update_userService.update123(dataUpdate,$scope.user.id, $scope.data.access_token)
                .then(function () {
                    alert("Update access !");
                    $window.location.reload();
                })
                .catch(function () {
                    alert("Update failed !");
                });
            // $scope.update = 'Đã update';
        }
    });