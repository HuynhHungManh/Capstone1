/**
 * Created by PC on 10/13/2016.
 */
/**
 * Created by PC on 10/13/2016.
 */
angular.module('myApp')
    .service('Update_userService',function ($http , API_URL , $resource) {
        // var url = [API_URL, 'personals'].join('');

        this.fetchAllUser = function () {
            return $http.get('https://afternoon-sands-21716.herokuapp.com/api/personals');
        };
        // this.updateUser = function (data ,accep) {
        //     return $http.post([url, '?access_token=',accep].join(''), data);
        // };


        this.createUser = function (datapost) {
            return $http.post('https://afternoon-sands-21716.herokuapp.com/api/personals',datapost).success(function (res) {
                console.log(res);
            })
                .error(function(error){
                    console.log(error);
                    //error handler function
                });
        }


        this.update123 = function (data,id,token) {
            console.log(data);
           return $http.patch('https://afternoon-sands-21716.herokuapp.com/api/personals/'+id+'?access_token='+token,data).then(function(response) {
                console.log('response');

            });
        };
    });
