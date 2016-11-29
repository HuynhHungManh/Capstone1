/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .service('ConfirmService', function ($http) {
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };
        this.fetchAllTeacher = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/teachers?filter={"where": {"or": [{"myRoleId": "583c2733c59f4212004bee9e"},{"myRoleId": "583c26ffc59f4212004bee9d"}]},"include":"personal"}');
        };
        this.createVeri = function (datapost, token) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/verifications?access_token=' + token, datapost).success(function () {
                console.log('thanh cong');
            })
                .error(function (data, status) {
                    console.error('Repos error', status, data);
                })
        };
    });
