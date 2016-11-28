/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .service('ConfirmService',function ($http) {
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };
        this.fetchAllTeacher = function (token) {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/teachers?access_token=' + token);
        };

    });
