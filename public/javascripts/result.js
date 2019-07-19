$(function () {
    // sort by date or sort by salary
    $("#sortBySalary a").on("click",function(){
        this.href = sortHandler("&sort=","salary");
    });
    $("#soryByDate a").on("click", function () {
        var address = sortHandler("&sort=","date");
        this.href = address.replace("&sort=date","");
    })

    // filter by job type
    $("#graduate a").on("click", function(){
        this.href = sortHandler("&jobType=","Graduate");
    });

    $("#internship a").on("click", function(){
        this.href = sortHandler("&jobType=","Internship");
    });

    $("#part-time a").on("click", function () {
        this.href = sortHandler("&jobType=", "Part-time");
    });

    // filter by post date
    $("#1day a").on("click", function () {
        this.href = sortHandler("&postDate=", "1");
    });

    $("#3days a").on("click", function () {
        this.href = sortHandler("&postDate=", "3");
    });

    $("#7days a").on("click", function () {
        this.href = sortHandler("&postDate=", "7");
    });

    $("#others a").on("click", function () {
        this.href = sortHandler("&postDate=", "others");
    });

    // filter by cities
    var cities = ["All", "London", "Edinburgh", "Cardiff", "Leeds", "Sheffield", "Manchester",
    "Oxford", "Cambridge", "Glasgow", "Liverpool", "Birmingham"];
    $("#cities li").on("click", function () {
       var index = $(this).index() - 1;
       window.location.href = sortHandler("&city=", cities[index]);
       return false;
    });

    /**
     * get the new url according to the click of user
     * @param type the type of filter (eg. "&jobType=")
     * @param value the value of the type (eg. "graduate")
     * @return newUrl the new url according to the click of user
     */
    function sortHandler(type, value){
        // if the type has been selected
        var origin = window.location.href;
        var newUrl;
        if(window.location.href.indexOf(type) !== -1){
            if(window.location.href.indexOf(type + value) !== -1){
                // the type selected by the user is already selected
                newUrl = origin;
            }else {
                // clear the selected jobType, and set a new job type
                var str = origin.substring(origin.indexOf(type));
                if(str.indexOf("&",1) !== -1){
                    str = str.substring(0, str.indexOf("&",1));
                }
                newUrl = origin.replace(str,type+value);
            }
        }else{
            //  the type hasn't been selected
             newUrl = origin + type + value;
        }
        return newUrl;
    }
})