$(function () {
    $("#post-job, #post-request").on("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(this);
        sendAjaxQuery(window.location.href, formData);
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
            processData: false,
            contentType: false,
            success: function (data1) {
                alert(data1.message);
                window.location.href = '/';
            },
            error: function (jqXHR, status, error) {
                alert('Error: ' + error.message);
            }
        });
    }

});