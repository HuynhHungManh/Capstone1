/**
 * Created by lequanghiep on 11/20/2016.
 */
angular.module('myApp')
    .factory('CheckLoginService', function ($http, $state, localStorageService, AlertBox) {
        var isAuthenticated = false;

        function check(type) {
            if (type != null || type != undefined) {
                isAuthenticated = true;
            }
            else
                isAuthenticated = false;
        }

        var login = function () {
            check(localStorageService.get("user"))
        };

        return {
            isAuthenticated: function () {
                return isAuthenticated;
            },
            login : login
        }
    });