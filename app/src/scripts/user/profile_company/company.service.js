/**
 * Created by PC on 11/27/2016.
 */
/**
 * Created by PC on 11/5/2016.
 */
angular.module('myApp')
    .service('CompanyService',function ($http) {


        this.fetchAllCompany = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/companies');
        };
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };
        this.login = function (datapost) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/personals/login',datapost)
                .success(function (data) {
                    console.log('Đã login');
                })
                .error(function(data, status) {
                    console.error('Repos error', status, data);
                });
        }

    });
