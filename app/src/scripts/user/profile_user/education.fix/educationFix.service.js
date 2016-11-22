/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .service('EducationFixService',function ($http) {
        this.fetchAllEducation = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={%22include%22:%22educations%22}');
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
