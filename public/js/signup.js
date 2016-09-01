/**
 * Created by Junal on 2016-06-24.
 */
$(document).ready(function () {
    /*
     Signup/Register user
     */
    $("#signup").submit(function (event) {
        event.preventDefault();
        var formData = $(this).serializeObject();
        $.ajax({
            type: 'POST',
            url: "register",
            data: JSON.stringify(formData),
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (msg) {
                /*
                    Registration successful. Show success message.
                 */
                $('.alert').hide();
                $('.alert-success').html('Successfully registered! Login from <a href="../login.html">here</a>').show(2000);
                $("#signup").trigger('reset');
            },
            error: function (msg) {
                $('.alert').hide();
                $('.alert-danger').html(msg.responseText).show(1000);
            }
        });
    });
});