/*jshint jquery:true */
/*global $:true */

var $ = jQuery.noConflict();

$(document).ready(function() {
	"use strict";
	/* global google: false */

    /* ==============================================
        Consistent template edits to each page
    =============================================== */
    document.title="Dashiel Carrera";
    
    $('.policy-box').html(`<ul>
                <li><span>© Dashiel Carrera 2022. All rights reserved. </span></li>
                <!--li><a href="mailto:dashiel.carrera@gmail.com">dashiel.carrera@gmail.com</a></li-->
              </ul>`);
    $('.fixed-footer-social').html(`<ul>
                <li><a href="https://twitter.com/dashiel_carrera" target="_blank"><i class="fa fa-twitter"></i></a></li>
                <li><a href="https://github.com/dash-carrera" target="_blank"><i class="fa fa-github"></i></a></li>
                <li><a href="https://www.linkedin.com/in/dashiel-carrera/" target="_blank"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="mailto:dashiel.carrera@gmail.com" target="_blank"><i class="fa fa-envelope"></i></a></li>
              </ul>`);
    $('.nav').html(`<li><a href="index.html#top">Home</a></li>
            <li><a href="portfolio-pages/deer.html">DEER</a></li>
            <li><a href="index.html#portfolio-section">Portfolio</a></li>
             <li><a href="publications.html">Publications</a></li>
             <li><a href="index.html#about-us-sction">About</a></li>
            <li><a href="cv.html">CV</a></li>`);

    /* ==============================================
        Full height home-section
    =============================================== */

        var windowHeight = $(window).height(),
              topSection = $('#hero-section'),
              headerHeight = $(".navbar").outerHeight(),
              calculatedHeight = windowHeight - headerHeight;
        topSection.css('height', calculatedHeight);

        $(window).resize(function(){
            var windowHeight = $(window).height(),
          headerHeight = $(".navbar").outerHeight(),
          calculatedHeight = windowHeight - headerHeight;
          topSection.css('height', calculatedHeight);
        });

    /* ==============================================
        Hero slider
    =============================================== */


        window.mobilecheck = function() {
          var check = false;
          (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        };

        console.log(window.mobilecheck());

        $(window).load(function(){
            $("video").each(function () { this.play(); });

        if (window.mobilecheck())
            $('#hero-slider-section').remove();

        });


        /*$(window).load(function() {
            $("video").each(function () { this.play(); });

            var isMobile = $.browser == device;
            if (isMobile.matches){
                console.log("This is mobile");

                $('.slides-container')[0].innerHTML = '<li style="background-image:url('+
                    '\'assets/images/logo.png\');\">'+
                                  '<div class=\"overlay-slider\"></div></li>';

            }
        });*/

    /* ==============================================
    superslider swipe on mobile devices
    =============================================== */

        $('#slides').swipe( {
            swipeLeft:function() {
                $(this).superslides('animate', 'next');
            },

            swiperight:function() {
                $(this).superslides('animate', 'prev');
            }
        });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */


        $('.one-page-nav').find('a').addClass('section-scroll');

        $('.section-scroll').on('click', function(e) {
            var anchor = $(this),
                anchorAttr = anchor.attr('href');

            $('html, body').animate({
                scrollTop: $(anchorAttr).offset().top -62
            }, 1000);

            e.preventDefault();
        });


    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });

    /* ==============================================
        Parallax
    =============================================== */

        $.stellar({
            responsive: true,
            horizontalScrolling: false,
            verticalOffset: 0
        });

    /* ==============================================
        BxSlider Testimonial
    =============================================== */

        $(".testimonials-slider").bxSlider({
            auto: true,          // Boolean:  (true/false)
            pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            adaptiveHeight: true,
            controls: false,
            useCSS: false        // Boolean:  (true/false)
        });

    /* ==============================================
        Counter increment
    =============================================== */

        function countUp() {
            var dataperc;
            $('.statistic-percent').each(function(){
                dataperc = $(this).attr('data-perc'),
                $(this).find('.percentfactor').delay(6000).countTo({
                    from: 0,                 // number to begin counting
                    to: dataperc,
                    speed: 1000,             // ms
                    refreshInterval: 10,
                });
            });
        }

        $('.statistic-percent').waypoint(function() {
            countUp();
        },
        {
            offset: '95%',
            triggerOnce: true
        });

    /* ==============================================
        Skills bar
    =============================================== */

        $('.progress-bar').each(function() {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
            });
        });

        // Example with multiple objects
        $('.zoom-gallery').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },

            image: {
              // options for image content type
              titleSrc: 'title'
            },
             mainClass: 'mfp-with-zoom', // this class is for CSS animation below
               zoom: {
                 enabled: true, // By default it's false, so don't forget to enable it
                 duration: 300, // duration of the effect, in milliseconds
                 easing: 'ease-in-out', // CSS transition easing function
                 opener: function(openerElement) {
                   return openerElement.is('img') ? openerElement : openerElement.find('img');
                 }
               }
        });

    /* ==============================================
        Google Map
    ===============================================

        var mapLocation = new google.maps.LatLng(34.031428,-118.2071542,17);
        var $mapis = $('#map');
        if ($mapis.length > 0) {
            var map;
            map = new GMaps({
                streetViewControl : true,
                overviewMapControl: true,
                mapTypeControl: true,
                zoomControl : true,
                panControl : true,
                scrollwheel: false,
                center: mapLocation,
                el: '#map',
                zoom: 16,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            });
            var image = new google.maps.MarkerImage('assets/images/map-icon.png');
            map.addMarker({
                position: mapLocation,
                icon: image,
                title: 'Vortex',
            });
        }*/

    /* ==============================================
        Contact Form
    =============================================== */

    $('#contactform').submit(function(){

        var action = $(this).attr('action');

        $("#alert").slideUp(750,function() {
            $('#alert').hide();

        $('#submit')
            .after('<img src="assets/images/ajax-loader.GIF" class="contactloader" />')
            .attr('disabled','disabled');

        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#contactform img.contactloader').fadeOut('slow',function(){$(this).remove();});
                $('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                }
            }
        );

        });

        return false;

    });


    $(window).scroll(function() {

    	if (

    		$(this).scrollTop() > 500

    		)
    	{

           $('.back-to-top').fadeIn();
    	}

        else {

        	$('.back-to-top').fadeOut();
        }
    });

        $('.back-to-top').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */

            $('html, body').animate({
                scrollTop: 0,
                easing: 'swing'
            }, 750)
        });


});

 $(window).load(function(){
    "use strict";

    /* ==============================================
    Preloader
    =============================================== */

    // will fade out the whole DIV that covers the website.
    $("#preloader").fadeOut("slow");

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();

    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });

            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }

});