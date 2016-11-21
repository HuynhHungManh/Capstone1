/**
 * Created by PC on 11/14/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('update_job', {
            url: '/update_job/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/update_job/update_job.html',
                    controller : 'Update_jobController'
                }
            }
        });
    });