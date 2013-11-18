
jQuery(document).ready(function() {

    /*
        Background slideshow
    */
    $('.coming-soon').backstretch([
      "images/backgrounds/1.jpg"
    , "images/backgrounds/2.jpg"
    , "images/backgrounds/3.jpg"
    ], {duration: 3000, fade: 750});

    /*
        Tooltips
    */
    $('.social a.facebook').tooltip();
    $('.social a.twitter').tooltip();
    $('.social a.googleplus').tooltip();
    $('.social a.pinterest').tooltip();

});

