$(function () {
    var photoContainer = $(".small-photo ul li.small-pic");
    var counter = -1;
    var isMore = true;

    // the photoList array is to collect all photos
    var photoList = [];
    for(var i=0; i<$("#photoList li").length; i++){
        photoList.push($("#photoList li")[i].innerText);
    }

    // show the photos need to be displayed for the first time
    if(photoList.length > 0){
        $(".big-photo").css({"background": "url("+ photoList[0] + ") no-repeat",
            "background-position": "center center", "background-size": "center center", "backgroundSize":"cover"});
    }
    rightImgs(photoContainer,photoList);

    // show next photos when user click on the "small-photo-btn2 "button
    $("#small-photo-btn2").on("click", function () {
        rightImgs(photoContainer,photoList);
    });

    // show previous photos when user click on the "small-photo-btn1 "button
    $("#small-photo-btn1").on("click", function () {
        leftImgs(photoContainer,photoList);
    });

    // if click the small photo, corresponding big photo should be shown
    photoContainer.each(function () {
        $(this).on("click", function () {
            var photoUrl = $(this).css("backgroundImage");
            if(photoUrl !== "none"){
                $(".big-photo").css({"background": ""+photoUrl+"","background-position": "center center",
                    "background-size": "center center", "backgroundSize":"cover"});
                // set a border to the small image currently being displayed
                $(this).css("border", "3px solid #f89e2d");
                $(this).siblings().css("border", "none");
            }

        });
    });
    
    /**
     * to show the next five photos
     * @param photoContainer the container to show all small photos
     * @param photoList photoList the array of photos which need to be shown
     */
    function rightImgs(photoContainer,photoList) {
        if(isMore){
            $("#small-photo-btn1 span").css("color","#2a3c54");
            photoContainer.each(function () {
                $(this).css("border", "none");
            });
            counter++;
            photoContainer.each(function (index) {
                if(index+counter*5 < photoList.length){
                    var photoUrl = "url("+ photoList[index+counter*5] + ") no-repeat";
                    $(this).css({"background": photoUrl,"background-position": "center center",
                        "background-size": "center center", "backgroundSize":"cover"});
                }else{
                    $(this).css("backgroundImage", "none");
                }
            });
            if((counter+1)*5 >= photoList.length){
                isMore = false;
            }
            if(!isMore){
                $("#small-photo-btn2 span").css("color","lightgrey");
            }
        }
    }

    /**
     * to show the previous five photos
     * @param photoContainer the container to show all small photos
     * @param photoList the array of photos which need to be shown
     */
    function leftImgs(photoContainer,photoList) {
        if(counter !== 0){
            photoContainer.each(function () {
                $(this).css("border", "none");
            });
            $("#small-photo-btn2 span").css("color","#2a3c54");
            isMore = true;
            counter--;
            photoContainer.each(function (index) {
                var photoUrl = "url("+ photoList[counter*5+index] + ") no-repeat";
                $(this).css({"background": photoUrl,"background-position": "center center",
                    "background-size": "center center", "backgroundSize":"cover"});
            });
            if(counter === 0){
                $("#small-photo-btn1 span").css("color","lightgrey");
            }
        }
    }

    $(".companyInfo-photos-btn").on("submit", function (event) {
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
            // set processData and contentType when deal with file, otherwise "Illegal invocation" or "Internal Server Error"
            processData: false,
            contentType: false,
            success: function (data1) {
               window.location.href = url;
            },
            error: function (jqXHR, status, error) {
                alert('Error: ' + error.message);
            }
        });
    }

});