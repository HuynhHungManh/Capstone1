/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Update_companyService',function ($http) {
        this.fetchAllCompany = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/companies');
        };
        this.updateUser  = function () {
        }

        this.createCompany = function (datapost) {
            $http.post('https://afternoon-sands-21716.herokuapp.com/api/companies',datapost).success(function () {
                console.log('Đã update');
            });
        }
    });
