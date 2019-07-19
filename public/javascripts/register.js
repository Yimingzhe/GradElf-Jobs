$(function () {
    /**
     * if the entered email is inconsistent
     */
    $("#reg-confirm-email").on("blur", function(){
        var email1 = $("#reg-email").val();
        var email2 = $("#reg-confirm-email").val();
        if(email1 !== email2){
            $("#email-hint").html("&nbsp;&nbsp;The entered email is inconsistent");
        }else{
            $("#email-hint").html("");
        }
    });

    /**
     * if the entered password is inconsistent
     */
    $("#reg-confirm-password").on("blur", function () {
        var password1 = $("#reg-password").val();
        var password2 = $("#reg-confirm-password").val();
        if(password1 !== password2){
            $("#password-hint").html("&nbsp;&nbsp;The entered password is inconsistent");
        }else{
            $("#password-hint").html("");
        }
    });

    /**
     * submit the register form
     */
    $(".register-form").on("submit", function (event) {
        event.preventDefault();
        if($("#password-hint").html()!="" || $("#email-hint").html()!=""){
            alert("Please check your email or password!");
        }else{
            var formData = new FormData(this);
            sendAjaxQuery("/users/register", formData);
        }
    });

    /**
     * send the ajax query
     * @param url the request url
     * @param data the data that needs to be sent to the server
     */
    function sendAjaxQuery(url, data){
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'POST',
            // set processData and contentType when deal with file, otherwise "Illegal invocation" or "Internal Server Error"
            processData: false,
            contentType: false,
            success: function (data1) {
                var ret = data1;
                var code = data1.code;
                if(code === 1){
                    window.location.href = '/';
                }else if(code === 2){
                    window.location.href = '/';
                }else if( code === 0){
                    alert(ret.message);
                }
            },
            error: function (jqXHR, status, error) {
                alert('Error: ' + error.message);
            }
        });
    }

});