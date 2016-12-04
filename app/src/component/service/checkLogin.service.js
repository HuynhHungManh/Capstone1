/**
 * Created by lequanghiep on 11/20/2016.
 */
angular.module('myApp')
    .factory('CheckLoginService', function ($http, $state, localStorageService,AlertBox) {
        var isAuthenticated = false;
        var user = localStorageService.get("user");
        if((localStorageService.get("user") != null|| localStorageService.get("user") != undefined))
            isAuthenticated = true;
        else
            isAuthenticated = false;

        return {
            isAuthenticated: isAuthenticated,
            user : user
        }
    });