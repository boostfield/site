/*
 Escape Velocity by HTML5 UP
 html5up.net | @n33co
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */
//swiper
// <<<<<<< HEAD
// // var mySwiper = new Swiper ('.swiper-container',{
// //     prevButton:'left carousel-control',
// //     nextButton:'right carousel-control',
// // });
// =======
// var mySwiper = new Swiper ('.swiper-container',{
//     prevButton:'left carousel-control',
//     nextButton:'right carousel-control',
// });
// >>>>>>> origin/iss2
(function ($) {

    $(function () {
        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            $body.removeClass('is-loading');
        });

        // Fix: Placeholder polyfill.
        // $('form').placeholder();

        //fixed nav on the top
        // var elm = $('#nav');
        // var startPos = $(elm).offset().top;
        // $.event.add(window, "scroll", function () {
        //     var p = $(window).scrollTop();
        //     $(elm).css('position', ((p) > startPos) ? 'fixed' : 'absolute');
        //     $(elm).css('top', ((p) > startPos) ? '0px' : '');
        // });

        //gototop

        //show "gototop" directly,

        // $(document).ready(function () {
        //     $('#goToTop a').click(function () {
        //         $('html,body').animate({scrollTop:0},'show');
        //     });
        // });

        //show "gototop" indirectly
        $(document).ready(function () {
            $("#goToTop").hide()
            $(function () {
                $(window).scroll(function () {
                    if($(this).scrollTop()>1){
                        $("#goToTop").fadeIn();
                    }else {
                        $("#goToTop").fadeOut();
                    }
                });
            });
            $("#goToTop a").click(function () {
                $('html,body').animate({scrollTop:0},400);
                return false;
            });
        });



        // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            alignment: 'center',
            detach: false
        });

        // Off-Canvas Navigation.

        // Initialize WOW.js Scrolling Animations
        new WOW().init();
        $('.collapse').on('show.bs.collapse', function (e) {
            $('.collapse').not(e.target).removeClass('in');
        });

        $('.smooth').click(function () {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);
            return false;
        });

        $('.wechat').popover({
            container: '#contact',
            html: true,
            trigger: 'hover',
            placement: 'auto',
            delay: {"show": 500, "hide": 100},
            content: function () {
                return '<img width="150" height="150" src="' + $(this).data('img') + '" />';
            }
        });

    });
})(jQuery);


