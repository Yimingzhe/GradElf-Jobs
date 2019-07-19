$(function () {

    // the default stars is 5
    var stars = 5;

    $("#review-star span").each(function (index) {
        // when the mouse enters a star, itself and the previous star will be lighten
        $(this).on("mouseenter", function () {
            $(this).css("color", "#f89e2d");
            $(this).prevAll().css("color", "#f89e2d");
        });

        // when the mouse out, all stars will be darken
        $(this).on("mouseout", function () {
            $(this).css("color", "#888");
            $(this).prevAll().css("color", "#888");
        });

        // when user clicks a star, itself and previous star will be lighten, and the number of stars will be stored
        $(this).on("click", function () {
            $(this).css("color", "#f89e2d");
            $(this).prevAll().css("color", "#f89e2d");
            $(this).nextAll("span").css("color", "#888");
            stars = index + 1;
            // once click, remove the mouseenter and mouseout event
            $("#review-star span").off("mouseout");
            $("#review-star span").off("mouseenter");
            $("#star").val(stars);
        });
    });

    // if edit the draft review, show the stars the user chose the last time
    if($("#star").val()){
        var starNum = $("#star").val()-1;
        $("#review-star span").eq(starNum).trigger("click");
    }

    $("#post").on("click", function (event) {
        $("#posted").val(1);
    });

    $("#review-container").on("submit", function (event) {
        event.preventDefault();
        var data = $(this).serialize();
        var loc = window.location.href;
        if(!window.location.href.substring(loc.lastIndexOf('/')+1).match("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")){
            loc = loc.substring(0, window.location.href.lastIndexOf('/'));
        }
        sendAjaxQuery(loc, data);
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
                var suffix = url.substring(url.lastIndexOf('/')+1);
                if(!suffix.match("^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")){
                    suffix = url.substring(url.indexOf("/review/")+8, url.lastIndexOf('/'));
                }
                if(dataR.message === "user"){
                    window.location.href = '/employeeInfo/' + suffix;
                }else{
                    window.location.href = '/companyInfo/' + suffix;
                }
            },
            error: function (jqXHR, status, err) {
                alert('Error: ' + err.message);
            }
        });
    }

});