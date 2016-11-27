/**
 * Created by PC on 10/13/2016.
 */
/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider.state('update_company', {
            url: '/update_company/username=:username',
            parent: 'site',
            views: {
                'content@':{
                    templateUrl: 'src/scripts/user/profile_company/update_company/update_company.html',
                    controller : 'Update_companyController'
                }
            }
        });
    });