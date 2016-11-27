/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('profile_company', {
            url: '/profile_company/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_company/profile_company.html',
                    controller : 'Profile_comanyController'
                }
            }
        });

    });