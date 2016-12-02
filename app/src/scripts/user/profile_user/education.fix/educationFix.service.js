/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .service('EducationFixService',function ($http) {
        this.fetchAllEducation = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={ "include": [{ "relation": "verifications","scope": {"where": {"status": true} } } ,"skills","languages","jobs","comments","interests","educations"]}');
        };
        this.fetchEducation = function (token) {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/educations?access_token='+token);
        };
        this.updateEducation =function (dataupdate,id,token) {
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/educations/'+id+'?access_token='+token,dataupdate).success(function () {
            });
        };
        this.deleteEducation = function (id,token) {
            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/educations/'+id+'?access_token='+token).success(function () {
            });
        };
    });
