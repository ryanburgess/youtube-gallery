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
                    //console.log(result)
                    // If retina screen use larger image
                   /* if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
                        imgUrl = result.entry.media$group.media$thumbnail[1].url;
                    } else {
                        imgUrl = result.entry.media$group.media$thumbnail[0].url;
                    }*/
                    vidTitle = result.entry.title.$t;
                    vidId(vidTitle);

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

                html += "<h2>"+ section +"</h2>";
                html+= "<ul>";

                for(var a = 0; a < videos[i].video_id.length; a++){
                   var vidId = videos[i].video_id[a];
                   //var videoData = ytThumbs(vidId);
                   //var videoTitle = videoData.title;
                   var videoData = ytThumbs(vidId);
                   var videoTitle = videoData;
    
                   console.log("test " + videoTitle)
                   html += "<li>"+ "TEST " + videoTitle +"</li>";
                }

                html += "</ul>";
                
            }
            // add videos to html
            $(".videos").html(html);

        }
    });
}(jQuery));