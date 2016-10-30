/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .service('EducationService',function ($http) {
        this.fetchAllEducation = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons?filter={%22include%22:%22educations%22}');
        };
        this.fetchAllProject = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons?filter={%22include%22:%22projects%22}');
        };
    });
