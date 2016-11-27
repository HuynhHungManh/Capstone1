/**
 * Created by PC on 9/25/2016.
 */
angular.module('myApp')
    .controller('HomeController', function ($scope, $state, $stateParams, $httpParamSerializer,
                                            $filter, localStorageService, HomeService, $rootScope, $cookieStore, $window) {
        var data = {}
        $scope.dataLogin = {};
        $scope.isLogAndRes = false;
        $rootScope.isSearch = false;
        if (localStorageService.get("isToggleLogout") == undefined || localStorageService.get("isToggleLogout") == null) {
            $rootScope.isToggleLogout = false;
        }
        $scope.isStudent = true;

        $scope.isred = false;



        if ($rootScope.isToggleLogout == false) {
            $scope.dataLogin = {
                ToggleLogin: "",
                StoreUser: "",
                access_token: ""
            };
            localStorageService.set("DataLogin", $scope.dataLogin);
        }

        $scope.changeLog = function () {
            $scope.isLogAndRes = !$scope.isLogAndRes;
        };


        $scope.isToggleForget = true;

        $scope.closeForget = function () {
            if ($scope.isToggleForget == false) {
                $scope.isToggleForget = true;
            }
        };
        $scope.forget = function () {
            $scope.acceptForget = undefined;
            $scope.errForger = undefined;
        };

        $scope.SubForgetPass = function () {
            if (testemail($scope.emailForget) == true) {
                $scope.acceptForget = 'Please email your address to confirm the information and re-enter the new password!';
                $scope.isToggleForget = false;

            }
            else {
                $scope.errForger = 'Please enter a valid email address or Email does not exist !!';
            }
        };


        $scope.login = function () {
            if (password($scope.password) == false) {
                alert("Password faild!");
            }
            else {
                var dataUser = {
                    "username": $scope.emailVsUser,
                    "password": $scope.password
                };
                HomeService.login(dataUser)
                    .then(function (response) {
                        if(response.data.type == 'personal')
                            $state.go('profile_user', {"username": response.data.username});
                        else
                            $state.go('profile_company',{"username": response.data.username});

                        $scope.dataLogin = {
                            ToggleLogin: true,
                            StoreUser: response.data.username,
                            access_token: response.data.id
                        };
                        localStorageService.set("user", response.data.username);
                        localStorageService.set("Type", response.data.type);
                        localStorageService.set("email", response.data.email);
                        localStorageService.set("userTemp", response.data.username);
                        localStorageService.set("DataLogin", $scope.dataLogin);
                        localStorageService.set("isToggleLogout", true);
                    })
                    .catch(function () {
                        alert("Username or password faild, please enter again !");
                    })
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

        function validateUsername(abc) {
            // var error = "";
            var illegalChars = /\W/;
            var abc = $scope.usernameRegister;

            if (abc == undefined) {
                $scope.error = "You didn't enter a username.\n";

                // alert(error);
                return false + $scope.error;
            }

            else if (( abc.length < 5) || (abc.length > 30)) {
                $scope.error = "The username is the wrong length.\n";
                // alert(error);
                return false + $scope.error;

            } else if (illegalChars.test(abc)) {

                $scope.error = "The username contains illegal characters.\n";
                // alert(error);
                return false + $scope.error;
            }
            return true;
        }

        function password(pass) {

            if (pass == undefined) {
                $scope.error = "You didn't enter a password.\n";
                return false + $scope.error;
            }
            else if (0 < (pass.length) && (pass.length) < 6) {
                $scope.error = "The password is not strong.\n";
                return false + $scope.error;
            }
            else if ((pass.length) > 50) {
                $scope.error = "The password is very long.\n";
                return false + $scope.error;
            }
            return true;
        }

        function passwordAgain(pass, passAg) {
            if (passAg == undefined) {
                $scope.error = "You didn't enter a password again.\n";
                return false + $scope.error;
            }
            else if (pass != passAg) {
                $scope.error = "The password and password again not equal.\n";
                return false + $scope.error;
            }
            return true;
        }


        function dtu_id1(id) {


            if (id == undefined) {
                // $scope.error = "You didn't enter a dtu_id.\n";
                return false;
            }
            if (id.length != 10) {
                // $scope.error = "The dtu_id is the wrong length.\n";
                return false;
            }
            else if (isNaN(id)) {
                // $scope.error = "The dtu_id is not number.\n";
                return false;
            }
            return true;
        }


        $scope.post = function () {
            if ($scope.isred == false) {
                data = {
                    "username": $scope.usernameRegister,
                    "password": $scope.passRe,
                    "dtu_id": $scope.dtu_id,
                    "email": $scope.emailRegister
                };
            }
            else {
                data = {
                    "username": $scope.usernameRegister,
                    "password": $scope.passRe,
                    "email": $scope.emailRegister
                };
            }
            $scope.err = "";

            if (validateUsername($scope.usernameRegister) == true && testemail($scope.emailRegister) == true
                && password($scope.passRe) == true && passwordAgain($scope.passRe, $scope.passwordAgain) == true) {
                if ($scope.isred == false && dtu_id1($scope.dtu_id) == true) {
                    HomeService.createUser(data)
                        .then(function () {
                            alert("Register user success!");
                            $scope.isLogAndRes = !$scope.isLogAndRes;
                            $scope.dtu_id = '';
                            data={};
                            $scope.usernameRegister ='';
                            $scope.passRe ='';
                            $scope.dtu_id = '';
                            $scope.emailRegister = '';
                            $scope.passwordAgain = '';
                        })
                        .catch(function () {
                            alert("Register faild!");
                        });
                }
                else if ($scope.isred == false && dtu_id1($scope.dtu_id) == false) {
                    $scope.error = "Id dtu incorrect value !";
                }
                else if($scope.isred == true && dtu_id1($scope.dtu_id) == false){
                    HomeService.createCompany(data)
                        .then(function () {
                            alert("Register company success!");
                            $scope.isLogAndRes = !$scope.isLogAndRes;
                            data={};
                            $scope.usernameRegister ='';
                            $scope.passRe ='';
                            $scope.dtu_id = '';
                            $scope.emailRegister = '';
                            $scope.passwordAgain = '';
                        })
                        .catch(function () {
                            alert("Register faild!");
                        });
                }
            }
            else if (validateUsername($scope.usernameRegister) == false) {
                $scope.err = $scope.error;
            }
            else if (testemail($scope.emailRegister) == false) {
                $scope.err = "Please enter a valid email address !"
            }
            else if (password($scope.passRe) == false) {
                $scope.err = $scope.error;
            }
            else if (passwordAgain($scope.passRe, $scope.passwordAgain) == false) {
                $scope.err = $scope.error;
            }
        }


    });