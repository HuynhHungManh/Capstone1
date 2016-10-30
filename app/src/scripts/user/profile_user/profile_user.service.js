/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Profile_userService',function ($http) {
        this.fetchAllUser = function () {
            // return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons');
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons?filter={%22include%22:%22skills%22}');
        };
        this.updateUser  = function () {
        }
    });
