
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('confirm', {
            url: '/confirm/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/confirm/confirm.html',
                    controller : 'ConfirmController'
                }
            }
        });
    });