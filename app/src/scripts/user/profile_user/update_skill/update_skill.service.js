/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .service('Update_SkillService',function ($http) {
        this.fetchAllSkill = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={%22include%22:%20[%22languages%22,%22skills%22]}');
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

        this.createLang = function (datapost,token) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/langs?access_token='+token,datapost).success(function () {
                console.log('Đã update');
                console.log(token);
                console.log(datapost);
            });
        }
        this.updateLang = function (dataupdate,id,token) {
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/langs/'+id+'?access_token='+token,dataupdate).success(function () {
                console.log('Đã update');
                console.log(token);
                console.log(id);
                console.log(dataupdate);
            });
        };
        this.deleteLang = function (id,token) {
            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/langs/'+id+'?access_token='+token).success(function () {
            });
        };
    });
