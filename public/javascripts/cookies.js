$(function(){
   var cookies = setTimeout(function () {
        $("#cookie-alert").fadeOut();
    }, 2000);
    $("#cookie-alert").on("mouseover", function () {
        clearTimeout(cookies);
    });
    $("#cookie-alert").on("mouseout", function () {
        cookies = setTimeout(function () {
            $("#cookie-alert").fadeOut();
        }, 1000);
    });
});