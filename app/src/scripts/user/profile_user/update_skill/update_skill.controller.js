/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .controller('Update_SkillController', function ($scope, Update_SkillService, $stateParams, $filter) {
        Update_SkillService.fetchAllSkill()
            .then(function (response) {
                $scope.users = response.data;
                console.log(response.data);
                $scope.user = $filter('filter')($scope.users, {id: $stateParams.dtu_id})[0];
                $scope.picture = ($filter('filter')($scope.users, {id: $stateParams.dtu_id})[0]).picture;
            })
            .catch(function () {
                $scope.users = [];
                $scope.picture = 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg';
            });


        $scope.postSkill = function () {
            if ($scope.levelSkill == 'Beginner')
                $scope.percent = 20;
            else if ($scope.levelSkill == 'Elementary') {
                $scope.percent = 40;
            }
            else if ($scope.levelSkill == 'Intermediate') {
                $scope.percent = 60;
            }
            else if ($scope.levelSkill == 'Advanced') {
                $scope.percent = 80;
            }
            else if ($scope.levelSkill == 'Proficient') {
                $scope.percent = 100;
            }
            var data = {"name": $scope.skill, "level": $scope.pecsent};
            Update_userService.createSkill(data);
            $scope.updateSkill = 'Đã update';

        }
        $scope.postLanguage = function (result) {
            if ($scope.levelLanguage == 'Beginner')
                $scope.percent = 20;
            else if ($scope.levelLanguage == 'Elementary') {
                $scope.percent = 40;
            }
            else if ($scope.levelLanguage == 'Intermediate') {
                $scope.percent = 60;
            }
            else if ($scope.levelLanguage == 'Advanced') {
                $scope.percent = 80;
            }
            else if ($scope.levelLanguage == 'Proficient') {
                $scope.percent = 100;
            }
            var data = {"name": $scope.language, "level": $scope.percent};

            Update_userService.createLanguage(data);
            $scope.update = 'Đã update';
        }
    });
