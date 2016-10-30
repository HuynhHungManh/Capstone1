/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('update_user', {
            url: '/update_user',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/update_user/update_user.html',
                    controller : 'Update_userController'
                }
            }
        });
    });