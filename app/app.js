'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ui.router','validation', 'validation.rule','ngResource','ngCookies','ngRoute','LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider ,$locationProvider,localStorageServiceProvider ) {
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
        // $locationProvider.html5Mode(true);
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        // $rootScope.$on('$stateChangeSuccess', function (object, state) {
        //     if (AuthService.isAuthenticated == false && state.url.indexOf('admin') >= 0 ) {
        //         $state.go('logins');
        //     }
        // });
    });

