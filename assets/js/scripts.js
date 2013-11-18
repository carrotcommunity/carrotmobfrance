
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
        Countdown initializer
    */
    var now = new Date();
    var countTo = "2013/11/22 00:00";
    $('.timer').countdown(countTo, function(event) {
        var $this = $(this);
        switch(event.type) {
            case "seconds":
            case "minutes":
            case "hours":
            case "days":
            case "weeks":
            case "daysLeft":
                $this.find('span.'+event.type).html(event.value);
                break;
            case "finished":
                $this.hide();
                break;
        }
    });

    /*
        Tooltips
    */
    $('.social a.facebook').tooltip();
    $('.social a.twitter').tooltip();
    $('.social a.googleplus').tooltip();
    $('.social a.pinterest').tooltip();

});

