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
            mouseDragging: 0,
            touchDragging: 0,
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

            switch(itemIndex){
                case 0:
                    $("#title").hide().text("智能家居").fadeIn();
                    $("#content").hide().text("H5开发").fadeIn();
                    $wrap.find('#next').show();
                    $wrap.find('#prev').hide();
                    break;
                case 1:
                    $("#title").hide().text("聚募-专注早期创业项目的众筹融资平台").fadeIn();
                    $("#content").hide().text("Android APP开发").fadeIn();
                    $wrap.find('#next').show();
                    $wrap.find('#prev').show();
                    break;
                case 2:
                    $("#title").hide().text("音乐圣经-做古典音乐的百科全书").fadeIn();
                    $("#content").hide().text("全平台建设").fadeIn();
                    $wrap.find('#prev').show();
                    $wrap.find('#next').show();
                    break;
                case 3:
                    $("#title").hide().text("厦门大学法学院").fadeIn();
                    $("#content").hide().text("官方网站建设").fadeIn();
                    $wrap.find('#prev').show();
                    $wrap.find('#next').show();
                    break;
                case 4:

                    $("#title").hide().text("太棒").fadeIn();
                    $("#content").hide().text("官方网站建设").fadeIn();
                    $wrap.find('#prev').show();
                    $wrap.find('#next').show();
                    break;
                case 5:
                    $("#title").hide().text("玩鲜").fadeIn();
                    $("#content").hide().text("iOS&Android开发").fadeIn();
                    $wrap.find('#prev').show();
                    $wrap.find('#next').hide();
                    break;
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


