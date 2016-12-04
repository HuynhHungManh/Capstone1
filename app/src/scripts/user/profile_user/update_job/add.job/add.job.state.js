/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('addJob', {
            url: '/add.job/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/update_job/add.job/add.job.html',
                    controller : 'Update_jobController'
                }
            }
        });
    });
