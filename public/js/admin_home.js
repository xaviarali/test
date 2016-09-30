/**
 * Created by Junal on 2016-06-24.
 */
$(document).ready(function () {
    /*
     Let's check if this user is already signed in
     */
    if (localStorage.getItem('adminData') != null) {
        var retrieveAdminData = JSON.parse(localStorage.getItem('adminData'));
        /*
         {"token":"6e0a4421-3df8-48a2-9dff-c8956cd7afae",
         "user":
         {"id":"99fcd706-e97d-436b-9cea-d7d4e1b27f21","name":"Junal Rahman","password":"fd6472da4daf8f923b6bc809749c69b8","username":"junal"}}
         */
        $('#userName').html(retrieveAdminData.user.name);

        /*
         Retrieve list of added users
         */
        $.ajax({
            type: 'GET',
            url: "/api/users",
            data: null,
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (userData) {
                if (userData.length > 0 ) {
                    $("#webUsers").empty();
                    var source = $("#webUsersTemplate").html();
                    var template = Handlebars.compile(source);
                    for (i = 0; i < userData.length; i++) {
                        var data = ({
                            objId: userData[i].id,
                            name: userData[i].name,
                            username: userData[i].username
                        });
                        $("#webUsers").append(template(data));
                    }
                }
            },
            error: function (httpObj, msg) {
                if(httpObj.status == 401) {
                    localStorage.clear();
                    window.location.href = "login.html"
                }

                $('.alert').hide();
                $('.alert-danger').html(msg.responseText).show(1000);
            }
        });

        /*
         Load oneir users from server
         */
        $.ajax({
            type: 'GET',
            url: "/api/oneirusers",
            data: null,
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (names) {
                if (names.length > 0) {
                    $("#oneirUsername").empty();
                    $('#oneirUsername')
                        .append($("<option></option>")
                            .attr("value", "")
                            .text("Existing Oneir users"));
                    $.each(names, function (key, value) {
                        $('#oneirUsername')
                            .append($("<option></option>")
                                .attr("value", value)
                                .text(value));
                    });
                }
            },
            error: function (msg) {
            }
        });

        $('#editUser').on('show.bs.modal', function (e) {
            $('.alert').hide();
            var username = null;
            username = $(e.relatedTarget).data('edit-id');
            $.ajax({
                type: 'GET',
                url: "/api/users/" + username,
                data: null,
                timeout: 6000,
                contentType: 'application/json',
                dataType: 'json',
                success: function (result) {
                    if (result) {
                        $('#EUusername').val(result.username);
                    } else {
                        /*
                         We can't edit it. Turn off the pop up.
                         */
                        $('#editUser').modal('hide');
                    }
                },
                error: function (msg) {
                }
            });
        });

        $("#editUserForm").submit(function (event) {
            event.preventDefault();
            var formData = $(this).serializeObject();

            var username = $('#EUusername').val();
            var password = $('#EUpassword').val();
            var confirmPassword = $('#EUcpassword').val();

            if (password.match(confirmPassword)) {
                $.ajax({
                    type: 'PUT',
                    url: apiUrl + "users/"+username,
                    data: JSON.stringify(formData),
                    timeout: 6000,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (msg) {
                        /*
                         Registration successful. Show success message.
                         */
                        $('.alert').hide();
                        $('.alert-success').html('Successfully updated!').show(1000);
                        $("#editUserForm").trigger('reset');
                    },
                    error: function (msg) {
                        $('.alert-danger').html(msg.responseText).show(1000);
                    }
                });
            } else {
                $('.alert').hide();
                $('.alert-danger').html("Password doesn't match.").show();
            }
        });

        $('#deleteUser').on('show.bs.modal', function (e) {
            var username = null;
            username = $(e.relatedTarget).data('delete-id');
            $('#deleteUser .btn').on('click', function (event) {
                if ($(this).attr("value") == "yes") {
                    /*
                     Delete this user
                     */
                    $.ajax({
                        type: 'DELETE',
                        url: "/api/users/" + username,
                        data: null,
                        timeout: 6000,
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (msg) {
                            if (msg) {
                                window.location.reload();
                            } else {
                                $('.alert').hide();
                                $('.alert-danger').html(msg.responseText).show(1000);
                            }
                        },
                        error: function (msg) {
                            $('.alert').hide();
                            $('.alert-danger').html(msg.responseText).show(1000);
                        }
                    });
                } else {
                    $('#deleteUser').modal('hide');
                }
            });
        });

        /*
         Add user
         */
        $("#addUserForm").submit(function (event) {
            event.preventDefault();
            var formData = $(this).serializeObject();

            var password = $('#AUpassword').val();
            var confirmPassword = $('#AUcpassword').val();

            if (password.match(confirmPassword)) {
                $.ajax({
                    type: 'POST',
                    url: "/api/users",
                    data: JSON.stringify(formData),
                    timeout: 6000,
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (msg) {
                        /*
                         Registration successful. Show success message.
                         */
                        $('.alert').hide();
                        $('.alert-success').html('Successfully registered!').show(1000);
                        $("#addUserForm").trigger('reset');

                        window.location.reload();
                        $('#addUser').modal('hide');
                    },
                    error: function (msg) {
                        $('.alert').hide();
                        if (msg.responseText == "user added") {
                            $('#addUserForm').trigger('reset');
                            $('.alert-success').html("User Added!").show(1000);
                            window.location.reload();
                            $('#addUser').modal('hide');
                        } else {
                            $('.alert-danger').html(msg.responseText).show(1000);
                        }
                    }
                });
            } else {
                $('.alert').hide();
                $('.alert-danger').html("Password doesn't match.").show();
            }
        });

        /*
         Logout user
         */
        $('#logout').on('click', function (event) {
            event.preventDefault();
            localStorage.clear();
            window.location.href = "login.html"
        });
    } else {
        /*
         Redirect to login page
         */
        window.location.href = "login.html"
    }
});