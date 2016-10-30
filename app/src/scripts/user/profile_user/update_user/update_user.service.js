/**
 * Created by PC on 10/13/2016.
 */
/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Update_userService',function ($http) {
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons');
        };
        this.updateUser  = function () {
        }

        this.createUser = function (datapost) {
            $http.post('https://afternoon-sands-21716.herokuapp.com/api/persons',datapost).success(function () {
                console.log('Đã update');
            });
        }
    });
