/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Profile_userService', function ($http) {
        // $rootScope.API = 'https://afternoon-sands-21716.herokuapp.com/api'
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={ "include": [{ "relation": "verifications","scope": {"where": {"status": true} } } ,"skills","languages","jobs","comments","interests","educations"]}');
        };
        this.fetchComs = function (token) {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/commentes?access_token=' + token);
        };
        this.fetchInters = function (token) {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/interests?access_token=' + token);
        };

        this.createCom = function (datapost) {

            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/commentes', datapost).success(function () {
            });
        };
        this.updateCom = function (dataupdate, id) {

            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/commentes/' + id, dataupdate).success(function (res) {

            });
        };
        this.deleteCom = function (id, token) {

            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/commentes/' + id + '?access_token=' + token).success(function () {
            });
        };
        this.deleteInter = function (id, token) {

            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/interests/' + id + '?access_token=' + token).success(function () {
            });
        };
        this.updateInter = function (dataupdate, id, token) {

            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/interests/' + id + '?access_token=' + token, dataupdate).success(function (res) {

            });
        };
        this.createInter = function (datapost, token) {

            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/interests?access_token=' + token, datapost).success(function () {
            });
        };
        this.logout = function (token) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/personals/logout?access_token=' + token).success(function () {
            });
        }

    });
