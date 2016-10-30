/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('profile_user', {
            url: '/profile_user/id=:id',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/profile_user.html',
                    controller : 'Profile_userController'
                }
            }
        });

    });