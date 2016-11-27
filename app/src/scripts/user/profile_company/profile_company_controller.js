/**
 * Created by PC on 9/28/2016.
 */
angular.module('myApp')
    .controller('Profile_comanyController', function ($scope, $stateParams,
                                                      $filter,Profile_userService,$rootScope,
                                                      localStorageService ,$state,CompanyService) {
        $rootScope.isToggleLogout = localStorageService.get('isToggleLogout');
        $scope.data = localStorageService.get('DataLogin');

        $rootScope.status = {
            toggle404: false
        };
        $rootScope.isNav = true;

        if(localStorageService.get("Type") != 'personal')
            $rootScope.auth = true;

        $rootScope.checkCompany = function () {
            if ($rootScope.isToggleLogout == true) {
                $state.go('profile_company',{"username":  localStorageService.get("user")});
            }
            else {
                alert("Please login Website !");
            }
        };


        $rootScope.checkNullCom = function (data) {
            if(data === undefined || data === null || data === 'string' || data === '')
               return true;
            else
                return false;
        };


        $rootScope.checkCompany = function () {
            if ($rootScope.isToggleLogout == true) {
                $state.go('profile_company');
            }
            else {
                alert("Please login Website !");
            }
        };
        $rootScope.checkUser = function () {
            if ($rootScope.isToggleLogout == true) {
                $state.go('profile_user', {"username": localStorageService.get('user')});
            }
            else {
                alert("Please login Website !");
            }
        };

        function testemail(x) {
            var email = x; //change form to id or containment selector
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            if (email == '' || !re.test(email)) {
                // alert('Please enter a valid email address.');
                return false;
            }
            return true;
        }

        CompanyService.fetchAllUser()
            .then(function (response) {
                $scope.users = response.data;
            })
            .catch(function () {

            });

        $rootScope.checkNull = function (data) {
            if (data == null || data === '' || data === 'string' || data === undefined)
                return '--------------------------';
            else
                return data;
        };


        CompanyService.fetchAllCompany($scope.data.access_token)
            .then(function (response) {
                $scope.companies = response.data;
                $scope.company = $filter('filter')($scope.companies, {username: $stateParams.username})[0];




                $rootScope.Search = function (companySearch) {
                    if (testemail(companySearch) == true) {
                        $scope.company = $filter('filter')($scope.companies, {email: companySearch})[0];
                        if ($scope.company != undefined && $rootScope.status.toggle404 == false) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.company.username);
                            $state.go('profile_user', {"username": $scope.company.username});
                            // $scope.isToggle = false;
                            $scope.searchuser = false;
                        }
                        else if ($scope.company != undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_user', {"username": localStorageService.get("user")});
                            // $scope.isToggle = false;
                            $scope.searchuser = false;
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.company == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }
                    else {
                        $scope.user = $filter('filter')($scope.users, {username: companySearch})[0];
                        $scope.company = $filter('filter')($scope.companies, {username: companySearch})[0];

                        if($scope.user == undefined && $scope.company != undefined)
                            $scope.temp = $scope.company ;
                        else if($scope.user != undefined && $scope.company == undefined)
                            $scope.temp = $scope.user ;
                        else
                            $rootScope.status.toggle404 == true;

                        console.log($scope.temp);

                        if ($scope.temp != undefined &&  $scope.company == undefined && $rootScope.status.toggle404 == false) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.temp.username);
                            $state.go('profile_user', {"username": $scope.temp.username});

                        }
                        else if($scope.temp != undefined &&  $scope.user == undefined && $rootScope.status.toggle404 == false){
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", $scope.temp.username);
                            $state.go('profile_company', {"username": $scope.temp.username});

                        }
                        else if ($scope.temp != undefined && $scope.company == undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_user', {"username": $scope.temp.username});
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.temp != undefined && $scope.user == undefined && $rootScope.status.toggle404 == true) {
                            localStorageService.remove("userTemp");
                            localStorageService.set("userTemp", localStorageService.get("user"));
                            $state.go('profile_user', {"username": $scope.temp.username});
                            $rootScope.status.toggle404 = !$rootScope.status.toggle404;
                        }
                        else if ($scope.temp == undefined) {
                            $rootScope.status.toggle404 = true;
                        }
                    }
                };

            })
            .catch(function () {

            });


        $rootScope.isSearch = function () {
            if (localStorageService.get('DataLogin') != undefined ||
                localStorageService.get('DataLogin') != null || localStorageService.get('DataLogin') != '') {
                $rootScope.isSearch = !$rootScope.isSearch;
            }
            else {
                $rootScope.isSearch = false;
            }
        };




        $rootScope.logout = function () {
            alert("Do you want to out website ?");
            localStorageService.remove('isToggleLogout');
            localStorageService.remove('DataLogin');
            localStorageService.remove('user');
            localStorageService.remove('email');
            localStorageService.remove('userTemp');
            $rootScope.isNav = false;
            $rootScope.isToggleLogout = false;

            Profile_userService.logout($scope.data.access_token)
                .then(function () {
                })
                .catch(function () {
                });
            $state.go('home');
        };

    });