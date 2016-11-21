/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('update_education', {
            url: '/update_education/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/education/update.education/update.education.html',
                    controller : 'UpdateEducationController'
                }
            }
        });
    });