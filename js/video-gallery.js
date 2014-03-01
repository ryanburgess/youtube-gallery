(function($) {
    "use strict";

    var query = "(-webkit-min-device-pixel-ratio: 1.5),\
    (min--moz-device-pixel-ratio: 1.5),\
    (-o-min-device-pixel-ratio: 3/2),\
    (min-device-pixel-ratio: 1.5),\
    (min-resolution: 144dpi),\
    (min-resolution: 1.5dppx)";
    
    function ytThumbs(section, vidId){
        var imgUrl;
        var vidTitle;
        $.ajax({
            type: "GET",
                url: "http://gdata.youtube.com/feeds/api/videos/"+ vidId +"?v=2&alt=json",
                cache: false,
                dataType:"jsonp",
                success: function(result){
                    // If retina screen use larger image
                    if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
                        imgUrl = result.entry.media$group.media$thumbnail[1].url;
                    } else {
                        imgUrl = result.entry.media$group.media$thumbnail[0].url;
                    }
                    vidTitle = result.entry.title.$t;
                    // push video thumbnails
                    $("."+section).append("<li><a href='https://www.youtube.com/embed/"+ vidId +"'' class='video-thumbnail'><img src='"+ imgUrl +"' alt='"+ vidTitle +" Thumbnail' /><span class='icon' lang='en'>Play</span></a></li>");

              }
        });
    }

    $.ajax({
        type: "POST",
        url: "video.json",
        dataType: "json",
        cache: false,
        success: function(data){
            var videos = data.videos;
            var html = "";
            console.log(data)

            for (var i = 0; i < videos.length; i++){
                var section = videos[i].section;
                var video_id = videos[i].video_id;

                var className = section.toLowerCase();
                className = className.replace("'", "");
                className = className.replace(" ", "-");

                var sectionTitle = section.charAt(0).toUpperCase() + section.slice(1);

                html += "<h2>"+ sectionTitle +"</h2>";
                html+= "<ul class='"+ className +"'>";

                for(var a = 0; a < videos[i].video_id.length; a++){
                   var vidId = videos[i].video_id[a];
                   ytThumbs(className, vidId)
                }

                html += "</ul>";
                
            }
            // add videos to html
            $(".videos").html(html);

        }
    });

    //modal windows
    $("body").on("click", ".video-thumbnail", function(e) {
        //load modal mask
        $("<div id='mask'></div>").appendTo("body");
        
        //remove existing modal window
        $("#modal-window").remove();

        var content;

        //Checks if href points to media or a div that is defined in the DOM
        if ($(this).attr("href").match("^#")) {
            var contentID = $(this).attr("href");
            content = $(contentID).html();
        } else {
            content = $(this).attr("href");
        }
        var vidParameters = "?hd=1&autoplay=1&showinfo=0";
        //if youtube video or images passed into modal
        if (content.indexOf("youtube.com/embed/") !== -1){
            content = "<iframe src='" + content + vidParameters + "' allowfullscreen='allowfullscreen'></iframe>";
        } else if (content.indexOf("jpg") !== -1 || content.indexOf("png") !== -1){
            content = "<img src='"+ content +"'>";
        }

        //load modal window with content passed
        $("<div id='modal-window' class='window'>" + content + "<a href='#' class='close'>X</a></div>").appendTo("body");

        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        $("#mask").css({"width": maskWidth, "height": maskHeight})
                  .show();

        $(".window").css("top", ($(window).height() - $(".window").height()) / 2 + $(window).scrollTop() + "px")
                    .css("left", ($(window).width() - $(".window").width()) / 2 + $(window).scrollLeft() + "px")
                    .fadeIn();

        e.preventDefault();
        return false;
    });

    var removeItems = function () {
        $("#mask, .window").fadeOut();
        $(".window iframe").remove();
        setTimeout(function () {
            $("#mask, .window").remove();
        }, 500);
    };

    //if close button is clicked
    $("body").on("click", ".window .close", function (e) {
        //Cancel the link behavior
        e.preventDefault();
        removeItems();
    });

    //if mask is clicked
    $("body").on("click", "#mask", function (e) {
        //Cancel the link behavior
        e.preventDefault();
        removeItems();
    });

    // Change modal window size repsonsive
    function checkWindowSize() {
        $(".window").css("top", ($(window).height() - $(".window").height()) / 2 + $(window).scrollTop() + "px")
                    .css("left", ($(window).width() - $(".window").width()) / 2 + $(window).scrollLeft() + "px");
        $("#mask").css({"width":    $(window).width(), "height": $(document).height()});
    }
    $(window).bind("resize", checkWindowSize);


}(jQuery));