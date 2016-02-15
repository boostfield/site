/*
	Escape Velocity by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				detach: false
			});

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="#navPanel" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');
				// Initialize WOW.js Scrolling Animations
				new WOW().init();
				$("#form").validate({
					ignore: ":hidden",
					rules: {
						name: {
							required: true,
						},
						email: {
							required: true,
							email: true
						},
						type: {
							required: true
						}
					},
					submitHandler: function (form) {
						$.ajax({
							type:"POST",
							url:"contact",
							data: "name="+$("#name").val()+"&email="+$("#email").val()+"&type="+$("#type").val()+"&message="+$("#message").val(),
							success:function(msg){
								document.getElementById("name").value = "";
								document.getElementById("email").value = "";
								document.getElementById("message").value = "";
								alert("您的请求已经提交成功,我们会及时回复您");// 如果有必要，可以把msg变量的值显示到某个DIV元素中
							},
							error: function(jqXHR, textStatus, errorThrown){
								alert('error ' + textStatus + " " + errorThrown);
							}
						});
						return false; // required to block normal submit since you used ajax
					}

				});

	});

})(jQuery);


