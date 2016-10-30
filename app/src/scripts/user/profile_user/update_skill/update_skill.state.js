/**
 * Created by PC on 10/21/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('update_skill', {
            url: '/update_skill/id=:id',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_user/update_skill/update_skill.html',
                    controller : 'Update_SkillController'
                }
            }
        });
    });