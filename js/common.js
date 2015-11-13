$(document).ready(function() {

    //Горизогтальный скролл
    $("#content-collage").mCustomScrollbar({
        axis:"x",
        theme:"dark-thin",
        autoExpandScrollbar:true,
        advanced:{autoExpandHorizontalScroll:true},
        autoHideScrollbar: true

    });
    //Горизогтальный скролл во всю высоту
    $(".content").css("height", $(window).height());
    $(".container").css("width", $(window).width());


    //Сетка
    $('#container').nested({
        minWidth: 250
    });

        $('#prepend').click(function(){
            var boxes = makeBoxes();
            $('#container').prepend(boxes).nested('prepend',boxes);
        })
        $('#append').click(function(){
            var boxes = makeBoxes();
            $('#container').append(boxes).nested('append',boxes);
        });




	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 4
	});
	owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});
	$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});

//Сайд бар во всю высоту
    function heightDetect(){
        $("#sidebar").css("height", $(window).height());
    }
    heightDetect();
    $(window).resize(function() {
        heightDetect();
    });

});

(function($) {

    skel.breakpoints({
        desktop: '(min-width: 737px)',
        wide: '(min-width: 1201px)',
        narrow: '(min-width: 737px) and (max-width: 1200px)',
        narrower: '(min-width: 737px) and (max-width: 1000px)',
        mobile: '(max-width: 736px)'
    });

    $(function() {

        var	$window = $(window),
            $body = $('body'),
            $document = $(document);

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function() {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });

        // Off-Canvas Sidebar.

        // Height hack.
        var $sc = $('#sidebar, #content'), tid;

        $window
            .on('resize', function() {
                window.clearTimeout(tid);
                tid = window.setTimeout(function() {
                    $sc.css('min-height', $document.height());
                }, 100);
            })
            .on('load', function() {
                $window.trigger('resize');
            })
            .trigger('resize');

        // Title Bar.
        $(
            '<div id="titleBar">' +
            '<a href="#sidebar" class="toggle"></a>' +
            '<span class="title">' + $('#logo').html() + '</span>' +
            '</div>'
        )
            .appendTo($body);

        // Sidebar
        $('#sidebar')
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'sidebar-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#titleBar, #sidebar, #main')
                .css('transition', 'none');

    });

})(jQuery);

