---
---
console.log('STARTUP AUTOBAHN powered by Plug and Play\nEXPO Day 5 on February 21st, 2019\n\nFor more information please reach out to or connect with us on Twitter (@startupautobahn).')

{% include js/countdown.min.js %}
{% include js/jquery.slabtext.min.js %}
{% include js/masonry.min.js %}
{% include js/imagesloaded.min.js %}

$('#expo_countdown p').countdown('2019/02/21 14:00:00', function(event) {
  $(this).html(event.strftime('%T'));
});

function set_height(){
  var height = $(window).outerHeight();
  $('.placeholder__inner').css('min-height', height);
}
set_height();

$('.placeholder__inner').click( function( e ){
  if (e.target !== this) {
    return;
  }
  $(this).toggleClass('active');
})

// $('.read_more').each( function(){
//   $(this).click( function(){
//     console.log('works')
//   })
// })

function read_more() {
  $('.speaker__item').each( function() {
    var section = $(this).find('.speaker__info');
    var read_more = $(this).find('.read_more');
    var desc_padding = $(section).find('.desc').outerHeight() - $(section).find('.desc').height();
    var sub_el = $(read_more).height() - desc_padding;
    var link = $(section).find('a.link').outerHeight(true) - $(section).find('a.link').height();
    if (link > 0) {
      var content = $(section)[0].scrollHeight - sub_el + link;
    } else {
      var content = $(section)[0].scrollHeight - sub_el;
    }
    //var content = $(section)[0].scrollHeight;
    var space = $(section).outerHeight();
    if (content > space && !$(read_more).hasClass('true') ) {
      $(read_more).addClass('true');
    } else if ( (content < space && $(read_more).hasClass('true') ) ) {
      $(read_more).removeClass('true');
    }
  })
}

read_more();

$('.read_more').click( function(){
  var main = $(this).parents('.speaker__item');
  var parent = $(this).parents('.speaker__info');
  if ( !$(main).hasClass('active') ) {
    var height = $(parent)[0].scrollHeight + 40 + 40;
    $(main).addClass('active').css('height', height);
  } else {
    $(main).removeClass('active').css('height', 200);
  }
})

function reset_speaker_items() {
  $('.speaker__item').each( function(){
    $(this).removeClass('active').css('height', 200);
  });
  setTimeout(function () {
    read_more();
  }, 600);
}

// flashback masonry
var $flashback = $('.flashback__grid').masonry({
  itemSelector: '.flashback__item',
  percentPosition: true
});

$flashback.imagesLoaded().progress( function() {
  $flashback.masonry('layout');
});

$('.flashback').imagesLoaded( function() {
  init_height_masonry();
});

// calc height of masonry
var masonry_height = 0;

function init_height_masonry() {
  var grid = $('.flashback__grid').outerHeight(true);
  var main = $('.flashback')
  var expand_bar = main.find('.expand_bar').outerHeight(true);
  var header = main.find('h2').outerHeight(true) + main.find('.intro').outerHeight(true);
  if (grid > 1200) {
    masonry_height = header + 1200;
    main.find('.expand_bar').css('display', '');
  } else {
    masonry_height = grid + header + expand_bar;
    main.find('.expand_bar').css('display', 'none');
  }
  main.css('height', masonry_height);
}

init_height_masonry();

// expand functions

function expand_bar_open(obj) {
  var height = obj[0].scrollHeight + obj.find('.expand_bar').outerHeight();
  $(obj).css('height', height).addClass('active');
}

function expand_bar_close(obj) {
  $(obj).css('height', masonry_height).removeClass('active');
  $('html, body').animate({
    scrollTop: ( $(obj).offset().top )
  }, 600);

}

function expand_bar() {
  var main = $('.flashback')
  if ( $(main).hasClass('active') ) {
    expand_bar_close(main);
  } else {
    expand_bar_open(main);
  }
}

$('.expand_bar').click( function() {
  expand_bar();
})

// Fancybox
$('.flashback__item a').fancybox({
   selector : '.flashback__item a',
   afterShow: function() {
     var main = $('.flashback')
     if ( !$(main).hasClass('active') ) {
       expand_bar_open(main);
     }
   },
   afterClose: function() {
     var main = $('.flashback')
     if ( $(main).hasClass('active') ) {
       expand_bar_close(main);
     }
   },
});

$( window ).resize(function() {
  reset_speaker_items();
  read_more();
  init_height_masonry();
  var main = $('.flashback')
  if ( $(main).hasClass('active') ) {
    expand_bar_close(main);
  }
});


$(".powered_header").slabText({
    "viewportBreakpoint":380
});
