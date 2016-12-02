/**
 * Created by PC on 11/5/2016.
 */
angular.module('myApp')
    .service('HomeService',function ($http) {


        this.createUser = function (datapost) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/personals',datapost).success(function () {

            });
        };

        this.createCompany = function (datapost) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/companies',datapost).success(function () {
            });
        };

        this.fetchUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };
        this.login = function (datapost) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/personals/login',datapost)
                .success(function (data) {

            })
                .error(function(data, status) {
            });
        }

    });
