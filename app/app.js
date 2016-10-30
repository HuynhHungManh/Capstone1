'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ui.router','validation', 'validation.rule'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('site', {

            views:{
                'navbar@':{
                    templateUrl:'src/component/user/navbar/navbar.html'
                },
                'footer@':{
                    templateUrl:'src/component/user/footer/footer.html'
                }
            }
        });
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });
