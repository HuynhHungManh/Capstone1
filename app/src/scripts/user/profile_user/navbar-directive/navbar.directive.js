/**
 * Created by PC on 10/20/2016.
 */
angular.module('myApp')
    .directive('myDirective',function () {
        return {
            restrict : 'E',
            templateUrl : 'src/scripts/user/profile_user/navbar-directive/navbar.directive.html'
        }
    });

