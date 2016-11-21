/**
 * Created by PC on 11/15/2016.
 */

angular.module('myApp')
    .service('setCredentials', function ($cookies) {
        // function that gets json object and stores it inside a cookie
        this.storeInCookie = function (responseObject) {

            console.log(responseObject);

            //set the cookie
            var cookieObj = {
                currentUser: {
                    userType: responseObject.auth.userType,
                    username: responseObject.auth.email,
                    token: responseObject.auth.token
                }
            };


            console.log(cookieObj);
            //set up header, in case we need auth token inside it for later
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            //store inside of cookie
            $cookies.put('globals', cookieObj);


            return true;

        };

        //function to remove cookie
        this.removeCookie = function () {


        };

        //function to get cookie
        this.getCookie = function (cookieName) {

            //get cookie
            return $cookies.get(cookieName);

        };

    });