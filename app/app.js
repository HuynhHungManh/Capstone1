'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ui.router', 'validation', 'validation.rule', 'ngResource', 'ngCookies', 'ngRoute', 'LocalStorageModule'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('site', {

            views: {
                'navbar@': {
                    templateUrl: 'src/component/user/navbar/navbar.html'
                },
                'footer@': {
                    templateUrl: 'src/component/user/footer/footer.html'
                }
            }
        });
        // $locationProvider.html5Mode(true);
    })
    .run(function ($rootScope, $state, CheckLoginService,localStorageService) {
        // $rootScope.$on('$stateChangeSuccess', function() {
        //     document.body.scrollTop = document.documentElement.scrollTop = 0;
        // });

        // $rootScope.$on('$includeContentLoaded', function (obj, url) {
        //     console.log(state.url.indexOf('home'));
        //     console.log(CheckLoginService.isAuthenticated);
        //     if (url === 'src/scripts/user/home/home.html') {
        //         console.log('home');
        //         if (CheckLoginService.isAuthenticated() == true)
        //             $state.go('profile_user', {"username": localStorageService.get("user")});
        //     }
        // });

        $rootScope.$on('$stateChangeSuccess', function (object, state) {
            if (localStorageService.get("isAuthor") == true && state.url.indexOf('home') >= 0) {
                $state.go('profile_user', {"username": localStorageService.get("user")});
            }
        });
    });

