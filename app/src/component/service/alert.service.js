/**
 * Created by lequanghiep on 11/20/2016.
 */
angular.module('myApp')
    .factory('AlertBox', function () {
        return {
            deleteBox: deleteBox,
            updateBox : updateBox,
            selectBox : selectBox,
            errorBox : errorBox,
            errorUserBox : errorUserBox,
            successBox : successBox,
            logoutBox : logoutBox
        };


        function logoutBox() {
            swal({
                title: 'Are you sure?',
                text: "Do You want to logout!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, I agree!'
            }).then(function () {

            })
                .catch(function () {
                    console.log('Not');
                })
        }



        function successBox() {
            swal(
                'Good job!',
                'You register success !',
                'success'
            )
        }
        function errorUserBox() {
            swal(
                'Error !',
                'Incorrect username or password !',
                'error'
            )
        }


        function errorBox() {
            swal(
                'Error !',
                'You can not access this page !',
                'error'
            )
        }

        function deleteBox(callback, id, element) {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function ( ) {
                if (callback) {
                    callback.call(null, id)
                        .then(function () {
                            swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                            element.DataTable().ajax.reload(null, false);
                        })
                        .catch(function (error) {
                            swal(
                                'Error!',
                                error.toString(),
                                'Fuck'
                            )
                        });
                }
            });
        }
        function updateBox(callback, id, element) {
            swal({
                title: 'Edit input',
                html:
                '<input id="swal-input1" class="swal2-input" autofocus>' +
                '<input id="swal-input2" class="swal2-input">',
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        resolve([
                            $('#swal-input1').val(),
                            $('#swal-input2').val()
                        ])
                    })
                }
            }).then(function (result) {
                swal(JSON.stringify(result))
            }).catch(swal.noop)
        }
        function selectBox(callback, data, element, dataOption) {
            swal({
                title: 'Select Role',
                input: 'select',
                inputOptions: dataOption,
                inputPlaceholder: 'Select Role',
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        resolve();
                    })
                }
            }).then(function (result) {
                if (callback) {
                    if(result  == data.role._id){
                        swal(
                            'Faile!',
                            'Your file already exists !.',
                            'warning'
                        );
                    }
                    else{
                        data.role._id = result;
                        callback.call(null, data)
                            .then(function () {
                                swal(
                                    'Update!',
                                    'Your file has been updated.',
                                    'success'
                                );
                                element.DataTable().ajax.reload(null, false);
                            })
                            .catch(function (error) {
                                swal(
                                    'Error!',
                                    error.toString()
                                )
                            });
                    }
                }
            })
        }


    });