(function($) {
    "use strict";
    
    function ytThumbs(vidId){
        var imgUrl;
        $.ajax({
            type: "GET",
                url: "http://gdata.youtube.com/feeds/api/videos/"+ videoID +"?v=2&alt=json",
                cache: false,
                dataType:"jsonp",
                success: function(result){
                    // If retina screen use larger image
                    if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
                        imgUrl = result.entry.media$group.media$thumbnail[1].url;
                    } else {
                        imgUrl = result.entry.media$group.media$thumbnail[0].url;
                    }
                    var vidTitle = result.entry.title.$t;
                   // $(".more-learn-videos a[href='" + video +"']").html("<img src='"+ imgUrl +"' alt='"+ vidTitle +" Thumbnail' height='180' /><span class='icon' lang='en'>Play</span>");
              }
        });
    }
    
}(jQuery));