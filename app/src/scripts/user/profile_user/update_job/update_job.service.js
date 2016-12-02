/**
 * Created by PC on 11/16/2016.
 */
/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Update_jobService',function ($http) {
        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals?filter={ "include": [{ "relation": "verifications","scope": {"where": {"status": true} } } ,"skills","languages","jobs","comments","interests","educations"]}');
        };
        this.fetchJobs = function (token) {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/jobs?access_token='+token);
        };
        this.createProject = function (datapost,token) {
            console.log('Đã update');
            console.log(token);
            console.log(datapost);
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/jobs?access_token='+token,datapost).success(function () {
            });
        };
        this.updateProject = function (dataupdate,id,token) {
            console.log('Đã update');
            console.log(token);
            console.log(id);
            console.log(dataupdate);
            return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/jobs/'+id+'?access_token='+token,dataupdate).success(function () {
            });
        };
        this.deleteProject = function (id,token) {
            return $http.delete('https://afternoon-sands-21716.herokuapp.com/api/jobs/'+id+'?access_token='+token).success(function () {
            });
        };
    });
