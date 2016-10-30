/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .service('Update_SkillService',function ($http) {
        this.fetchAllSkill = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/persons?filter={%22include%22:%20[%22skills%22,%22languages%22]}');
        };

        this.createSkill = function (datapost) {
            $http.post('https://afternoon-sands-21716.herokuapp.com/api/skills',datapost).success(function () {
                console.log('Đã update');
            });
        }

        this.createLanguage = function (datapost) {
            $http.post('https://afternoon-sands-21716.herokuapp.com/api/langs',datapost).success(function () {
                console.log('Đã update');
            });
        }
    });
