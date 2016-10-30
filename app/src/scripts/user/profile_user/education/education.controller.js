/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .controller('EducationController', function ($scope, $stateParams, $filter ,EducationService) {
        EducationService.fetchAllEducation()
            .then(function (response) {
                $scope.infoEducation = response.data;
                $scope.user = $filter('filter')($scope.infoEducation, {id : $stateParams.dtu_id})[0];
                $scope.education = $scope.user.educations[0];
                //console.log($scope.education.achiviement);
            })
            .catch(function () {
                $scope.infos =[];
            })
        EducationService.fetchAllProject()
            .then(function (response) {
                $scope.user = $filter('filter')(response.data, {id : $stateParams.dtu_id})[0];
                $scope.project = $scope.user.projects[0];
                console.log($scope.project.name);
            })
    });