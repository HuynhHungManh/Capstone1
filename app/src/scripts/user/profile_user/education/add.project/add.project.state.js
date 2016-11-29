/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('addProject', {
            url: '/add.project/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/education/add.project/add.project.html',
                    controller : 'EducationController'
                }
            }
        });
    });