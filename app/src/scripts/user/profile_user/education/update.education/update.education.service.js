/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .service('UpdateEducationService',function ($http) {
        this.fetchEducation = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter=%7B%22include%22%3A%20%22educations%22%7D');
        };
        this.createEducation = function (dataupdat,token) {
            console.log(token);
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/educations?access_token='+token,dataupdat).success(function () {
            });
        };
        this.updateEducation =function (dataupdate,id,token) {
            console.log('API');
            console.log(token);
            console.log(id);
            console.log(dataupdate);
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/educations/'+id+'?access_token='+token,dataupdate).success(function () {
            });
        };
    });
