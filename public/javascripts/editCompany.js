$(function () {
    $(".edit-form").on("submit", function (event) {
        event.preventDefault();
        var data = $(this).serialize();
        sendAjaxQuery('/editCompany', data);
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
                window.location.href = '/recruiterProfile';
            },
            error: function (jqXHR, status, err) {
                alert('Error: ' + err.message);
            }
        });
    }
});