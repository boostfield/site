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
						}

					},
					submitHandler: function (form) {
						$.ajax({
							type:"POST",
							url:"contact",
							data: "name="+$("#name").val()+"&email="+$("#email").val()+"&message="+$("#message").val(),
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

	//创建和初始化地图函数：
	function initMap(){
		createMap();//创建地图
		setMapEvent();//设置地图事件
		addMapControl();//向地图添加控件
		addMarker();//向地图中添加marker
	}

	//创建地图函数：
	function createMap(){
		var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
		var point = new BMap.Point(118.165639,24.518525);//定义一个中心点坐标
		map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
		window.map = map;//将map变量存储在全局
	}

	//地图事件设置函数：
	function setMapEvent(){
		map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
		map.enableScrollWheelZoom();//启用地图滚轮放大缩小
		map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
		map.enableKeyboard();//启用键盘上下左右键移动地图
	}

	//地图控件添加函数：
	function addMapControl(){
		//向地图中添加缩放控件
		var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
		map.addControl(ctrl_nav);
		//向地图中添加缩略图控件
		var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
		map.addControl(ctrl_ove);
		//向地图中添加比例尺控件
		var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
		map.addControl(ctrl_sca);
	}

	//标注点数组
	var markerArr = [{title:"在田信息技术有限公司",content:"在田信息技术有限公司",point:"118.166942|24.519133",isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}}
	];
	//创建marker
	function addMarker(){
		for(var i=0;i<markerArr.length;i++){
			var json = markerArr[i];
			var p0 = json.point.split("|")[0];
			var p1 = json.point.split("|")[1];
			var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
			var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
			map.addOverlay(marker);
			label.setStyle({
				borderColor:"#000000",
				color:"#000000",
				cursor:"pointer",
			});

			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
					this.openInfoWindow(_iw);
				});
				_iw.addEventListener("open",function(){
					_marker.getLabel().hide();
				})
				_iw.addEventListener("close",function(){
					_marker.getLabel().show();
				})
				label.addEventListener("click",function(){
					_marker.openInfoWindow(_iw);
				})
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
		}
	}
	//创建InfoWindow
	function createInfoWindow(i){
		var json = markerArr[i];
		var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
		return iw;
	}
	//创建一个Icon
	function createIcon(json){
		var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
		return icon;
	}

	initMap();//创建和初始化地图

})(jQuery);


