/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .service('ConfirmService',function ($http) {
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };

        this.createSkill = function (datapost,token) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/skills?access_token='+token,datapost).success(function () {
                console.log('Đã update');
                console.log(token);
                console.log(datapost);
            });
        };
        this.updateSkill = function (dataupdate,id,token) {
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/skills/'+id+'?access_token='+token,dataupdate).success(function () {
                console.log('Đã update');
                console.log(token);
                console.log(id);
                console.log(dataupdate);
            });
        };
        this.deleteSkill = function (id,token) {
            console.log(token);
            console.log(id);
            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/skills/'+id+'?access_token='+token).success(function () {
            });
        };
    });
