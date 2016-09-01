/**
 * Created by Junal on 2016-06-24.
 */
$(document).ready(function () {
    /*
     Let's check if this user is already signed in
     */
    if (localStorage.getItem('userData') != null) {
        var retrieveUserData = JSON.parse(localStorage.getItem('userData'));
        /*
         {"token":"6e0a4421-3df8-48a2-9dff-c8956cd7afae",
         "user":
         {"id":"99fcd706-e97d-436b-9cea-d7d4e1b27f21","name":"Junal Rahman","password":"fd6472da4daf8f923b6bc809749c69b8","username":"junal"}}
         */
        $('#userName').html(retrieveUserData.user.name);

        /*
         Logout user
         */
        $('#logout').on('click', function (event) {
            event.preventDefault();
            localStorage.clear();
            window.location.href = "login.html"
        });

        /*
            Retrieve company records
         */
        $.ajax({
            type: 'GET',
            url: "/api/users",
            data: null,
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (userData) {
                if(userData.length > 0) {
                    $("#companyListContainer").empty();
                    var source = $("#companyListTemplate").html();
                    var template = Handlebars.compile(source);
                    for (i = 0; i < userData.length; i++) {
                        var data = ({
                            companyName: userData[i]
                        });
                        $("#companyListContainer").append(template(data));
                    }
                }
            },
            error: function (msg) {
                $('.alert').hide();
                $('.alert-danger').html(msg.responseText).show(1000);
            }
        });

        /*
            On modal load, show the selected company name in the input box
         */
        $('#companyLogin').on('show.bs.modal', function (e) {
            if($(e.relatedTarget).attr('id').length > 0) {
                $('#companyName').val($(e.relatedTarget).attr('id'));
            }
        });

        /*
            On modal submission for company password
         */
        $("#companyPasswordForm").submit(function (event) {
            event.preventDefault();
            var formData = $('#companyPasswordForm').serializeObject();
            console.log(formData);
            $('#companyLogin').modal('hide');
        });

    } else {
        /*
         Redirect to login page
         */
        window.location.href = "login.html"
    }
});