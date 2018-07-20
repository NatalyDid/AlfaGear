/**
 * Header Slider
 * */
$('.carousel').carousel({
    interval: 4000
});


//window.onload = function() {
    // let h = document.getElementsByClassName('carousel-inner')[0].clientHeight;
    // console.log(h);
    // let a = document.getElementById('trap');
    // a.style.height = h + 'px';
    // console.log(a.style.height);

//};

/**
 * Reviews
 * */
$(function () {
    var reviewId;
    $('.reviews-switcher-item ').on('click', function () {
        $('.reviews-switcher-item').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');
        reviewId = $(this).attr('data-reviewsId');
        $('.reviews-div .reviews-text, img.review-img').each(function () {
            $(this).hide();
        });
        $('.reviews-div').find('.reviews-text#' + reviewId).show();
        $('.pos-relative').find('img.review-img').each(function () {
            if ($(this).attr('data-reviewsImgID') === reviewId) {
                $(this).show();
            }
        });
    });
});

/**
 * Menu open/close
 * */
$(function () {
    $('.menu-open').bind('click', function (e) {
        e.preventDefault();
        $('.section-slider').find('.header-menu-wrapper').slideToggle();
        $('.slider-row').toggleClass('active');
    });
});

/**
 * Scrolling to necessary section by click on tag 'a'
 * */
$(function () {
    $(".menu a").click(function () {
        $('.section-slider').find('.header-menu-wrapper').slideToggle();
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination}, 1100);
        return false;
    });
});

/**
 * Scrolling to necessary section by click on tag 'a'
 * */
$(function () {
    $(".goods-item-indicate").on('click', "img", function (ev) {
        ev.stopPropagation();
        $(".goods-item-indicate img").removeClass('active');
        $(this).addClass('active');
        var item = $(this).attr('data-item');
        $(this).parents('.goods-item').find('.goods-item-img').find('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).parents('.goods-item').find('.goods-item-img').find('a.img_' + item).addClass('active');
    });
});

/**
 * Gallery view function
 * */
function galleryView() {
    var divWidth = window.innerWidth;
    console.log(divWidth);

    if (divWidth > 640) {
        console.log('zzz');
        try {
            if ($('.gallery-wrapper').hasClass('owl-carousel')) {
                $('.gallery-wrapper').removeClass('owl-carousel owl-theme');
                $('.gallery-wrapper').owlCarousel('destroy');
            }
        } catch (err) {
            // to do nothing
        }
        /*** Gallery  - uses Masonry gallery plugin* */
        $('.gallery-wrapper').masonry({
            // options
            itemSelector: '.gallery-item'
        });
    } else {
        try {
            var $masonryTarget = $('.gallery-wrapper'),
                $hasMasonry = $masonryTarget.data('masonry') ? true : false
            ;
            if ($masonryTarget.length > 0 && $hasMasonry) {
                // Destroy masonry if exists.
                $masonryTarget.masonry('destroy');
            }
        } catch (err) {
            // to do nothing
        }

        /**add classes*/
        $('.gallery-wrapper').addClass('owl-carousel owl-theme');

        /**OWL carousel - gallery slider*/
        $(".gallery-wrapper").owlCarousel({
            nav: true,
            loop: false,
            navText: [
                '<i class="fa fa-4x fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-4x fa-angle-right" aria-hidden="true"></i>'
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 2
                },
                500: {
                    items: 3
                }
            }
        });
    }
}

/**
 * init single item image view
 * */
$(function () {
    var windowWidth = window.innerWidth;
    if (windowWidth > 640) {
        imageViewDesktop();
    } else {
        imageViewMobile()
    }
});

/**
 * Goods Slider
 * */
$(function () {
    $('.goods-slider').owlCarousel({
        nav: true,
        loop: false,
        navText: [
            '<i class="fa fa-4x fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-4x fa-angle-right" aria-hidden="true"></i>'
        ],
        dots: true,
        autoplay: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            500: {
                items: 3
            }
        }
    });
});

/**Single Card Choose size and color*/
$(function () {
    var priceBox = $('.price span');
    var colorPrice = parseInt($('.color-price.active').attr('data-price'));
    /*color extra price*/
    var sizePrice = parseInt($('.size-price.active').attr('data-price'));
    /*size extra price*/
    var price = parseInt(priceBox.attr('data-price'));
    var totalPrice = price + colorPrice + sizePrice;
    /*total item price*/
    priceBox.html(totalPrice);

    $('.choose-color-wrap li a').on('click', function () {
        $('.color-price').each(function () {
            $(this).removeClass('active')
        });
        $(this).addClass('active');
        colorPrice = parseInt($(this).attr('data-price'));
        sizePrice = parseInt($('.size-price.active').attr('data-price'));
        totalPrice = parseInt($('.price span').attr('data-price')) + sizePrice + colorPrice;
        priceBox.html(totalPrice);
    });

    $('.choose-size-wrap li a').on('click', function () {
        $('.size-price').each(function () {
            $(this).removeClass('active')
        });
        $(this).addClass('active');
        sizePrice = parseInt($(this).attr('data-price'));
        colorPrice = parseInt($('.color-price.active').attr('data-price'));
        totalPrice = parseInt($('.price span').attr('data-price')) + sizePrice + colorPrice;
        priceBox.html(totalPrice);
    });
});

/**
 * Single Card Gallery - Mobile view
 * */
function imageViewMobile() {
    /**OWL carousel - single product mobile view*/
    $(".goods-single-gallery").owlCarousel({
        nav: false,
        loop: false,
        margin: 2,
        navText: [
            '<i class="fa fa-4x fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-4x fa-angle-right" aria-hidden="true"></i>'
        ],
        dots: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            500: {
                items: 3
            }
        }
    });
}

/**
 * Single card view item images - tablet and desktop view
 * */
function imageViewDesktop() {
    var smallImgId;
    $('.section-card').on('click', '.item-small-img', function () {
        smallImgId = $(this).find('img').attr('id');

        $('.item-big-img-wrapper img').each(function () {
            if ($(this).attr('data-imgId') === smallImgId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });
}

function imageColorViewDesktop() {
    var smallImgColorId;
    $('.choose-color-wrap').on('click', '.color-price', function () {
        smallImgColorId = $(this).find('img').attr('id');

        $('.item-big-img-wrapper img').each(function () {
            if ($(this).attr('data-imgId') === smallImgColorId) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });
}

imageColorViewDesktop();

window.onload = function(){
    /**
     * header white div height
     * */
    var h = $('.carousel').css("height");
    console.log(h);
    $('#trap').height(h);

    /**
     * Gallery view
     * */
    galleryView();
};

/**
 * Window resize
 * */
$(window).resize(function () {
    var h = $('.carousel').css("height");
    $('.white-trapezium-inner img:first').height(h);

    /**gallery*/
    galleryView();

    /**Single-card page */
    var windowWidth = window.innerWidth;
    if (windowWidth > 640) {
        imageViewDesktop();
        try {
            $('.goods-single-gallery').owlCarousel('destroy');
        } catch (err) {
            // to do nothing
        }
    } else {
        imageViewMobile()
    }
});


/**
 *Float Menu Init.
 * */
var options = {
    offset: 700
};
var header = new Headhesive('.menu-float', options);

