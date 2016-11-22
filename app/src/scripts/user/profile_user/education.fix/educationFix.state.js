
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('education', {
            url: '/education/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/education.fix/educationFix.html',
                    controller : 'EducationFix_Controller'
                }
            }
        });
    });