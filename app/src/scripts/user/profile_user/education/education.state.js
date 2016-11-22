/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('project', {
            url: '/project/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/education/education.html',
                    controller : 'EducationController'
                }
            }
        });
    });