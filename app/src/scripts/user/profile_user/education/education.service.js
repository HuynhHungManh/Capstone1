/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .service('EducationService',function ($http) {
        this.fetchAllEducation = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={%22include%22:%20[%22projects%22,%22skills%22,%22educations%22]}');
        };
        this.fetchAllProject = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={%22include%22:%20[%22projects%22,%22skills%22,%22educations%22]}');
        };
        this.fetchAllSkillOfProject = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/projects?filter=%7B%22include%22%3A%20%22skills%22%7D');
        };

        this.updateProject =function (dataupdate,id,token) {
            console.log('API');
            console.log(token);
            console.log(id);
            console.log(dataupdate);
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/projects/'+id+'?access_token='+token,dataupdate).success(function () {
            });
        };
        this.deleteProject = function (id,token) {
            console.log(token);
            console.log(id);
            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/projects/'+id+'?access_token='+token).success(function () {
            });
        };
        this.createProject = function (dataupdat,token) {
            console.log('API');
            console.log(token);
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/projects?access_token='+token,dataupdat).success(function () {
            });
        };
    });
