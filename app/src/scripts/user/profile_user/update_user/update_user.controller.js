/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_userController' ,function ($scope, $stateParams, $filter, Update_userService) {

        Update_userService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function () {
                $scope.users =[];
            })

        $scope.result = 'male';



        $scope.post = function (result) {
            if($scope.dtu_id.length == 10){

            }
            var data123 = { "dtu_id": $scope.dtu_id,  "firstName": $scope.firstName, "lastName": $scope.firstName,
                "email": $scope.email, "age": $scope.age, "address": $scope.address, "phone": $scope.phone,
                "sex": result,"degree": $scope.degree ,"picture": $scope.picture, "status": $scope.status, "desscribe":  $scope.desscribe};
                Update_userService.createUser(data123);
                $scope.update = 'Đã update';
        }
    });