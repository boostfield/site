jQuery(function($) {
    (function () {
        var $frame = $('#sly-center');
        var $wrap  = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 2,

            scrollBy: 0,
            speed: 300,
            elasticBounds: 1,

            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            prev: $wrap.find('#prev'),
            next: $wrap.find('#next'),
        });

        $('#sly-center').sly('on', 'active', function (eventName, itemIndex ) {

            console.log(itemIndex);  // Sly position object
            switch(itemIndex){
                case 0:
                    break;
                case 1:
                    $("#title").text("音乐圣经iOS");
                default:
                    break;
            }
        });
        
        //reload sly when window  resizing
        $(window).resize(function(e) {
            $frame.sly('reload');
        });
    }());

});


