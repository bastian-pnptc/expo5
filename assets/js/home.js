---
---
console.log('STARTUP AUTOBAHN powered by Plug and Play\nEXPO Day 5 on February 21st, 2019\n\nFor more information please reach out to or connect with us on Twitter (@startupautobahn).')

{% include js/countdown.min.js %}
{% include js/jquery.slabtext.min.js %}

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
