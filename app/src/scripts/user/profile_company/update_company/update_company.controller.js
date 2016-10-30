/**
 * Created by PC on 10/13/2016.
 */
/**
 * Created by PC on 10/12/2016.
 */
angular.module('myApp')
    .controller('Update_companyController' ,function ($scope, $stateParams, $filter, Update_companyService) {

        Update_companyService.fetchAllCompany()
            .then(function (response) {
                $scope.companys = response.data[0];
            })
            .catch(function () {
                $scope.companys =[];
            })


        $scope.post = function () {
            var dataCompany = { "name": $scope.name_company, "address": $scope.address, "industry_company": $scope.industry_company,
                "number_of_member": $scope.number_of_member,"phone": $scope.phone, "website": $scope.website, "email": $scope.email,
                "describe": $scope.describe,"picture": $scope.picture};
            Update_companyService.createCompany(dataCompany);
            $scope.update = 'Updated';
        }
    });