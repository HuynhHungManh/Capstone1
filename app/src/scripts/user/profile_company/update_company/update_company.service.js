/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Update_companyService',function ($http) {
        this.fetchAllCompany = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/companies');
        };

        this.updateCompany = function (datapost,id, token) {
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/companies/'+id+'?access_token=' + token, datapost).success(function () {
            });
        };
    });
