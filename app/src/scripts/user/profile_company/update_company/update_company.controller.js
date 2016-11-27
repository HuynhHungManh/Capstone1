/**
 * Created by PC on 10/13/2016.
 */
/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_companyController' ,function ($scope,$state, localStorageService,$stateParams, $filter, Update_companyService,$rootScope) {


        $scope.objCompany = {};
        $scope.data = localStorageService.get('DataLogin');


        $rootScope.checkNull = function (data) {
            if (data == null || data === '' || data === 'string' || data === undefined)
                return '--------------------------';
            else
                return data;
        };


        Update_companyService.fetchAllCompany()
            .then(function (response) {

                $scope.companies = response.data;
                $scope.company = $filter('filter')($scope.companies, {username: $stateParams.username})[0];

            })
            .catch(function () {
                $scope.companys =[];
            });


        $rootScope.doTheBack = function () {
            window.history.back();
        };


        $scope.post = function () {
            Update_companyService.updateCompany($scope.objCompany,$scope.company.id,$scope.data.access_token)
                .then(function () {
                    $state.go('profile_company', {"username": localStorageService.get('user')});
                    $scope.objCompany = {};
                })
                .catch(function () {
                    alert('Update failed!')
                });
        }
    });