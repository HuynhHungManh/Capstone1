/**
 * Created by PC on 9/25/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/home/home.html',
                    controller : 'HomeController'
                }
            }
        });

    });