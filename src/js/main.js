jQuery(function($) {

    var BRUSHED = window.BRUSHED || {};

    /* ==================================================
       Nav bar control
       ================================================== */
    var $lateral_menu_trigger = $('#cd-menu-trigger');
    //open-close lateral menu clicking on the menu icon
    $lateral_menu_trigger.on('click', function(event) {
        event.preventDefault();

        $lateral_menu_trigger.toggleClass('is-clicked');
        $navigation.toggleClass('lateral-menu-is-open');
        /*$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        	// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        	$('body').toggleClass('overflow-hidden');
        });*/
        $('#cd-lateral-nav').toggleClass('lateral-menu-is-open');

        //check if transitions are not supported - i.e. in IE9
        if ($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    });

    //open (or close) submenu items in the lateral menu. Close all the other open submenu items.
    // console.log($('.item-has-children').children('a')[0]);
    $('#defualtTag').addClass('submenu-open');
    $('#defualtUl').show();
    $('.item-has-children').children('a').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
    });


    /* ==================================================
       Mobile Navigation
       ================================================== */
    var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

    BRUSHED.mobileNav = function() {
        var windowWidth = $(window).width();

        if (windowWidth <= 979) {
            if ($('#mobile-nav').length > 0) {
                mobileMenuClone.insertAfter('#menu');
                $('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
            }
        } else {
            $('#navigation-mobile').css('display', 'none');
            if ($('#mobile-nav').hasClass('open')) {
                $('#mobile-nav').removeClass('open');
            }
        }
    }

    BRUSHED.listenerMenu = function() {
        $('#mobile-nav').on('click', function(e) {
            $(this).toggleClass('open');

            if ($('#mobile-nav').hasClass('open')) {
                $('#navigation-mobile').slideDown(500, 'easeOutExpo');
            } else {
                $('#navigation-mobile').slideUp(500, 'easeOutExpo');
            }
            e.preventDefault();
        });

        $('#menu-nav-mobile a').on('click', function() {
            $('#mobile-nav').removeClass('open');
            $('#navigation-mobile').slideUp(350, 'easeOutExpo');
        });
    }


    /* ==================================================
       Slider Options
       ================================================== */

    BRUSHED.slider = function() {
        $.supersized({
            // Functionality
            slideshow: 1, // Slideshow on/off
            autoplay: 1, // Slideshow starts playing automatically
            start_slide: 1, // Start slide (0 is random)
            stop_loop: 0, // Pauses slideshow on last slide
            random: 0, // Randomize slide order (Ignores start slide)
            slide_interval: 12000, // Length between transitions
            transition: 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed: 300, // Speed of transition
            new_window: 1, // Image links open in new window/tab
            pause_hover: 0, // Pause slideshow on hover
            keyboard_nav: 1, // Keyboard navigation on/off
            performance: 1, // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
            image_protect: 1, // Disables image dragging and right click with Javascript

            // Size & Position
            min_width: 0, // Min width allowed (in pixels)
            min_height: 0, // Min height allowed (in pixels)
            vertical_center: 1, // Vertically center background
            horizontal_center: 1, // Horizontally center background
            fit_always: 0, // Image will never exceed browser width or height (Ignores min. dimensions)
            fit_portrait: 1, // Portrait images will not exceed browser height
            fit_landscape: 0, // Landscape images will not exceed browser width

            // Components
            slide_links: 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
            thumb_links: 0, // Individual thumb links for each slide
            thumbnail_navigation: 0, // Thumbnail navigation
            slides: [ // Slideshow Images
                {
                    image: 'img/slider-images/image01.jpg',
                    title: '<div class="slide-content"></div>',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/image05.jpg',
                    title: '<div class="slide-content"></div>',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/image03.jpg',
                    title: '<div class="slide-content"></div>',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/image04.jpg',
                    title: '<div class="slide-content"></div>',
                    thumb: '',
                    url: ''
                }
            ],

            // Theme Options
            progress_bar: 0, // Timer for each slide
            mouse_scrub: 0

        });

    }


    /* ==================================================
       Navigation Fix
       ================================================== */

    BRUSHED.nav = function() {
        $('.sticky-nav').waypoint('sticky');
    }




    /* ==================================================
       FancyBox
       ================================================== */

    BRUSHED.fancyBox = function() {
        if ($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0) {

            $(".fancybox").fancybox({
                padding: 0,
                beforeShow: function() {
                    this.title = $(this.element).attr('title');
                    this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
                },
                helpers: {
                    title: {
                        type: 'inside'
                    },
                }
            });

            $('.fancybox-media').fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                helpers: {
                    media: {}
                }
            });
        }
    }


    /* ==================================================
       Contact Form
       ================================================== */

    BRUSHED.contactForm = function() {
        $("#contact-submit").on('click', function() {
            $contact_form = $('#contact-form');

            var fields = $contact_form.serialize();

            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: fields,
                dataType: 'json',
                success: function(response) {

                    if (response.status) {
                        $('#contact-form input').val('');
                        $('#contact-form textarea').val('');
                    }

                    $('#response').empty().html(response.html);
                }
            });
            return false;
        });
    }



    /* ==================================================
       Menu Highlight
       ================================================== */

    BRUSHED.menu = function() {
        $('#menu-nav, #menu-nav-mobile').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 750,
            scrollOffset: 30,
            scrollThreshold: 0.5,
            easing: 'easeOutExpo',
            filter: ':not(.external)'
        });
    }

    /* ==================================================
       Next Section
       ================================================== */

    BRUSHED.goSection = function() {
        $('#nextsection').on('click', function() {
            $target = $($(this).attr('href')).offset().top - 30;

            $('body, html').animate({
                scrollTop: $target
            }, 750, 'easeOutExpo');
            return false;
        });
    }

    /* ==================================================
       GoUp
       ================================================== */

    BRUSHED.goUp = function() {
        $('#goUp').on('click', function() {
            $target = $($(this).attr('href')).offset().top - 30;

            $('body, html').animate({
                scrollTop: $target
            }, 750, 'easeOutExpo');
            return false;
        });
    }


    /* ==================================================
    	Scroll to Top
    	================================================== */

    BRUSHED.scrollToTop = function() {
        var windowWidth = $(window).width(),
            didScroll = false;

        var $arrow = $('#back-to-top');

        $arrow.click(function(e) {
            $('body,html').animate({
                scrollTop: "0"
            }, 750, 'easeOutExpo');
            e.preventDefault();
        })

        $(window).scroll(function() {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                didScroll = false;

                if ($(window).scrollTop() > 1000) {
                    $arrow.css('display', 'block');
                } else {
                    $arrow.css('display', 'none');
                }
            }
        }, 250);
    }

    /* ==================================================
       Thumbs / Social Effects
       ================================================== */

    BRUSHED.utils = function() {

        $('.item-thumbs').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

        $('.image-wrap').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

        $('#social ul li').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

    }

    /* ==================================================
       Accordion
       ================================================== */

    BRUSHED.accordion = function() {
        var accordion_trigger = $('.accordion-heading.accordionize');

        accordion_trigger.delegate('.accordion-toggle', 'click', function(event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            } else {
                accordion_trigger.find('.active').addClass('inactive');
                accordion_trigger.find('.active').removeClass('active');
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    }

    /* ==================================================
       Toggle
       ================================================== */

    BRUSHED.toggle = function() {
        var accordion_trigger_toggle = $('.accordion-heading.togglize');

        accordion_trigger_toggle.delegate('.accordion-toggle', 'click', function(event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            } else {
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    }

    /* ==================================================
       Tooltip
       ================================================== */

    BRUSHED.toolTip = function() {
        $('a[data-toggle=tooltip]').tooltip();
    }


    /* ==================================================
    	Init
    	================================================== */

    BRUSHED.slider();

    $(document).ready(function() {
        Modernizr.load([{
            test: Modernizr.placeholder,
            nope: './js/placeholder.js',
            complete: function() {
                if (!Modernizr.placeholder) {
                    // Placeholders.init({
                    // live: true,
                    // hideOnFocus: false,
                    // className: "yourClass",
                    // textColor: "#999"
                    // });
                }
            }
        }]);

        // Preload the page with jPreLoader
        $('body').jpreLoader({
            splashID: "#jSplash",
            showSplash: true,
            showPercentage: true,
            autoClose: true,
            splashFunction: function() {
                $('#circle').delay(250).animate({
                    'opacity': 1
                }, 500, 'linear');
            }
        });

        //初始化地图
        BRUSHED.initMap = function() {
            // 百度地图API功能
            ShowMap('114.199631,22.664393', '深圳市骊驰家具有限公司', '山塘工业区', '086-0755-89765854', '086-0755-89765854', '15');

            function getInfo(id) {
                $.ajax({
                    type: "POST",
                    url: "WebUserControl/Contact/GetInfo.ashx",
                    cache: false,
                    async: false,
                    data: {
                        ID: id
                    },
                    success: function(data) {
                        data = eval(data);
                        var length = data.length;
                        if (length > 0) {
                            ShowMap(data[0]["Image"], data[0]["NewsTitle"], data[0]["Address"], data[0]["Phone"], data[0]["NewsTags"], data[0]["NewsNum"]);
                        }
                    }
                });
            }

            function ShowMap(zuobiao, name, addrsee, phone, chuanzhen, zoom) {
                var arrzuobiao = zuobiao.split(',');
                var map = new BMap.Map("allmap");
                map.centerAndZoom(new BMap.Point(arrzuobiao[0], arrzuobiao[1]), zoom);
                map.addControl(new BMap.NavigationControl());
                var marker = new BMap.Marker(new BMap.Point(arrzuobiao[0], arrzuobiao[1]));
                map.addOverlay(marker);
                var infoWindow = new BMap.InfoWindow('<p style="color: #bf0008;font-size:14px;">' + name + '</p><p>地址：' + addrsee + '</p><p>电话：' + phone + '</p><p>传真：' + chuanzhen + '</p>');
                marker.addEventListener("click", function() {
                    this.openInfoWindow(infoWindow);
                });
                marker.openInfoWindow(infoWindow);
            }
        }


        BRUSHED.changeProduct = function() {

            /*读取json*/
            $.getJSON('./data/furniture.json', function(data) {
                var _data = data;
                readString("SOFA", 1);
                /*点击事件*/
                $('.sub-menu').children('li').on('click', function() {
                    $('#thumbs').empty();
                    var furnitureName = $(this).parent().prev().text();
                    var enName;
                    var index = $(this).index();
                    // console.log(index);
                    if (furnitureName == "沙发") {
                        enName = "SOFA";
                    } else if (furnitureName == "椅子") {
                        enName = "CHAIR";
                    } else if (furnitureName == "茶几") {
                        enName = "OCCASIONAL";
                    } else if (furnitureName == "桌子") {
                        enName = "TABLE";
                    } else if (furnitureName == "床") {
                        enName = "BED";
                    } else if (furnitureName == "柜子") {
                        enName = "CABINET";
                    } else if (furnitureName == "配件") {
                        enName = "ACCESSORIES";
                    }
                    readString(enName, index);
                });

                function readString(_str, index) {
                    // console.log(_data[_str][index]);
                    var obj = _data[_str][index];
                    var name = obj.name;
                    var describe_cn = obj.describe_cn;
                    var describe_en = obj.describe_en;
                    var product = obj.product;
                    // console.log(describe_en);
                    //遍历数组
                    for (var i = 0; i < product.length; i++) {
                        var _obj = product[i];
                        var _title = _obj.title;
                        var _thumb = _obj.thumb;
                        var _largeImg = _obj.largeImg;
                        // var _describe = _obj.describe_cn;

                        var dom = [
                            '<li class="item-thumbs span3 design">',
                            '<a class="hover-wrap fancybox" data-fancybox-group="gallery" title=' + _title + ' ',
                            'href=' + _largeImg + '>',
                            '<span class="overlay-img"></span>',
                            '<span class="overlay-img-thumb font-icon-plus"></span>',
                            '</a>',
                            '<img src=' + _thumb + ' alt=' + describe_cn + '>',
                            '</li>'
                        ].join('');

                        $('#thumbs').append(dom);
                    }
                    //
                    BRUSHED.fancyBox();
                }
            });


            //读取EVENT
            var modalApp;
            $.getJSON('./data/event.json', function(data) {
                var _data = data;
                // console.log(_data);
                var app1 = new Vue({
                    el: '#appEvent',
                    data: {
                        events: _data
                    },
                    methods: {
                        showEventModal: function(id) {
                            app2.title = _data[id].title;
                            app2.img = _data[id].img;
                            app2.copy = _data[id].copy;
                        }
                    }
                });

                var app2 = new Vue({
                    el: '#eventDetail',
                    data: _data[0]
                })
                modalApp = app2;

            });

            //读取新闻
            $.getJSON('./data/news.json', function(data) {
                var _data = data;
                console.log(_data);

                var appNews = new Vue({
                    el: '#newsApp',
                    data: {
                        news: _data
                    },
                    methods: {
                        showNewsModal: function(id) {
                            // console.log(id);
                            modalApp.title = _data[id].title;
                            modalApp.img = _data[id].img;
                            modalApp.copy = _data[id].copy;
                        }
                    }
                });

            });

        };



        BRUSHED.nav();
        BRUSHED.mobileNav();
        BRUSHED.listenerMenu();
        BRUSHED.menu();
        BRUSHED.goSection();
        BRUSHED.goUp();
        BRUSHED.changeProduct();
        // BRUSHED.contactForm();
        BRUSHED.scrollToTop();
        BRUSHED.utils();
        BRUSHED.accordion();
        BRUSHED.toggle();
        BRUSHED.toolTip();
        BRUSHED.initMap();

    });

    $(window).resize(function() {
        BRUSHED.mobileNav();
    });

});
