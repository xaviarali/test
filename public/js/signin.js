/**
 * Created by Junal on 2016-06-24.
 */
$(document).ready(function () {
    /*
     Signup/Register user
     */
    $("#signin").submit(function (event) {
        event.preventDefault();
        var formData = $(this).serializeObject();
        $.ajax({
            type: 'POST',
            url: "/login",
            data: JSON.stringify(formData),
            timeout: 6000,
            contentType: 'application/json',
            dataType: 'json',
            success: function (userData) {
                /*
                    Login successful.
                 */
                $('.alert').hide();
                
                if(userData.user.admin)
                {
                    /*
                        If user is an admin
                     */
                    localStorage.clear();
                    localStorage.setItem('adminData', JSON.stringify(userData));
                    window.location.href = "admin_home.html"
                }else {
                    /*
                     Let's store information in the localStorage
                     and then redirect.
                     */
                    var username = $("#username").val();

                    // $("#username").attr("disabled","disabled");
                    // $("#mheading").html(username + ",Please select your company:");

                    $("#passdiv").hide();
                    $("#reme").hide();

                    $("#sbutton").val("Continue");
                    $(document).on('click','#sbutton',function(e){

                             console.log($('#cs').find(':selected').val());
                            e.preventDefault();
                            $.get('/setCompany',{'compid':$('#cs').find(':selected').val(),'compname':$('#cs').find(':selected').text()},function(){
                                     window.location.href = "index.html";

                              });      
                           // window.location.href = "index.html";

                    });

                    $.get("/ms",function(data){
                           var array = data.split(",");
                          var html = "<select class=\"form-control selectpicker\" id=\"cs\">";
                         for(var i =0; i<array.length;i++)
                         {
                             var cmp = array[i].split("#");
                             html = html + "<option value=\""+cmp[1]+"\" >"+cmp[0]+"</option>";
                         }
                          html = html + "</select>";
                        $("#moptions").html(html);
						$('.selectpicker').selectpicker();
                       
                    });
                    
                    localStorage.clear();
                    localStorage.setItem('userData', JSON.stringify(userData));
                   // window.location.href = "index.html"
                }

            },
            error: function (msg) {
                $('.alert').hide();
                $('.alert-danger').html(msg.responseText).show(1000);
            }
        });
    });
});
