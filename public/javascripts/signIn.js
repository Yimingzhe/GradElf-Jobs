$(function () {
    
    $(".sign-in form").on("submit", function (event) {
        event.preventDefault();
        var data = $(this).serialize();
        sendAjaxQuery(window.location.href, data);
    });

    /**
     * send the ajax query
     * @param url the request url
     * @param data the data that needs to be sent to the server
     */
    function sendAjaxQuery(url, data) {
        $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: 'POST',
            success: function (dataR) {
                var ret = dataR;
                var code = ret.code;
                if(code === 0){
                    window.location.href = '/';
                }else if(code === 100){
                    window.location.href = '/';
                }else if(code === 1){
                    alert(ret.message);
                }
            },
            error: function (jqXHR, status, err) {
                alert('Error: ' + err.message);
            }
        });
    }
    
});